import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      mono: ["Geist", "monospaced"],
    },
    screens: {
      sm: "440px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    backgroundImage: {
      "gradient-1": `var(--gradient-1)`,
      "gradient-2": `var(--gradient-2)`,
      "gradient-3": `var(--gradient-3)`,
      "gradient-4": `var(--gradient-4)`,
      "gradient-5": `var(--gradient-5)`,
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
