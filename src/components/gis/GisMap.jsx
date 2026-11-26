import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ArrowRight, MapPin, X } from 'lucide-react'
import './gis-map.css'

/*
 * Interactive map of the four GIS service areas.
 * Each area is a labelled marker; clicking it flies the map there and opens a popup
 * that slides through the area's services. MapLibre loads only when this page opens.
 */

// Marker positions across Albania (illustrative placement, one per service area).
const POSITIONS = {
  'spatial-data-management': [19.8187, 41.3275],
  'gis-analysis-reporting': [19.5126, 42.0683],
  'map-data-services': [20.7808, 40.6186],
  'webgis-development': [19.4914, 40.4661],
}

// Esri World Imagery (satellite) with Esri's boundaries and place names on top. No API key needed.
const SATELLITE_STYLE = {
  version: 8,
  sources: {
    imagery: {
      type: 'raster',
      tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
      tileSize: 256,
      maxzoom: 19,
      attribution: 'Imagery &copy; Esri, Maxar, Earthstar Geographics',
    },
    places: {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
      maxzoom: 19,
      attribution: 'Labels &copy; Esri',
    },
  },
  layers: [
    { id: 'imagery', type: 'raster', source: 'imagery' },
    { id: 'places', type: 'raster', source: 'places' },
  ],
}

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function AreaSlides({ area, areaIndex, areas, isAl, slide, setSlide, onClose, onOpenArea }) {
  const total = area.items.length
  const nextArea = areas[(areaIndex + 1) % areas.length]
  const t = (value) => (isAl ? value.al : value.en)

  return (
    <div className="gis-pop__inner" style={{ '--gis-accent': area.color }}>
      <header className="gis-pop__head">
        <span className="gis-pop__badge">{areaIndex + 1}</span>
        <div>
          <small>{isAl ? 'Shërbime GIS' : 'GIS Services'}</small>
          <strong>{t(area.title)}</strong>
        </div>
        <button type="button" className="gis-pop__close" onClick={onClose} aria-label={isAl ? 'Mbyll' : 'Close'}>
          <X size={18} aria-hidden="true" />
        </button>
      </header>

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

export default function GisMap({ areas, isAl }) {
  const mapNodeRef = useRef(null)
  const mapRef = useRef(null)
  const popupRef = useRef(null)
  // Stable DOM nodes that MapLibre positions; React renders into them through portals.
  const [markerNodes] = useState(() => areas.map(() => document.createElement('div')))
  const [popupNode] = useState(() => document.createElement('div'))
  const [active, setActive] = useState(null)
  const [slide, setSlide] = useState(0)
  const [failed, setFailed] = useState(false)
  // Bumped each time a map finishes loading, so the popup is re-attached to the new map.
  const [mapVersion, setMapVersion] = useState(0)

  const openArea = (index) => {
    setActive(index)
    setSlide(0)
  }

  // Create the map once (recreated on language change so the gesture hints are translated).
  useEffect(() => {
    let cancelled = false

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
          style: SATELLITE_STYLE,
          center: [20.05, 41.2],
          zoom: 6.6,
          minZoom: 5,
          maxZoom: 14,
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
        map.addControl(new maplibre.NavigationControl({ showCompass: false }), 'bottom-right')

        const bounds = new maplibre.LngLatBounds()
        areas.forEach((area, index) => {
          bounds.extend(POSITIONS[area.id])
          new maplibre.Marker({ element: markerNodes[index], anchor: 'bottom' }).setLngLat(POSITIONS[area.id]).addTo(map)
        })
        map.fitBounds(bounds, { padding: { top: 110, bottom: 70, left: 80, right: 80 }, duration: 0, maxZoom: 7.4 })

        popupRef.current = new maplibre.Popup({
          anchor: 'bottom',
          offset: 64,
          closeButton: false,
          closeOnClick: false,
          focusAfterOpen: false,
          maxWidth: 'none',
          className: 'gis-pop',
        }).setDOMContent(popupNode)

        mapRef.current = map
        map.once('load', () => !cancelled && setMapVersion((version) => version + 1))
        map.on('error', (event) => console.warn('[GIS map]', event.error?.message || event))
      })
      .catch(() => !cancelled && setFailed(true))

    return () => {
      cancelled = true
      popupRef.current?.remove()
      mapRef.current?.remove()
      mapRef.current = null
      popupRef.current = null
    }
  }, [isAl, areas, markerNodes, popupNode])

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

  // Fly to the selected marker and show its popup.
  useEffect(() => {
    const map = mapRef.current
    const popup = popupRef.current
    if (!map || !popup) return
    if (active === null) {
      popup.remove()
      return
    }
    const center = POSITIONS[areas[active].id]
    popup.setLngLat(center).addTo(map)
    // Put the marker near the bottom of the map so the popup above it fits.
    const { clientWidth, clientHeight } = map.getContainer()
    const camera = { center, zoom: clientWidth < 640 ? 7.4 : 8, offset: [0, Math.max(0, clientHeight / 2 - 60)] }
    if (reducedMotion()) map.jumpTo(camera)
    else map.flyTo({ ...camera, duration: 1400, essential: true })
  }, [active, mapVersion, areas])

  const area = active === null ? null : areas[active]

  return (
    <div className={`gis-map ${area ? 'has-popup' : ''}`}>
      <div className="gis-map__canvas" ref={mapNodeRef} />

      <aside className="gis-map__legend">
        <p>
          <MapPin size={16} aria-hidden="true" />
          {isAl ? 'Klikoni një shenjë në hartë për të parë shërbimet' : 'Select a marker to explore its services'}
        </p>
        <ol>
          {areas.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                className={active === index ? 'is-active' : ''}
                style={{ '--gis-accent': item.color }}
                onClick={() => openArea(index)}
              >
                <span>{index + 1}</span>
                {isAl ? item.title.al : item.title.en}
              </button>
            </li>
          ))}
        </ol>
      </aside>

      {failed && area && (
        <div className="gis-map__fallback gis-pop">
          <AreaSlides
            area={area}
            areaIndex={active}
            areas={areas}
            isAl={isAl}
            slide={slide}
            setSlide={setSlide}
            onClose={() => setActive(null)}
            onOpenArea={openArea}
          />
        </div>
      )}

      {areas.map((item, index) =>
        createPortal(
          <button
            type="button"
            className={`gis-marker ${active === index ? 'is-active' : ''}`}
            style={{ '--gis-accent': item.color }}
            onClick={(event) => {
              event.stopPropagation()
              openArea(index)
            }}
            aria-label={isAl ? item.title.al : item.title.en}
          >
            <span className="gis-marker__label">{isAl ? item.title.al : item.title.en}</span>
            <span className="gis-marker__pin">
              <b>{index + 1}</b>
            </span>
          </button>,
          markerNodes[index],
          item.id,
        ),
      )}

      {area &&
        createPortal(
          <AreaSlides
            area={area}
            areaIndex={active}
            areas={areas}
            isAl={isAl}
            slide={slide}
            setSlide={setSlide}
            onClose={() => setActive(null)}
            onOpenArea={openArea}
          />,
          popupNode,
        )}
    </div>
  )
}
