/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
  theme: {
    extend: {
      colors: {
        primary: "#70CAF2", // harrier blue
        secondary: "#DB2877", // harrier pink
        tertiary: "#28282A", // harrier black
        quaternary: "#FFFFFF", // white
        quinary: "#E4E4E7", // grey
        senary: "#FEE01B", // harrier yellow
        draculablack: "#1C1D21",
        draculagreen: "#75B863",
        draculared: "#EB3D54",
        draculablue: "#4FB4D8",
      },
    },
  },
};
