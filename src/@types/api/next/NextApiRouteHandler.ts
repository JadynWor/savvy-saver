/* eslint-disable @typescript-eslint/indent -- disabled */

import type { NextResponse } from "next/server";

import type { ApiResponse } from "../ApiResponse";

type NextApiRouteHandler<ResponseDataType> = () => Promise<
    NextResponse<ApiResponse<ResponseDataType>>
>;

type NextApiRouteErrorHandler<ResponseDataType> = (
    _error?: unknown,
) =>
    | NextResponse<ApiResponse<ResponseDataType>>
    | Promise<NextResponse<ApiResponse<ResponseDataType>>>;

type ApiRouteHandlerReturn<ResponseDataType> = NextResponse<
    ApiResponse<ResponseDataType>
>;

export type {
    ApiRouteHandlerReturn,
    NextApiRouteErrorHandler,
    NextApiRouteHandler,
};
