import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

/**
 * Combines request cookies from NextJS13 to send to the server
 *
 * @param cookies - The request cookies
 * @returns The string of the combined cookies
 */
export const combineRequestCookies = (cookies: RequestCookie[]): string =>
    cookies
        .map(
            (eachCookie: RequestCookie) =>
                `${eachCookie.name}=${eachCookie.value}`,
        )
        .join(";");
