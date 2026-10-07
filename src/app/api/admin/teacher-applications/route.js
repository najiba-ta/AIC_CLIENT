import { NextResponse } from "next/server";
import { verifyAdminSession, getBackendAdminHeaders } from "@/lib/auth";

export async function GET(request) {
  try {
    const adminSession = await verifyAdminSession(request);
    if (!adminSession) {
      return NextResponse.json(
        { error: "Unauthorized access. Admin authentication required." },
        { status: 401 }
      );
    }

    const backendBaseUrl = (
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000"
    ).replace(/\/+$/, "");

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "all";
    const position = searchParams.get("position") || "all";
    const search = searchParams.get("search")?.trim() || "";
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "50";

    const query = new URLSearchParams();
    if (status && status !== "all") query.set("status", status);
    if (position && position !== "all") query.set("position", position);
    if (search) query.set("search", search);
    query.set("page", page);
    query.set("limit", limit);

    const backendHeaders = getBackendAdminHeaders(adminSession);

    const backendRes = await fetch(`${backendBaseUrl}/api/admin/teacher-applications?${query.toString()}`, {
      method: "GET",
      headers: backendHeaders,
      cache: "no-store",
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: data?.message || data?.error || "Failed to retrieve teacher applications from backend." },
        { status: backendRes.status === 401 ? 502 : backendRes.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[Admin Teacher Applications Route Error]", error);
    return NextResponse.json(
      { error: "Internal server error fetching teacher applications." },
      { status: 500 }
    );
  }
}
