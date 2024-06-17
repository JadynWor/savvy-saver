"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

/**
 * SignUp component for user registration.
 * @returns {JSX.Element} The rendered SignUp component.
 */
const SignUp: React.FC = (): JSX.Element => {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignUp = async (): Promise<void> => {
        try {
            setLoading(true);

            const response = await axios.post("/api/users/signup", user);
            console.info("Signup successful", response.data);
            router.push("/login");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(
            user.username.length === 0 ||
            user.email.length === 0 ||
            user.password.length === 0
        );
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="mb-10 py-10 text-5xl">
                {loading ? "Processing..." : "Free Sign Up"}
            </h1>

            <input
                className="mb-4 w-[350px] rounded-lg border border-gray-300 p-2 text-slate-800 focus:border-gray-600 focus:outline-none"
                id="username"
                onChange={(event) => setUser({ ...user, username: event.target.value })}
                placeholder="Your Username..."
                type="text"
                value={user.username}
            />

            <input
                className="mb-4 w-[350px] rounded-lg border border-gray-300 p-2 text-slate-800 focus:border-gray-600 focus:outline-none"
                id="email"
                onChange={(event) => setUser({ ...user, email: event.target.value })}
                placeholder="Your Email..."
                type="email"
                value={user.email}
            />

            <input
                className="mb-4 w-[350px] rounded-lg border border-gray-300 p-2 text-slate-800 focus:border-gray-600 focus:outline-none"
                id="password"
                onChange={(event) => setUser({ ...user, password: event.target.value })}
                placeholder="Your Password..."
                type="password"
                value={user.password}
            />

            <button
                className="mt-10 rounded-lg border border-gray-300 px-40 py-3 font-bold uppercase focus:border-gray-600 focus:outline-none"
                disabled={buttonDisabled}
                onClick={onSignUp}
                type="button"
            >
                {buttonDisabled ? "Sign Up" : "Register My Account Now"}
            </button>

            <Link href="login">
                <p className="mt-10">
                    {"Do you have an account already? "}
                    <span className="ml-2 cursor-pointer font-bold text-green-600 underline">
                        {"Login to your account"}
                    </span>
                </p>
            </Link>

            <Link href="/">
                <p className="mt-8 opacity-50 self-closing" />
            </Link>
        </div>
    );
};

export default SignUp;
