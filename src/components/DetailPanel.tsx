import { useEffect } from 'react'
import type { Hotspot } from '../types'
import { CATEGORY_META } from '../types'

interface DetailPanelProps {
  hotspot: Hotspot | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
  indexInfo: { current: number; total: number }
}

export default function DetailPanel({
  hotspot,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  indexInfo,
}: DetailPanelProps) {
  useEffect(() => {
    if (!hotspot) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft' && hasPrev) onPrev()
      else if (e.key === 'ArrowRight' && hasNext) onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [hotspot, hasPrev, hasNext, onClose, onPrev, onNext])

  if (!hotspot) return null
  const meta = CATEGORY_META[hotspot.category]

  return (
    <>
      <div
        className="fixed inset-0 bg-ink-900/30 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        className="fixed z-50 bg-scroll-50 shadow-2xl flex flex-col
          inset-x-0 bottom-0 h-[88vh] rounded-t-2xl animate-slide-up
          md:inset-y-0 md:right-0 md:left-auto md:top-0 md:h-full md:w-[480px] md:rounded-none md:animate-slide-in-right"
      >
        <header className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-scroll-200 shrink-0">
          <div className="min-w-0 pr-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-block w-2 h-2 rounded-full ${meta.bg}`} />
              <span className={`text-xs tracking-[0.3em] ${meta.text} font-sans`}>
                {meta.label}
              </span>
              <span className="text-xs text-ink-700/60 font-sans tabular-nums">
                {indexInfo.current} / {indexInfo.total}
              </span>
            </div>
            <h2 id="detail-title" className="font-serif text-3xl text-ink-900 leading-tight">
              {hotspot.title}
            </h2>
            <p className="text-ink-700 mt-1.5 text-sm font-sans">{hotspot.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full hover:bg-scroll-100 transition-colors text-ink-700 text-2xl leading-none"
          >
            ×
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <p className="text-ink-800 text-[15px] md:text-base leading-loose font-sans tracking-wide">
            {hotspot.description}
          </p>

          <div className="border-l-4 border-cinnabar-500 bg-scroll-100/80 pl-5 pr-4 py-4 rounded-r">
            <p className="text-xs tracking-[0.3em] text-cinnabar-600 mb-3 font-serif">
              史 料 出 处
            </p>
            <p className="font-serif text-ink-900 leading-loose mb-3 text-[15px]">
              「{hotspot.source.quote}」
            </p>
            <p className="text-sm text-ink-700 font-sans">
              —{' '}
              <span className="font-serif">{hotspot.source.author}</span>
              {' 《'}
              <span className="font-serif">{hotspot.source.book}</span>
              {'》 · '}
              <span className="font-serif">{hotspot.source.volume}</span>
            </p>
          </div>
        </div>

        <footer className="flex border-t border-scroll-200 bg-scroll-100 shrink-0">
          <button
            type="button"
            onClick={onPrev}
            disabled={!hasPrev}
            className="flex-1 py-4 px-4 text-ink-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-scroll-200 transition-colors flex items-center justify-center gap-2 font-serif tracking-widest"
          >
            ← 上一处
          </button>
          <div className="w-px bg-scroll-200" />
          <button
            type="button"
            onClick={onNext}
            disabled={!hasNext}
            className="flex-1 py-4 px-4 text-ink-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-scroll-200 transition-colors flex items-center justify-center gap-2 font-serif tracking-widest"
          >
            下一处 →
          </button>
        </footer>
      </aside>
    </>
  )
}
