import { NextResponse } from "next/server";
import { verifyAdminSession, getBackendAdminHeaders } from "@/lib/auth";

export const dynamic = "force-dynamic";

function resolveBackendBaseUrl() {
  const url =
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:8000";
  return url.trim().replace(/\/+$/, "");
}

export async function GET(request) {
  try {
    const adminSession = await verifyAdminSession(request);
    if (!adminSession) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access. Admin authentication required." },
        {
          status: 401,
          headers: { "x-proxy-handler": "aic-client/api/admin/team-members" },
        }
      );
    }

    const backendBaseUrl = resolveBackendBaseUrl();
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

    const queryString = query.toString();
    const targetUrl = `${backendBaseUrl}/api/admin/team-members${queryString ? `?${queryString}` : ""}`;

    console.log(`[Admin Team Members Proxy] GET -> ${backendBaseUrl}/api/admin/team-members`);

    const backendRes = await fetch(targetUrl, {
      method: "GET",
      headers: getBackendAdminHeaders(adminSession),
      cache: "no-store",
    });

    let data;
    try {
      data = await backendRes.json();
    } catch {
      data = null;
    }

    if (!backendRes.ok) {
      console.warn(
        `[Admin Team Members Proxy] Upstream returned status ${backendRes.status} for GET ${backendBaseUrl}/api/admin/team-members`
      );
      return NextResponse.json(
        {
          success: false,
          error:
            data?.message ||
            data?.error ||
            (backendRes.status === 404
              ? "Upstream team-members endpoint not found on AIC_SERVER. Ensure backend routes are registered."
              : "Failed to retrieve team members from backend server."),
          upstreamStatus: backendRes.status,
          source: "upstream_aic_server",
        },
        {
          status: backendRes.status === 401 ? 502 : backendRes.status,
          headers: {
            "x-proxy-handler": "aic-client/api/admin/team-members",
            "x-upstream-status": String(backendRes.status),
          },
        }
      );
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "x-proxy-handler": "aic-client/api/admin/team-members",
        "x-upstream-status": String(backendRes.status),
      },
    });
  } catch (error) {
    console.error("[Admin Team Members GET Proxy Error]:", error?.message || error);
    return NextResponse.json(
      {
        success: false,
        error: "Network or server failure connecting to AIC backend.",
        source: "client_proxy_exception",
      },
      {
        status: 500,
        headers: { "x-proxy-handler": "aic-client/api/admin/team-members" },
      }
    );
  }
}

export async function POST(request) {
  try {
    const adminSession = await verifyAdminSession(request);
    if (!adminSession) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access. Admin authentication required." },
        {
          status: 401,
          headers: { "x-proxy-handler": "aic-client/api/admin/team-members" },
        }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request payload." },
        {
          status: 400,
          headers: { "x-proxy-handler": "aic-client/api/admin/team-members" },
        }
      );
    }

    // Required fields validation
    if (!body?.fullName || !String(body.fullName).trim()) {
      return NextResponse.json(
        { success: false, error: "Full name is required." },
        {
          status: 400,
          headers: { "x-proxy-handler": "aic-client/api/admin/team-members" },
        }
      );
    }
    if (!body?.designation || !String(body.designation).trim()) {
      return NextResponse.json(
        { success: false, error: "Designation / title is required." },
        {
          status: 400,
          headers: { "x-proxy-handler": "aic-client/api/admin/team-members" },
        }
      );
    }
    if (!body?.category || !String(body.category).trim()) {
      return NextResponse.json(
        { success: false, error: "Category is required (Leadership, Teacher, or Administration)." },
        {
          status: 400,
          headers: { "x-proxy-handler": "aic-client/api/admin/team-members" },
        }
      );
    }

    const backendBaseUrl = resolveBackendBaseUrl();
    const targetUrl = `${backendBaseUrl}/api/admin/team-members`;

    console.log(`[Admin Team Members Proxy] POST -> ${targetUrl}`);

    const backendRes = await fetch(targetUrl, {
      method: "POST",
      headers: getBackendAdminHeaders(adminSession),
      body: JSON.stringify(body),
      cache: "no-store",
    });

    let data;
    try {
      data = await backendRes.json();
    } catch {
      data = null;
    }

    if (!backendRes.ok) {
      console.warn(
        `[Admin Team Members Proxy] Upstream returned status ${backendRes.status} for POST ${targetUrl}`
      );
      return NextResponse.json(
        {
          success: false,
          error:
            data?.message ||
            data?.error ||
            (backendRes.status === 404
              ? "Upstream team-members endpoint not found on AIC_SERVER. Ensure backend routes are registered."
              : "Failed to create team member on backend server."),
          upstreamStatus: backendRes.status,
          source: "upstream_aic_server",
        },
        {
          status: backendRes.status === 401 ? 502 : backendRes.status,
          headers: {
            "x-proxy-handler": "aic-client/api/admin/team-members",
            "x-upstream-status": String(backendRes.status),
          },
        }
      );
    }

    return NextResponse.json(data, {
      status: backendRes.status === 201 ? 201 : 200,
      headers: {
        "x-proxy-handler": "aic-client/api/admin/team-members",
        "x-upstream-status": String(backendRes.status),
      },
    });
  } catch (error) {
    console.error("[Admin Team Members POST Proxy Error]:", error?.message || error);
    return NextResponse.json(
      {
        success: false,
        error: "Network or server failure connecting to AIC backend.",
        source: "client_proxy_exception",
      },
      {
        status: 500,
        headers: { "x-proxy-handler": "aic-client/api/admin/team-members" },
      }
    );
  }
}
