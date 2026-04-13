import Image from "next/image";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/ui/AddToCartButton";

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
        <div className="bg-[#111] rounded-3xl p-8 flex items-center justify-center border border-[#222] shadow-xl">
          <Image
            src={product.images?.[0] || "/next.svg"}
            alt={product.name}
            width={540}
            height={450}
            className="max-h-[450px] w-auto object-contain"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-5xl font-bold leading-tight">{product.name}</h1>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-semibold text-blue-500">₹{product.price}</span>
            <span className="text-green-400 text-sm bg-green-400/10 px-3 py-1 rounded-full">
              In stock
            </span>
          </div>

          <p className="text-gray-400 text-lg leading-relaxed">{product.description}</p>

          <div className="flex gap-4 pt-4 items-center">
            <AddToCartButton product={JSON.parse(JSON.stringify(product))} />
          </div>

          <div className="pt-8 space-y-2 text-gray-400 text-sm">
            <p>✔ Fast delivery options available</p>
            <p>✔ 7-day replacement support</p>
            <p>✔ Secure online payments</p>
          </div>
        </div>
      </div>
    </div>
  );
}
