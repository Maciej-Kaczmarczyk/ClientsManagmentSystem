/** @type {import('tailwindcss').Config} */

module.exports = {
  // darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Text
        textPrimary: "#1F1F1F",
        textSecondary: "#6B7280",
        textTertiary: "#9CA3AF",
        textAccent: "#5A7EFF",
        // UI
        uiPrimary: "#FFFFFF",
        uiSecondary: "#F7F8FA",
        uiTertiary: "#E5E7EB",
        uiQuaternary: "#1F1F1F",
        uiAccent: "#5A7EFF",
        uiError: "#EF4444",
        // Dark Mode
        // Text
        darkTextPrimary: "#F7F8FA",
        darkTextSecondary: "#9CA3AF",
        darkTextTertiary: "#6B7280",
        darkTextAccent: "#5A7EFF",
        // UI
        darkUiPrimary: "#2B2E33",
        darkUiSecondary: "#212429",
        darkUiTertiary: "#17191D",
        darkUiQuaternary: "#E5E7EB",
      },
    },
  },
  plugins: [],
};
