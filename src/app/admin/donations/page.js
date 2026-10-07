import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/auth";
import AdminDonationsClient from "@/components/admin/AdminDonationsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Donation Management | Al Hidayah Islamic Center Admin",
  description: "Secure Admin Portal for managing and reviewing donations.",
};

export default async function AdminDonationsPage() {
  // Server-side session verification before rendering any admin content
  const session = await verifyAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return <AdminDonationsClient initialAdminEmail={session.email || "Admin"} />;
}
