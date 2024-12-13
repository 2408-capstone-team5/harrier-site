/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
  theme: {
    extend: {
      colors: {
        primary: "#70CAF2", // blue
        secondary: "#DB2877", // pink
        tertiary: "#0C181E", // black
        quaternary: "#FFFFFF", // white
        quinary: "#E4E4E7", // grey
      }
    }
  }
};