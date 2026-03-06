import { NextResponse } from "next/server";
import { authCookieName, createSessionToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import User from "@/models/User";

export async function POST(request: Request) {
  await connectDB();
  const { email, password } = await request.json();

  const user = await User.findOne({ email });
  if (!user || !verifyPassword(password, user.password)) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = createSessionToken({
    sub: String(user._id),
    email: user.email,
    role: user.role,
  });

  const response = NextResponse.json({ message: "Logged in" });
  response.cookies.set(authCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
