/**
 * Custom Error for signaling redirection, use case for wrapApiRoute calls
 */
export class RedirectError extends Error {
    /**
     * Constructs the custom RedirectError error
     *
     * @param message - The message to populate the super constructor
     * @param redirectUrl - The redirect url to redirect the user to (populates the headers with a 307)
     */
    public constructor(
        message: string,
        public redirectUrl: string,
    ) {
        super(message);
        this.name = "RedirectError";
        this.redirectUrl = redirectUrl;
    }
}
