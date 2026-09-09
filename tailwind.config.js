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
        // ガチャちょう（自社アプリ）LP専用トークン（T-072 / 1.0.3 Nature）。
        // 生成りの紙・深緑・セージ・くすんだ青を基調にする。LP以外（primary / Navbar / Footer / 法務ページ）からは参照しない
        'gachacho-nature': {
          paper: '#FAF7F0',      // LPの主背景。余白の大部分
          surface: '#FFFDFA',    // 記録・情報欄の面
          forest: '#183F38',     // 見出し、リンク、重要な短い文字
          ink: '#303D36',        // 本文
          muted: '#59655D',      // 補足本文。opacityでさらに薄くしない
          sage: '#B8C3AD',       // 葉やテープなど小面積の装飾
          'sage-soft': '#E8EDE3',// 末尾CTA、短い補助領域
          blue: '#718596',       // 手帳の色とつながる装飾。小さい本文には使わない
          line: '#D9DED3',       // 罫線・装飾境界
          pink: '#D9A5A7',       // 画像内のピンクとのつなぎ。小さなアクセントのみ
        },
      },
      fontFamily: {
        main: ['Inter', 'Noto Sans JP', 'sans-serif'],
        rounded: ['"Zen Maru Gothic"', 'Noto Sans JP', 'sans-serif'],
        // ガチャちょうLPのh1と短い締めの見出しだけで使う日本語明朝。外部フォントは追加せず、未搭載時はserifへフォールバック
        'gachacho-display': ['"Yu Mincho"', 'YuMincho', '"Hiragino Mincho ProN"', 'serif'],
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
