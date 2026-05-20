import { useState, useMemo, useEffect } from 'react'
import IntroScreen from './components/IntroScreen'
import FilterBar from './components/FilterBar'
import Scroll from './components/Scroll'
import DetailPanel from './components/DetailPanel'
import Quiz from './components/Quiz'
import hotspotsData from './data/hotspots.json'
import type { Hotspot, Category } from './types'
import { useProgress } from './hooks/useProgress'

const HOTSPOTS = hotspotsData as Hotspot[]

export default function App() {
  const [started, setStarted] = useState(false)
  const [activeFilter, setActiveFilter] = useState<Category | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [quizOpen, setQuizOpen] = useState(false)
  const { exploredIds, markExplored } = useProgress()

  const devMode = useMemo(() => {
    if (typeof window === 'undefined') return false
    return new URLSearchParams(window.location.search).get('dev') === '1'
  }, [])

  const filtered = useMemo(() => {
    if (activeFilter === null) return HOTSPOTS
    return HOTSPOTS.filter((h) => h.category === activeFilter)
  }, [activeFilter])

  const counts = useMemo(() => {
    const c: Record<Category, number> = { commerce: 0, transport: 0, people: 0, building: 0 }
    HOTSPOTS.forEach((h) => {
      c[h.category]++
    })
    return c
  }, [])

  const selectedIdx = filtered.findIndex((h) => h.id === selectedId)
  const selectedHotspot = selectedIdx >= 0 ? filtered[selectedIdx] : null

  useEffect(() => {
    if (selectedId !== null) markExplored(selectedId)
  }, [selectedId, markExplored])

  const handleHotspotClick = (h: Hotspot) => setSelectedId(h.id)
  const handleClose = () => setSelectedId(null)
  const handlePrev = () => {
    if (selectedIdx > 0) setSelectedId(filtered[selectedIdx - 1].id)
  }
  const handleNext = () => {
    if (selectedIdx >= 0 && selectedIdx < filtered.length - 1) {
      setSelectedId(filtered[selectedIdx + 1].id)
    }
  }
  const handleFilterChange = (f: Category | null) => {
    setActiveFilter(f)
    setSelectedId(null)
  }

  const quizUnlocked = exploredIds.length >= HOTSPOTS.length

  if (!started) {
    return <IntroScreen onStart={() => setStarted(true)} />
  }

  return (
    <div className="h-screen bg-scroll-50 flex flex-col overflow-hidden">
      <FilterBar
        activeFilter={activeFilter}
        counts={counts}
        onChange={handleFilterChange}
        totalExplored={exploredIds.length}
        total={HOTSPOTS.length}
      />
      <main className="flex-1 relative overflow-hidden">
        <Scroll
          hotspots={HOTSPOTS}
          activeFilter={activeFilter}
          selectedHotspotId={selectedId}
          onHotspotClick={handleHotspotClick}
          exploredIds={exploredIds}
          devMode={devMode}
        />
      </main>

      {quizUnlocked && !selectedHotspot && !quizOpen && (
        <button
          type="button"
          onClick={() => setQuizOpen(true)}
          className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-30 px-5 py-3 bg-cinnabar-500 hover:bg-cinnabar-600 text-scroll-50 font-serif tracking-widest rounded-full shadow-lg animate-slide-up"
        >
          ★ 小 测 验
        </button>
      )}

      <DetailPanel
        hotspot={selectedHotspot}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={selectedIdx > 0}
        hasNext={selectedIdx >= 0 && selectedIdx < filtered.length - 1}
        indexInfo={{
          current: selectedIdx + 1,
          total: filtered.length,
        }}
      />

      {quizOpen && <Quiz onClose={() => setQuizOpen(false)} />}
    </div>
  )
}
