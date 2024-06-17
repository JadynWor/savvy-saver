"use client";

import React from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

/**
 * Footer component for displaying navigation links and a shopping cart button.
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = (): JSX.Element => {
    return (
        <footer className="flex min-h-14 flex-row justify-between px-3 pb-3 pt-2">
            <div className="flex flex-row gap-2">
                <Link href="placeholder">
                    <button className="btn-ghost btn btn-square w-fit p-1" type="button">
                        {"About us"}
                    </button>
                </Link>
                <Link href="placeholder">
                    <button className="btn-ghost btn btn-square w-fit p-1" type="button">
                        {"Private Policy"}
                    </button>
                </Link>
                <Link href="placeholder">
                    <button className="btn-ghost btn btn-square w-fit p-1" type="button">
                        {"FILL IN "}
                    </button>
                </Link>
            </div>
            <button
                className="btn-circle btn btn-neutral btn-outline"
                title="Start Shopping Now!"
                type="button"
            >
                <FaShoppingCart />
            </button>
        </footer>
    );
};

export default Footer;
