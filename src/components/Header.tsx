"use client";

import type { Session } from "next-auth";
import Link from "next/link";
import React from "react";

type HeaderProperties = {
    readonly children?: React.ReactNode;
    readonly session: Session;
};

/**
 * Header component for displaying navigation links.
 * @param {HeaderProperties} props - The properties for the Header component.
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = ({ session }: HeaderProperties): JSX.Element => {
    const name = session?.user?.name ?? "";
    // Split name to get the first name, but not used currently.
    // const firstName = name.split(" ")[0];

    return (
        <header className="flex justify-between border-b p-5">
            <Link className="text-4xl font-bold text-black" href="">
                {"Savvy Saver"}
            </Link>
            <nav className="flex gap-2 rounded px-2 py-1">
                {!session && (
                    <>
                        <div className="center flex items-center gap-2 font-bold"></div>
                        <div className="flex gap-4">
                            <Link className="flex items-center font-bold text-green-400" href="/login">
                                <button className="rounded-full bg-green-600 px-4 py-2 font-bold text-white" type="button">
                                    {"Sign In"}
                                </button>
                            </Link>
                            <Link className="flex items-center font-bold text-green-400" href="/sign-up">
                                <button className="rounded-full bg-green-600 px-4 py-2 font-bold text-white" type="button">
                                    {"Sign Up"}
                                </button>
                            </Link>
                        </div>
                    </>
                )}
                {session && (
                    <>
                        <Link className="flex items-center font-bold text-green-400" href="/login">
                            {"Login"}
                        </Link>
                        <Link className="flex items-center font-bold text-green-400" href="/sign-up">
                            {"Register"}
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
