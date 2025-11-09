/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sky-blue': '#A3D5FF',
        'sunshine-yellow': '#FFE066',
        'soft-coral': '#FF9B85',
        'leaf-green': '#9FD356',
      },
      fontFamily: {
        'title': ['Poppins', 'sans-serif'],
        'body': ['Quicksand', 'Nunito Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
