/**
 * Readora catalog types.
 *
 * The `Book` here is the Open Library-backed *catalog* entry. It is deliberately
 * separate from the Supabase `Book` row in `types/index.ts`, which is keyed by
 * uuid and carries commerce fields (`price`, `file_path`) that Open Library
 * knows nothing about.
 */

export type Book = {
  /** Slug derived from the title, e.g. `atomic-habits`. Stable curation key. */
  id: string;
  title: string;
  author: string;
  publicationYear?: number;
  coverUrl?: string;
  description?: string;
  /** Readora-curated. Empty until an editor fills it in `lib/catalog-curation.ts`. */
  whatYouLearn?: string;
  /** Readora-curated. Empty until an editor fills it in `lib/catalog-curation.ts`. */
  whyItMatters?: string;
  genre: string;
  /** Open Library work key, e.g. `/works/OL17930368W`. */
  openLibraryKey?: string;
  /**
   * Open Library's own title for the work, kept even when the catalog displays
   * the curated English one (Open Library files some canonical works under
   * their original-language title). Undefined if the lookup returned nothing.
   */
  openLibraryTitle?: string;
};

/** One genre shelf: the genre name plus the books selected for it. */
export type GenreBooks = {
  genre: string;
  books: Book[];
};

export type Catalog = {
  /** Every book across every genre, flattened. */
  books: Book[];
  /** The same books grouped into shelves, in configured genre order. */
  genres: GenreBooks[];
  /** ISO timestamp of when this catalog snapshot was built. */
  fetchedAt: string;
  /**
   * Genres holding at least one book with no Open Library metadata. Empty when
   * every work resolved.
   */
  failedGenres: string[];
  /** False when the Open Library request itself failed, as opposed to a work
   * key simply not resolving. Drives whether the result is worth caching. */
  fetchSucceeded: boolean;
};

/** Manually curated copy, merged onto a fetched book by its `id`. */
export type CuratedCopy = {
  whatYouLearn?: string;
  whyItMatters?: string;
};
