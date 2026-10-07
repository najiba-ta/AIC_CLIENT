import { NextResponse } from "next/server";
import { verifyUserSession } from "@/lib/auth";

export async function POST(request) {
  try {
    const session = await verifyUserSession(request);

    if (!session || !session.id) {
      return NextResponse.json(
        { error: "Authentication required. Please log in as a student to submit an admission form." },
        { status: 401 }
      );
    }

    if (session.role !== "student") {
      return NextResponse.json(
        { error: "Only accounts registered with the Student role can submit this admission form." },
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

    // Forward to AIC_SERVER backend
    if (session.backendToken) {
      try {
        const backendRes = await fetch(`${backendBaseUrl}/api/auth/admission`, {
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
                "Failed to submit admission application to backend server.",
              admissionStatus: backendData?.admissionStatus,
              admissionForm: backendData?.admissionForm,
            },
            { status: backendRes.status }
          );
        }

        return NextResponse.json(
          {
            success: true,
            message: "Application Submitted / Pending Admin Review",
            admissionStatus: "pending",
            user: backendData.user,
          },
          { status: 201 }
        );
      } catch (backendErr) {
        console.error("[Backend Admission Proxy Error]", backendErr);
        return NextResponse.json(
          { error: "Could not connect to AIC_SERVER to submit admission form." },
          { status: 502 }
        );
      }
    }

    return NextResponse.json(
      { error: "Invalid session token. Please re-authenticate." },
      { status: 401 }
    );
  } catch (error) {
    console.error("[Admission Route Error]", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error submitting admission form." },
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
        const backendRes = await fetch(`${backendBaseUrl}/api/auth/admission`, {
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
      } catch (err) {
        console.error("[Admission GET Error]", err);
      }
    }

    return NextResponse.json(
      {
        success: true,
        admissionStatus: "not_submitted",
        admissionForm: null,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error fetching admission data." },
      { status: 500 }
    );
  }
}
