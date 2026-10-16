"use client";

import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Sparkles,
  Heart,
  ArrowRight,
  BookOpen,
  Coffee,
  HeartHandshake,
  Utensils,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function EventsClient() {
  const { isBn } = useLanguage();

  const upcomingEvents = isBn
    ? [
        {
          title: "সাপ্তাহিক ফ্যামিলি নাইট ও আলোচনা সভা",
          category: "পারিবারিক ও সামাজিক",
          date: "প্রতি শুক্রবার সন্ধ্যা",
          time: "৭:০০ PM – ৯:০০ PM (মাগরিবের পর)",
          location: "মূল কমিউনিটি হল",
          description:
            "পরিবার ও শিশুদের নিয়ে একটি প্রাণবন্ত সাপ্তাহিক আয়োজন—যার মধ্যে রয়েছে দ্বীনি আলোচনা ও পারিবারিক সৌহার্দ্য বিনিময়।",
          audience: "সকল পরিবার ও বয়সের সদস্য",
          icon: Users,
        },
        {
          title: "যুব কিয়ামুল লাইল ও নেতৃত্ব বিকাশ",
          category: "যুব কার্যক্রম",
          date: "মাসের শেষ শনিবার",
          time: "১০:০০ PM – ৬:০০ AM (সারারাতব্যাপী)",
          location: "সেন্টার লাউঞ্জ ও হল",
          description:
            "তরুণ ও শিক্ষার্থীদের জন্য বিশেষ রাত্রিকালীন প্রোগ্রাম—তাহাজ্জুদ নামাজ, গঠনমূলক আড্ডা ও দিকনির্দেশনা।",
          audience: "কিশোর ও তরুণ সমাজ (১৩–২৪ বছর)",
          icon: Sparkles,
        },
        {
          title: "সাপ্তাহিক তাজবীদ ও কুরআন নিবিড় কর্মশালা",
          category: "শিক্ষা ও প্রশিক্ষণ",
          date: "শনি ও রবিবার সকাল",
          time: "৯:০০ AM – ১২:০০ PM",
          location: "শিক্ষা ক্লাসরুম",
          description:
            "অভিজ্ঞ কারীগণের দিকনির্দেশনায় বিশুদ্ধ তিলাওয়াত ও তাজবীদের নিয়মানুযায়ী কুরআন পড়া সুন্দর করার বিশেষ সেশন।",
          audience: "নারী, পুরুষ ও কিশোর-কিশোরী",
          icon: BookOpen,
        },
        {
          title: "মা-বোনদের বিশেষ চা-চক্র ও হালাকাহ",
          category: "বোনদের নেটওয়ার্ক",
          date: "প্রতি মাসের দ্বিতীয় রবিবার",
          time: "২:০০ PM – ৪:০০ PM",
          location: "মহিলাদের মিলনায়তন ও হল",
          description:
            "মা-বোনদের পারস্পরিক সৌহার্দ্য বৃদ্ধি ও সমসাময়িক বিষয়ে ইসলামী দৃষ্টিকোণ থেকে খোলামেলা আলোচনার প্ল্যাটফর্ম।",
          audience: "সকল বয়সের মা ও বোনেরা",
          icon: Coffee,
        },
        {
          title: "খাদ্য সহায়তা ও যাকাত সামগ্রী বিতরণ",
          category: "ত্রাণ ও মানবকল্যাণ",
          date: "প্রতি মাসের প্রথম শনিবার",
          time: "১০:০০ AM – ২:০০ PM",
          location: "কমিউনিটি সেন্টার প্রাঙ্গণ",
          description:
            "অসহায় পরিবারের মাঝে খাদ্য সামগ্রী প্যাকেটজাতকরণ ও সম্মানজনক উপায়ে সুষ্ঠু বিতরণ কার্যক্রম।",
          audience: "স্বেচ্ছাসেবক ও সহায়তা গ্রহীতাবৃন্দ",
          icon: Utensils,
        },
        {
          title: "উন্মুক্ত সম্প্রীতি দিবস ও মতবিনিময়",
          category: "সামাজিক সম্প্রীতি",
          date: "ত্রৈমাসিক বিশেষ আয়োজন",
          time: "১:০০ PM – ৪:০০ PM",
          location: "মূল সেন্টার চত্বর",
          description:
            "প্রতিবেশী ও বিভিন্ন শ্রেণি-পেশার মানুষের জন্য সেন্টারের দ্বার উন্মোচন, সাংস্কৃতিক প্রদর্শনী ও প্রশ্নোত্তর পর্ব।",
          audience: "সর্বসাধারণ ও শুভাকাঙ্ক্ষী",
          icon: HeartHandshake,
        },
      ]
    : [
        {
          title: "Weekly Family Night & Potluck Halaqah",
          category: "Family & Community",
          date: "Every Friday Evening",
          time: "7:00 PM – 9:00 PM (After Maghrib)",
          location: "Main Community Hall",
          description:
            "An inspiring weekly gathering for families, featuring a short spiritual lecture, interactive youth discussions, and a community potluck dinner.",
          audience: "All Families & Ages",
          icon: Users,
        },
        {
          title: "Youth Qiyam & Leadership Gathering",
          category: "Youth Program",
          date: "Last Saturday of the Month",
          time: "10:00 PM – 6:00 AM (Overnight)",
          location: "Center Youth Lounge & Hall",
          description:
            "An engaging overnight program for middle, high school, and college youth focusing on night prayers (tahajjud), brotherhood/sisterhood mentorship, sports, and breakfast.",
          audience: "Youth (Ages 13–24)",
          icon: Sparkles,
        },
        {
          title: "Weekend Tajweed & Qur'an Intensive",
          category: "Education & Workshop",
          date: "Saturday & Sunday Mornings",
          time: "9:00 AM – 12:00 PM",
          location: "Education Classrooms",
          description:
            "Comprehensive recitation and tajweed refinement workshop guided by qualified huffadh and scholars for brothers and sisters seeking fluency in Qur'an reading.",
          audience: "Brothers, Sisters, and Teens",
          icon: BookOpen,
        },
        {
          title: "Sisterhood Tea Social & Halaqah",
          category: "Sisters Network",
          date: "Every Second Sunday",
          time: "2:00 PM – 4:00 PM",
          location: "Sisters Hall & Lounge",
          description:
            "A warm and supportive space for sisters to connect over tea and refreshments, explore contemporary topics from an Islamic lens, and cultivate sisterhood.",
          audience: "Sisters of All Ages",
          icon: Coffee,
        },
        {
          title: "Community Food Drive & Zakat Distribution",
          category: "Charity & Welfare",
          date: "First Saturday of Every Month",
          time: "10:00 AM – 2:00 PM",
          location: "Community Center Pavilion",
          description:
            "Volunteers gather to pack and distribute essential food packages and support items to local families and individuals in need.",
          audience: "Volunteers & Community Beneficiaries",
          icon: Utensils,
        },
        {
          title: "Interfaith Community Open House",
          category: "Outreach & Dialogue",
          date: "Quarterly Program",
          time: "1:00 PM – 4:00 PM",
          location: "Main Center & Courtyard",
          description:
            "Opening our center doors to neighbors and civic friends for guided tours, Islamic cultural exhibitions, question-and-answer sessions, and refreshments.",
          audience: "General Public & Neighbors",
          icon: HeartHandshake,
        },
      ];

  return (
    <main className="flex-1 w-full bg-[#FAF8F2] text-[#252525]">
      {/* Header Section */}
      <section className="relative w-full bg-[#FAF8F2] py-16 sm:py-24 px-3.5 sm:px-6 lg:px-8 border-b border-[#E5DFD3] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[450px] rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(241, 237, 227, 0.8) 0%, rgba(184, 149, 80, 0.12) 50%, transparent 70%)",
            }}
          />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B89550]/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center min-w-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#B89550]/40 text-xs sm:text-sm font-semibold text-[#B89550] shadow-2xs mb-4">
            <Calendar className="w-4 h-4 text-[#B89550]" />
            <span>{isBn ? "কমিউনিটি ইভেন্টস ও সম্মেলন" : "Community Calendar & Gatherings"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#252525] leading-tight">
            {isBn ? "আসন্ন " : "Upcoming "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C]">
              {isBn ? "ইভেন্টস ও সম্মিলন" : "Events & Programs"}
            </span>
          </h1>

          <div className="flex items-center justify-center gap-2 my-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#B89550]/60" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#B89550]" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#B89550]/60" />
          </div>

          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-[#595959] leading-relaxed font-normal">
            {isBn
              ? "পারিবারিক মিলনমেলা, যুব সমাজের উন্নয়ন, নিয়মিত হালাকাহ এবং কল্যাণমূলক কার্যক্রমে অংশ নিন।"
              : "Engaging lectures, spiritual retreats, youth lock-ins, and community outreach events at Al Hidayah Islamic Center."}
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 px-3.5 sm:px-6 lg:px-8 bg-white border-b border-[#E5DFD3]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {upcomingEvents.map((evt, idx) => {
              const Icon = evt.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl glass-panel p-6 sm:p-7 shadow-lg flex flex-col justify-between relative overflow-hidden group hover:border-[#B89550]/60 transition-all duration-300"
                >
                  <div className="glass-specular-top" />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-stone-200/60">
                      <div className="w-11 h-11 rounded-xl bg-white/90 backdrop-blur-xs text-[#B89550] border border-[#B89550]/30 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 border border-stone-200 text-[#B89550]">
                        {evt.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#252525] group-hover:text-[#B89550] transition-colors">
                        {evt.title}
                      </h3>
                      <div className="mt-2.5 space-y-1 text-xs text-[#8C827A]">
                        <p className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#B89550] shrink-0" />
                          <span>{evt.date}</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#B89550] shrink-0" />
                          <span>{evt.time}</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#B89550] shrink-0" />
                          <span>{evt.location}</span>
                        </p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="pt-3 border-t border-stone-200/60">
                      <span className="text-[11px] text-[#8C827A] flex items-center gap-1.5 font-medium">
                        <Users className="w-3.5 h-3.5 text-[#B89550]" />
                        <span>{isBn ? "অংশগ্রহণকারী: " : "Audience: "} {evt.audience}</span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-stone-200/60">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-white/80 hover:bg-white text-xs font-bold text-[#252525] border border-stone-200 hover:border-[#B89550]/60 transition-all shadow-2xs"
                    >
                      <span>{isBn ? "ইভেন্ট সম্পর্কে জানুন" : "RSVP / Inquire"}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B89550]" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Suggest Event / Host Banner */}
      <section className="relative w-full py-16 sm:py-20 px-3.5 sm:px-6 lg:px-8 bg-[#FAF8F2]">
        <div className="max-w-4xl mx-auto text-center p-8 sm:p-10 rounded-3xl glass-panel relative overflow-hidden">
          <div className="glass-specular-top" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525]">
            {isBn ? "কোনো কমিউনিটি ইভেন্ট আয়োজন করতে চান?" : "Host or Propose a Community Event"}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#595959] max-w-xl mx-auto leading-relaxed">
            {isBn
              ? "আমাদের কমিউনিটি হল ও প্রাঙ্গণে নিকাহ, পারিবারিক সম্মিলন বা বিশেষ সেমিনার আয়োজনের জন্য প্রশাসনের সাথে যোগাযোগ করুন।"
              : "Our center facilities are open for nikah ceremonies, educational workshops, family milestones, and memorial gatherings."}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-gold !px-7 !py-3 !text-sm shadow-md shadow-[#B89550]/25 hover:shadow-xl hover:shadow-[#B89550]/35"
            >
              <div className="absolute top-0 inset-x-0 h-px bg-white/40 pointer-events-none" />
              <span>{isBn ? "প্রশাসন দপ্তরে যোগাযোগ" : "Contact Event Coordinator"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
