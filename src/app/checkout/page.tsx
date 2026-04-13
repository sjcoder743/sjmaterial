"use client";

import { FormEvent, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);

  const placeOrder = (e: FormEvent) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="pt-32 px-6 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Order placed successfully 🎉</h1>
        <p className="text-gray-400">Thank you for choosing SJMaterial. Our team will contact you soon.</p>
      </div>
    );
  }

  return (
    <div className="pt-32 px-6 max-w-3xl mx-auto pb-20">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <form onSubmit={placeOrder} className="space-y-4 border border-[#2a2a2a] rounded-2xl p-6">
        <input required placeholder="Full name" className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-2" />
        <input required type="email" placeholder="Email" className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-2" />
        <input required placeholder="Phone" className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-2" />
        <textarea required placeholder="Shipping address" className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-2" rows={4} />
        <div className="flex justify-between py-2 text-lg">
          <span>Total Amount</span>
          <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-2 font-medium">
          Place Order
        </button>
      </form>
    </div>
  );
}
