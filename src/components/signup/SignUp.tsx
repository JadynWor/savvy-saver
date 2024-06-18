/* eslint-disable more/no-hardcoded-password -- disabled, used for form inputs, not states */
"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
    email: string;
    password: string;
    username: string;
};

const FORM_DEFAULT_VALUES: FormValues = {
    email: "",
    password: "",
    username: "",
};

/**
 * WHO IS GPTING THIS??
 *
 * SignUp component for user registration.
 * @returns {JSX.Element} The rendered SignUp component.
 */
const SignUp: React.FC = (): JSX.Element => {
    const router = useRouter();

    const { formState, register } = useForm({
        criteriaMode: "all",
        defaultValues: FORM_DEFAULT_VALUES,
        mode: "all",
        reValidateMode: "onChange",
    });

    const [isLoading, startTransition] = React.useTransition();

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

    const { isDirty, isSubmitting, isValid, isValidating } = formState;

    const isButtonDisabled =
        isSubmitting || !isValid || isValidating || !isDirty;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="mb-10 py-10 text-5xl">
                {isLoading ? "Processing..." : "Free Sign Up"}
            </h1>

            <input
                className="mb-4 w-[350px] rounded-lg border border-gray-300 p-2 text-slate-800 focus:border-gray-600 focus:outline-none"
                id="username"
                placeholder="Your Username..."
                type="text"
                {...register("username")}
            />

            <input
                className="mb-4 w-[350px] rounded-lg border border-gray-300 p-2 text-slate-800 focus:border-gray-600 focus:outline-none"
                id="email"
                placeholder="Your Email..."
                type="email"
                {...register("email")}
            />

            <input
                className="mb-4 w-[350px] rounded-lg border border-gray-300 p-2 text-slate-800 focus:border-gray-600 focus:outline-none"
                id="password"
                placeholder="Your Password..."
                type="password"
                {...register("password")}
            />

            <button
                className="mt-10 rounded-lg border border-gray-300 px-40 py-3 font-bold uppercase focus:border-gray-600 focus:outline-none"
                disabled={isButtonDisabled}
                onClick={onSignUp}
                type="button"
            >
                {"Sign Up"}
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
                <p className="self-closing mt-8 opacity-50" />
            </Link>
        </div>
    );
};

export default SignUp;
