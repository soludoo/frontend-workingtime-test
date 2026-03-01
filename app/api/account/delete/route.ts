import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get("token_working_app")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  const body = await req.json();
  const { confirmation } = body;

  if (!confirmation) {
    return NextResponse.json(
      {
        success: false,
        message: "confirmation is required",
      },
      { status: 400 },
    );
  }

  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me/account`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ confirmation }),
  });

  const result = await apiRes.json();

  if (!apiRes.ok) {
    return NextResponse.json(
      {
        success: false,
        message: result.message || "Failed to delete account",
      },
      { status: apiRes.status },
    );
  }

  const response = NextResponse.json({
    success: true,
    message: "Account deleted successfully",
  });

  response.cookies.delete("token_working_app");

  return response;
}
