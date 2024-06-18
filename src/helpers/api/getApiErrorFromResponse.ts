import type { ApiError, ApiResponse } from "@/@types/api";

/**
 * Tests if the response is 1. an ApiResponse and 2. contains an ApiError
 *
 * @param entity - The entity to test if the response contains an api error
 */
export const getApiErrorFromResponse = (entity: unknown): ApiError => {
    const convertedEntity = entity as ApiResponse<unknown>;

    return convertedEntity.error as unknown as ApiError;
};
