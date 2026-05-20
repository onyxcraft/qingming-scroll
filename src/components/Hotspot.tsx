import type { Hotspot as HotspotType } from '../types'
import { CATEGORY_META } from '../types'

interface HotspotProps {
  hotspot: HotspotType
  dimmed: boolean
  explored: boolean
  isSelected: boolean
  onClick: () => void
}

export default function Hotspot({ hotspot, dimmed, explored, isSelected, onClick }: HotspotProps) {
  const meta = CATEGORY_META[hotspot.category]

  return (
    <button
      data-hotspot
      type="button"
      onClick={onClick}
      className={`absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none transition-opacity duration-300 z-10 ${
        dimmed ? 'opacity-20' : 'opacity-100'
      }`}
      style={{ left: `${hotspot.position.x}%`, top: `${hotspot.position.y}%` }}
      aria-label={hotspot.title}
    >
      <span
        className={`absolute inset-0 m-auto block w-7 h-7 rounded-full ${meta.bg} animate-pulse-ring opacity-70 pointer-events-none`}
        aria-hidden="true"
      />
      <span
        className={`relative block w-7 h-7 rounded-full ${meta.bg} animate-pulse-dot border-2 border-scroll-50 shadow-md transition-transform ${
          isSelected ? 'ring-4 ring-scroll-50 scale-125' : 'group-hover:scale-110'
        }`}
      >
        {explored && (
          <span
            className="absolute -top-1 -right-1 w-3 h-3 bg-cinnabar-500 rounded-full border border-scroll-50"
            aria-label="已探索"
          />
        )}
      </span>
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-11 px-3 py-1.5 bg-ink-900 text-scroll-50 text-sm whitespace-nowrap font-serif rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
        {hotspot.title}
        <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-ink-900 rotate-45" aria-hidden="true" />
      </span>
    </button>
  )
}
