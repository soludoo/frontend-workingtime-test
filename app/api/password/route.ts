import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const token = req.cookies.get("token_working_app")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  const body = await req.json();
  const { new_password, current_password } = body;

  if (!new_password || !current_password) {
    return NextResponse.json(
      {
        success: false,
        message: "new password and current password are required",
      },
      { status: 400 },
    );
  }

  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const result = await apiRes.json();

  if (!apiRes.ok) {
    return NextResponse.json(
      {
        success: false,
        message: result.message || "Failed to change your password",
      },
      { status: apiRes.status },
    );
  }
  const response = NextResponse.json(result);
  response.cookies.set("token_working_app", "", {
    path: "/",
    maxAge: 0,
  });

  return response;
}
