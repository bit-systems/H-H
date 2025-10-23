/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      primary: ["Monument Extended", "sans-serif"],
      secondary: ["Inter", "sans-serif"],
      hero: ["Monument Extended Ultrabold", "sans-serif"],
    },
    fontWeight: {
      400: "400",
      700: "700",
      900: "900",
    },
    fontSize: {
      xs: "1rem", // 10px
      sm: "1.2rem", // matches your body
      base: "1.6rem", // your default <p>, <h1> etc.
      lg: "2rem",
      xl: "2.7rem",
    },
    letterSpacing: {
      primary: "0.05rem",
      secondary: "-0.05rem",
      link: "0.1rem",
      button: "0.12rem",
    },
    extend: {
      colors: {
        primary: "#000",
        secondary: "#fff",
        var: "#3d3d3d",
        detail: "#8c52ff",
        link: {
          primary: "#3d3d3d",
          hover: "#000",
        },
        discount: "rgba(243, 121, 120, 1)",
        back: {
          primary: "#fff",
          grey: "#3d3d3d",
          highlight: "hsla(0, 0%, 5%, 0.2)",
          error: "rgba(243, 121, 120, 0.95)",
          discount: "rgba(243, 121, 120, 0.95)",
        },
        button: {
          primary: "#3d3d3d",
          secondary: "#fff",
          hover: "#000",
          checkout: "#48e471",
          "checkout-hover": "#74eb93",
        },
        border: {
          checkout: "#48e471",
          "checkout-hover": "#74eb93",
          var: "hsla(0, 0%, 5%, 0.2)",
        },
      },
      boxShadow: {
        DEFAULT:
          "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
      },
      zIndex: {
        nav: "57",
        backdrop: "58",
        modal: "59",
        "modal-n": "60",
      },
      maxWidth: {
        container: "125rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
