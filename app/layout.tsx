import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/authOptions";
import Footer from "@/app/components/Footer";
import {
    bebasNeue,
    jetBrains,
    poppins,
    quickSand,
    sourceCodePro,
} from "@/@lib/font";

export const metadata: Metadata = {
    title: "Savvy-Saver",
    description: "Save money on your food",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);
    return (
        <html lang="en">
            <body
                className={`${jetBrains.variable} ${quickSand.variable} ${bebasNeue.variable} ${jetBrains.variable} ${poppins.className} ${poppins.variable} ${sourceCodePro.variable} flex flex-col relative h-screen w-screen`}
            >
                <Header session={session}>{JSON.stringify(session)}</Header>
                {children}
                <Footer />
            </body>
        </html>
    );
}
