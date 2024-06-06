import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";


const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"


  ],
  darkMode: "class",
  plugins: [require("daisyui"), nextui()],
  daisyui: {
    themes: [
      "light",
      // "dark",
      "cupcake",
      // "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      // "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      // "aqua",
      // "lofi",
      // "pastel",
      "fantasy",
      // "wireframe",
      "black",
      // "luxury",
      "dracula",
      // "cmyk",
      // "autumn",
      // "business",
      // "acid",
      "lemonade",
      "night",
      // "coffee",
      "winter",
      "dim",
      // "nord",
      "sunset",
    ],
  },

};
export default config;
