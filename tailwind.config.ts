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
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 40px rgba(99, 102, 241, 0.25)",
        glass: "0 20px 60px rgba(0, 0, 0, 0.35)",
      },
      keyframes: {
        aurora: {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "0.6",
          },
          "50%": {
            transform: "translate(40px, -30px) scale(1.15)",
            opacity: "0.9",
          },
        },
        marquee: {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(-50%)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(24px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        shimmer: {
          from: {
            backgroundPosition: "200% 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
      animation: {
        aurora: "aurora 12s ease-in-out infinite",
        "aurora-slow": "aurora 18s ease-in-out infinite reverse",
        marquee: "marquee 30s linear infinite",
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out both",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
