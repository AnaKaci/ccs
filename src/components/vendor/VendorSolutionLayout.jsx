import { ArrowRight, Check, Mail, Phone, ShoppingCart } from 'lucide-react'

// Vendor pages (HP, HP Poly, Fortinet, Cisco) use the same building blocks as the
// IT Solution pages: dark photo hero, "what we deliver" points, a full-width content
// band for the vendor's syndicated content, and the red contact band.
export default function VendorSolutionLayout({
  copy,
  data,
  lang,
  logoSrc,
  vendorName,
  backdrop,
  children,
  shopHref,
}) {
  const isAl = lang === 'al'
  const title = isAl && data.alTitle ? data.alTitle : data.title
  const intro = isAl && data.alIntro ? data.alIntro : data.intro

  return (
    <div className="hp sol vp">
      <section className="sol-hero vp-hero" style={backdrop ? { '--sol-image': `url(${backdrop})` } : undefined}>
        <div className="sol-wrap sol-hero__inner vp-hero__inner">
          <div className="vp-hero__copy">
            <div className="vp-hero__brand">
              <span className="vp-hero__logo">
                <img src={logoSrc} alt={`${vendorName} logo`} />
              </span>
              <span className="vp-hero__label">{isAl ? 'Partner teknologjie' : 'Technology partner'}</span>
            </div>
            <h1>{title}</h1>
            <p>{intro}</p>
            <div className="sol-hero__actions">
              <a href="#vendor-content" className="hp-btn hp-btn--primary">
                {isAl ? 'Shiko permbajtjen zyrtare' : 'View official content'}
                <ArrowRight size={17} aria-hidden="true" />
              </a>
              {shopHref && (
                <a href={shopHref} className="hp-btn sol-btn--ghost">
                  <ShoppingCart size={17} aria-hidden="true" />
                  {copy.common.viewShop}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="sol-section">
        <div className="sol-wrap sol-deliver">
          <div className="sol-deliver__head">
            <span className="hp-label">{isAl ? 'Cfare ofrojme' : 'What we deliver'}</span>
            <h2>{isAl ? `${vendorName} me C.C.S` : `${vendorName} with C.C.S`}</h2>
            <p>
              {isAl
                ? 'Perzgjedhje, implementim, konfigurim dhe suport teknik nga ekipi i C.C.S.'
                : 'Selection, implementation, configuration and technical support from the C.C.S team.'}
            </p>
          </div>
          <ul className="sol-points">
            {data.points.map((point) => (
              <li key={point}>
                <Check size={18} aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="vp-content" id="vendor-content">
        <div className="sol-wrap vp-content__head">
          <span className="hp-label">{vendorName}</span>
          <h2>{isAl ? 'Permbajtje zyrtare nga partneri' : 'Official vendor content'}</h2>
          <p>
            {isAl
              ? 'Kjo zone ngarkon permbajtjen e ofruar direkt nga platforma e partnerit.'
              : 'This area loads content supplied directly by the vendor syndication platform.'}
          </p>
        </div>
        <div className="vp-content__surface">{children}</div>
      </section>

      <section className="sol-cta">
        <div className="sol-wrap sol-cta__inner">
          <div>
            <h2>{isAl ? 'Flisni me ekipin C.C.S' : 'Talk to the C.C.S team'}</h2>
            <p>
              {isAl
                ? `C.C.S ndihmon me perzgjedhjen, implementimin dhe suportin per ${vendorName}.`
                : `C.C.S helps you choose, implement and support ${vendorName} solutions.`}
            </p>
          </div>
          <div className="sol-cta__actions">
            <a href={`mailto:info@ccs.al?subject=${encodeURIComponent(`${vendorName} enquiry`)}`} className="hp-btn hp-btn--dark">
              <Mail size={18} aria-hidden="true" />
              info@ccs.al
            </a>
            <a href="tel:+35542259005" className="hp-btn hp-btn--outline-light">
              <Phone size={18} aria-hidden="true" />
              + 04 225 9005
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
