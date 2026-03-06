import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getCurrentSession } from "@/lib/auth";
import Order from "@/models/Order";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const order = await Order.findById(id).lean();
  if (!order) return NextResponse.json({ message: "Order not found" }, { status: 404 });
  return NextResponse.json(order);
}
