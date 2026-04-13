import Link from "next/link";

const categories = [
  { name: "Cement & Concrete", description: "High-strength cement and ready-mix options" },
  { name: "Steel & Hardware", description: "Rods, sheets, fittings, and essentials" },
  { name: "Paints & Finishes", description: "Interior and exterior finishing products" },
  { name: "Plumbing & Electrical", description: "Reliable fixtures and wiring supplies" },
];

export default function CategoriesPage() {
  return (
    <div className="pt-32 px-6 max-w-6xl mx-auto pb-20">
      <h1 className="text-3xl font-bold mb-10">Shop by Category</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div key={category.name} className="border border-[#2a2a2a] rounded-2xl p-6 bg-[#111]">
            <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
            <p className="text-gray-400 mb-4">{category.description}</p>
            <Link href="/products" className="text-blue-500">Explore products →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
