import type { Config } from "tailwindcss";

export default {
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
                "hacker-green": "#10b981",
                "hacker-dark": "#050505",
                "hacker-card": "#111111",
                "boss-red": "#ef4444",
            },
            fontFamily: {
                mono: ["var(--font-geist-mono)", "monospace"],
            },
            animation: {
                "spin-slow": "spin 8s linear infinite",
                "pulse-glow": "pulse-glow 2s ease-in-out infinite",
                "glitch": "glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
            },
            keyframes: {
                "pulse-glow": {
                    "0%, 100%": { boxShadow: "0 0 10px rgba(16, 185, 129, 0.2)" },
                    "50%": { boxShadow: "0 0 25px rgba(16, 185, 129, 0.6)" },
                },
                glitch: {
                    "0%": { transform: "translate(0)" },
                    "20%": { transform: "translate(-2px, 2px)" },
                    "40%": { transform: "translate(-2px, -2px)" },
                    "60%": { transform: "translate(2px, 2px)" },
                    "80%": { transform: "translate(2px, -2px)" },
                    "100%": { transform: "translate(0)" },
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
