import { landingCategories } from "@/lib/landing-data";

export function CategoriesSection() {
  return (
    <section id="categories" data-section className="border-y-2 border-slate-900/20 bg-[#efe8dc] py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p data-stagger className="text-xs font-semibold tracking-[0.22em] text-slate-500 uppercase">Categories</p>
        <h2 data-stagger className="mt-2 max-w-xl font-heading text-3xl tracking-tight text-slate-950 sm:text-4xl">
          Read by interest, not by chance
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {landingCategories.map((category) => (
            <article
              key={category.name}
              data-stagger
              className="rounded-2xl border border-slate-200 bg-white p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <h3 className="text-base font-semibold text-slate-900">{category.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{category.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
