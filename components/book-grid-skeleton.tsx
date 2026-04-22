import { Skeleton } from "@/components/ui/skeleton";

type BookGridSkeletonProps = {
  count?: number;
};

export function BookGridSkeleton({ count = 8 }: BookGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border border-border/70 bg-white"
        >
          <Skeleton className="aspect-[5/6] rounded-none" />
          <div className="space-y-3 p-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}