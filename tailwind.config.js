/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: "'Montserrat', sans-serif",
        nunito: "'Nunito Sans', sans-serif",
        ptSans: "'PT Sans', sans-serif",
        workSans: "'Work Sans', sans-serif"
      }
    }
  }
}
