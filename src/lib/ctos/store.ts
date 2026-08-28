"use client";

import { useCallback, useEffect, useState } from "react";
import type { Attempt, DB, PlayMode, Quiz, Question } from "./types";
import { SEED_QUIZZES } from "./topics";

/**
 * CTOS data layer.
 *
 * Everything lives in this browser's localStorage and every read and write in
 * the app goes through this file, so replacing it with a real backend later is
 * a contained change.
 *
 * There is no sign-in anywhere in the app. That is deliberate: no CTOS user
 * story covers accounts, so the prototype just remembers a display name.
 */

const KEY = "ctos:v1";

function emptyDB(): DB {
  return { quizzes: SEED_QUIZZES, attempts: [], displayName: null };
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

const listeners = new Set<() => void>();

function write(db: DB) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(db));
  } catch {
    // Storage blocked or full. The session keeps working; nothing persists.
  }
  listeners.forEach((fn) => fn());
}

/** Returns null until the browser has mounted — localStorage has no server. */
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

export function blankQuestion(): Question {
  const qid = id("q");
  return {
    id: qid,
    prompt: "",
    choices: [
      { id: `${qid}_a`, text: "" },
      { id: `${qid}_b`, text: "" },
    ],
    correctChoiceId: null,
  };
}

/* ------------------------------------------------------------------ */
/* Quizzes                                                             */
/* ------------------------------------------------------------------ */

export function quizById(db: DB, quizId: string): Quiz | null {
  return db.quizzes.find((q) => q.id === quizId) ?? null;
}

/** Only public quizzes are listed. Private ones need their link. */
export function publicQuizzes(db: DB): Quiz[] {
  return db.quizzes
    .filter((q) => q.visibility === "public")
    .sort((a, b) => b.createdAt - a.createdAt);
}

export function quizzesForTopic(db: DB, topicSlug: string): Quiz[] {
  return publicQuizzes(db).filter((q) => q.topicSlug === topicSlug);
}

export function saveQuiz(db: DB, quiz: Quiz): DB {
  const exists = db.quizzes.some((q) => q.id === quiz.id);
  return {
    ...db,
    quizzes: exists
      ? db.quizzes.map((q) => (q.id === quiz.id ? quiz : q))
      : [quiz, ...db.quizzes],
  };
}

export function deleteQuiz(db: DB, quizId: string): DB {
  return { ...db, quizzes: db.quizzes.filter((q) => q.id !== quizId) };
}

/**
 * What still has to be true before a quiz can be finalized. The arrow button
 * in the builder stays disabled until this comes back empty.
 */
export function quizProblems(quiz: {
  title: string;
  questions: Question[];
}): string[] {
  const problems: string[] = [];
  if (!quiz.title.trim()) problems.push("Give the quiz a title.");
  if (quiz.questions.length === 0) problems.push("Add at least one question.");

  quiz.questions.forEach((question, i) => {
    const n = i + 1;
    if (!question.prompt.trim()) problems.push(`Question ${n} has no question.`);
    const filled = question.choices.filter((c) => c.text.trim());
    if (filled.length < 2)
      problems.push(`Question ${n} needs at least two answers.`);
    if (!question.correctChoiceId)
      problems.push(`Question ${n} has no correct answer marked.`);
    else if (!filled.some((c) => c.id === question.correctChoiceId))
      problems.push(`Question ${n}'s correct answer is blank.`);
  });

  return problems;
}

/* ------------------------------------------------------------------ */
/* Attempts                                                            */
/* ------------------------------------------------------------------ */

export function recordAttempt(
  db: DB,
  input: {
    quiz: Quiz;
    mode: PlayMode;
    correct: number;
    points: number;
    bestStreak: number;
  }
): DB {
  const attempt: Attempt = {
    id: id("a"),
    quizId: input.quiz.id,
    quizTitle: input.quiz.title,
    mode: input.mode,
    correct: input.correct,
    total: input.quiz.questions.length,
    points: input.points,
    bestStreak: input.bestStreak,
    takenAt: Date.now(),
  };
  return { ...db, attempts: [attempt, ...db.attempts].slice(0, 50) };
}

export function attemptsForQuiz(db: DB, quizId: string): Attempt[] {
  return db.attempts.filter((a) => a.quizId === quizId);
}

export function setDisplayName(db: DB, name: string): DB {
  return { ...db, displayName: name.trim() || null };
}

/* ------------------------------------------------------------------ */
/* Gamified scoring                                                    */
/* ------------------------------------------------------------------ */

/** Seconds allowed per question in gamified mode. */
export const QUESTION_SECONDS = 20;

/**
 * Kahoot-style scoring: a flat amount for being right, a speed bonus for how
 * much time was left, and a growing bonus for consecutive correct answers.
 *
 * The user story says "Gamified is like Blooket, Gimkit, or Kahoot" without
 * saying whether speed should count. Kahoot rewards it, Blooket mostly does
 * not. We went with rewarding it — worth asking the team which they meant.
 */
export function scoreAnswer(secondsLeft: number, streakAfter: number): number {
  const base = 100;
  const speed = Math.round(100 * (Math.max(0, secondsLeft) / QUESTION_SECONDS));
  const streakBonus = Math.min(100, Math.max(0, streakAfter - 1) * 25);
  return base + speed + streakBonus;
}
