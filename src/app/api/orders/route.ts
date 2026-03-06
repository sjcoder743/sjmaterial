import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getCurrentSession } from "@/lib/auth";
import Order from "@/models/Order";

export async function POST(request: Request) {
  await connectDB();
  const session = await getCurrentSession();
  const body = await request.json();

  const order = await Order.create({
    orderId: `SJM-${Date.now()}-${randomUUID().slice(0, 6).toUpperCase()}`,
    userId: session?.sub,
    email: session?.email || body.address?.email,
    items: body.items,
    address: body.address,
    paymentMethod: body.paymentMethod,
    totalAmount: body.totalAmount,
    status: "pending",
  });

  return NextResponse.json({ orderId: order.orderId }, { status: 201 });
}

export async function GET() {
  await connectDB();
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const orders = await Order.find(session.role === "admin" ? {} : { userId: session.sub }).lean();
  return NextResponse.json(orders);
}
