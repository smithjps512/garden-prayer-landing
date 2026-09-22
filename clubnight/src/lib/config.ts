const TZ = "America/New_York";

/** Today's date as YYYY-MM-DD in Eastern time. */
export function todayET(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function isoDate(v: string | undefined): string | null {
  if (!v) return null;
  return /^\d{4}-\d{2}-\d{2}$/.test(v.trim()) ? v.trim() : null;
}

export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export const config = {
  clubNightDate: isoDate(process.env.CLUB_NIGHT_DATE),
  /** Explicit close date, else 14 days after club night, else never. */
  get siteClosesAt(): string | null {
    const explicit = isoDate(process.env.SITE_CLOSES_AT);
    if (explicit) return explicit;
    return this.clubNightDate ? addDays(this.clubNightDate, 14) : null;
  },
  get isClosed(): boolean {
    const closes = this.siteClosesAt;
    return !!closes && todayET() > closes;
  },
  /** Digest may auto-send once today is after club night. */
  get digestDue(): boolean {
    return !!this.clubNightDate && todayET() > this.clubNightDate;
  },
  siteUrl: (process.env.SITE_URL || "https://bms-club-night.vercel.app").replace(/\/$/, ""),
  emailFrom: process.env.EMAIL_FROM || "BMS Club Night <clubnight@doubleblaze.solutions>",
  digestCc: (process.env.DIGEST_CC || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
};

export function formatLongDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
