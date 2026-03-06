"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

const links = [
  { href: "/products", label: "Products" },
  { href: "/cart", label: "Cart" },
  { href: "/admin", label: "Admin" },
];

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 inset-x-0 z-50 border-b border-slate-800 bg-black/80 backdrop-blur"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="text-xl font-bold tracking-wide">
          SJ<span className="text-[#2563EB]">Material</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm text-slate-300">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#2563EB]">
              {link.label}
            </Link>
          ))}
          <Link href="/cart" className="relative hover:text-[#2563EB]">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-[#2563EB] px-1.5 text-[10px] font-semibold text-white">
                {itemCount}
              </span>
            )}
          </Link>
          <Link href="/login" className="hover:text-[#2563EB]">
            <User className="h-5 w-5" />
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
