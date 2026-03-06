export const dynamic = "force-dynamic";

import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";

export default async function AdminDashboard() {
  const session = await getCurrentSession();
  if (!session || session.role !== "admin") redirect("/login");

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 md:px-8">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/admin/products" className="rounded-2xl border border-slate-800 bg-slate-950 p-6 hover:border-[#2563EB]">Manage Products</Link>
        <Link href="/admin/orders" className="rounded-2xl border border-slate-800 bg-slate-950 p-6 hover:border-[#2563EB]">Manage Orders</Link>
      </div>
    </section>
  );
}
