import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session || session.role !== "admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  await connectDB();

  const contentType = request.headers.get("content-type") || "";
  let payload: Record<string, unknown> = {};
  if (contentType.includes("application/json")) {
    payload = await request.json();
  } else {
    const formData = await request.formData();
    payload = Object.fromEntries(formData.entries());
  }

  const product = await Product.create({
    name: payload.name,
    description: payload.description || "Premium material",
    price: Number(payload.price || 0),
    images: payload.images ? String(payload.images).split(",") : ["https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200"],
    category: payload.category || "General",
    stock: Number(payload.stock || 0),
    featured: payload.featured === "true" || payload.featured === true,
  });

  return NextResponse.json(product, { status: 201 });
}
