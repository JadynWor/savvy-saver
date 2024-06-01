import type { Config } from "tailwindcss";
import * as daisyui from "daisyui";

const config: Config & { daisyui: daisyui.Config } = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    daisyui: {
        logs: false,
    },
    theme: {
        extend: {
            colors: {
                savvysaverGreen: "00D632",
                savvysaverWhite: "E3BC9A",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [daisyui.default],
};
export default config;
