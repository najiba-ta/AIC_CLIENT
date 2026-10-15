import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const backendBaseUrl = (
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000"
    ).replace(/\/+$/, "");

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const department = searchParams.get("department");
    const search = searchParams.get("search");

    const query = new URLSearchParams();
    if (category && category !== "all") query.set("category", category);
    if (department && department !== "all") query.set("department", department);
    if (search && search.trim()) query.set("search", search.trim());

    const backendRes = await fetch(`${backendBaseUrl}/api/team-members?${query.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data?.message || data?.error || "Failed to retrieve team members from backend server.",
        },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("[Public Team Members BFF Error]:", error);
    return NextResponse.json(
      { success: false, error: "Network or server failure connecting to AIC backend." },
      { status: 500 }
    );
  }
}
