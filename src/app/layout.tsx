import "./globals.css";

import type { Metadata } from "next";
import React from "react";

import {
    bebasNeue,
    jetBrains,
    poppins,
    quickSand,
    sourceCodePro,
} from "@/@lib/font";
import { commonMetadata } from "@/common/constants/metadata/commonMetadata";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

type LayoutProperties = {
    readonly children: React.ReactNode;
};

/**
 * Root layout component.
 * @param props - The component props.
 * @param children - The child components.
 * @returns The rendered layout.
 */
const RootLayout = async ({
    children,
// eslint-disable-next-line require-await, @typescript-eslint/require-await -- disabled require await so faster
}: LayoutProperties): Promise<JSX.Element> => (
    <html lang="en">
        <body
            className={`${jetBrains.variable} ${quickSand.variable} ${bebasNeue.variable} ${poppins.variable} ${poppins.className} ${sourceCodePro.variable} relative flex h-screen w-screen flex-col`}
        >
            <Header />
            {children}
            <Footer />
        </body>
    </html>
);

/**
 * Metadata for the application.
 */
export const metadata: Metadata = {
    ...commonMetadata,
    description: "Save money on your food",
    title: "Savvy-Saver",
};

export default RootLayout;
