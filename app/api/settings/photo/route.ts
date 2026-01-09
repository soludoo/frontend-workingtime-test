import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token_working_app")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/me/profile/photo`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { success: false, message: result.message || "Unauthorize" },
      { status: 401 }
    );
  }

  return NextResponse.json(result);
}
