/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        brand: {
          green: {
            DEFAULT: '#1F3D2B',
            dark: '#14291D',
            light: '#2A523A',
            surface: '#244732',
            subtle: '#E8EFEA',
          },
          gold: {
            DEFAULT: '#C9A24B',
            dark: '#A68335',
            light: '#DEC177',
            muted: '#8A6E30',
            subtle: '#F7F1E1',
          },
          cream: {
            DEFAULT: '#FAF6EE',
            pure: '#FFFFFF',
            muted: '#F2EBDE',
            darker: '#E7DEC9',
          },
          charcoal: '#1A231E',
          text: {
            primary: '#18241D',
            muted: '#4C5D53',
            light: '#E2EBE5',
          },
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 4px 20px -2px rgba(26, 35, 30, 0.06)',
        card: '0 10px 30px -4px rgba(31, 61, 43, 0.08)',
        gold: '0 4px 25px -2px rgba(201, 162, 75, 0.25)',
      },
    },
  },
  plugins: [],
};
