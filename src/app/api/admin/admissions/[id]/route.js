import { NextResponse } from "next/server";
import { verifyAdminSession, getBackendAdminHeaders } from "@/lib/auth";

export async function GET(request, context) {
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
        { error: "Admission or Student ID is required." },
        { status: 400 }
      );
    }

    const backendBaseUrl = (
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000"
    ).replace(/\/+$/, "");

    const backendHeaders = getBackendAdminHeaders(adminSession);

    // 1. Try fetching from /api/admin/admissions/:id
    let backendRes = await fetch(`${backendBaseUrl}/api/admin/admissions/${id}`, {
      method: "GET",
      headers: backendHeaders,
      cache: "no-store",
    });

    let data = await backendRes.json().catch(() => ({}));

    // 2. Fallback to /api/admin/applications or /api/admin/users if needed
    if (!backendRes.ok && backendRes.status === 404) {
      backendRes = await fetch(`${backendBaseUrl}/api/admin/applications/${id}`, {
        method: "GET",
        headers: backendHeaders,
        cache: "no-store",
      });
      data = await backendRes.json().catch(() => ({}));
    }

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: data?.message || data?.error || "Failed to retrieve admission details from backend server." },
        { status: backendRes.status === 401 ? 502 : backendRes.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[Admin Admission Detail BFF Error]", error);
    return NextResponse.json(
      { error: "Unable to connect to backend server. Please verify AIC_SERVER is running." },
      { status: 500 }
    );
  }
}
