/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  plugins: [require("tailwindcss-animate")],
  theme: {
    extend: {
      colors: {
        primary: "#70CAF2",
        secondary: "#FDE317",
        tertiary: "#0C181E",
        quaternary: "#FFFFFF",
        quinary: "#E4E4E7",
      }
    }
  }
};