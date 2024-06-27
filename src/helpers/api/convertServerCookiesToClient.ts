/* eslint-disable security/detect-object-injection -- disabled */
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

import type { ParsedCookie } from "@/@types/api";
import { camelize } from "@/common/constants/regex/camelize";

/**
 *
 * @param cookies
 */
export const convertServerCookiesToClient = (
    cookies: string[],
): ParsedCookie[] => {
    const parsedCookies: ParsedCookie[] = [];
    if (cookies.length === 0) {
        return [];
    }

    for (const eachCookie of cookies) {
        const cookieKeys: { [key: string]: string } = eachCookie
            .split("; ")
            // eslint-disable-next-line unicorn/no-array-reduce -- disabled
            .reduce((previous, current) => {
                const [name, ...value] = current.split("=");
                (previous as { [key: string]: string })[name] = value.join("=");
                return previous;
            }, {});
        const [cookieName, ...options] = Object.keys(cookieKeys);
        const optionValues: Partial<ResponseCookie> = {};
        for (const eachOptionKey of options) {
            if (eachOptionKey === "HttpOnly") {
                optionValues.httpOnly = true;
            } else {
                (optionValues as { [key: string]: string })[
                    camelize(eachOptionKey)
                ] = cookieKeys[eachOptionKey];
            }
        }
        const parsedCookie: ParsedCookie = {
            name: cookieName,
            options: optionValues,
            value: cookieKeys[cookieName],
        };
        parsedCookies.push(parsedCookie);
    }
    return parsedCookies;
};
