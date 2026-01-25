/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        banana: {
          300: '#FFF7CC',
          400: '#FFE135', // Cyber Banana
          500: '#FFD700',
          600: '#E6C200',
        },
        obsidian: {
          800: '#1A1A1A',
          900: '#0F0F0F',
          950: '#050505',
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
