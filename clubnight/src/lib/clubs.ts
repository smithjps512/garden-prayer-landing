export type ClubId = "tsa" | "ffa";

export interface Stat {
  value: string;
  label: string;
}

export interface Feature {
  icon: string;
  title: string;
  text: string;
}

export interface Club {
  id: ClubId;
  short: string;
  name: string;
  chapter: string;
  tagline: string;
  motto: string;
  emblem: string;
  emblemAlt: string;
  advisorName: string;
  advisorTitle: string;
  advisorEmail: string;
  room: string;
  meetingTimes: string;
  firstMeeting: string;
  what: string;
  membership: string;
  features: Feature[];
  stats: Stat[];
  interests: string[];
  formTitle: string;
  formBlurb: string;
  metaDescription: string;
}

/** Thursday, October 15, 2026 */
export const FIRST_MEETING_DATE = "Thursday, October 15";

export const CLUBS: Record<ClubId, Club> = {
  tsa: {
    id: "tsa",
    short: "TSA",
    name: "Technology Student Association",
    chapter: "BMS TSA Leadership Team",
    tagline: "Learning to lead in a technical world.",
    motto: "Learning to lead in a technical world",
    emblem: "/brand/tsa-emblem.svg",
    emblemAlt: "Technology Student Association emblem",
    advisorName: "Mr. Smith",
    advisorTitle: "TSA Chapter Advisor",
    advisorEmail: "jamessmith@mcps.org",
    room: "Tech Ed Room",
    meetingTimes: "Fall meetings 7:30–8:00 a.m., as needed",
    firstMeeting: `${FIRST_MEETING_DATE} at 7:30 a.m.`,
    what:
      "TSA is a dynamic youth organization that changes lives and prepares members for premier leadership, personal growth and career success through technology education.",
    membership:
      "This year the BMS TSA club is a Leadership Team: a small group of students who help plan the activities and events TSA offers throughout the year. If you like building, designing, organizing, or leading, this is for you.",
    features: [
      { icon: "flag", title: "Leadership", text: "Run meetings, plan events, and represent BMS." },
      { icon: "users", title: "Friendship", text: "Work alongside students who like to make things." },
      { icon: "heart", title: "Community Service", text: "Use tech skills to help the school and community." },
      { icon: "briefcase", title: "Career Development", text: "Explore engineering, design, coding and more." },
      { icon: "puzzle", title: "Teamwork", text: "Every project is built together." },
      { icon: "cpu", title: "Technology Knowledge", text: "Hands-on with real tools and real problems." },
      { icon: "wrench", title: "Hands-On Activities", text: "Build, test, break, and rebuild." },
      { icon: "trophy", title: "Spring Competitions", text: "Local competitive events each spring." },
    ],
    stats: [
      { value: "1978", label: "Year TSA was founded" },
      { value: "300K+", label: "Student members nationwide" },
      { value: "2,700+", label: "Chapters across the U.S." },
      { value: "37", label: "Middle school competitive events" },
    ],
    interests: [
      "Being on the leadership team",
      "Planning events & activities",
      "Spring competitions",
      "Hands-on building & design",
      "Coding, robotics or engineering",
      "Community service projects",
    ],
    formTitle: "Leadership Team Interest Form",
    formBlurb:
      "Interested in joining the BMS TSA Leadership Team? Fill this out and Mr. Smith will follow up after Club Night with next steps.",
    metaDescription:
      "Join the Blacksburg Middle School TSA Leadership Team. Learn what TSA is, when we meet, and sign up.",
  },
  ffa: {
    id: "ffa",
    short: "FFA",
    name: "National FFA Organization",
    chapter: "BMS FFA",
    tagline: "Learning to Do, Doing to Learn, Earning to Live, Living to Serve.",
    motto: "Learning to Do · Doing to Learn · Earning to Live · Living to Serve",
    emblem: "/brand/ffa-emblem.jpg",
    emblemAlt: "National FFA Organization emblem",
    advisorName: "Ms. Eyre",
    advisorTitle: "FFA Chapter Advisor",
    advisorEmail: "seyre@mcps.org",
    room: "AG Room",
    meetingTimes: "Before/after school meetings for the leadership team; dates and times announced by email",
    firstMeeting: "To be announced by email",
    what:
      "FFA is a dynamic youth organization that changes lives and prepares members for premier leadership, personal growth and career success through agricultural education.",
    membership:
      "FFA is co-curricular: every 7th and 8th grade student enrolled in an Agriculture class this school year is a member. Members take part in fun activities built right into daily classroom time. Want more? Apply for the BMS FFA Leadership Team.",
    features: [
      { icon: "flag", title: "Leadership", text: "Serve as an officer and help lead the chapter." },
      { icon: "users", title: "Friendship", text: "Grow with classmates who care about agriculture." },
      { icon: "heart", title: "Community Service", text: "Give back to Blacksburg and Montgomery County." },
      { icon: "briefcase", title: "Career Development", text: "Discover the hundreds of careers in agriculture." },
      { icon: "puzzle", title: "Teamwork", text: "Officers and members work as one chapter." },
      { icon: "leaf", title: "Agriculture Knowledge", text: "Plants, animals, food, natural resources and more." },
      { icon: "wrench", title: "Hands-On Activities", text: "Learn by doing, in the classroom and beyond." },
      { icon: "sun", title: "Spring Plant Sale", text: "Grow it, sell it, and fund chapter activities." },
    ],
    stats: [
      { value: "1928", label: "Year FFA was founded" },
      { value: "1M+", label: "Members in 9,400+ chapters" },
      { value: "1925", label: "Future Farmers of Virginia begins at Virginia Tech" },
      { value: "3,000", label: "Students at the state convention in Blacksburg each June" },
    ],
    interests: [
      "Leadership team / chapter officer",
      "Spring plant sale",
      "Field trips",
      "Community service projects",
      "Hands-on ag & plant projects",
      "Workplace readiness",
    ],
    formTitle: "Leadership Team Interest Form",
    formBlurb:
      "Interested in the BMS FFA Leadership Team? Fill this out and Ms. Eyre will follow up after Club Night. Students can also join the FFA Google Classroom (code d655ok3s) for the official application.",
    metaDescription:
      "BMS FFA at Blacksburg Middle School: what FFA is, what members do, and how to join the leadership team.",
  },
};

export const CLUB_IDS: ClubId[] = ["tsa", "ffa"];

export function isClubId(v: unknown): v is ClubId {
  return v === "tsa" || v === "ffa";
}
