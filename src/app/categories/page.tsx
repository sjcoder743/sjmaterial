import Link from "next/link";
import { connectDB } from "@/lib/db";
import { mockProducts } from "@/lib/mockProducts";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  let categories: string[] = [];

  try {
    await connectDB();
    categories = (await Product.distinct("category")).filter(Boolean);
  } catch {
    categories = [...new Set(mockProducts.map((item) => item.category))];
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <h1 className="mb-6 text-3xl font-bold">Categories</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/products?category=${encodeURIComponent(category)}`}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-lg font-semibold hover:border-[#2563EB]"
          >
            {category}
          </Link>
        ))}
      </div>
    </section>
  );
}
