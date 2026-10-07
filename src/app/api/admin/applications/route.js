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

    const backendHeaders = getBackendAdminHeaders(adminSession);

    let backendRes = await fetch(`${backendBaseUrl}/api/admin/applications?${query.toString()}`, {
      method: "GET",
      headers: backendHeaders,
      cache: "no-store",
    });

    let data = await backendRes.json();

    if (backendRes.status === 404) {
      // Fallback to /api/admin/users for older backend deployments
      backendRes = await fetch(`${backendBaseUrl}/api/admin/users?${query.toString()}`, {
        method: "GET",
        headers: backendHeaders,
        cache: "no-store",
      });
      data = await backendRes.json();
    }

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: data?.message || data?.error || "Failed to retrieve applications from backend server." },
        { status: backendRes.status === 401 ? 502 : backendRes.status }
      );
    }

    const allApplications = data.applications || data.users || [];
    const pendingStudents = allApplications.filter(
      (app) => app.role === "student" && app.status === "pending"
    );
    const pendingTeachers = allApplications.filter(
      (app) => app.role === "teacher" && app.status === "pending"
    );

    return NextResponse.json(
      {
        success: true,
        counts: data.counts || {
          pendingStudents: pendingStudents.length,
          pendingTeachers: pendingTeachers.length,
          approvedStudents: allApplications.filter((a) => a.role === "student" && a.status === "approved").length,
          approvedTeachers: allApplications.filter((a) => a.role === "teacher" && a.status === "approved").length,
          rejectedTotal: allApplications.filter((a) => a.status === "rejected").length,
        },
        pagination: data.pagination,
        applications: allApplications,
        pendingStudents,
        pendingTeachers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Admin Applications BFF Proxy Error]", error);
    return NextResponse.json(
      { error: "Unable to connect to backend server. Please verify AIC_SERVER is running." },
      { status: 500 }
    );
  }
}
