const SOCIAL_LINKS = [
  ['Instagram', 'https://www.instagram.com/c.c.s.shpk?igsh=MTh2dm9ybDBlbWhiNg=='],
  ['LinkedIn', 'https://www.linkedin.com/company/computer-&-copier-systems/'],
  ['Facebook', 'https://www.facebook.com/people/CCS/100063607406981/'],
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

  return (
    <footer className="site-footer">
      <div className="site-footer__container">
        <div className="site-footer__grid">
          <div className="footer-brand">
            <Link to="/" navigate={navigate} className="footer-logo">
              <img src={logoSrc} alt="C.C.S" />
            </Link>
            <p>{copy.shop.footer}</p>
          </div>

          <div className="footer-column">
            <h2>{copy.nav.itSolution}</h2>
            {services.map((service) => (
              <Link to={service.to} navigate={navigate} key={service.key}>
                {titleFor(service, lang)}
              </Link>
            ))}
          </div>

          <div className="footer-column">
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

          <div className="footer-column">
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

          <div className="footer-column footer-contact">
            <h2>{copy.home.contactTitle}</h2>
            <a href="mailto:info@ccs.al">info@ccs.al</a>
            <a href="tel:+35542259005">+ 04 225 9005</a>
            <span>{copy.home.address}</span>
            <span>{copy.home.open}</span>
            <span>{copy.home.closed}</span>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="footer-bottom">&copy; 2026 CCS. All rights reserved.</p>
          <div className="footer-links">
            {SOCIAL_LINKS.map(([label, href]) => (
              <a href={href} target="_blank" rel="noreferrer" key={label}>
                {label}
              </a>
            ))}
            <Link to="/#contact" navigate={navigate}>
              {copy.nav.contactUs}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
