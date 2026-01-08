/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "accent--orange": "#c7401f",
        "accent--pink": "#bd284b",
        "accent--gray": "#595973",
        light: "#fff0f0",
        secondary: "#595973",
        dark: "#131419",
      },
      fontFamily: {
        pixelify: ['"Pixelify Sans"', "cursive"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "inner-md": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        "line-1": "0 0 0 1px",
        "line-2": "0 0 0 2px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
