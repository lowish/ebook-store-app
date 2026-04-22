import type { Metadata } from "next";
import { Suspense } from "react";
import { Fraunces, Manrope } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Readora | Minimal Ebook Store",
  description: "A modern minimalist ebook storefront built with Next.js and shadcn/ui.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-60 bg-[radial-gradient(circle_at_15%_20%,rgba(0,0,0,0.08),transparent_45%),radial-gradient(circle_at_85%_10%,rgba(0,0,0,0.06),transparent_42%)]" />
          {children}
        </div>
      </body>
    </html>
  );
}
