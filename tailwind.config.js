/**
 * ============================================
 * File: tailwind.config.js
 * ============================================
 * Modification Reason: v2.0 — Design token foundation for the 2026
 *   homepage redesign (US Web3 VC / AI-lab aesthetic). Adds the new
 *   `brand / cipher / surface` token system, display type scale,
 *   motion tokens (easing + duration), and sharp geometry radii.
 *
 * Main Functionality:
 *   - Single source of truth for color, type, motion, and radius tokens.
 *   - NEW sections are expected to use ONLY: brand.*, cipher.*, surface.*,
 *     ok/warn, font-display/mono, text-display-*, ease-out-brand,
 *     duration-fast/base/slow, rounded/rounded-sm/rounded-md.
 *
 * Dependencies:
 *   - styles/globals.css (reads the same design language)
 *   - All components under components/**
 *
 * Main Logical Flow:
 *   1. Legacy tokens (primary/secondary/neutral/accent, float, textShadow)
 *      are preserved verbatim for backward compatibility.
 *   2. New token system is additive on top.
 *
 * ⚠️ Important Notes for Next Developer:
 *   - DO NOT delete legacy tokens (primary/secondary/neutral/accent,
 *     animation.float, textShadow plugin): existing components
 *     (.text-gradient in globals.css, older sections) depend on them.
 *   - Brand rule: NO GREEN anywhere on the homepage. "Ready/healthy"
 *     states use `ok` (light purple), warnings use `warn` (muted amber).
 *   - Geometry rule: new sections use rounded (4px) / rounded-md (6px)
 *     max. Do not introduce rounded-xl/2xl in new code.
 *
 * Last Modified: v2.0 — Added 2026 design token system (additive)
 * ============================================
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ---------------------------------------------------------
         * LEGACY TOKENS — preserved for backward compatibility.
         * Used by: globals.css (.text-gradient), older sections.
         * --------------------------------------------------------- */
        primary: {
          DEFAULT: '#7762F3',
          light: '#9788F7',
          dark: '#5945C4',
        },
        secondary: {
          DEFAULT: '#5FBBF7',
          light: '#8AD1FF',
          dark: '#368AD1',
        },
        neutral: {
          100: '#E6E6F0',
          200: '#C9C9D9',
          300: '#9E9EB3',
          400: '#7C7C99',
          500: '#5C5C7B',
          600: '#363658',
          700: '#252542',
          800: '#151528',
          900: '#0D0D18',
        },
        accent: {
          success: '#67E8B6',
          warning: '#FFB86C',
          error: '#FF7EB6',
          info: '#5FBBF7',
        },

        /* ---------------------------------------------------------
         * v2.0 TOKEN SYSTEM — all new/refactored sections use these.
         * --------------------------------------------------------- */
        brand: {
          DEFAULT: '#7762F3',
          light: '#9788F7',
          dark: '#5945C4',
          faint: 'rgba(119, 98, 243, 0.07)',  // badge/card tint
          line: 'rgba(119, 98, 243, 0.22)',   // emphasized borders
        },
        cipher: {
          DEFAULT: '#5FBBF7',                 // "network view" contexts only
          light: '#8AD1FF',
        },
        surface: {
          0: '#08080D',   // page base (warm near-black, not #000)
          1: '#0C0C13',   // alternating section base
          2: '#111118',   // cards
          3: '#16161F',   // card hover / overlays
        },
        ok: '#9788F7',    // "ready/healthy" — light purple, NEVER green
        warn: '#D4B483',  // muted amber
      },

      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },

      fontSize: {
        /* Display scale — section headings must use one of these. */
        'display-xl': ['clamp(2.5rem, 5vw, 4.75rem)', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem, 3.6vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.5rem, 2.4vw, 2.125rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },

      borderRadius: {
        /* Sharp geometry. New code: rounded / rounded-sm / rounded-md only. */
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
        pill: '999px',  // status dots / pills only
      },

      transitionTimingFunction: {
        'out-brand': 'cubic-bezier(0.16, 1, 0.3, 1)',   // reveals, hovers
        'inout-brand': 'cubic-bezier(0.65, 0, 0.35, 1)', // looping sweeps (Lens)
      },

      transitionDuration: {
        fast: '150ms',
        base: '300ms',
        slow: '600ms',
      },

      letterSpacing: {
        eyebrow: '0.16em', // the single sanctioned eyebrow tracking
      },

      maxWidth: {
        copy: '38rem',
      },

      /* ---- LEGACY: keep ---- */
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      textShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.2)',
        DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.3)',
        lg: '0 4px 8px rgba(0, 0, 0, 0.4)',
      },
      zIndex: {
        '-10': '-10',
        '-1': '-1',
        60: '60',
        70: '70',
      },
    },
  },
  plugins: [
    /* LEGACY: text-shadow utilities — keep for older sections. */
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-sm': { textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' },
        '.text-shadow': { textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' },
        '.text-shadow-lg': { textShadow: '0 4px 8px rgba(0, 0, 0, 0.4)' },
        '.text-shadow-none': { textShadow: 'none' },
      });
    },
  ],
};
