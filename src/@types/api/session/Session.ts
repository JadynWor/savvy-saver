/**
 * Represents the session from the jwt token
 */
export type Session = {
    /**
     * The signature (access token) of the jwt
     */
    accessToken: string;

    /**
     * The username of the logged in user
     */
    username: string;
};
