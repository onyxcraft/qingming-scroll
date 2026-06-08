import { useRef, useState, useEffect, useCallback } from 'react'
import type { Hotspot as HotspotType, Category } from '../types'
import Hotspot from './Hotspot'
import MiniMap from './MiniMap'

interface ScrollProps {
  hotspots: HotspotType[]
  activeFilter: Category | null
  selectedHotspotId: number | null
  onHotspotClick: (h: HotspotType) => void
  exploredIds: number[]
  devMode: boolean
}

const SCROLL_IMAGE = '/images/qingming-full.jpg'

export default function Scroll({
  hotspots,
  activeFilter,
  selectedHotspotId,
  onHotspotClick,
  exploredIds,
  devMode,
}: ScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [viewportRatio, setViewportRatio] = useState(0.2)
  const [imageReady, setImageReady] = useState(false)
  const [imageError, setImageError] = useState(false)
  const isDraggingRef = useRef(false)
  const lastXRef = useRef(0)
  const dragMovedRef = useRef(false)

  const updateProgress = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setScrollProgress(max > 0 ? el.scrollLeft / max : 0)
    setViewportRatio(el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1)
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('[data-hotspot]')) return
    isDraggingRef.current = true
    dragMovedRef.current = false
    lastXRef.current = e.clientX
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return
    const dx = lastXRef.current - e.clientX
    if (Math.abs(dx) > 2) dragMovedRef.current = true
    containerRef.current.scrollLeft += dx
    lastXRef.current = e.clientX
  }

  const onPointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  const onWheel = (e: React.WheelEvent) => {
    if (!containerRef.current) return
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      containerRef.current.scrollLeft += e.deltaY
    }
  }

  const onStageClick = (e: React.MouseEvent) => {
    if (!devMode || !stageRef.current) return
    if (dragMovedRef.current) return
    const target = e.target as HTMLElement
    if (target.closest('[data-hotspot]')) return
    const rect = stageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    console.log(`[DEV] hotspot coord:  "position": { "x": ${x.toFixed(1)}, "y": ${y.toFixed(1)} }`)
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    const ro = new ResizeObserver(updateProgress)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateProgress)
      ro.disconnect()
    }
  }, [updateProgress, imageReady])

  // 手卷传统「从右向左」展开:画面加载后定位到最右端(画卷起点·清明郊外),
  // 让浏览顺序与叙事顺序一致(郊野→虹桥→城门→市井)。如想改回从左开始,删掉此 effect 即可。
  useEffect(() => {
    if (!imageReady) return
    const el = containerRef.current
    if (!el) return
    el.scrollLeft = el.scrollWidth
  }, [imageReady])

  useEffect(() => {
    if (selectedHotspotId === null) return
    const target = hotspots.find((h) => h.id === selectedHotspotId)
    if (!target || !containerRef.current || !imageRef.current) return
    const imgW = imageRef.current.clientWidth
    const targetX = (target.position.x / 100) * imgW
    const containerW = containerRef.current.clientWidth
    containerRef.current.scrollTo({
      left: Math.max(0, targetX - containerW / 2),
      behavior: 'smooth',
    })
  }, [selectedHotspotId, hotspots])

  const onMiniMapJump = (p: number) => {
    const el = containerRef.current
    if (!el) return
    el.scrollTo({ left: p * (el.scrollWidth - el.clientWidth), behavior: 'smooth' })
  }

  return (
    <div className="relative w-full h-full flex flex-col">
      <div
        ref={containerRef}
        className="flex-1 overflow-x-auto overflow-y-hidden cursor-grab no-select bg-scroll-100 active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        onClick={onStageClick}
      >
        <div ref={stageRef} className="relative h-full inline-block">
          <img
            ref={imageRef}
            src={SCROLL_IMAGE}
            alt="《清明上河图》——北宋·张择端"
            className="block h-full w-auto select-none pointer-events-none max-w-none"
            draggable={false}
            onLoad={() => setImageReady(true)}
            onError={() => setImageError(true)}
          />
          {!imageReady && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-scroll-100 px-8" style={{ width: '200vw' }}>
              <p className="text-ink-700 font-serif animate-pulse">画卷加载中…</p>
            </div>
          )}
          {imageError && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center bg-scroll-100 px-8 text-center"
              style={{ width: '300vw' }}
            >
              <p className="font-serif text-2xl md:text-3xl text-ink-900 mb-4">画卷图待放置</p>
              <p className="text-ink-700 max-w-md leading-relaxed font-sans">
                把《清明上河图》图片重命名为
                <code className="mx-1.5 px-2 py-0.5 bg-scroll-200 rounded font-mono text-sm">qingming-full.jpg</code>
                放到
                <code className="mx-1.5 px-2 py-0.5 bg-scroll-200 rounded font-mono text-sm">public/images/</code>
                目录下,然后刷新页面。
              </p>
              <p className="text-ink-700 mt-4 text-sm font-sans">
                推荐图源：故宫博物院数字文物库 / Wikimedia Commons
              </p>
            </div>
          )}
          {imageReady &&
            hotspots.map((h) => {
              const dimmed = activeFilter !== null && h.category !== activeFilter
              return (
                <Hotspot
                  key={h.id}
                  hotspot={h}
                  dimmed={dimmed}
                  explored={exploredIds.includes(h.id)}
                  isSelected={selectedHotspotId === h.id}
                  onClick={() => onHotspotClick(h)}
                />
              )
            })}
        </div>
      </div>
      <MiniMap
        progress={scrollProgress}
        viewportRatio={viewportRatio}
        hotspots={hotspots}
        activeFilter={activeFilter}
        onJump={onMiniMapJump}
      />
      {devMode && (
        <div className="absolute top-2 right-2 z-50 px-3 py-1.5 bg-cinnabar-500 text-scroll-50 text-xs font-mono rounded shadow">
          DEV：点击画卷任意位置 → 控制台查看坐标
        </div>
      )}
    </div>
  )
}
