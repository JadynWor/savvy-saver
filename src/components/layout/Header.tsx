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

        <Link className="flex items-center font-bold text-green-600" href="/login">{"Login"}</Link>
        <span className="text-lg text-gray-300">{"|"}</span>
        <Link className="flex items-center font-bold text-green-600	" href="/signup">{"Register"}</Link>
        <span className="text-lg text-gray-300">{"|"}</span>

    </header>
);

export default Header;
