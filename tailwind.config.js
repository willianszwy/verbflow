/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Avenir', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'verb-past': '#E74C3C',
        'verb-perfect': '#8E44AD',
        'verb-present': '#27AE60',
        'verb-continuous': '#3498DB',
        'verb-future': '#F39C12',
      }
    },
  },
  plugins: [],
}