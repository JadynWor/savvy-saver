import React from "react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import Header from "@/src/app/components/Header";
import Footer from "@/src/app/components/Footer";
import {
    bebasNeue,
    jetBrains,
    poppins,
    quickSand,
    sourceCodePro,
} from "@/@lib/font";
import "./globals.css";

/**
 * Metadata for the application.
 */
export const metadata: Metadata = {
    description: "Save money on your food",
    title: "Savvy-Saver",
};

/**
 * Root layout component.
 * @param {Object} props - The component props.
 * @param {Readonly<{children: React.ReactNode}>} props.children - The child components.
 * @returns {Promise<JSX.Element>} The rendered layout.
 */
const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = async ({
    children,
}) => {
    const session = await getServerSession(authOptions);
    return (
        <html lang="en">
            <body
                className={`${jetBrains.variable} ${quickSand.variable} ${bebasNeue.variable} ${poppins.variable} ${poppins.className} ${sourceCodePro.variable} flex flex-col relative h-screen w-screen`}
            >
                <Header session={session}>{JSON.stringify(session)}</Header>
                {children}
                <Footer />
            </body>
        </html>
    );
};

export default RootLayout;
