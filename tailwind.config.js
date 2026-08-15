/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          dark: '#080c14',
          surface: '#0f172a',
          card: '#161f33',
          elevated: '#1e293b',
          glass: 'rgba(22, 31, 51, 0.75)'
        },
        accent: {
          indigo: '#6366f1',
          cyan: '#06b6d4',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
          purple: '#a855f7'
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(99, 102, 241, 0.4)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif']
      },
      boxShadow: {
        'glow-indigo': '0 0 25px rgba(99, 102, 241, 0.35)',
        'glow-cyan': '0 0 25px rgba(6, 182, 212, 0.35)',
        'glow-rose': '0 0 25px rgba(244, 63, 94, 0.35)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
        'float': 'float 4s infinite ease-in-out',
        'scan': 'scanLine 2s infinite linear'
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.75 }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      }
    },
  },
  plugins: [],
}
