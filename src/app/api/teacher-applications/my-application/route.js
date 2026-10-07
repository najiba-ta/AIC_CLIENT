import { NextResponse } from "next/server";
import { verifyUserSession } from "@/lib/auth";

export async function GET(request) {
  try {
    const session = await verifyUserSession(request);

    if (!session || !session.id) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    const backendBaseUrl = (
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000"
    ).replace(/\/+$/, "");

    if (session.backendToken) {
      try {
        const backendRes = await fetch(`${backendBaseUrl}/api/teacher-applications/my-application`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.backendToken}`,
          },
          cache: "no-store",
        });

        const backendData = await backendRes.json();
        if (backendRes.ok) {
          return NextResponse.json(backendData, { status: 200 });
        }

        return NextResponse.json(
          { error: backendData?.message || backendData?.error || "Failed to retrieve application." },
          { status: backendRes.status }
        );
      } catch (err) {
        console.error("[Teacher Application my-application Error]", err);
      }
    }

    return NextResponse.json(
      {
        success: true,
        hasApplication: false,
        application: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[my-application GET Error]", error);
    return NextResponse.json(
      { error: "Internal server error fetching teacher application." },
      { status: 500 }
    );
  }
}
