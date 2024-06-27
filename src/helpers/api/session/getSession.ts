"use server";

import { cookies } from "next/headers";

import type { Session } from "@/@types/api";
import { apiKeys } from "@/common/constants/api/apiKeys";

import { decryptSession } from "./decryptSession";

/**
 * Fetches the user session
 */
export const getSession = (): Session => {
    const sessionCookie = cookies().get(apiKeys.SESSION);

    if (sessionCookie === undefined) {
        throw new Error("Cannot find session");
    }

    const decryptedSession = decryptSession(sessionCookie.value);

    console.log(decryptedSession);

    return decryptedSession;
};
