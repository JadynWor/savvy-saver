import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header"
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/authOptions";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <Header session={session}>
          {JSON.stringify(session)}
        </Header>
        {children}
      </body>
    </html>
  );
}
