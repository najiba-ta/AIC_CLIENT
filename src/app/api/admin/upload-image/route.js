import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { put } from "@vercel/blob";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const adminSession = await verifyAdminSession(request);
    if (!adminSession) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access. Admin authentication required." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") || formData.get("image");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, error: "No image file provided in upload request." },
        { status: 400 }
      );
    }

    // Validate mime type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Only JPG, PNG, and WebP are allowed." },
        { status: 400 }
      );
    }

    // Limit file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File size exceeds 5MB limit." },
        { status: 400 }
      );
    }

    const ext = file.name ? path.extname(file.name).toLowerCase() || ".jpg" : ".jpg";
    const baseName = path.basename(file.name || "profile", ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "_")
      .slice(0, 30);
    const fileName = `team/${Date.now()}-${baseName}${ext}`;

    // Priority 1: Vercel Blob Storage (Built-in, permanent, fast global CDN)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(fileName, file, {
          access: "public",
          addRandomSuffix: true,
        });

        if (blob?.url) {
          return NextResponse.json({
            success: true,
            message: "Profile image uploaded to Vercel Blob successfully.",
            url: blob.url,
          });
        }
      } catch (blobErr) {
        console.error("[Vercel Blob Upload Error]:", blobErr);
        return NextResponse.json(
          {
            success: false,
            error: `Vercel Blob upload failed: ${blobErr?.message || "Storage error"}`,
          },
          { status: 500 }
        );
      }
    }

    // Priority 2: Local storage (for local dev when running on localhost)
    if (!process.env.VERCEL) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadDir = path.join(process.cwd(), "public", "images", "team");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const localFileName = `${Date.now()}-${baseName}${ext}`;
        const filePath = path.join(uploadDir, localFileName);
        fs.writeFileSync(filePath, buffer);

        return NextResponse.json({
          success: true,
          message: "Profile image uploaded locally.",
          url: `/images/team/${localFileName}`,
        });
      } catch (localErr) {
        console.warn("[Local File Write Error]:", localErr);
      }
    }

    return NextResponse.json(
      {
        success: false,
        error:
          "Vercel Blob স্টোরেজ পাওয়া যায়নি। অনুগ্রহ করে প্রজেক্টটি রি-ডেপ্লয় করুন অথবা ছবির সরাসরি URL পেস্ট করুন।",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("[Upload Image Error]:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process image upload." },
      { status: 500 }
    );
  }
}
