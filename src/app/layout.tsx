import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Garden Prayer Publishing — Faith-Guided Innovation",
  description:
    "We build platforms that teach, entertain, and transform — guided by prayer and 20+ years of experience. From Disney to AI-powered education.",
  keywords: [
    "Garden Prayer Publishing",
    "technology innovation",
    "faith-guided",
    "AI education",
    "Game View",
    "Melissa for Educators",
    "James Smith",
  ],
  openGraph: {
    title: "Garden Prayer Publishing — Faith-Guided Innovation",
    description:
      "We build platforms that teach, entertain, and transform — guided by prayer and 20+ years of experience.",
    type: "website",
    locale: "en_US",
    siteName: "Garden Prayer Publishing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garden Prayer Publishing — Faith-Guided Innovation",
    description:
      "We build platforms that teach, entertain, and transform — guided by prayer and 20+ years of experience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-midnight text-cream">
        <div className="noise-overlay" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
