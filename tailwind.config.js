/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7762F3', // RGB 119, 98, 243 (Purple)
          light: '#9788F7',   // Lighter purple
          dark: '#5945C4',    // Darker purple
        },
        secondary: {
          DEFAULT: '#5FBBF7', // Complementary blue
          light: '#8AD1FF',   // Lighter blue
          dark: '#368AD1',    // Darker blue
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
          success: '#67E8B6', // Teal - works well with purple
          warning: '#FFB86C', // Orange - complements purple
          error: '#FF7EB6',   // Pink - harmonizes with purple theme
          info: '#5FBBF7',    // Blue - cohesive with secondary color
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
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
      // Text shadow utilities
      textShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.2)',
        'DEFAULT': '0 2px 4px rgba(0, 0, 0, 0.3)',
        'lg': '0 4px 8px rgba(0, 0, 0, 0.4)',
      },
      // Z-index utilities
      zIndex: {
        '-10': '-10',
        '-1': '-1',
        '60': '60',
        '70': '70',
      },
    },
  },
  plugins: [
    // Custom plugin for text-shadow utilities
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
        },
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        },
        '.text-shadow-lg': {
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
