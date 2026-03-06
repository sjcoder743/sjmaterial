"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/types/product";
import AddToCartButton from "@/components/ui/AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <motion.article whileHover={{ y: -6 }} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <Link
        href={`/products/${product._id}`}
        onMouseEnter={() => setActiveImage(product.images[1] ? 1 : 0)}
        onMouseLeave={() => setActiveImage(0)}
      >
        <div className="mb-4 h-48 overflow-hidden rounded-xl bg-slate-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[activeImage] || "/placeholder.png"}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-400">{product.description}</p>
      </Link>
      <div className="mt-4 flex items-center justify-between gap-2">
        <p className="text-lg font-bold text-[#2563EB]">₹{product.price.toLocaleString()}</p>
        <AddToCartButton product={product} />
      </div>
    </motion.article>
  );
}
