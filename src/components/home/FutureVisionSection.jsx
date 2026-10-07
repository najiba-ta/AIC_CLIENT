"use client";

import Link from "next/link";
import {
  Clock,
  Users,
  BookOpen,
  GraduationCap,
  Sparkles,
  Building2,
  Compass,
  HeartHandshake,
  Award,
  HandHeart,
  Heart,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FutureVisionSection() {
  const { isBn } = useLanguage();

  const visionItems = [
    {
      title: isBn ? "পাঁচ ওয়াক্ত জামাআতে নামাজ" : "Five Daily Congregational Prayers",
      desc: isBn
        ? "প্রতিদিন শান্ত ও বরকতময় পরিবেশে পাঁচ ওয়াক্ত নামাজের সুশৃঙ্খল জামাআত পরিচালনা।"
        : "Establishing and maintaining the five daily congregational prayers in a peaceful, welcoming sanctuary.",
      icon: Clock,
    },
    {
      title: isBn ? "সাপ্তাহিক জুমুআহ ও খুতবা" : "Weekly Friday Jumu'ah & Khutbah",
      desc: isBn
        ? "সাপ্তাহিক জুমুআহর জামাআত এবং সমসাময়িক ও দ্বীনি বিষয়ে দিকনির্দেশনামূলক খুতবা প্রদান।"
        : "Organizing weekly Friday congregational prayers with inspiring sermons offering spiritual and civic guidance.",
      icon: Users,
    },
    {
      title: isBn ? "মক্তব ও হিফজ বিভাগ" : "Maktab & Hifz Department",
      desc: isBn
        ? "শিশু-কিশোর ও আগ্রহীদের জন্য নিয়মিত মক্তব এবং পূর্ণাঙ্গ হিফজুল কুরআন বিভাগ পরিচালনা।"
        : "Dedicated maktab classes for foundational learning alongside structured full-time and part-time Hifz memorization.",
      icon: BookOpen,
    },
    {
      title: isBn
        ? "কুরআন, তাজবীদ, তাফসীর, হাদীস, ফিকহ, আকীদা, সীরাত ও ইসলামের ইতিহাস শিক্ষা"
        : "Comprehensive Sacred Islamic Disciplines",
      desc: isBn
        ? "ইসলামের সকল মৌলিক ও অপরিহার্য শাখার সমন্বয়ে গঠিত ধারাবাহিক শিক্ষা ব্যবস্থা।"
        : "Comprehensive instruction in Qur'an, Tajweed, Tafsir, Hadith, Fiqh, Aqaaid, Seerah, and Islamic History.",
      icon: GraduationCap,
    },
    {
      title: isBn ? "রমাদান ও তারাবীহ কার্যক্রম" : "Ramadan & Taraweeh Services",
      desc: isBn
        ? "পবিত্র মাহে রমাদানে তারাবীহর জামাআত, ইফতার মাহফিল, কিয়ামুল লাইল ও ইতিকাফের সুব্যবস্থা।"
        : "Nightly Taraweeh prayers, community iftars, Qiyam al-Layl, and spiritual Itikaf retreats during holy Ramadan.",
      icon: Sparkles,
    },
    {
      title: isBn ? "ঈদুল ফিতর ও ঈদুল আযহার জামাআত" : "Eid al-Fitr & Eid al-Adha Congregations",
      desc: isBn
        ? "উভয় ঈদের জামাআত আয়োজন এবং কমিউনিটির সর্বস্তরের মানুষের মাঝে ভ্রাতৃত্বপূর্ণ উৎসব উদ্যাপন।"
        : "Grand congregational Eid prayers and joyful community gatherings fostering Islamic brotherhood and unity.",
      icon: Building2,
    },
    {
      title: isBn ? "দাওয়াহ ও কমিউনিটি আউটরিচ" : "Dawah & Community Outreach",
      desc: isBn
        ? "অমুসলিম ও সাধারণ মানুষের কাছে ইসলামের সত্য ও শান্তির বাণী তুলে ধরার দাওয়াতী কর্মসূচি।"
        : "Sharing the noble, peaceful message of Islam with neighbors, civic dialogues, and interfaith engagement.",
      icon: Compass,
    },
    {
      title: isBn
        ? "শিশু, যুবক, নারী, পরিবার ও প্রবীণদের জন্য প্রোগ্রাম"
        : "Programs for Children, Youth, Women, Families & Seniors",
      desc: isBn
        ? "পরিবারের প্রতিটি সদস্যের মানসিক ও দ্বীনি উন্নতির উপযোগী বিশেষায়িত হালাকাহ ও কর্মশালা।"
        : "Tailored educational circles, youth mentorship, sisters halaqahs, and senior enrichment initiatives.",
      icon: HeartHandshake,
    },
    {
      title: isBn
        ? "ইসলামিক সেমিনার, ওয়ার্কশপ ও শিক্ষামূলক অনুষ্ঠান"
        : "Islamic Seminars, Workshops & Events",
      desc: isBn
        ? "প্রখ্যাত আলেম ও স্কলারদের উপস্থিতিতে সচেতনতামূলক সেমিনার ও ক্যারিয়ার-দ্বীন সমন্বয় কর্মশালা।"
        : "Hosting renowned scholars, educational intensives, family seminars, and youth leadership workshops.",
      icon: Award,
    },
    {
      title: isBn
        ? "দরিদ্র ও অসহায় ব্যক্তি ও পরিবারকে মানবিক সহায়তা"
        : "Humanitarian Relief for Families in Need",
      desc: isBn
        ? "জরুরি সংকট, ক্ষুধা ও দারিদ্র্যের সময়ে মানবিক খাদ্য, বস্ত্র ও অর্থনৈতিক সহায়তা তহবিল।"
        : "Administering emergency relief, food pantries, winter clothing, and financial aid for vulnerable community members.",
      icon: HandHeart,
    },
  ];

  return (
    <section
      id="future-vision"
      className="relative w-full bg-[#FAF8F2] text-[#252525] py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#E5DFD3] overflow-hidden"
    >
      {/* Background Ambient Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] sm:w-[900px] h-[350px] sm:h-[450px] rounded-full opacity-35 blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(241, 237, 227, 0.8) 0%, rgba(184, 149, 80, 0.12) 45%, transparent 70%)",
          }}
        />
        {/* Delicate Top Gold Line Accent */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B89550]/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto min-w-0">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 min-w-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-white/90 text-xs sm:text-sm font-semibold text-[#B89550] shadow-2xs mb-3.5 sm:mb-4 relative overflow-hidden">
            <div className="glass-specular-top" />
            <Sparkles className="w-4 h-4 text-[#B89550]" />
            <span>
              {isBn
                ? "আমেরিকায় ভবিষ্যৎ পরিকল্পনা"
                : "Future Vision in the USA"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#252525] leading-tight">
            {isBn ? (
              <>
                আমাদের{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C]">
                  ভবিষ্যৎ পরিকল্পনা
                </span>
              </>
            ) : (
              <>
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C]">
                  Future Vision &amp; Roadmap
                </span>
              </>
            )}
          </h2>

          <p className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-lg text-[#595959] leading-relaxed">
            {isBn
              ? "আল হিদায়াহ ইসলামিক সেন্টারকে আমেরিকায় একটি পূর্ণাঙ্গ ও স্বয়ংসম্পূর্ণ দ্বীনি মারকাজ হিসেবে গড়ে তোলার সুদূরপ্রসারী রূপরেখা।"
              : "Our strategic roadmap to establish a comprehensive, self-sustaining Islamic Center and community sanctuary in the United States."}
          </p>
        </div>

        {/* 10 Vision Cards in Frosted Glass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          {visionItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between h-full p-6 sm:p-7 rounded-2xl sm:rounded-3xl glass-card hover:border-[#B89550]/60 shadow-md shadow-stone-200/40 hover:shadow-xl hover:shadow-[#B89550]/10 hover:bg-white/95 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Specular Light Reflection at the top edge */}
                <div className="glass-specular-top" />
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#B89550]/30 to-transparent group-hover:via-[#B89550] transition-all duration-300 rounded-t-2xl sm:rounded-t-3xl" />

                <div className="flex-1 flex flex-col">
                  {/* Icon & Counter Badge */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-md border border-white/85 flex items-center justify-center text-[#B89550] shadow-xs group-hover:bg-[#B89550] group-hover:text-white group-hover:scale-105 transition-all duration-300 shrink-0">
                      <Icon className="w-5 h-5 shrink-0" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#8C827A] px-2.5 py-0.5 rounded-full bg-white/70 border border-stone-200">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#252525] group-hover:text-[#B89550] transition-colors duration-200 leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-xs sm:text-sm text-[#595959] leading-relaxed font-normal flex-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Future Vision Support Callout Banner */}
        <div className="mt-12 sm:mt-16 p-8 sm:p-10 rounded-3xl glass-panel relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-center md:text-left">
          <div className="glass-specular-top" />
          <div className="space-y-2 relative z-10 max-w-2xl">
            <h4 className="text-xl sm:text-2xl font-bold text-[#252525]">
              {isBn
                ? "ভবিষ্যৎ দ্বীনি মারকাজ নির্মাণে আপনার সহযোগিতা কাম্য"
                : "Support the Establishment of Our Future Islamic Sanctuary"}
            </h4>
            <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
              {isBn
                ? "আমেরিকায় একটি স্থায়ী মসজিদ, সার্বক্ষণিক ইসলামিক সেন্টার এবং আগামী প্রজন্মের ঈমান সুরক্ষায় আপনিও সদকায়ে জারিয়ার অংশীদার হোন।"
                : "Partner with us in perpetual charity (Sadaqah Jariyah) to establish a permanent house of worship, education, and community fellowship."}
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="/#donate"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-[#B89550] hover:bg-[#A58342] shadow-md shadow-[#B89550]/20 hover:shadow-lg transition-all duration-200"
            >
              <Heart className="w-4 h-4 fill-white shrink-0" />
              <span>{isBn ? "সদকা / অনুদান দিন" : "Donate & Support"}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
