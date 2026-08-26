import { useEffect, useRef, useState } from 'react'

const HP_SHOWCASE_URL =
  'https://syndication.inc.hp.com/inpage/contentid.min.js#Yz1zaG93Y2FzZS91ay9lbiZtPVNFTUEmY2M9YWwmcD0xLTEwTFo2LTgyNDM'
const HP_POLY_SHOWCASE_URL =
  'https://syndication.inc.hp.com/inpage/contentid.min.js#Yz1zaG93Y2FzZS91ay9lbi9wb2x5Jm09U0VNQSZjYz1hbCZwPTEtMTBMWjYtODI0Mw'

const SHOWCASE_URLS = {
  hp: HP_SHOWCASE_URL,
  poly: HP_POLY_SHOWCASE_URL,
}

export default function HPSyndication({ variant = 'hp' }) {
  const widgetRef = useRef(null)
  const showcaseRef = useRef(null)
  const [status, setStatus] = useState('loading')
  const url = SHOWCASE_URLS[variant] || SHOWCASE_URLS.hp
  const scriptId = `ccs-hp-${variant}-syndication-script`

  useEffect(() => {
    const widget = widgetRef.current
    const showcase = showcaseRef.current
    if (!widget || !showcase) return undefined

    let cancelled = false
    let pruneTimer = 0
    const existingScript = document.getElementById(scriptId)
    if (existingScript) existingScript.remove()

    const removeInjectedNodes = () => {
      widget.querySelectorAll('.hp-inpage').forEach((node) => node.remove())
    }

    const pruneDuplicateNodes = () => {
      const nodes = Array.from(widget.querySelectorAll('.hp-inpage'))
      nodes.slice(0, -1).forEach((node) => node.remove())
    }

    removeInjectedNodes()
    showcase.replaceChildren()
    setStatus('loading')

    const script = document.createElement('script')
    script.id = scriptId
    script.type = 'text/javascript'
    script.async = false
    script.setAttribute('src', url)

    script.onload = () => {
      if (!cancelled) {
        setStatus('loaded')
        pruneTimer = window.setInterval(pruneDuplicateNodes, 300)
        window.setTimeout(() => window.clearInterval(pruneTimer), 5000)
      }
    }

    script.onerror = () => {
      if (!cancelled) setStatus('error')
    }

    widget.appendChild(script)

    return () => {
      cancelled = true
      window.clearInterval(pruneTimer)
      script.remove()
      showcase.replaceChildren()
      removeInjectedNodes()
    }
  }, [scriptId, url])

  return (
    <div ref={widgetRef} className="syndication-widget" data-vendor={variant === 'poly' ? 'hp-poly' : 'hp'}>
      {status === 'loading' && (
        <p className="syndication-status" role="status">
          Loading HP brand showcase...
        </p>
      )}
      {status === 'error' && (
        <p className="syndication-status syndication-status-error" role="status">
          HP showcase content could not be loaded right now. Please contact CCS for HP solution
          assistance.
        </p>
      )}
      <div ref={showcaseRef} className="showcase" />
    </div>
  )
}
