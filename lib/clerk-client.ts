"use client";

/**
 * Client-side Clerk authentication utilities
 * Use these hooks in client components to access authentication state
 */

export { useAuth, useClerk, useUser, useSignUp, useSignIn } from "@clerk/nextjs";

/**
 * Re-export Clerk components for convenience
 */
export { SignIn, SignUp, UserButton, SignOutButton } from "@clerk/nextjs";
