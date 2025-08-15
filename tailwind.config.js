/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#009841',
          light: '#00a847',
          dark: '#00853a'
        },
        secondary: {
          DEFAULT: '#00222B',
          light: '#00303d',
          dark: '#00141a'
        },
        warm: {
          white: '#FFFBEF'
        },
        pure: {
          white: '#FFFFF7'
        }
      },
      backgroundColor: {
        base: '#FFFBEF'
      }
    }
  },
  plugins: [],
}
