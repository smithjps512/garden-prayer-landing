// TrailRider — shared types
// Built from the student user stories for "chicken.nugg" / TrailRider.

/** MTB rating system: green circle, blue square, black diamond, double black. */
export type Difficulty = "green" | "blue" | "black" | "double-black";

export type Review = {
  id: string;
  author: string;
  rating: number; // 1-5
  body: string;
};

export type Trail = {
  id: string;
  slug: string;
  name: string;
  area: string;
  lat: number;
  lng: number;
  difficulty: Difficulty;
  lengthMiles: number;
  elevationGainFt: number;
  summary: string;
  /** "What the trail improves" — straight out of the map user story. */
  improves: string[];
  reviews: Review[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  /**
   * DEMO ONLY. Stored in the browser in plain text so the prototype runs with
   * zero setup. A real build hashes passwords on a server and never ships them
   * to the client. See src/lib/trailrider/README.md.
   */
  password: string;
};

export type ListingCategory =
  | "Complete bike"
  | "Frame"
  | "Wheels & tires"
  | "Helmet"
  | "Gloves & apparel"
  | "Components"
  | "Other";

export type Listing = {
  id: string;
  title: string;
  category: ListingCategory;
  priceUsd: number;
  condition: "New" | "Like new" | "Good" | "Well used";
  description: string;
  /** The "proof photo" acceptance criterion from the Sell story. Required. */
  photo: string;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  meetupArea: string;
  createdAt: number;
  status: "available" | "sold";
};

export type Message = {
  id: string;
  threadId: string;
  fromUserId: string;
  fromName: string;
  body: string;
  createdAt: number;
};

export type Thread = {
  id: string;
  listingId: string;
  listingTitle: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  createdAt: number;
};

export type CoachMessage = {
  id: string;
  role: "user" | "coach";
  body: string;
  createdAt: number;
};

export type CoachState = {
  /** Questions asked inside the current window. */
  used: number;
  /** Timestamp of the first question in the current window, or null. */
  windowStartedAt: number | null;
  messages: CoachMessage[];
};

export type DB = {
  users: User[];
  currentUserId: string | null;
  listings: Listing[];
  threads: Thread[];
  messages: Message[];
  /** Coach state is per-user: userId -> state. */
  coach: Record<string, CoachState>;
};
