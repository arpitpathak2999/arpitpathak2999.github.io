/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#faf8f3',
          card: '#ffffff',
          line: '#e6e1d4',
        },
        ink: {
          900: '#1c1b18',
          700: '#4a473f',
          500: '#726d61',
          400: '#96907f',
        },
        signal: {
          eeg: '#2f5d8a',
          gsr: '#8a6a3d',
          emg: '#8a3f3f',
          model: '#5c527a',
          img: '#3f7566',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'ui-serif', 'Georgia', 'serif'],
      },
      maxWidth: {
        content: '960px',
      },
    },
  },
  plugins: [],
}
