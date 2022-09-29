/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/*}',
    './src/**/*.{html,js,vue}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
