import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto mt-8 max-w-7xl px-4 md:px-8">
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 to-slate-900 p-10 md:p-16">
        <p className="text-sm text-[#2563EB]">Premium Building Materials</p>
        <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">Modern Commerce for Modern Construction</h1>
        <p className="mt-4 max-w-2xl text-slate-400">
          Discover curated premium materials with fast checkout, secure ordering, and enterprise-ready inventory handling.
        </p>
        <Link href="/products" className="mt-8 inline-flex rounded-xl bg-[#2563EB] px-6 py-3 font-semibold hover:bg-blue-500">
          Explore Products
        </Link>
      </div>
    </section>
  );
}
