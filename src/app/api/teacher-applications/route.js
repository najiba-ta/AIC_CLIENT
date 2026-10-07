import { NextResponse } from "next/server";
import { verifyUserSession } from "@/lib/auth";

export async function POST(request) {
  try {
    const session = await verifyUserSession(request);

    if (!session || !session.id) {
      return NextResponse.json(
        { error: "Authentication required. Please log in as a teacher to submit an employment application." },
        { status: 401 }
      );
    }

    if (session.role !== "teacher") {
      return NextResponse.json(
        { error: "Only accounts registered with the Teacher role can submit this application." },
        { status: 403 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON request payload." }, { status: 400 });
    }

    const backendBaseUrl = (
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000"
    ).replace(/\/+$/, "");

    if (session.backendToken) {
      try {
        const backendRes = await fetch(`${backendBaseUrl}/api/teacher-applications`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.backendToken}`,
          },
          body: JSON.stringify(body),
        });

        const backendData = await backendRes.json();

        if (!backendRes.ok) {
          return NextResponse.json(
            {
              error:
                backendData?.message ||
                backendData?.error ||
                "Failed to submit teacher application to backend server.",
              applicationId: backendData?.applicationId,
              status: backendData?.status,
              teacherId: backendData?.teacherId,
            },
            { status: backendRes.status }
          );
        }

        return NextResponse.json(backendData, { status: 201 });
      } catch (backendErr) {
        console.error("[Backend Teacher Application Proxy Error]", backendErr);
        return NextResponse.json(
          { error: "Could not connect to AIC_SERVER to submit teacher application." },
          { status: 502 }
        );
      }
    }

    return NextResponse.json(
      { error: "Invalid session token. Please re-authenticate." },
      { status: 401 }
    );
  } catch (error) {
    console.error("[Teacher Application Route Error]", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error submitting teacher application." },
      { status: 500 }
    );
  }
}

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
        console.error("[Teacher Application GET Error]", err);
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
    console.error("[Teacher Application Route GET Error]", error);
    return NextResponse.json(
      { error: "Internal server error fetching teacher application." },
      { status: 500 }
    );
  }
}
