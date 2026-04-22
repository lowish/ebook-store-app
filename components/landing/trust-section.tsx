import { landingTestimonial, trustStats } from "@/lib/landing-data";

export function TrustSection() {
  return (
    <section id="trust" data-section className="bg-[#f3eee4] py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p data-stagger className="text-xs font-semibold tracking-[0.22em] text-slate-500 uppercase">Trusted by readers</p>
        <h2 data-stagger className="mt-2 font-heading text-3xl tracking-tight text-slate-950 sm:text-4xl">
          Reliable picks, clear ratings, real momentum
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {trustStats.map((item) => (
            <article
              key={item.label}
              data-stagger
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center"
            >
              <p className="text-3xl font-semibold text-slate-900">{item.value}</p>
              <p className="mt-1 text-sm text-slate-600">{item.label}</p>
            </article>
          ))}
        </div>

        <article
          data-stagger
          className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm"
        >
          <p className="max-w-3xl text-base leading-relaxed">
            &ldquo;{landingTestimonial.quote}&rdquo;
          </p>
          <p className="mt-3 text-sm font-semibold text-slate-900">
            {landingTestimonial.name} <span className="font-normal text-slate-500">{landingTestimonial.role}</span>
          </p>
        </article>
      </div>
    </section>
  );
}
