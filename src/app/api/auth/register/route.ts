import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/@lib/prismaClient";
import type { ApiResponse } from "@/@types/api/ApiResponse";
/**
 * Handles user registration.
 *
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse<ApiResponse<boolean>>} res - The API response object.
 * @returns {Promise<void>} - The promise to send the response.
 */
export default async function register(request: NextApiRequest, res: NextApiResponse<ApiResponse<boolean>>): 
Promise<void> {
    if (request.method !== "POST") {
        res.status(405).json({
            message: "Method not allowed",
            success: false,
        });
        return;
    }

    const { email, password } = request.body;

    if (!email || !password) {
        res.status(400).json({
            message: "Email and password are required",
            success: false,
        });
        return;
    }

    try {
        // Check to see if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            res.status(409).json({
                message: "Email already exists",
                success: false,
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({
            message: "User registered",
            success: true,
        });
    } catch (error) {
        console.error("Error making user:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}
