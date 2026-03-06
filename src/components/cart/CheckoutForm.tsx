"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CheckoutForm() {
  const router = useRouter();
  const { items, totalPrice, clear } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    email: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">("COD");

  const placeOrder = async () => {
    setLoading(true);
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, address, paymentMethod, totalAmount: totalPrice }),
    });

    const data = await response.json();
    setLoading(false);
    if (response.ok) {
      clear();
      router.push(`/checkout/confirm?orderId=${data.orderId}`);
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-950 p-6">
      <div className="mb-6 flex gap-2 text-sm">
        {["Address", "Payment", "Confirm"].map((label, index) => (
          <div key={label} className={`rounded px-3 py-1 ${step >= index + 1 ? "bg-[#2563EB]/30" : "bg-slate-800"}`}>
            {label}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {Object.entries(address).map(([key, value]) => (
            <input
              key={key}
              placeholder={key}
              value={value}
              onChange={(e) => setAddress((prev) => ({ ...prev, [key]: e.target.value }))}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
            />
          ))}
          <button onClick={() => setStep(2)} className="md:col-span-2 rounded-lg bg-[#2563EB] px-4 py-2 font-semibold">
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <label className="flex items-center gap-2 rounded-lg border border-slate-700 p-3">
            <input type="radio" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} />
            Cash on Delivery
          </label>
          <label className="flex items-center gap-2 rounded-lg border border-slate-700 p-3">
            <input type="radio" checked={paymentMethod === "ONLINE"} onChange={() => setPaymentMethod("ONLINE")} />
            Online Payment (placeholder)
          </label>
          <button onClick={() => setStep(3)} className="rounded-lg bg-[#2563EB] px-4 py-2 font-semibold">
            Continue
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <p className="text-slate-400">Review your order and submit.</p>
          <p className="text-xl font-bold">Total: ₹{totalPrice.toLocaleString()}</p>
          <button onClick={placeOrder} disabled={loading} className="rounded-lg bg-[#2563EB] px-5 py-2 font-semibold">
            {loading ? "Placing order..." : "Place order"}
          </button>
        </div>
      )}
    </div>
  );
}
