"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { BookCard } from "@/components/book-card";
import { useSavedBooks } from "@/components/saved-books-provider";
import { Button } from "@/components/ui/button";

export default function LibraryPage() {
  const { savedBooks } = useSavedBooks();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" className="mb-6 rounded-full pl-2">
        <Link href="/books">
          <ChevronLeft className="size-4" />
          Back to books
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="font-heading text-3xl">My Library</h1>
        <p className="mt-2 text-muted-foreground">
          {savedBooks.length} saved {savedBooks.length === 1 ? "book" : "books"}
        </p>
      </div>

      {savedBooks.length === 0 ? (
        <div className="rounded-2xl border border-border/70 bg-white p-12 text-center">
          <h2 className="font-heading text-xl">Your library is empty</h2>
          <p className="mt-2 text-muted-foreground">
            Save books with the heart icon and they will appear here.
          </p>
          <Button asChild className="mt-6 rounded-full px-6">
            <Link href="/books">Browse books</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {savedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}
