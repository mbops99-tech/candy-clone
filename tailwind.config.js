/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'candy-pink': '#FF6B9D',
        'candy-dark': '#0D0D0D',
        'candy-gray': '#1A1A1A',
        'candy-light': '#2A2A2A',
      },
    },
  },
  plugins: [],
}
