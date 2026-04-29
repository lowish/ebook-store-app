"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { BookCoverPreview } from "@/components/book-cover-preview";
import { RatingStars } from "@/components/rating-stars";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  image: string;
  created_at: string;
}

interface RatingSummary {
  averageRating: number;
  totalRatings: number;
}

interface BookDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function BookDetailsPage({ params }: BookDetailsPageProps) {
  const [id, setId] = useState<string | null>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [ratingSummary, setRatingSummary] = useState<RatingSummary | null>(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const initializeParams = async () => {
      const { id: paramId } = await params;
      setId(paramId);
    };
    initializeParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`/client/books/${id}`, {
          credentials: "include",
        });

        if (!response.ok) {
          const text = await response.text().catch(() => response.statusText ?? "Failed to fetch book");
          throw new Error(text || response.statusText || "Failed to fetch book");
        }

        const payload = (await response.json().catch(() => null)) as {
          success: boolean;
          data?: { book: Book; ratingSummary: RatingSummary };
          error?: { message?: string };
        } | null;

        if (!payload || !payload.success) {
          throw new Error(payload?.error?.message ?? "Failed to fetch book");
        }

        setBook(payload.data?.book ?? null);
        setRatingSummary(payload.data?.ratingSummary ?? null);

        // Check if user purchased this book
        const ordersResponse = await fetch("/client/orders", {
          credentials: "include",
        }).catch(() => null);

        if (ordersResponse && ordersResponse.ok) {
          const ordersPayload = (await ordersResponse.json().catch(() => null)) as {
            success: boolean;
            data?: { orders: Array<{ book: { id: string } }> };
            error?: { message?: string };
          } | null;

          if (ordersPayload?.success && ordersPayload.data?.orders) {
            const purchased = ordersPayload.data.orders.some((order) => order.book.id === id);
            setIsPurchased(purchased);
          }
        }
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Failed to fetch book");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <p className="text-muted-foreground">Loading book details...</p>
      </main>
    );
  }

  if (errorMessage || !book) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-6 rounded-full pl-2">
          <Link href="/books">
            <ChevronLeft className="size-4" />
            Back to books
          </Link>
        </Button>
        <Card className="border-border/70 bg-white shadow-sm">
          <CardContent className="py-8">
            <p className="text-center text-red-600">{errorMessage ?? "Book not found"}</p>
          </CardContent>
        </Card>
      </main>
    );
  }

  const rating = ratingSummary?.averageRating ?? null;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" className="mb-6 rounded-full pl-2">
        <Link href="/books">
          <ChevronLeft className="size-4" />
          Back to books
        </Link>
      </Button>

      <section className="grid gap-8 rounded-3xl border border-border/70 bg-white p-6 shadow-sm lg:grid-cols-[minmax(280px,340px)_minmax(0,1fr)] lg:items-start lg:p-8 xl:grid-cols-[minmax(300px,360px)_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-8">
          <BookCoverPreview src={book.image} alt={`${book.title} cover`} />
        </div>

        <div className="flex min-w-0 flex-col justify-between lg:min-h-[420px]">
          <div>
            <p className="text-sm text-muted-foreground">by {book.author}</p>
            <h1 className="mt-2 font-heading text-3xl leading-tight tracking-tight sm:text-4xl">
              {book.title}
            </h1>

            <RatingStars rating={rating} className="mt-4" />
            {ratingSummary && (
              <p className="mt-1 text-sm text-muted-foreground">
                {ratingSummary.totalRatings} rating{ratingSummary.totalRatings !== 1 ? "s" : ""}
              </p>
            )}

            <p className="mt-6 max-w-prose text-base leading-7 text-muted-foreground">
              {book.description}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <p className="font-heading text-3xl">${book.price}</p>
            {isPurchased ? (
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href={`/reader/${id}`}>Read Now</Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href={`/checkout/${id}`}>Buy Now</Link>
              </Button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}