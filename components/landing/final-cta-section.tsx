import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section id="contact" data-section className="border-y-2 border-slate-900/20 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[2rem] border-2 border-slate-200 bg-[#0f243d] px-6 py-12 text-center text-white shadow-[0_26px_70px_rgba(7,13,24,0.34)] sm:px-10">
        <h2 data-stagger className="font-heading text-3xl tracking-tight sm:text-4xl">
          Build your next reading streak today
        </h2>
        <p data-stagger className="mx-auto mt-4 max-w-2xl text-slate-200">
          Explore a curated library, pick what matters to you, and read right away.
        </p>
        <Button
          asChild
          size="lg"
          data-stagger
          className="mt-8 rounded-full bg-amber-300 px-7 text-slate-900 hover:bg-amber-200"
        >
          <Link href="/store">Explore the Collection</Link>
        </Button>
      </div>
    </section>
  );
}
