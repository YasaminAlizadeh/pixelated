module.exports = {
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      colors: {
        dark: "#131419",
        light: "#EFEFEF",
        primary: "#6607FF",
        secondary: "#595973",
        "accent--pink": "#C4294C",
        "accent--orange": "#DC4A24",
        "accent--gray": "#94a3b8",
      },
      fontFamily: {
        pixelify: ["Pixelify Sans", "sans-serif"],
      },
    },
  },
};
