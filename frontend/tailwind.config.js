/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        merienda: ["Merienda", "cursive"],
      },
      colors: {
        primary: "#00C2FF",
        secondary: "#DD0BFF",
        dark: "#bfdbfe",
      },

      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
    },
  },
  plugins: [],
};
