import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import User from "@/models/User";

export async function POST(request: Request) {
  await connectDB();
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  const exists = await User.findOne({ email });
  if (exists) return NextResponse.json({ message: "User already exists" }, { status: 409 });

  const user = await User.create({
    name,
    email,
    password: hashPassword(password),
    role: "user",
  });

  return NextResponse.json({ id: user._id, email: user.email }, { status: 201 });
}
