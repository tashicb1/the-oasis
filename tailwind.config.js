module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        gold: {
          400: "#f5c842",
          500: "#e6b800",
          600: "#c9a200",
        },
        navy: {
          800: "#1a2235",
          900: "#0f1623",
        },
      },
    },
  },
  plugins: [],
};
