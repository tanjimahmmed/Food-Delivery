/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1290px'
    },
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      fontFamily: {
        roboto: "'Roboto', sans-serif",
      },
      colors: {
        'primary': '#111111',
        'secondary': '#209E61',
        'greencus': '#00A55B',
        'placeHold': '#F8F8F8',
        'placeHoldInner': '#AAAAAA',
        'bannerBg': '#E6F5EE',
        'btnBorder': '#B8DACA',
        'topTxt': '#0D0805',
        'proBg': '#E7C41C',
      },
      width: {
        'searchWidth': '395px',
        'leftS': '870px',
        'rightS': '420px',
      }
    },
  },
  plugins: [],
}
