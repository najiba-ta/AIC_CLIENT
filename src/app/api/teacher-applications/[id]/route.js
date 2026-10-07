import { NextResponse } from "next/server";
import { verifyUserSession, verifyAdminSession, getBackendAdminHeaders } from "@/lib/auth";

export async function GET(request, context) {
  try {
    const { id } = (await context.params) || {};
    if (!id) {
      return NextResponse.json({ error: "Application ID is required." }, { status: 400 });
    }

    const backendBaseUrl = (
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000"
    ).replace(/\/+$/, "");

    // Check user session first
    const userSession = await verifyUserSession(request);
    let authHeader = null;

    if (userSession?.backendToken) {
      authHeader = `Bearer ${userSession.backendToken}`;
    } else {
      // Check admin session
      const adminSession = await verifyAdminSession(request);
      if (adminSession) {
        const backendRes = await fetch(`${backendBaseUrl}/api/admin/teacher-applications/${id}`, {
          method: "GET",
          headers: getBackendAdminHeaders(adminSession),
          cache: "no-store",
        });
        const data = await backendRes.json();
        return NextResponse.json(data, { status: backendRes.status });
      }
    }

    if (!authHeader) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const backendRes = await fetch(`${backendBaseUrl}/api/teacher-applications/${id}`, {
      method: "GET",
      headers: { Authorization: authHeader },
      cache: "no-store",
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("[Teacher Application ID GET Error]", error);
    return NextResponse.json(
      { error: "Internal server error fetching application." },
      { status: 500 }
    );
  }
}
