/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        golden: {
          yellow: "#FFD700",
        },
      },
    },
  },
  plugins: [],
};
