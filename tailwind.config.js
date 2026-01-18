/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Founders Grotesk', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        'public': ['Public Sans', 'sans-serif'],
      },
      colors: {
        bg: '#F9F8F6',
        surface: '#FFFFFF',
        primary: '#1A1A1A',
        secondary: '#888888',
        sidebar: '#F9F8F6',
        active: '#EAE5DE',
        'accent': '#EAE6DF',
        'accent-dark': '#D8D4CD',
        'tag-bg': '#F2EDE4',
        'tag-text': '#8C7B65',
        'chart-blue': '#6EA8FE',
        brand: {
          gold: '#C89B4F',
          goldHover: '#B08640',
          sidebarActive: '#EBEBEB',
          bg: '#F9FAFB',
        },
        status: {
          greenBg: '#ECFDF5',
          greenText: '#047857',
          redBg: '#FEF2F2',
          redText: '#B91C1C',
          yellowBg: '#FFFBEB',
          yellowText: '#B45309',
          orangeBg: '#FFF7ED',
          orangeText: '#C2410C',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      }
    },
  },
  plugins: [],
}