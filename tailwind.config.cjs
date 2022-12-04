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
      "navDark": "#363740",
      "navNormal": "#3F4049",
      "bgDark": "#F7F8FA",
      "bgLight": "#FFFFFF",
      "accent1": "#00CBA5",
      "accent2": "#5A7EFF",
      },
    },
  },
  plugins: [],
}
