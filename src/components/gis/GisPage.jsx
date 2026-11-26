import { ArrowRight, Mail, Phone } from 'lucide-react'
import { GIS_AREAS, GIS_INTRO } from './gisContent'
import GisMap from './GisMap'
import './gis.css'

const pick = (value, isAl) => (isAl ? value.al : value.en)

export default function GisPage({ lang, navigate, AppLink, homeLabel, heroImage, address }) {
  const isAl = lang === 'al'

  return (
    <div className="hp sol gis">
      <section className="sol-hero gis-hero" style={{ '--sol-image': `url(${heroImage})` }}>
        <div className="sol-wrap sol-hero__inner">
          <nav className="sol-crumbs" aria-label={isAl ? 'Gjurma' : 'Breadcrumb'}>
            <AppLink to="/" navigate={navigate}>
              {homeLabel}
            </AppLink>
            <span aria-hidden="true">/</span>
            <span>GIS</span>
          </nav>
          <span className="gis-hero__eyebrow">{pick(GIS_INTRO.eyebrow, isAl)}</span>
          <h1>{pick(GIS_INTRO.title, isAl)}</h1>
          <p>{pick(GIS_INTRO.lead, isAl)}</p>
          <div className="sol-hero__actions">
            <a href="#gis-services" className="hp-btn hp-btn--primary">
              {isAl ? 'Shiko shërbimet' : 'Explore services'}
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a href="mailto:info@ccs.al?subject=GIS%20Services" className="hp-btn sol-btn--ghost">
              <Mail size={17} aria-hidden="true" />
              info@ccs.al
            </a>
          </div>
        </div>
        <div className="gis-hero__spectrum" aria-hidden="true" />
      </section>

      <section className="sol-section gis-overview" id="gis-services">
        <div className="sol-wrap">
          <div className="gis-overview__head">
            <div>
              <span className="hp-label">{isAl ? 'Shërbimet GIS' : 'GIS Services'}</span>
              <h2>{pick(GIS_INTRO.overviewTitle, isAl)}</h2>
            </div>
            <p>{pick(GIS_INTRO.overview, isAl)}</p>
          </div>
        </div>
        {/* Full-bleed map, edge to edge. */}
        <GisMap areas={GIS_AREAS} isAl={isAl} address={address} />
      </section>

      <section className="sol-cta">
        <div className="sol-wrap sol-cta__inner">
          <div>
            <h2>{isAl ? 'Keni një projekt GIS?' : 'Planning a GIS project?'}</h2>
            <p>
              {isAl
                ? 'Ekipi GIS i C.C.S ju ndihmon me të dhëna hapësinore, analiza, harta dhe platforma WebGIS, nga ideja deri në mirëmbajtje.'
                : 'The C.C.S GIS team helps with spatial data, analysis, mapping and WebGIS platforms, from first idea to ongoing maintenance.'}
            </p>
          </div>
          <div className="sol-cta__actions">
            <a href="mailto:info@ccs.al?subject=GIS%20Services" className="hp-btn hp-btn--dark">
              <Mail size={18} aria-hidden="true" />
              info@ccs.al
            </a>
            <a href="tel:+35542259005" className="hp-btn hp-btn--outline-light">
              <Phone size={18} aria-hidden="true" />+ 04 225 9005
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
