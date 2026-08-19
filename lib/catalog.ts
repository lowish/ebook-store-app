/**
 * Readora catalog assembly.
 *
 * Takes the curated picks in `lib/catalog-books.ts`, fetches their Open Library
 * metadata in one batched request, merges in editorial copy from
 * `lib/catalog-curation.ts`, and groups the result into genre shelves.
 *
 * Selection lives in `catalog-books.ts` and the API lives in `openlibrary.ts`;
 * this file only wires the two together.
 */

import { CURATED_BOOKS, type CuratedBook } from "@/lib/catalog-books";
import { catalogCuration } from "@/lib/catalog-curation";
import {
  fetchWorksByKeys,
  mergeWorkIntoBook,
  type OpenLibrarySearchDoc,
  type SearchOptions,
} from "@/lib/openlibrary";
import type { Book, Catalog, GenreBooks } from "@/types/catalog";

/** The ten shelves, in display order. */
export const CATALOG_GENRES = [
  "Fiction",
  "Self-Improvement",
  "Business",
  "Technology",
  "Science",
  "History",
  "Philosophy",
  "Psychology",
  "Education",
  "Romance",
] as const;

export type CatalogGenre = (typeof CATALOG_GENRES)[number];

export const BOOKS_PER_GENRE = 8;

/** 10 genres x 8 books. */
export const CATALOG_SIZE = CATALOG_GENRES.length * BOOKS_PER_GENRE;

/** Open Library work records barely move; a day-old copy is fine. */
const CATALOG_REVALIDATE_SECONDS = 60 * 60 * 24;

/** Guards against re-assembling the catalog on every request in one process. */
const MEMORY_CACHE_TTL_MS = 1000 * 60 * 30;

type CacheEntry = { catalog: Catalog; expiresAt: number };

let memoryCache: CacheEntry | null = null;

/**
 * Merges hand-written Readora copy onto a fetched book. Curated values live in
 * `lib/catalog-curation.ts` so re-fetching never overwrites editorial work.
 */
export function applyCuration(book: Book): Book {
  const curated = catalogCuration[book.id];

  return {
    ...book,
    whatYouLearn: curated?.whatYouLearn?.trim() ?? "",
    whyItMatters: curated?.whyItMatters?.trim() ?? "",
  };
}

export type BuildCatalogOptions = SearchOptions & {
  /** Override the curated picks, mainly for tests. */
  books?: CuratedBook[];
};

/**
 * Builds the catalog from the curated picks.
 *
 * Open Library is contacted once for all 50 works. If that request fails the
 * shelves are still returned, populated from the curated entries alone, so the
 * catalog degrades to titles and authors rather than disappearing; the failure
 * is reported in `failedGenres`.
 */
export async function buildCatalog(
  options: BuildCatalogOptions = {}
): Promise<Catalog> {
  const { books: curatedBooks = CURATED_BOOKS, ...searchOptions } = options;

  let works = new Map<string, OpenLibrarySearchDoc>();
  let fetchSucceeded = true;

  try {
    works = await fetchWorksByKeys(
      curatedBooks.map((book) => book.openLibraryKey),
      { revalidateSeconds: CATALOG_REVALIDATE_SECONDS, ...searchOptions }
    );
  } catch (error) {
    fetchSucceeded = false;
    console.error(
      "[catalog] Open Library request failed:",
      error instanceof Error ? error.message : error
    );
  }

  const shelves = new Map<string, Book[]>(
    CATALOG_GENRES.map((genre) => [genre, []])
  );

  // Genres holding at least one book with no Open Library metadata, whether
  // because the request failed or because a work key no longer resolves.
  const incompleteGenres = new Set<string>();

  for (const curated of curatedBooks) {
    const doc = works.get(curated.openLibraryKey) ?? null;

    if (!doc) {
      incompleteGenres.add(curated.genre);
    }

    const book = applyCuration(mergeWorkIntoBook(curated, doc));
    const shelf = shelves.get(curated.genre);

    if (shelf) {
      shelf.push(book);
    } else {
      // A curated book pointing at a genre that is not configured is a bug in
      // `catalog-books.ts`; surface it rather than dropping the book silently.
      console.error(
        `[catalog] "${curated.id}" has unknown genre "${curated.genre}"`
      );
    }
  }

  const genres: GenreBooks[] = CATALOG_GENRES.map((genre) => ({
    genre,
    books: shelves.get(genre) ?? [],
  }));

  return {
    books: genres.flatMap((shelf) => shelf.books),
    genres,
    fetchedAt: new Date().toISOString(),
    failedGenres: [...incompleteGenres],
    fetchSucceeded,
  };
}

/**
 * Cached entry point used by pages and route handlers. Only complete catalogs
 * are memoised, so a transient Open Library outage does not stick around.
 */
export async function getCatalog(
  options: BuildCatalogOptions & { forceRefresh?: boolean } = {}
): Promise<Catalog> {
  const { forceRefresh = false, ...buildOptions } = options;

  if (!forceRefresh && memoryCache && memoryCache.expiresAt > Date.now()) {
    return memoryCache.catalog;
  }

  const catalog = await buildCatalog(buildOptions);

  // Cache on a successful round trip even if a work key came back empty: a
  // missing work is a persistent data gap, and refetching cannot fix it. A
  // failed request is transient, so that result is deliberately not kept.
  if (catalog.fetchSucceeded) {
    memoryCache = { catalog, expiresAt: Date.now() + MEMORY_CACHE_TTL_MS };
  }

  return catalog;
}

/** Case-insensitive lookup of one shelf. */
export function findGenreShelf(
  catalog: Catalog,
  genre: string
): GenreBooks | undefined {
  const normalized = genre.trim().toLowerCase();
  return catalog.genres.find((shelf) => shelf.genre.toLowerCase() === normalized);
}

/** Looks up a single catalog book by its slug id. */
export function findCatalogBook(catalog: Catalog, id: string): Book | undefined {
  const normalized = id.trim().toLowerCase();
  return catalog.books.find((book) => book.id === normalized);
}
