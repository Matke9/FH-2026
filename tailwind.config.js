/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Font za naslove (Dune Rise) - koristimo font-dune-rise klasu
      fontFamily: {
        'dune-rise': ['"Dune Rise"', 'sans-serif'],
      },
      // Boje za discipline
      colors: {
        'fon-hackathon': {
          DEFAULT: '#6366f1', // indigo
        },
        'gamejam': {
          DEFAULT: '#22c55e', // green
        },
        'blockchain-challenge': {
          DEFAULT: '#f59e0b', // amber
        },
      },
    },
  },
  plugins: [],
}
