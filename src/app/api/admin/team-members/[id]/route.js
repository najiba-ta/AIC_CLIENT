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

export async function GET(request, { params }) {
  try {
    const adminSession = await verifyAdminSession(request);
    if (!adminSession) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access. Admin authentication required." },
        {
          status: 401,
          headers: { "x-proxy-handler": "aic-client/api/admin/team-members/[id]" },
        }
      );
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Member ID is required." },
        {
          status: 400,
          headers: { "x-proxy-handler": "aic-client/api/admin/team-members/[id]" },
        }
      );
    }

    const backendBaseUrl = resolveBackendBaseUrl();
    const targetUrl = `${backendBaseUrl}/api/admin/team-members/${id}`;

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
      return NextResponse.json(
        {
          success: false,
          error: data?.message || data?.error || "Team member not found.",
          upstreamStatus: backendRes.status,
          source: "upstream_aic_server",
        },
        {
          status: backendRes.status,
          headers: {
            "x-proxy-handler": "aic-client/api/admin/team-members/[id]",
            "x-upstream-status": String(backendRes.status),
          },
        }
      );
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "x-proxy-handler": "aic-client/api/admin/team-members/[id]",
        "x-upstream-status": String(backendRes.status),
      },
    });
  } catch (error) {
    console.error("[Admin Single Team Member GET Error]:", error?.message || error);
    return NextResponse.json(
      { success: false, error: "Network or server failure connecting to AIC backend." },
      {
        status: 500,
        headers: { "x-proxy-handler": "aic-client/api/admin/team-members/[id]" },
      }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const adminSession = await verifyAdminSession(request);
    if (!adminSession) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access. Admin authentication required." },
        {
          status: 401,
          headers: { "x-proxy-handler": "aic-client/api/admin/team-members/[id]" },
        }
      );
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Member ID is required." },
        {
          status: 400,
          headers: { "x-proxy-handler": "aic-client/api/admin/team-members/[id]" },
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
          headers: { "x-proxy-handler": "aic-client/api/admin/team-members/[id]" },
        }
      );
    }

    const backendBaseUrl = resolveBackendBaseUrl();
    const targetUrl = `${backendBaseUrl}/api/admin/team-members/${id}`;

    const backendRes = await fetch(targetUrl, {
      method: "PATCH",
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
      return NextResponse.json(
        {
          success: false,
          error: data?.message || data?.error || "Failed to update team member.",
          upstreamStatus: backendRes.status,
          source: "upstream_aic_server",
        },
        {
          status: backendRes.status,
          headers: {
            "x-proxy-handler": "aic-client/api/admin/team-members/[id]",
            "x-upstream-status": String(backendRes.status),
          },
        }
      );
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "x-proxy-handler": "aic-client/api/admin/team-members/[id]",
        "x-upstream-status": String(backendRes.status),
      },
    });
  } catch (error) {
    console.error("[Admin Single Team Member PATCH Error]:", error?.message || error);
    return NextResponse.json(
      { success: false, error: "Network or server failure connecting to AIC backend." },
      {
        status: 500,
        headers: { "x-proxy-handler": "aic-client/api/admin/team-members/[id]" },
      }
    );
  }
}

export async function PUT(request, context) {
  return PATCH(request, context);
}

export async function DELETE(request, { params }) {
  try {
    const adminSession = await verifyAdminSession(request);
    if (!adminSession) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access. Admin authentication required." },
        {
          status: 401,
          headers: { "x-proxy-handler": "aic-client/api/admin/team-members/[id]" },
        }
      );
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Member ID is required." },
        {
          status: 400,
          headers: { "x-proxy-handler": "aic-client/api/admin/team-members/[id]" },
        }
      );
    }

    const backendBaseUrl = resolveBackendBaseUrl();
    const targetUrl = `${backendBaseUrl}/api/admin/team-members/${id}`;

    const backendRes = await fetch(targetUrl, {
      method: "DELETE",
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
      return NextResponse.json(
        {
          success: false,
          error: data?.message || data?.error || "Failed to delete team member.",
          upstreamStatus: backendRes.status,
          source: "upstream_aic_server",
        },
        {
          status: backendRes.status,
          headers: {
            "x-proxy-handler": "aic-client/api/admin/team-members/[id]",
            "x-upstream-status": String(backendRes.status),
          },
        }
      );
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "x-proxy-handler": "aic-client/api/admin/team-members/[id]",
        "x-upstream-status": String(backendRes.status),
      },
    });
  } catch (error) {
    console.error("[Admin Single Team Member DELETE Error]:", error?.message || error);
    return NextResponse.json(
      { success: false, error: "Network or server failure connecting to AIC backend." },
      {
        status: 500,
        headers: { "x-proxy-handler": "aic-client/api/admin/team-members/[id]" },
      }
    );
  }
}
