import { ArrowUp } from 'lucide-react'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.2 21 14.5V21h-4v-5.8c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.52-2.25 3.1V21H9z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
      <path d="M14 8.5V6.8c0-.8.5-1.3 1.4-1.3H17V2.2C16.6 2.1 15.4 2 14.1 2 11.3 2 9.5 3.7 9.5 6.7v1.8H6.5V12h3v10H14V12h3l.5-3.5H14z" />
    </svg>
  )
}

const SOCIAL_LINKS = [
  ['Instagram', 'https://www.instagram.com/c.c.s.shpk?igsh=MTh2dm9ybDBlbWhiNg==', InstagramIcon],
  ['LinkedIn', 'https://www.linkedin.com/company/computer-&-copier-systems/', LinkedInIcon],
  ['Facebook', 'https://www.facebook.com/people/CCS/100063607406981/', FacebookIcon],
]

export function SiteFooter({
  copy,
  lang,
  navigate,
  logoSrc,
  services,
  titleFor,
  LinkComponent,
}) {
  const Link = LinkComponent
  const isAl = lang === 'al'

  return (
    <footer className="ft">
      <div className="ft__wordmark" aria-hidden="true">
        CCS
      </div>

      <div className="ft__container">
        <div className="ft__top">
          <div className="ft__brand">
            <Link to="/" navigate={navigate} className="ft__logo">
              <img src={logoSrc} alt="C.C.S" />
            </Link>
            <p>{copy.shop.footer}</p>
            <ul className="ft__social">
              {SOCIAL_LINKS.map(([label, href, Icon]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="ft__nav" aria-label={isAl ? 'Navigimi i fundit te faqes' : 'Footer navigation'}>
            <div className="ft__col">
              <h2>{copy.nav.itSolution}</h2>
              {services.map((service) => (
                <Link to={service.to} navigate={navigate} key={service.key}>
                  {titleFor(service, lang)}
                </Link>
              ))}
            </div>

            <div className="ft__col">
              <h2>{copy.nav.products}</h2>
              <Link to="/product-category/hardware/" navigate={navigate}>
                {copy.nav.hardware}
              </Link>
              <Link to="/product-category/software/" navigate={navigate}>
                {copy.nav.software}
              </Link>
              <Link to="/products-hp/" navigate={navigate}>
                {copy.nav.hpProducts}
              </Link>
              <Link to="/shop/" navigate={navigate}>
                {copy.common.viewShop}
              </Link>
            </div>

            <div className="ft__col">
              <h2>{copy.nav.about}</h2>
              <Link to="/#about" navigate={navigate}>
                {copy.nav.aboutUs}
              </Link>
              <Link to="/#partners" navigate={navigate}>
                {copy.nav.partners}
              </Link>
              <Link to="/#certification" navigate={navigate}>
                {copy.nav.certifications}
              </Link>
              <Link to="/case-studies/" navigate={navigate}>
                {copy.nav.caseStudies}
              </Link>
            </div>

            <div className="ft__col">
              <h2>{copy.home.contactTitle}</h2>
              <a href="mailto:info@ccs.al">info@ccs.al</a>
              <a href="tel:+35542259005">+ 04 225 9005</a>
              <span>{copy.home.address}</span>
              <span>
                {copy.home.open} · {copy.home.closed}
              </span>
            </div>
          </nav>
        </div>
      </div>

      <div className="ft__container ft__bottom">
        <p>&copy; 2026 Computer &amp; Copier Systems. {isAl ? 'Te gjitha te drejtat te rezervuara.' : 'All rights reserved.'}</p>
        <p>{isAl ? 'Tirane, Shqiperi · Qe nga 1993' : 'Tirana, Albania · Since 1993'}</p>
        <button
          type="button"
          className="ft__top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {isAl ? 'Kthehu lart' : 'Back to top'}
          <ArrowUp size={16} aria-hidden="true" />
        </button>
      </div>
    </footer>
  )
}
