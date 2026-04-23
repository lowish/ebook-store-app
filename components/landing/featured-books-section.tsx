import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";


const books = [
  {
    title: "Atomic Habits",
    image: "book1",
    price: 15.5,
  },
  {
    title: "The Subtle Art of Not Giving a Fuck",
    image: "book2",
    price: 11.5,
  },
  {
    title: "The 48 Laws of Power",
    image: "book3",
    price: 10.99,
  },
] as const;

const coverByImageId: Record<(typeof books)[number]["image"], string> = {
  book1: "/covers/AtomicHabits.jpg",
  book2: "/covers/NotGivingAFuck.jpg",
  book3: "/covers/LawsofPower.jpg",
};

const categories = ["Fiction", "Business", "Self-help", "Education"] as const;

export function FeaturedBooksSection() {
  return (
    <section id="featured" data-section className="border-y-2 border-slate-900/20">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-8">
          <aside data-stagger className="lg:pr-4">
            <h3 className="max-w-[14ch] font-heading text-4xl leading-[1.05] tracking-tight text-slate-950 sm:text-5xl">
              Transform reading into daily momentum.
            </h3>
            <ul className="mt-15 space-y-3 text-l text-slate-900">
              {categories.map((category) => (
                <li key={category} className="font-medium">
                  {category}
                </li>
              ))}
            </ul>
            <div data-stagger className="mt-8 flex justify-start">
              <Button asChild variant="outline" className="rounded-full border-slate-500 bg-white">
                <Link href="/store">View Collection</Link>
              </Button>
            </div>
          </aside>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <Link
                key={book.title}
                href="/store"
                className="group cursor-pointer rounded-m border border-slate-200 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(15,23,42,0.14)]"
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-m">
                  <Image
                    src={coverByImageId[book.image]}
                    alt={`${book.title} cover`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-slate-900">{book.title}</h3>
                    <ArrowUpRight aria-hidden className="h-4 w-4 stroke-[2.5] text-slate-500" />
                  </div>
                  <span className="rounded-full border border-slate-300 px-3 py-1 text-sm font-semibold text-slate-900">
                    ${book.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
