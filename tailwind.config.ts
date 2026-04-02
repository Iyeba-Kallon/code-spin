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
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                "hacker-green": "hsla(var(--hacker-green))",
                "hacker-dark": "hsla(var(--background))",
                "boss-red": "hsla(var(--boss-red))",
            },
            fontFamily: {
                mono: ["var(--font-geist-mono)", "monospace"],
                orbitron: ["Orbitron", "sans-serif"],
                inter: ["Inter", "sans-serif"],
            },
            animation: {
                "spin-slow": "spin 8s linear infinite",
                "pulse-glow": "pulse-glow 2s ease-in-out infinite",
                "glitch": "glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
                "float": "float 6s ease-in-out infinite",
                "scanline": "scanline 10s linear infinite",
                "data-flow": "data-flow 20s linear infinite",
            },
            keyframes: {
                "pulse-glow": {
                    "0%, 100%": { boxShadow: "0 0 10px hsla(var(--hacker-green) / 0.2)" },
                    "50%": { boxShadow: "0 0 25px hsla(var(--hacker-green) / 0.6)" },
                },
                glitch: {
                    "0%": { transform: "translate(0)" },
                    "20%": { transform: "translate(-2px, 2px)" },
                    "40%": { transform: "translate(-2px, -2px)" },
                    "60%": { transform: "translate(2px, 2px)" },
                    "80%": { transform: "translate(2px, -2px)" },
                    "100%": { transform: "translate(0)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                scanline: {
                    "0%": { transform: "translateY(-100%)" },
                    "100%": { transform: "translateY(100vh)" },
                },
                "data-flow": {
                  "0%": { transform: "translateY(0)" },
                  "100%": { transform: "translateY(-50%)" }
                }
            },
        },
    },
    plugins: [],
} satisfies Config;
