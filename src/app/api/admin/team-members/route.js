import { NextResponse } from "next/server";
import { verifyAdminSession, getBackendAdminHeaders } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request) {
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

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const isPublished = searchParams.get("isPublished");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const query = new URLSearchParams();
    if (category && category !== "all") query.set("category", category);
    if (isPublished !== null && isPublished !== undefined && isPublished !== "all") {
      query.set("isPublished", isPublished);
    }
    if (status && status !== "all") query.set("status", status);
    if (search && search.trim()) query.set("search", search.trim());

    const backendRes = await fetch(`${backendBaseUrl}/api/admin/team-members?${query.toString()}`, {
      method: "GET",
      headers: getBackendAdminHeaders(adminSession),
      cache: "no-store",
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data?.message || data?.error || "Failed to retrieve team members from backend server.",
        },
        { status: backendRes.status === 401 ? 502 : backendRes.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("[Admin Team Members GET Error]:", error);
    return NextResponse.json(
      { success: false, error: "Network or server failure connecting to AIC backend." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const adminSession = await verifyAdminSession(request);
    if (!adminSession) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access. Admin authentication required." },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Client-side quick validation of required fields
    if (!body.fullName || !String(body.fullName).trim()) {
      return NextResponse.json(
        { success: false, error: "Full name is required." },
        { status: 400 }
      );
    }
    if (!body.designation || !String(body.designation).trim()) {
      return NextResponse.json(
        { success: false, error: "Designation / title is required." },
        { status: 400 }
      );
    }
    if (!body.category || !String(body.category).trim()) {
      return NextResponse.json(
        { success: false, error: "Category is required (Leadership, Teacher, or Administration)." },
        { status: 400 }
      );
    }

    const backendBaseUrl = (
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000"
    ).replace(/\/+$/, "");

    const backendRes = await fetch(`${backendBaseUrl}/api/admin/team-members`, {
      method: "POST",
      headers: getBackendAdminHeaders(adminSession),
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data?.message || data?.error || "Failed to create team member.",
        },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("[Admin Team Members POST Error]:", error);
    return NextResponse.json(
      { success: false, error: "Network or server failure connecting to AIC backend." },
      { status: 500 }
    );
  }
}
