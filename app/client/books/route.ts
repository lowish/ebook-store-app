import { ApiError, jsonSuccess, withErrorHandling } from "@/lib/api";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  return withErrorHandling(async () => {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from("books")
      .select("id, title, author, description, price, image, file_path, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      throw new ApiError(500, "Failed to fetch books", error.message);
    }

    return jsonSuccess({ books: data ?? [] });
  });
}