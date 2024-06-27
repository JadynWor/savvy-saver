import type { ApiError } from "@/@types/api";

/**
 * Determines if the entity passed in is an ApiError
 *
 * @param entity - The entity to determine similarity to ApiError
 *
 * @returns Is `entity` an ApiError
 */
export const isApiError = (entity: unknown): boolean => {
    const convertedEntity = entity as ApiError;

    const errorValid =
        convertedEntity?.error !== undefined &&
        convertedEntity.error.length > 0;
    const messageValid =
        convertedEntity?.message !== undefined &&
        convertedEntity.message.length > 0;
    const statusCodeValid =
        convertedEntity?.statusCode !== undefined &&
        convertedEntity.statusCode !== 0;

    return errorValid && messageValid && statusCodeValid;
};
