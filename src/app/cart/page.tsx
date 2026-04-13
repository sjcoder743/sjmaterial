"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="pt-32 px-6 max-w-5xl mx-auto pb-20">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <div className="border border-[#2a2a2a] rounded-2xl p-8 text-center text-gray-400">
          Your cart is empty. <Link href="/products" className="text-blue-500">Browse products</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item._id} className="p-4 border border-[#2a2a2a] rounded-xl flex gap-4 items-center">
                <img src={item.images?.[0] || "/next.svg"} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-400 text-sm">₹{item.price}</p>
                </div>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                  className="w-16 bg-[#111] border border-[#2a2a2a] rounded px-2 py-1"
                />
                <button onClick={() => removeFromCart(item._id)} className="text-red-400 text-sm">
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="border border-[#2a2a2a] rounded-2xl p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400 mb-6">
              <span>Shipping</span>
              <span>₹0.00</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="block w-full text-center bg-blue-600 hover:bg-blue-700 rounded-lg py-2">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
