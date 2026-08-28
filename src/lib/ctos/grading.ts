/**
 * The grading scale, straight from the CTOS quiz user story.
 *
 * The students wrote it as three columns:
 *
 *   A: 96-100 | Awesome       | Impressive-Doesn't need to
 *   A: 91-95  | Impressive    | Great-Could be applied.
 *   B: 71-90  | Great         | Study-Needs Improvement
 *   C: 51-70  | Decent        | Study-Needs Improvement
 *   D: 31-50  | Moderate      | Study-Needs Improvement
 *   E: 11-30  | Substandard   | Study-Needs Improvement
 *   F: 0-10   | Terrible      | Study-Needs Improvement
 *
 * The grades and labels below are theirs, unchanged. The third column runs off
 * the page in the original ("Doesn't need to" — study, presumably), so `advice`
 * is our reading of it. Worth confirming with them.
 */

export type Band = {
  grade: string;
  min: number;
  max: number;
  label: string;
  advice: string;
  /** Tailwind classes for the result screen. */
  tone: string;
};

export const BANDS: Band[] = [
  {
    grade: "A",
    min: 96,
    max: 100,
    label: "Awesome",
    advice: "Doesn't need to study",
    tone: "text-emerald-300 border-emerald-400/40 bg-emerald-400/10",
  },
  {
    grade: "A",
    min: 91,
    max: 95,
    label: "Impressive",
    advice: "Great — could be applied",
    tone: "text-emerald-300 border-emerald-400/40 bg-emerald-400/10",
  },
  {
    grade: "B",
    min: 71,
    max: 90,
    label: "Great",
    advice: "Study — needs improvement",
    tone: "text-sky-300 border-sky-400/40 bg-sky-400/10",
  },
  {
    grade: "C",
    min: 51,
    max: 70,
    label: "Decent",
    advice: "Study — needs improvement",
    tone: "text-indigo-300 border-indigo-400/40 bg-indigo-400/10",
  },
  {
    grade: "D",
    min: 31,
    max: 50,
    label: "Moderate",
    advice: "Study — needs improvement",
    tone: "text-amber-300 border-amber-400/40 bg-amber-400/10",
  },
  {
    grade: "E",
    min: 11,
    max: 30,
    label: "Substandard",
    advice: "Study — needs improvement",
    tone: "text-orange-300 border-orange-400/40 bg-orange-400/10",
  },
  {
    grade: "F",
    min: 0,
    max: 10,
    label: "Terrible",
    advice: "Study — needs improvement",
    tone: "text-rose-300 border-rose-400/40 bg-rose-400/10",
  },
];

/** Percentage of questions answered correctly, rounded to a whole number. */
export function percentFor(correct: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((correct / total) * 100);
}

export function bandFor(percent: number): Band {
  const clamped = Math.max(0, Math.min(100, percent));
  // The bands cover 0-100 with no gaps, so this always finds one.
  return (
    BANDS.find((b) => clamped >= b.min && clamped <= b.max) ??
    BANDS[BANDS.length - 1]
  );
}
