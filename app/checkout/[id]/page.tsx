"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface CheckoutPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [book, setBook] = useState<{ id: string; title: string; author: string; price: number } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const { id } = await params;
      // If free book, still call purchase endpoint to create order
      const response = await fetch("/client/checkout/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ bookId: id }),
      });

      const payload = (await response.json()) as {
        success: boolean;
        error?: { message?: string };
        data?: { order?: unknown };
      };

      if (!response.ok || !payload.success) {
        throw new Error(payload.error?.message ?? "Purchase failed");
      }

      setSuccessMessage("Purchase successful! Redirecting to your library...");
      setTimeout(() => {
        router.push("/library");
        router.refresh();
      }, 2000);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Purchase failed");
    } finally {
      setLoading(false);
    }
  };

  // load book to show accurate order summary and detect free books
  useEffect(() => {
    const load = async () => {
      try {
        const { id } = await params;
        const res = await fetch(`/client/books/${id}`);
        if (!res.ok) return;
        const payload = (await res.json().catch(() => null)) as { success?: boolean; data?: { book?: { id: string; title: string; author: string; price: string | number } } } | null;
        if (payload?.success && payload.data?.book) {
          setBook({ id: payload.data.book.id, title: payload.data.book.title, author: payload.data.book.author, price: Number(payload.data.book.price) });
        }
      } catch (err) {
        void err;
      }
    };

    load();
  }, [params]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" className="mb-6 rounded-full pl-2">
        <Link href="/books">
          <ChevronLeft className="size-4" />
          Back to books
        </Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-[1fr_360px]">
        {/* Order Summary */}
        <Card className="border-border/70 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-2xl">Order Summary</CardTitle>
            <CardDescription>Review your purchase before confirming</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 border-b border-border/50 pb-6">
              {/* Book item will be populated via search params */}
              <div className="flex gap-4">
                <div className="h-24 w-20 flex-shrink-0 rounded-lg bg-muted" />
                <div className="flex-1">
                  <p className="font-heading text-lg">Book Title</p>
                  <p className="text-sm text-muted-foreground">by Author</p>
                  <p className="mt-2 font-heading text-xl">$19.00</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>$19.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between border-t border-border/50 pt-3 font-heading text-base">
                <span>Total</span>
                <span>$19.00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checkout Form */}
            <div className="space-y-4">
          <Card className="border-border/70 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-lg">Payment Details</CardTitle>
              <CardDescription>Demo payment (simulated)</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                  <label htmlFor="card-number" className="text-sm font-medium">
                    Card Number
                  </label>
                  <Input
                    id="card-number"
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    defaultValue="4242 4242 4242 4242"
                    disabled
                    className="h-10 bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">Demo card (disabled field)</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="card-expiry" className="text-sm font-medium">
                      Expiry Date
                    </label>
                    <Input
                      id="card-expiry"
                      type="text"
                      placeholder="MM/YY"
                      defaultValue="12/26"
                      disabled
                      className="h-10 bg-muted"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="card-cvv" className="text-sm font-medium">
                      CVV
                    </label>
                    <Input
                      id="card-cvv"
                      type="text"
                      placeholder="123"
                      defaultValue="123"
                      disabled
                      className="h-10 bg-muted"
                    />
                  </div>
                </div>

                {errorMessage ? (
                  <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {errorMessage}
                  </div>
                ) : null}

                {successMessage ? (
                  <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                    {successMessage}
                  </div>
                ) : null}

                <Button type="submit" className="mt-4 h-10 w-full rounded-full" disabled={loading}>
                  {loading
                    ? "Processing..."
                    : book && book.price === 0
                    ? "Get for free"
                    : "Confirm Purchase"}
                </Button>

                <p className="text-xs text-muted-foreground">
                  This is a demo checkout. No real payment will be processed.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
