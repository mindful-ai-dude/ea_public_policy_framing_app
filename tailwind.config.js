const { fontFamily } = require("tailwindcss/defaultTheme");

    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
      theme: {
        extend: {
          colors: {
            primary: {
              DEFAULT: "hsl(210, 100%, 50%)",
              hover: "hsl(210, 100%, 45%)",
            },
            secondary: "hsl(210, 10%, 40%)",
            background: "hsl(220, 20%, 96%)",
            "glass-bg": "rgba(255, 255, 255, 0.2)",
            "glass-border": "rgba(255, 255, 255, 0.3)",
          },
          borderRadius: {
            container: "16px",
            button: "12px",
          },
          boxShadow: {
            soft: "0 8px 32px rgba(0, 0, 0, 0.1)",
          },
          backdropBlur: {
            xl: "20px",
          },
          gap: {
            section: "4rem",
          },
          fontFamily: {
            sans: ["Inter Variable", ...fontFamily.sans],
          },
        },
      },
      plugins: [],
    };
