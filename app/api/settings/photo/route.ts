import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ======================
// GET PHOTO
// ======================
export async function GET(req: NextRequest) {
  const token = req.cookies.get("token_working_app")?.value;

  const res = await fetch(`${BASE_URL}/me/profile/photo`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { success: false, message: result.message || "Unauthorized" },
      { status: res.status },
    );
  }

  return NextResponse.json(result);
}

// ======================
// POST PHOTO (Upload)
// ======================
export async function POST(req: NextRequest) {
  const token = req.cookies.get("token_working_app")?.value;

  const formData = await req.formData();

  const res = await fetch(`${BASE_URL}/me/profile/photo`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { success: false, message: result.message || "Upload failed" },
      { status: res.status },
    );
  }

  return NextResponse.json(result);
}

// ======================
// DELETE PHOTO
// ======================
export async function DELETE(req: NextRequest) {
  const token = req.cookies.get("token_working_app")?.value;

  const res = await fetch(`${BASE_URL}/me/profile/photo`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { success: false, message: result.message || "Delete failed" },
      { status: res.status },
    );
  }

  return NextResponse.json(result);
}
