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
        { error: "Application ID is required." },
        { status: 400 }
      );
    }

    const backendBaseUrl = (
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000"
    ).replace(/\/+$/, "");

    const backendRes = await fetch(`${backendBaseUrl}/api/admin/applications/${id}/approve`, {
      method: "PATCH",
      headers: getBackendAdminHeaders(adminSession),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: data?.message || data?.error || "Failed to approve application on backend server." },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[Approve Application Error]", error);
    return NextResponse.json(
      { error: "Internal server error approving application." },
      { status: 500 }
    );
  }
}

export async function POST(request, context) {
  return PATCH(request, context);
}
