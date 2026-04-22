export function DiscoverTextSection() {
  return (
    <section
      id="discover"
      data-section
      className="relative overflow-hidden border-y-2 border-slate-900/20 bg-[radial-gradient(circle_at_50%_20%,#fbe9bf_0%,#f8f4eb_48%,#f8f4eb_100%)] py-10 sm:py-35"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-2 lg:px-8">
        <div className="mt-6 overflow-hidden">
          <h2
            data-discover-text
            className="font-heading text-[clamp(2.5rem,12vw,12rem)] leading-[0.86] font-normal tracking-[-0.04em] text-slate-950"
          >
            discover.
          </h2>
        </div>
      </div>
    </section>
  );
}