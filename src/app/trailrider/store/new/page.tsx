"use client";

/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthGate from "@/components/trailrider/AuthGate";
import { useDB, addListing } from "@/lib/trailrider/store";
import type { Listing, ListingCategory } from "@/lib/trailrider/types";

const CATEGORIES: ListingCategory[] = [
  "Complete bike",
  "Frame",
  "Wheels & tires",
  "Helmet",
  "Gloves & apparel",
  "Components",
  "Other",
];

const CONDITIONS: Listing["condition"][] = [
  "New",
  "Like new",
  "Good",
  "Well used",
];

/**
 * Shrinks a photo before it is stored.
 *
 * Phone photos are several megabytes and localStorage tops out around five,
 * so a full-size image would fill the whole store with one listing. Resizing
 * to 1000px wide keeps it readable and small.
 */
function readAndShrink(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("That file is not an image."));
      image.onload = () => {
        const maxWidth = 1000;
        const scale = Math.min(1, maxWidth / image.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Could not process that image."));
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.75));
      };
      image.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function NewListingPage() {
  return (
    <AuthGate title="Add a listing">
      {({ user }) => <NewListingForm userId={user.id} />}
    </AuthGate>
  );
}

function NewListingForm({ userId }: { userId: string }) {
  const router = useRouter();
  const { update } = useDB();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ListingCategory>("Complete bike");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState<Listing["condition"]>("Good");
  const [description, setDescription] = useState("");
  const [meetupArea, setMeetupArea] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handlePhoto(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setError(null);
    setBusy(true);
    try {
      setPhoto(await readAndShrink(file));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not use that photo.");
    } finally {
      setBusy(false);
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    // Acceptance criteria from the Sell story, checked in order.
    if (!title.trim()) return setError("Give your listing a title.");
    const priceUsd = Number(price);
    if (!Number.isFinite(priceUsd) || priceUsd < 0)
      return setError("Enter a price in whole dollars.");
    if (!photo)
      return setError(
        "Add a photo. Buyers need proof the item exists before they agree to meet you."
      );
    if (!meetupArea.trim())
      return setError("Say where you would like to meet up.");

    update((db) => {
      const seller = db.users.find((u) => u.id === userId);
      if (!seller) return db;
      return addListing(db, seller, {
        title: title.trim(),
        category,
        priceUsd: Math.round(priceUsd),
        condition,
        description: description.trim(),
        photo,
        meetupArea: meetupArea.trim(),
      });
    });

    router.push("/trailrider/store");
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-white">
        Add a listing
      </h1>
      <p className="mt-2 text-zinc-400">
        Sell the gear you are not riding any more. Buyers message you here, then
        you meet up and trade in person.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-zinc-300">
            What are you selling?
          </span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Trek Marlin 7, size M"
            className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2.5 text-white placeholder-zinc-600 outline-none focus:border-emerald-500/60"
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-zinc-300">
              Category
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ListingCategory)}
              className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2.5 text-white outline-none focus:border-emerald-500/60"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-zinc-900">
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-zinc-300">
              Condition
            </span>
            <select
              value={condition}
              onChange={(e) =>
                setCondition(e.target.value as Listing["condition"])
              }
              className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2.5 text-white outline-none focus:border-emerald-500/60"
            >
              {CONDITIONS.map((c) => (
                <option key={c} value={c} className="bg-zinc-900">
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-zinc-300">
            Price (USD)
          </span>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            inputMode="numeric"
            placeholder="420"
            className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2.5 text-white placeholder-zinc-600 outline-none focus:border-emerald-500/60"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-zinc-300">
            Description
          </span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="How long you rode it, anything replaced, anything wrong with it."
            className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2.5 text-white placeholder-zinc-600 outline-none focus:border-emerald-500/60"
          />
        </label>

        <div>
          <span className="mb-1.5 block text-sm font-medium text-zinc-300">
            Photo <span className="text-rose-400">*</span>
          </span>
          <p className="mb-2 text-xs text-zinc-500">
            Required. A real photo of the actual item is what makes a buyer
            willing to meet you.
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhoto}
            className="block w-full text-sm text-zinc-400 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-white/15"
          />
          {photo && (
            <img
              src={photo}
              alt="Your listing"
              className="mt-3 h-44 w-full rounded-xl border border-white/10 object-cover"
            />
          )}
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-zinc-300">
            Where do you want to meet?
          </span>
          <input
            value={meetupArea}
            onChange={(e) => setMeetupArea(e.target.value)}
            placeholder="Slate Ridge trailhead parking lot"
            className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2.5 text-white placeholder-zinc-600 outline-none focus:border-emerald-500/60"
          />
          <span className="mt-1.5 block text-xs text-zinc-500">
            Pick somewhere public and busy. Never your home address.
          </span>
        </label>

        {error && (
          <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-emerald-500 px-5 py-3 font-medium text-zinc-950 transition-colors hover:bg-emerald-400 disabled:opacity-50"
        >
          {busy ? "Processing photo…" : "Post listing"}
        </button>
      </form>
    </main>
  );
}
