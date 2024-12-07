/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // prefix: 'tw-',
  important: true,
  theme: {
    extend: {
      colors: {
        primary: 'var(---primary-color)',
        secondary: 'var(---secondary-color)',
        accent: 'var(---accent-color)',
        deep: 'var(---deep-color)',

        /* Shades  */
        info: 'var(--info-color)',
        success: 'var(--success-color)',
        warning: 'var(--warning-color)',
        error: 'var(--error-color)',

        /* Black and White  */
        black1: 'var(---black1)',
        black2: 'var(---black2)',
        black3: 'var(---black3)',
        white: 'var(---white)',

        // Gray Shades 
        gray100: 'var(--gray-100)',
        gray200: 'var(--gray-200)',
        gray300: 'var(--gray-300)',
        gray400: 'var(--gray-400)',
        gray500: 'var(--gray-500)',
        gray600: 'var(--gray-600)',
        gray700: 'var(--gray-700)',
        gray800: 'var(--gray-800)',
      },
      utilities: {
        '.tick': {
          display: 'inline-block',
          width: '1.55rem',
          height: '0.5rem',
          border: '2px solid currentColor',
          borderTop: 'none',
          borderRight: 'none',
          transform: 'rotate(-45deg)',
          marginRight: '0.25rem'
        }
      }
    }
  },
  plugins: []
}
