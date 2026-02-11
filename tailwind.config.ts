import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: "#0A0F1C",
          50: "#111827",
          100: "#0E1525",
          200: "#0C1220",
          300: "#0A0F1C",
          400: "#080C17",
          500: "#060912",
        },
        accent: {
          DEFAULT: "#C9A962",
          light: "#E4D5A8",
          dark: "#A8893F",
          glow: "rgba(201, 169, 98, 0.15)",
        },
        sage: {
          DEFAULT: "#87A28E",
          light: "#A8C2AF",
          dark: "#6B8672",
        },
        cream: {
          DEFAULT: "#F8F6F1",
          dark: "#EDE9E0",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        "counter-up": "counterUp 2s ease-out forwards",
        "slide-in-right": "slideInRight 0.5s ease-out forwards",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        counterUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(201, 169, 98, 0.1)" },
          "100%": { boxShadow: "0 0 40px rgba(201, 169, 98, 0.2)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
