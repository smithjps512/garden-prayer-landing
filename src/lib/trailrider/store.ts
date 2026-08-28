"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  CoachState,
  DB,
  Listing,
  Message,
  Thread,
  User,
} from "./types";
import { SEED_LISTINGS } from "./seed";

/**
 * TrailRider's data layer.
 *
 * Everything lives in the browser's localStorage so the prototype runs with no
 * server, no database and no API keys — open the page and it works. Every read
 * and write in the app goes through this one file, so swapping in a real
 * database later means rewriting this file and nothing else.
 */

const KEY = "trailrider:v1";

function emptyDB(): DB {
  return {
    users: [],
    currentUserId: null,
    listings: SEED_LISTINGS,
    threads: [],
    messages: [],
    coach: {},
  };
}

function read(): DB {
  if (typeof window === "undefined") return emptyDB();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyDB();
    return { ...emptyDB(), ...(JSON.parse(raw) as DB) };
  } catch {
    return emptyDB();
  }
}

function write(db: DB) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(db));
  } catch {
    // Storage full or blocked (private browsing). The app keeps working for
    // this session, the data just will not survive a refresh.
  }
  listeners.forEach((fn) => fn());
}

const listeners = new Set<() => void>();

/**
 * Subscribe a component to the database. Returns null until the browser has
 * mounted, because localStorage does not exist during server rendering.
 */
export function useDB() {
  const [db, setDb] = useState<DB | null>(null);

  useEffect(() => {
    const sync = () => setDb(read());
    sync();
    listeners.add(sync);
    window.addEventListener("storage", sync);
    return () => {
      listeners.delete(sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = useCallback((fn: (draft: DB) => DB) => {
    write(fn(read()));
  }, []);

  return { db, update };
}

export function id(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

/* ------------------------------------------------------------------ */
/* Accounts — from Lincoln's log in / sign up story                    */
/* ------------------------------------------------------------------ */

export function currentUser(db: DB): User | null {
  if (!db.currentUserId) return null;
  return db.users.find((u) => u.id === db.currentUserId) ?? null;
}

export function signUp(
  db: DB,
  input: { name: string; email: string; password: string }
): { db: DB } | { error: string } {
  const email = input.email.trim().toLowerCase();
  if (!input.name.trim()) return { error: "Enter your name." };
  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: "Enter a valid email address." };
  if (input.password.length < 6)
    return { error: "Password must be at least 6 characters." };
  if (db.users.some((u) => u.email === email))
    return { error: "An account already uses that email. Try logging in." };

  const user: User = {
    id: id("u"),
    name: input.name.trim(),
    email,
    password: input.password,
  };
  return { db: { ...db, users: [...db.users, user], currentUserId: user.id } };
}

export function logIn(
  db: DB,
  input: { email: string; password: string }
): { db: DB } | { error: string } {
  const email = input.email.trim().toLowerCase();
  const user = db.users.find((u) => u.email === email);
  if (!user || user.password !== input.password)
    return { error: "We could not find an account with that email and password." };
  return { db: { ...db, currentUserId: user.id } };
}

export function logOut(db: DB): DB {
  return { ...db, currentUserId: null };
}

/* ------------------------------------------------------------------ */
/* Store — from the Sell and Buy stories                               */
/* ------------------------------------------------------------------ */

export function addListing(
  db: DB,
  seller: User,
  input: Omit<
    Listing,
    "id" | "sellerId" | "sellerName" | "sellerEmail" | "createdAt" | "status"
  >
): DB {
  const listing: Listing = {
    ...input,
    id: id("l"),
    sellerId: seller.id,
    sellerName: seller.name,
    sellerEmail: seller.email,
    createdAt: Date.now(),
    status: "available",
  };
  return { ...db, listings: [listing, ...db.listings] };
}

export function markSold(db: DB, listingId: string): DB {
  return {
    ...db,
    listings: db.listings.map((l) =>
      l.id === listingId ? { ...l, status: "sold" as const } : l
    ),
  };
}

/* ------------------------------------------------------------------ */
/* Messaging — the piece both the Buy and Sell stories depend on       */
/* ------------------------------------------------------------------ */

/** Finds the existing buyer/seller thread for a listing, or creates one. */
export function openThread(db: DB, listing: Listing, buyer: User): { db: DB; threadId: string } {
  const existing = db.threads.find(
    (t) => t.listingId === listing.id && t.buyerId === buyer.id
  );
  if (existing) return { db, threadId: existing.id };

  const thread: Thread = {
    id: id("th"),
    listingId: listing.id,
    listingTitle: listing.title,
    buyerId: buyer.id,
    buyerName: buyer.name,
    sellerId: listing.sellerId,
    sellerName: listing.sellerName,
    createdAt: Date.now(),
  };
  return { db: { ...db, threads: [thread, ...db.threads] }, threadId: thread.id };
}

export function sendMessage(
  db: DB,
  threadId: string,
  from: User,
  body: string
): DB {
  const message: Message = {
    id: id("m"),
    threadId,
    fromUserId: from.id,
    fromName: from.name,
    body: body.trim(),
    createdAt: Date.now(),
  };
  return { ...db, messages: [...db.messages, message] };
}

export function threadsForUser(db: DB, userId: string) {
  return db.threads.filter((t) => t.buyerId === userId || t.sellerId === userId);
}

export function messagesInThread(db: DB, threadId: string) {
  return db.messages
    .filter((m) => m.threadId === threadId)
    .sort((a, b) => a.createdAt - b.createdAt);
}

/* ------------------------------------------------------------------ */
/* Coach — Drew's health AI story, including the 48-hour lock          */
/* ------------------------------------------------------------------ */

/** From the user story: 5 questions, then locked for 48 hours. */
export const QUESTION_LIMIT = 5;
export const WINDOW_MS = 48 * 60 * 60 * 1000;

export function emptyCoachState(): CoachState {
  return { used: 0, windowStartedAt: null, messages: [] };
}

export function coachStateFor(db: DB, userId: string): CoachState {
  return db.coach[userId] ?? emptyCoachState();
}

export type CoachAvailability = {
  used: number;
  remaining: number;
  locked: boolean;
  /** When the window resets, or null if no window is open. */
  unlocksAt: number | null;
};

/**
 * Works out where the rider stands right now.
 *
 * The window opens on the first question. Once it has been 48 hours since
 * that first question, the count resets and the rider gets 5 more.
 */
export function availability(state: CoachState, now = Date.now()): CoachAvailability {
  if (state.windowStartedAt === null) {
    return { used: 0, remaining: QUESTION_LIMIT, locked: false, unlocksAt: null };
  }
  const unlocksAt = state.windowStartedAt + WINDOW_MS;
  if (now >= unlocksAt) {
    // The window expired — this is a fresh set of 5.
    return { used: 0, remaining: QUESTION_LIMIT, locked: false, unlocksAt: null };
  }
  const remaining = Math.max(0, QUESTION_LIMIT - state.used);
  return { used: state.used, remaining, locked: remaining === 0, unlocksAt };
}

/** Records a question and its answer, opening or resetting the window as needed. */
export function recordCoachExchange(
  db: DB,
  userId: string,
  question: string,
  answer: string,
  now = Date.now()
): DB {
  const state = coachStateFor(db, userId);
  const windowExpired =
    state.windowStartedAt !== null && now >= state.windowStartedAt + WINDOW_MS;
  const startingFresh = state.windowStartedAt === null || windowExpired;

  const next: CoachState = {
    used: startingFresh ? 1 : state.used + 1,
    windowStartedAt: startingFresh ? now : state.windowStartedAt,
    messages: [
      ...state.messages,
      { id: id("cm"), role: "user" as const, body: question, createdAt: now },
      { id: id("cm"), role: "coach" as const, body: answer, createdAt: now + 1 },
    ],
  };
  return { ...db, coach: { ...db.coach, [userId]: next } };
}

export function resetCoach(db: DB, userId: string): DB {
  return { ...db, coach: { ...db.coach, [userId]: emptyCoachState() } };
}
