import { NextResponse } from "next/server";
import { verifyAdminSession, getBackendAdminHeaders } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PATCH(request) {
  try {
    const adminSession = await verifyAdminSession(request);
    if (!adminSession) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access. Admin authentication required." },
        { status: 401 }
      );
    }

    const backendBaseUrl = (
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000"
    ).replace(/\/+$/, "");

    const body = await request.json();

    const backendRes = await fetch(`${backendBaseUrl}/api/admin/team-members/reorder`, {
      method: "PATCH",
      headers: {
        ...getBackendAdminHeaders(adminSession),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data?.message || data?.error || "Failed to update display order on backend.",
        },
        { status: backendRes.status === 401 ? 502 : backendRes.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("[Admin Team Reorder PATCH Error]:", error);
    return NextResponse.json(
      { success: false, error: "Network or server failure updating display order." },
      { status: 500 }
    );
  }
}
