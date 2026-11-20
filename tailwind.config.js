/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kr: {
          blue: '#0F4C81',
          red: '#CD2E3A',
          gold: '#E5A93B',
          teal: '#1A7F8E',
          softBg: '#F8FAFC',
          cardDark: '#1E293B',
        }
      },
      fontFamily: {
        hangul: ['"Noto Sans KR"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
