import { BookGridSkeleton } from "@/components/book-grid-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingBooksPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-full rounded-full sm:max-w-sm" />
      </div>
      <BookGridSkeleton />
    </main>
  );
}