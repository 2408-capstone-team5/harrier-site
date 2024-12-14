/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
  theme: {
    extend: {
      colors: {
        primary: "#70CAF2", // harrier blue
        secondary: "#DB2877", // harrier pink
        tertiary: "#3f3f46 ", // zinc
        quaternary: "#FFFFFF", // white
        quinary: "#E4E4E7", // grey
        senary: "#FEE01B", // harrier yellow
        harrierblack: "#1C1D21", // harrier 
      },
    },
  },
};
