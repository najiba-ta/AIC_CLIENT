"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Heart,
  BookOpen,
  Users,
  Compass,
  Sparkles,
  ShieldCheck,
  Award,
  ArrowRight,
  HandHeart,
  GraduationCap,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutClient() {
  const { isBn } = useLanguage();

  const values = isBn
    ? [
        {
          title: "আধ্যাত্মিক একনিষ্ঠতা",
          description:
            "বিশুদ্ধ নামাজ, বিনম্র ইবাদত এবং সুন্নাহর একনিষ্ঠ অনুশীলনের মাধ্যমে মহান আল্লাহ তাআলার সাথে আত্মিক বন্ধন সুদৃঢ় করা।",
          icon: Sparkles,
        },
        {
          title: "জ্ঞান ও দ্বীনি শিক্ষা",
          description:
            "সকল বয়সী নারী-পুরুষ ও শিশুর মাঝে বিশুদ্ধ ইসলামী জ্ঞান, কুরআন বুঝা এবং নৈতিক চরিত্র গঠনের আলো ছড়িয়ে দেওয়া।",
          icon: BookOpen,
        },
        {
          title: "সহমর্মিতা ও মানবসেবা",
          description:
            "অসহায়, দরিদ্র ও বিপদগ্রস্ত মানুষের পাশে দাঁড়ানো এবং সমাজের দুর্বল শ্রেণির কল্যাণে সদকা ও মানবিক সহায়তা প্রদান।",
          icon: HandHeart,
        },
        {
          title: "ঐক্য ও ভ্রাতৃত্ববোধ",
          description:
            "একটি ভ্রাতৃত্বপূর্ণ পরিবেশ সৃষ্টি করা যেখানে সব বয়সের ও পেশার মানুষ ঈমান ও পারস্পরিক শ্রদ্ধার বন্ধনে আবদ্ধ।",
          icon: Users,
        },
        {
          title: "সামাজিক সম্প্রীতি",
          description:
            "পারস্পরিক সৌহার্দ্য, নাগরিক দায়িত্ববোধ এবং বৃহত্তর সমাজের সাথে ইতিবাচক সংলাপ ও শান্তিপূর্ণ সহাবস্থান বজায় রাখা।",
          icon: Compass,
        },
        {
          title: "আমানতদারী ও সততা",
          description:
            "সকল প্রাতিষ্ঠানিক কার্যক্রম, তহবিল ব্যবস্থাপনা ও সামাজিক উদ্যোগ সর্বোচ্চ স্বচ্ছতা এবং ইহসানের সাথে পরিচালনা করা।",
          icon: Award,
        },
      ]
    : [
        {
          title: "Spiritual Devotion",
          description:
            "Fostering a deep, meaningful connection with Allah (SWT) through authentic prayer, sincere worship, and steadfast adherence to the Sunnah.",
          icon: Sparkles,
        },
        {
          title: "Knowledge & Education",
          description:
            "Empowering individuals of all ages with foundational Islamic knowledge, Qur'anic understanding, and moral character development.",
          icon: BookOpen,
        },
        {
          title: "Compassion & Service",
          description:
            "Extending charitable support, humanitarian aid, and caring assistance to uplift families and vulnerable community members.",
          icon: HandHeart,
        },
        {
          title: "Unity & Brotherhood",
          description:
            "Cultivating an inclusive, welcoming environment where diverse backgrounds unite in faith, brotherhood, and shared purpose.",
          icon: Users,
        },
        {
          title: "Community Outreach",
          description:
            "Building positive bridges of dialogue, civic engagement, and mutual respect with the wider society.",
          icon: Compass,
        },
        {
          title: "Integrity & Excellence",
          description:
            "Conducting all center operations, pastoral care, and public initiatives with the highest standards of transparency and ihsan (excellence).",
          icon: Award,
        },
      ];

  const pillars = isBn
    ? [
        {
          title: "পাঞ্জেগানা ও জুমা জামাত",
          description:
            "প্রতিদিন পাঁচ ওয়াক্ত জামাত, সাপ্তাহিক বরকতময় জুমার নামাজ এবং তারাবীহ ও ঈদের নামাজের সুব্যবস্থা।",
          icon: Building2,
        },
        {
          title: "ইসলামী শিক্ষা প্রতিষ্ঠান",
          description:
            "নিয়মিত কুরআন তিলাওয়াত, হিফজ, তাজবীদ ক্লাস এবং কিশোর ও বড়দের সাপ্তাহিক দ্বীনি হালাকাহ।",
          icon: GraduationCap,
        },
        {
          title: "পরিবার ও তরুণদের দিকনির্দেশনা",
          description:
            "তরুণ প্রজন্ম ও মা-বোনদের জন্য বিশেষ সচেতনতামূলক সেশন এবং গঠনমূলক পারিবারিক পরামর্শ।",
          icon: Heart,
        },
        {
          title: "ত্রাণ ও যাকাত কার্যক্রম",
          description:
            "যাকাত ও সদকার সুষ্ঠু বণ্টন, নিয়মিত খাদ্য সহায়তা এবং জরুরি মানবিক ত্রাণ সেবা পরিচালনা।",
          icon: ShieldCheck,
        },
      ]
    : [
        {
          title: "Congregational Worship",
          description:
            "Providing an organized sanctuary for the five daily prayers, weekly Friday Jumu'ah services, Ramadan Taraweeh, and joyous Eid celebrations.",
          icon: Building2,
        },
        {
          title: "Islamic Education",
          description:
            "Structured Qur'an recitation, Tajweed, Hifz memorization, weekend Islamic school, and adult educational seminars.",
          icon: GraduationCap,
        },
        {
          title: "Family & Youth Mentorship",
          description:
            "Dedicated programs for young Muslims, sisters circles, family night halaqahs, and wholesome social gatherings.",
          icon: Heart,
        },
        {
          title: "Social Welfare & Zakat",
          description:
            "Administering local zakat and sadaqah funds, community food distributions, and compassionate emergency relief.",
          icon: ShieldCheck,
        },
      ];

  return (
    <main className="flex-1 w-full bg-[#FAF8F2] text-[#252525]">
      {/* Hero Header Section */}
      <section className="relative w-full bg-[#FAF8F2] py-16 sm:py-24 px-3.5 sm:px-6 lg:px-8 border-b border-[#E5DFD3] overflow-hidden">
        {/* Ambient Glow Overlays */}
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
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89550]" />
            <span>{isBn ? "আমাদের ঐতিহ্য ও লক্ষ্য" : "Our Heritage & Purpose"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#252525] leading-tight">
            {isBn ? "পরিচিতি: " : "About "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C]">
              {isBn ? "আল হিদায়াহ ইসলামিক সেন্টার" : "Al Hidayah Islamic Center"}
            </span>
          </h1>

          <div className="flex items-center justify-center gap-2 my-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#B89550]/60" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#B89550]" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#B89550]/60" />
          </div>

          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-[#595959] leading-relaxed font-normal">
            {isBn
              ? "ঈমান, বিশুদ্ধ ইসলামী শিক্ষা, চারিত্রিক উৎকর্ষ ও মানবতার সেবায় নিবেদিত একটি আধুনিক দ্বীনি কেন্দ্র।"
              : "A welcoming spiritual sanctuary dedicated to faith, Islamic education, moral excellence, and compassionate community service."}
          </p>
        </div>
      </section>

      {/* Introduction & Story Section */}
      <section className="relative w-full bg-white py-16 sm:py-20 lg:py-24 px-3.5 sm:px-6 lg:px-8 border-b border-[#E5DFD3]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#B89550]">
                <span>{isBn ? "ভূমিকা ও পরিচিতি" : "Introduction"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525] leading-tight">
                {isBn
                  ? "ঈমান, পরিবার ও সমাজের সেবায় সদাসর্বদা নিবেদিত"
                  : "Dedicated to Serving Faith, Families, and Community"}
              </h2>
              <p className="text-sm sm:text-base text-[#595959] leading-relaxed sm:leading-loose font-normal">
                {isBn
                  ? "আল হিদায়াহ ইসলামিক সেন্টার আধ্যাত্মিক বিকাশ ও সামাজিক কল্যাণের এক অগ্রণী প্রতিষ্ঠান। পবিত্র কুরআন ও মহানবী হযরত মুহাম্মদ ﷺ-এর সুন্নাহর আদর্শে পরিচালিত এই প্রতিষ্ঠান সকল ধর্মপ্রাণ মুসলিম, শিক্ষার্থী ও পরিবারের জন্য একটি উন্মুক্ত ও প্রশান্তিময় আশ্রয়স্থল।"
                  : "Al Hidayah Islamic Center serves as a cornerstone for spiritual growth and community empowerment. Guided by the teachings of the Holy Qur'an and the noble Sunnah of Prophet Muhammad (peace be upon him), our center is committed to creating an open and welcoming environment for worshipers, learners, and families from all walks of life."}
              </p>
              <p className="text-sm sm:text-base text-[#595959] leading-relaxed sm:leading-loose font-normal">
                {isBn
                  ? "দৈনিক পাঁচ ওয়াক্ত জামাত পরিচালনার পাশাপাশি কেন্দ্রটি নিয়মিত কুরআন শিক্ষা, তরুণদের দিকনির্দেশনা, আর্তমানবতার সেবা এবং সামাজিক সংহতি বৃদ্ধিতে সক্রিয় ভূমিকা পালন করছে।"
                  : "Beyond daily prayer services, the center organizes extensive educational initiatives, youth mentorship, charitable relief drives, and interfaith engagement to promote understanding, civic responsibility, and unity."}
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FAF8F2] hover:bg-[#F1EDE3] text-[#252525] font-semibold text-sm border border-[#E5DFD3] hover:border-[#B89550]/60 transition-all shadow-2xs"
                >
                  <span>{isBn ? "প্রোগ্রামসমূহ দেখুন" : "Explore Programs"}</span>
                  <ArrowRight className="w-4 h-4 text-[#B89550]" />
                </Link>
                <Link
                  href="/#donate"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#B89550] hover:bg-[#A58342] text-white font-bold text-sm shadow-md shadow-[#B89550]/20 transition-all"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{isBn ? "দ্বীনি কাজে দান করুন" : "Support Our Center"}</span>
                </Link>
              </div>
            </div>

            {/* Right Card: Building Image Showcase */}
            <div className="lg:col-span-5 w-full flex justify-center lg:justify-end min-w-0">
              <div className="w-full max-w-lg lg:max-w-none">
                <div className="relative rounded-3xl p-3 sm:p-3.5 glass-panel shadow-2xl">
                  <div className="glass-specular-top" />
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/4.5] sm:aspect-square lg:aspect-[4/4.5] border border-white/80 group">
                    <Image
                      src="/images/center-building.jpg"
                      alt="Al Hidayah Islamic Center Complex"
                      fill
                      priority
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                    {/* Floating Glass Label */}
                    <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white">
                          {isBn ? "আল হিদায়াহ ইসলামিক সেন্টার ভবন" : "Al Hidayah Islamic Center Complex"}
                        </h4>
                        <p className="text-[11px] text-[#C9A86A]">
                          {isBn ? "৪ তলা বিশিষ্ট আধুনিক ইসলামিক মারকায" : "4-Story Modern Islamic Sanctuary"}
                        </p>
                      </div>
                      <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#B89550] flex items-center justify-center text-white shrink-0 shadow-md">
                        <Sparkles className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision Section */}
          <div className="mt-14 sm:mt-18 pt-12 border-t border-[#E5DFD3]/70 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Mission Card */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl glass-card relative overflow-hidden">
              <div className="glass-specular-top" />
              <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-xs border border-[#B89550]/40 flex items-center justify-center text-[#B89550] mb-4 shadow-2xs">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#252525] mb-2">
                {isBn ? "আমাদের লক্ষ্য ও উদ্দেশ্য (Mission)" : "Our Mission"}
              </h3>
              <p className="text-sm text-[#595959] leading-relaxed">
                {isBn
                  ? "একটি পবিত্র ও সুন্দর পরিবেশ নিশ্চিত করা যা নিষ্ঠাবান ঈমানকে সমৃদ্ধ করে, আধুনিক ইসলামী শিক্ষা প্রদান করে, পারিবারিক বন্ধনকে দৃঢ় করে এবং নৈতিক মূল্যবোধে সমাজকে আলোকিত করে।"
                  : "To provide a welcoming spiritual home that nurtures sincere Islamic faith, fosters rigorous educational development, strengthens family life, and serves our local community with compassion and moral integrity."}
              </p>
            </div>

            {/* Vision Card */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl glass-card relative overflow-hidden">
              <div className="glass-specular-top" />
              <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-xs text-[#B89550] border border-[#E5DFD3] flex items-center justify-center mb-4 shadow-2xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#252525] mb-2">
                {isBn ? "আমাদের দূরদৃষ্টি (Vision)" : "Our Vision"}
              </h3>
              <p className="text-sm text-[#595959] leading-relaxed">
                {isBn
                  ? "আধ্যাত্মিক সজীবতা, বিশুদ্ধ শিক্ষা ও যুব সমাজের যোগ্য নেতৃত্ব তৈরির মাধ্যমে একটি আদর্শ দ্বীনি কেন্দ্রে পরিণত হওয়া—যা ইসলামের শাশ্বত সৌন্দর্যকে সমাজের বুকে তুলে ধরবে।"
                  : "To be an exemplary Islamic center recognized for spiritual vitality, educational excellence, youth leadership, and positive societal contributions that embody the timeless beauty of Islam."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 px-3.5 sm:px-6 lg:px-8 border-b border-[#E5DFD3] bg-[#F1EDE3]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#B89550]/40 text-xs sm:text-sm font-semibold text-[#B89550] shadow-2xs mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89550]" />
              <span>{isBn ? "মূল চালিকাশক্তি" : "Guiding Principles"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525]">
              {isBn ? "আমাদের মৌলিক মূল্যবোধ" : "Our Core Values"}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#595959]">
              {isBn
                ? "যেসব সুমহান চারিত্রিক ও আদর্শিক মূল্যবোধের ওপর ভিত্তি করে আল হিদায়াহর প্রতিটি কার্যক্রম পরিচালিত হয়।"
                : "The foundational ethical principles that guide all programs, services, and interactions at Al Hidayah."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="p-6 sm:p-7 rounded-2xl glass-card relative overflow-hidden transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="glass-specular-top" />
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-xs text-[#B89550] border border-[#B89550]/30 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#252525] group-hover:text-[#B89550] transition-colors">
                      {val.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-[#595959] leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Services Overview */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 px-3.5 sm:px-6 lg:px-8 bg-[#FAF8F2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#B89550]/40 text-xs sm:text-sm font-semibold text-[#B89550] shadow-2xs mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89550]" />
              <span>{isBn ? "আমরা যা প্রদান করি" : "What We Provide"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525]">
              {isBn ? "ইবাদত, দ্বীনি শিক্ষা ও সামাজিক সেবা" : "Sanctuary, Education & Support"}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#595959]">
              {isBn
                ? "আমাদের কেন্দ্র ও কমিউনিটির জন্য প্রস্তুতকৃত বহুমুখী সুবিধাসমূহ।"
                : "Comprehensive facilities and services available to our community members and visitors."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-6 rounded-2xl glass-card relative overflow-hidden transition-shadow flex flex-col justify-between"
                >
                  <div className="glass-specular-top" />
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-xs border border-stone-200/80 text-[#B89550] flex items-center justify-center mb-4 shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#252525] mb-2">{pillar.title}</h3>
                    <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Banner CTA */}
          <div className="mt-14 p-8 sm:p-10 rounded-2xl sm:rounded-3xl glass-panel relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="glass-specular-top" />
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#252525]">
                {isBn ? "আমাদের দ্বীনি পরিবারে আপনাকে স্বাগতম" : "Join Our Growing Community"}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#595959] max-w-xl">
                {isBn
                  ? "দৈনিক পাঁচ ওয়াক্ত জামাত, ইসলামিক শিক্ষা কিংবা সামাজিক সংহতির জন্য আমাদের দরোজা সবার জন্য উন্মুক্ত।"
                  : "Whether you are visiting for daily prayers, seeking Islamic education, or connecting with fellow believers, our doors are open to you."}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/prayer-times"
                className="w-full sm:w-auto btn-glass !py-3 !text-sm"
              >
                {isBn ? "নামাজের সময়সূচি" : "Prayer Times"}
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto btn-gold !py-3 !text-sm shadow-md shadow-[#B89550]/25 hover:shadow-xl hover:shadow-[#B89550]/35"
              >
                <div className="absolute top-0 inset-x-0 h-px bg-white/40 pointer-events-none" />
                {isBn ? "যোগাযোগ করুন" : "Get In Touch"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
