export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  rating?: number | null;
  cover: string;
  featured?: boolean;
};

export const books: Book[] = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    description:
      "Tiny changes that compound into remarkable results through clear systems and habits.",
    price: 19,
    rating: null,
    cover: "/covers/AtomicHabits.jpg",
    featured: true,
  },
  {
    id: "the-48-laws-of-power",
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    description:
      "A sharp guide to strategy, influence, and understanding power dynamics.",
    price: 24,
    rating: null,
    cover: "/covers/LawsofPower.jpg",
    featured: true,
  },
  {
    id: "the-daily-stoic",
    title: "The Daily Stoic",
    author: "Ryan Holiday",
    description:
      "366 meditations on wisdom, perseverance, and the art of living.",
    price: 17,
    rating: null,
    cover: "/covers/DailyStoic.jpg",
    featured: true,
  },
  {
    id: "the-subtle-art-of-not-giving-a-fuck",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    description:
      "A counterintuitive approach to living a good life by focusing on what actually matters.",
    price: 21,
    rating: null,
    cover: "/covers/NotGivingAFuck.jpg",
    featured: true,
  },
  {
    id: "the-power",
    title: "The Power",
    author: "Naomi Alderman",
    description:
      "A bold story about how power changes society, identity, and control.",
    price: 15,
    rating: null,
    cover: "/covers/the-power.jpg",
    featured: true,
  },
];

export function getBookById(id: string) {
  return books.find((book) => book.id === id);
}