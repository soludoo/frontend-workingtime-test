import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const result = await res.json();

  if (!res.ok || !result?.data?.token) {
    return NextResponse.json(
      { success: false, message: result?.message || "Login failed" },
      { status: 401 },
    );
  }

  const cookieStore = await cookies();

  cookieStore.set("token_working_app", result.data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 20,
  });

  return NextResponse.json({
    success: true,
    user: result.data.user,
  });
}
