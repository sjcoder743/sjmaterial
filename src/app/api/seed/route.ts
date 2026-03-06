import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
  await connectDB();

  await Product.deleteMany({});

  const products = await Product.insertMany([
    {
      name: "Architect Concrete Panel",
      description: "Textured premium concrete panel for luxury facade and interiors.",
      price: 2499,
      images: ["https://images.unsplash.com/photo-1611486212355-d276af4581c0?w=1200"],
      featured: true,
      category: "Wall Panels",
      stock: 24,
    },
    {
      name: "Ceramic Floor Tile",
      description: "Scratch resistant matte finish tile with premium edge profile.",
      price: 899,
      images: ["https://images.unsplash.com/photo-1617104551722-3b2d51366436?w=1200"],
      featured: true,
      category: "Flooring",
      stock: 120,
    },
    {
      name: "Industrial Pendant Light",
      description: "Minimal pendant with brushed metal body for premium projects.",
      price: 3599,
      images: ["https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=1200"],
      featured: false,
      category: "Lighting",
      stock: 52,
    },
  ]);

  return NextResponse.json({ message: "Database seeded successfully", products });
}
