/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [typography, daisyui],
  theme: {
    extend: {
      colors: {
        "code-snippet": "var(--code-snippet)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "--code-snippet": "rgb(247 248 255)",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["sunset"],
          "--code-snippet": "rgb(40 40 40)",
        },
      },
    ],
  },
};
