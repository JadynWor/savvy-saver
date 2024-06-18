"use server";
/* eslint-disable require-await -- disabled */
/* eslint-disable @typescript-eslint/require-await -- disabled */
/* eslint-disable security/detect-object-injection -- disabled */
/* eslint-disable no-confusing-arrow -- disabled */
/* eslint-disable @typescript-eslint/indent -- disabled */

import ms from "ms";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import phin from "phin";

import { combineRequestCookies } from "@/helpers/api/combineRequestCookies";
import { convertServerCookiesToClient } from "@/helpers/api/convertServerCookiesToClient";
import { getSession } from "@/helpers/api/session/getSession";

/**
 * Represents the modified headers that the user passes when making server requests
 */
type ModifiedHeaders = {
    /**
     * The content datatype the client accepts (in response)
     */
    Accept?: string;

    /**
     * The basic auth header key
     */
    Authorization?: string;

    /**
     * The cookie header key
     */
    Cookie?: string;
};

/**
 * The configuration for sending server-side requests
 */
type ServerSideApiConfig = {
    /**
     * Override the base url
     */
    baseUrl?: string;

    /**
     * Adds the `Basic {auth}` header to the request for specific requests that need it
     */
    basicAuth?: boolean;

    /**
     * Whether form data is in POST/PUT/PATCH/DELETE request
     */
    formDataSent?: boolean;

    /**
     * Custom headers appended to the request
     */
    headers?: HeadersInit;

    /**
     * Whether to parse the body as JSON (incase the response is not JSON parse-able, aka form data)
     */
    parseBody?: boolean;

    /**
     * Whether to pass the session token in the query string
     */
    passSessionTokenInQuery?: boolean;
};

/**
 * The default configuration for server-side calls, customization is optional
 */
const DEFAULT_CONFIG: ServerSideApiConfig = {
    formDataSent: false,
    headers: {
        "Content-Type": "application/json",
    },
    parseBody: true,
    passSessionTokenInQuery: false,
};

/**
 * The set-cookie header
 */
const SET_COOKIE = "set-cookie";

/**
 * The headers for including credentials (cookies) in request
 */
const includeCredentials = {
    "Access-Control-Allow-Credentials": true,
};

/**
 * The headers for cors compliance (must be fine-tuned when sent to prod)
 */
const corsHeaders = {
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PUT, DELETE",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Max-Age": 2_592_000,
};

/**
 * Retrieves the base url of the api dependent on the process node env
 *
 * @returns The base url of the service api
 */
const getBaseUrl = (): string =>
    process.env.NODE_ENV === "production"
        ? process.env.PROD_API_URL ?? ""
        : process.env.DEV_API_URL ?? "";

/**
 * Generates a server url sent through the `phin` client
 *
 * @param endpoint - The endpoint to create for the url
 * @param queryParameters - The query parameters passed into the url
 * @returns The url that the server would fetch from
 */
const generateServerUrl = async (
    endpoint: string,
    queryParameters?: { [key: string]: number | string },
): Promise<string> => {
    const queryString = queryParameters
        ? `?${Object.entries(queryParameters)
              .filter((eachEntry) => eachEntry[1] !== undefined)
              .map((eachEntry) => `${eachEntry[0]}=${eachEntry[1]}`)
              .join("&")}`
        : "";

    return `${getBaseUrl()}${endpoint}${queryString}`;
};

/**
 * Generates the basic auth token from the environment variables
 *
 * @returns The authentication token to send in the basic auth request
 */
const generateBasicAuthValue = (): string => {
    const username = process.env.BASIC_AUTH_USERNAME ?? "";
    const password = process.env.BASIC_AUTH_PASSWORD ?? "";

    const authValue = Buffer.from(`${username}:${password}`).toString("base64");

    return authValue;
};

/**
 * GET request to the server
 *
 * @param endpoint - The endpoint we are sending the request to
 * @param queryParameters - The query parameters supplied to the request
 * @param _nextApiResponse - The response we are going to return to the client
 * @returns - The parsed get response as the type specified in the T argument
 */
const serverGet = async <ResponseType>(
    endpoint: string,
    queryParameters?: { [key: string]: number | string },
    _nextApiResponse?: NextResponse<ResponseType>,
    config: ServerSideApiConfig = DEFAULT_CONFIG,
): Promise<ResponseType> => {
    /**
     * The headers that the user modifies
     */
    const modifiedHeaders: ModifiedHeaders = {
        Cookie: combineRequestCookies(cookies().getAll()),
    };

    /**
     * The user-modified config (retains the default options as well)
     */
    const modifiedConfig = { ...DEFAULT_CONFIG, ...config };

    /**
     * The query string construction ?<key1>=<value1>&<key2>=<value2>...
     */
    let queryString = queryParameters
        ? `?${Object.entries(queryParameters)
              .filter((eachEntry) => eachEntry[1] !== undefined)
              .map((eachEntry) => `${eachEntry[0]}=${eachEntry[1]}`)
              .join("&")}`
        : "";

    /**
     * If the user wants to pass in the session token via query string, with key `token`
     */
    if (modifiedConfig.passSessionTokenInQuery) {
        const parsedCookie = getSession();
        if (parsedCookie !== undefined) {
            queryString += `${queryString.length === 0 ? "?" : ""}&token=${parsedCookie.accessToken}`;
        }
    }

    /**
     * If the user wants to use basic auth flow
     */
    if (modifiedConfig.basicAuth) {
        modifiedHeaders.Authorization = `Basic ${generateBasicAuthValue()}`;
    }

    /**
     * The constructed base url (the basic url without all the extra paths on the end)
     * Ex: www.google.com/
     */
    const baseUrl = modifiedConfig.baseUrl ?? getBaseUrl();

    /**
     * The custom url (see the template string, baseUrl + endpoint + queryString)
     */
    const url = `${baseUrl}${endpoint}${queryString}`;

    /**
     * The constructed headers, goes in order of least important to important, left->right, each variable overrides all the ones to it's left
     *
     * modifiedHeaders --> includeCredentials --> corsHeaders --> config.headers
     */
    const headers = {
        ...modifiedHeaders,
        ...includeCredentials,
        ...corsHeaders,
        ...modifiedConfig.headers,
    };

    /**
     * Sends the GET request, with custom headers, and custom url
     */
    const phinResult = await phin({
        headers,
        method: "GET",
        url,
    });

    /**
     * Parses the body from the configuration (basically if we receive a stream or not JSON, do not always execute JSON.parse on the response)
     */
    const { parseBody } = modifiedConfig;

    /**
     * If we want to parse the body (defaults to true) we json.parse it, otherwise, return the raw body
     */
    const parsedGetRequest = parseBody
        ? JSON.parse(phinResult.body.toString())
        : phinResult.body;

    return parsedGetRequest as ResponseType;
};

/**
 * POST request to the server
 *
 * @param endpoint - The endpoint we are sending the POST request to
 * @param body - The body of the request, aka the data we are sending alongside the POST request represented as the typearg T in the method
 * @param queryParameters - The query parameters we are appending onto the endpoint
 * @param _nextApiResponse - The response used to give feedback to the user whether the request was successful
 * @returns The response from the server detailed by typearg T
 */
const serverPost = async <
    ResponseType,
    BodyType = { [key: string]: boolean | number | string } | FormData,
>(
    endpoint: string,
    body: BodyType,
    queryParameters?: { [key: string]: number | string },
    _nextApiResponse?: NextResponse<ResponseType>,
    config: ServerSideApiConfig = DEFAULT_CONFIG,
): Promise<ResponseType> => {
    /**
     * The user-modified config (retains the default options as well)
     */
    const modifiedConfig = { ...DEFAULT_CONFIG, ...config };

    /**
     * Whether the user is sending form data to the server (files, etc)
     */
    const formDataSent = modifiedConfig.formDataSent ?? false;

    /**
     * The headers that the user modifies
     */
    const modifiedHeaders: ModifiedHeaders = {
        Accept: "application/json",
        Cookie: combineRequestCookies(cookies().getAll()),
    };

    /**
     * The query string construction ?<key1>=<value1>&<key2>=<value2>...
     */
    let queryString = queryParameters
        ? `?${Object.entries(queryParameters)
              .filter((eachEntry) => eachEntry[1] !== undefined)
              .map((eachEntry) => `${eachEntry[0]}=${eachEntry[1]}`)
              .join("&")}`
        : "";

    /**
     * If the user wants to pass in the session token via query string, with key `token`
     */
    if (modifiedConfig.passSessionTokenInQuery) {
        const parsedCookie = getSession();
        if (parsedCookie !== undefined) {
            queryString += `${queryString.length === 0 ? "?" : ""}&token=${parsedCookie.accessToken}`;
        }
    }

    /**
     * If the user wants to use basic auth flow
     */
    if (modifiedConfig.basicAuth) {
        modifiedHeaders.Authorization = `Basic ${generateBasicAuthValue()}`;
    }

    /**
     * The constructed base url (the basic url without all the extra paths on the end)
     * Ex: www.google.com/
     */
    const baseUrl = modifiedConfig.baseUrl ?? getBaseUrl();

    /**
     * The custom url (see the template string, baseUrl + endpoint + queryString)
     */
    const url = `${baseUrl}${endpoint}${queryString}`;

    /**
     * The constructed headers, goes in order of least important to important, left->right, each variable overrides all the ones to it's left
     *
     * modifiedHeaders --> includeCredentials --> corsHeaders --> config.headers
     */
    const headers = {
        ...modifiedHeaders,
        ...includeCredentials,
        ...corsHeaders,
        ...modifiedConfig.headers,
    };

    /**
     * If we send form data, typecast the body as FormData, otherwise, JSON stringify the body
     */
    const data = formDataSent ? (body as FormData) : JSON.stringify(body ?? {});

    /**
     * Sends the POST request, with custom headers, custom url, and configured data
     */
    const phinResult = await phin({
        data,
        headers,
        method: "POST",
        url,
    });

    /**
     * Gets the `Set-Cookie` header from the response (the cookies the server wants to set in the client)
     */
    const responseSetCookies = phinResult.headers[SET_COOKIE];

    /**
     * Parses the server cookies (converts them into values, and all metadata associated)
     */
    const parsedCookies = convertServerCookiesToClient(
        responseSetCookies ?? [],
    );

    /**
     * For each cookie from the parsed server cookies:
     *  - Parse the date the cookie expires
     *  - Set the cookie in the client with the provided metadata
     */
    for (const eachParsedCookie of parsedCookies) {
        const formattedExpiry = new Date(
            eachParsedCookie.options.expires ?? Date.now() + ms("12h"),
        );
        cookies().set(eachParsedCookie.name, eachParsedCookie.value, {
            ...eachParsedCookie.options,
            expires: formattedExpiry,
        });
    }

    /**
     * Whether to parse the body using json.parse or not
     */
    const { parseBody } = modifiedConfig;

    /**
     * Parse the server response using json.parse or the raw body
     */
    const parsedPostRequest = parseBody
        ? JSON.parse(phinResult.body.toString())
        : phinResult.body;

    return parsedPostRequest as ResponseType;
};

/**
 * DELETE request to the api
 *
 * @param endpoint - The endpoint we are sending the request to
 * @param queryParameters - The query parameter we are appending to the endpoint
 * @param _nextApiResponse - The api response we are utilizing to send a response back to the client
 * @returns The converted response detailed by typearg T
 */
const serverDelete = async <
    ResponseType,
    BodyType = { [key: string]: boolean | number | string } | FormData,
>(
    endpoint: string,
    body: BodyType,
    queryParameters?: { [key: string]: number | string },
    _nextApiResponse?: NextResponse<ResponseType>,
    config: ServerSideApiConfig = DEFAULT_CONFIG,
): Promise<ResponseType> => {
    /**
     * The user-modified config (retains the default options as well)
     */
    const modifiedConfig = { ...DEFAULT_CONFIG, ...config };

    /**
     * Whether the user is sending form data to the server (files, etc)
     */
    const formDataSent = modifiedConfig.formDataSent ?? false;

    /**
     * The headers that the user modifies
     */
    const modifiedHeaders: ModifiedHeaders = {
        Cookie: combineRequestCookies(cookies().getAll()),
    };

    /**
     * The query string construction ?<key1>=<value1>&<key2>=<value2>...
     */
    let queryString = queryParameters
        ? `?${Object.entries(queryParameters)
              .filter((eachEntry) => eachEntry[1] !== undefined)
              .map((eachEntry) => `${eachEntry[0]}=${eachEntry[1]}`)
              .join("&")}`
        : "";

    /**
     * If the user wants to pass in the session token via query string, with key `token`
     */
    if (modifiedConfig.passSessionTokenInQuery) {
        const parsedCookie = getSession();
        if (parsedCookie !== undefined) {
            queryString += `${queryString.length === 0 ? "?" : ""}&token=${parsedCookie.accessToken}`;
        }
    }

    /**
     * If the user wants to use basic auth flow
     */
    if (modifiedConfig.basicAuth) {
        modifiedHeaders.Authorization = `Basic ${generateBasicAuthValue()}`;
    }

    /**
     * The constructed base url (the basic url without all the extra paths on the end)
     * Ex: www.google.com/
     */
    const baseUrl = modifiedConfig.baseUrl ?? getBaseUrl();

    /**
     * The custom url (see the template string, baseUrl + endpoint + queryString)
     */
    const url = `${baseUrl}${endpoint}${queryString}`;

    /**
     * The constructed headers, goes in order of least important to important, left->right, each variable overrides all the ones to it's left
     *
     * modifiedHeaders --> includeCredentials --> corsHeaders --> config.headers
     */
    const headers = {
        ...modifiedHeaders,
        ...includeCredentials,
        ...corsHeaders,
        ...modifiedConfig.headers,
    };

    /**
     * If we send form data, typecast the body as FormData, otherwise, JSON stringify the body
     */
    const data = formDataSent ? (body as FormData) : JSON.stringify(body ?? {});

    /**
     * Sends the DELETE request with custom headers, custom url, and configured data
     */
    const phinResult = await phin({
        data,
        headers,
        method: "DELETE",
        url,
    });

    /**
     * Gets the `Set-Cookie` header from the response (the cookies the server wants to set in the client)
     */
    const responseSetCookies = phinResult.headers[SET_COOKIE];

    /**
     * Parses the server cookies (converts them into values, and all metadata associated)
     */
    const parsedCookies = convertServerCookiesToClient(
        responseSetCookies ?? [],
    );

    /**
     * For each cookie from the parsed server cookies:
     *  - Parse the date the cookie expires
     *  - Set the cookie in the client with the provided metadata
     */
    for (const eachParsedCookie of parsedCookies) {
        cookies().set(
            eachParsedCookie.name,
            eachParsedCookie.value,
            eachParsedCookie.options,
        );
    }

    /**
     * Whether to parse the body using json.parse or not
     */
    const { parseBody } = modifiedConfig;

    /**
     * Parse the server response using json.parse or the raw body
     */
    const parsedDeleteRequest = parseBody
        ? JSON.parse(phinResult.body.toString())
        : phinResult.body;

    return parsedDeleteRequest as ResponseType;
};

/**
 * PUT request to the api
 *
 * @param endpoint - The endpoint we are sending the request to
 * @param body - The body of the request we are sending to the server detailed by typearg K in the method
 * @param queryParameters - The query parameters we are adding to the request
 * @param headers - The headers we are appending onto the request
 * @param _nextApiResponse - The response, which allows us to send a response back to the client
 * @returns The converted response data into the typearg T specified
 */
const serverPut = async <
    ResponseType,
    BodyType = { [key: string]: number | string } | FormData,
>(
    endpoint: string,
    body?: BodyType,
    queryParameters?: { [key: string]: number | string },
    _nextApiResponse?: NextResponse<ResponseType>,
    config: ServerSideApiConfig = DEFAULT_CONFIG,
): Promise<ResponseType> => {
    /**
     * The user-modified config (retains the default options as well)
     */
    const modifiedConfig = { ...DEFAULT_CONFIG, ...config };

    /**
     * Whether the user is sending form data to the server (files, etc)
     */
    const formDataSent = modifiedConfig.formDataSent ?? false;

    /**
     * The headers that the user modifies
     */
    const modifiedHeaders: ModifiedHeaders = {
        Cookie: combineRequestCookies(cookies().getAll()),
    };

    /**
     * The query string construction ?<key1>=<value1>&<key2>=<value2>...
     */
    let queryString = queryParameters
        ? `?${Object.entries(queryParameters)
              .filter((eachEntry) => eachEntry[1] !== undefined)
              .map((eachEntry) => `${eachEntry[0]}=${eachEntry[1]}`)
              .join("&")}`
        : "";

    /**
     * If the user wants to pass in the session token via query string, with key `token`
     */
    if (modifiedConfig.passSessionTokenInQuery) {
        const parsedCookie = getSession();
        if (parsedCookie !== undefined) {
            queryString += `${queryString.length === 0 ? "?" : ""}&token=${parsedCookie.accessToken}`;
        }
    }

    /**
     * If the user wants to use basic auth flow
     */
    if (modifiedConfig.basicAuth) {
        modifiedHeaders.Authorization = `Basic ${generateBasicAuthValue()}`;
    }

    /**
     * The constructed base url (the basic url without all the extra paths on the end)
     * Ex: www.google.com/
     */
    const baseUrl = modifiedConfig.baseUrl ?? getBaseUrl();

    /**
     * The custom url (see the template string, baseUrl + endpoint + queryString)
     */
    const url = `${baseUrl}${endpoint}${queryString}`;

    /**
     * The constructed headers, goes in order of least important to important, left->right, each variable overrides all the ones to it's left
     *
     * modifiedHeaders --> includeCredentials --> corsHeaders --> config.headers
     */
    const headers = {
        ...modifiedHeaders,
        ...includeCredentials,
        ...corsHeaders,
        ...modifiedConfig.headers,
    };

    /**
     * If we send form data, typecast the body as FormData, otherwise, JSON stringify the body
     */
    const data = formDataSent ? (body as FormData) : JSON.stringify(body ?? {});

    /**
     * Sends the PUT request with custom headers, custom url, and configured data
     */
    const phinResult = await phin({
        data,
        headers,
        method: "PUT",
        url,
    });

    /**
     * Gets the `Set-Cookie` header from the response (the cookies the server wants to set in the client)
     */
    const responseSetCookies = phinResult.headers[SET_COOKIE];

    /**
     * Parses the server cookies (converts them into values, and all metadata associated)
     */
    const parsedCookies = convertServerCookiesToClient(
        responseSetCookies ?? [],
    );

    /**
     * For each cookie from the parsed server cookies:
     *  - Parse the date the cookie expires
     *  - Set the cookie in the client with the provided metadata
     */
    for (const eachParsedCookie of parsedCookies) {
        cookies().set(
            eachParsedCookie.name,
            eachParsedCookie.value,
            eachParsedCookie.options,
        );
    }

    /**
     * Whether to parse the body using json.parse or not
     */
    const { parseBody } = modifiedConfig;

    /**
     * Parse the server response using json.parse or the raw body
     */
    const parsedPutRequest = parseBody
        ? JSON.parse(phinResult.body.toString())
        : phinResult.body;

    return parsedPutRequest as ResponseType;
};

export { generateServerUrl, serverDelete, serverGet, serverPost, serverPut };
