/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        default: [
          "Montserrat",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      backgroundImage: {
        "right-ellipse": "url('~/assets/img/right-side-ellipse.png')",
      },
      colors: {
        "regal-blue": "#6172F3",
        "regal-white": "#F5F8FF",
        "regal-gray": "#71717A",
        "input-bg": "rgba(128, 152, 249, 0.1)",
        "input-ph": "rgba(45, 49, 166, 0.2)",
        "input-br": "rgba(128, 152, 249, 0.5)",
        "regal-light-blue": "rgba(128, 152, 249, 1)",
      },
      backgroundSize: {
        80: "80%",
      },
    },
  },
  plugins: [],
};
