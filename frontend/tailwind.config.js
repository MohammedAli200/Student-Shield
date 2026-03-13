/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',    /* Deep Blue */
        secondary: '#14B8A6',  /* Teal */
        background: '#F3F4F6', /* Light Gray */
        danger: '#EF4444',     /* Red for Alerts */
      }
    },
  },
  plugins: [],
}
