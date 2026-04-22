export type LandingPreviewBook = {
  id: number;
  title: string;
  author: string;
  cover: string;
  category: string;
  description: string;
  price: number;
};

export type LandingCategory = {
  name: string;
  description: string;
};

export const landingPreviewBooks: LandingPreviewBook[] = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "/covers/AtomicHabits.jpg",
    category: "Self-help",
    description: "A practical guide for building better habits with tiny daily changes.",
    price: 12.99,
  },
  {
    id: 2,
    title: "Deep Work",
    author: "Cal Newport",
    cover: "/covers/DeepWork.jpg",
    category: "Business",
    description: "Learn focused work systems that help you produce high-value results.",
    price: 14.49,
  },
  {
    id: 3,
    title: "The Daily Stoic",
    author: "Ryan Holiday",
    cover: "/covers/DailyStoic.jpg",
    category: "Education",
    description: "365 concise insights to sharpen perspective, discipline, and calm.",
    price: 11.5,
  },
];

export const landingCategories: LandingCategory[] = [
  {
    name: "Fiction",
    description: "Immersive stories that keep readers turning pages.",
  },
  {
    name: "Business",
    description: "Actionable lessons for leadership and growth.",
  },
  {
    name: "Self-help",
    description: "Habits, mindset, and productivity for daily progress.",
  },
  {
    name: "Education",
    description: "Learn modern skills through curated digital books.",
  },
];

export const howItWorks = [
  {
    title: "Browse books",
    description: "Scan featured picks and categories in seconds.",
  },
  {
    title: "Choose what interests you",
    description: "Open details, compare options, and pick your next read.",
  },
  {
    title: "Start reading instantly",
    description: "Jump straight into a focused reading experience.",
  },
];

export const landingTestimonial = {
  quote:
    "I usually lose focus with long reads. Readora helps me find something useful fast and actually finish it.",
  name: "Maya R.",
  role: "Product Designer",
};

export type LandingFooterLink = {
  label: string;
  href: string;
};

export const landingFooterQuickLinks: LandingFooterLink[] = [
  { label: "Home", href: "#home" },
  { label: "Featured Books", href: "#featured" },
  { label: "Categories", href: "#categories" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Reader Trust", href: "#trust" },
  { label: "Explore Books", href: "/store" },
];

export const landingFooterResources: LandingFooterLink[] = [
  { label: "Book Showcase", href: "/showcase" },
  { label: "Top Picks", href: "/books" },
  { label: "Reading Blog", href: "#" },
  { label: "Help Center", href: "#" },
];

export const landingFooterContact = {
  phones: ["09876543210"],
  email: "hello@readora.com",
  location: "Angeles City, Pampanga",
  hours: "8am-5pm / Everyday",
};

export const landingFooterSocials: LandingFooterLink[] = [
  { label: "Instagram", href: "#" },
  { label: "GitHub", href: "#" },
];
