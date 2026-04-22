import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section
      id="home"
      data-section
      className="relative isolate overflow-hidden border-b-2 border-slate-900/20 bg-[#f8f4eb]"
    >
      <div className="absolute inset-0 -z-20">
        <Image
          src="/covers/bookbackground.jpg"
          alt=""
          fill
          className="object-cover object-[74%_center] sm:object-right"
          sizes="100vw"
          priority
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(248,244,235,0.96)_0%,rgba(248,244,235,0.88)_36%,rgba(248,244,235,0.45)_56%,rgba(248,244,235,0.08)_74%,rgba(248,244,235,0)_100%)]" />
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
        <div className="space-y-6">
          <p data-stagger className="text-xs font-semibold tracking-[0.24em] text-slate-500 uppercase">
            Reading, without the friction
          </p>
          <h1 data-stagger className="max-w-2xl font-heading text-4xl leading-[1.04] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Find a book you actually want to finish.
          </h1>
          <p data-stagger className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Readora helps you discover quality ebooks fast, so you can spend less time searching and more time reading.
          </p>
          <div data-stagger className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full bg-slate-950 px-6 text-white hover:bg-slate-800">
              <Link href="/store">Browse Ebook Store</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-slate-300 bg-white px-6">
              <Link href="#featured">Explore Books</Link>
            </Button>
          </div>
        </div>

        <div aria-hidden className="hidden lg:block" />
      </div>
    </section>
  );
}
