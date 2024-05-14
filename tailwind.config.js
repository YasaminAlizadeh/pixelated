module.exports = {
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      colors: {
        dark: "#1C2146",
        light: "#EFEFEF",
        secondary: "#595973",
        "accent--pink": "#C4294C",
        "accent--orange": "#DC4A24",
        "accent--gray": "#94a3b8",
      },
      fontFamily: {
        pixelify: ["Pixelify Sans", "sans-serif"],
      },
      boxShadow: {
        "line-1": "0 0 0 0.05rem #FDFDFD65",
        "line-2": "0 0 0 0.075rem #FDFDFD65",
        "inner-md": "inset 0 4px 6px 0 rgb(0 0 0 / 0.15)",
      },
    },
  },
};
