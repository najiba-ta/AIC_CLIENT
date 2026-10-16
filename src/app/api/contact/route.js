import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function resolveBackendBaseUrl() {
  const url =
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:8000";
  return url.trim().replace(/\/+$/, "");
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, category, message } = body || {};

    // 1. Validation matching AIC_SERVER requirements
    const trimmedName = String(name || "").trim();
    if (!trimmedName || trimmedName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Name is required (at least 2 characters)." },
        { status: 400 }
      );
    }

    const trimmedEmail = String(email || "").trim().toLowerCase();
    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const trimmedSubject = String(subject || "").trim();
    if (!trimmedSubject || trimmedSubject.length < 2) {
      return NextResponse.json(
        { success: false, error: "Subject is required (at least 2 characters)." },
        { status: 400 }
      );
    }

    const trimmedMessage = String(message || "").trim();
    if (!trimmedMessage || trimmedMessage.length < 5) {
      return NextResponse.json(
        { success: false, error: "Message is required (at least 5 characters)." },
        { status: 400 }
      );
    }

    // 2. Prepare payload for AIC_SERVER
    const payload = {
      name: trimmedName,
      email: trimmedEmail,
      phone: String(phone || "").trim(),
      subject: trimmedSubject,
      category: String(category || "General Inquiry").trim(),
      message: trimmedMessage,
    };

    const backendBaseUrl = resolveBackendBaseUrl();
    const targetUrl = `${backendBaseUrl}/api/contact`;

    console.log(`[Contact Proxy] Forwarding contact message to ${targetUrl}`);

    const backendRes = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    let backendData;
    try {
      backendData = await backendRes.json();
    } catch {
      backendData = null;
    }

    if (!backendRes.ok || backendData?.success === false) {
      console.warn(
        `[Contact Proxy] Upstream returned status ${backendRes.status}:`,
        backendData
      );
      return NextResponse.json(
        {
          success: false,
          error:
            backendData?.message ||
            backendData?.error ||
            "Failed to send your message. Please try again shortly.",
        },
        { status: backendRes.status || 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          backendData?.message ||
          "Thank you for contacting us! We have received your message and will respond shortly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact Proxy Exception]:", error?.message || error);
    return NextResponse.json(
      {
        success: false,
        error: "Network error connecting to center server. Please try again later.",
      },
      { status: 500 }
    );
  }
}
