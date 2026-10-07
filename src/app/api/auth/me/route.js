import { NextResponse } from "next/server";
import { verifyUserSession } from "@/lib/auth";

export async function GET(request) {
  try {
    const session = await verifyUserSession(request);

    if (!session || !session.id) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const backendBaseUrl = (
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000"
    ).replace(/\/+$/, "");

    // Fetch live user status directly from AIC_SERVER MongoDB via /api/auth/me
    if (session.backendToken) {
      try {
        const backendRes = await fetch(`${backendBaseUrl}/api/auth/me`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${session.backendToken}`,
          },
          cache: "no-store",
        });

        const backendData = await backendRes.json();

        if (backendRes.ok && backendData.success && backendData.user) {
          return NextResponse.json(
            {
              success: true,
              user: backendData.user,
            },
            { status: 200 }
          );
        }
      } catch (err) {
        console.warn("[Auth /me live check error]", err?.message);
      }
    }

    // Fallback to session payload if backend is unreachable
    return NextResponse.json(
      {
        success: true,
        user: {
          id: session.id,
          name: session.name,
          email: session.email,
          role: session.role,
          status: session.status,
          memberId: session.memberId,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
