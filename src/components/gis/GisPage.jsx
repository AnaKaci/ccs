import {
  ArrowRight,
  Blend,
  ChartColumn,
  ChartPie,
  Combine,
  Database,
  FileCheck,
  FileText,
  FolderTree,
  Globe,
  Layers,
  Mail,
  Map,
  MapPinned,
  MousePointerClick,
  Phone,
  Presentation,
  RefreshCw,
  Satellite,
  ScanLine,
  ScanSearch,
  Share2,
  Smartphone,
  Workflow,
} from 'lucide-react'
import { GIS_AREAS, GIS_INTRO } from './gisContent'
import './gis.css'

// Icons for each service, keyed by the ids in gisContent.js.
const ICONS = {
  collection: Satellite,
  digitization: ScanLine,
  geodatabase: Database,
  processing: Workflow,
  quality: FileCheck,
  harmonization: Blend,
  metadata: FileText,
  maintenance: RefreshCw,
  spatialAnalysis: ScanSearch,
  thematicMapping: Map,
  visualization: ChartPie,
  reporting: Presentation,
  cartography: MapPinned,
  dataProcessing: Workflow,
  wms: Layers,
  wfs: FolderTree,
  interactiveMaps: MousePointerClick,
  publishing: Share2,
  customApps: Globe,
  webMapping: Map,
  webVisualization: ChartColumn,
  webTools: ScanSearch,
  integration: Combine,
  sharing: Share2,
  responsive: Smartphone,
  data: Database,
  analysis: ChartColumn,
  maps: Map,
  webgis: Globe,
}

const pick = (value, isAl) => (isAl ? value.al : value.en)

export default function GisPage({ lang, navigate, AppLink, homeLabel, heroImage, illustration }) {
  const isAl = lang === 'al'

  return (
    <div className="hp sol gis">
      <section className="sol-hero gis-hero" style={{ '--sol-image': `url(${heroImage})` }}>
        <div className="sol-wrap sol-hero__inner">
          <nav className="sol-crumbs" aria-label={isAl ? 'Gjurma' : 'Breadcrumb'}>
            <AppLink to="/" navigate={navigate}>{homeLabel}</AppLink>
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
              <p>{pick(GIS_INTRO.overview, isAl)}</p>
            </div>
            <figure className="gis-overview__art">
              <img src={illustration} alt="" width="211" height="211" loading="lazy" />
            </figure>
          </div>

          <ol className="gis-cards">
            {GIS_AREAS.map((area, index) => {
              const Icon = ICONS[area.icon]
              return (
                <li key={area.id} className="gis-svc" style={{ '--gis-accent': area.color }}>
                  <a href={`#${area.id}`}>
                    <span className="gis-svc__top">
                      <span className="gis-svc__icon">
                        <Icon size={26} aria-hidden="true" />
                      </span>
                      <span className="gis-svc__num">{String(index + 1).padStart(2, '0')}</span>
                    </span>
                    <strong>{pick(area.title, isAl)}</strong>
                    <span className="gis-svc__text">{pick(area.summary, isAl)}</span>
                    <span className="gis-svc__more">
                      {isAl ? 'Lexo më shumë' : 'Read more'}
                      <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </a>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {GIS_AREAS.map((area, areaIndex) => {
        const AreaIcon = ICONS[area.icon]
        return (
          <section
            key={area.id}
            id={area.id}
            className={`sol-section gis-area ${areaIndex % 2 === 0 ? 'sol-section--alt' : ''}`}
            style={{ '--gis-accent': area.color }}
          >
            <div className="sol-wrap gis-area__inner">
              <header className="gis-area__head">
                <span className="gis-area__index">
                  <AreaIcon size={22} aria-hidden="true" />
                  {String(areaIndex + 1).padStart(2, '0')} / {String(GIS_AREAS.length).padStart(2, '0')}
                </span>
                <h2>{pick(area.title, isAl)}</h2>
                <p>{pick(area.summary, isAl)}</p>
                {area.lead && <p className="gis-area__lead">{pick(area.lead, isAl)}</p>}
              </header>

              <ol className={`gis-items gis-items--${area.items.length % 2 === 0 ? 'even' : 'odd'}`}>
                {area.items.map((item, index) => {
                  const Icon = ICONS[item.icon]
                  const [stepColor, stepInk] = GIS_STEPS[index % GIS_STEPS.length]
                  return (
                    <li key={item.icon + index} className="gis-item" style={{ '--gis-step': stepColor, '--gis-step-ink': stepInk }}>
                      <span className="gis-item__num">{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <h3>
                          <Icon size={20} aria-hidden="true" />
                          {pick(item.title, isAl)}
                        </h3>
                        <p>{pick(item.body, isAl)}</p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          </section>
        )
      })}

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
              <Phone size={18} aria-hidden="true" />
              + 04 225 9005
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

// The deck's spectrum: deep navy -> ocean -> teal -> green -> lime.
// Each entry is [badge color, number color]; light greens get dark ink for contrast.
const GIS_STEPS = [
  ['#004b79', '#ffffff'],
  ['#016d86', '#ffffff'],
  ['#068895', '#ffffff'],
  ['#0f7f6a', '#ffffff'],
  ['#48b861', '#0b2e3a'],
  ['#7cc25a', '#0b2e3a'],
  ['#9fd063', '#0b2e3a'],
  ['#195b45', '#ffffff'],
]
