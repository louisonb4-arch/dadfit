/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F8F8F5',
        text: '#111827',
        green: {
          DEFAULT: '#22C55E',
          dark: '#163B2D',
          light: '#7AE582',
          muted: '#DCF5E3',
        },
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
