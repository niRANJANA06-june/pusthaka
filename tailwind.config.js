/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17233B',      // book-cloth navy, used for text and the nav
        shelf: '#EDF0F4',    // page background
        brass: '#C98A1B',    // accent
        brassdark: '#9B6910',
        moss: '#2F6B55',     // "available" / success
        brick: '#A63D2F',    // danger
      },
      fontFamily: {
        serif: ['Literata', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
