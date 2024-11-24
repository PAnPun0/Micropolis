/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#7A0114',
        secondary: '#CC001E',
        bruh:"#313131",
      }
      
    },
  },
  plugins: [],
}

