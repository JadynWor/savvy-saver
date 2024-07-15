import Link from "next/link";
import React from "react";

/**
 * LoginPage component for user authentication
 * @returns The rendered login page component.
 */
const LoginPage: React.FC = () => (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white py-2">
        <h1 className="mb-10 py-10 text-5xl">{"Welcome Back"}</h1>
        
        <form className="w-full max-w-sm text-black">
            <div className="mb-4">
                <label
                    className="mb-2 block text-sm font-medium"
                >
                    {"Email"}
                </label>
                <input
                    className="mb-4 w-[350px] rounded-lg border border-gray-300 p-2 text-slate-800 focus:border-gray-600 focus:outline-none"
                    id="email"
                    name="email"
                    placeholder="Your Email..."
                    required
                    type="email"
                />
            </div>
            <div className="mb-4">
                <label
                    className="mb-2 block text-sm font-medium"
                    htmlFor="password"
                >
                    {"Password"}
                </label>
                <input
                    className="mb-4 w-[350px] rounded-lg border border-gray-300 p-2 text-slate-800 focus:border-gray-600 focus:outline-none"
                    id="password"
                    name="password"
                    placeholder="Your Password..."
                    required
                    type="password"
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="mt-10 w-full rounded-lg border border-gray-300 bg-green-400 px-40 py-3 font-bold uppercase focus:border-gray-600 focus:outline-none"
                    type="button"
                >
                    {"Log in"}
                </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <button
                    className="w-full rounded-lg border border-gray-300 bg-green-400 px-20 py-3 font-bold uppercase focus:border-gray-600 focus:outline-none"
                    type="button"
                >
                    {"Forgot Password"}
                </button>
            </div>
        </form>


        <Link href="/signup">
            <p className="mt-10">
                {"Don't have an account?"}
                <span className="ml-2 cursor-pointer font-bold text-green-600 underline">
                    {"Register Now"}
                </span>
            </p>
        </Link>
        
    </div>
);

export default LoginPage;
