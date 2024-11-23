import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      fontFamily: {
        gilroy: ['var(--font-gilroy)'],
      },
      colors: {
        primary: "#0080ff"
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
