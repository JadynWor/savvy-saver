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
        <div className="flex items-center space-x-3">
            <Link className="font-bold bg-green-400 text-white px-4 py-2 rounded-full" href="/login">
                {"Login"}
            </Link>
            <span className="text-2xl text-gray-300">{"|"}</span>
            <Link className="font-bold bg-black text-white px-4 py-2 rounded-full" href="/signup">
                {"Register"}
            </Link>
        </div>
    </header>
);
export default Header;
