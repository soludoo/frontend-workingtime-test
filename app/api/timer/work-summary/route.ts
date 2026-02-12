import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token_working_app")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/me/work-summary/today`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const result = await res.json();

  if (res.status === 401 || res.status === 403) {
    const response = NextResponse.json(
      {
        success: false,
        message: result?.message || "Session expired. Please login again.",
      },
      { status: res.status },
    );
    return response;
  }

  return NextResponse.json(result);
}
