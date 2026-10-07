import { NextResponse } from "next/server";
import { verifyAdminSession, getBackendAdminHeaders } from "@/lib/auth";

export async function GET(request) {
  try {
    // 1. Authorize admin session (Reject unauthorized client requests before forwarding)
    const adminSession = await verifyAdminSession(request);
    if (!adminSession) {
      return NextResponse.json(
        { error: "Unauthorized access. Admin authentication required." },
        { status: 401 }
      );
    }

    // 2. Resolve backend base URL
    const backendBaseUrl = (
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000"
    ).replace(/\/+$/, "");

    // 3. Forward supported query parameters
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status") || "completed";

    const query = new URLSearchParams();
    if (page) query.set("page", page);
    if (limit) query.set("limit", limit);
    if (search) query.set("search", search);
    if (status) query.set("status", status);

    // 4. Forward request securely server-to-server to AIC_SERVER backend
    const backendResponse = await fetch(`${backendBaseUrl}/api/admin/donations?${query.toString()}`, {
      method: "GET",
      headers: getBackendAdminHeaders(adminSession),
      cache: "no-store",
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: data?.message || data?.error || "Failed to retrieve donation records from backend server." },
        { status: backendResponse.status }
      );
    }

    // 6. Normalize response structure for frontend dashboard compatibility
    const rawDonations = data?.donations || [];
    const donations = rawDonations.map((item) => ({
      ...item,
      amountUsd:
        typeof item.amountUsd === "number"
          ? item.amountUsd
          : typeof item.amount === "number"
          ? item.amount
          : item.amountInCents
          ? item.amountInCents / 100
          : parseFloat(item.amount) || 0,
      amount:
        typeof item.amount === "number"
          ? item.amount
          : typeof item.amountUsd === "number"
          ? item.amountUsd
          : parseFloat(item.amountUsd) || 0,
    }));

    const stats = {
      totalCount:
        data?.stats?.totalVerifiedDonations ??
        data?.stats?.totalCount ??
        donations.length,
      totalAmountUsd:
        data?.stats?.totalAmount ??
        data?.stats?.totalAmountUsd ??
        0,
      averageDonation: data?.stats?.averageDonation ?? 0,
      pendingDonations: data?.stats?.pendingDonations ?? 0,
      failedDonations: data?.stats?.failedDonations ?? 0,
    };

    const pagination = {
      currentPage:
        data?.pagination?.page ??
        data?.pagination?.currentPage ??
        parseInt(page, 10),
      totalPages: data?.pagination?.totalPages ?? 1,
      totalCount:
        data?.pagination?.totalCount ??
        data?.stats?.totalVerifiedDonations ??
        donations.length,
      limit:
        data?.pagination?.limit ??
        parseInt(limit, 10),
      hasNextPage: data?.pagination?.hasNextPage ?? false,
      hasPrevPage: data?.pagination?.hasPrevPage ?? false,
    };

    return NextResponse.json(
      {
        success: true,
        donations,
        pagination,
        stats,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Admin Donations BFF Proxy Error]", error?.message || "Internal Proxy Error");
    return NextResponse.json(
      { error: "Unable to connect to backend server. Please verify AIC_SERVER is running." },
      { status: 500 }
    );
  }
}
