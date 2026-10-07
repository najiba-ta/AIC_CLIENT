import { NextResponse } from "next/server";

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

    const { amount, category, donationType, donorName, donorEmail } = body || {};

    if (!amount || Number(amount) <= 0) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid donation amount." },
        { status: 400 }
      );
    }

    // Resolve backend base URL
    const backendBaseUrl = (
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000"
    ).replace(/\/+$/, "");

    // Forward request server-to-server to AIC_SERVER Stripe checkout endpoint
    try {
      const backendRes = await fetch(`${backendBaseUrl}/api/stripe/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(amount),
          category: category || "General Donation",
          donationType: donationType || "general",
          donorName: donorName || "Anonymous Donor",
          donorEmail: donorEmail || undefined,
        }),
      });

      const data = await backendRes.json();

      if (!backendRes.ok || data?.success === false) {
        return NextResponse.json(
          {
            success: false,
            error: data?.message || data?.error || "Failed to create checkout session on payment server.",
          },
          { status: backendRes.status || 500 }
        );
      }

      return NextResponse.json(data, { status: 200 });
    } catch (backendErr) {
      console.error("[Stripe Checkout Proxy Error]", backendErr?.message || backendErr);
      return NextResponse.json(
        {
          success: false,
          error: "Unable to connect to payment server. Please verify backend URL in environment settings.",
        },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[Checkout Server Error]", err?.message || err);
    return NextResponse.json(
      { success: false, error: "Internal server error initiating donation checkout." },
      { status: 500 }
    );
  }
}
