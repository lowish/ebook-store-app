import { NextResponse } from "next/server";

import { ApiError, withErrorHandling } from "@/lib/api";
import { supabaseAnon } from "@/lib/supabase";

export async function POST(request: Request) {
  return withErrorHandling(async () => {
    const accessToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || null;
    const refreshToken = request.headers.get("x-refresh-token") || null;

    if (accessToken && refreshToken) {
      const { error: sessionError } = await supabaseAnon.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (sessionError) {
        throw new ApiError(401, "Session is invalid", sessionError.message);
      }

      const { error } = await supabaseAnon.auth.signOut();

      if (error) {
        throw new ApiError(500, "Logout failed", error.message);
      }
    }

    const response = NextResponse.json({ success: true, data: { loggedOut: true } });
    response.cookies.set("sb-access-token", "", { path: "/", maxAge: 0 });
    response.cookies.set("sb-refresh-token", "", { path: "/", maxAge: 0 });
    return response;
  });
}