const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-blue": "#e0f7fa",
        "soft-pink": "#f8bbd0",
        "soft-green": "#c8e6c9",
        "soft-blue": "#bbdefb",
        "soft-yellow": "#fff9c4",
      },
      animation: {
        rotate: "rotate 0.5s ease-in-out",
        fadeIn: "fadeIn 0.3s ease-in-out forwards",
        fadeOut: "fadeOut 0.3s ease-in-out forwards",
        slideIn: "slideIn 0.5s ease-out forwards",
        "zoom-in-zoom-out": "zoom-in-zoom-out 1s ease infinite",
      },
      keyframes: {
        rotate: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(50deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        fadeOut: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.95)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "zoom-in-zoom-out": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.25)" },
          "100%": { transform: "scale(1)" },
        },
      },

      fontFamily: {
        roboto: ['"Roboto"', "sans-serif"],
        poppins: ['"Poppins"', "sans-serif"],
        audiowide: ['"Audiowide"', "cursive"],
        oxanium: ['"Oxanium"', "cursive"],
      },
      backgroundImage: {
        "dark-image": "url('dark-bg.png')",
        "light-image": "url('banner-01.jpg')",
        "nav-dark": "url('nav-dark.jpg')",
      },
    },
  },
  plugins: [],
});
