/**
 * The Readora catalog: 10 genres x 8 well-known books.
 *
 * This file is the *editorial* layer. Books were picked by recognition and
 * influence within their genre, not by search ranking, and each one is pinned
 * to a verified Open Library **work key** so the catalog cannot drift onto an
 * obscure edition.
 *
 * Every key below was resolved against the live Open Library search index and
 * checked to be the canonical record for that book (the one carrying the bulk
 * of the editions, a usable cover and, where available, a description). No
 * Open Library value is written here: at runtime, title, author, publication
 * year, cover and description all come from Open Library. The `title` and
 * `author` fields are Readora's own record of *which book was picked*, used to
 * document the list, to verify the key still points at the right work, and as a
 * fallback when Open Library has no value.
 *
 * Each book appears exactly once, under one primary genre.
 *
 * To swap a book: find its work key at `https://openlibrary.org/search.json`,
 * prefer the record with the highest `edition_count` that has a `cover_i`, and
 * keep the `id` stable so curated copy in `lib/catalog-curation.ts` follows it.
 */

export type CuratedBook = {
  /**
   * Stable slug. Used as the catalog id and as the curation key, so it must not
   * change when Open Library data shifts.
   */
  id: string;
  /** Primary genre. Must match a name in `CATALOG_GENRES`. */
  genre: string;
  /** The book as Readora lists it. Fallback when Open Library has no title. */
  title: string;
  /** The author as Readora lists them. Fallback when Open Library has none. */
  author: string;
  /** Verified Open Library work key. */
  openLibraryKey: string;
  /**
   * Open Library files some canonical works under their original-language
   * title, e.g. `Het Achterhuis` for *The Diary of a Young Girl*. Those records
   * are the right ones (they hold the editions and the cover), so the work key
   * stays and this flag makes the catalog display the English title instead.
   * Open Library's own title is still exposed as `openLibraryTitle`.
   */
  preferCuratedTitle?: boolean;
};

export const CURATED_BOOKS: CuratedBook[] = [
  // --- Fiction ---------------------------------------------------------------
  {
    id: "to-kill-a-mockingbird",
    genre: "Fiction",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    openLibraryKey: "/works/OL3140822W",
  },
  {
    id: "nineteen-eighty-four",
    genre: "Fiction",
    title: "Nineteen Eighty-Four",
    author: "George Orwell",
    openLibraryKey: "/works/OL1168083W",
  },
  {
    id: "the-great-gatsby",
    genre: "Fiction",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    openLibraryKey: "/works/OL468431W",
  },
  {
    id: "one-hundred-years-of-solitude",
    genre: "Fiction",
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    openLibraryKey: "/works/OL274505W",
    // Open Library title: "Cien años de soledad".
    preferCuratedTitle: true,
  },
  {
    id: "the-catcher-in-the-rye",
    genre: "Fiction",
    title: "The Catcher in the Rye",
    author: "J. D. Salinger",
    openLibraryKey: "/works/OL3335245W",
  },
  {
    id: "brave-new-world",
    genre: "Fiction",
    title: "Brave New World",
    author: "Aldous Huxley",
    openLibraryKey: "/works/OL64365W",
  },
  {
    id: "lord-of-the-flies",
    genre: "Fiction",
    title: "Lord of the Flies",
    author: "William Golding",
    openLibraryKey: "/works/OL455327W",
  },
  {
    id: "crime-and-punishment",
    genre: "Fiction",
    title: "Crime and Punishment",
    author: "Fyodor Dostoyevsky",
    openLibraryKey: "/works/OL166894W",
    // Open Library title: "Преступление и наказание".
    preferCuratedTitle: true,
  },
  // --- Self-Improvement ------------------------------------------------------
  {
    id: "atomic-habits",
    genre: "Self-Improvement",
    title: "Atomic Habits",
    author: "James Clear",
    openLibraryKey: "/works/OL17930368W",
  },
  {
    id: "the-7-habits-of-highly-effective-people",
    genre: "Self-Improvement",
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    openLibraryKey: "/works/OL2629977W",
  },
  {
    id: "how-to-win-friends-and-influence-people",
    genre: "Self-Improvement",
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    openLibraryKey: "/works/OL1063267W",
  },
  {
    id: "the-power-of-habit",
    genre: "Self-Improvement",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    openLibraryKey: "/works/OL16015154W",
  },
  {
    id: "mindset",
    genre: "Self-Improvement",
    title: "Mindset",
    author: "Carol S. Dweck",
    openLibraryKey: "/works/OL2003465W",
  },
  {
    id: "deep-work",
    genre: "Self-Improvement",
    title: "Deep Work",
    author: "Cal Newport",
    openLibraryKey: "/works/OL17713267W",
  },
  {
    id: "the-power-of-now",
    genre: "Self-Improvement",
    title: "The Power of Now",
    author: "Eckhart Tolle",
    openLibraryKey: "/works/OL5727686W",
  },
  {
    id: "grit",
    genre: "Self-Improvement",
    title: "Grit",
    author: "Angela Duckworth",
    openLibraryKey: "/works/OL17361140W",
  },
  // --- Business --------------------------------------------------------------
  {
    id: "good-to-great",
    genre: "Business",
    title: "Good to Great",
    author: "Jim Collins",
    openLibraryKey: "/works/OL3486275W",
  },
  {
    id: "the-lean-startup",
    genre: "Business",
    title: "The Lean Startup",
    author: "Eric Ries",
    openLibraryKey: "/works/OL16086010W",
  },
  {
    id: "rich-dad-poor-dad",
    genre: "Business",
    title: "Rich Dad, Poor Dad",
    author: "Robert T. Kiyosaki",
    openLibraryKey: "/works/OL2010879W",
  },
  {
    id: "the-innovators-dilemma",
    genre: "Business",
    title: "The Innovator's Dilemma",
    author: "Clayton M. Christensen",
    openLibraryKey: "/works/OL1999873W",
  },
  {
    id: "the-intelligent-investor",
    genre: "Business",
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    openLibraryKey: "/works/OL273184W",
  },
  {
    id: "think-and-grow-rich",
    genre: "Business",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    openLibraryKey: "/works/OL527464W",
  },
  {
    id: "shoe-dog",
    genre: "Business",
    title: "Shoe Dog",
    author: "Phil Knight",
    openLibraryKey: "/works/OL17825802W",
  },
  {
    id: "start-with-why",
    genre: "Business",
    title: "Start with Why",
    author: "Simon Sinek",
    openLibraryKey: "/works/OL13806374W",
    // Open Library stores this one lowercased.
    preferCuratedTitle: true,
  },
  // --- Technology ------------------------------------------------------------
  {
    id: "introduction-to-algorithms",
    genre: "Technology",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    openLibraryKey: "/works/OL4781294W",
  },
  {
    id: "clean-code",
    genre: "Technology",
    title: "Clean Code",
    author: "Robert C. Martin",
    openLibraryKey: "/works/OL17618370W",
  },
  {
    id: "the-mythical-man-month",
    genre: "Technology",
    title: "The Mythical Man-Month",
    author: "Frederick P. Brooks Jr.",
    openLibraryKey: "/works/OL3510570W",
  },
  {
    id: "design-patterns",
    genre: "Technology",
    title: "Design Patterns",
    author: "Erich Gamma",
    openLibraryKey: "/works/OL6030812W",
  },
  {
    id: "the-c-programming-language",
    genre: "Technology",
    title: "The C Programming Language",
    author: "Brian W. Kernighan",
    openLibraryKey: "/works/OL4617640W",
  },
  {
    id: "the-innovators",
    genre: "Technology",
    title: "The Innovators",
    author: "Walter Isaacson",
    openLibraryKey: "/works/OL17074268W",
  },
  {
    id: "code",
    genre: "Technology",
    title: "Code",
    author: "Charles Petzold",
    openLibraryKey: "/works/OL1972516W",
  },
  {
    id: "godel-escher-bach",
    genre: "Technology",
    title: "Gödel, Escher, Bach",
    author: "Douglas R. Hofstadter",
    openLibraryKey: "/works/OL716850W",
  },
  // --- Science ---------------------------------------------------------------
  {
    id: "a-brief-history-of-time",
    genre: "Science",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    openLibraryKey: "/works/OL1892617W",
  },
  {
    id: "the-selfish-gene",
    genre: "Science",
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    openLibraryKey: "/works/OL1966488W",
  },
  {
    id: "cosmos",
    genre: "Science",
    title: "Cosmos",
    author: "Carl Sagan",
    openLibraryKey: "/works/OL15829966W",
  },
  {
    id: "on-the-origin-of-species",
    genre: "Science",
    title: "On the Origin of Species",
    author: "Charles Darwin",
    openLibraryKey: "/works/OL515051W",
    // Open Library title is the full 1859 one: "On the origin of species by
    // means of natural selection, or, The preservation of favoured races...".
    preferCuratedTitle: true,
  },
  {
    id: "a-short-history-of-nearly-everything",
    genre: "Science",
    title: "A Short History of Nearly Everything",
    author: "Bill Bryson",
    openLibraryKey: "/works/OL74128W",
    // Open Library stores this one lowercased.
    preferCuratedTitle: true,
  },
  {
    id: "silent-spring",
    genre: "Science",
    title: "Silent Spring",
    author: "Rachel Carson",
    openLibraryKey: "/works/OL1884862W",
  },
  {
    id: "the-double-helix",
    genre: "Science",
    title: "The Double Helix",
    author: "James D. Watson",
    openLibraryKey: "/works/OL2125469W",
    // Open Library stores this one lowercased.
    preferCuratedTitle: true,
  },
  {
    id: "the-immortal-life-of-henrietta-lacks",
    genre: "Science",
    title: "The Immortal Life of Henrietta Lacks",
    author: "Rebecca Skloot",
    openLibraryKey: "/works/OL13850788W",
  },
  // --- History ---------------------------------------------------------------
  {
    id: "sapiens",
    genre: "History",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    openLibraryKey: "/works/OL17075811W",
  },
  {
    id: "guns-germs-and-steel",
    genre: "History",
    title: "Guns, Germs, and Steel",
    author: "Jared Diamond",
    openLibraryKey: "/works/OL276558W",
  },
  {
    id: "the-diary-of-a-young-girl",
    genre: "History",
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    openLibraryKey: "/works/OL266178W",
    // Open Library title: "Het Achterhuis".
    preferCuratedTitle: true,
  },
  {
    id: "spqr",
    genre: "History",
    title: "SPQR",
    author: "Mary Beard",
    openLibraryKey: "/works/OL17340134W",
  },
  {
    id: "the-rise-and-fall-of-the-third-reich",
    genre: "History",
    title: "The Rise and Fall of the Third Reich",
    author: "William L. Shirer",
    openLibraryKey: "/works/OL47181W",
  },
  {
    id: "a-peoples-history-of-the-united-states",
    genre: "History",
    title: "A People's History of the United States",
    author: "Howard Zinn",
    openLibraryKey: "/works/OL50283W",
  },
  {
    id: "the-silk-roads",
    genre: "History",
    title: "The Silk Roads",
    author: "Peter Frankopan",
    openLibraryKey: "/works/OL19666939W",
  },
  {
    id: "team-of-rivals",
    genre: "History",
    title: "Team of Rivals",
    author: "Doris Kearns Goodwin",
    openLibraryKey: "/works/OL1856010W",
  },
  // --- Philosophy ------------------------------------------------------------
  {
    id: "meditations",
    genre: "Philosophy",
    title: "Meditations",
    author: "Marcus Aurelius",
    openLibraryKey: "/works/OL1317211W",
  },
  {
    id: "the-republic",
    genre: "Philosophy",
    title: "The Republic",
    author: "Plato",
    openLibraryKey: "/works/OL51831W",
    // Open Library title: "πολιτεία".
    preferCuratedTitle: true,
  },
  {
    id: "beyond-good-and-evil",
    genre: "Philosophy",
    title: "Beyond Good and Evil",
    author: "Friedrich Nietzsche",
    openLibraryKey: "/works/OL98174W",
    // Open Library title: "Jenseits von Gut und Böse".
    preferCuratedTitle: true,
  },
  {
    id: "nicomachean-ethics",
    genre: "Philosophy",
    title: "Nicomachean Ethics",
    author: "Aristotle",
    openLibraryKey: "/works/OL8273964W",
  },
  {
    id: "the-prince",
    genre: "Philosophy",
    title: "The Prince",
    author: "Niccolò Machiavelli",
    openLibraryKey: "/works/OL1089297W",
  },
  {
    id: "critique-of-pure-reason",
    genre: "Philosophy",
    title: "Critique of Pure Reason",
    author: "Immanuel Kant",
    openLibraryKey: "/works/OL99844W",
    // Open Library title: "Kritik der reinen Vernunft".
    preferCuratedTitle: true,
  },
  {
    id: "the-myth-of-sisyphus",
    genre: "Philosophy",
    title: "The Myth of Sisyphus",
    author: "Albert Camus",
    openLibraryKey: "/works/OL1230690W",
    // Open Library title: "The Myth of Sisyphus and Other Essays".
    preferCuratedTitle: true,
  },
  {
    id: "the-social-contract",
    genre: "Philosophy",
    title: "The Social Contract",
    author: "Jean-Jacques Rousseau",
    openLibraryKey: "/works/OL80609W",
    // Open Library title: "Du contrat social".
    preferCuratedTitle: true,
  },
  // --- Psychology ------------------------------------------------------------
  {
    id: "thinking-fast-and-slow",
    genre: "Psychology",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    openLibraryKey: "/works/OL15992072W",
    // Open Library stores this one lowercased.
    preferCuratedTitle: true,
  },
  {
    id: "mans-search-for-meaning",
    genre: "Psychology",
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    openLibraryKey: "/works/OL1268413W",
    // Open Library title: "... Trotzdem Ja zum Leben sagen".
    preferCuratedTitle: true,
  },
  {
    id: "the-interpretation-of-dreams",
    genre: "Psychology",
    title: "The Interpretation of Dreams",
    author: "Sigmund Freud",
    openLibraryKey: "/works/OL1069300W",
    // Open Library title: "Die Traumdeutung".
    preferCuratedTitle: true,
  },
  {
    id: "influence",
    genre: "Psychology",
    title: "Influence",
    author: "Robert B. Cialdini",
    openLibraryKey: "/works/OL3902892W",
  },
  {
    id: "the-body-keeps-the-score",
    genre: "Psychology",
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    openLibraryKey: "/works/OL18147687W",
  },
  {
    id: "emotional-intelligence",
    genre: "Psychology",
    title: "Emotional Intelligence",
    author: "Daniel Goleman",
    openLibraryKey: "/works/OL1878267W",
  },
  {
    id: "quiet",
    genre: "Psychology",
    title: "Quiet",
    author: "Susan Cain",
    openLibraryKey: "/works/OL16484595W",
  },
  {
    id: "predictably-irrational",
    genre: "Psychology",
    title: "Predictably Irrational",
    author: "Dan Ariely",
    openLibraryKey: "/works/OL9302660W",
  },
  // --- Education -------------------------------------------------------------
  {
    id: "pedagogy-of-the-oppressed",
    genre: "Education",
    title: "Pedagogy of the Oppressed",
    author: "Paulo Freire",
    openLibraryKey: "/works/OL1870518W",
  },
  {
    id: "how-to-read-a-book",
    genre: "Education",
    title: "How to Read a Book",
    author: "Mortimer J. Adler",
    openLibraryKey: "/works/OL487444W",
  },
  {
    id: "make-it-stick",
    genre: "Education",
    title: "Make It Stick",
    author: "Peter C. Brown",
    openLibraryKey: "/works/OL17879515W",
  },
  {
    id: "mindstorms",
    genre: "Education",
    title: "Mindstorms",
    author: "Seymour Papert",
    openLibraryKey: "/works/OL3368926W",
  },
  {
    id: "educated",
    genre: "Education",
    title: "Educated",
    author: "Tara Westover",
    openLibraryKey: "/works/OL18139176W",
  },
  {
    id: "democracy-and-education",
    genre: "Education",
    title: "Democracy and Education",
    author: "John Dewey",
    openLibraryKey: "/works/OL111359W",
  },
  {
    id: "deschooling-society",
    genre: "Education",
    title: "Deschooling Society",
    author: "Ivan Illich",
    openLibraryKey: "/works/OL2848901W",
  },
  {
    id: "emile",
    genre: "Education",
    title: "Emile, or On Education",
    author: "Jean-Jacques Rousseau",
    openLibraryKey: "/works/OL80613W",
    // Open Library title: "Emile or Education".
    preferCuratedTitle: true,
  },
  // --- Romance ---------------------------------------------------------------
  {
    id: "pride-and-prejudice",
    genre: "Romance",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    openLibraryKey: "/works/OL66554W",
  },
  {
    id: "jane-eyre",
    genre: "Romance",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    openLibraryKey: "/works/OL1095427W",
  },
  {
    id: "outlander",
    genre: "Romance",
    title: "Outlander",
    author: "Diana Gabaldon",
    openLibraryKey: "/works/OL3261155W",
  },
  {
    id: "me-before-you",
    genre: "Romance",
    title: "Me Before You",
    author: "Jojo Moyes",
    openLibraryKey: "/works/OL28353073W",
  },
  {
    id: "the-notebook",
    genre: "Romance",
    title: "The Notebook",
    author: "Nicholas Sparks",
    openLibraryKey: "/works/OL54797W",
  },
  {
    id: "wuthering-heights",
    genre: "Romance",
    title: "Wuthering Heights",
    author: "Emily Brontë",
    openLibraryKey: "/works/OL21177W",
  },
  {
    id: "gone-with-the-wind",
    genre: "Romance",
    title: "Gone With the Wind",
    author: "Margaret Mitchell",
    openLibraryKey: "/works/OL267933W",
  },
  {
    id: "the-time-travelers-wife",
    genre: "Romance",
    title: "The Time Traveler's Wife",
    author: "Audrey Niffenegger",
    openLibraryKey: "/works/OL4720160W",
  },
];
