/* eslint-disable no-confusing-arrow -- disabled */

/**
 * Takes in a string, and converts it to camel case
 *
 * @param astr - The string to convert to camel case
 * @returns The camel cased string
 */
export const camelize = (astr: string): string =>
    astr
        .replaceAll(/^\w|[A-Z]|\b\w/gu, (word, index) =>
            index === 0 ? word.toLowerCase() : word.toUpperCase(),
        )
        .replaceAll(/\s+/gu, "");
