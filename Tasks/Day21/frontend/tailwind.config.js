/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // all source files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#667eea",
        secondary: "#764ba2",
      },
      animation: {
        typewriter: "typewriter 2s steps(30) 1s 1 normal both",
        "blink-cursor": "blink 500ms step-end infinite",
        "glow-pulse": "glow 2s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        "spin-slow-reverse": "spin 12s linear infinite reverse",
        scroll: "scroll 20s linear infinite", // Added scrolling animation
      },
      keyframes: {
        typewriter: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        blink: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "white" },
        },
        glow: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.1)" },
        },
        scroll: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }, // scroll half container
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-none": {
          "-ms-overflow-style": "none", // IE & Edge
          "scrollbar-width": "none", // Firefox
        },
        ".scrollbar-none::-webkit-scrollbar": {
          display: "none", // Chrome, Safari, Opera
        },
      });
    },
  ],
};
