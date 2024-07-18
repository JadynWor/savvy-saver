/* eslint-disable more/no-hardcoded-password -- disabled, used for form inputs, not states */
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

import type { ApiResponse } from "@/@types/api";
import { ClientSideApi } from "@/common/api/ClientSideApi";
import { ClientEndpoints } from "@/common/constants/api/clientEndPoints";


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
 *
 * SignUp component for user registration.
 * @returns {JSX.Element} The rendered SignUp component.
 */
const SignUp: React.FC = (): JSX.Element => {
    const { formState, handleSubmit, register } = useForm<FormValues>({
        defaultValues: FORM_DEFAULT_VALUES,
    });

    const { isDirty, isSubmitting, isValid, isValidating } = formState;

    const router = useRouter();

    /**
     * Handles the form submission for user registration.
     * @param {FormValues} data - The form data containing the user's email and password.
     * @returns {Promise<void>} - A promise that resolves when the form submission is complete.
     */
    const onSubmit = async (data: FormValues): Promise<void> => {
        console.log("Form submitted", data);
        try {
            const formData = new FormData();
            formData.append("email", data.email);
            formData.append("password", data.password);

            const response = await ClientSideApi.post<ApiResponse<boolean>, FormData>(
                `${ClientSideApi.BASE_URL}${ClientEndpoints.AUTH.REGISTER}`,
                formData,
                undefined,
                { formDataSent: true },
            );

            console.log("API response", response);

            if (response.success) {
                router.push("../app/navigation/page.tsx");
            } else {
                console.error("Registration failed:", response.message);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };


    const isButtonDisabled = isSubmitting || !isValid || isValidating || !isDirty;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <h1 className="mb-10 py-10 text-5xl">
                {"Register Now!"}
            </h1>

            <form className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="mb-4 w-[350px] rounded-lg border border-gray-300 p-2 text-slate-800 focus:border-gray-600 focus:outline-none"
                    id="username"
                    placeholder="Your Username..."
                    type="text"
                    {...register("username", { required: true })}
                />

                <input
                    className="mb-4 w-[350px] rounded-lg border border-gray-300 p-2 text-slate-800 focus:border-gray-600 focus:outline-none"
                    id="email"
                    placeholder="Your Email..."
                    type="email"
                    {...register("email", { required: true })}
                />

                <input
                    className="mb-4 w-[350px] rounded-lg border border-gray-300 p-2 text-slate-800 focus:border-gray-600 focus:outline-none"
                    id="password"
                    placeholder="Your Password..."
                    type="password"
                    {...register("password", { required: true })}
                />

                <button
                    className="mt-10 rounded-lg border border-gray-300 bg-green-400 px-40 py-3 font-bold uppercase focus:border-gray-600 focus:outline-none"
                    disabled={isButtonDisabled}
                    type="submit"
                >
                    {"Sign Up"}
                </button>
            </form>

            <Link href="/login">
                <p className="mt-10">
                    {"Already have an account?"}{" "}
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
