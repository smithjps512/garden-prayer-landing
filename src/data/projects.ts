export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  status: "Active" | "Legacy";
  statusLabel?: string;
  entity?: string;
  url?: string;
  era?: string;
  gradient: string;
  icon: string;
  heroImage?: string;
}

export const currentProjects: Project[] = [
  {
    slug: "game-view",
    name: "Game View",
    tagline: "3D/4D Video Reconstruction for Sports & Entertainment",
    description:
      "A breakthrough platform that transforms standard video footage into navigable 3D environments using Gaussian Splatting technology.",
    category: "Sports & Entertainment Technology",
    status: "Active",
    entity: "Game View Sports & Entertainment Corporation",
    gradient: "from-blue-600 via-indigo-600 to-violet-700",
    icon: "🎮",
    heroImage: "/images/GameViewHero.png",
  },
  {
    slug: "melissa",
    name: "Melissa for Educators",
    tagline: "AI-Powered K-12 Teaching Platform",
    description:
      "Gives teachers their time back with AI-generated lesson plans, worksheets, and assignments — with academic integrity guardrails built in.",
    category: "Education Technology / AI",
    status: "Active",
    url: "https://melissaforeducators.ai",
    gradient: "from-rose-600 via-red-600 to-orange-600",
    icon: "📚",
    heroImage: "/images/MelissaEducatorHero.png",
  },
  {
    slug: "vaquero-homes",
    name: "Vaquero Homes",
    tagline: "Modernizing How Texas Homes Are Built",
    description:
      "A Texas-based construction platform designed to modernize how homes are built, managed, and delivered.",
    category: "Construction Technology",
    status: "Active",
    statusLabel: "Launching Soon",
    gradient: "from-amber-600 via-orange-600 to-red-600",
    icon: "🏠",
    heroImage: "/images/VaqueroHomesHero.png",
  },
  {
    slug: "veraflow",
    name: "Veraflow",
    tagline: "Physical-Scan Manufacturing Execution for Precision Manufacturing",
    description:
      "A physical-scan-based Manufacturing Execution System (MES) designed for complex, compliance-driven precision manufacturing operations.",
    category: "Manufacturing Execution System / AI",
    status: "Active",
    url: "https://veraflow.ai",
    gradient: "from-sky-600 via-blue-700 to-indigo-700",
    icon: "🏭",
  },
  {
    slug: "unreal-engine",
    name: "Spatial Planning Studio",
    tagline: "Warehouse & Facility Visualization Powered by Gaussian Splatting in Unreal Engine 5",
    description:
      "Next-generation spatial planning using Unreal Engine 5 and the LCC4Unreal plugin for real-time Gaussian Splat rendering. Enables facility operators to walk virtual representations of real-world spaces for planning, training, and design review.",
    category: "3D Visualization / Gaussian Splatting",
    status: "Active",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    icon: "🌐",
    heroImage: "/images/UnrealEngineHero.png",
  },
];

export const legacyProjects: Project[] = [
  {
    slug: "igohd",
    name: "iGoHD",
    tagline: "Pioneering Live HD Interactive Streaming",
    description:
      "A live HD interactive streaming platform that gave fans an all-access pass to exclusive concerts and events — years ahead of its time.",
    category: "Live Entertainment / Streaming",
    status: "Legacy",
    statusLabel: "Pioneering Work",
    era: "~2013",
    gradient: "from-purple-600 via-fuchsia-600 to-pink-600",
    icon: "🎬",
    heroImage: "/images/iGoHDHERO.png",
  },
  {
    slug: "domain-u",
    name: "Domain-U / Lumineo",
    tagline: "Enterprise Learning Management System",
    description:
      "From coding academy in the Rio Grande Valley to enterprise LMS — pioneering 'weapons of mass instruction' for accessible education.",
    category: "Education Technology / LMS",
    status: "Legacy",
    statusLabel: "Where It Started",
    era: "2017–2019",
    gradient: "from-sky-600 via-blue-600 to-indigo-600",
    icon: "🎓",
    heroImage: "/images/LumineoHero.png",
  },
];

export const allProjects = [...currentProjects, ...legacyProjects];
