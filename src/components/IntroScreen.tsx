interface IntroScreenProps {
  onStart: () => void
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="min-h-screen bg-scroll-50 flex items-center justify-center px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, #1A1814 0%, transparent 60%)`,
        }}
      />
      <div className="max-w-3xl mx-auto text-center animate-fade-in relative">
        <p className="text-xs md:text-sm tracking-[0.5em] text-ink-700 mb-8 font-serif">
          北宋 · 张择端
        </p>
        <h1 className="font-serif text-6xl md:text-8xl text-ink-900 mb-6 tracking-[0.15em] leading-none">
          清 明 上 河 图
        </h1>
        <div className="w-20 h-px bg-cinnabar-500 mx-auto mb-8" />
        <p className="font-serif text-xl md:text-2xl text-ink-800 mb-4 tracking-wider">
          交 互 式 导 览
        </p>
        <p className="text-ink-700 text-base md:text-lg leading-loose mb-12 max-w-xl mx-auto font-sans">
          一幅长卷,十扇窗户。<br />
          点击画上的标记,走进九百年前的汴京。
        </p>
        <button
          onClick={onStart}
          className="group inline-flex items-center gap-3 px-10 py-4 bg-cinnabar-500 hover:bg-cinnabar-600 text-scroll-50 font-serif text-lg tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
        >
          开 始 探 索
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
        <p className="mt-16 text-xs text-ink-700 tracking-widest font-sans">
          建议在桌面端或平板浏览,以获得最佳体验
        </p>
      </div>
    </div>
  )
}
