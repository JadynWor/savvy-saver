"use client";

import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
    return (
        <footer className="flex flex-row justify-between min-h-14 px-3 pb-3 pt-2">
            <div className="flex flex-row gap-2">
                <Link href={"placeholder"}>
                    <button className="btn btn-ghost btn-square w-fit p-1">
                        {"About us"}
                    </button>
                </Link>
                <Link href={"placeholder"}>
                    <button className="btn btn-ghost btn-square w-fit p-1">
                        {"Private Policy"}
                    </button>
                </Link>
                <Link href={"placeholder"}>
                    <button className="btn btn-ghost btn-square w-fit p-1">
                        {"Jadyn Worthington & Donavan Daniels"}
                    </button>
                </Link>
            </div>
            <button
                className="btn btn-neutral btn-outline btn-circle"
                title="Start Shopping Now!"
            >
                <FaShoppingCart />
            </button>
        </footer>
    );
}
