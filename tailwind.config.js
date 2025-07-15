/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        bg_color:"#070023",
        text_color:"#fff",
      }
    },
  },
  plugins: [],
}