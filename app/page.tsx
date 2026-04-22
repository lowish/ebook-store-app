import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingScrollAnimations } from "@/components/landing/landing-scroll-animations";
import { HeroSection } from "@/components/landing/hero-section";
import { CategoriesSection } from "@/components/landing/categories-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { DiscoverTextSection } from "@/components/landing/discover-text-section";
import { FeaturedBooksSection } from "@/components/landing/featured-books-section";
import { ShowcaseImageSection } from "@/components/landing/showcase-image-section";
import { FinalCtaSection } from "@/components/landing/final-cta-section";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f4eb] text-slate-900">
      <LandingNavbar />
      <LandingScrollAnimations />
      <HeroSection />
      <CategoriesSection />
      <HowItWorksSection />
      <ShowcaseImageSection />
      <DiscoverTextSection />
      <FeaturedBooksSection />
      <FinalCtaSection />
      <LandingFooter />
    </main>
  );
}
