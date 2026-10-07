import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, ChevronLeft } from "lucide-react";

import { BookCoverPreview } from "@/components/book-cover-preview";
import { RatingStars } from "@/components/rating-stars";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { findCatalogBook, getCatalog } from "@/lib/catalog";

/**
 * Book detail page.
 *
 * Server-rendered from the same cached catalog the grid uses, so opening a book
 * costs no extra Open Library request and the details are in the initial HTML.
 * `app/books/[id]/loading.tsx` covers the wait; an unknown id 404s.
 */
export const dynamic = "force-dynamic";

type BookDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const backLink = (
  <Button asChild variant="ghost" className="mb-6 rounded-full pl-2">
    <Link href="/books">
      <ChevronLeft className="size-4" />
      Back to books
    </Link>
  </Button>
);

export async function generateMetadata({ params }: BookDetailsPageProps) {
  const { id } = await params;
  const catalog = await getCatalog();
  const book = findCatalogBook(catalog, id);

  return {
    title: book ? `${book.title} | Readora` : "Book | Readora",
    description: book?.description ?? undefined,
  };
}

export default async function BookDetailsPage({ params }: BookDetailsPageProps) {
  const { id } = await params;
  const catalog = await getCatalog();

  if (!catalog.fetchSucceeded) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        {backLink}
        <Card className="border-border/70 bg-white shadow-sm">
          <CardContent className="py-8">
            <p className="text-center text-red-600">
              Open Library did not respond. Please try again shortly.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  const book = findCatalogBook(catalog, id);

  if (!book) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      {backLink}

      <section className="mx-auto max-w-5xl">
        <header className="border-b border-border/70 pb-8">
          <p className="text-base text-muted-foreground sm:text-lg">by {book.author}</p>
          <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-heading text-3xl leading-tight tracking-tight sm:text-6xl">
                {book.title}
              </h1>
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-base text-muted-foreground">
                <span className="text-xs uppercase tracking-[0.14em]">
                  {book.genre}
                </span>
                {book.publicationYear ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>First published {book.publicationYear}</span>
                  </>
                ) : null}
              </div>
            </div>
            <a
              href={`https://www.amazon.com/s?k=${encodeURIComponent(`${book.title} ${book.author}`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit rounded-full border border-foreground px-6 py-3 text-base font-medium transition-colors hover:bg-foreground hover:text-background"
            >
              Purchase this book
            </a>
          </div>
        </header>

        <div className="mt-8 flex min-h-[420px] items-center justify-center rounded-3xl border border-border/70 bg-muted/40 px-6 py-12 shadow-sm sm:min-h-[520px]">
          <div className="w-full max-w-[280px]">
            {book.coverUrl ? (
              <BookCoverPreview src={book.coverUrl} alt={`${book.title} cover`} />
            ) : (
              <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-border/70 bg-background text-muted-foreground">
                <BookOpen className="size-10" />
                <span className="text-xs uppercase tracking-[0.14em]">No cover</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 max-w-3xl">
          <RatingStars rating={null} className="mb-6" />
          <h2 className="font-heading text-3xl">About this book</h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            {book.description ?? "No description available from Open Library."}
          </p>

          <div className="mt-10 space-y-10 border-t border-border/70 pt-12">
            <CuratedSection label="What You Learn" value={book.whatYouLearn} />
            <CuratedSection label="Why It Matters" value={book.whyItMatters} />
          </div>
        </div>
      </section>
    </main>
  );
}

/**
 * One of the two Readora-curated fields. Uncurated books show the slot as
 * pending rather than hiding it, so gaps in `lib/catalog-curation.ts` stay
 * visible while browsing.
 */
function CuratedSection({ label, value }: { label: string; value?: string }) {
  const text = value?.trim();

  return (
    <div>
      <h2 className="font-heading text-2xl">
        {label}
      </h2>
      {text ? (
        <p className="mt-3 text-lg leading-7 text-muted-foreground sm:text-lg">
          {text}
        </p>
      ) : (
        <p className="mt-3 text-lg italic leading-7 text-muted-foreground/70">
          Not curated yet
        </p>
      )}
    </div>
  );
}
