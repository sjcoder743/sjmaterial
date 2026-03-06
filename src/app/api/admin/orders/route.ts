import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET() {
  const session = await getCurrentSession();
  if (!session || session.role !== "admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(orders);
}
