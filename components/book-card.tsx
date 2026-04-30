import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Book } from "@/lib/books";
import { RatingStars } from "@/components/rating-stars";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="card-hover h-full border-border/70 bg-white py-0">
      <div className="relative aspect-[5/6] overflow-hidden rounded-t-xl border-b border-border/70 bg-muted/30">
        <Image
          src={book.cover}
          alt={`${book.title} cover`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2 text-lg">{book.title}</CardTitle>
        <CardDescription>{book.author}</CardDescription>
      </CardHeader>

      <CardContent className="pb-4">
        <RatingStars rating={book.rating} />
      </CardContent>

      <CardFooter className="mt-auto justify-between border-t border-border/70 bg-white">
        <p className="font-medium">${book.price}</p>
        <Button asChild variant="ghost" size="sm" className="rounded-full">
          <Link href={`/books/${book.id}`}>
            Checkout
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}