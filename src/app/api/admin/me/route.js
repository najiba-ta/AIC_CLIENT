import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";

export async function GET(request) {
  const session = await verifyAdminSession(request);
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    email: session.email || process.env.ADMIN_EMAIL,
  });
}
