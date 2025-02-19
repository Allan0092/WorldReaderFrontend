const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fondamento: ["Fondamento", "sans-serif"],
        fondamentoItalic: ["Fondamento-Italic", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        montserratItalic: ["Montserrat-Italic", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
});
