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
          DEFAULT: '#6E56CF',
          light: '#9E8CFF',
          dark: '#4B3B93',
        },
        secondary: {
          DEFAULT: '#07BFD3',
          light: '#59E3F5',
          dark: '#0597A7',
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
          success: '#3ECF8E',
          warning: '#FFB224',
          error: '#FF5A5A',
          info: '#3B82F6',
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
    },
  },
  plugins: [],
};
