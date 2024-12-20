/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#1f2534",
        secondary: {
          light: "#ff8252",
          DEFAULT: "#e56c00",
          dark: "#e56c00",
        },
        accent: {
          light: "#F7B84B", // Light orange
          DEFAULT: "#FF8C00", // Vibrant orange
          dark: "#C86400", // Deeper orange
        },
      },
    },
    safelist: [
      "bg-green-200",
      "bg-green-400",
      "bg-green-500",
      "bg-red-200",
      "bg-red-400",
      "bg-red-500",
      "bg-gray-200",
      "bg-gray-400",
      "bg-gray-500",
    ],
  },
  plugins: [],
};
