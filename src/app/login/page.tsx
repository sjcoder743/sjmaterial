"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) router.push("/");
  };

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-6 text-3xl font-bold">Login</h1>
      <form onSubmit={submit} className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950 p-6">
        <input className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full rounded-lg bg-[#2563EB] py-2 font-semibold">Login</button>
      </form>
    </section>
  );
}
