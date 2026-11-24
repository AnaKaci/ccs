import { useEffect } from 'react'

/*
 * Site-wide motion: scroll reveals, count-up figures and a header shadow.
 * Purely presentational. Nothing runs when the visitor prefers reduced motion.
 */

const REVEAL_SELECTORS = [
  // Shared
  '.hp-head',
  '.hp-bar',
  '.hp-certs-head',
  // Homepage
  '.hp-intro__copy > *',
  '.hp-intro__visual',
  '.hp-facts > div',
  '.hp-panel',
  '.hp-bleed__media',
  '.hp-bleed__copy > *',
  '.hp-principles li',
  '.hp-band__copy > *',
  '.hp-band__list li',
  '.hp-gis-split__copy > *',
  '.hp-gis li',
  '.hp-gis-split__media',
  '.hp-vendor',
  '.hp-marquee',
  '.hp-contact__lead > *',
  '.hp-contact__cards li',
  // IT solutions
  '.sol-deliver__head > *',
  '.sol-points li',
  '.sol-cards article',
  '.sol-compare article',
  '.sol-other',
  '.sol-support__info > *',
  '.sol-form',
  '.sol-cta__inner > *',
  // Case studies
  '.cs-filter',
  '.cs-feature',
  '.cs-card',
  '.cs-steps li',
  '.cs-aside > *',
  '.cs-next__link',
  // Shop + product
  '.sp-card',
  '.pd-gallery',
  '.pd-summary > *',
  '.pd-overview',
  '.pd-specs',
  // Footer
  '.ft__brand',
  '.ft__col',
].join(',')

const STAGGER_STEP = 70
const STAGGER_MAX = 6

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

function countUp(element) {
  const target = element.dataset.countTarget
  const value = Number(target)
  if (!Number.isFinite(value)) return
  const duration = 1100
  const start = performance.now()
  const tick = (now) => {
    const progress = Math.min(1, (now - start) / duration)
    const eased = 1 - Math.pow(1 - progress, 3)
    element.textContent = String(Math.round(value * eased))
    if (progress < 1) requestAnimationFrame(tick)
    else element.textContent = target
  }
  requestAnimationFrame(tick)
}

export function useSiteMotion(routeKey) {
  // Header shadow once the page is scrolled
  useEffect(() => {
    const header = document.querySelector('.site-header')
    if (!header) return undefined
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Reveal + count-up, re-scanned when the route or page content changes
  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return undefined
    const root = document.querySelector('.site-shell')
    if (!root) return undefined

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('rv-in')
          revealObserver.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          countUp(entry.target)
          countObserver.unobserve(entry.target)
        })
      },
      { threshold: 0.6 },
    )

    const scan = () => {
      root.querySelectorAll(REVEAL_SELECTORS).forEach((element) => {
        if (element.dataset.rv) return
        element.dataset.rv = '1'
        const siblings = element.parentElement ? [...element.parentElement.children] : [element]
        const index = Math.min(siblings.indexOf(element), STAGGER_MAX)
        element.style.setProperty('--rv-delay', `${Math.max(index, 0) * STAGGER_STEP}ms`)
        element.classList.add('rv')
        revealObserver.observe(element)
      })

      root.querySelectorAll('.hp-facts dd, .cs-hero__stats dd').forEach((element) => {
        if (element.dataset.countTarget) return
        const text = element.textContent.trim()
        if (!/^\d{1,3}$/.test(text)) return
        element.dataset.countTarget = text
        element.textContent = '0'
        countObserver.observe(element)
      })
    }

    scan()

    let pending = 0
    const mutationObserver = new MutationObserver(() => {
      if (pending) return
      pending = requestAnimationFrame(() => {
        pending = 0
        scan()
      })
    })
    mutationObserver.observe(root, { childList: true, subtree: true })

    return () => {
      mutationObserver.disconnect()
      revealObserver.disconnect()
      countObserver.disconnect()
      if (pending) cancelAnimationFrame(pending)
      // Release anything not yet revealed so the next scan observes it again
      root.querySelectorAll('[data-rv]').forEach((element) => {
        if (element.classList.contains('rv-in')) return
        delete element.dataset.rv
        element.classList.remove('rv')
      })
      // Restore counted figures so a re-scan starts from the real values
      root.querySelectorAll('[data-count-target]').forEach((element) => {
        element.textContent = element.dataset.countTarget
        delete element.dataset.countTarget
      })
    }
  }, [routeKey])
}
