/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      // any other paths where your components are defined
    ]
  },
  theme: {
    extend: {
      backgroundImage: theme => ({
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'navbar-pattern': "url('/path-to-your/navbar-image.jpg')",
        'one-third-pattern': "url('/rightsidebar.jpg')",
        'two-thirds-index': "url('/homeport.jpg')",
        'two-thirds-landtiles': "url('/path-to-your/landtiles-image.jpg')",
        'two-thirds-myholding': "url('/path-to-your/myholding-image.jpg')",
        // Add more background images as needed
      }),
      width: {
        '400': '400px',
      },
      height: {
        '400': '400px',
      },
    },
    screens: {
      'mobile': {'max': '480px'},
      'tablet': {'min': '481px', 'max': '768px'},
      'laptop': {'min': '769px', 'max': '1024px'},
      'desktop': {'min': '1025px', 'max': '1200px'},
      'xl': {'min': '1201px'}
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar')
  ],
  "extends": [
    "plugin:jsx-a11y/recommended"
  ]
}
