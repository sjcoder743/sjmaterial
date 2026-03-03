import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
  await connectDB();

  await Product.deleteMany({}); // reset old data

  const products = await Product.insertMany([
    {
      name: "Premium Bottle",
      description: "Durable. Stylish. Everyday essential.",
      price: 499,
      images: ["/placeholder.png", "/placeholder.png"],
      featured: true,
    },
    {
      name: "Fitness Accessory",
      description: "Built for performance and comfort.",
      price: 899,
      images: ["/placeholder.png", "/placeholder.png"],
      featured: true,
    },
    {
      name: "Lifestyle Product",
      description: "Premium design meets practicality.",
      price: 1299,
      images: ["/placeholder.png", "/placeholder.png"],
      featured: false,
    },
  ]);

  return NextResponse.json({
    message: "Database seeded successfully",
    products,
  });
}