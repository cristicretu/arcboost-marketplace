const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'gray-1000': '#050505',
        gray: colors.neutral,
      },
    },
    fontFamily: {
      sans: ['Inter', ...fontFamily.sans],
    },
    keyframes: {
      'text-shimmer': {
        from: { backgroundPosition: '0 0' },
        to: { backgroundPosition: '-200% 0' },
      },
    },
    animation: {
      'text-shimmer': 'text-shimmer 2.5s ease-out infinite alternate',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
