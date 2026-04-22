import Image from "next/image";

export function ShowcaseImageSection() {
  return (
    <section id="showcase" data-section className="border-y-2 border-slate-900/20 bg-[#f3f0ea] py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-4xl leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            <span className="block">Read with purpose.</span>
            <span className="block">Grow with every page.</span>
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-[0_24px_50px_rgba(15,23,42,0.14)]">
          <div id="showcase-img" className="relative aspect-[16/10] w-full will-change-transform">
            <Image
              src="/covers/book-section.jpg"
              alt="Stacked books on a shelf"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          </div>
        </div>

        <div id="showcase-desc" className="mx-auto mt-20 max-w-3xl text-center text-slate-900">
          <p className="showcase-desc-stagger text-base leading-relaxed sm:text-3xl">
            Discover books that challenge your thinking, refine your perspective, and bring purpose to every page.
          </p>
        </div>
      </div>
    </section>
  );
}