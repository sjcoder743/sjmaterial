import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
  await connectDB();
  await Product.deleteMany({});
  return NextResponse.json({ message: "All products deleted" });
}