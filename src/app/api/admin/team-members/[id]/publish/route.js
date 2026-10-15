import { NextResponse } from "next/server";
import { verifyAdminSession, getBackendAdminHeaders } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PATCH(request, { params }) {
  try {
    const adminSession = await verifyAdminSession(request);
    if (!adminSession) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access. Admin authentication required." },
        { status: 401 }
      );
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, error: "Member ID is required." }, { status: 400 });
    }

    let body = {};
    try {
      body = await request.json();
    } catch {
      // Body may be empty if toggling
      body = {};
    }

    const backendBaseUrl = (
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000"
    ).replace(/\/+$/, "");

    const backendRes = await fetch(`${backendBaseUrl}/api/admin/team-members/${id}/publish`, {
      method: "PATCH",
      headers: getBackendAdminHeaders(adminSession),
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data?.message || data?.error || "Failed to update publication status.",
        },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("[Admin Publish Team Member Error]:", error);
    return NextResponse.json(
      { success: false, error: "Network or server failure connecting to AIC backend." },
      { status: 500 }
    );
  }
}
