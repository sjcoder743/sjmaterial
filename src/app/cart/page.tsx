"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, increase, decrease, remove, totalPrice } = useCart();

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <article key={item._id} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-slate-400">₹{item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => decrease(item._id)} className="rounded bg-slate-800 px-2">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increase(item._id)} className="rounded bg-slate-800 px-2">+</button>
              <button onClick={() => remove(item._id)} className="rounded bg-red-500/30 px-2">Remove</button>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <p className="text-xl font-bold">Total: ₹{totalPrice.toLocaleString()}</p>
        <Link href="/checkout" className="mt-3 inline-flex rounded-xl bg-[#2563EB] px-5 py-2 font-semibold">
          Proceed to Checkout
        </Link>
      </div>
    </section>
  );
}
