import { useEffect, useRef, useState } from 'react'

const FORTINET_SCRIPT_URL =
  'https://publisher.impartner.io/Csp/?vendorName=fortinet-partner-program&partnerId=08d8f419-661b-986a-a41c-010007948745'
const FORTINET_SCRIPT_ID = 'ccs-fortinet-syndication-script'

export default function FortinetSyndication() {
  const containerRef = useRef(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    let cancelled = false
    const existingScript = document.getElementById(FORTINET_SCRIPT_ID)
    if (existingScript) existingScript.remove()

    container.replaceChildren()
    setStatus('loading')

    const script = document.createElement('script')
    script.id = FORTINET_SCRIPT_ID
    script.className = 'CspSyndicationScript'
    script.type = 'text/javascript'
    script.rel = 'nofollow'
    script.async = true
    script.src = FORTINET_SCRIPT_URL

    script.onload = () => {
      if (!cancelled) setStatus('loaded')
    }

    script.onerror = () => {
      if (!cancelled) setStatus('error')
    }

    container.appendChild(script)

    return () => {
      cancelled = true
      script.remove()
      container.replaceChildren()
    }
  }, [])

  return (
    <div className="syndication-widget" data-vendor="fortinet">
      {status === 'loading' && (
        <p className="syndication-status" role="status">
          Loading Fortinet syndicated content...
        </p>
      )}
      {status === 'error' && (
        <p className="syndication-status syndication-status-error" role="status">
          Fortinet content could not be loaded right now. Please contact CCS for Fortinet
          solution assistance.
        </p>
      )}
      <div ref={containerRef} className="syndication-target" />
    </div>
  )
}
