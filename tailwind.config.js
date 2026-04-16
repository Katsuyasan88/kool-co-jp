/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F59E0B', // Amber/Orange
          dark: '#B45309',
        },
        secondary: '#FDE68A', // Light Gold/Blonde
        accent: '#D97706',
        "text-main": '#393939',
        "text-muted": '#64748b',
        "bg-soft": '#f8fafc',
        "border": '#e2e8f0',
      },
      fontFamily: {
        main: ['Inter', 'Noto Sans JP', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '2.0' }],
        'sm': ['0.875rem', { lineHeight: '2.0' }],
        'base': ['1rem', { lineHeight: '2.0' }],
        'lg': ['1.125rem', { lineHeight: '2.0' }],
        'xl': ['1.25rem', { lineHeight: '2.0' }],
        '2xl': ['1.5rem', { lineHeight: '2.0' }],
        '3xl': ['1.875rem', { lineHeight: '2.0' }],
        '4xl': ['2.25rem', { lineHeight: '2.0' }],
        '5xl': ['3rem', { lineHeight: '2.0' }],
        '6xl': ['3.75rem', { lineHeight: '2.0' }],
        '7xl': ['4.5rem', { lineHeight: '2.0' }],
        '8xl': ['6rem', { lineHeight: '2.0' }],
        '9xl': ['8rem', { lineHeight: '2.0' }],
      }
    },
  },
  plugins: [],
}
