/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'merriweather': ['Merriweather', 'serif'],
      },
      colors: {
        teal: {
          deep: '#034C53',
          medium: '#007074',
          hover: '#005F63',
        },
        coral: {
          DEFAULT: '#F38C79',
          hover: '#E07A66',
          peach: '#FFC1B4',
        },
        primary: '#034C53',
        secondary: '#005F63',
        accent: '#E5EEE5',
        'accent-warm': '#E5E0D0',
      },
    },
  },
  plugins: [],
}

