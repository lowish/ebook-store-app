import Link from "next/link";

import { BooksCatalog } from "@/components/books-catalog";
import { Button } from "@/components/ui/button";
import { CATALOG_SIZE, getCatalog } from "@/lib/catalog";

/**
 * The Readora catalog: 10 genres x 5 books.
 *
 * Rendered on the server so the books are in the initial HTML rather than
 * appearing after a client round trip. `getCatalog()` reads the cached Open
 * Library data directly, so this page never issues an HTTP call to our own API
 * and never re-hits Open Library once the cache is warm.
 *
 * The loading state is `app/books/loading.tsx`, which Next shows while this
 * server component awaits its data.
 */
export const dynamic = "force-dynamic";

type BooksPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const { q } = await searchParams;
  const catalog = await getCatalog();

  const header = (
    <div className="mt-10 max-w-2xl">
      <h1 className="font-heading text-2xl tracking-tight sm:text-3xl">
        Discover your next book.
      </h1>
      <p className="mt-2 text-lg text-muted-foreground sm:text-xl">
        {CATALOG_SIZE} landmark books across {catalog.genres.length} genres, with
        details from Open Library.
      </p>
    </div>
  );

  // Open Library was unreachable: the shelves would render as bare titles with
  // no covers, so show an error the reader can act on instead.
  if (!catalog.fetchSucceeded) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        {header}
        <div className="mt-16 rounded-2xl border border-red-200 bg-red-50 p-10 text-center">
          <h2 className="font-heading text-xl text-red-800">
            Could not load the catalog
          </h2>
          <p className="mt-2 text-sm text-red-700">
            Open Library did not respond. The catalog will come back as soon as it
            does.
          </p>
          <Button asChild className="mt-6 rounded-full px-6">
            <Link href="/books">Try again</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      {header}

      {catalog.failedGenres.length > 0 ? (
        <p className="mt-6 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Open Library metadata is missing for some books in:{" "}
          {catalog.failedGenres.join(", ")}.
        </p>
      ) : null}

      <BooksCatalog shelves={catalog.genres} initialQuery={q ?? ""} />
    </main>
  );
}
