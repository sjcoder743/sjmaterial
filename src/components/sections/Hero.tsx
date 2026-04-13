"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative pt-40 pb-20 flex flex-col items-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600 opacity-20 blur-[180px] rounded-full animate-pulse" />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-bold"
      >
        Built for Builders.
        <span className="text-blue-500"> Powered by SJMaterial.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-6 text-gray-400 max-w-2xl"
      >
        Shop trusted construction and interior products with transparent pricing, quick dispatch,
        and dependable quality.
      </motion.p>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <Link href="/products" className="mt-8 inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium cursor-pointer">
          Shop Now
        </Link>
      </motion.div>
    </section>
  );
}
