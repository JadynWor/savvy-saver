/* eslint-disable import/no-nodejs-modules -- disabled */
"use server";

import { pbkdf2Sync, randomBytes, randomInt } from "node:crypto";

/**
 * Encrypts the user password using pbkdf2 (password based key derivation function 2) algorithm
 *
 * @param username - The username of the user
 * @param password - The password of the user
 * @returns The encrypted password
 */
export const encryptPassword = (username: string, password: string): string => {
    const salt = randomBytes(20).toString("hex");
    const iterationCount = randomInt(10_000, 100_000);

    const encrypted = pbkdf2Sync(
        `${username}:${password}`,
        salt,
        iterationCount,
        256,
        username,
    );

    const encryptedPassword = encrypted.toString("hex");

    return encryptedPassword;
};
