import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function resolveBackendUrls() {
  const configured =
    process.env.CONTACT_API_URL ||
    process.env.AIC_SERVER_URL ||
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "https://aic-server.vercel.app";

  const primary = configured.trim().replace(/\/+$/, "");
  const fallback = "https://aic-server.vercel.app";

  return { primary, fallback };
}

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON request payload.",
          message: "Invalid JSON request payload.",
        },
        { status: 400 }
      );
    }

    // 1. Spam protection honeypot check
    if (body?._hp || body?.website || body?.honeypot || body?.website_url) {
      console.warn("[Contact Proxy] Spam bot honeypot triggered. Silently rejecting.");
      return NextResponse.json(
        {
          success: false,
          error: "Spam submission detected.",
          message: "Spam submission detected.",
        },
        { status: 400 }
      );
    }

    const { name, message } = body || {};

    // 2. Validation matching AIC_SERVER requirements (only Name and Message required)
    const trimmedName = String(name || "").trim();
    if (!trimmedName || trimmedName.length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Name is required (at least 2 characters).",
          message: "Name is required (at least 2 characters).",
          error_bn: "নাম পূরণ করা আবশ্যক (কমপক্ষে ২ অক্ষর)।",
        },
        { status: 400 }
      );
    }

    const trimmedMessage = String(message || "").trim();
    if (!trimmedMessage || trimmedMessage.length < 5) {
      return NextResponse.json(
        {
          success: false,
          error: "Message is required (at least 5 characters).",
          message: "Message is required (at least 5 characters).",
          error_bn: "বার্তার বিবরণ প্রয়োজন (কমপক্ষে ৫ অক্ষর)।",
        },
        { status: 400 }
      );
    }

    // 3. Prepare payload for upstream AIC_SERVER
    const payload = {
      name: trimmedName,
      message: trimmedMessage,
    };

    const { primary, fallback } = resolveBackendUrls();
    let targetUrl = `${primary}/api/contact`;
    let backendRes;

    console.log(`[Contact Proxy] Forwarding contact message to ${targetUrl}`);

    try {
      backendRes = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });
    } catch (primaryErr) {
      // If primary was local/unreachable and fallback is different, attempt fallback to production server
      if (primary !== fallback) {
        console.warn(
          `[Contact Proxy] Primary upstream ${targetUrl} failed (${primaryErr.message}). Retrying with production fallback ${fallback}/api/contact`
        );
        targetUrl = `${fallback}/api/contact`;
        backendRes = await fetch(targetUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          cache: "no-store",
        });
      } else {
        throw primaryErr;
      }
    }

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
          status: backendRes.status,
          message:
            backendData?.message ||
            backendData?.error ||
            "Failed to send your message. Please try again shortly.",
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
        status: 200,
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
        status: 500,
        error: "Network error connecting to center server. Please try again later.",
        message: "Network error connecting to center server. Please try again later.",
      },
      { status: 500 }
    );
  }
}
