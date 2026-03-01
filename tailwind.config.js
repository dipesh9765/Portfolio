/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: '#49bf9d', // From original portfolio
        secondary: '#2c3e50',
        dark: '#1a1a1a',
        light: '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Modern font
      },
    },
  },
  plugins: [],
}
