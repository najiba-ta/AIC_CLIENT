import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/auth";
import AdminTeamClient from "@/components/admin/AdminTeamClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Leadership & Team Management | AIC Admin",
  description: "Secure Admin Portal for managing Al Hidayah Islamic Center leadership, faculty, and administrative members.",
};

export default async function AdminTeamPage() {
  const session = await verifyAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return <AdminTeamClient initialAdminEmail={session.email || "Admin"} />;
}
