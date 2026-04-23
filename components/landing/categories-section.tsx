import { landingCategories } from "@/lib/landing-data";

export function CategoriesSection() {
  return (
    <section id="categories" data-section className="border-y-2 border-slate-900/20 bg-[#efe8dc] py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="mt-25 max-w-[14ch] font-heading text-4xl leading-[1.02] tracking-tight text-slate-950 sm:text-5xl">
              Pick the shelf that matches your mood.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-700 sm:text-xl">
              Explore focused reading paths instead of endless browsing.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {landingCategories.map((category, index) => (
              <article
                key={category.name}
                className={`group relative overflow-hidden border border-slate-500 bg-white/95 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-5 hover:shadow-[0_20px_40px_rgba(15,23,42,0.14)] sm:p-6 $}`}
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-slate-900/80 transition-all duration-300 group-hover:w-2" />
                <div className="flex items-start justify-between gap-4 pl-3">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{category.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{category.description}</p>
                  </div>
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition-colors group-hover:border-slate-900 group-hover:text-slate-900">
                    {index + 1}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
