/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        dune: ['DuneRise', 'sans-serif'],
        noto: ['NotoSans', 'sans-serif'],
      },
      colors: {
        'fon-hackathon': {
          DEFAULT: '#002440',
        },
        'gamejam': {
          DEFAULT: '#A70803',
        },
        'blockchain-challenge': {
          DEFAULT: '#DB7080',
        },
      },
    },
  },
  plugins: [],
}
