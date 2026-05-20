/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 米黄 — 画卷底色
        scroll: {
          50: '#FBF7EE',
          100: '#F5EDD6',
          200: '#EBD9A8',
          300: '#DCC07E',
          400: '#C9A35C',
        },
        // 朱红 — 北宋强调色
        cinnabar: {
          400: '#D4502A',
          500: '#B73D1F',
          600: '#9A2E15',
        },
        // 墨黑
        ink: {
          900: '#1A1814',
          800: '#2C2922',
          700: '#3F3B30',
        },
        // 4 个分类颜色
        cat: {
          commerce: '#C77B2E',   // 商业 — 琥珀
          transport: '#3F6B8E',  // 交通 — 蓝
          people: '#A85D6B',     // 人物 — 粉
          building: '#3E8579',   // 建筑 — 青
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'serif'],
        sans: ['"Noto Sans SC"', '-apple-system', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-ring': 'pulseRing 2.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
        'pulse-dot': 'pulseDot 2.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(0.6)', opacity: '0.8' },
          '80%, 100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.9)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(16px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          from: { transform: 'translateX(40px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
