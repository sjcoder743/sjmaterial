import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Products from "@/models/Product";
export async function GET() {
  await connectDB();

  const products = await Products.find();

  return NextResponse.json(products);
}