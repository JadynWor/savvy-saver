/* eslint-disable @typescript-eslint/indent -- disabled */
import { verify } from "jsonwebtoken";

import type { Session } from "@/@types/api";

/**
 * Decrypts the user session, providing the username and the jwt signature
 *
 * @param session - The session (raw jwt) from the cookie headers
 * @returns The decrypted session
 */
export const decryptSession = (session: string): Session => {
    const decryptedSession = verify(
        session,
        process.env.SESSION_SECRET ?? "yesyesyes",
        { complete: true },
    );

    const { header: _header, payload, signature } = decryptedSession;

    const castedPayload = JSON.parse(payload as string) as Pick<
        Session,
        "username"
    >;

    const convertedSession = {
        accessToken: signature,
        username: castedPayload.username,
    } as Session;

    return convertedSession;
};
