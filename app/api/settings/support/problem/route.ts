import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token_working_app")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  const body = await req.json();
  const { problem_type } = body;

  if (!problem_type) {
    return NextResponse.json(
      { success: false, message: "problem_type is required" },
      { status: 400 },
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/problem-reports`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  const result = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      {
        success: false,
        message: result.message || "Failed to submit problem report",
      },
      { status: res.status },
    );
  }

  return NextResponse.json(result);
}
