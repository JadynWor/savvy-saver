import React from "react";

/**
 * LoginPage component for user authentication
 * @returns The rendered login page component.
 */
const LoginPage: React.FC = () => (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-green-400 via-green-500 to-green-600">
        <form className="w-full max-w-sm text-white">
            <h2 className="mb-8 text-center text-3xl font-bold">{"Welcome"}</h2>
            <div className="mb-6">
                <label
                    className="mb-2 block text-sm font-medium"
                    htmlFor="email"
                >
                    {"Email"}
                </label>
                <input
                    className="w-full rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    id="email"
                    name="email"
                    required
                    type="email"
                />
            </div>
            <div className="mb-6">
                <label
                    className="mb-2 block text-sm font-medium"
                    htmlFor="password"
                >
                    {"Password"}
                </label>
                <input
                    className="w-full rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    id="password"
                    name="password"
                    required
                    type="password"
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-200 hover:bg-blue-700"
                    type="button"
                >
                    {" Log in"}
                </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <button
                    className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-200 hover:bg-blue-700"
                    type="button"
                >
                    {" Forgot Password"}
                </button>
            </div>
        </form>
    </div>
);

export default LoginPage;
