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
        // ガチャちょう（自社アプリ）LP専用トークン。アプリのストア素材・アイコンの配色に合わせる
        gachacho: {
          paper: '#fbf5f2',      // 台紙・手帳の紙色
          blush: '#fde1d8',      // 淡いピンク（面）
          rose: '#da8287',       // アイコンのメインピンク
          'rose-deep': '#be666b',// 濃いピンク（テキスト・ホバー）
          ink: '#4a3f3c',        // 本文の茶系ダーク
          mute: '#8a7a74',       // サブテキスト
          line: '#e5d8d2',       // 罫線・境界
          gold: '#d9a54a',       // ガチャのハンドル・金具
          lilac: '#8e7fb8',      // ストア素材の紫アクセント
        },
      },
      fontFamily: {
        main: ['Inter', 'Noto Sans JP', 'sans-serif'],
        rounded: ['"Zen Maru Gothic"', 'Noto Sans JP', 'sans-serif'],
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
