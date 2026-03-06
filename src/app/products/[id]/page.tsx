export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import AddToCartButton from "@/components/ui/AddToCartButton";
import { connectDB } from "@/lib/db";
import { toPlainObject } from "@/lib/serialize";
import Product from "@/models/Product";
import { Product as ProductType } from "@/types/product";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;

  const rawProduct = await Product.findById(id).lean();
  if (!rawProduct) return notFound();

  const product = toPlainObject(rawProduct) as ProductType;

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-2 md:px-8">
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.images[0]} alt={product.name} className="h-[420px] w-full rounded-xl object-cover" />
      </div>
      <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-950 p-8">
        <p className="text-sm text-slate-400">{product.category}</p>
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="text-slate-400">{product.description}</p>
        <p className="text-3xl font-bold text-[#2563EB]">₹{product.price.toLocaleString()}</p>
        <p className="text-sm text-slate-400">Stock: {product.stock}</p>
        <div className="flex gap-3">
          <AddToCartButton product={product} />
        </div>
      </div>
    </section>
  );
}
