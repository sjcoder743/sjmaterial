export const dynamic = "force-dynamic";

import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { connectDB } from "@/lib/db";
import { mockProducts } from "@/lib/mockProducts";
import { buildProductQuery, getProductCategories } from "@/lib/products";
import { toPlainObject } from "@/lib/serialize";
import Product from "@/models/Product";
import { Product as ProductType } from "@/types/product";

const PAGE_SIZE = 8;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const page = Number(params.page || 1);
  const sort = (params.sort as string) || "newest";
  const queryString = new URLSearchParams(params as Record<string, string>);

  const query = buildProductQuery(queryString);
  const sortOption =
    sort === "price-asc"
      ? { price: 1 }
      : sort === "price-desc"
        ? { price: -1 }
        : { createdAt: -1 };

  let products: ProductType[] = [];
  let total = 0;
  let categories: string[] = [];
  let dbWarning = "";

  try {
    await connectDB();
    const [rawProducts, count, availableCategories] = await Promise.all([
      Product.find(query)
        .sort(sortOption as never)
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE)
        .lean(),
      Product.countDocuments(query),
      getProductCategories(),
    ]);

    products = toPlainObject(rawProducts) as ProductType[];
    total = count;
    categories = availableCategories;
  } catch (error) {
    products = mockProducts;
    total = mockProducts.length;
    categories = [...new Set(mockProducts.map((item) => item.category))];
    dbWarning =
      error instanceof Error
        ? `Database unavailable (${error.message}). Showing sample products.`
        : "Database unavailable. Showing sample products.";
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      {dbWarning && (
        <p className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          {dbWarning}
        </p>
      )}
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4 md:flex-row md:items-center">
        <form className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-4">
          <input
            name="search"
            defaultValue={(params.search as string) || ""}
            placeholder="Search products"
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2"
          />
          <select
            name="category"
            defaultValue={(params.category as string) || ""}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            name="sort"
            defaultValue={sort}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price low to high</option>
            <option value="price-desc">Price high to low</option>
          </select>
          <button className="rounded-xl bg-[#2563EB] px-4 py-2 font-semibold">Apply</button>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => {
          const nextPage = index + 1;
          const nextParams = new URLSearchParams(params as Record<string, string>);
          nextParams.set("page", String(nextPage));
          return (
            <Link
              key={nextPage}
              href={`/products?${nextParams.toString()}`}
              className={`rounded-lg border px-3 py-2 text-sm ${
                nextPage === page
                  ? "border-[#2563EB] bg-[#2563EB]/20"
                  : "border-slate-700 bg-slate-900"
              }`}
            >
              {nextPage}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
