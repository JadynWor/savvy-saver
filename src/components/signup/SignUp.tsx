/* eslint-disable more/no-hardcoded-password -- disabled, used for form inputs, not states */
"use client";
import Link from "next/link";
import React from "react";
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
    const { formState, register } = useForm({
        criteriaMode: "all",
        defaultValues: FORM_DEFAULT_VALUES,
        mode: "all",
        reValidateMode: "onChange",
    });

    const { isDirty, isSubmitting, isValid, isValidating } = formState;

    const isButtonDisabled =
        isSubmitting || !isValid || isValidating || !isDirty;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <h1 className="mb-10 py-10 text-5xl">
                {"Processing..." }{"Free Sign Up"}
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
