"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#featured", label: "Featured" },
  { href: "#categories", label: "Categories" },
  { href: "#contact", label: "Contact" },
];

export function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#fcfaf5]/85 text-slate-900 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-heading text-lg tracking-tight sm:text-xl">
          Readora
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-slate-600 transition-colors hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild className="rounded-full bg-slate-900 px-5 text-white hover:bg-slate-800">
            <Link href="/store">Shop now</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex rounded-md p-2 text-slate-900 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-[#fcfaf5] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm text-slate-700"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-2 bg-slate-900 text-white hover:bg-slate-800">
              <Link href="/store" onClick={() => setIsOpen(false)}>
                Browse Store
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
