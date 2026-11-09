import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        itec: { DEFAULT: "#00B0F0", dark: "#0F4761", light: "#E6F7FD" },
      },
      fontFamily: { sans: ["Arial", "Helvetica", "sans-serif"] },
    },
  },
  plugins: [],
} satisfies Config;
