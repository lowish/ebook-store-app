import { howItWorks } from "@/lib/landing-data";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" data-section className="border-y-2 border-slate-900/20">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p data-stagger className="text-xs font-semibold tracking-[0.22em] text-slate-500 uppercase">How it works</p>
      <h2 data-stagger className="mt-2 font-heading text-3xl tracking-tight text-slate-950 sm:text-4xl">
        Start reading in three steps
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {howItWorks.map((step, index) => (
          <article key={step.title} data-stagger className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
              {index + 1}
            </p>
            <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}
