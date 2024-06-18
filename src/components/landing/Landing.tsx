"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Key } from "ts-key-enum";

type FormValues = {
    search: string;
};

const MILE_OPTIONS = [25, 50, 100];

const DEFAULT_FORM_VALUES: FormValues = {
    search: "",
};

/**
 * The landing page, represents the page the user "lands" on when navigating to the website
 *
 * @returns - The landing page component
 */
export const Landing = (): JSX.Element => {
    const { formState, register } = useForm<FormValues>({
        criteriaMode: "all",
        defaultValues: DEFAULT_FORM_VALUES,
        mode: "all",
        reValidateMode: "onChange",
    });

    const { isDirty, isValid, isValidating } = formState;

    const isButtonEnabled = isDirty && isValid && !isValidating;

    const onKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === Key.Enter) {
                console.log("pressed enter");
            }
        },
        [],
    );

    return (
        <div className="flex h-full flex-col items-center justify-center bg-gray-400/80 bg-[url(/home.jpg)] bg-cover pt-4 bg-blend-screen">
            <div className="rounded bg-slate-800 p-3 shadow-lg">
                <div className="text-center text-3xl font-bold text-white">
                    {"Smart Savings, Closer to You"}
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
                    <div className="flex flex-row gap-3">
                        <input
                            className="input input-bordered w-full max-w-md rounded-md border border-gray-300 p-2"
                            onKeyDown={onKeyDown}
                            placeholder="Enter your address"
                            type="text"
                            {...register("search")}
                        />
                        <select className="select select-bordered">
                            {MILE_OPTIONS.map((eachOption) => (
                                <option
                                    key={`${eachOption}_miles`}
                                    value={eachOption}
                                >
                                    {`${eachOption} miles`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full">
                        <button
                            className={`${isButtonEnabled ? "" : "btn-outline !text-gray-500"} btn btn-info w-full rounded px-4 py-2 text-lg font-bold !text-white`}
                            disabled={!isButtonEnabled}
                            type="button"
                        >
                            {"Search"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
