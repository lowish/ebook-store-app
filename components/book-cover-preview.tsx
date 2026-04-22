"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand, X } from "lucide-react";

type BookCoverPreviewProps = {
  src: string;
  alt: string;
};

export function BookCoverPreview({ src, alt }: BookCoverPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border/70 bg-muted/30 text-left"
        aria-label="Open cover image in fullscreen"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, 360px"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-end bg-gradient-to-t from-black/45 to-transparent p-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-xs font-medium">
            <Expand className="size-3.5" />
            Fullscreen
          </span>
        </div>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 bg-black/90 p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen cover image"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 z-10 inline-flex size-10 items-center justify-center rounded-full border border-white/35 bg-black/40 text-white hover:bg-black/70"
            aria-label="Close fullscreen image"
          >
            <X className="size-5" />
          </button>

          <div
            className="relative mx-auto h-full w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
