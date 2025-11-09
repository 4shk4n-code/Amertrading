import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "./sanity/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f7f3ea",
        foreground: "#1c1a17",
        gold: {
          50: "#fdf4e3",
          100: "#fbe7c0",
          200: "#f6d299",
          300: "#efbb6d",
          400: "#e2a449",
          500: "#c78a1a",
          600: "#a86f12",
          700: "#87550f",
          800: "#6a420c",
          900: "#52320c",
        },
        zinc: {
          950: "#0b0b0f",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
      },
      boxShadow: {
        "glow-gold": "0 0 30px rgba(212, 175, 55, 0.45)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, rgba(249,224,171,0.95) 0%, rgba(224,176,84,0.95) 55%, rgba(179,119,26,0.9) 100%)",
      },
      animation: {
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(212,175,55,0.25)",
          },
          "50%": {
            boxShadow: "0 0 35px rgba(212,175,55,0.55)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;

