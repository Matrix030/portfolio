import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base
        crust: "#232634",
        mantle: "#292c3c",
        base: "#303446",
        surface0: "#414559",
        surface1: "#51576d",
        surface2: "#626880",
        // Text
        overlay0: "#737994",
        overlay1: "#838ba7",
        overlay2: "#949cbb",
        text: "#c6d0f5",
        subtext0: "#a5adce",
        subtext1: "#b5bfe2",
        // Accents
        lavender: "#babbf1",
        blue: "#8caaee",
        sapphire: "#85c1dc",
        sky: "#99d1db",
        teal: "#81c8be",
        green: "#a6d189",
        yellow: "#e5c890",
        peach: "#ef9f76",
        maroon: "#ea999c",
        red: "#e78284",
        mauve: "#ca9ee6",
        pink: "#f4b8e4",
        flamingo: "#eebebe",
      },
      borderRadius: {
        window: "10px",
        module: "5px",
      },
      spacing: {
        "gap-in": "2px",
        "gap-out": "5px",
      },
    },
  },
  plugins: [],
};
export default config;
