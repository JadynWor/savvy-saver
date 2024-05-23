'use client';
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link"

export default function Header({session}:{session:Session | null}){
    const name = session?.user?.name || '';
    const firstName = name.split(' ')[0];   //"Jadyn Worthington, this splits it so only first from the first index of character until space"
    return(
        <header className="border-b p-5 flex justify-between">
            <Link
                className="text-Black font-bold text-4xl"
                href ="">
                    Savvy Saver
            </Link>
            <nav className="flex gap-2 *:rounded *:px-2 *:py-1">
                <span className="text-gray-300 text-lg">|</span>
                {session &&
                    <>
                    <div className="flex items-center gap-2 center font-bold">
                        Welcome Back, {session.user?.name}
                    </div>

                     <button>
                        Cart
                    </button>
                    <span className="text-gray-300 text-lg">|</span>
                    <button
                            onClick={() => signOut()}
                            className="bg-yellow-600 font-bold text-white">
                            Log Out
                        </button>
                    </>      
                }
                {!session && (
                    <>
                        
                        <button
                            onClick={() => signIn()}
                            className="text-black font-bold px-4 py-2 rounded"
                        >
                            Sign in
                        </button>
                        <button 
                            onClick={() =>signupsd }
                            className="bg-yellow-600 font-bold text-white">Register
                        </button>
                        <Link href="/sign-up">dsfsdfdsfsd</Link>
                    </>
                )}
                <span className="text-gray-300 text-lg">|</span>
            </nav>
        </header>
    )
}