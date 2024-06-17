"use client";
import React from "react";

/**
 * Home component.
 * @returns {JSX.Element} The rendered Home component.
 */
const Home: React.FC = (): JSX.Element => {
    return (
        <div className="flex h-full flex-col items-center justify-center bg-[url(/home.jpg)] bg-cover pt-4 opacity-50">
            <span className="text-3xl font-bold">
                {"Smart Savings, Closer to You"}
            </span>
            <div className="mt-8 flex w-full flex-row items-center justify-center space-x-4 px-8">
                <input
                    className="w-full max-w-md rounded-md border border-gray-300 p-2"
                    placeholder="Enter your address"
                    type="text"
                />
                <select className="w-32 rounded-md border border-gray-300 p-2">
                    <option value="25">{"25 miles"}</option>
                    <option value="50">{"50 miles"}</option>
                    <option value="100">{"100 miles"}</option>
                </select>
                <button
                    className="rounded bg-blue-500 py-2 px-4 font-bold text-white"
                    type="button"
                >
                    {"Search"}
                </button>
            </div>
        </div>
    );
};

export default Home;
