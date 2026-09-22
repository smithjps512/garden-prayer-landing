import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-slate-600">Try the TSA or FFA page instead.</p>
      <div className="flex gap-3">
        <Link className="btn-brand" href="/tsa">TSA</Link>
        <Link className="btn-brand" href="/ffa">FFA</Link>
      </div>
    </main>
  );
}
