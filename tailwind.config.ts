import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05060f",
        surface: "#0b0d1a",
        border: "rgba(255,255,255,0.08)",
        primary: {
          DEFAULT: "#6366f1",
          foreground: "#ffffff",
        },
        accent: {
          cyan: "#22d3ee",
          fuchsia: "#e879f9",
          emerald: "#34d399",
          amber: "#fbbf24",
          rose: "#fb7185",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(99, 102, 241, 0.25)",
        glass: "0 20px 60px rgba(0, 0, 0, 0.35)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top, rgba(99,102,241,0.25), transparent 40%), radial-gradient(circle at bottom right, rgba(34,211,238,0.18), transparent 35%)",
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
