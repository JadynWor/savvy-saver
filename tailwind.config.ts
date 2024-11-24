/* eslint-disable node/no-unpublished-import -- disabled */
/* eslint-disable import/no-namespace -- disabled */
/* eslint-disable sort-keys -- disabled */

import typography from "@tailwindcss/typography";
import { withAnimations } from "animated-tailwindcss";
import * as daisyui from "daisyui";
import * as tailWindScrollbar from "tailwind-scrollbar";
import type { Config } from "tailwindcss";

const config: Config = withAnimations({
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/common/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/common/components/*.{js,ts,jsx,tsx,mdx}",
    ],
    daisyui: {
        logs: false,
        themes: ["light"],
    },
    plugins: [typography(), daisyui.default, tailWindScrollbar.default],
    safelist: [
        "animate-delay-[0ms]",
        "animate-delay-[100ms]",
        "animate-delay-[200ms]",
        "btn-success",
        "btn-primary",
        "btn-neutral",
        "btn-disabled",
        "badge-primary",
        "badge-success",
        "badge-warning",
        "badge-error",
        "badge-info",
        "badge-neutral",
        "chat-start",
        "chat-end",
        "tooltip-open",
        "input-error",
        "input-info",
        "input-success",
        "input-primary",
        "bg-success",
        "bg-error",
        "text-success",
        "text-error",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
            borderColor: {
                filePreviewActive: "#009FDF",
            },
            borderWidth: {
                "1": "1px",
            },
            brightness: {
                "107": "107%",
            },
            colors: {},
            flexGrow: {
                "2": "2",
                "3": "3",
            },
            fontSize: {
                calclg: "calc(3.5rem + 20vw)",
                calcmd: "calc(2rem + 5vw)",
                calcsm: "calc(0.5rem + 1vw)",
                smBase: ["0.95rem", "1.5rem"],
                xxs: ["0.65rem", ".90rem"],
                xxxs: ["0.55rem", ".80rem"],
                xxxxs: ["0.5rem", "0.70rem"],
            },
            fontWeight: {
                superbold: "900",
            },
            gap: {
                "-1": "-0.25rem",
                "-2": "-0.5rem",
                "-3": "-0.75rem",
                "1/2": "50%",
                "1/3": "33.333%",
                full: "100%",
            },
            height: {
                "1.5/10": "15%",
                "1.7/10": "17%",
                "1.25/10": "12.5%",
                "1.55/10": "15.5%",
                "1/6": "16.66667%",
                "1/7": "14.28571%",
                "1/8": "12.5%",
                "1/10": "10%",
                "2/6": "33.33333%",
                "2/10": "20%",
                "3.5/10": "35%",
                "3/6": "50%",
                "3/10": "30%",
                "4/6": "66.66667%",
                "5/6": "83.33333%",
                "8/10": "80%",
                "9/10": "90%",
            },
            left: {
                "3.5/4": "87.5%",
                "3.75/4": "93.75%",
                "114": "114.2857142%",
                "116": "116.6666664%",
                "120": "120%",
                "133": "133.333333%",
                "150": "150%",
            },
            maxHeight: {
                "1.5/10": "15%",
                "1.7/10": "17%",
                "1.25/10": "12.5%",
                "1.55/10": "15.5%",
                "1/6": "16.66667%",
                "1/7": "14.28571%",
                "1/8": "12.5%",
                "1/10": "10%",
                "2/6": "33.33333%",
                "2/10": "20%",
                "3.5/10": "35%",
                "3/6": "50%",
                "3/10": "30%",
                "4/6": "66.66667%",
                "5/6": "83.33333%",
            },
            maxWidth: {
                "1vw": "1vw",
                "2vw": "2vw",
                "3vw": "3vw",
                "4vw": "4vw",
                "5vw": "5vw",
                "6vw": "6vw",
                "7vw": "7vw",
                "8vw": "8vw",
                "9vw": "9vw",
                "10vw": "10vw",
                "15vw": "15vw",
                "20vw": "20vw",
                "25vw": "25vw",
                "50vw": "50vw",
                "75vw": "75vw",
                "100vw": "100vw",
            },
            minHeight: {
                "0.5": "0.125rem",
                "1": "0.25em",
                "1.5": "0.375rem",
                "2": "0.5rem",
                "2.5": "0.625rem",
                "3": "0.75rem",
                "3.5": "0.875rem",
                "4": "1rem",
                "5": "1.25rem",
                "6": "1.5rem",
                "7": "1.75rem",
                "8": "2rem",
                "9": "2.25rem",
                "10": "2.5rem",
                "10vh": "10vh",
                "11": "2.75rem",
                "12": "3rem",
                "14": "3.5rem",
                "16": "4rem",
                "18": "4.5rem",
                "20": "5rem",
                "20vh": "20vh",
                "22": "5.5rem",
                "24": "6rem",
                "26": "6.5rem",
                "28": "7rem",
                "30": "7.5rem",
                "30vh": "30vh",
                "35": "8.25rem",
                "40": "9rem",
                "40vh": "40vh",
                "45": "9.75rem",
                "50": "10.5rem",
                "50vh": "50vh",
                "55vh": "55vh",
                "60": "12rem",
                "60vh": "60vh",
                "65vh": "65vh",
                "70": "13.5rem",
                "70vh": "70vh",
                "80": "15rem",
                "80vh": "80vh",
                "90": "16.5rem",
                "90vh": "90vh",
                "100": "18rem",
                "100vh": "100vh",
            },
            minWidth: {
                "1.5/10": "15%",
                "1.7/10": "17%",
                "1.25/10": "12.5%",
                "1.55/10": "15.5%",
                "1/10": "10%",
                "1vw": "1vw",
                "2/10": "20%",
                "2vw": "2vw",
                "3.5/10": "35%",
                "3/10": "30%",
                "3vw": "3vw",
                "4vw": "4vw",
                "5vw": "5vw",
                "6vw": "6vw",
                "7vw": "7vw",
                "8vw": "8vw",
                "9vw": "9vw",
                "10vw": "10vw",
                "15vw": "15vw",
                "20vw": "20vw",
                "25vw": "25vw",
                "50vw": "50vw",
                "75vw": "75vw",
                "100vw": "100vw",
            },
            padding: {
                "4.5": "1.15rem",
            },
            right: {
                ".5": ".125rem",
            },
            top: {
                "3/4": "75%",
                "8/9": "90%",
            },
            width: {
                "1/7": "14.28571%",
                "1/8": "12.5%",
            },
            zIndex: {
                "60": "60",
                "70": "70",
                "80": "80",
                max: "9999",
            },
        },
        flexBasis: {
            "1/4": "25%",
            "2/4": "50%",
            "3/4": "75%",
            "4/4": "100%",
        },
        fontFamily: {
            sans: [
                "var(--poppins)",
                "var(--bebas_neue)",
                "var(--jetbrains)",
                "var(--quicksand)",
                "var(--source_code_pro)",
                "cursive",
                "sans-serif",
            ],
        },
    },
} as object) as Config;

export default config;
