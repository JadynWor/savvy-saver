/* eslint-disable require-await -- avoiding thread blocking */
/* eslint-disable @typescript-eslint/require-await -- need async to avoid thread blocking */
"use server";

import { sign } from "jsonwebtoken";
import ms from "ms";
import { cookies } from "next/headers";

import { apiKeys } from "@/common/constants/api/apiKeys";

/**
 * Creates the jwt session for the logged in user
 *
 * @param username - The username to encode into the session
 */
export const createSession = async (username: string): Promise<void> => {
    const session = sign(
        JSON.stringify({ username }),
        process.env.SESSION_SECRET ?? "yesyesyes",
        { expiresIn: ms("5hr") },
    );

    cookies().set(apiKeys.SESSION, session);
};
