import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

/**
 * Handles GET requests and verifies OTP using Supabase.
 * @param {Request} request - The incoming request.
 * @returns {Promise<NextResponse>} - The response.
 */
export async function GET(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type");
    const next = searchParams.get("next") ?? "/";

    const redirectTo = request.nextUrl.clone();
    redirectTo.pathname = next;
    redirectTo.searchParams.delete("token_hash");
    redirectTo.searchParams.delete("type");

    if (token_hash && type) {
        const supabase = createClient();

        const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type,
        });

        if (!error) {
            redirectTo.searchParams.delete("next");
            return NextResponse.redirect(redirectTo);
        }
    }

    // Return the user to an error page with some instructions
    redirectTo.pathname = "/error";
    return NextResponse.redirect(redirectTo);
}
