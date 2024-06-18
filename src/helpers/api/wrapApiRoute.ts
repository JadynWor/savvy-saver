import { NextResponse } from "next/server";

import type { ApiError, ApiResponse } from "@/@types/api";
import type {
    ApiRouteHandlerReturn,
    NextApiRouteErrorHandler,
    NextApiRouteHandler,
} from "@/@types/api/next";
import { RedirectError } from "@/common/constants/errors/RedirectError";

import { convertApiErrorToResponse } from "./convertApiErrorToResponse";
import { convertErrorToApiError } from "./convertErrorToApiError";
import { getBaseUrl } from "./getBaseUrl";
import { isApiError } from "./isApiError";

type WrapResponseCallback<ResponseType> = NextApiRouteHandler<ResponseType>;

type WrapResponseErrorCallback<ErrorType> = NextApiRouteErrorHandler<ErrorType>;

/**
 * Wraps a server api route call in a try/catch to ensure no thrown client-side errors
 *
 * @param successCallback - The function to call within the try block, should be a no-arg callback
 * @param errorCallback - The callback to fire if an detected error in the api response
 * @returns The api error associated with the response or the api response from the backend
 */
export const wrapApiRoute = async <ResponseType>(
    successCallback: WrapResponseCallback<ResponseType>,
    errorCallback?: WrapResponseErrorCallback<ResponseType>,
): Promise<ApiRouteHandlerReturn<ResponseType>> => {
    try {
        const result = await successCallback();
        return result;
    } catch (error: unknown) {
        if (error instanceof RedirectError) {
            const redirectUrl = getBaseUrl();
            return NextResponse.redirect(`${redirectUrl}${error.redirectUrl}`, {
                status: 307,
            }) as unknown as NextResponse<ApiResponse<ResponseType>>;
        } else if (errorCallback !== undefined) {
            const errorResponse = await errorCallback(error);
            return errorResponse;
        } else if (isApiError(error)) {
            return NextResponse.json(
                convertApiErrorToResponse(error as ApiError),
            );
        }

        return NextResponse.json(
            convertApiErrorToResponse(convertErrorToApiError(error, 500)),
        );
    }
};
