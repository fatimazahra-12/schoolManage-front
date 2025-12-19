/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'teal': {
          deep: '#034C53',
          medium: '#007074',
          hover: '#005F63',
        },
        'coral': {
          DEFAULT: '#F38C79',
          hover: '#E07A66',
          light: '#FFC1B4',
        },
        'neutral': {
          ivory: '#E5E0D0',
          sage: '#E5EEE5',
        },
      },
      fontFamily: {
        'serif': ['Merriweather', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

