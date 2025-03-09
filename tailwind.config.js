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
          DEFAULT: '#776217', // RGB 119, 98, 23
          light: '#967d1e',   // Lighter version
          dark: '#574a10',    // Darker version
        },
        secondary: {
          DEFAULT: '#8c7319', // Complementary to primary
          light: '#a08723',   // Lighter version
          dark: '#645210',    // Darker version
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
          success: '#5A9A6F', // Adjusted to complement new primary color
          warning: '#D9A23B', // Adjusted to complement new primary color
          error: '#C75A5A',   // Adjusted to match the new theme
          info: '#5A7DA6',    // Adjusted to match the new theme
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
      // Add text shadow utilities
      textShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.2)',
        'DEFAULT': '0 2px 4px rgba(0, 0, 0, 0.3)',
        'lg': '0 4px 8px rgba(0, 0, 0, 0.4)',
      },
      // Add z-index utilities for layering
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
