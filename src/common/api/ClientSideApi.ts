/* eslint-disable @microsoft/sdl/no-insecure-url -- used for local development */
/* eslint-disable @typescript-eslint/no-extraneous-class -- disabled */
/* eslint-disable @typescript-eslint/indent -- disabled */

import { toast } from "react-toastify";

import type { NextFetchRequestConfig } from "@/@types/api";
import { corsHeaders } from "@/common/constants/api/corsHeaders";
import { RegexConstants } from "@/common/constants/regex/RegexConstants";
import { getApiErrorFromResponse } from "@/helpers/api/getApiErrorFromResponse";
import { getBaseUrl } from "@/helpers/api/getBaseUrl";
import { isApiErrorInResponse } from "@/helpers/api/isApiErrorInResponse";

/** Header for file in form data */
const FILE_HEADER = "content-disposition";

/** The include argument when we want to download the file (or mark it as an attachment) */
const FILE_HEADER_INCLUDE = "attachment";

/**
 * Configuration for client-side fetch calls
 */
type ClientSideApiConfig = {
    /**
     * Whether form data is being POST/PUT/PATCH/DELETE
     */
    formDataSent?: boolean;

    /**
     * Custom headers to add to the request
     */
    headers?: HeadersInit;

    /**
     * Whether to expect a redirect (301/302, etc) in the response
     */
    isRedirect?: boolean;

    /**
     * The nextJS pre-provided configuration
     */
    nextConfig?: {
        /**
         * Whether to auto revalidate (refetch) the call
         */
        autoRevalidate?: boolean;

        /**
         * Whether to revalidate on success (non 400+ response)
         */
        revalidateOnSuccess?: boolean;
    } & NextFetchRequestConfig;
};

/**
 * All client-side requests go through this interface, which interacts with the serverless api under the `api` directory
 */
export class ClientSideApi {
    /**
     * The base url of this class, used to construct the endpoints efficiently
     */
    public static BASE_URL: string | undefined = getBaseUrl();

    /**
     * Constructs the base url using the environment base url + api/ on the end
     */
    public constructor() {
        ClientSideApi.BASE_URL = `${process.env.NODE_ENV === "production" ? "https://" : "http://"}${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/`;
    }

    /**
     * Sends a delete request to the serverless api located under the `api` directory
     *
     * @typeParam ResponseType - The response the client is receiving
     * @typeParam BodyType - The body the user is sending in the request
     * @param endpoint - The endpoint the user is calling
     * @param body - The body of the request
     * @param queryParameters - The query parameters appended to the end of the url
     * @returns The response from the server
     */
    public static async delete<
        ResponseType = unknown,
        BodyType = { [key: string]: number | string | undefined } | FormData,
    >(
        endpoint: string,
        body?: BodyType,
        queryParameters?: {
            [key: string]: boolean | number | string | undefined;
        },
        config?: ClientSideApiConfig,
    ): Promise<ResponseType> {
        const formDataSent = config?.formDataSent ?? false;
        const queryString = queryParameters
            ? `?${Object.entries(queryParameters)
                  .filter((eachEntry) => eachEntry[1] !== undefined)
                  .map((eachEntry) => `${eachEntry[0]}=${eachEntry[1]}`)
                  .join("&")}`
            : "";

        const url = `${this.BASE_URL}${endpoint}${queryString}`;
        const formattedUrl = url.replace(RegexConstants.TRAILING_SLASH, "");
        const requestBody = formDataSent
            ? (body as FormData)
            : JSON.stringify(body ?? {});

        const headers: RequestInit = {
            body: requestBody,
            credentials: "include",
            headers: config?.headers ?? {},
            method: "DELETE",
            mode: "cors",
            next: { ...config?.nextConfig },
        };

        const deleteRequestResult = await fetch(formattedUrl, headers);

        if (
            config !== undefined &&
            (config.isRedirect ?? deleteRequestResult.status === 307)
        ) {
            return {} as ResponseType;
        }

        const isFile =
            deleteRequestResult.headers
                .get(FILE_HEADER)
                ?.includes(FILE_HEADER_INCLUDE) ?? false;

        const parsedDeleteRequest = isFile
            ? await deleteRequestResult.blob()
            : await deleteRequestResult.json();

        if (!isFile && isApiErrorInResponse(parsedDeleteRequest)) {
            const error = getApiErrorFromResponse(parsedDeleteRequest);
            toast.error(error.message);
        }

        return parsedDeleteRequest as ResponseType;
    }

    /**
     * Sends a get request to the serverless api to then send the request to the server
     *
     * @typeParam ResponseType - The response the client is receiving
     * @param endpoint - The endpoint the user is calling
     * @param queryParameters - The query parameters appended to the end of the url
     * @returns A promise of the return type specified in the call
     */
    public static async get<ResponseType = unknown>(
        endpoint: string,
        queryParameters?: {
            [key: string]: boolean | number | string | undefined;
        },
        config?: ClientSideApiConfig,
    ): Promise<ResponseType> {
        const queryString = queryParameters
            ? `?${Object.entries(queryParameters)
                  .filter((eachEntry) => eachEntry[1] !== undefined)
                  .map((eachEntry) => `${eachEntry[0]}=${eachEntry[1]}`)
                  .join("&")}`
            : "";

        const url = `${this.BASE_URL}${endpoint}${queryString}`;
        const formattedUrl = url.replace(RegexConstants.TRAILING_SLASH, "");

        const getRequestResult = await fetch(formattedUrl, {
            credentials: "include",
            headers: config?.headers ?? { ...corsHeaders },
            method: "GET",
            mode: "cors",
            next: { ...config?.nextConfig },
        });

        if (
            config !== undefined &&
            (config.isRedirect ?? getRequestResult.status === 307)
        ) {
            return {} as ResponseType;
        }

        const isFile =
            getRequestResult.headers
                .get(FILE_HEADER)
                ?.includes(FILE_HEADER_INCLUDE) ?? false;

        const parsedResult = isFile
            ? await getRequestResult.blob()
            : await getRequestResult.json();

        if (!isFile && isApiErrorInResponse(parsedResult)) {
            const error = getApiErrorFromResponse(parsedResult);
            toast.error(error.message);
        }

        return parsedResult as ResponseType;
    }

    /**
     * Sends a post request to the serverless api to then send the request to the server
     *
     * @typeParam ResponseType - The response the client is receiving
     * @typeParam BodyType - The body the user is sending in the request
     * @param endpoint - The endpoint the user is calling
     * @param body - The body of the request required (expected) in post requests
     * @param queryParameters - The query parameters which the user wants to append onto the url
     * @returns The response from the server
     */
    public static async post<
        ResponseType = unknown,
        BodyType = { [key: string]: number | string | undefined } | FormData,
    >(
        endpoint: string,
        body?: BodyType,
        queryParameters?: {
            [key: string]: boolean | number | string | undefined;
        },
        config?: ClientSideApiConfig,
    ): Promise<ResponseType> {
        const formDataSent = config?.formDataSent ?? false;
        const queryString = queryParameters
            ? `?${Object.entries(queryParameters)
                  .filter((eachEntry) => eachEntry[1] !== undefined)
                  .map((eachEntry) => `${eachEntry[0]}=${eachEntry[1]}`)
                  .join("&")}`
            : "";

        const url = `${this.BASE_URL}${endpoint}${queryString}`;
        const formattedUrl = url.replace(RegexConstants.TRAILING_SLASH, "");

        const postRequestResult = await fetch(formattedUrl, {
            body: formDataSent
                ? (body as FormData)
                : JSON.stringify(body ?? {}),
            credentials: "include",
            headers: config?.headers ?? {},
            method: "POST",
            mode: "cors",
            next: { ...config?.nextConfig },
        });

        if (
            config !== undefined &&
            (config.isRedirect ?? postRequestResult.status === 307)
        ) {
            return {} as ResponseType;
        }

        const isFile =
            postRequestResult.headers
                .get(FILE_HEADER)
                ?.includes(FILE_HEADER_INCLUDE) ?? false;

        const parsedPostRequest = isFile
            ? await postRequestResult.blob()
            : await postRequestResult.json();

        if (!isFile && isApiErrorInResponse(parsedPostRequest)) {
            const error = getApiErrorFromResponse(parsedPostRequest);
            toast.error(error.message);
        }

        return parsedPostRequest as ResponseType;
    }

    /**
     * Sends a put request to the serverless api located under the `api` directory
     *
     * @typeParam ResponseType - The response the client is receiving
     * @typeParam BodyType - The body the user is sending in the request
     * @param endpoint - The endpoint the user is calling
     * @param body - The body of the request required with put requests
     * @param queryParameters - The query parameters appended to the end of the url
     * @returns The response from the server
     */
    public static async put<
        ResponseType = unknown,
        BodyType = { [key: string]: number | string | undefined } | FormData,
    >(
        endpoint: string,
        body?: BodyType,
        queryParameters?: {
            [key: string]: boolean | number | string | undefined;
        },
        config?: ClientSideApiConfig,
    ): Promise<ResponseType> {
        const formDataSent = config?.formDataSent ?? false;
        const queryString = queryParameters
            ? `?${Object.entries(queryParameters)
                  .filter((eachEntry) => eachEntry[1] !== undefined)
                  .map((eachEntry) => `${eachEntry[0]}=${eachEntry[1]}`)
                  .join("&")}`
            : "";

        const url = `${this.BASE_URL}${endpoint}${queryString}`;
        const formattedUrl = url.replace(RegexConstants.TRAILING_SLASH, "");

        const putRequestResult = await fetch(formattedUrl, {
            body: formDataSent
                ? (body as FormData)
                : JSON.stringify(body ?? {}),
            credentials: "include",
            headers: config?.headers ?? {},
            method: "PUT",
            mode: "cors",
            next: { ...config?.nextConfig },
        });

        if (
            config !== undefined &&
            (config.isRedirect ?? putRequestResult.status === 307)
        ) {
            return {} as ResponseType;
        }

        const isFile =
            putRequestResult.headers
                .get(FILE_HEADER)
                ?.includes(FILE_HEADER_INCLUDE) ?? false;

        const parsedPutRequest = isFile
            ? await putRequestResult.blob()
            : await putRequestResult.json();

        if (!isFile && isApiErrorInResponse(parsedPutRequest)) {
            const error = getApiErrorFromResponse(parsedPutRequest);
            toast.error(error.message);
        }

        return parsedPutRequest as ResponseType;
    }
}
