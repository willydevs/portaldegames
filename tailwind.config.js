/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3B82F6', // Blue 500
          DEFAULT: '#2563EB', // Blue 600
          dark: '#1D4ED8', // Blue 700
        },
        secondary: {
          light: '#EF4444', // Red 500
          DEFAULT: '#DC2626', // Red 600
          dark: '#B91C1C', // Red 700
        },
        surface: {
          light: '#F9FAFB', // Gray 50
          DEFAULT: '#FFFFFF',
          dark: '#F3F4F6', // Gray 100
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
      }
    },
  },
  plugins: [],
}
