"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import { BookCard } from "@/components/book-card";
import { BookSection } from "@/components/book-section";
import { Button } from "@/components/ui/button";
import { books, genres, groupBooksByGenre, type Book } from "@/lib/books";
import { cn } from "@/lib/utils";

type SortMode = "fav";

const ROW_SIZE = 4;

const sortOptions = [
  { value: "fav", label: "Favorites" },
] as const;

function sortBooks(list: Book[], mode: SortMode) {
  if (mode === "fav") {
    return [...list].sort((a, b) => b.fav - a.fav);
  }

  return [...list].reverse();
}

export default function BooksPage() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(urlQuery);
  const [genre, setGenre] = useState("all");
  const [sortMode, setSortMode] = useState<SortMode>("fav");
  const [showAll, setShowAll] = useState(false);
  const [trialLoadingId, setTrialLoadingId] = useState<string | null>(null);
  const [trialError, setTrialError] = useState<string | null>(null);

  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  const isSearching = query.trim().length > 0;

  const visibleBooks = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    const matched = books.filter((book) => {
      const matchesGenre = genre === "all" || book.genre === genre;
      const matchesQuery =
        !normalized ||
        book.title.toLowerCase().includes(normalized) ||
        book.author.toLowerCase().includes(normalized) ||
        book.genre.toLowerCase().includes(normalized);

      return matchesGenre && matchesQuery;
    });

    return sortBooks(matched, sortMode);
  }, [query, genre, sortMode]);

  const featuredBooks = useMemo(
    () => visibleBooks.filter((book) => book.featured),
    [visibleBooks]
  );

  const freeBooks = useMemo(
    () => visibleBooks.filter((book) => book.freeTrial),
    [visibleBooks]
  );

  const genreGroups = useMemo(
    () => groupBooksByGenre(visibleBooks),
    [visibleBooks]
  );

  const showCollections = !isSearching && !showAll && genre === "all";

  const handleOpenFreeTrial = async (book: Book) => {
    try {
      setTrialLoadingId(book.id);
      setTrialError(null);

      const response = await fetch(`/client/reader/${book.id}`, {
        credentials: "include",
      });

      const payload = (await response.json().catch(() => null)) as {
        success?: boolean;
        data?: { url?: string };
        error?: { message?: string };
      } | null;

      if (!response.ok || !payload?.success || !payload.data?.url) {
        throw new Error(payload?.error?.message ?? "Failed to open free trial");
      }

      window.location.href = payload.data.url;
    } catch (error) {
      setTrialError(
        error instanceof Error ? error.message : "Failed to open free trial"
      );
    } finally {
      setTrialLoadingId(null);
    }
  };

  const renderCard = (book: Book) => <BookCard key={book.id} book={book} />;

  const renderFreeCard = (book: Book) => (
    <BookCard
      key={`free-${book.id}`}
      book={book}
      actionLabel="Read free"
      onAction={handleOpenFreeTrial}
      actionPending={trialLoadingId === book.id}
    />
  );

  const backToCollections = (
    <button
      type="button"
      onClick={() => {
        setGenre("all");
        setShowAll(false);
      }}
      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      Back to collections
    </button>
  );

  const listTitle = isSearching
    ? `Results for "${query.trim()}"`
    : genre === "all"
      ? "All Books"
      : genre;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      {/* Masthead */}

      <div className="mt-10 max-w-2xl">
        <h1 className="font-heading text-2xl tracking-tight sm:text-3xl">
          Discover your next book.
        </h1>
        <p className="mt-1 text-lg text-muted-foreground sm:text-xl">
          Self-improvement, philosophy, strategy, and stories worth an evening.
        </p>
      </div>

      {/* Search line */}
      <div className="mt-30 flex items-center gap-4 border-b border-border/70 pb-3">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search books"
          aria-label="Search books"
          className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
        />
        <span className="shrink-0 text-base text-muted-foreground">
          {visibleBooks.length} {visibleBooks.length === 1 ? "book" : "books"}
        </span>
      </div>

      {/* Topic filter + sort */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="relative">
          <select
            value={genre}
            onChange={(event) => {
              setGenre(event.target.value);
              setShowAll(false);
            }}
            aria-label="Filter by topic"
            className="cursor-pointer appearance-none bg-transparent pr-6 text-l text-foreground outline-none"
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

        <div className="flex items-center gap-5 text-l">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setSortMode(option.value)}
              className={cn(
                "transition-colors",
                sortMode === option.value
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {trialError ? (
        <p className="mt-6 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {trialError}
        </p>
      ) : null}

      {/* Collections */}
      <div className="mt-12">
        {visibleBooks.length === 0 ? (
          <div className="rounded-2xl border border-border/70 bg-white p-10 text-center">
            <h2 className="font-heading text-xl">No matches found</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different title, author, or topic.
            </p>
          </div>
        ) : showCollections ? (
          <>
            {featuredBooks.length > 0 ? (
              <BookSection title="Featured">
                {featuredBooks.slice(0, ROW_SIZE).map(renderCard)}
              </BookSection>
            ) : null}

            {freeBooks.length > 0 ? (
              <BookSection
                title="Free to Read"
                description="Start reading instantly, no checkout needed."
              >
                {freeBooks.slice(0, ROW_SIZE).map(renderFreeCard)}
              </BookSection>
            ) : null}

            {genreGroups.map((group) => (
              <BookSection
                key={group.genre}
                title={group.genre}
                action={
                  group.books.length > ROW_SIZE ? (
                    <button
                      type="button"
                      onClick={() => setGenre(group.genre)}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      View all {group.books.length}
                    </button>
                  ) : null
                }
              >
                {group.books.slice(0, ROW_SIZE).map(renderCard)}
              </BookSection>
            ))}

            <div className="mt-14 flex justify-center">
              <Button
                type="button"
                size="lg"
                className="rounded-full px-6"
                onClick={() => setShowAll(true)}
              >
                Explore All Books
              </Button>
            </div>
          </>
        ) : (
          <BookSection
            title={listTitle}
            description={`${visibleBooks.length} ${
              visibleBooks.length === 1 ? "title" : "titles"
            }`}
            action={genre !== "all" || showAll ? backToCollections : null}
          >
            {visibleBooks.map(renderCard)}
          </BookSection>
        )}
      </div>
    </main>
  );
}