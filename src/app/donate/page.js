import DonationSection from "@/components/home/DonationSection";

export const metadata = {
  title: "Donate & Support | Al Hidayah Islamic Center",
  description:
    "Make a secure online donation to support the religious, educational, and community programs at Al Hidayah Islamic Center.",
};

export default function DonatePage() {
  return (
    <main className="flex-1 w-full bg-[#FAF8F2] text-[#252525]">
      <DonationSection />
    </main>
  );
}
