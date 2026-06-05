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
        "map-dark": "#070b07",
        "map-surface": "#111811",
        "map-surface-light": "#1a231a",
        "cannabis-green": "#22c55e",
        "cannabis-green-dark": "#16a34a",
        "treasure-gold": "#d4af37",
        "treasure-gold-light": "#fbbf24",
        "text-primary": "#f0fdf4",
        "text-muted": "#86efac",
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #fbbf24 0%, #d4af37 50%, #b8860b 100%)",
        "green-glow": "radial-gradient(ellipse at center, rgba(34,197,94,0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        treasure: "0 0 20px rgba(212, 175, 55, 0.2), 0 4px 24px rgba(0,0,0,0.4)",
        card: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      animation: {
        shimmer: "shimmer 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
