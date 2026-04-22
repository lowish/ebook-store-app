import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { BookCoverPreview } from "@/components/book-cover-preview";
import { RatingStars } from "@/components/rating-stars";
import { Button } from "@/components/ui/button";
import { getBookById } from "@/lib/books";

type BookDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BookDetailsPage({ params }: BookDetailsPageProps) {
  const { id } = await params;
  const book = getBookById(id);

  if (!book) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" className="mb-6 rounded-full pl-2">
        <Link href="/books">
          <ChevronLeft className="size-4" />
          Back to books
        </Link>
      </Button>

      <section className="grid gap-8 rounded-3xl border border-border/70 bg-white p-6 shadow-sm md:grid-cols-[minmax(260px,360px)_1fr] md:p-8">
        <BookCoverPreview src={book.cover} alt={`${book.title} cover`} />

        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">by {book.author}</p>
          <h1 className="mt-2 font-heading text-3xl leading-tight tracking-tight sm:text-4xl">
            {book.title}
          </h1>

          <RatingStars rating={book.rating} className="mt-4" />

          <p className="mt-6 max-w-2xl text-muted-foreground">{book.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <p className="font-heading text-3xl">${book.price}</p>
            <Button size="lg" className="rounded-full px-6">
              Buy Now
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}