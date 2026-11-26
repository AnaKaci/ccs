import { useLayoutEffect, useRef, useState } from 'react'

// Marker colors cycle through the C.C.S brand colors.
// Each entry is [marker/border color, number color].
const STEPS = [
  ['#ef4136', '#ffffff'],
  ['#1c9ad6', '#ffffff'],
  ['#efac1f', '#231f20'],
  ['#b41e8e', '#ffffff'],
]

// Builds a smooth road through the marker centres, starting at the top edge and ending at the bottom edge.
function roadPath(points, height) {
  if (!points.length) return ''
  const all = [{ x: points[0].x, y: 0 }, ...points, { x: points[points.length - 1].x, y: height }]
  let d = `M ${all[0].x} ${all[0].y}`
  for (let i = 1; i < all.length; i += 1) {
    const a = all[i - 1]
    const b = all[i]
    const mid = (b.y - a.y) / 2
    d += ` C ${a.x} ${a.y + mid}, ${b.x} ${b.y - mid}, ${b.x} ${b.y}`
  }
  return d
}

// The service items of one GIS area, laid out as a winding road (like the slides):
// numbered map markers sit on the road and the cards alternate on either side.
export default function GisRoad({ items, icons, isAl, id }) {
  const listRef = useRef(null)
  const [road, setRoad] = useState({ d: '', width: 0, height: 0 })

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return undefined

    const measure = () => {
      // offsetTop/offsetLeft ignore the reveal transforms, so the road stays put while cards animate in.
      const points = [...list.querySelectorAll('.gis-road__marker')].map((marker) => {
        const item = marker.offsetParent
        return {
          x: item.offsetLeft + marker.offsetLeft + marker.offsetWidth / 2,
          y: item.offsetTop + marker.offsetTop + marker.offsetHeight / 2,
        }
      })
      const width = list.offsetWidth
      const height = list.offsetHeight
      setRoad({ d: roadPath(points, height), width, height })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => observer.disconnect()
  }, [items, isAl])

  const gradientId = `gis-road-${id}`

  return (
    <div className="gis-road" ref={listRef}>
      <svg
        className="gis-road__svg"
        width={road.width}
        height={road.height}
        viewBox={`0 0 ${road.width || 1} ${road.height || 1}`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={road.height || 1}>
            <stop offset="0%" stopColor="#231f20" />
            <stop offset="100%" stopColor="#3d3638" />
          </linearGradient>
        </defs>
        <path className="gis-road__edge" d={road.d} />
        <path className="gis-road__asphalt" d={road.d} stroke={`url(#${gradientId})`} />
        <path className="gis-road__lane" d={road.d} />
      </svg>

      <ol className="gis-road__list">
        {items.map((item, index) => {
          const Icon = icons[item.icon]
          const [color, ink] = STEPS[index % STEPS.length]
          return (
            <li
              key={item.icon + index}
              className={`gis-road__item ${index % 2 === 0 ? 'is-left' : 'is-right'}`}
              style={{ '--step': color, '--step-ink': ink, '--row': index + 1 }}
            >
              <span className="gis-road__marker">{index + 1}</span>
              <article className="gis-road__card">
                <span className="gis-road__icon">
                  <Icon size={26} aria-hidden="true" />
                </span>
                <div>
                  <h3>{isAl ? item.title.al : item.title.en}</h3>
                  <p>{isAl ? item.body.al : item.body.en}</p>
                </div>
              </article>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
