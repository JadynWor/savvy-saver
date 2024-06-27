/* eslint-disable @typescript-eslint/indent -- disabled */
/* eslint-disable require-await -- disabled */
"use server";
import { type NextRequest, NextResponse } from "next/server";

import prisma from "@/@lib/prismaClient";
import type { ApiResponse } from "@/@types/api";
import type { Login } from "@/@types/dto";
import { encryptPassword } from "@/helpers/api/auth/login/encryptPassword";
import { createSession } from "@/helpers/api/session/createSession";
import { wrapApiRoute } from "@/helpers/api/wrapApiRoute";

/**
 * Logs the user into the application
 *
 * @param request - The client-side request
 * @returns 301 if the user logs, otherwise 400 (bad request)
 */
const login = async (
    request: NextRequest,
): Promise<NextResponse<ApiResponse<boolean>>> =>
    wrapApiRoute(async () => {
        const jsonPayload = await request.json();
        const convertedPayload = jsonPayload as Login;

        const { password, username } = convertedPayload;

        if (username === undefined || password === undefined) {
            return NextResponse.json({ data: false }, { status: 400 });
        }

        const encryptedPassword = encryptPassword(username, password);

        const foundUser = await prisma.savvyuser.findFirst({
            where: { password: encryptedPassword, username },
        });

        if (foundUser === null) {
            return NextResponse.json({ data: false }, { status: 400 });
        }

        await createSession(username);

        return NextResponse.redirect("/dashboard") as NextResponse<
            ApiResponse<boolean>
        >;
    });

export { login as POST };
