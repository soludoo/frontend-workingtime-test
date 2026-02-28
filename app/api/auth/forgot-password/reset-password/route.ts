import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password/reset-password`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );

  const result = await res.json();

  if (!res.ok || !result?.data) {
    return NextResponse.json(
      {
        success: false,
        message: result?.message || "Failed to reset password",
      },
      { status: 401 },
    );
  }

  return NextResponse.json({
    success: true,
    user: result.data,
  });
}
