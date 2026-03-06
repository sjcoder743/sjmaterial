import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getCurrentSession();
  if (!session || session.role !== "admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  await connectDB();

  const contentType = request.headers.get("content-type") || "";
  let status = "pending";
  if (contentType.includes("application/json")) {
    const body = await request.json();
    status = body.status;
  } else {
    const formData = await request.formData();
    status = String(formData.get("status") || "pending");
  }

  const { id } = await params;
  const order = await Order.findByIdAndUpdate(id, { status }, { new: true }).lean();

  return NextResponse.json(order);
}
