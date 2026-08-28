import { NextResponse } from "next/server";

/**
 * The Health & Training Coach endpoint.
 *
 * Right now this answers from a set of hand-written responses matched on
 * keywords — no AI model, no API key, no cost. That keeps the prototype
 * runnable by anyone who clones the repo.
 *
 * TO PLUG IN A REAL MODEL: this is the only file that needs to change. Keep
 * the same request shape ({ question }) and response shape ({ answer }) and
 * the whole front end keeps working. That is the point of putting the answer
 * behind an API route instead of generating it in the browser.
 */

const DISCLAIMER =
  "Heads up: I'm a demo coach, not a doctor. For pain that doesn't go away, or anything that feels like an injury, talk to a real medical professional.";

type Topic = {
  keywords: string[];
  answer: string;
};

const TOPICS: Topic[] = [
  {
    keywords: ["eat", "food", "nutrition", "diet", "meal", "snack", "fuel"],
    answer:
      "Fueling for a ride comes down to timing. Two or three hours before you ride, eat a real meal with carbs and some protein — rice and chicken, pasta, oatmeal with peanut butter. In the 30 minutes before you roll out, keep it small and simple: a banana, a handful of pretzels. On rides over an hour, eat something every 45 minutes even if you don't feel hungry, because by the time you feel it you're already behind. Afterwards, get carbs and protein in within about an hour — chocolate milk is cheap and works fine.",
  },
  {
    keywords: ["water", "hydrate", "hydration", "drink", "cramp", "thirsty"],
    answer:
      "Start drinking before you're thirsty. A rough target is one bottle per hour of riding, more when it's hot. If you're cramping late in rides, that's usually a sign you went out under-hydrated rather than something you can fix mid-ride — drink steadily the day before a big ride, not just during it. On anything over 90 minutes, add electrolytes to at least one bottle.",
  },
  {
    keywords: ["workout", "training", "plan", "schedule", "week", "routine", "program"],
    answer:
      "A simple week that actually works: two hard days, two easy days, one long day, two rest days. Hard days are intervals — try 5 rounds of 3 minutes near your limit with 3 minutes easy between. Easy days should feel almost too easy; that's the point, they're building your base. The long day is just time in the saddle at a pace where you could hold a conversation. Add no more than 10% total time per week, and take every fourth week easy.",
  },
  {
    keywords: ["climb", "hill", "uphill", "steep", "power", "stronger"],
    answer:
      "Climbing better is part engine, part technique. For the engine: seated intervals on a steady grade, 4 to 6 minutes hard, fully recovered between. For technique: stay seated longer than feels natural, slide forward on the saddle to keep weight over the pedals but keep just enough on the back wheel that it doesn't spin, and pick your gear *before* the pitch steepens, not after. Off the bike, squats and step-ups carry over more than anything else.",
  },
  {
    keywords: ["core", "abs", "strength", "gym", "lift", "stability"],
    answer:
      "Core work for biking is about holding a position under fatigue, not about crunches. Three things, 3 rounds, three times a week: front plank 45 seconds, side plank 30 seconds each side, and dead bugs 10 per side done slowly. Add glute bridges if your lower back gets tired on long descents — that's usually weak glutes making the back do their job.",
  },
  {
    keywords: ["recover", "recovery", "rest", "sore", "tired", "sleep", "overtrain"],
    answer:
      "Recovery is where you actually get faster — the ride is just the stimulus. Sleep is the biggest lever by a wide margin; aim for 8 to 9 hours if you're still growing. Take at least one full day off the bike every week. Some soreness two days after a hard effort is normal. Soreness that's still there on day four, a resting heart rate that's climbed, or losing interest in riding are all signs you need more easy days, not more hard ones.",
  },
  {
    keywords: ["crash", "injury", "hurt", "pain", "wrist", "knee", "concussion", "head"],
    answer:
      "Anything involving your head — even a light knock with a helmet on — means you stop riding for the day and get checked out. Don't negotiate with that one. For knee pain, the first thing to check is saddle height: too low is the most common cause by far. Wrist and hand pain usually means too much weight forward, which is a body-position fix (bend your elbows, hinge at the hips) more often than a parts fix. " + DISCLAIMER,
  },
  {
    keywords: ["descend", "downhill", "brake", "corner", "turn", "technique", "skill", "jump", "drop"],
    answer:
      "Descending is mostly about where your weight is and where your eyes are. Get your heels down, elbows out, and let the bike move under you instead of gripping it stiff. Brake before the corner, not in it, and use the front brake more than feels comfortable — it does most of the stopping. The eyes part matters most: look through the corner to where you want to end up, not at the rock you're trying to miss. You go where you look, every time.",
  },
  {
    keywords: ["breath", "breathing", "cardio", "endurance", "lung", "gas", "winded"],
    answer:
      "Running out of breath early usually means you started too hard, not that your lungs are the limit. Ride the first 10 minutes of everything easier than you want to — a genuine warmup makes the rest of the ride feel better. To build endurance, most of your riding should be at a pace where you can still talk in full sentences. It feels slow. It's the part that works.",
  },
  {
    keywords: ["warm", "warmup", "stretch", "stretching", "mobility"],
    answer:
      "Before a ride, keep it moving rather than static: leg swings, a few air squats, then 10 easy minutes of pedaling with a couple of short accelerations near the end. Save the long held stretches for after, when the muscles are warm — hip flexors and hamstrings are the two that matter most for riders, since you spend the whole ride folded forward.",
  },
];

const FALLBACK =
  "I can help with training plans, fueling and hydration, recovery, strength work, climbing, and descending technique. Try asking something like \"what should I eat before a long ride?\" or \"how do I get stronger at climbing?\"";

function answerFor(question: string): string {
  const q = question.toLowerCase();
  let best: { topic: Topic; hits: number } | null = null;

  for (const topic of TOPICS) {
    const hits = topic.keywords.filter((k) => q.includes(k)).length;
    if (hits > 0 && (!best || hits > best.hits)) best = { topic, hits };
  }

  return best ? best.topic.answer : FALLBACK;
}

export async function POST(request: Request) {
  let question = "";
  try {
    const body = await request.json();
    question = typeof body?.question === "string" ? body.question : "";
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!question.trim()) {
    return NextResponse.json({ error: "Ask a question first." }, { status: 400 });
  }

  return NextResponse.json({ answer: answerFor(question) });
}
