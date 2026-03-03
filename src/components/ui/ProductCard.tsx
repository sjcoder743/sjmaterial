"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered || product.images.length <= 1) {
      setCurrentImage(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }, 1500);

    return () => clearInterval(interval);
  }, [isHovered, product.images.length]);

  return (
    <Link href={`/products/${product._id}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        className="card p-6 text-center cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="h-40 bg-[#222] rounded-xl mb-4 overflow-hidden flex items-center justify-center">
          <img
            src={product.images[currentImage]}
            alt={product.name}
            className="h-full object-cover transition-all duration-500"
          />
        </div>

        <h3 className="text-lg font-medium">{product.name}</h3>

        <p className="text-gray-400 text-sm mt-2">
          {product.description}
        </p>

        <p className="mt-4 text-blue-500 font-semibold">
          ₹{product.price}
        </p>

        <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
          Add to Cart
        </button>
      </motion.div>
    </Link>
  );
}