import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await verifyAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  redirect("/admin/donations");
}
