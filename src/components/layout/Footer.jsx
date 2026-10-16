"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Heart,
  Clock,
  ShieldCheck,
  ArrowUp,
  Lock,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { FacebookIcon, YouTubeIcon } from "@/components/contact/OfficialContactSection";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const pathname = usePathname();
  const { isBn } = useLanguage();

  // Hide the public footer on admin pages (login, registration, donations dashboard)
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Orvylle+Dr%2C+Warren%2C+MI%2C+United+States%2C+Michigan";

  return (
    <footer className="w-full bg-[#161513] text-stone-200 border-t border-[#2F2B25] relative overflow-hidden mt-auto">
      {/* Subtle Ambient Radial Accent for Dark Theme */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[250px] sm:h-[350px] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(184, 149, 80, 0.22) 0%, rgba(22, 21, 19, 0) 70%)",
          }}
        />
        {/* Subtle Top Gold Line Accent */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B89550]/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: Brand & About (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative shrink-0 aspect-square w-11 h-11 rounded-full overflow-hidden flex items-center justify-center ring-2 ring-[#B89550]/30 group-hover:ring-[#B89550] transition-all duration-200">
                <Image
                  src="/images/logo.png"
                  alt="Al Hidayah Islamic Center Logo"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-brand text-lg sm:text-xl font-bold tracking-wide text-white group-hover:text-[#C9A86A] transition-colors">
                {isBn ? "আল হিদায়াহ ইসলামিক সেন্টার" : "Al Hidayah Islamic Center"}
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-md font-normal">
              {isBn
                ? "ঈমান, বিশুদ্ধ ইসলামী শিক্ষা, চারিত্রিক উৎকর্ষ ও মানবতার সেবায় নিবেদিত একটি আধুনিক দ্বীনি কেন্দ্র।"
                : "A welcoming spiritual sanctuary dedicated to faith, Islamic education, moral excellence, and compassionate community service."}
            </p>

            <div className="pt-1">
              <div className="p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 text-xs text-stone-300 space-y-1.5 max-w-md shadow-inner">
                <div className="flex items-center gap-2 text-[#C9A86A] font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#C9A86A] shrink-0" />
                  <span>{isBn ? "মসজিদ ও কেন্দ্রের সময়সূচি" : "Sanctuary Hours"}</span>
                </div>
                <p className="text-[12px] text-stone-400">
                  {isBn
                    ? "ফজর থেকে এশা—দৈনিক পাঁচ ওয়াক্ত জামাত ও দ্বীনি কার্যক্রমে উন্মুক্ত।"
                    : "Open daily for all five congregational prayers from Fajr to Isha."}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Official Contact Information (Replaced Quick Navigation & Programs) (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#C9A86A]">
                {isBn ? "যোগাযোগ" : "Contact Us"}
              </h3>
              <p className="text-[11px] text-stone-400">
                {isBn ? "অফিসিয়াল যোগাযোগ ও ঠিকানা" : "Official contact details & location"}
              </p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-stone-300">
              {/* Phone */}
              <a
                href="tel:+17869014304"
                className="flex items-center gap-2.5 text-stone-300 hover:text-[#C9A86A] transition-colors group"
                aria-label="Call Al Hidayah Islamic Center at +1 786-901-4304"
              >
                <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#C9A86A] group-hover:border-[#B89550]/50 transition-colors shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-stone-400 block leading-tight">
                    {isBn ? "ফোন" : "Phone"}
                  </span>
                  <span className="font-semibold text-white group-hover:text-[#C9A86A] transition-colors">
                    +1 786-901-4304
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:alhidayahislamiccenter26@gmail.com"
                className="flex items-center gap-2.5 text-stone-300 hover:text-[#C9A86A] transition-colors group break-all"
                aria-label="Email Al Hidayah Islamic Center at alhidayahislamiccenter26@gmail.com"
              >
                <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#C9A86A] group-hover:border-[#B89550]/50 transition-colors shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-stone-400 block leading-tight">
                    {isBn ? "ইমেইল" : "Email"}
                  </span>
                  <span className="font-semibold text-white group-hover:text-[#C9A86A] transition-colors">
                    alhidayahislamiccenter26@gmail.com
                  </span>
                </div>
              </a>

              {/* Address */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-stone-300 hover:text-[#C9A86A] transition-colors group"
                aria-label="View Al Hidayah Islamic Center address on Google Maps"
              >
                <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#C9A86A] group-hover:border-[#B89550]/50 transition-colors shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-stone-400 block leading-tight">
                    {isBn ? "ঠিকানা (ম্যাপ ডিরেকশন)" : "Location & Address"}
                  </span>
                  <span className="font-semibold text-white group-hover:text-[#C9A86A] transition-colors block">
                    Orvylle Dr
                  </span>
                  <span className="text-xs text-stone-400 block">
                    Warren, MI, United States, Michigan
                  </span>
                </div>
              </a>
            </div>

            {/* Small Social Media Links */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://www.facebook.com/profile.php?id=61594808744943"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Al Hidayah Islamic Center on Facebook"
                className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 hover:border-[#1877F2]/60 hover:bg-[#1877F2]/15 text-stone-300 hover:text-[#1877F2] flex items-center justify-center transition-all duration-200"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>

              <a
                href="https://www.youtube.com/@alhidayahislamiccenter-c8i"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Al Hidayah Islamic Center on YouTube"
                className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 hover:border-[#FF0000]/60 hover:bg-[#FF0000]/15 text-stone-300 hover:text-[#FF0000] flex items-center justify-center transition-all duration-200"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>

              <a
                href="mailto:alhidayahislamiccenter26@gmail.com"
                aria-label="Send email to Al Hidayah Islamic Center"
                className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 hover:border-[#B89550]/60 hover:bg-[#B89550]/15 text-stone-300 hover:text-[#C9A86A] flex items-center justify-center transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href="tel:+17869014304"
                aria-label="Call Al Hidayah Islamic Center"
                className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 hover:border-emerald-500/60 hover:bg-emerald-500/15 text-stone-300 hover:text-emerald-400 flex items-center justify-center transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 3: Support & Giving (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#C9A86A]">
              {isBn ? "দ্বীনি কাজে সহায়তা করুন" : "Support Our Mission"}
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-normal">
              {isBn
                ? "আপনার দান ও সদকা মসজিদের উন্নয়ন, কুরআন শিক্ষা ও আর্তমানবতার সেবায় ব্যয় হয়।"
                : "Your donations sustain prayer facilities, youth education, community welfare, and charitable outreach."}
            </p>

            <div>
              <Link
                href="/#donate"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs sm:text-sm font-bold text-white bg-[#B89550] hover:bg-[#A58342] active:scale-[0.98] rounded-xl shadow-md shadow-[#B89550]/20 hover:shadow-lg transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-px bg-white/30 pointer-events-none" />
                <Heart className="w-4 h-4 fill-white shrink-0" />
                <span>{isBn ? "দান করুন" : "Donate to Center"}</span>
              </Link>
            </div>

            <div className="pt-1 flex items-center gap-2 text-[11px] text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A86A] shrink-0" />
              <span>
                {isBn ? "স্ট্রাইপ দ্বারা সুরক্ষিত অনলাইন পেমেন্ট" : "Secure checkout powered by Stripe"}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin Portal */}
        <div className="mt-12 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p className="text-center sm:text-left">
            &copy; {currentYear} {isBn ? "আল হিদায়াহ ইসলামিক সেন্টার। সর্বস্বত্ব সংরক্ষিত।" : "Al Hidayah Islamic Center. All rights reserved."}
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-white/[0.06] text-stone-400 hover:text-[#C9A86A] transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isBn ? "অ্যাডমিন পোর্টাল" : "Admin Portal"}</span>
            </Link>

            <span className="text-stone-700">|</span>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-white/[0.06] text-stone-400 hover:text-[#C9A86A] transition-all cursor-pointer"
              aria-label="Scroll to top of page"
            >
              <span>{isBn ? "উপরে যান" : "Back to Top"}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
