/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          DEFAULT: '#FF671F',
        },
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#0a192f',
          950: '#060d1d',
          DEFAULT: '#06038D',
        },
        govgreen: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          DEFAULT: '#046A38',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'portal': '0 4px 20px -2px rgba(6, 3, 141, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'portal-lg': '0 10px 30px -3px rgba(6, 3, 141, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
