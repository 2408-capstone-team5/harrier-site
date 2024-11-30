/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  plugins: [require("tailwindcss-animate")],
  theme: {
    extend: {
      colors: {
        primary: "#FFD700",
        secondary: "#FFA500",
        tertiary: "#FF6347",
        quaternary: "#FF4500",
      }
    }
  }
};
