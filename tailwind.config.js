/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        lp: { max: "1729px" }, // breakpoint personalizado
        lpm: { max: "1230px" },
      },
    },
  },
  plugins: [],
}
