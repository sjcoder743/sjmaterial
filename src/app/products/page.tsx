"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filtered = useMemo(
    () => products.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())),
    [products, query]
  );

  return (
    <div className="pt-32 px-6 max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <h1 className="text-3xl font-semibold">All Products</h1>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="bg-[#121212] border border-[#2a2a2a] rounded-lg px-4 py-2 w-full md:w-72 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
