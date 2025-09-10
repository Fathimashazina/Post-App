import { COOKIE_NAME } from "@/constants";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME);
  if (!token) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const { value } = token;

  const secret = process.env.JWT_SECRET || "";
  try {
    const decoded = jwt.verify(value, secret);
    const response = {
      user: "admin",
      decoded,
    };
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
