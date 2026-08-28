import type { Trail, Listing } from "./types";

/**
 * DEMO TRAIL DATA.
 *
 * These trails are invented for the prototype. The coordinates sit in the hills
 * around Bentonville / Bella Vista, Arkansas so the map opens on real terrain,
 * but the names, ratings and reviews are made up.
 *
 * To make this real for your area: replace this array with trails you have
 * actually ridden. Keep the same shape and everything else keeps working.
 */
export const TRAILS: Trail[] = [
  {
    id: "t1",
    slug: "copperhead-loop",
    name: "Copperhead Loop",
    area: "Slate Ridge",
    lat: 36.305,
    lng: -94.312,
    difficulty: "green",
    lengthMiles: 2.4,
    elevationGainFt: 180,
    summary:
      "Wide, smooth and mostly flat. The best first trail in the system — you can ride the whole thing without unclipping.",
    improves: ["Endurance", "Cornering", "Confidence"],
    reviews: [
      { id: "r1", author: "Drew", rating: 5, body: "Took my little brother out here for his first ride. Zero scary parts." },
      { id: "r2", author: "Maya", rating: 4, body: "Great warmup lap before heading up to the harder stuff." },
    ],
  },
  {
    id: "t2",
    slug: "sawtooth-bench",
    name: "Sawtooth Bench",
    area: "Slate Ridge",
    lat: 36.331,
    lng: -94.287,
    difficulty: "blue",
    lengthMiles: 4.1,
    elevationGainFt: 540,
    summary:
      "A long bench-cut climb with rock rollers on the descent. Steady effort the whole way up, then a reward.",
    improves: ["Legs", "Climbing power", "Line choice"],
    reviews: [
      { id: "r3", author: "Lincoln", rating: 5, body: "The climb hurts but the descent is worth every pedal stroke." },
      { id: "r4", author: "Sam", rating: 4, body: "Gets slick after rain. Give it a day to dry." },
    ],
  },
  {
    id: "t3",
    slug: "ironwood-chute",
    name: "Ironwood Chute",
    area: "North Fork",
    lat: 36.461,
    lng: -94.152,
    difficulty: "black",
    lengthMiles: 1.8,
    elevationGainFt: 95,
    summary:
      "Steep, rooty and fast. Two mandatory drops near the bottom with no ride-around.",
    improves: ["Core", "Balance", "Braking control"],
    reviews: [
      { id: "r5", author: "Maya", rating: 5, body: "Scout the drops first. Then send it." },
      { id: "r6", author: "Drew", rating: 3, body: "Chunkier than I expected. Bring a full-face." },
    ],
  },
  {
    id: "t4",
    slug: "meadowlark-flow",
    name: "Meadowlark Flow",
    area: "North Fork",
    lat: 36.438,
    lng: -94.187,
    difficulty: "blue",
    lengthMiles: 3.2,
    elevationGainFt: 260,
    summary:
      "Machine-built berms and rollers. Pump it right and you barely touch the pedals.",
    improves: ["Pumping", "Cornering", "Rhythm"],
    reviews: [
      { id: "r7", author: "Sam", rating: 5, body: "Endlessly repeatable. I did four laps and wanted a fifth." },
    ],
  },
  {
    id: "t5",
    slug: "quarry-rim",
    name: "Quarry Rim",
    area: "Old Quarry",
    lat: 36.246,
    lng: -94.068,
    difficulty: "double-black",
    lengthMiles: 2.9,
    elevationGainFt: 720,
    summary:
      "Exposed slab riding along the quarry edge. Serious consequences for a mistake — experienced riders only.",
    improves: ["Technical skill", "Focus", "Core"],
    reviews: [
      { id: "r8", author: "Lincoln", rating: 4, body: "Do not ride this one alone. Genuinely committing." },
    ],
  },
  {
    id: "t6",
    slug: "cedar-creek-crossing",
    name: "Cedar Creek Crossing",
    area: "Old Quarry",
    lat: 36.221,
    lng: -94.094,
    difficulty: "green",
    lengthMiles: 5.6,
    elevationGainFt: 210,
    summary:
      "Long, gentle and shaded, with three creek crossings. Popular with hikers too, so keep your speed down.",
    improves: ["Endurance", "Water crossings"],
    reviews: [
      { id: "r9", author: "Maya", rating: 4, body: "Bring dry socks. You will get wet at the third crossing." },
    ],
  },
  {
    id: "t7",
    slug: "switchback-seven",
    name: "Switchback Seven",
    area: "Slate Ridge",
    lat: 36.288,
    lng: -94.264,
    difficulty: "blue",
    lengthMiles: 2.2,
    elevationGainFt: 430,
    summary:
      "Seven tight switchbacks stacked up the hillside. A cornering drill disguised as a climb.",
    improves: ["Cornering", "Legs", "Patience"],
    reviews: [
      { id: "r10", author: "Drew", rating: 4, body: "Cleaned all seven on my third try. Best feeling of the summer." },
    ],
  },
  {
    id: "t8",
    slug: "hawks-nest-descent",
    name: "Hawk's Nest Descent",
    area: "North Fork",
    lat: 36.479,
    lng: -94.124,
    difficulty: "black",
    lengthMiles: 3.7,
    elevationGainFt: 120,
    summary:
      "Top-to-bottom descent with rock gardens and two step-downs. Shuttle it or earn it on Sawtooth.",
    improves: ["Descending", "Core", "Bike handling"],
    reviews: [
      { id: "r11", author: "Sam", rating: 5, body: "The best three minutes in the whole trail system." },
      { id: "r12", author: "Lincoln", rating: 4, body: "Rock garden at the halfway point ate my rear tire." },
    ],
  },
  {
    id: "t9",
    slug: "prairie-spur",
    name: "Prairie Spur",
    area: "Old Quarry",
    lat: 36.265,
    lng: -94.042,
    difficulty: "green",
    lengthMiles: 1.5,
    elevationGainFt: 60,
    summary:
      "Short connector across open grassland. Nothing technical, but the sunset views are the best in the park.",
    improves: ["Recovery spins", "Confidence"],
    reviews: [
      { id: "r13", author: "Maya", rating: 3, body: "More of a connector than a destination, but it is pretty." },
    ],
  },
  {
    id: "t10",
    slug: "boulder-garden",
    name: "Boulder Garden",
    area: "North Fork",
    lat: 36.452,
    lng: -94.215,
    difficulty: "black",
    lengthMiles: 0.9,
    elevationGainFt: 140,
    summary:
      "A short, brutal tech section. Every rider picks a different line and argues about which one is fastest.",
    improves: ["Technical skill", "Balance", "Core"],
    reviews: [
      { id: "r14", author: "Drew", rating: 5, body: "Session this one. You will not clean it the first time." },
    ],
  },
];

/** A tiny inline SVG stands in for a real photo on the seeded listings. */
function placeholderPhoto(label: string, hue: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480"><rect width="640" height="480" fill="hsl(${hue},18%,16%)"/><circle cx="320" cy="200" r="110" fill="none" stroke="hsl(${hue},45%,45%)" stroke-width="10"/><text x="320" y="380" font-family="system-ui,sans-serif" font-size="34" fill="hsl(${hue},30%,70%)" text-anchor="middle">${label}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const SEED_LISTINGS: Listing[] = [
  {
    id: "l1",
    title: "Trek Marlin 7, size M",
    category: "Complete bike",
    priceUsd: 420,
    condition: "Good",
    description:
      "Rode it for two seasons and just upgraded. New chain and cassette this spring. Small scratch on the top tube, shifts perfectly.",
    photo: placeholderPhoto("Trek Marlin 7", 150),
    sellerId: "seed-maya",
    sellerName: "Maya R.",
    sellerEmail: "maya@example.com",
    meetupArea: "Slate Ridge trailhead parking lot",
    createdAt: Date.now() - 1000 * 60 * 60 * 26,
    status: "available",
  },
  {
    id: "l2",
    title: "Giro Fixture MIPS helmet",
    category: "Helmet",
    priceUsd: 35,
    condition: "Like new",
    description:
      "Never crashed in it, worn maybe five times. Adult size universal. Selling because I switched to a full-face.",
    photo: placeholderPhoto("Giro helmet", 25),
    sellerId: "seed-lincoln",
    sellerName: "Lincoln T.",
    sellerEmail: "lincoln@example.com",
    meetupArea: "Public library front entrance",
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
    status: "available",
  },
  {
    id: "l3",
    title: "Fox Ranger gloves, size L",
    category: "Gloves & apparel",
    priceUsd: 18,
    condition: "Good",
    description: "Ordered the wrong size. Washed once, no holes.",
    photo: placeholderPhoto("Fox gloves", 200),
    sellerId: "seed-sam",
    sellerName: "Sam K.",
    sellerEmail: "sam@example.com",
    meetupArea: "North Fork trailhead",
    createdAt: Date.now() - 1000 * 60 * 60 * 50,
    status: "available",
  },
  {
    id: "l4",
    title: "29\" wheelset, Shimano hubs",
    category: "Wheels & tires",
    priceUsd: 160,
    condition: "Well used",
    description:
      "True and rolling, bearings are still smooth. One small flat spot on the rear rim that has never given me trouble.",
    photo: placeholderPhoto("29in wheelset", 280),
    sellerId: "seed-maya",
    sellerName: "Maya R.",
    sellerEmail: "maya@example.com",
    meetupArea: "Slate Ridge trailhead parking lot",
    createdAt: Date.now() - 1000 * 60 * 60 * 72,
    status: "sold",
  },
];
