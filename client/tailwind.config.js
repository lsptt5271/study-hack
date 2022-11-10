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
        mask: 'var(--color-mask)'
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
        form: '#ddd',
        loading: 'rgba(0,0,0,0.3)'
      },
      animation: {
        loading: 'loading 1.2s linear infinite',
      },
      keyframes: {
        loading: {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(360deg)'
          },
        },
      },
      variables: {
        DEFAULT: {
          color: {
            primary: '#111',
            secondary: '#ff4b23',
            border: '#9d9d9d',
            back: '#11233d',
            fore: '#fff',
            mask: 'rgba(255,255,255,0.1)',
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
