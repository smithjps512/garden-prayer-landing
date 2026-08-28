import type { Topic, Quiz } from "./types";

/**
 * Encyclopedia articles.
 *
 * The product plan describes topics "with sources, photos, and videos". These
 * are written to be read and then quizzed on, and each one lists where the
 * information comes from. Photos and videos are not here yet — the topic
 * headers use generated illustrations instead. Replace these with your own
 * topics; the shape is all the app cares about.
 */
export const TOPICS: Topic[] = [
  {
    slug: "why-the-sky-is-blue",
    title: "Why the sky is blue",
    summary:
      "Sunlight looks white, but it is every colour mixed together. The atmosphere pulls the blue out of it and throws it everywhere.",
    hue: 210,
    body: [
      "Sunlight arrives as a mix of every colour. When it hits the atmosphere it runs into gas molecules that are far smaller than the light's own wavelength, and those molecules scatter it — bouncing it off in new directions rather than letting it pass straight through.",
      "The catch is that scattering is wildly uneven. Shorter wavelengths get scattered far more strongly than longer ones, and blue light has a much shorter wavelength than red. The effect is dramatic: blue is scattered roughly ten times more than red. So blue light gets flung across the whole sky while red light mostly carries on in a straight line.",
      "When you look up at a patch of sky away from the sun, you are not looking at the sun directly. You are seeing scattered light that got redirected toward your eyes — and that light is overwhelmingly blue. Violet is scattered even more strongly than blue, but there is less violet in sunlight to begin with and human eyes are less sensitive to it, so blue wins.",
      "This also explains sunsets. Near sunset the light travels through much more atmosphere to reach you, so nearly all the blue has been scattered away before it arrives. What is left is the long-wavelength end: orange and red. Same physics, opposite result, just a longer path.",
    ],
    sources: [
      { name: "NASA Science", url: "https://science.nasa.gov" },
      { name: "NOAA — National Weather Service", url: "https://www.weather.gov" },
    ],
  },
  {
    slug: "where-tap-water-comes-from",
    title: "Where your tap water comes from",
    summary:
      "Between the river and your glass, water goes through four or five deliberate steps. Each one removes something different.",
    hue: 190,
    body: [
      "Most tap water starts as surface water — a river, lake, or reservoir — or as groundwater pumped up from an aquifer. Which one your town uses shapes the treatment: surface water carries more dirt and living things, while groundwater has usually been filtered by rock but may carry more dissolved minerals.",
      "The first step is usually coagulation. Treatment plants add chemicals that make tiny suspended particles clump together into larger clumps called floc. Left alone in a settling basin, that floc is heavy enough to sink, taking the dirt with it. This is sedimentation.",
      "What stays floating goes through filtration — layers of sand, gravel, and often charcoal that catch the remaining particles. By this point the water looks clean, but looking clean and being safe are different things. The final step is disinfection, usually with chlorine, which kills bacteria and viruses that filtration cannot catch and keeps killing them as the water travels through the pipes to your house.",
      "Many systems also adjust the water's chemistry before it leaves — balancing acidity so it does not corrode the pipes on the way to you, and in many places adding fluoride. The trip through the distribution mains can take hours or days, which is exactly why that leftover disinfectant matters.",
    ],
    sources: [
      { name: "USGS Water Science School", url: "https://www.usgs.gov" },
      { name: "U.S. Environmental Protection Agency", url: "https://www.epa.gov" },
    ],
  },
  {
    slug: "what-happens-when-you-hit-send",
    title: "What actually happens when you hit send",
    summary:
      "Your message does not travel as a message. It is chopped into numbered pieces that take separate routes and get reassembled at the far end.",
    hue: 265,
    body: [
      "The moment you send a message, your device breaks it into small chunks called packets. Each packet gets a header — the digital equivalent of an envelope — carrying the destination address, the sender's address, and a sequence number saying where this piece belongs in the original.",
      "Those packets do not travel together and do not follow a fixed path. Each one is handed to a router, which looks at the destination and forwards it to whichever neighbouring router seems to get it closer. The next packet might take a completely different route through completely different cities. No single machine plans the whole journey; each router only makes one local decision.",
      "At the far end, the receiving device sorts the packets back into order using the sequence numbers. If one never shows up, the receiver notices the gap and asks for that piece again. This is why a message can arrive intact even when part of the network fails mid-send — the missing pieces simply get re-requested along a different path.",
      "The addresses on those envelopes are IP addresses, which are numbers. Because people cannot remember numbers, the Domain Name System acts as a phone book, translating a name you typed into the number the routers actually use. That lookup usually happens before the first packet is ever sent.",
    ],
    sources: [
      { name: "Internet Society", url: "https://www.internetsociety.org" },
      { name: "IETF — Internet Engineering Task Force", url: "https://www.ietf.org" },
    ],
  },
  {
    slug: "how-to-read-a-nutrition-label",
    title: "How to read a nutrition label",
    summary:
      "The most important number on the label is the one at the very top, and most people skip it.",
    hue: 25,
    body: [
      "Start with serving size, before anything else. Every number below it describes one serving, not the container. A bottle that holds two and a half servings is telling you that its calorie number needs to be multiplied by two and a half if you drink the whole thing. Skipping this line makes every other number on the label wrong.",
      "Percent Daily Value tells you how much one serving contributes to a day's worth of that nutrient, based on a 2,000-calorie reference diet. A useful rule of thumb: 5% or less is a little of that nutrient, and 20% or more is a lot. That works in both directions — you might want a lot of fibre and a little sodium.",
      "Added sugars are listed separately from total sugars, and the gap between them matters. The sugar naturally present in fruit or milk arrives packaged with fibre, water, and nutrients. Added sugar is what was put in during processing. Two foods can show the same total sugar and be quite different.",
      "The ingredient list is ordered by weight, heaviest first. That ordering tells you what the food mostly is. If a sweetener appears in the first two or three ingredients, the food is largely that sweetener, whatever the front of the package says.",
    ],
    sources: [
      { name: "U.S. Food and Drug Administration", url: "https://www.fda.gov" },
    ],
  },
  {
    slug: "how-a-bike-stays-upright",
    title: "How a bicycle stays upright",
    summary:
      "A moving bike steers itself back under you. The popular explanation involving gyroscopes turns out to be mostly wrong.",
    hue: 140,
    body: [
      "A bicycle standing still falls over immediately, and the same bicycle rolling forward is easy to balance. The difference is not that motion makes it rigid — it is that a moving bike steers. When it starts to tip to one side, the front wheel turns toward that side, which curves the bike's path underneath the falling body and pushes it back upright. Balancing a bike is a continuous series of tiny automatic saves.",
      "For a long time this was credited to the gyroscopic effect of the spinning wheels. Spinning wheels do resist changes in direction, and that effect is real. But researchers built a test bicycle with counter-rotating wheels that cancelled the gyroscopic effect entirely, and it still balanced itself. So gyroscopes help, but they are not the reason.",
      "A larger part of the answer is geometry. On most bikes the steering axis meets the ground slightly ahead of where the front tyre actually touches. That offset, called trail, means the contact patch drags behind the steering axis like the wheel of a shopping trolley — so when the bike leans, the front wheel is pulled into the lean rather than away from it.",
      "Mass distribution matters too. On a self-stable bicycle the front assembly's weight is arranged so that as the frame leans, the steering falls into the turn. Modern studies have shown there is no single ingredient responsible — trail, weight distribution, and gyroscopic effect can each be traded against the others, and a bike can be made self-stable through more than one combination.",
    ],
    sources: [
      { name: "Smithsonian Institution", url: "https://www.si.edu" },
      { name: "American Physical Society", url: "https://www.aps.org" },
    ],
  },
];

export function topicBySlug(slug: string) {
  return TOPICS.find((t) => t.slug === slug) ?? null;
}

/* ------------------------------------------------------------------ */
/* Starter quizzes                                                     */
/* ------------------------------------------------------------------ */

function q(
  id: string,
  prompt: string,
  choices: string[],
  correctIndex: number
) {
  return {
    id,
    prompt,
    choices: choices.map((text, i) => ({ id: `${id}c${i}`, text })),
    correctChoiceId: `${id}c${correctIndex}`,
  };
}

/**
 * Three topics ship with a quiz so there is something to play immediately.
 * The other two deliberately have none, so the empty state invites someone to
 * open the builder.
 */
export const SEED_QUIZZES: Quiz[] = [
  {
    id: "seed-sky",
    title: "Blue skies and red sunsets",
    topicSlug: "why-the-sky-is-blue",
    authorName: "CTOS",
    visibility: "public",
    createdAt: Date.now() - 1000 * 60 * 60 * 30,
    seeded: true,
    questions: [
      q("sq1", "Why is blue light scattered more than red light?", [
        "It has a shorter wavelength",
        "It travels faster",
        "It is brighter",
        "It weighs less",
      ], 0),
      q("sq2", "Roughly how much more is blue scattered than red?", [
        "About twice as much",
        "About ten times as much",
        "About a hundred times as much",
        "They scatter equally",
      ], 1),
      q("sq3", "Why does the sky look blue rather than violet?", [
        "Violet is not scattered at all",
        "Violet is absorbed by clouds",
        "There is less violet in sunlight and our eyes are less sensitive to it",
        "Violet only appears at night",
      ], 2),
      q("sq4", "Why do sunsets look red?", [
        "The sun changes colour as it cools",
        "Light travels through more atmosphere, so the blue is scattered away",
        "Dust turns the light red",
        "The atmosphere gets thinner at sunset",
      ], 1),
    ],
  },
  {
    id: "seed-water",
    title: "From reservoir to tap",
    topicSlug: "where-tap-water-comes-from",
    authorName: "CTOS",
    visibility: "public",
    createdAt: Date.now() - 1000 * 60 * 60 * 8,
    seeded: true,
    questions: [
      q("wq1", "What does coagulation do?", [
        "Kills bacteria",
        "Makes tiny particles clump into larger floc",
        "Removes dissolved minerals",
        "Adds fluoride",
      ], 1),
      q("wq2", "What is sedimentation?", [
        "Heavy floc sinking to the bottom of a basin",
        "Water being boiled",
        "Sand being added to the water",
        "Chlorine being mixed in",
      ], 0),
      q("wq3", "Why is disinfectant left in the water after treatment?", [
        "To improve the taste",
        "To keep killing germs while the water travels through the pipes",
        "To make the water clearer",
        "To stop the water freezing",
      ], 1),
      q("wq4", "Why do plants adjust the water's acidity before it leaves?", [
        "To make it safe to drink",
        "To stop it corroding the pipes on the way to your house",
        "To remove the chlorine",
        "To make it colder",
      ], 1),
    ],
  },
  {
    id: "seed-packets",
    title: "Packets, routers and DNS",
    topicSlug: "what-happens-when-you-hit-send",
    authorName: "CTOS",
    visibility: "public",
    createdAt: Date.now() - 1000 * 60 * 90,
    seeded: true,
    questions: [
      q("pq1", "What is a packet?", [
        "A small chunk of your message with an address attached",
        "A type of router",
        "The name for a whole message",
        "A kind of cable",
      ], 0),
      q("pq2", "Do all the packets in one message follow the same route?", [
        "Yes, always",
        "No — each router makes its own local decision",
        "Only on weekends",
        "Only if the message is short",
      ], 1),
      q("pq3", "What are sequence numbers for?", [
        "Charging you for data",
        "Putting the pieces back in the right order at the far end",
        "Encrypting the message",
        "Choosing the route",
      ], 1),
      q("pq4", "What does the Domain Name System do?", [
        "Stores your messages",
        "Speeds up your connection",
        "Translates a name you typed into the number routers use",
        "Blocks unwanted senders",
      ], 2),
    ],
  },
];
