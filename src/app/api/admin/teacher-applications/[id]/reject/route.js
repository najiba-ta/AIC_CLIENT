import { NextResponse } from "next/server";
import { verifyAdminSession, getBackendAdminHeaders } from "@/lib/auth";

export async function PATCH(request, context) {
  try {
    const adminSession = await verifyAdminSession(request);
    if (!adminSession) {
      return NextResponse.json(
        { error: "Unauthorized access. Admin authentication required." },
        { status: 401 }
      );
    }

    const { id } = (await context.params) || {};
    if (!id) {
      return NextResponse.json(
        { error: "Teacher application ID is required." },
        { status: 400 }
      );
    }

    let body = {};
    try {
      body = await request.json();
    } catch {
      // optional body
    }

    const backendBaseUrl = (
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000"
    ).replace(/\/+$/, "");

    const backendRes = await fetch(`${backendBaseUrl}/api/admin/teacher-applications/${id}/reject`, {
      method: "PATCH",
      headers: getBackendAdminHeaders(adminSession),
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: data?.message || data?.error || "Failed to reject teacher application." },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[Reject Teacher Application Error]", error);
    return NextResponse.json(
      { error: "Internal server error rejecting teacher application." },
      { status: 500 }
    );
  }
}

export async function POST(request, context) {
  return PATCH(request, context);
}
