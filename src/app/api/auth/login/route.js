import { NextResponse } from "next/server";
import { createUserToken, USER_COOKIE_NAME } from "@/lib/auth";

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

    const { email, password } = body || {};

    if (!email?.trim() || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const inputEmail = email.trim().toLowerCase();
    const backendBaseUrl = (
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000"
    ).replace(/\/+$/, "");

    let authenticatedUser = null;
    let backendToken = null;

    try {
      const backendRes = await fetch(`${backendBaseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inputEmail, password }),
      });

      const backendData = await backendRes.json();

      if (backendRes.ok && backendData.success) {
        authenticatedUser = backendData.user;
        backendToken = backendData.token;
      } else {
        return NextResponse.json(
          { error: backendData?.message || backendData?.error || "Invalid email or password credentials." },
          { status: backendRes.status || 401 }
        );
      }
    } catch (fetchErr) {
      console.error("[Member Login Backend Error]", fetchErr?.message || fetchErr);
      return NextResponse.json(
        { error: "Unable to connect to AIC_SERVER backend. Please ensure the backend is running." },
        { status: 502 }
      );
    }

    const token = await createUserToken({
      ...authenticatedUser,
      backendToken,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Signed in successfully.",
        user: authenticatedUser,
      },
      { status: 200 }
    );

    response.cookies.set(USER_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("[Member Login Error]", error?.message || error);
    return NextResponse.json(
      { error: "Internal authentication error. Please try again." },
      { status: 500 }
    );
  }
}
