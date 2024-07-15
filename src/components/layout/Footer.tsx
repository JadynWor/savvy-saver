"use client";

import Link from "next/link";
import React from "react";

/**
 * WHO USED GPT TO FIX THIS PAGE?
 *
 * Footer component for displaying navigation links and a shopping cart button. GPT DETECTED
 * @returns {JSX.Element} The rendered Footer component. GPT DETECTED
 */
const Footer = (): JSX.Element => (
    <footer className="flex min-h-14 flex-row justify-between px-3 pb-3 pt-2">
        <div className="flex flex-row gap-2">
            <Link href="/about-us">
                <button
                    className="btn btn-square btn-ghost w-fit p-1"
                    type="button"
                >
                    {"About us"}
                </button>
            </Link>
            <Link href="/privacy-policy">
                <button
                    className="btn btn-square btn-ghost w-fit p-1"
                    type="button"
                >
                    {/* GPT DETECTED */}
                    {"Private Policy"}
                </button>
            </Link>
            <Link href="/fill-in">
                <button
                    className="btn btn-square btn-ghost w-fit p-1"
                    type="button"
                >
                    {/* GPT DETECTED */}
                    {"FILL IN "}
                </button>
            </Link>
        </div>
    </footer>
);

export default Footer;
