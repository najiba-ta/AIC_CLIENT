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
    const role = searchParams.get("role") || "all";
    const search = searchParams.get("search")?.trim() || "";

    const query = new URLSearchParams();
    if (status && status !== "all") query.set("status", status);
    if (role && role !== "all") query.set("role", role);
    if (search) query.set("search", search);

    let backendRes = await fetch(`${backendBaseUrl}/api/admin/applications?${query.toString()}`, {
      method: "GET",
      headers: getBackendAdminHeaders(adminSession),
      cache: "no-store",
    });

    let data = await backendRes.json();

    if (backendRes.status === 404) {
      backendRes = await fetch(`${backendBaseUrl}/api/admin/users?${query.toString()}`, {
        method: "GET",
        headers: getBackendAdminHeaders(adminSession),
        cache: "no-store",
      });
      data = await backendRes.json();
    }

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: data?.message || data?.error || "Failed to retrieve members from backend server." },
        { status: backendRes.status === 401 ? 502 : backendRes.status }
      );
    }

    const allMembers = data.applications || data.users || [];

    return NextResponse.json(
      {
        success: true,
        counts: data.counts,
        pagination: data.pagination,
        members: allMembers,
        stats: {
          total: allMembers.length,
          pending: (data.counts?.pendingStudents || 0) + (data.counts?.pendingTeachers || 0),
          approved: (data.counts?.approvedStudents || 0) + (data.counts?.approvedTeachers || 0),
          students: allMembers.filter((m) => m.role === "student").length,
          teachers: allMembers.filter((m) => m.role === "teacher").length,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Admin Members BFF Proxy Error]", error);
    return NextResponse.json(
      { error: "Unable to connect to backend server. Please verify AIC_SERVER is running." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const adminSession = await verifyAdminSession(request);
    if (!adminSession) {
      return NextResponse.json(
        { error: "Unauthorized access. Admin authentication required." },
        { status: 401 }
      );
    }

    const adminApiKey = process.env.ADMIN_API_KEY;
    if (!adminApiKey) {
      return NextResponse.json(
        { error: "Server configuration error. Admin API key is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { action, userId } = body || {};

    if (!userId || !action) {
      return NextResponse.json(
        { error: "Action and userId are required." },
        { status: 400 }
      );
    }

    const backendBaseUrl = (
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000"
    ).replace(/\/+$/, "");

    const endpoint = action === "approve" ? "approve" : "reject";

    const backendRes = await fetch(`${backendBaseUrl}/api/admin/applications/${userId}/${endpoint}`, {
      method: "PATCH",
      headers: getBackendAdminHeaders(adminSession),
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: data?.message || data?.error || `Failed to ${action} member on backend server.` },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[Admin Members POST Error]", error);
    return NextResponse.json(
      { error: "Internal server error performing action." },
      { status: 500 }
    );
  }
}
