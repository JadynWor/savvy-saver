import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

/**
 * A parsed cookie from the backend
 */
export type ParsedCookie = {
    /**
     * The name of the cookie
     */
    name: string;
    /**
     * The options of the cookie from the backend
     */
    options: Partial<ResponseCookie>;
    /**
     * The value of the cookie
     */
    value: string;
};
