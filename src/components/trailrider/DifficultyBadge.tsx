import type { Difficulty } from "@/lib/trailrider/types";

/** The standard mountain bike rating system riders already know from trailheads. */
export const DIFFICULTY: Record<
  Difficulty,
  { label: string; shape: string; chip: string; dot: string }
> = {
  green: {
    label: "Easy",
    shape: "●",
    chip: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    dot: "#34d399",
  },
  blue: {
    label: "Intermediate",
    shape: "■",
    chip: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    dot: "#38bdf8",
  },
  black: {
    label: "Advanced",
    shape: "◆",
    chip: "bg-zinc-100/10 text-zinc-100 border-zinc-100/25",
    dot: "#e4e4e7",
  },
  "double-black": {
    label: "Expert",
    shape: "◆◆",
    chip: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    dot: "#fb7185",
  },
};

export default function DifficultyBadge({
  difficulty,
  className = "",
}: {
  difficulty: Difficulty;
  className?: string;
}) {
  const d = DIFFICULTY[difficulty];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${d.chip} ${className}`}
    >
      <span aria-hidden="true">{d.shape}</span>
      {d.label}
    </span>
  );
}
