/* eslint-disable import/group-exports -- d*/
"use server";

import type { ApiResponse } from "@/@types/api/ApiResponse";
import { ClientSideApi } from "@/common/api/ClientSideApi";
import { ClientEndpoints } from "@/common/constants/api/clientEndPoints";

/**
 * Registers a new user with the provided email and password.
 *
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns The API response indicating success or failure.
 */
export const register = async (email: string, password: string): Promise<ApiResponse<boolean>> => {
    // Create a FormData object to hold the email and password
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

/**
* Reponse post
*/
    const response = await ClientSideApi.post<ApiResponse<boolean>, FormData>(
        `${ClientEndpoints.AUTH.BASE}${ClientEndpoints.AUTH.REGISTER}`,
        formData,
        undefined,
        { formDataSent: true },
    );

    return response;
};

// Export the register function as POST for Next.js API route
export { register as POST };
