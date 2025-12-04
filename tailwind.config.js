/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39ff14',
        'neon-cyan': '#00ffff',
        'deep-space': '#0b0c15',
        'cyber-dark': '#0a0e1a',
        'cyber-gray': '#1a1f2e',
        'cyber-light': '#2a3441',
      },
      fontFamily: {
        'cinematic': ['Cinzel', 'serif'], // New Space Font
        'elegant': ['Italiana', 'serif'], // For your Name
        'tech': ['Manrope', 'sans-serif'], // For body text
        'mono': ['Courier New', 'monospace'], // For code snippets
      },  
      animation: {
        'glitch': 'glitch 0.3s infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'pulse-neon': {
          '0%, 100%': { opacity: 1, textShadow: '0 0 10px #39ff14, 0 0 20px #39ff14' },
          '50%': { opacity: 0.8, textShadow: '0 0 5px #39ff14, 0 0 10px #39ff14' },
        },
      },
    },
  },
  plugins: [],
}


