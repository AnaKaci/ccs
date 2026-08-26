import { useEffect, useRef, useState } from 'react'

const CISCO_SCRIPT_URL =
  'https://widgets.ziftsolutions.com/cisco.ziftsolutions.com/js/8a9993409655128e01965c8927e51d00'
const CISCO_SCRIPT_ID = 'ccs-cisco-syndication-script'

export default function CiscoSyndication() {
  const containerRef = useRef(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    let cancelled = false
    let pruneTimer = 0
    const existingScript = document.getElementById(CISCO_SCRIPT_ID)
    if (existingScript) existingScript.remove()

    const pruneDuplicateNodes = () => {
      const seen = new Set()
      Array.from(container.children).forEach((node) => {
        const signature = [
          node.tagName,
          node.id,
          node.className,
          node.getAttribute('src') || '',
          node.getAttribute('href') || '',
          node.textContent || '',
        ].join('|')

        if (seen.has(signature)) {
          node.remove()
        } else {
          seen.add(signature)
        }
      })
    }

    container.replaceChildren()
    setStatus('loading')

    const script = document.createElement('script')
    script.id = CISCO_SCRIPT_ID
    script.type = 'text/javascript'
    script.charset = 'utf-8'
    script.async = false
    script.src = CISCO_SCRIPT_URL

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

    container.appendChild(script)

    return () => {
      cancelled = true
      window.clearInterval(pruneTimer)
      script.remove()
      container.replaceChildren()
    }
  }, [])

  return (
    <div className="syndication-widget" data-vendor="cisco">
      {status === 'loading' && (
        <p className="syndication-status" role="status">
          Loading Cisco syndicated content...
        </p>
      )}
      {status === 'error' && (
        <p className="syndication-status syndication-status-error" role="status">
          Cisco content could not be loaded right now. Please contact CCS for Cisco solution
          assistance.
        </p>
      )}
      <div ref={containerRef} className="syndication-target" />
    </div>
  )
}
