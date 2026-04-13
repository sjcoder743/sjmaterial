import Link from "next/link";

export default function AccountPage() {
  return (
    <div className="pt-32 px-6 max-w-3xl mx-auto pb-20">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      <div className="border border-[#2a2a2a] rounded-2xl p-6 bg-[#111] space-y-4">
        <p className="text-gray-300">Sign in and manage your orders, addresses, and account settings.</p>
        <div className="flex gap-3">
          <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">Sign In</button>
          <button className="px-5 py-2 border border-[#2a2a2a] hover:border-blue-500 rounded-lg">Create Account</button>
        </div>
        <Link href="/cart" className="inline-block text-blue-500">Go to cart →</Link>
      </div>
    </div>
  );
}
