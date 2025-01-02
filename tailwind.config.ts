import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 744aa57 (Add animations and update design)
        primary: "#9b87f5",
        secondary: "#7E69AB",
        accent: "#6E59A5",
        "dark-purple": "#1A1F2C",
        "light-purple": "#D6BCFA",
        "vivid-purple": "#8B5CF6",
<<<<<<< HEAD
=======
        primary: "#1a237e",
        secondary: "#4a148c",
        accent: "#7c4dff",
>>>>>>> f33a31c (Create portfolio with animations)
=======
>>>>>>> 744aa57 (Add animations and update design)
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-in-out",
        "scale-in": "scaleIn 0.3s ease-in-out",
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
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;