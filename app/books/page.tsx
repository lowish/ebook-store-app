"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BookCard } from "@/components/book-card";
import { SearchBar } from "@/components/search-bar";
import { books } from "@/lib/books";

export default function BooksPage() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(urlQuery);

  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  const filteredBooks = useMemo(() => {
    if (!query.trim()) {
      return books;
    }

    const normalized = query.toLowerCase();

    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(normalized) ||
        book.author.toLowerCase().includes(normalized)
    );
  }, [query]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl tracking-tight">Books</h1>
          <p className="text-muted-foreground">Explore our digital bookshelf.</p>
        </div>
        <SearchBar
          value={query}
          onValueChange={setQuery}
          placeholder="Search title or author"
          className="w-full sm:max-w-sm"
        />
      </div>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border/70 bg-white p-8 text-center">
          <h2 className="font-heading text-xl">No matches found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different title or author keyword.
          </p>
        </div>
      )}
    </main>
  );
}