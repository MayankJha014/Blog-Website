/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: { "webkit-fill": "-webkit-fill-available" },
      colors: {
        default: "#BAA333",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        // Add more custom font families as needed
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
