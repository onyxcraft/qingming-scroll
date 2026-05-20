import type { Category } from '../types'
import { CATEGORIES, CATEGORY_META } from '../types'

interface FilterBarProps {
  activeFilter: Category | null
  counts: Record<Category, number>
  onChange: (f: Category | null) => void
  totalExplored: number
  total: number
}

export default function FilterBar({
  activeFilter,
  counts,
  onChange,
  totalExplored,
  total,
}: FilterBarProps) {
  return (
    <header className="bg-scroll-50/95 backdrop-blur border-b border-scroll-200 sticky top-0 z-30">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 h-[88px] flex items-center justify-between gap-3 md:gap-6">
        <div className="flex items-baseline gap-3 shrink-0">
          <h1 className="font-serif text-xl md:text-2xl text-ink-900 tracking-wider">
            清明上河图
          </h1>
          <span className="hidden sm:inline text-xs text-ink-700 tracking-widest font-sans">
            交互式导览
          </span>
        </div>

        <nav className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <FilterButton
            active={activeFilter === null}
            onClick={() => onChange(null)}
            label="全部"
            count={total}
            colorClass="bg-ink-700"
          />
          {CATEGORIES.map((cat) => (
            <FilterButton
              key={cat}
              active={activeFilter === cat}
              onClick={() => onChange(activeFilter === cat ? null : cat)}
              label={CATEGORY_META[cat].label}
              count={counts[cat] || 0}
              colorClass={CATEGORY_META[cat].bg}
            />
          ))}
        </nav>

        <div className="hidden md:flex items-baseline text-xs text-ink-700 shrink-0 font-sans">
          已探索
          <span className="mx-1.5 font-serif text-lg text-cinnabar-500 tabular-nums">
            {totalExplored}
          </span>
          <span className="text-ink-700/60">/ {total}</span>
        </div>
      </div>
    </header>
  )
}

interface FilterButtonProps {
  active: boolean
  onClick: () => void
  label: string
  count: number
  colorClass: string
}

function FilterButton({ active, onClick, label, count, colorClass }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 px-3 md:px-4 py-2 text-sm font-serif tracking-wide transition-all rounded-full flex items-center gap-2 ${
        active
          ? 'bg-ink-900 text-scroll-50 shadow-md'
          : 'bg-transparent text-ink-800 hover:bg-scroll-100'
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${colorClass}`} />
      {label}
      <span className={`text-xs tabular-nums ${active ? 'opacity-70' : 'opacity-50'}`}>
        {count}
      </span>
    </button>
  )
}
