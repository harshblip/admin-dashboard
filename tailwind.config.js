/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "poppins": ['Poppins', 'sans-serif'],
        "monts": ['Montserrat', 'sans-serif'],
        "notosans": ['Noto Sans Mandaic', 'sans-serif'],
        "memefont": ['Bebas Neue', 'sans-serif'],
        "nunito": ['Nunito', 'sans-serif'],
        "nunisans": ['Nunito Sans', 'sans-serif'],
        "rubik": ['Rubik', "sans-serif"],
      }
    },
  },
  plugins: [],
}

