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
        crust: "#FEF9EF",
        mantle: "#FFFFFF",
        base: "#FFFFFF",
        surface0: "#F5F0E8",
        surface1: "#1a1a2e",
        surface2: "#2d2d44",
        // Text
        overlay0: "#6B7280",
        overlay1: "#4B5563",
        overlay2: "#374151",
        text: "#1a1a2e",
        subtext0: "#374151",
        subtext1: "#2d2d44",
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
        brutal: "4px 4px 0px #1a1a2e",
        "brutal-sm": "3px 3px 0px #1a1a2e",
        "brutal-lg": "6px 6px 0px #1a1a2e",
        "brutal-hover": "6px 6px 0px #1a1a2e",
      },
    },
  },
  plugins: [],
};
export default config;
