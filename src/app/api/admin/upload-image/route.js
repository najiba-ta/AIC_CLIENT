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

    const ext = file.name ? path.extname(file.name).toLowerCase() || ".jpg" : ".jpg";
    const baseName = path.basename(file.name || "profile", ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "_")
      .slice(0, 30);
    const fileName = `${Date.now()}-${baseName}${ext}`;

    // Storage Option 1: Vercel Blob Storage (Built-in for Vercel)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { put } = await import("@vercel/blob");
        const blob = await put(`team/${fileName}`, buffer, {
          access: "public",
          contentType: file.type || "image/jpeg",
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
      }
    }

    // Storage Option 2: Cloudinary (if configured)
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const cloudPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
    if (cloudName && cloudPreset) {
      try {
        const cloudFormData = new FormData();
        cloudFormData.append("file", `data:${file.type};base64,${buffer.toString("base64")}`);
        cloudFormData.append("upload_preset", cloudPreset);

        const cloudRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: cloudFormData,
          }
        );
        const cloudData = await cloudRes.json();
        if (cloudData?.secure_url) {
          return NextResponse.json({
            success: true,
            message: "Profile image uploaded to Cloudinary successfully.",
            url: cloudData.secure_url,
          });
        }
      } catch (cloudErr) {
        console.error("[Cloudinary Upload Error]:", cloudErr);
      }
    }

    // Storage Option 3: Local storage (works on local machine development)
    // Only attempt local filesystem if NOT running on Vercel Serverless
    if (!process.env.VERCEL) {
      try {
        const uploadDir = path.join(process.cwd(), "public", "images", "team");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

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
      }
    }

    // If running on Vercel without cloud storage configured:
    return NextResponse.json(
      {
        success: false,
        error:
          "Vercel ক্লাউড হোস্টিংয়ে সার্ভারলেস ফাইলসিস্টেমের কারণে সরাসরি লোকাল ডিস্কে ফাইল সেভ করা যায় না। টিম মেম্বারের ছবির জন্য নিচের 'Image URL' বক্সে ছবির সরাসরি লিংক (যেমন: PostImages/ImgBB/Google Drive লিংক) পেস্ট করুন, অথবা Vercel Dashboard -> Storage থেকে ১ ক্লিকে 'Blob' স্টোর যুক্ত করুন।",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("[Upload Image Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "ছবি আপলোড করা সম্ভব হয়নি। অনুগ্রহ করে ছবির সরাসরি URL (যেমন: postimages.org বা imgbb লিংক) পেস্ট করুন।",
      },
      { status: 500 }
    );
  }
}
