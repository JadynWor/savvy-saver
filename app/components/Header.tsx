"use client";
import React from "react";
import { Session } from "next-auth";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type HeaderProperties = {
    readonly children: React.ReactNode;
    readonly session: Session;
};

const Header = ({ children, session }: HeaderProperties) => {
    const name = session?.user?.name || "";
    const firstName = name.split(" ")[0]; //"Jadyn Worthington, this splits it so only first from the first index of character until space"
    return (
        <header className="border-b p-5 flex justify-between">
            <Link className="text-Black font-bold text-4xl" href="">
                {"Savvy Saver"}
            </Link>
            <nav className="flex gap-2 *:rounded *:px-2 *:py-1">
                {!session && (
                    <>
                        <div className="flex items-center gap-2 center font-bold"></div>
                        <div className="flex gap-4">
                            <Link
                                href="/login"
                                className="flex items-center font-bold text-green-400 "
                            >
                                <button className="bg-green-600 font-bold text-white rounded-full px-4 py-2">
                                    {"Sign In"}
                                </button>
                            </Link>
                            <Link
                                href="/sign-up"
                                className="flex items-center font-bold text-green-400"
                            >
                                <button className="bg-green-600 font-bold text-white rounded-full px-4 py-2">
                                    {"Sign Up"}
                                </button>
                            </Link>
                        </div>
                    </>
                )}
                {session && (
                    <>
                        <Link
                            href="/login"
                            className="flex items-center font-bold text-green-400 "
                        >
                            {"Login"}
                        </Link>

                        <Link
                            href="/sign-up"
                            className="flex items-center font-bold text-green-400"
                        >
                            {"Register"}
                        </Link>
                    </>
                )}
            </nav>
            {children}
        </header>
    );
};

export default Header;
