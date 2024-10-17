/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  theme: {
    colors: {
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
      dark: "var(--color-dark)",
      white: "var(--color-white)",
      firstLight: "var(--color-firstLight)",
      secondLight: "var(--color-secondLight)",
    },
    spacing: {
      '1': '8px',
      '2': '12px',
      '3': '16px',
      '4': '24px',
      '5': '32px',
      '6': '48px',
    },
    extend: {
      fontFamily: {
        exotwo: ['"Exo 2"', "sans-serif"],
      },
    },
  },
  plugins: [],
}

