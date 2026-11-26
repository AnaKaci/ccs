#!/usr/bin/env node
/*
 * Deploy the site to ccs.al (cPanel) by uploading ONLY the files that changed.
 *
 *   npm run deploy:ccs:check   build + list what would be uploaded (no login needed)
 *   npm run deploy:ccs         build + upload the changed files
 *
 * How it decides what changed:
 *   - After each successful deploy it saves a fingerprint (SHA-256) of every file in
 *     .deploy/ccs-al-manifest.json (gitignored).
 *   - If there is no manifest yet, it fingerprints what ccs.al is serving right now.
 *
 * Safety:
 *   - Never deletes anything on the server (WordPress/WooCommerce live in the same folder).
 *   - Uploads assets and media first and index.html last, so the live page never
 *     references a file that is not there yet.
 *   - Checks the target folder already contains the site's index.html before uploading.
 *
 * Credentials (never committed): create .env.deploy next to package.json:
 *   CPANEL_HOST=ccs.al            # cPanel host name (port 2083 is used)
 *   CPANEL_USER=your-cpanel-username
 *   CPANEL_TOKEN=token-from-cPanel > Security > Manage API Tokens
 *   CPANEL_DIR=public_html        # folder that serves https://ccs.al/
 */

import { createHash } from 'node:crypto'
import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, posix, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(ROOT, 'dist-cpanel')
const MANIFEST = join(ROOT, '.deploy', 'ccs-al-manifest.json')
const SITE_URL = 'https://ccs.al'
// Built for GitHub Pages only; not needed on cPanel (the server already routes /gis/ etc. to index.html).
const SKIP = new Set(['404.html'])

const args = new Set(process.argv.slice(2))
const DRY_RUN = args.has('--dry-run')
const SKIP_BUILD = args.has('--no-build')

const log = (...parts) => console.log(...parts)
const fail = (message) => {
  console.error(`\n✖ ${message}`)
  process.exit(1)
}

function loadEnv() {
  const file = join(ROOT, '.env.deploy')
  const env = {}
  if (existsSync(file)) {
    for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/)
      if (match && !line.trim().startsWith('#')) env[match[1]] = match[2].replace(/^['"]|['"]$/g, '')
    }
  }
  return {
    host: process.env.CPANEL_HOST || env.CPANEL_HOST || 'ccs.al',
    user: process.env.CPANEL_USER || env.CPANEL_USER,
    token: process.env.CPANEL_TOKEN || env.CPANEL_TOKEN,
    dir: (process.env.CPANEL_DIR || env.CPANEL_DIR || 'public_html').replace(/\/+$/, ''),
  }
}

const sha256 = (buffer) => createHash('sha256').update(buffer).digest('hex')

function listFiles(dir) {
  const files = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) files.push(...listFiles(full))
    else files.push(relative(OUT_DIR, full).split(sep).join(posix.sep))
  }
  return files
}

function build() {
  log('• Building the ccs.al version (absolute paths)…')
  // MSYS_NO_PATHCONV stops Git Bash from turning "--base=/" into a Windows path.
  execSync('npx vite build --base=/ --outDir dist-cpanel --emptyOutDir', {
    cwd: ROOT,
    stdio: ['ignore', 'ignore', 'inherit'],
    env: { ...process.env, MSYS_NO_PATHCONV: '1' },
  })
  const index = readFileSync(join(OUT_DIR, 'index.html'), 'utf8')
  if (!/src="\/assets\//.test(index)) fail('Build check failed: index.html does not load scripts from /assets/.')
}

// Fingerprints of what ccs.al serves now (first run only). A missing file comes back as the
// site's index.html (the server's catch-all), so its hash differs and it gets uploaded.
async function liveFingerprints(files) {
  log('• No deploy record yet: fingerprinting the files ccs.al serves right now…')
  const result = {}
  let done = 0
  await Promise.all(
    files.map(async (file) => {
      try {
        const response = await fetch(`${SITE_URL}/${file}`, { cache: 'no-store' })
        // The catch-all answers missing files with index.html, so HTML for a non-HTML path means "not there".
        const isFallback = !file.endsWith('.html') && (response.headers.get('content-type') || '').includes('text/html')
        if (response.ok && !isFallback) result[file] = sha256(Buffer.from(await response.arrayBuffer()))
      } catch {
        // Unreachable file: treat as changed.
      }
      done += 1
      if (done % 10 === 0 || done === files.length) process.stdout.write(`  ${done}/${files.length}\r`)
    }),
  )
  log('')
  return result
}

async function cpanel(env, path, { method = 'GET', body } = {}) {
  const response = await fetch(`https://${env.host}:2083${path}`, {
    method,
    body,
    headers: { Authorization: `cpanel ${env.user}:${env.token}` },
  })
  const text = await response.text()
  let json
  try {
    json = JSON.parse(text)
  } catch {
    fail(`cPanel answered ${response.status} with something that is not JSON. Check CPANEL_HOST / CPANEL_USER / CPANEL_TOKEN.`)
  }
  return json
}

async function preflight(env) {
  const query = new URLSearchParams({ dir: env.dir, include_mime: '0', show_hidden: '0' })
  const json = await cpanel(env, `/execute/Fileman/list_files?${query}`)
  if (!json.status) fail(`cPanel login or folder check failed: ${(json.errors || []).join(' ') || 'unknown error'}`)
  const names = new Set((json.data || []).map((entry) => entry.file))
  if (!names.has('index.html')) fail(`"${env.dir}" has no index.html. Set CPANEL_DIR to the folder that serves https://ccs.al/.`)
  if (!names.has('assets')) fail(`"${env.dir}" has no assets folder. Set CPANEL_DIR to the folder that serves https://ccs.al/.`)
  return names
}

async function ensureDir(env, remoteDir) {
  const parent = posix.dirname(remoteDir)
  const name = posix.basename(remoteDir)
  const query = new URLSearchParams({
    cpanel_jsonapi_user: env.user,
    cpanel_jsonapi_apiversion: '2',
    cpanel_jsonapi_module: 'Fileman',
    cpanel_jsonapi_func: 'mkdir',
    path: parent,
    name,
  })
  // Fails harmlessly when the folder already exists.
  await cpanel(env, `/json-api/cpanel?${query}`)
}

async function uploadBatch(env, remoteDir, files) {
  const form = new FormData()
  form.append('dir', remoteDir)
  form.append('overwrite', '1')
  files.forEach((file, index) => {
    form.append(`file-${index + 1}`, new Blob([readFileSync(join(OUT_DIR, file))]), posix.basename(file))
  })
  const json = await cpanel(env, '/execute/Fileman/upload_files', { method: 'POST', body: form })
  const failed = (json.data?.uploads || []).filter((upload) => !upload.status)
  if (!json.status || failed.length) {
    const reasons = [...(json.errors || []), ...failed.map((upload) => `${upload.file}: ${upload.reason}`)]
    fail(`Upload to ${remoteDir} failed: ${reasons.join('; ') || 'unknown error'}`)
  }
}

async function main() {
  if (!SKIP_BUILD) build()
  if (!existsSync(join(OUT_DIR, 'index.html'))) fail('dist-cpanel/index.html is missing. Run without --no-build.')

  const files = listFiles(OUT_DIR).filter((file) => !SKIP.has(file))
  const local = Object.fromEntries(files.map((file) => [file, sha256(readFileSync(join(OUT_DIR, file)))]))
  const previous = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')).files : await liveFingerprints(files)

  // index.html goes last so the live page only switches once its new files are in place.
  const changed = files
    .filter((file) => previous[file] !== local[file])
    .sort((a, b) => (a === 'index.html') - (b === 'index.html') || a.localeCompare(b))

  if (!changed.length) {
    log('✔ ccs.al is already up to date. Nothing to upload.')
    return
  }

  const bytes = changed.reduce((sum, file) => sum + statSync(join(OUT_DIR, file)).size, 0)
  log(`\n${changed.length} file(s) to upload (${(bytes / 1024 / 1024).toFixed(1)} MB):`)
  changed.forEach((file) => log(`  ${previous[file] ? 'changed' : 'new    '}  ${file}`))

  if (DRY_RUN) {
    log('\n(dry run: nothing was uploaded)')
    return
  }

  const env = loadEnv()
  if (!env.user || !env.token) fail('Missing CPANEL_USER / CPANEL_TOKEN. Put them in .env.deploy (see the top of this script).')

  log(`\n• Checking ${env.dir} on ${env.host}…`)
  await preflight(env)

  // Group by folder, keeping index.html in its own final step.
  const groups = new Map()
  for (const file of changed) {
    const folder = posix.dirname(file) === '.' ? '' : posix.dirname(file)
    const key = file === 'index.html' ? '__index__' : folder
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(file)
  }

  for (const [key, group] of groups) {
    const folder = key === '__index__' ? '' : key
    const remoteDir = folder ? `${env.dir}/${folder}` : env.dir
    if (folder) await ensureDir(env, remoteDir)
    // Small batches keep each request well under upload limits.
    for (let i = 0; i < group.length; i += 8) {
      const batch = group.slice(i, i + 8)
      log(`• Uploading ${batch.length} file(s) to ${remoteDir}`)
      await uploadBatch(env, remoteDir, batch)
    }
  }

  mkdirSync(dirname(MANIFEST), { recursive: true })
  writeFileSync(MANIFEST, JSON.stringify({ deployedAt: new Date().toISOString(), files: local }, null, 2))

  // Confirm the live page now loads the new build.
  const liveIndex = await (await fetch(`${SITE_URL}/?deploycheck=${Date.now()}`, { cache: 'no-store' })).text()
  const entry = readFileSync(join(OUT_DIR, 'index.html'), 'utf8').match(/\/assets\/index-[\w-]+\.js/)?.[0]
  if (entry && liveIndex.includes(entry)) log(`\n✔ Deployed. https://ccs.al now serves ${entry}`)
  else log('\n⚠ Uploaded, but https://ccs.al does not show the new build yet (server or browser cache). Check again in a minute.')
}

main().catch((error) => fail(error.message))
