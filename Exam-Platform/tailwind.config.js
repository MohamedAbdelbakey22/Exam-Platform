/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem'
      },
      colors: {
        adminMain: '#15283C',
        adminSecondary: '#112030',
        doctorMain: '#0AAD0A',
      },
      // screens: {
      //   'sm': { 'min': '0px', 'max': '640px' },
      // }
    },
  },
  plugins: [
  ],
}

