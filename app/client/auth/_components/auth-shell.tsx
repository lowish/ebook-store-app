import type { ReactNode } from "react";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.08),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(17,24,39,0.08),transparent_28%),linear-gradient(to_bottom,rgba(255,255,255,1),rgba(250,250,250,1))]">
      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-6 sm:px-6 lg:px-8">
        <section className="grid w-full items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <div className="max-w-xl space-y-4">
              <h1 className="font-heading text-4xl leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="order-1 flex items-center justify-center lg:order-2">
            <div className="w-full max-w-[440px]">
              {children}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}