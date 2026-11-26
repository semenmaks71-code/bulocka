/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          900: '#1a0a0a',
          800: '#2d1010',
          700: '#3d1515',
          600: '#4a1a1a',
          500: '#5c2020',
        },
        gold: {
          100: '#f9f0d9',
          200: '#f0e4b8',
          300: '#e5d08a',
          400: '#d4b05a',
          500: '#c9a030',
          600: '#a88520',
        },
        cream: '#f5f0e6',
        dustyRose: '#d4a5a5',
        darkRed: '#8b0000',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(201, 160, 48, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(201, 160, 48, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}