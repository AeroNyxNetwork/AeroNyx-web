/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ---- Brand (唯一真源,全站禁止出現 green 語義色) ----
        brand: {
          DEFAULT: '#7762F3',
          light: '#9788F7',
          dark: '#5945C4',
          faint: 'rgba(119, 98, 243, 0.08)',   // 卡片底、badge 底
          line: 'rgba(119, 98, 243, 0.22)',    // 強調邊框
        },
        cipher: {
          DEFAULT: '#5FBBF7',                   // 只用於「網路視角/密文」語境
          light: '#8AD1FF',
        },
        // ---- Surface 階梯(帶一點冷紫的暖黑,不用純 #000) ----
        surface: {
          0: '#08080D',    // 頁面底色
          1: '#0C0C13',    // section 交替底
          2: '#111118',    // 卡片
          3: '#16161F',    // 卡片 hover / 浮層
        },
        // ---- 語義狀態(取代 green/red 的直接使用) ----
        ok: '#9788F7',     // 「就緒/正常」用品牌淺紫,不用綠
        warn: '#D4B483',   // 低飽和琥珀
        // 文字一律用 white/α,不再需要 neutral 色板
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Display 階梯,clamp 內建,section 標題只准從這裡拿
        'display-xl': ['clamp(2.5rem, 5vw, 4.75rem)', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem, 3.6vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.5rem, 2.4vw, 2.125rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        // 全站幾何語言:銳利。禁用 rounded-xl/2xl/3xl
        DEFAULT: '4px',
        sm: '2px',
        md: '6px',
        pill: '999px',   // 只給 status dot / badge
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',      // 主 easing,所有 reveal/hover
        inout: 'cubic-bezier(0.65, 0, 0.35, 1)',   // 只給 Lens 這類往返動畫
      },
      transitionDuration: {
        fast: '150ms',    // hover、按下
        base: '300ms',    // 一般狀態切換
        slow: '600ms',    // section reveal
      },
      letterSpacing: {
        eyebrow: '0.16em', // eyebrow 統一值,不再出現 0.14/0.16/0.18 混用
      },
      maxWidth: {
        copy: '38rem',     // 正文段落最大寬
      },
    },
  },
  plugins: [],
};
