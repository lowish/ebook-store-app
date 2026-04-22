import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingBookDetailsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <Skeleton className="mb-6 h-9 w-36 rounded-full" />
      <section className="grid gap-8 rounded-3xl border border-border/70 bg-white p-6 md:grid-cols-[minmax(260px,360px)_1fr] md:p-8">
        <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-3/4" />
          <div className="pt-2">
            <Skeleton className="h-11 w-36 rounded-full" />
          </div>
        </div>
      </section>
    </main>
  );
}