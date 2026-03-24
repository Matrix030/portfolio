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
        // Neo-brutalism base
        crust: "#0e0e1c",
        mantle: "#1a1a2e",
        base: "#1a1a2e",
        surface0: "#12121e",
        surface1: "#1a1a2e",
        surface2: "#2d2d44",
        // Text
        overlay0: "#6b6890",
        overlay1: "#554f80",
        overlay2: "#9896b8",
        text: "#e8e5f5",
        subtext0: "#9896b8",
        subtext1: "#7a78a0",
        // Accents
        lavender: "#818CF8",
        blue: "#3B82F6",
        sapphire: "#0EA5E9",
        sky: "#06B6D4",
        teal: "#14B8A6",
        green: "#22C55E",
        yellow: "#FBBF24",
        peach: "#F97316",
        maroon: "#F43F5E",
        red: "#EF4444",
        mauve: "#A855F7",
        pink: "#EC4899",
        flamingo: "#FB923C",
      },
      borderRadius: {
        window: "8px",
        module: "4px",
      },
      spacing: {
        "gap-in": "2px",
        "gap-out": "5px",
      },
      boxShadow: {
        brutal: "4px 4px 0px #4a4870",
        "brutal-sm": "3px 3px 0px #4a4870",
        "brutal-lg": "6px 6px 0px #4a4870",
        "brutal-hover": "6px 6px 0px #4a4870",
      },
    },
  },
  plugins: [],
};
export default config;
