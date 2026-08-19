"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

import { BookCard } from "@/components/book-card";
import { BookSection } from "@/components/book-section";
import type { GenreBooks } from "@/types/catalog";

type BooksCatalogProps = {
  /** Server-rendered shelves, already fetched from Open Library. */
  shelves: GenreBooks[];
  /** Seeds the search box from `?q=` so shared links land pre-filtered. */
  initialQuery?: string;
};

/**
 * Interactive layer over the catalog: search box and topic filter.
 *
 * The books arrive as a prop from the server component, so filtering is pure
 * client-side work and never triggers another Open Library request.
 */
export function BooksCatalog({ shelves, initialQuery = "" }: BooksCatalogProps) {
  const [query, setQuery] = useState(initialQuery);
  const [genre, setGenre] = useState("all");

  const genres = useMemo(() => shelves.map((shelf) => shelf.genre), [shelves]);

  const visibleShelves = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return shelves
      .filter((shelf) => genre === "all" || shelf.genre === genre)
      .map((shelf) => ({
        genre: shelf.genre,
        books: normalized
          ? shelf.books.filter(
              (book) =>
                book.title.toLowerCase().includes(normalized) ||
                book.author.toLowerCase().includes(normalized) ||
                book.genre.toLowerCase().includes(normalized)
            )
          : shelf.books,
      }))
      .filter((shelf) => shelf.books.length > 0);
  }, [shelves, genre, query]);

  const visibleCount = useMemo(
    () => visibleShelves.reduce((total, shelf) => total + shelf.books.length, 0),
    [visibleShelves]
  );

  const isFiltering = query.trim().length > 0 || genre !== "all";

  return (
    <>
      {/* Search line */}
      <div className="mt-16 flex items-center gap-4 border-b border-border/70 pb-3">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search books"
          aria-label="Search books"
          className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
        />
        <span className="shrink-0 text-base text-muted-foreground">
          {visibleCount} {visibleCount === 1 ? "book" : "books"}
        </span>
      </div>

      {/* Topic filter */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="relative">
          <select
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            aria-label="Filter by topic"
            className="cursor-pointer appearance-none bg-transparent pr-6 text-base text-foreground outline-none"
          >
            <option value="all">All topics</option>
            {genres.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-0 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        </div>

        {isFiltering ? (
          <button
            type="button"
            onClick={() => {
              setGenre("all");
              setQuery("");
            }}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      <div className="mt-12">
        {visibleShelves.length === 0 ? (
          <div className="rounded-2xl border border-border/70 bg-white p-10 text-center">
            <h2 className="font-heading text-xl">No matches found</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different title, author, or topic.
            </p>
          </div>
        ) : (
          visibleShelves.map((shelf) => (
            <BookSection
              key={shelf.genre}
              title={shelf.genre}
              description={`${shelf.books.length} ${
                shelf.books.length === 1 ? "title" : "titles"
              }`}
            >
              {shelf.books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </BookSection>
          ))
        )}
      </div>
    </>
  );
}
