import { NextResponse } from "next/server";
import { createAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const { name, email, password, confirmPassword, inviteCode } = body || {};

    // 1. Validate required fields
    if (!name?.trim() || !email?.trim() || !password || !confirmPassword || !inviteCode?.trim()) {
      return NextResponse.json(
        { error: "All fields are required (Name, Email, Invitation Code, Password, and Confirm Password)." },
        { status: 400 }
      );
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 3. Validate password strength and matching
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 }
      );
    }

    // 4. Validate restricted admin invitation code
    // Check against configured ADMIN_INVITE_CODE, ADMIN_REGISTRATION_SECRET, or ADMIN_API_KEY
    const configuredInviteCode =
      process.env.ADMIN_INVITE_CODE ||
      process.env.ADMIN_REGISTRATION_SECRET ||
      process.env.ADMIN_API_KEY;

    const providedInviteCode = inviteCode.trim();

    if (!configuredInviteCode || providedInviteCode !== configuredInviteCode) {
      return NextResponse.json(
        { error: "Invalid invitation code. Admin registration is strictly restricted to authorized center administrators." },
        { status: 403 }
      );
    }

    // 5. Send registration request to AIC_SERVER backend to create the real admin in MongoDB
    const backendBaseUrl = (
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000"
    ).replace(/\/+$/, "");

    const adminApiKey = process.env.ADMIN_API_KEY;

    let backendUser = null;
    let backendToken = null;

    try {
      const backendRes = await fetch(`${backendBaseUrl}/api/admin/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(adminApiKey
            ? {
                "x-admin-key": adminApiKey,
                "x-admin-api-key": adminApiKey,
                Authorization: `Bearer ${adminApiKey}`,
              }
            : {}),
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          adminKey: adminApiKey,
        }),
      });

      const backendData = await backendRes.json();

      if (!backendRes.ok) {
        return NextResponse.json(
          { error: backendData?.message || backendData?.error || "Failed to create admin account on backend server." },
          { status: backendRes.status }
        );
      }

      backendUser = backendData.user;
      backendToken = backendData.token;
    } catch (backendErr) {
      console.error("[Backend Admin Registration Error]", backendErr?.message || backendErr);
      return NextResponse.json(
        { error: "Unable to connect to AIC_SERVER backend. Please ensure the backend is running." },
        { status: 502 }
      );
    }

    // 6. Generate secure Next.js JWT session token for frontend state
    const token = await createAdminToken({
      email: email.trim().toLowerCase(),
      name: name.trim(),
      id: backendUser?.id,
      backendToken,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Admin account registered successfully in AIC_SERVER database.",
        user: backendUser,
      },
      { status: 201 }
    );

    // 7. Set secure HttpOnly cookie
    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error("[Admin Registration Proxy Error]", error?.message || error);
    return NextResponse.json(
      { error: "Internal server error during admin registration." },
      { status: 500 }
    );
  }
}
