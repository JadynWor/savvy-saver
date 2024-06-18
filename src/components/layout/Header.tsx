"use client";

import Link from "next/link";
import React from "react";

/**
 * WHO USED GPT TO FIX THIS PAGE?
 *
 * Header component for displaying navigation links.
 * @param props - The properties for the Header component.
 * @returns The rendered Header component.
 */
const Header = (): JSX.Element => (
    <header className="flex justify-between border-b p-5">
        <Link
            className="text-4xl font-bold text-black hover:animate-pulse hover:animate-infinite"
            href="/"
        >
            {"Savvy Saver"}
        </Link>
    </header>
);

export default Header;
