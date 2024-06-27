import type { ApiError, ApiResponse } from "@/@types/api";

/**
 * Converts an ApiError into a full ApiResponse
 *
 * @param error - The api error we are injecting into the response
 * @param partialResponse - The partial response, if one, to fill the rest of the response
 * @returns The api response
 */
export const convertApiErrorToResponse = (
    error: ApiError,
    partialResponse?: ApiResponse,
): ApiResponse => ({
    ...partialResponse,
    error,
});
