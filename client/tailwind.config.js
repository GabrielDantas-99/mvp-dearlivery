/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    extend: {},
    screens: {
      'xs': '500px'
    }
  },
  plugins: [require('tailwindcss-primeui')]
}

