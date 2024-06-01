import {
    Bebas_Neue,
    JetBrains_Mono,
    Poppins,
    Quicksand,
    Source_Code_Pro,
} from "next/font/google";

/**
 * Loads the jetbrains font from google api
 * - latin subset
 * - css variable is --jetbrains
 */
const jetBrains = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--jetbrains",
});

/**
 * Loads the quicksand font from google api
 * - latin subset
 * - css variable is --quicksand
 */
const quickSand = Quicksand({ subsets: ["latin"], variable: "--quicksand" });

/**
 * Loads Bebas_Neue from google api
 * - latin subset
 * - css variable is --bebas_neue
 * - weight (boldness) is 400 (a little light)
 */
const bebasNeue = Bebas_Neue({
    subsets: ["latin"],
    variable: "--bebas_neue",
    weight: "400",
});

/**
 * Loads poppins from google api
 * - latin subset
 * - display is auto, meaning that it is up to the user (browser) to display poppins or not (more than likely yes)
 * - css variable is --poppins
 * - weights are (400 light) (700 bold) (800 really bold)
 *
 */
const poppins = Poppins({
    display: "auto",
    subsets: ["latin"],
    variable: "--poppins",
    weight: ["400", "700", "800"],
});

/**
 * Font for displaying code maybe
 * - latin subset
 * - css variable --source_code_pro
 * - weight (400 light)
 */
const sourceCodePro = Source_Code_Pro({
    subsets: ["latin"],
    variable: "--source_code_pro",
    weight: "400",
});

export { bebasNeue, jetBrains, poppins, quickSand, sourceCodePro };
