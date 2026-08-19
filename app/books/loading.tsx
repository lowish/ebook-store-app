import { BookGridSkeleton } from "@/components/book-grid-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingBooksPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="mt-10 space-y-3">
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-6 w-96 max-w-full" />
      </div>

      <div className="mt-16 flex items-center justify-between gap-4 border-b border-border/70 pb-3">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-5 w-20" />
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="mt-12 space-y-6">
        <div className="border-b border-border/70 pb-3">
          <Skeleton className="h-6 w-32" />
        </div>
        <BookGridSkeleton count={8} />
      </div>
    </main>
  );
}
