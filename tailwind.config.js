/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Discipline-specific colour tokens – override as needed
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
