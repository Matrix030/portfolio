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
        desktop: "#0a0a0a",
        surface: "#101010",
        "surface-hover": "#1e1e1e",
        "border-active-from": "#33ccff",
        "border-active-to": "#00ff99",
        "border-inactive": "#595959",
        "text-primary": "#c6d0f5",
        "text-muted": "#737994",
        "text-clock": "#8caaee",
        "text-audio": "#ea999c",
        "text-graduation": "#f4b8e4",
        "text-network": "#99d1db",
        "text-memory": "#c6d0f5",
        "text-cpu": "#a6d189",
        "shadow-window": "rgba(26,26,26,0.93)",
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
