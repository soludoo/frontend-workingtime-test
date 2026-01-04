import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const token = req.cookies.get("token_working_app")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { phone } = body;

  if (!phone) {
    return NextResponse.json(
      { success: false, message: "phone is required" },
      { status: 400 }
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/me/profile/phone`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        phone,
      }),
    }
  );

  const result = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      {
        success: false,
        message: result.message || "Failed to update name",
      },
      { status: res.status }
    );
  }

  return NextResponse.json(result);
}
