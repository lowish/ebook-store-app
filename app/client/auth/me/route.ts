import { auth } from "@clerk/nextjs/server";

import { ApiError, withErrorHandling, jsonSuccess } from "@/lib/api";

export async function GET() {
  return withErrorHandling(async () => {
    const { userId, sessionId } = await auth();

    if (!userId) {
      throw new ApiError(401, "User not authenticated");
    }

    return jsonSuccess({
      user: {
        id: userId,
        sessionId: sessionId,
      },
    });
  });
}