import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = req.cookies.get("token_working_app")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me/break/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { success: false, message: data?.message || "Unauthorize" },
      { status: 401 },
    );
  }

  return NextResponse.json({
    success: true,
  });
}
