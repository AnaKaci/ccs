import { ArrowRight, Check, Mail, ShoppingCart } from 'lucide-react'

export default function VendorSolutionLayout({
  copy,
  data,
  lang,
  logoSrc,
  vendorName,
  children,
  shopHref,
}) {
  const title = lang === 'al' && data.alTitle ? data.alTitle : data.title
  const intro = lang === 'al' && data.alIntro ? data.alIntro : data.intro

  return (
    <section className="vendor-page">
      <div className="vendor-hero">
        <div className="vendor-hero-copy">
          <span className="kicker">{lang === 'al' ? 'Zgjidhje teknologjie' : 'Vendor solutions'}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
          <div className="vendor-actions">
            <a href="#vendor-content" className="primary-action">
              {lang === 'al' ? 'Shiko permbajtjen zyrtare' : 'View official content'}
              <ArrowRight size={17} />
            </a>
            <a href="mailto:info@ccs.al" className="secondary-action">
              <Mail size={17} />
              info@ccs.al
            </a>
            {shopHref && (
              <a href={shopHref} className="secondary-action">
                <ShoppingCart size={17} />
                {copy.common.viewShop}
              </a>
            )}
          </div>
        </div>

        <div className="vendor-identity" aria-label={vendorName}>
          <img src={logoSrc} alt={`${vendorName} logo`} />
        </div>
      </div>

      <div className="vendor-value-grid">
        {data.points.map((point) => (
          <article key={point}>
            <Check size={18} />
            <p>{point}</p>
          </article>
        ))}
      </div>

      <div className="vendor-content" id="vendor-content">
        <div className="vendor-content-head">
          <span className="kicker">{vendorName}</span>
          <h2>{lang === 'al' ? 'Permbajtje zyrtare nga partneri' : 'Official Syndicated Content'}</h2>
          <p>
            {lang === 'al'
              ? 'Kjo zone ngarkon permbajtjen e ofruar direkt nga platforma e partnerit.'
              : 'This area loads content supplied directly by the vendor syndication platform.'}
          </p>
        </div>
        <div className="vendor-content-surface">{children}</div>
      </div>

      <div className="vendor-cta">
        <div>
          <span className="kicker">CCS</span>
          <h2>{lang === 'al' ? 'Flisni me ekipin CCS' : 'Talk to the CCS team'}</h2>
          <p>
            {lang === 'al'
              ? 'CCS ndihmon me perzgjedhje, implementim, konfigurim dhe suport teknik.'
              : 'CCS supports selection, implementation, configuration, and technical support.'}
          </p>
        </div>
        <a href="mailto:info@ccs.al" className="primary-action">
          <Mail size={17} />
          {copy.home.contactTitle}
        </a>
      </div>
    </section>
  )
}
