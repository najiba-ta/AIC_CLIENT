import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Option 1: If IMGBB_API_KEY is configured, upload directly to cloud (free permanent hosting)
    const imgbbKey = (process.env.IMGBB_API_KEY || "4ce47775128d5818e2f8c3750f3e68e7").trim();
    if (imgbbKey) {
      try {
        const imgbbFormData = new FormData();
        imgbbFormData.append("image", buffer.toString("base64"));
        const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
          method: "POST",
          body: imgbbFormData,
        });
        const imgbbData = await imgbbRes.json();
        if (imgbbData?.success && imgbbData?.data?.url) {
          return NextResponse.json({
            success: true,
            message: "Profile image uploaded to cloud successfully.",
            url: imgbbData.data.url,
          });
        }
      } catch (cloudErr) {
        console.error("[ImgBB Upload Exception]:", cloudErr);
      }
    }

    // Option 2: Local storage (works in local development)
    try {
      const uploadDir = path.join(process.cwd(), "public", "images", "team");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const ext = file.name ? path.extname(file.name).toLowerCase() || ".jpg" : ".jpg";
      const baseName = path.basename(file.name || "profile", ext)
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, "_")
        .slice(0, 30);
      const fileName = `${Date.now()}-${baseName}${ext}`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/images/team/${fileName}`;

      return NextResponse.json({
        success: true,
        message: "Profile image uploaded successfully.",
        url: publicUrl,
      });
    } catch (fsErr) {
      console.warn("[Local File System Write Failed]:", fsErr?.message);
      if (fsErr?.code === "EROFS" || fsErr?.message?.includes("read-only")) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Vercel ক্লাউড হোস্টিংয়ে লোকাল ডিস্কে ফাইল সেভ করা যায় না (Read-only filesystem)। অনুগ্রহ করে ছবির সরাসরি লিংক (Direct Image URL যেমন ImgBB / PostImages লিংক) পেস্ট করুন অথবা .env-এ IMGBB_API_KEY যুক্ত করুন।",
          },
          { status: 400 }
        );
      }
      throw fsErr;
    }
  } catch (error) {
    console.error("[Upload Image Error]:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process image upload." },
      { status: 500 }
    );
  }
}
