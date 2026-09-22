import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { ClubId } from "./clubs";

export interface Signup {
  id: string;
  created_at: string;
  club: ClubId;
  student_first: string;
  student_last: string;
  grade: string;
  student_email: string | null;
  parent_name: string;
  parent_email: string;
  interests: string[];
  comments: string | null;
  digest_sent_at: string | null;
}

export type NewSignup = Omit<Signup, "id" | "created_at" | "digest_sent_at">;

let client: SupabaseClient | null = null;

export function db(): SupabaseClient {
  if (client) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL / SUPABASE_ANON_KEY are not set");
  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}

export async function insertSignup(row: NewSignup): Promise<void> {
  const { error } = await db().from("clubnight_signups").insert(row);
  if (error) throw new Error(error.message);
}

export async function listSignups(adminKey: string, unsentOnly = false): Promise<Signup[]> {
  const { data, error } = await db().rpc("clubnight_list_signups", {
    p_key: adminKey,
    p_unsent_only: unsentOnly,
  });
  if (error) throw new Error(error.message);
  return (data ?? []) as Signup[];
}

export async function markSent(adminKey: string, ids: string[]): Promise<number> {
  if (ids.length === 0) return 0;
  const { data, error } = await db().rpc("clubnight_mark_sent", { p_key: adminKey, p_ids: ids });
  if (error) throw new Error(error.message);
  return (data as number) ?? 0;
}

export function adminKey(): string {
  const k = process.env.ADMIN_KEY;
  if (!k) throw new Error("ADMIN_KEY is not set");
  return k;
}

/** Constant-time-ish comparison for short secrets. */
export function keyMatches(provided: string | null | undefined, expected: string): boolean {
  if (!provided || provided.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}
