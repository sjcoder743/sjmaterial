export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { toPlainObject } from "@/lib/serialize";

export default async function AdminProductsPage() {
  const session = await getCurrentSession();
  if (!session || session.role !== "admin") redirect("/login");

  await connectDB();
  const products = toPlainObject(await Product.find().sort({ createdAt: -1 }).lean()) as Array<{
    _id: string;
    name: string;
    price: number;
    stock: number;
    featured: boolean;
  }>;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <h1 className="mb-6 text-3xl font-bold">Products</h1>
      <form action="/api/admin/products" method="post" className="mb-6 grid grid-cols-1 gap-2 rounded-xl border border-slate-800 bg-slate-950 p-4 md:grid-cols-5">
        <input name="name" placeholder="Name" className="rounded border border-slate-700 bg-slate-900 px-3 py-2" />
        <input name="price" placeholder="Price" className="rounded border border-slate-700 bg-slate-900 px-3 py-2" />
        <input name="category" placeholder="Category" className="rounded border border-slate-700 bg-slate-900 px-3 py-2" />
        <input name="stock" placeholder="Stock" className="rounded border border-slate-700 bg-slate-900 px-3 py-2" />
        <button className="rounded bg-[#2563EB] px-3 py-2 font-semibold">Add Product</button>
      </form>
      <div className="space-y-2">
        {products.map((product) => (
          <div key={product._id} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm">
            <span>{product.name}</span>
            <span>₹{product.price}</span>
            <span>Stock: {product.stock}</span>
            <span>{product.featured ? "Featured" : "Standard"}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
