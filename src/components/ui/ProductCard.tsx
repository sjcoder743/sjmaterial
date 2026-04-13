"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Product } from "@/types/product";
import AddToCartButton from "@/components/ui/AddToCartButton";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered || product.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
    }, 1500);

    return () => clearInterval(interval);
  }, [isHovered, product.images.length]);

  return (
    <Link href={`/products/${product._id}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        className="card p-6 text-center cursor-pointer border border-[#222] rounded-2xl bg-[#121212]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImage(0);
        }}
      >
        <div className="h-40 bg-[#222] rounded-xl mb-4 overflow-hidden flex items-center justify-center">
          <Image
            src={product.images[currentImage] || "/next.svg"}
            alt={product.name}
            width={220}
            height={160}
            className="h-full w-auto object-cover transition-all duration-500"
          />
        </div>

        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="text-gray-400 text-sm mt-2">{product.description}</p>
        <p className="mt-4 text-blue-500 font-semibold">₹{product.price}</p>

        <AddToCartButton product={product} />
      </motion.div>
    </Link>
  );
}
