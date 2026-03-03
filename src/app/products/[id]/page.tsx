import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetail({ params }: PageProps) {
  await connectDB();

  const { id } = await params;

  const product = await Product.findById(id).lean();

  if (!product) return notFound();

  return (
  <div className="pt-32 min-h-screen px-6">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

      {/* LEFT IMAGE */}
      <div className="bg-[#111] rounded-3xl p-8 flex items-center justify-center border border-[#222] shadow-xl">
        <img
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.name}
          className="max-h-[450px] object-contain"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="space-y-6">

        <h1 className="text-5xl font-bold leading-tight">
          {product.name}
        </h1>

        {/* PRICE SECTION */}
        <div className="flex items-center gap-4">
          <span className="text-3xl font-semibold text-blue-500">
            ₹{product.price}
          </span>

          <span className="text-gray-500 line-through">
            ₹{product.price + 500}
          </span>

          <span className="text-green-400 text-sm bg-green-400/10 px-3 py-1 rounded-full">
            20% OFF
          </span>
        </div>

        <p className="text-gray-400 text-lg leading-relaxed">
          {product.description}
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4 pt-4">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition font-medium">
            Add to Cart
          </button>

          <button className="px-8 py-3 border border-gray-600 hover:border-blue-500 rounded-xl transition">
            Buy Now
          </button>
        </div>

        {/* EXTRA INFO */}
        <div className="pt-8 space-y-2 text-gray-400 text-sm">
          <p>✔ Free Delivery Available</p>
          <p>✔ 7 Days Replacement Policy</p>
          <p>✔ Secure Payment Options</p>
        </div>

      </div>
    </div>
  </div>
);
}
