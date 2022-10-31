const tailwindcssVariables = require('@mertasan/tailwindcss-variables');

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './src/features/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        base: "'Hiragino Kaku Gothic ProN', Meiryo, sans-serif",
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
      backgroundColor: {
        base: 'var(--color-back)',
      },
      textColor: {
        base: 'var(--color-fore)',
      },
      height: {
        header: 'var(--size-header-height)',
        headernav: 'var(--size-header-height-with-nav)',
      },
      borderColor: {
        base: 'var(--color-border)',
        form: '#ddd'
      },
      variables: {
        DEFAULT: {
          color: {
            primary: '#111',
            secondary: '#ff4b23',
            border: '#9d9d9d',
            back: '#11233d',
            fore: '#fff',
          },
          size: {
            'header-height': '48px',
            'header-height-with-nav': '88px',
          },
        },
      },
    },
  },
  plugins: [tailwindcssVariables],
};
