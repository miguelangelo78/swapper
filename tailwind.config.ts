import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './content/**/*.mdx',
    './public/**/*.svg',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {},
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;
