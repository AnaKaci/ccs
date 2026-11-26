import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import './gis-map.css'

/*
 * GIS services shown the way a GIS application works, around the C.C.S office in Tirana.
 * The four service areas are map "layers": choosing one switches the map to a matching
 * view (satellite, analysis canvas, topographic, street) and opens a card that slides
 * through that area's services. One marker shows the C.C.S office.
 * MapLibre loads only when this page opens.
 */

// C.C.S sh.p.k., Rruga Sulejman Delvina Nr. 8, Tirana (same place as the site's Google Maps link).
const CCS_OFFICE = [19.812785, 41.3182471]
const CCS_MAPS_URL =
  'https://www.google.com/maps/place/CCS/@41.3182471,19.812785,19z/data=!4m6!3m5!1s0x135030fe090c438d:0x1fa870c29319170c!8m2!3d41.3182471!4d19.812785'
const OFFICE_ZOOM = 17

const ESRI = 'https://server.arcgisonline.com/ArcGIS/rest/services'

// One look per service area: a basemap plus optional reference overlays (roads, place names).
const VIEWS = {
  'spatial-data-management': {
    services: ['World_Imagery', 'Reference/World_Transportation', 'Reference/World_Boundaries_and_Places'],
    name: { en: 'Satellite imagery', al: 'Imazhe satelitore' },
    attribution: 'Imagery &copy; Esri, Maxar, Earthstar Geographics',
  },
  'gis-analysis-reporting': {
    services: ['Canvas/World_Light_Gray_Base', 'Canvas/World_Light_Gray_Reference'],
    maxzoom: 16,
    name: { en: 'Analysis canvas', al: 'Hartë bazë për analiza' },
    attribution: 'Light Gray Canvas &copy; Esri',
  },
  'map-data-services': {
    services: ['World_Topo_Map'],
    name: { en: 'Topographic map', al: 'Hartë topografike' },
    attribution: 'Topographic map &copy; Esri',
  },
  'webgis-development': {
    services: ['World_Street_Map'],
    name: { en: 'Street map', al: 'Hartë rrugore' },
    attribution: 'Street map &copy; Esri',
  },
}

const layerIds = (areaId) => VIEWS[areaId].services.map((_, index) => `${areaId}-${index}`)

const FADE_MS = 500

function buildStyle(areas, activeId) {
  const sources = {}
  const layers = []
  areas.forEach((area) => {
    const view = VIEWS[area.id]
    const visible = area.id === activeId
    view.services.forEach((service, index) => {
      const id = `${area.id}-${index}`
      sources[id] = {
        type: 'raster',
        tiles: [`${ESRI}/${service}/MapServer/tile/{z}/{y}/{x}`],
        tileSize: 256,
        maxzoom: view.maxzoom || 19,
        attribution: index === 0 ? view.attribution : undefined,
      }
      layers.push({
        id,
        type: 'raster',
        source: id,
        layout: { visibility: visible ? 'visible' : 'none' },
        paint: { 'raster-opacity': visible ? 1 : 0, 'raster-opacity-transition': { duration: FADE_MS, delay: 0 } },
      })
    })
  })
  return { version: 8, sources, layers }
}

// The office marker: a label card above a red pin; it opens directions in Google Maps.
function officeMarker(isAl, address) {
  const link = document.createElement('a')
  link.className = 'gis-office'
  link.href = CCS_MAPS_URL
  link.target = '_blank'
  link.rel = 'noreferrer'
  link.setAttribute('aria-label', `C.C.S sh.p.k. - ${address}`)

  const card = document.createElement('span')
  card.className = 'gis-office__card'
  const name = document.createElement('strong')
  name.textContent = 'C.C.S sh.p.k.'
  const line = document.createElement('small')
  line.textContent = address
  const cta = document.createElement('em')
  cta.textContent = isAl ? 'Merr udhëzime' : 'Get directions'
  card.append(name, line, cta)

  const pin = document.createElement('span')
  pin.className = 'gis-office__pin'
  link.append(card, pin)
  return link
}

// Keep the office between the layer panel and the service card (or above the card on phones).
function officePadding(container) {
  if (container.clientWidth < 900) return { top: 150, bottom: 380, left: 0, right: 0 }
  return { top: 40, bottom: 40, left: 360, right: 480 }
}

// Cross-fade a raster layer in or out; hidden layers are switched off so their tiles are not fetched.
function fadeLayer(map, id, show, timers) {
  if (!map.getLayer(id)) return
  window.clearTimeout(timers[id])
  if (show) {
    map.setLayoutProperty(id, 'visibility', 'visible')
    map.setPaintProperty(id, 'raster-opacity', 1)
  } else {
    map.setPaintProperty(id, 'raster-opacity', 0)
    timers[id] = window.setTimeout(() => map.getLayer(id) && map.setLayoutProperty(id, 'visibility', 'none'), FADE_MS)
  }
}

function AreaSlides({ area, areaIndex, areas, isAl, slide, setSlide, onOpenArea }) {
  const total = area.items.length
  const nextArea = areas[(areaIndex + 1) % areas.length]
  const t = (value) => (isAl ? value.al : value.en)

  return (
    <div className="gis-pop__inner" style={{ '--gis-accent': area.color }}>
      <header className="gis-pop__head">
        <span className="gis-pop__badge">{areaIndex + 1}</span>
        <div>
          <small>
            {isAl ? 'Pamja e hartës' : 'Map view'}: {t(VIEWS[area.id].name)}
          </small>
          <strong>{t(area.title)}</strong>
        </div>
      </header>

      <p className="gis-pop__summary">{t(area.summary)}</p>

      <div className="gis-pop__viewport" aria-live="polite">
        <ol className="gis-pop__track" style={{ transform: `translateX(-${slide * 100}%)` }}>
          {area.items.map((item, index) => (
            <li key={item.icon + index} className="gis-pop__slide" aria-hidden={index !== slide}>
              <span className="gis-pop__count">
                {index + 1} / {total}
              </span>
              <h3>{t(item.title)}</h3>
              <p>{t(item.body)}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="gis-pop__controls">
        <button
          type="button"
          className="gis-pop__arrow"
          onClick={() => setSlide(slide - 1)}
          disabled={slide === 0}
          aria-label={isAl ? 'Shërbimi i mëparshëm' : 'Previous service'}
        >
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <div className="gis-pop__dots">
          {area.items.map((item, index) => (
            <button
              key={item.icon + index}
              type="button"
              className={index === slide ? 'is-active' : ''}
              onClick={() => setSlide(index)}
              aria-label={`${index + 1} / ${total}`}
            />
          ))}
        </div>
        {slide < total - 1 ? (
          <button
            type="button"
            className="gis-pop__arrow gis-pop__arrow--next"
            onClick={() => setSlide(slide + 1)}
            aria-label={isAl ? 'Shërbimi tjetër' : 'Next service'}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        ) : (
          <button type="button" className="gis-pop__area-next" onClick={() => onOpenArea((areaIndex + 1) % areas.length)}>
            {t(nextArea.title)}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}

export default function GisMap({ areas, isAl, address }) {
  const mapNodeRef = useRef(null)
  const mapRef = useRef(null)
  const timersRef = useRef({})
  const [active, setActive] = useState(0)
  const [slide, setSlide] = useState(0)
  const [failed, setFailed] = useState(false)
  // The layer shown when the map is created; later changes cross-fade instead.
  const initialRef = useRef(areas[0].id)

  const openArea = (index) => {
    setActive(index)
    setSlide(0)
  }

  // Create the map once (recreated on language change so the gesture hints are translated).
  useEffect(() => {
    let cancelled = false
    const timers = timersRef.current

    Promise.all([
      import('maplibre-gl'),
      import('maplibre-gl/dist/maplibre-gl-worker.mjs?url'),
      import('maplibre-gl/dist/maplibre-gl.css'),
    ])
      .then(([maplibre, worker]) => {
        if (cancelled || !mapNodeRef.current) return
        maplibre.setWorkerUrl(worker.default)

        const map = new maplibre.Map({
          container: mapNodeRef.current,
          style: buildStyle(areas, initialRef.current),
          center: CCS_OFFICE,
          zoom: OFFICE_ZOOM,
          minZoom: 11,
          maxZoom: 19,
          cooperativeGestures: true,
          attributionControl: { compact: true },
          locale: isAl
            ? {
                'CooperativeGesturesHandler.WindowsHelpText': 'Përdorni Ctrl + rrotën e miut për të zmadhuar hartën',
                'CooperativeGesturesHandler.MacHelpText': 'Përdorni ⌘ + rrotën e miut për të zmadhuar hartën',
                'CooperativeGesturesHandler.MobileHelpText': 'Përdorni dy gishta për të lëvizur hartën',
              }
            : undefined,
        })
        map.addControl(new maplibre.NavigationControl({ showCompass: false }), 'bottom-left')
        map.jumpTo({ center: CCS_OFFICE, zoom: OFFICE_ZOOM, padding: officePadding(mapNodeRef.current) })
        new maplibre.Marker({ element: officeMarker(isAl, address), anchor: 'bottom' }).setLngLat(CCS_OFFICE).addTo(map)
        map.on('error', (event) => console.warn('[GIS map]', event.error?.message || event))
        mapRef.current = map
      })
      .catch(() => !cancelled && setFailed(true))

    return () => {
      cancelled = true
      Object.values(timers).forEach((timer) => window.clearTimeout(timer))
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [isAl, areas, address])

  // Switch the map view to match the selected service area.
  useEffect(() => {
    const id = areas[active].id
    initialRef.current = id
    const map = mapRef.current
    if (!map) return
    const apply = () => {
      areas.forEach((area) => layerIds(area.id).forEach((layerId) => fadeLayer(map, layerId, area.id === id, timersRef.current)))
    }
    if (map.isStyleLoaded()) apply()
    else map.once('load', apply)
  }, [active, areas])

  // A link like /gis/#map-data-services opens that area straight away. Read the hash one tick
  // later: on a GitHub Pages deep link the router restores the real URL just after this mounts.
  useEffect(() => {
    const openFromHash = () => {
      const index = areas.findIndex((area) => `#${area.id}` === window.location.hash)
      if (index === -1) return
      setActive(index)
      setSlide(0)
      document.getElementById('gis-services')?.scrollIntoView({ block: 'start' })
    }
    const timer = window.setTimeout(openFromHash, 0)
    window.addEventListener('hashchange', openFromHash)
    window.addEventListener('popstate', openFromHash)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('hashchange', openFromHash)
      window.removeEventListener('popstate', openFromHash)
    }
  }, [areas])

  const area = areas[active]

  return (
    <div className={`gis-map ${failed ? 'is-failed' : ''}`}>
      <div className="gis-map__canvas" ref={mapNodeRef} />

      <aside className="gis-map__layers" aria-label={isAl ? 'Shtresat e shërbimeve GIS' : 'GIS service layers'}>
        <p className="gis-map__layers-title">{isAl ? 'Shtresat e shërbimeve' : 'Service layers'}</p>
        <ol>
          {areas.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                className={active === index ? 'is-active' : ''}
                style={{ '--gis-accent': item.color }}
                onClick={() => openArea(index)}
                aria-pressed={active === index}
              >
                <span className="gis-map__check" aria-hidden="true" />
                <span className="gis-map__layer-text">
                  <strong>{isAl ? item.title.al : item.title.en}</strong>
                  <small>{isAl ? VIEWS[item.id].name.al : VIEWS[item.id].name.en}</small>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </aside>

      <div className="gis-map__card gis-pop" key={area.id}>
        <AreaSlides
          area={area}
          areaIndex={active}
          areas={areas}
          isAl={isAl}
          slide={slide}
          setSlide={setSlide}
          onOpenArea={openArea}
        />
      </div>
    </div>
  )
}
