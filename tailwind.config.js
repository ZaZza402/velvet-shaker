/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#111111",
        primary: {
          DEFAULT: "#E0B973",
          light: "#f4d03f",
          dark: "#d4a853",
        },
        "text-main": "#FFFFFF",
        "text-secondary": "#A9A9A9",
        accent: {
          gold: "#FFD700",
          copper: "#B87333",
        },
        neon: {
          pink: "#ff1493",
          green: "#00ff00",
          purple: "#8a2be2",
          cyan: "#00ffff",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        georgia: ["Georgia", "serif"],
        handwriting: ["Amsterdam Handwriting", "cursive"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(224, 185, 115, 0.3)",
        "glow-lg": "0 0 40px rgba(224, 185, 115, 0.4)",
      },
      perspective: {
        1000: "1000px",
        1500: "1500px",
      },
    },
  },
  plugins: [],
};
