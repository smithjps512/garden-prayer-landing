"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/** Student app routes that bring their own navigation. */
const STUDENT_APPS = ["/trailrider", "/ctos"];

/**
 * The Garden Prayer site header and footer, hidden on the student app routes
 * so each app can bring its own navigation.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudentApp = STUDENT_APPS.some((prefix) =>
    pathname?.startsWith(prefix)
  );

  if (isStudentApp) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
