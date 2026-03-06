import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

async function guardAdmin() {
  const session = await getCurrentSession();
  return session?.role === "admin";
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await guardAdmin())) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  await connectDB();
  const { id } = await params;
  const payload = await request.json();
  const product = await Product.findByIdAndUpdate(id, payload, { new: true }).lean();
  return NextResponse.json(product);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await guardAdmin())) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  await connectDB();
  const { id } = await params;
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
