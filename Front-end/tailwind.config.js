/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Oswald: ['Oswald', 'sans-serif'],
        Playfair: ['Playfair Display', 'serif'],
      },
      fontWeight: {
        thin: 200,
        light: 300,
        semibold: 600,
        "oswald-medium": 500,
        "oswald-bold": 700,
        "playfair-400": 400,   // instead of Playfair-fo
        "playfair-500": 500,   // instead of Playfair-fi
        "playfair-600": 600,   // instead of Playfair-si
        "playfair-700": 700,   // instead of Playfair-se
        "playfair-800": 800,   // instead of Playfair-eg
        "playfair-900": 900,  
      },
      fontSize: {
        "3xl":"2rem"
      },
      colors: {
        primary: {
          50: '#faf8e5',
          100: '#f3ebc2',
          200: '#ead083',
          300: '#e0b244',
          400: '#d49a1b',
          500: '#D4AF37',  // Gold
          600: '#ba9b2f',
          700: '#9a7f28',
          800: '#7a6520',
          900: '#65541a',
        },
        secondary: {
          500: '#2C3E50', // Deep Navy
        },
        accent: {
          500: '#800020', // Burgundy
        },
        neutral: {
          50: '#f5f5f5',  // Light Neutral
          900: '#333333',  // Charcoal
        },
      }
    },
  },
  plugins: [],
}

