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

    const {
      name,
      email,
      password,
      role,
      phone,
      department,
      avatarUrl,
      profilePicture,
      profileImage,
      guardianName,
      guardianPhone,
      classLevel,
      subject,
      qualification,
    } = body || {};

    if (!name?.trim()) {
      return NextResponse.json({ error: "Full Name is required." }, { status: 400 });
    }
    if (!email?.trim() || !email.includes("@")) {
      return NextResponse.json({ error: "A valid Email address is required." }, { status: 400 });
    }
    if (!password || password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }
    if (!["student", "teacher"].includes(role)) {
      return NextResponse.json({ error: "Please select either Student or Teacher role." }, { status: 400 });
    }

    const backendBaseUrl = (
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000"
    ).replace(/\/+$/, "");

    const selectedImage = profileImage || profilePicture || avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80";

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role,
      phone: phone || "",
      profileImage: selectedImage,
      profilePicture: selectedImage,
      ...(role === "student"
        ? {
            guardianName: guardianName || "",
            guardianPhone: guardianPhone || phone || "",
            classLevel: classLevel || department || "General",
          }
        : {
            subject: subject || department || "Islamic Studies",
            qualification: qualification || "Educator",
          }),
    };

    let backendUser = null;
    let backendToken = null;

    try {
      const backendRes = await fetch(`${backendBaseUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const backendData = await backendRes.json();

      if (!backendRes.ok || backendData.success === false) {
        return NextResponse.json(
          { error: backendData?.message || backendData?.error || "Registration failed on backend server." },
          { status: backendRes.status || 400 }
        );
      }

      backendUser = backendData.user;
      backendToken = backendData.token;
    } catch (backendErr) {
      console.error("[Backend Member Register Error]", backendErr?.message || backendErr);
      return NextResponse.json(
        { error: "Unable to connect to AIC_SERVER backend. Please ensure the backend is running." },
        { status: 502 }
      );
    }

    const token = await createUserToken({
      ...backendUser,
      backendToken,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: `Registered successfully as a ${backendUser.role}. Your application is pending administrator verification.`,
        user: backendUser,
      },
      { status: 201 }
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
    console.error("[Register Proxy Error]", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Registration failed. Please try again." },
      { status: 400 }
    );
  }
}
