import { useState } from 'react'

interface Question {
  q: string
  options: string[]
  correct: number
  explain: string
}

const QUESTIONS: Question[] = [
  {
    q: '《清明上河图》中的「虹桥」最特别的建筑结构是什么？',
    options: ['有十几根桥墩', '用石头砌成', '不用桥墩,完全靠巨木相互穿插架成', '只有皇帝可以走'],
    correct: 2,
    explain: '虹桥是「无柱飞桥」,用巨木榫卯架成拱形,既能承重又不阻碍船只通行,是北宋工匠的伟大发明。',
  },
  {
    q: '北宋汴京的「正店」是什么？',
    options: ['官府的办事处', '拥有官方酿酒权的大酒楼', '专卖正品衣服的店', '皇帝赐名的店铺'],
    correct: 1,
    explain: '正店是有酿酒权的大酒楼,汴京共有 72 家,门前装饰豪华的「彩楼欢门」是其标志。',
  },
  {
    q: '汴河漕运每年大约从江南运多少粮食到汴京？',
    options: ['几十万石', '一百万石左右', '六百万石左右', '上亿石'],
    correct: 2,
    explain: '北宋鼎盛时期,汴河每年漕运东南粮食约 600 万石,是养活百万人口的都城和庞大军队的命脉。',
  },
  {
    q: '北宋的城市与唐代相比,最重要的变化是什么？',
    options: ['城市变小了', '取消了严格的「坊市制」,允许沿街开店、夜市营业', '增加了城墙', '人口减少了'],
    correct: 1,
    explain: '唐代实行严格的坊市制(住宅区和商业区分开,夜禁),北宋废除了这种制度,城市变得开放、自由、24小时不眠。',
  },
  {
    q: '北宋瓦肆里最受欢迎的「说书」节目,后来发展成了什么文学体裁？',
    options: ['唐诗', '宋词', '明清章回小说', '元杂剧'],
    correct: 2,
    explain: '瓦肆说书让叙事艺术走向平民,这种口头叙事传统后来直接催生了明清的《三国演义》《水浒传》等章回小说。',
  },
]

interface QuizProps {
  onClose: () => void
}

export default function Quiz({ onClose }: QuizProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const onSelect = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
  }

  const onNext = () => {
    if (selected === null) return
    const newAnswers = [...answers, selected]
    setAnswers(newAnswers)
    setSelected(null)
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      setShowResult(true)
    }
  }

  const score = answers.filter((a, i) => a === QUESTIONS[i].correct).length

  if (showResult) {
    return (
      <Overlay onClose={onClose}>
        <h2 className="font-serif text-3xl text-ink-900 mb-2">测验结果</h2>
        <div className="my-8 text-center">
          <p className="font-serif text-7xl text-cinnabar-500 tabular-nums">
            {score}
            <span className="text-2xl text-ink-700/60"> / {QUESTIONS.length}</span>
          </p>
          <p className="mt-4 text-ink-700">
            {score === 5 ? '满分！你是真正读懂了汴京。' : score >= 3 ? '不错,北宋的轮廓已在你心中。' : '再去画卷里走一走吧。'}
          </p>
        </div>
        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
          {QUESTIONS.map((q, i) => {
            const correct = answers[i] === q.correct
            return (
              <div key={i} className="text-sm border-l-2 pl-3 py-1 border-scroll-300">
                <p className="text-ink-800">
                  {correct ? '✓' : '✗'} 第 {i + 1} 题{correct ? ' · 正确' : ''}
                </p>
                {!correct && <p className="text-ink-700 mt-1">{q.explain}</p>}
              </div>
            )
          })}
        </div>
        <button
          onClick={onClose}
          className="mt-8 w-full py-3 bg-cinnabar-500 hover:bg-cinnabar-600 text-scroll-50 font-serif tracking-widest"
        >
          关闭
        </button>
      </Overlay>
    )
  }

  const q = QUESTIONS[step]
  return (
    <Overlay onClose={onClose}>
      <p className="text-xs tracking-[0.3em] text-cinnabar-600 mb-2 font-serif">
        第 {step + 1} / {QUESTIONS.length} 题
      </p>
      <h2 className="font-serif text-xl text-ink-900 leading-relaxed mb-6">{q.q}</h2>
      <div className="space-y-3">
        {q.options.map((opt, i) => {
          const isSelected = selected === i
          const isCorrect = i === q.correct
          const reveal = selected !== null
          const cls = !reveal
            ? 'border-scroll-200 hover:bg-scroll-100'
            : isCorrect
            ? 'border-cat-building bg-cat-building/10 text-ink-900'
            : isSelected
            ? 'border-cinnabar-500 bg-cinnabar-500/10 text-ink-900'
            : 'border-scroll-200 opacity-50'
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              disabled={selected !== null}
              className={`block w-full text-left px-4 py-3 border rounded transition-colors text-ink-800 font-sans ${cls}`}
            >
              <span className="text-ink-700/60 mr-2 font-serif">{['A', 'B', 'C', 'D'][i]}.</span>
              {opt}
            </button>
          )
        })}
      </div>
      {selected !== null && (
        <div className="mt-4 p-3 bg-scroll-100 border-l-2 border-cinnabar-500 text-sm text-ink-800">
          {q.explain}
        </div>
      )}
      <button
        onClick={onNext}
        disabled={selected === null}
        className="mt-6 w-full py-3 bg-cinnabar-500 hover:bg-cinnabar-600 disabled:opacity-30 disabled:cursor-not-allowed text-scroll-50 font-serif tracking-widest transition-colors"
      >
        {step < QUESTIONS.length - 1 ? '下一题 →' : '查看结果'}
      </button>
    </Overlay>
  )
}

function Overlay({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 bg-ink-900/40 backdrop-blur-sm z-40 animate-fade-in" onClick={onClose} />
      <div className="fixed z-50 inset-0 flex items-center justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto bg-scroll-50 w-full max-w-md p-6 md:p-8 rounded-lg shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  )
}
