const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
  theme: {
    colors: {
      black: '#000',
      white: '#f5f5f5',
    },
    screens: {
      ...defaultTheme.screens,
      'lg-max': { max: '1023px' },
    },
    extend: {
      backgroundImage: {
        'header-gradient':
          'linear-gradient(180deg, #0D0D0D 22.4%, rgba(13, 13, 13, 0.6) 63.54%, rgba(13, 13, 13, 0) 100%)',
      },
      fontFamily: {
        sans: ['Neue Montreal', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
