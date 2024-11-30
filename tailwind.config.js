/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  plugins: [require("tailwindcss-animate")],
  theme: {
    extend: {
      colors: {
        primary: "#FDE317",
        secondary: "#70CAF2",
        tertiary: "#FFFFFF",
        quaternary: "#FF4500",
      }
    }
  }
};
