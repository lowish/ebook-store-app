import { NextRequest } from "next/server";
import { z } from "zod";

import { requireClerkAuth } from "@/lib/auth";
import { ApiError, jsonSuccess, withErrorHandling } from "@/lib/api";
import { books as catalogBooks } from "@/lib/books";
import { getCatalog } from "@/lib/catalog";
import { getSupabaseAdmin } from "@/lib/supabase";

const bodySchema = z.object({
  bookId: z.string().min(1).max(200),
  isFavorite: z.boolean(),
});

function resolveBookFilePath(bookIdParam: string) {
  const normalizedId = bookIdParam.trim().toLowerCase();

  const catalogBook =
    catalogBooks.find((book) => book.id.toLowerCase() === normalizedId) ??
    catalogBooks.find((book) => book.title.toLowerCase() === normalizedId) ??
    catalogBooks.find((book) => book.title.toLowerCase().includes(normalizedId)) ??
    null;

  if (catalogBook) {
    return catalogBook.filePath;
  }

  return normalizedId.endsWith(".pdf") ? normalizedId : `${normalizedId}.pdf`;
}

export async function GET() {
  return withErrorHandling(async () => {
    const userId = await requireClerkAuth();
    const supabaseAdmin = getSupabaseAdmin();

    const { data, error } = await supabaseAdmin
      .from("user_favorites")
      .select(
        "id, book_id, book:books(id, title, author, description, price, image, file_path), created_at"
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new ApiError(500, "Failed to fetch favorites", error.message);
    }

    const { data: catalogFavorites, error: catalogError } = await supabaseAdmin
      .from("catalog_favorites")
      .select("id, book_id, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (catalogError) {
      throw new ApiError(500, "Failed to fetch catalog favorites", catalogError.message);
    }

    const catalog = await getCatalog();
    const catalogItems = (catalogFavorites ?? [])
      .map((favorite) => {
        const book = catalog.books.find((item) => item.id === favorite.book_id);
        if (!book) return null;

        return {
          id: favorite.id,
          book_id: book.id,
          book: {
            id: book.id,
            title: book.title,
            author: book.author,
            description: book.description ?? "",
            image: book.coverUrl ?? "",
            price: 0,
          },
          created_at: favorite.created_at,
        };
      })
      .filter((favorite): favorite is NonNullable<typeof favorite> => favorite !== null);

    return jsonSuccess({ favorites: [...catalogItems, ...(data ?? [])] });
  });
}

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    const userId = await requireClerkAuth();
    const supabaseAdmin = getSupabaseAdmin();

    const json = (await request.json().catch(() => null)) as unknown;
    const parsedBody = bodySchema.safeParse(json);

    if (!parsedBody.success) {
      throw new ApiError(400, "Invalid favorite payload", parsedBody.error.flatten());
    }

    const { bookId, isFavorite } = parsedBody.data;
    const isCatalogBookId = !z.string().uuid().safeParse(bookId).success;

    if (isCatalogBookId) {
      if (isFavorite) {
        const { data, error } = await supabaseAdmin
          .from("catalog_favorites")
          .upsert(
            { user_id: userId, book_id: bookId.trim().toLowerCase() },
            { onConflict: "user_id,book_id" }
          )
          .select("id, user_id, book_id, created_at")
          .single();

        if (error) {
          throw new ApiError(500, "Failed to add catalog book to favorites", error.message);
        }

        return jsonSuccess({ favorite: data, message: "Added to favorites" });
      }

      const { error } = await supabaseAdmin
        .from("catalog_favorites")
        .delete()
        .eq("user_id", userId)
        .eq("book_id", bookId.trim().toLowerCase());

      if (error) {
        throw new ApiError(500, "Failed to remove catalog book from favorites", error.message);
      }

      return jsonSuccess({ message: "Removed from favorites" });
    }

    const resolvedFilePath = resolveBookFilePath(bookId);

    // Verify book exists
    const { data: bookById, error: bookByIdError } = await supabaseAdmin
      .from("books")
      .select("id")
      .eq("id", bookId)
      .maybeSingle();

    if (bookByIdError) {
      throw new ApiError(500, "Failed to verify book", bookByIdError.message);
    }

    const book =
      bookById ??
      (
        await supabaseAdmin
          .from("books")
          .select("id")
          .eq("file_path", resolvedFilePath)
          .maybeSingle()
      ).data;

    if (!book) {
      throw new ApiError(404, "Book not found");
    }

    const resolvedBookId = book.id;

    if (isFavorite) {
      // Add to favorites
      const { data, error } = await supabaseAdmin
        .from("user_favorites")
        .upsert(
          {
            user_id: userId,
            book_id: resolvedBookId,
          },
          {
            onConflict: "user_id,book_id",
          }
        )
        .select("id, user_id, book_id, created_at")
        .single();

      if (error) {
        throw new ApiError(500, "Failed to add to favorites", error.message);
      }

      return jsonSuccess({ favorite: data, message: "Added to favorites" });
    } else {
      // Remove from favorites
      const { error } = await supabaseAdmin
        .from("user_favorites")
        .delete()
        .eq("user_id", userId)
        .eq("book_id", resolvedBookId);

      if (error) {
        throw new ApiError(500, "Failed to remove from favorites", error.message);
      }

      return jsonSuccess({ message: "Removed from favorites" });
    }
  });
}
