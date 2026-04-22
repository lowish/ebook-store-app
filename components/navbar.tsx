"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(currentQuery);
  const [hasStartedSearch, setHasStartedSearch] = useState(false);

  useEffect(() => {
    if (!hasStartedSearch) {
      return;
    }

    const term = query.trim();

    const timer = setTimeout(() => {
      if (!term) {
        router.replace("/books");
        return;
      }

      router.replace(`/books?q=${encodeURIComponent(term)}`);
    }, 180);

    return () => clearTimeout(timer);
  }, [query, hasStartedSearch, router, pathname]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const term = query.trim();
    setHasStartedSearch(true);

    if (!term) {
      router.replace("/books");
      return;
    }

    router.replace(`/books?q=${encodeURIComponent(term)}`);
  };

  if (isLandingPage) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-heading text-lg tracking-tight sm:text-xl">
          Readora
        </Link>

        <form onSubmit={handleSubmit} className="mx-1 flex-1 sm:mx-4">
          <SearchBar
            value={query}
            onValueChange={(value) => {
              setHasStartedSearch(true);
              setQuery(value);
            }}
            placeholder="Search in catalog"
          />
        </form>

        <Button asChild variant="outline" className="rounded-full px-4">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </header>
  );
}