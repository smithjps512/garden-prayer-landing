// Team CTOS — shared types.
//
// The app does not have a name yet (the field in the product plan is blank),
// so it lives at /ctos and calls itself Encyclopedia for now.

export type Choice = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  prompt: string;
  choices: Choice[];
  /** null until the author marks one choice correct. */
  correctChoiceId: string | null;
};

/**
 * Public quizzes are listed on Encyclopedia. Private ones are reachable only
 * by their link, exactly as the user story describes.
 */
export type Visibility = "public" | "private";

export type Quiz = {
  id: string;
  title: string;
  /** The Encyclopedia topic this quiz belongs to, if any. */
  topicSlug: string | null;
  authorName: string;
  visibility: Visibility;
  questions: Question[];
  createdAt: number;
  /** Seeded quizzes ship with the app; the rest are built by the user. */
  seeded?: boolean;
};

export type PlayMode = "traditional" | "gamified";

export type Attempt = {
  id: string;
  quizId: string;
  quizTitle: string;
  mode: PlayMode;
  correct: number;
  total: number;
  /** Gamified only — traditional scoring is just right answers. */
  points: number;
  bestStreak: number;
  takenAt: number;
};

export type Source = {
  name: string;
  url?: string;
};

export type Topic = {
  slug: string;
  title: string;
  summary: string;
  /** Paragraphs of the article body. */
  body: string[];
  sources: Source[];
  /** Hue used for the topic's illustration and accents. */
  hue: number;
};

export type DB = {
  quizzes: Quiz[];
  attempts: Attempt[];
  /** No sign-in: no user story covers accounts, so we just remember a name. */
  displayName: string | null;
};
