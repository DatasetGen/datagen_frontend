const { lighten, darken } = require('polished');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand_primary: {
          50: lighten(0.4, '#AB95FD'),
          100: lighten(0.35, '#AB95FD'),
          200: lighten(0.25, '#AB95FD'),
          300: lighten(0.15, '#AB95FD'),
          400: lighten(0.05, '#AB95FD'),
          500: '#AB95FD', // Base color
          600: darken(0.05, '#AB95FD'),
          700: darken(0.1, '#AB95FD'),
          800: darken(0.2, '#AB95FD'),
          900: darken(0.3, '#AB95FD'),
        },
        brand_secondary: {
          50: lighten(0.4, '#111411'),
          100: lighten(0.35, '#111411'),
          200: lighten(0.25, '#111411'),
          300: lighten(0.15, '#111411'),
          400: lighten(0.05, '#111411'),
          500: '#111411', // Base color
          600: darken(0.05, '#111411'),
          700: darken(0.1, '#111411'),
          800: darken(0.2, '#111411'),
          900: darken(0.3, '#111411'),
        },
      },
    },
  },
  plugins: [],
}
