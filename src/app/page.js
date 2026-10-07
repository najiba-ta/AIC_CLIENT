import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import ActivitiesSection from "@/components/home/ActivitiesSection";
import CoursesSection from "@/components/home/CoursesSection";
import FutureVisionSection from "@/components/home/FutureVisionSection";
import MissionSection from "@/components/home/MissionSection";
import DonationSection from "@/components/home/DonationSection";
import OfficialContactSection from "@/components/contact/OfficialContactSection";

export const metadata = {
  title: "Al Hidayah Islamic Center | আল হিদায়াহ ইসলামিক সেন্টার",
  description:
    "A Place of Worship, Learning & Community. Serving Faith, Educating Generations & Supporting Humanity.",
};

export default function Home() {
  return (
    <main className="flex-1">
      {/* 1. Hero: A Place of Worship, Learning & Community */}
      <Hero />

      {/* 2. Who We Are / About Al Hidayah Islamic Center */}
      <AboutSection />

      {/* 3. Our Activities: Bangladesh & USA Initiatives */}
      <ActivitiesSection />

      {/* 4. Comprehensive Islamic Education Program (Curriculum & Enroll Now) */}
      <CoursesSection />

      {/* 5. Future Vision in the USA */}
      <FutureVisionSection />

      {/* 6. Mission & Core Pillars */}
      <MissionSection />

      {/* 7. Donation / Support Our Sacred Mission */}
      <DonationSection />

      {/* 8. Connect With Us / Official Contact & Location */}
      <OfficialContactSection />
    </main>
  );
}
