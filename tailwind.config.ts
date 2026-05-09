import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-bg": "var(--bg-main)",
        "sidebar-bg": "var(--sidebar-bg)",
        "card-bg": "var(--card-bg)",
        primary: "var(--brand-color)",
      },
    },
  },
  plugins: [],
};

export default config;
