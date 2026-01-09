import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = req.cookies.get("refresh_token_working_app")?.value;

  if (!refreshToken) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  const result = await res.json();

  if (!res.ok || !result?.accessToken) {
    cookieStore.delete("token_working_app");
    cookieStore.delete("refresh_token_working_app");

    return NextResponse.json({ success: false }, { status: 401 });
  }

  cookieStore.set("token_working_app", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 20,
  });

  return NextResponse.json({ success: true });
}
