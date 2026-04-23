import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function FinalCtaSection() {
  return (
    <section
      id="contact"
      data-section
      className="relative overflow-hidden border-y-2 border-slate-900/20 px-4 py-18 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-14 left-[12%] h-44 w-44 rounded-full bg-cyan-300/18 blur-3xl" />
        <div className="absolute -bottom-20 right-[10%] h-56 w-56 rounded-full bg-amber-200/16 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.5fr] lg:items-end">
          <div className="text-white/90">
            <p data-stagger className="mt-5 max-w-sm text-xl leading-relaxed text-slate-900">
              Build a focused reading habit with carefully selected books designed to keep you consistent.
            </p>
            <p data-stagger className="mt-5 max-w-sm text-xl leading-relaxed text-slate-900">
              Start with one chapter today and turn momentum into a lasting habit.
            </p>
            </div>

            {/* RIGHT SIDE */}
      <div className="flex flex-col text-right lg:items-end">
  
            {/* TEXT TOP RIGHT */}
  <h2
    data-stagger
    className="font-heading text-4xl tracking-tight text-black sm:text-5xl lg:text-6xl"
  >
    Start your next
    <span className="block text-black">reading breakthrough.</span>
  </h2>

  {/* IMAGE BOTTOM RIGHT */}
  <div data-stagger className="mt-10 w-full max-w-sm">
    <div className="ml-auto relative overflow-hidden border border-[#c9c4b8] bg-[#f4f2ec] p-3">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src="/covers/readbook.jpg"
          alt="Open book with hands"
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
          sizes="(max-width: 640px) 90vw, 280px"
        />
      </div>
    </div>
  </div>

</div>                  
        </div>
      </div>
    </section>
  );
}
