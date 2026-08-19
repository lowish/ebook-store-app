/**
 * Open Library API service.
 *
 * Pure data-fetching + normalisation. Nothing in here imports React or touches
 * the UI; callers get plain `Book` objects back.
 *
 * Books are looked up by *work key*, which is what lets Readora pin its catalog
 * to specific canonical works instead of taking whatever a subject search
 * happens to rank first. `search.json` accepts several keys in one `key:(...)`
 * query, so the whole 50-book catalog loads in a single request.
 *
 * Docs: https://openlibrary.org/dev/docs/api/search
 */

import type { CuratedBook } from "@/lib/catalog-books";
import type { Book } from "@/types/catalog";

export const OPEN_LIBRARY_BASE_URL = "https://openlibrary.org";
export const OPEN_LIBRARY_COVERS_BASE_URL = "https://covers.openlibrary.org";

/** Open Library asks API consumers to identify themselves. */
const USER_AGENT = "Readora/1.0 (+https://readora.example)";

/**
 * Fields requested from the search index. Asking for an explicit field list
 * keeps responses small; the default payload is enormous.
 */
const SEARCH_FIELDS = [
  "key",
  "title",
  "author_name",
  "first_publish_year",
  "cover_i",
  "description",
  "first_sentence",
  "language",
] as const;

const DEFAULT_TIMEOUT_MS = 12_000;
const DEFAULT_RETRIES = 3;
/** Open Library returns sporadic plain-text 500s; back off and try again. */
const RETRY_BASE_DELAY_MS = 600;
const MAX_DESCRIPTION_LENGTH = 480;

export type CoverSize = "S" | "M" | "L";

/** Shape of a single `docs[]` entry from `search.json`. */
export type OpenLibrarySearchDoc = {
  key?: string;
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  description?: string | { value?: string } | Array<string | { value?: string }>;
  first_sentence?: string | string[] | { value?: string };
  language?: string[];
};

export type OpenLibrarySearchResponse = {
  numFound?: number;
  docs?: OpenLibrarySearchDoc[];
};

export class OpenLibraryError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "OpenLibraryError";
    this.status = status;
  }
}

export type SearchOptions = {
  /** Abort the request from the caller (e.g. a route handler timeout). */
  signal?: AbortSignal;
  /** Per-attempt timeout in ms. */
  timeoutMs?: number;
  /** Attempts including the first. */
  retries?: number;
  /**
   * Seconds to cache the upstream response for. Passed through to the Next.js
   * `fetch` extension; ignored when this module runs outside Next.
   */
  revalidateSeconds?: number;
};

/**
 * Builds the public cover URL. Open Library serves these directly, so covers
 * are never downloaded or proxied.
 */
export function buildCoverUrl(
  coverId: number | null | undefined,
  size: CoverSize = "L"
): string | undefined {
  if (typeof coverId !== "number" || !Number.isFinite(coverId) || coverId <= 0) {
    return undefined;
  }

  return `${OPEN_LIBRARY_COVERS_BASE_URL}/b/id/${coverId}-${size}.jpg`;
}

/**
 * Builds a Solr query matching any of the given work keys, e.g.
 * `key:("/works/OL66554W" OR "/works/OL1095427W")`.
 */
export function buildWorkKeyQuery(workKeys: string[]): string {
  const keys = workKeys.map((key) => key.trim()).filter(Boolean);

  if (keys.length === 0) {
    throw new OpenLibraryError("At least one work key is required");
  }

  return `key:(${keys.map((key) => `"${key}"`).join(" OR ")})`;
}

async function fetchJson(
  url: string,
  {
    signal,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    retries = DEFAULT_RETRIES,
    revalidateSeconds,
  }: SearchOptions
): Promise<unknown> {
  const attempts = Math.max(1, retries);
  let lastError: Error = new OpenLibraryError("Open Library request never ran");

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const timeout = AbortSignal.timeout(timeoutMs);
    const combined = signal ? AbortSignal.any([signal, timeout]) : timeout;

    try {
      const response = await fetch(url, {
        signal: combined,
        headers: {
          Accept: "application/json",
          "User-Agent": USER_AGENT,
        },
        ...(revalidateSeconds === undefined
          ? {}
          : { next: { revalidate: revalidateSeconds } }),
      });

      const contentType = response.headers.get("content-type") ?? "";

      // Open Library answers overload with `text/plain` 500s, so a status check
      // alone is not enough to trust the body.
      if (!response.ok || !contentType.includes("json")) {
        throw new OpenLibraryError(
          `Open Library responded ${response.status} (${contentType || "no content-type"})`,
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      // The caller aborted deliberately, so do not burn retries on it.
      if (signal?.aborted) {
        throw new OpenLibraryError("Open Library request aborted by caller");
      }

      lastError = error instanceof Error ? error : new OpenLibraryError(String(error));

      if (attempt < attempts - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, RETRY_BASE_DELAY_MS * (attempt + 1))
        );
      }
    }
  }

  throw new OpenLibraryError(
    `Open Library request failed after ${attempts} attempts: ${lastError.message}`,
    lastError instanceof OpenLibraryError ? lastError.status : undefined
  );
}

/**
 * Raw search. One HTTP request returns up to `limit` works, which is what lets
 * `fetchWorksByKeys` load the whole catalog in a single call.
 */
export async function searchOpenLibrary(
  params: { query: string; limit?: number; sort?: string; page?: number },
  options: SearchOptions = {}
): Promise<OpenLibrarySearchDoc[]> {
  const searchParams = new URLSearchParams({
    q: params.query,
    limit: String(params.limit ?? 20),
    fields: SEARCH_FIELDS.join(","),
  });

  if (params.sort) {
    searchParams.set("sort", params.sort);
  }

  if (params.page && params.page > 1) {
    searchParams.set("page", String(params.page));
  }

  const payload = (await fetchJson(
    `${OPEN_LIBRARY_BASE_URL}/search.json?${searchParams.toString()}`,
    options
  )) as OpenLibrarySearchResponse;

  return Array.isArray(payload?.docs) ? payload.docs : [];
}

/** Open Library sometimes returns text as `{ type, value }` instead of a string. */
function readText(
  value: OpenLibrarySearchDoc["description"] | OpenLibrarySearchDoc["first_sentence"]
): string | undefined {
  if (typeof value === "string") {
    return value.trim() || undefined;
  }

  if (Array.isArray(value)) {
    for (const entry of value) {
      const text = readText(entry);
      if (text) {
        return text;
      }
    }
    return undefined;
  }

  if (value && typeof value === "object" && typeof value.value === "string") {
    return value.value.trim() || undefined;
  }

  return undefined;
}

/**
 * Open Library descriptions are user-edited markdown and often carry a
 * `----------` rule followed by source links. Strip the furniture and cap the
 * length at a word boundary.
 */
export function cleanDescription(raw: unknown): string | undefined {
  const text = readText(raw as OpenLibrarySearchDoc["description"]);

  if (!text) {
    return undefined;
  }

  const cleaned = text
    // Drop the source/citation block that follows a horizontal rule.
    .split(/\n\s*-{4,}\s*\n?/)[0]
    // Drop trailing markdown link definitions: `[1]: https://...`
    .replace(/^\s*\[\d+\]:\s*\S+.*$/gm, "")
    // `[label](url)` and `[label][1]` both collapse to `label`.
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\[[^\]]*\]/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) {
    return undefined;
  }

  if (cleaned.length <= MAX_DESCRIPTION_LENGTH) {
    return cleaned;
  }

  const truncated = cleaned.slice(0, MAX_DESCRIPTION_LENGTH);
  const lastSpace = truncated.lastIndexOf(" ");
  const trimmed = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated;

  return `${trimmed.replace(/[,;:.\s]+$/, "")}...`;
}


/** `/works/OL17930368W` becomes `ol17930368w`. */
export function workKeyToId(workKey: string | undefined): string | undefined {
  const segment = workKey?.split("/").filter(Boolean).pop();
  return segment ? segment.toLowerCase() : undefined;
}

function sanitizeYear(year: unknown): number | undefined {
  if (typeof year !== "number" || !Number.isFinite(year)) {
    return undefined;
  }

  const rounded = Math.trunc(year);

  // Open Library stores 0 (and the occasional far-future typo) as "no data".
  if (rounded < 1000 || rounded > new Date().getFullYear() + 1) {
    return undefined;
  }

  return rounded;
}

/**
 * Merges one Open Library work record onto the curated pick it belongs to.
 *
 * Open Library owns the metadata: title, author, publication year, cover and
 * description all come from `doc`. The curated entry supplies the identity of
 * the pick (id, genre) and acts as the fallback for anything Open Library is
 * missing, which is why a work with no author or no year still produces a
 * usable book instead of a hole in the shelf.
 *
 * Passing `doc = null` — the work key returned nothing — yields the curated
 * entry on its own, so a shelf never loses a book to an upstream gap.
 */
export function mergeWorkIntoBook(
  curated: CuratedBook,
  doc: OpenLibrarySearchDoc | null
): Book {
  const openLibraryTitle =
    typeof doc?.title === "string" && doc.title.trim() ? doc.title.trim() : undefined;

  const openLibraryAuthor = Array.isArray(doc?.author_name)
    ? doc.author_name.find((name) => typeof name === "string" && name.trim())?.trim()
    : undefined;

  // `description` is richer, but `first_sentence` is a serviceable stand-in.
  const description =
    cleanDescription(doc?.description) ?? cleanDescription(doc?.first_sentence);

  return {
    id: curated.id,
    // Open Library files a handful of canonical works under their
    // original-language title; `preferCuratedTitle` restores the English one.
    title:
      curated.preferCuratedTitle || !openLibraryTitle
        ? curated.title
        : openLibraryTitle,
    author: openLibraryAuthor ?? curated.author,
    publicationYear: sanitizeYear(doc?.first_publish_year),
    coverUrl: buildCoverUrl(doc?.cover_i),
    description,
    // Readora-specific copy, merged in from `lib/catalog-curation.ts`.
    whatYouLearn: "",
    whyItMatters: "",
    genre: curated.genre,
    openLibraryKey: curated.openLibraryKey,
    openLibraryTitle,
  };
}

/**
 * Fetches the given work keys and returns them indexed by key.
 *
 * `search.json` accepts many keys in one `key:(...)` query, so a batch costs a
 * single request rather than one per book. Keys are chunked only to keep the
 * query string comfortably short.
 */
export async function fetchWorksByKeys(
  workKeys: string[],
  options: SearchOptions & { chunkSize?: number } = {}
): Promise<Map<string, OpenLibrarySearchDoc>> {
  const { chunkSize = 50, ...searchOptions } = options;
  const unique = [...new Set(workKeys.filter(Boolean))];
  const byKey = new Map<string, OpenLibrarySearchDoc>();

  if (unique.length === 0) {
    return byKey;
  }

  const chunks: string[][] = [];
  for (let index = 0; index < unique.length; index += chunkSize) {
    chunks.push(unique.slice(index, index + chunkSize));
  }

  const batches = await Promise.all(
    chunks.map((chunk) =>
      searchOpenLibrary(
        { query: buildWorkKeyQuery(chunk), limit: chunk.length },
        searchOptions
      )
    )
  );

  for (const doc of batches.flat()) {
    if (doc.key) {
      byKey.set(doc.key, doc);
    }
  }

  return byKey;
}
