const { lighten, darken } = require('polished');


const basePrimaryColor = "#905EF8";
const baseSecondaryColor = "#111411";

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
          50: lighten(0.4, basePrimaryColor),
          100: lighten(0.30, basePrimaryColor),
          200: lighten(0.25, basePrimaryColor),
          300: lighten(0.15, basePrimaryColor),
          400: lighten(0.05, basePrimaryColor),
          500: basePrimaryColor, // Base color
          600: darken(0.05, basePrimaryColor),
          700: darken(0.1, basePrimaryColor),
          800: darken(0.2, basePrimaryColor),
          900: darken(0.3, basePrimaryColor),
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
