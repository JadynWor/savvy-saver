'use client';
import { signIn } from "next-auth/react";
import Link from "next/link"

export default function Header(){
    return(
        <header className="border-b p-5 flex justify-between">
            <Link
                className="text-Black font-bold text-4xl"
                href ="">
                    Savvy Saver
            </Link>
            <nav className="flex gap-2 *:rounded *:px-2 *:py-1">
                    <button>
                        Cart
                    </button>
                <span className="text-gray-300 text-lg">|</span>

                <button 
                    onClick={() => signIn()}
                    className="text-black font-bold px-4 py-2 rounded"
                >
                    Sign in
                </button>


                <span className="text-gray-300 text-lg">|</span>
                <button className="bg-yellow-600 font-bold text-white">Register</button>

            </nav>
        </header>
    )
}