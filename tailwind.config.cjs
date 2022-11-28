/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      "navDark": "#050D2E",
      "navNormal": "#131E42",
      "bgDark": "#F0F7FA",
      "bgLight": "#FFFFFF",
      "accent1": "#00CBA5",
      "accent2": "#5A7EFF",
      },
    },
  },
  plugins: [],
}
