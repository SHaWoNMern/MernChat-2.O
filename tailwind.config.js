const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"Roboto"', "sans-serif"],
        poppins: ['"Poppins"', "sans-serif"],
        audiowide: ['"Audiowide"', "cursive"],
        oxanium: ['"Oxanium"', "cursive"],
      },
      backgroundImage: {
        "dark-image": "url('dark-bg.png')",
        "light-image": "url('light-1.jpg')",
        "login-left": "url('Login_left.png')",
      },
    },
  },
  plugins: [],
});
