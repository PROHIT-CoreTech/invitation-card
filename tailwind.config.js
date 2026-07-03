/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FFFDF9",
          dark: "#F4EFEB",
        },
        maroon: {
          DEFAULT: "#800000",
          light: "#A31D1D",
          dark: "#5E0000",
        },
        saffron: {
          DEFAULT: "#FF9933",
          light: "#FFB84D",
          dark: "#E67E00",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F3E5AB",
          dark: "#AA7C11",
        },
      },
      fontFamily: {
        heading: ["var(--font-rozha)", "serif"],
        body: ["var(--font-poppins)", "sans-serif"],
      },
      animation: {
        "pulse-gold": "pulseGold 2s infinite ease-in-out",
        "spin-slow": "spin 12s linear infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
      },
      keyframes: {
        pulseGold: {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(212, 175, 55, 0.5)" },
          "50%": { transform: "scale(1.05)", boxShadow: "0 0 0 12px rgba(212, 175, 55, 0)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
