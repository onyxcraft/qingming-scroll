import { useRef } from 'react'
import type { Hotspot, Category } from '../types'
import { CATEGORY_META } from '../types'

interface MiniMapProps {
  progress: number
  viewportRatio: number
  hotspots: Hotspot[]
  activeFilter: Category | null
  onJump: (progress: number) => void
}

export default function MiniMap({ progress, viewportRatio, hotspots, activeFilter, onJump }: MiniMapProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const handlePointer = (e: React.PointerEvent) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const p = (e.clientX - rect.left) / rect.width
    onJump(Math.max(0, Math.min(1, p)))
  }

  const viewportPercent = Math.max(5, Math.min(100, viewportRatio * 100))
  const maxLeft = 100 - viewportPercent
  const leftPercent = progress * maxLeft

  return (
    <div className="h-14 bg-scroll-100 border-t border-scroll-200 px-4 md:px-6 flex items-center gap-3 shrink-0">
      <span className="hidden sm:inline text-xs text-ink-700 tracking-widest shrink-0 font-serif">
        导航
      </span>
      <div
        ref={trackRef}
        onPointerDown={handlePointer}
        className="relative flex-1 h-7 bg-scroll-200 rounded cursor-pointer overflow-hidden"
        role="slider"
        aria-label="画卷位置"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        {hotspots.map((h) => {
          const dimmed = activeFilter !== null && h.category !== activeFilter
          return (
            <span
              key={h.id}
              className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${
                CATEGORY_META[h.category].bg
              } ${dimmed ? 'opacity-20' : 'opacity-90'}`}
              style={{ left: `${h.position.x}%` }}
            />
          )
        })}
        <span
          className="absolute top-0 bottom-0 bg-ink-900/10 border-x-2 border-ink-900/40 pointer-events-none rounded-sm"
          style={{
            left: `${leftPercent}%`,
            width: `${viewportPercent}%`,
          }}
        />
      </div>
      <span className="text-xs text-ink-700 tabular-nums shrink-0 w-12 text-right font-sans">
        {Math.round(progress * 100)}%
      </span>
    </div>
  )
}
