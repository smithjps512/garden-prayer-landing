import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "rgb(var(--brand) / <alpha-value>)",
          deep: "rgb(var(--brand-deep) / <alpha-value>)",
          accent: "rgb(var(--accent) / <alpha-value>)",
          ink: "rgb(var(--ink) / <alpha-value>)",
          paper: "rgb(var(--paper) / <alpha-value>)",
          tint: "rgb(var(--tint) / <alpha-value>)",
        },
        tsa: { blue: "#005DAA", red: "#EE3124", navy: "#0B2E5C" },
        ffa: { blue: "#004C97", gold: "#FFCD00", navy: "#002B5C" },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        lift: "0 12px 40px -12px rgb(0 0 0 / 0.25)",
        card: "0 1px 2px rgb(0 0 0 / 0.04), 0 8px 24px -12px rgb(0 0 0 / 0.15)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: { rise: "rise .6s cubic-bezier(.2,.7,.2,1) both" },
    },
  },
  plugins: [],
};
export default config;
