"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Volume2,
  BookCheck,
  Scale,
  ShieldCheck,
  Award,
  Landmark,
  Eye,
  GraduationCap,
  Sparkles,
  Gift,
  CheckCircle2,
  ArrowRight,
  ScrollText,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CoursesSection() {
  const { isBn } = useLanguage();

  const subjects = [
    {
      id: "quran",
      title: isBn ? "কুরআন" : "Qur’an",
      desc: isBn
        ? "বিশুদ্ধ তিলাওয়াত, সহীহ পঠন ও সরাসরি কুরআনুল কারীমের সাথে সার্বক্ষণিক আত্মিক সংযোগ স্থাপন।"
        : "Accurate recitation, fluent reading, and cultivating a profound spiritual connection directly with the Holy Qur'an.",
      icon: BookOpen,
      isFreeHighlight: false,
      badge: isBn ? "মূল বিষয়" : "Core Subject",
    },
    {
      id: "tajweed",
      title: isBn ? "তাজবীদ" : "Tajweed",
      desc: isBn
        ? "হরফের সঠিক মাখরাজ ও সিফাতসহ তাজবীদের নিয়ম অনুযায়ী সুন্দর ও নির্ভুলভাবে কুরআন পাঠ।"
        : "Phonetic articulation rules, Makharij points, and measured melodic recitation without vocal errors.",
      icon: Volume2,
      isFreeHighlight: false,
      badge: isBn ? "মূল বিষয়" : "Core Subject",
    },
    {
      id: "tafsir",
      title: isBn ? "তাফসীর" : "Tafsir",
      desc: isBn
        ? "কুরআনের আয়াতসমূহের গভীর অর্থ, শানে নুযূল, শিক্ষা এবং জীবন পরিচালনার ঐশী নির্দেশনার বিশদ পাঠ।"
        : "In-depth meanings, historical contexts of revelation (Asbab an-Nuzul), and divine guidance for daily life.",
      icon: ScrollText,
      isFreeHighlight: true,
      badge: isBn ? "ফ্রি অন্তর্ভুক্ত" : "FREE with Enrollment",
    },
    {
      id: "hadith",
      title: isBn ? "হাদীস" : "Hadith",
      desc: isBn
        ? "রাসূলুল্লাহ ﷺ-এর পবিত্র বাণী, সুন্নাহর সঠিক জ্ঞান এবং আধুনিক জীবনে হাদীসের বাস্তবমুখী প্রয়োগ।"
        : "Prophetic traditions, moral insights, and practical application of the authentic Sunnah of Prophet Muhammad ﷺ.",
      icon: BookCheck,
      isFreeHighlight: false,
      badge: isBn ? "মূল বিষয়" : "Core Subject",
    },
    {
      id: "fiqh",
      title: isBn ? "ফিকহ" : "Fiqh",
      desc: isBn
        ? "তাহরাত, নামাজ, রোজা, জাকাত এবং দৈনন্দিন জীবনের হালাল-হারাম ও ব্যবহারিক ইসলামী বিধিবিধান।"
        : "Practical rulings of worship, purification, Salah, fasting, and navigating everyday transactions in Islamic law.",
      icon: Scale,
      isFreeHighlight: false,
      badge: isBn ? "মূল বিষয়" : "Core Subject",
    },
    {
      id: "aqaaid",
      title: isBn ? "আকীদা" : "Aqaaid",
      desc: isBn
        ? "তাওহীদ, রিসালাত, আখিরাত ও তাকদীরসহ ঈমানের মৌলিক ভিত্তি ও স্বচ্ছ বিশ্বাস গঠন।"
        : "Fundamental articles of faith (Arkan al-Iman), Tawheed, and building steadfast intellectual and spiritual conviction.",
      icon: ShieldCheck,
      isFreeHighlight: false,
      badge: isBn ? "মূল বিষয়" : "Core Subject",
    },
    {
      id: "seerah",
      title: isBn ? "সীরাত" : "Seerah",
      desc: isBn
        ? "বিশ্বনবী হযরত মুহাম্মদ ﷺ-এর পবিত্র জীবনের সংগ্রাম, আদর্শ ও জীবন্ত শিক্ষণীয় ঘটনাপ্রবাহ।"
        : "The noble life, character, milestones, and timeless leadership model of Prophet Muhammad ﷺ.",
      icon: GraduationCap,
      isFreeHighlight: false,
      badge: isBn ? "মূল বিষয়" : "Core Subject",
    },
    {
      id: "history",
      title: isBn ? "ইসলামের ইতিহাস" : "Islamic History",
      desc: isBn
        ? "নবী-রাসূলগণের জীবনী, সাহাবায়ে কেরামের ত্যাগ ও ইসলামের সোনালী ইতিহাসের স্মরণীয় অধ্যায়।"
        : "Chronicles of the Prophets, heroic sacrifices of the Sahabah, and inspirational milestones of Islamic civilization.",
      icon: Landmark,
      isFreeHighlight: true,
      badge: isBn ? "ফ্রি অন্তর্ভুক্ত" : "FREE with Enrollment",
    },
    {
      id: "maktab",
      title: isBn ? "মক্তব" : "Maktab",
      desc: isBn
        ? "শিশু-কিশোরদের জন্য বুনিয়াদি আরবি হরফ চেনা, দোয়া, নামাজ ও প্রাথমিক ইসলামী শিষ্টাচার।"
        : "Foundational Arabic alphabet recognition, daily prophetic Duas, prayer practice, and moral Islamic manners.",
      icon: Eye,
      isFreeHighlight: false,
      badge: isBn ? "বুনিয়াদি শিক্ষা" : "Foundational",
    },
    {
      id: "hifz",
      title: isBn ? "হিফজ" : "Hifz",
      desc: isBn
        ? "অভিজ্ঞ শিক্ষকের নিবিড় তত্ত্বাবধানে তাজবীদসহ সম্পূর্ণ বা নির্বাচিত সূরা হিফজের সুশৃঙ্খল পাঠক্রম।"
        : "Structured Qur'an memorization with daily new lessons (Sabaq), retention review, and certified teacher guidance.",
      icon: Award,
      isFreeHighlight: false,
      badge: isBn ? "হিফজুল কুরআন" : "Memorization",
    },
  ];

  const programBenefits = isBn
    ? [
        "সমন্বিত ইসলামিক শিক্ষা",
        "কুরআন পাঠ ও তিলাওয়াত",
        "বিশুদ্ধ তাজবীদ প্রশিক্ষণ",
        "হিফজুল কুরআন দিকনির্দেশনা",
        "অপরিহার্য দ্বীনি জ্ঞান",
        "দৈনন্দিন ব্যবহারিক সুন্নাহ",
        "তাফসীর সম্পূর্ণ ফ্রি",
        "ইতিহাস সম্পূর্ণ ফ্রি",
        "সুশৃঙ্খল ধারাবাহিক পাঠক্রম",
        "অভিজ্ঞ শিক্ষকের তত্ত্বাবধান",
      ]
    : [
        "Comprehensive Islamic learning",
        "Qur’an reading and recitation",
        "Tajweed development",
        "Memorization guidance",
        "Essential Islamic knowledge",
        "Practical daily Islamic teachings",
        "Tafsir included FREE",
        "Islamic History included FREE",
        "Structured learning",
        "Teacher-guided education",
      ];

  return (
    <section
      id="education"
      className="relative w-full bg-[#FAF8F2] dark:bg-transparent text-[#252525] dark:text-[#F5F1E8] py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#E5DFD3] dark:border-[#D6B66D]/20 overflow-hidden"
    >
      {/* Target anchor compatibility for #courses and #education */}
      <span id="courses" className="absolute -top-24" />

      {/* Background Layers: Madrasah/Quran Background Texture with Soft White Overlay (hidden in dark mode) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none dark:hidden" aria-hidden="true">
        <div className="absolute inset-0 opacity-45 filter blur-[0.75px] scale-[1.01]">
          <Image
            src="/images/quran-madrasah-bg.jpg"
            alt="Islamic Education Background"
            fill
            unoptimized
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Soft Semi-Transparent White Overlay Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F2]/80 via-white/70 to-[#FAF8F2]/85 pointer-events-none" />

        {/* Ambient Warm Radial Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(255, 255, 255, 0.2) 0%, rgba(250, 248, 242, 0.6) 65%, rgba(250, 248, 242, 0.95) 100%)",
          }}
        />

        {/* Delicate Gold Line Accents */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B89550]/40 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B89550]/25 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto min-w-0">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 min-w-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/85 text-xs sm:text-sm font-semibold text-[#B89550] shadow-xs mb-3 sm:mb-4 relative overflow-hidden">
            <div className="glass-specular-top" />
            <Sparkles className="w-4 h-4 text-[#B89550]" />
            <span>{isBn ? "ইসলামিক শিক্ষা ও মাদরাসা" : "Islamic Education & Madrasah"}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#252525] leading-tight">
            {isBn ? (
              <>
                কম্প্রিহেনসিভ{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C]">
                  ইসলামিক এডুকেশন প্রোগ্রাম
                </span>
              </>
            ) : (
              <>
                Comprehensive{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C]">
                  Islamic Education Program
                </span>
              </>
            )}
          </h2>

          <p className="font-serif text-lg sm:text-xl text-[#B89550] tracking-wide mt-2.5 sm:mt-3" dir="rtl">
            وَقُل رَّبِّ زِدْنِي عِلْمًا
          </p>

          <p className="mt-3 text-sm sm:text-base md:text-lg text-[#595959] leading-relaxed">
            {isBn
              ? "একটি সমন্বিত পূর্ণাঙ্গ পাঠ্যক্রমের আওতায় কুরআন, তাজবীদ, তাফসীর, হাদীস, ফিকহ, আকীদা, সীরাত, ইসলামের ইতিহাস, মক্তব ও হিফজ শিক্ষা।"
              : "One complete, structured curriculum bringing together foundational Qur'anic recitation, memorization, sacred rulings, and creed—with Tafsir and Islamic History included free with your enrollment."}
          </p>
        </div>

        {/* Master Program Frosted Glass Card */}
        <div className="relative rounded-3xl sm:rounded-4xl glass-panel border border-white/90 shadow-2xl p-6 sm:p-10 lg:p-12 overflow-hidden">
          <div className="glass-specular-top" />

          {/* Master Card Header Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-stone-200/60">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#B89550] text-white shadow-2xs">
                  {isBn ? "একটি সমন্বিত পাঠ্যক্রম" : "Unified Master Program"}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/85 border border-white/90 text-[#B89550] shadow-2xs">
                  <Gift className="w-3.5 h-3.5 text-[#B89550]" />
                  <span>
                    {isBn
                      ? "তাফসীর ও ইসলামের ইতিহাস সম্পূর্ণ ফ্রি"
                      : "Includes Tafsir & History Free"}
                  </span>
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#252525]">
                {isBn ? "পাঠ্যক্রমের আওতাভুক্ত ১০টি প্রধান বিষয়" : "10 Core Subjects Included in Curriculum"}
              </h3>
              <p className="text-xs sm:text-sm text-[#595959] max-w-2xl leading-relaxed">
                {isBn
                  ? "শিক্ষার্থীদের জন্য আলাদা কোনো বিচ্ছিন্ন কোর্স নয়; বরং একটি সুশৃঙ্খল প্রধান প্রোগ্রামের অধীনে প্রতিটি বিষয় পর্যায়ক্রমে পাঠদান করা হয়।"
                  : "Students progress through an integrated learning journey covering authentic Qur'anic phonetics, memorization, daily Islamic jurisprudence, character development, and sacred history."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#252525] bg-white/80 backdrop-blur-md hover:bg-white border border-white/90 hover:border-[#B89550]/60 shadow-2xs transition-all duration-200"
              >
                <span>{isBn ? "সম্পূর্ণ সিলেবাস দেখুন" : "View Full Syllabus"}</span>
                <ArrowRight className="w-4 h-4 text-[#B89550]" />
              </Link>
            </div>
          </div>

          {/* 10 Educational Subjects Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {subjects.map((sub) => {
              const Icon = sub.icon;
              return (
                <div
                  key={sub.id}
                  className={`p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between group transition-all duration-300 ${
                    sub.isFreeHighlight
                      ? "bg-gradient-to-b from-[#FAF8F2]/95 to-white/95 border-2 border-[#B89550]/60 shadow-md hover:border-[#B89550]"
                      : "glass-card hover:border-[#B89550]/60"
                  }`}
                >
                  <div className="glass-specular-top" />
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-xs text-[#B89550] border border-[#B89550]/30 flex items-center justify-center shadow-2xs group-hover:bg-[#B89550] group-hover:text-white transition-all duration-200 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      {sub.isFreeHighlight ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#B89550] text-white shadow-2xs">
                          FREE
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/80 text-[#8C827A] border border-stone-200">
                          {sub.badge}
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-[#252525] group-hover:text-[#B89550] transition-colors">
                      {sub.title}
                    </h4>

                    <p className="mt-1.5 text-xs text-[#595959] leading-relaxed">
                      {sub.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Program Benefits Strip */}
          <div className="mt-8 sm:mt-10 pt-8 border-t border-stone-200/60">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#8C827A] mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#B89550]" />
              <span>
                {isBn
                  ? "প্রোগ্রামের প্রধান বৈশিষ্ট্য ও সুবিধাসমূহ"
                  : "Program Benefits & Features"}
              </span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 text-xs sm:text-sm text-[#252525]">
              {programBenefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-white/70 backdrop-blur-xs border border-white/80 shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B89550] shrink-0" />
                  <span className="font-medium text-xs text-[#252525] leading-tight">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Card Action: ONE Prominent Enroll Now Button */}
          <div className="mt-10 sm:mt-12 pt-8 border-t border-stone-200/60 flex flex-col sm:flex-row items-center justify-between gap-5 bg-white/60 backdrop-blur-md -mx-6 -mb-6 sm:-mx-10 sm:-mb-10 lg:-mx-12 lg:-mb-12 p-6 sm:p-8 rounded-b-3xl sm:rounded-b-4xl">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg sm:text-xl font-bold text-[#252525]">
                {isBn ? "দ্বীনি শিক্ষার এই বরকতময় যাত্রায় যুক্ত হোন" : "Ready to begin your Islamic education journey?"}
              </h4>
              <p className="text-xs sm:text-sm text-[#595959]">
                {isBn
                  ? "একটিমাত্র প্রোগ্রামে এনরোল করে ১০টি বিষয়ের সুশৃঙ্খল পাঠদান গ্রহণ করুন।"
                  : "Enroll in the Comprehensive Islamic Education Program today and access all core subjects plus Tafsir & History free."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/courses"
                className="w-full sm:w-auto btn-glass !py-3 !text-xs sm:!text-sm"
              >
                <span>{isBn ? "বিস্তারিত সিলেবাস" : "View Course Details"}</span>
                <ArrowRight className="w-4 h-4 text-[#B89550]" />
              </Link>

              <Link
                href="/register?role=student&program=Comprehensive%20Islamic%20Education%20Program"
                className="w-full sm:w-auto btn-gold !py-3.5 !text-sm sm:!text-base shadow-lg shadow-[#B89550]/25 hover:shadow-xl hover:shadow-[#B89550]/35"
              >
                <div className="absolute top-0 inset-x-0 h-px bg-white/40 pointer-events-none" />
                <BookCheck className="w-4 h-4 shrink-0" />
                <span>{isBn ? "এখনই ভর্তি হোন" : "Enroll Now"}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
