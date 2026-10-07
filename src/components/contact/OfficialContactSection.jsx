"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Navigation,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/** Official Facebook SVG icon */
function FacebookIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

/** Official YouTube SVG icon */
function YouTubeIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function OfficialContactSection({ className = "" }) {
  const { isBn } = useLanguage();

  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Orvylle+Dr%2C+Warren%2C+MI%2C+United+States%2C+Michigan";

  const contactCards = [
    {
      id: "email",
      title: isBn ? "ইমেইল করুন" : "Email Us",
      value: "alhidayahislamiccenter@gmail.com",
      href: "mailto:alhidayahislamiccenter@gmail.com",
      icon: Mail,
      iconBg: "bg-amber-500/10 text-[#B89550] border-[#B89550]/30",
      actionHint: isBn ? "ইমেইল পাঠান" : "Send an email",
      isExternal: false,
      ariaLabel: "Email Al Hidayah Islamic Center at alhidayahislamiccenter@gmail.com",
    },
    {
      id: "phone",
      title: isBn ? "কল করুন" : "Call Us",
      value: "+1 786-901-4304",
      href: "tel:+17869014304",
      icon: Phone,
      iconBg: "bg-emerald-500/10 text-emerald-700 border-emerald-300",
      actionHint: isBn ? "সরাসরি কল করুন" : "Call now",
      isExternal: false,
      ariaLabel: "Call Al Hidayah Islamic Center at +1 786-901-4304",
    },
    {
      id: "facebook",
      title: isBn ? "ফেসবুকে যুক্ত থাকুন" : "Follow Us on Facebook",
      value: "Al Hidayah Islamic Center",
      href: "https://www.facebook.com/profile.php?id=61594808744943",
      icon: FacebookIcon,
      iconBg: "bg-[#1877F2]/10 text-[#1877F2] border-[#1877F2]/30",
      actionHint: isBn ? "অফিসিয়াল ফেসবুক পেজ" : "Visit profile",
      isExternal: true,
      ariaLabel: "Follow Al Hidayah Islamic Center on Facebook",
    },
    {
      id: "youtube",
      title: isBn ? "ইউটিউবে সাবস্ক্রাইব করুন" : "Subscribe on YouTube",
      value: "Al Hidayah Islamic Center",
      href: "https://www.youtube.com/@alhidayahislamiccenter-c8i",
      icon: YouTubeIcon,
      iconBg: "bg-[#FF0000]/10 text-[#FF0000] border-[#FF0000]/30",
      actionHint: isBn ? "অফিসিয়াল ইউটিউব চ্যানেল" : "Subscribe channel",
      isExternal: true,
      ariaLabel: "Subscribe to Al Hidayah Islamic Center on YouTube",
    },
  ];

  return (
    <section
      id="contact"
      className={`relative w-full py-12 sm:py-16 md:py-20 px-3.5 sm:px-6 lg:px-8 bg-[#FAF8F2] overflow-hidden ${className}`}
    >
      <span id="connect" className="sr-only pointer-events-none" aria-hidden="true" />
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[350px] sm:h-[450px] rounded-full opacity-35 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(184, 149, 80, 0.16) 0%, rgba(241, 237, 227, 0.6) 50%, transparent 70%)",
          }}
        />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B89550]/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#B89550]/40 text-xs sm:text-sm font-semibold text-[#B89550] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B89550]" />
            <span>{isBn ? "যোগাযোগ ও সোশ্যাল মিডিয়া" : "Connect With Us"}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525] tracking-tight">
            {isBn ? "আমাদের সাথে " : "Get in Touch & "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C]">
              {isBn ? "যুক্ত থাকুন" : "Connect With Us"}
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#595959] leading-relaxed max-w-2xl mx-auto">
            {isBn
              ? "যেকোনো দ্বীনি জিজ্ঞাসা, সেবা, প্রোগ্রাম ও তথ্যের জন্য সরাসরি আমাদের সাথে যোগাযোগ করুন এবং অফিসিয়াল মাধ্যমে সংযুক্ত থাকুন।"
              : "Reach out directly through our official communication channels or follow our community updates across social media."}
          </p>
        </div>

        {/* 4 Elegant Contact / Social Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {contactCards.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.id}
                href={card.href}
                target={card.isExternal ? "_blank" : undefined}
                rel={card.isExternal ? "noopener noreferrer" : undefined}
                aria-label={card.ariaLabel}
                className="group relative rounded-2xl sm:rounded-3xl glass-card p-5 sm:p-6 flex flex-col justify-between overflow-hidden border border-white/80 hover:border-[#B89550]/50 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="glass-specular-top" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-2xs ${card.iconBg}`}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                    </div>

                    <span className="w-7 h-7 rounded-full bg-white/80 border border-[#E5DFD3] flex items-center justify-center text-[#8C827A] group-hover:text-[#B89550] group-hover:border-[#B89550]/40 transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C827A] block">
                      {card.title}
                    </span>
                    <strong className="text-sm sm:text-base font-bold text-[#252525] group-hover:text-[#B89550] transition-colors break-words block mt-0.5 leading-snug">
                      {card.value}
                    </strong>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-semibold text-[#8C827A] group-hover:text-[#B89550] transition-colors">
                  <span>{card.actionHint}</span>
                  <span className="text-xs font-bold font-mono">→</span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Separate Elegant "Visit Us" Address Area */}
        <div className="relative rounded-3xl glass-panel p-6 sm:p-8 border border-white/90 shadow-md shadow-stone-200/50 overflow-hidden">
          <div className="glass-specular-top" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left: Location Details */}
            <div className="flex items-start gap-4 sm:gap-5 min-w-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FAF8F2] border border-[#B89550]/40 flex items-center justify-center text-[#B89550] shadow-2xs shrink-0 mt-0.5">
                <MapPin className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#B89550] bg-white px-2.5 py-0.5 rounded-full border border-[#B89550]/30 shadow-3xs">
                    {isBn ? "সরাসরি সাক্ষাৎ" : "Visit Us"}
                  </span>
                  <span className="text-xs text-[#8C827A] hidden sm:inline">
                    • {isBn ? "অফিসিয়াল ঠিকানা" : "Official Physical Address"}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#252525] tracking-tight">
                  Orvylle Dr
                </h3>

                <p className="text-xs sm:text-sm md:text-base text-[#595959] font-medium leading-relaxed">
                  Warren, MI, United States, Michigan
                </p>
              </div>
            </div>

            {/* Right: "Get Directions" Google Maps CTA */}
            <div className="flex sm:shrink-0 items-center">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get Directions to Al Hidayah Islamic Center on Google Maps"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-[#B89550] hover:bg-[#A58342] active:scale-[0.98] shadow-md shadow-[#B89550]/20 hover:shadow-lg transition-all cursor-pointer group"
              >
                <Navigation className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:rotate-45" />
                <span>{isBn ? "গুগল ম্যাপে ডিরেকশন দেখুন" : "Get Directions"}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { FacebookIcon, YouTubeIcon };
