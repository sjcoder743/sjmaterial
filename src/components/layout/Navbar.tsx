"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b transition-all duration-300
          ${scrolled
            ? "bg-black/80 py-3 border-[#2a2a2a]"
            : "bg-black/40 py-5 border-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          <Link href="/" className="text-2xl font-bold">
            SJMaterial
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/products" className="hover:text-blue-400">
              Products
            </Link>
            <Link href="/categories" className="hover:text-blue-400">
              Categories
            </Link>
            <Link href="/contact" className="hover:text-blue-400">
              Contact
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            <Link href="/cart">
              <ShoppingCart className="w-5 h-5 hover:text-blue-400" />
            </Link>
            <Link href="/account">
              <User className="w-5 h-5 hover:text-blue-400" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-70px left-0 w-full bg-black border-b border-[#2a2a2a] md:hidden z-40"
          >
            <div className="flex flex-col items-center py-6 gap-6">
              <Link href="/products" onClick={() => setMenuOpen(false)}>
                Products
              </Link>
              <Link href="/categories" onClick={() => setMenuOpen(false)}>
                Categories
              </Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}