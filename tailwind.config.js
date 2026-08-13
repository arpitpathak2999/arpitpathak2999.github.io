/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05070a',
          900: '#080b10',
          850: '#0b0f15',
          800: '#0e131a',
          700: '#151b24',
          600: '#1d252f',
        },
        bone: {
          50: '#f4f6f7',
          100: '#e6eaed',
          200: '#c8d0d6',
          300: '#9aa6b1',
          400: '#71808d',
        },
        signal: {
          eeg: '#5eead4',
          gsr: '#f0b429',
          emg: '#fb7185',
          model: '#a78bfa',
          img: '#60a5fa',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        label: '0.18em',
      },
      maxWidth: {
        content: '1180px',
      },
      keyframes: {
        'trace-in': {
          from: { strokeDashoffset: '1000' },
          to: { strokeDashoffset: '0' },
        },
        'pulse-node': {
          '0%,100%': { opacity: '0.35' },
          '50%': { opacity: '1' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'flow-dash': {
          to: { strokeDashoffset: '-24' },
        },
      },
      animation: {
        'trace-in': 'trace-in 2.4s ease-out forwards',
        'pulse-node': 'pulse-node 3s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
        'flow-dash': 'flow-dash 1.2s linear infinite',
      },
    },
  },
  plugins: [],
}
