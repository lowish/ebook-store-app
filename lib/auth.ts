import type { User } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { ApiError } from "@/lib/api";
import { supabaseAnon } from "@/lib/supabase";

function getBearerToken(request: NextRequest) {
  const authorization = request.headers.get("authorization") ?? "";

  if (!authorization.toLowerCase().startsWith("bearer ")) {
    return null;
  }

  const token = authorization.slice(7).trim();
  return token.length > 0 ? token : null;
}

export function getAccessTokenFromRequest(request: NextRequest) {
  const tokenFromHeader = getBearerToken(request);

  if (tokenFromHeader) {
    return tokenFromHeader;
  }

  const tokenFromCookie = request.cookies.get("sb-access-token")?.value;
  return tokenFromCookie ?? null;
}

export async function getCurrentUser(request: NextRequest): Promise<User> {
  const token = getAccessTokenFromRequest(request);

  if (!token) {
    throw new ApiError(401, "Authentication required");
  }

  const { data, error } = await supabaseAnon.auth.getUser(token);

  if (error || !data.user) {
    throw new ApiError(401, "Invalid or expired authentication token");
  }

  return data.user;
}

// Clerk Authentication Utilities
/**
 * Get the current authenticated user's ID from Clerk
 * Use this in server-side code (API routes, server components)
 * @returns userId string or null if not authenticated
 */
export async function getClerkUserId(): Promise<string | null> {
  const { userId } = await auth();
  return userId ?? null;
}

/**
 * Require authentication - throws error if user not authenticated
 * Use this in protected server-side code
 * @returns userId string
 */
export async function requireClerkAuth(): Promise<string> {
  const { userId } = await auth();
  
  if (!userId) {
    throw new ApiError(401, "Authentication required");
  }
  
  return userId;
}

/**
 * Check if user is authenticated
 * @returns boolean indicating authentication status
 */
export async function isClerkAuthenticated(): Promise<boolean> {
  const { userId } = await auth();
  return !!userId;
}

