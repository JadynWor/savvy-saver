/* eslint-disable @typescript-eslint/no-explicit-any -- disabled */

import type { ApiError } from "./ApiError";

/**
 * Represents an standardized response from the server, allowing for consistency across the codebase
 */
export type ApiResponse<DataType = any> = {
    /**
     * The data in the response (contains information sent from the server)
     */
    data?: DataType;

    /**
     * The error associated with the request, if one
     */
    error?: ApiError;

    /**
     * The status of the response (from the server)
     */
    statusCode?: number;
};
