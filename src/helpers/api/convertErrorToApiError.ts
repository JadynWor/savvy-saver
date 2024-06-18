import type { ApiError } from "@/@types/api";

/**
 * Converts an error to an ApiError
 *
 * @param error - The error to convert
 */
export const convertErrorToApiError = (
    error: unknown,
    statusCode = 500,
): ApiError => {
    const convertedError = error as Error;

    try {
        /** DO NOT LEAK STACK TO USER */
        return {
            error: "An exception occurred",
            message: convertedError.message,
            name: convertedError.name,
            statusCode,
        };
    } catch {
        /** Ultimate safety net, hard-coded values, so api never fails */
        return {
            error: "Failed to convert Error to ApiError",
            message: "Error --> ApiError failure",
            name: "ConversionError",
            statusCode: 500,
        };
    }
};
