import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Oceania — a muted, painterly coastal palette. Light mode: dawn
        // ivory and deep sea slate. Dark mode: moonlit night water. Kept
        // deliberately desaturated, closer to varnished oil pigment than
        // screen color.
        ink: "#22333B",
        ink2: "#2E4149",
        abyss: "#0C141D",
        abyssdeep: "#070D14",
        pearl: "#F2ECDF",
        pearldeep: "#E7DCC8",
        foam: "#FAF6EC",
        lagoon: "#4A7286",
        lagoonlight: "#7C9BAB",
        coral: "#C08466",
        dawn: "#D9A464",
        gold: "#B99659",
        violet: "#8A87A8",
        cyanglow: "#B9CCDF",
        sand: "#DCC9A4",
        mist: "#D9D5C9",
        stone: "#6E7A74",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        sans: ["'Inter'", "ui-sans-serif", "system-ui"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        wider2: "0.14em",
      },
      fontSize: {
        mega: ["clamp(3.5rem, 12vw, 11rem)", { lineHeight: "0.92" }],
        huge: ["clamp(2.5rem, 7vw, 6rem)", { lineHeight: "0.98" }],
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
