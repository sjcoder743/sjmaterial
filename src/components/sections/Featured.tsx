export const dynamic = "force-dynamic";

import ProductCard from "@/components/ui/ProductCard";
import { connectDB } from "@/lib/db";
import { mockProducts } from "@/lib/mockProducts";
import { toPlainObject } from "@/lib/serialize";
import Product from "@/models/Product";
import { Product as ProductType } from "@/types/product";

export default async function Featured() {
  let products: ProductType[] = [];
  try {
    await connectDB();
    const featured = await Product.find({ featured: true }).sort({ createdAt: -1 }).limit(4).lean();
    products = toPlainObject(featured) as ProductType[];
  } catch {
    products = mockProducts.filter((item) => item.featured).slice(0, 4);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold md:text-3xl">Featured Products</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
