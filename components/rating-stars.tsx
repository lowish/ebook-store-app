import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type RatingStarsProps = {
  rating?: number | null;
  className?: string;
};

export function RatingStars({ rating, className }: RatingStarsProps) {
  if (rating == null) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <span className="text-sm text-muted-foreground">No ratings yet</span>
      </div>
    );
  }

  const fullStars = Math.floor(rating);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => {
          const isFilled = index < fullStars;

          return (
            <Star
              key={index}
              className={cn(
                "size-4",
                isFilled ? "fill-foreground text-foreground" : "text-muted-foreground"
              )}
            />
          );
        })}
      </div>
      <span className="text-sm text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
}