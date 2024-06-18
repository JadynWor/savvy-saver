import type { ApiResponse } from "@/@types/api";

import { isApiError } from "./isApiError";

/**
 * Tests if the response is 1. an ApiResponse and 2. contains an ApiError
 *
 * @param entity - The entity to test if the response contains an api error
 */
export const isApiErrorInResponse = (entity: unknown): boolean => {
    const convertedEntity = entity as ApiResponse<unknown>;

    return (
        convertedEntity.error !== undefined && isApiError(convertedEntity.error)
    );
};
