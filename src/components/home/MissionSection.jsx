"use client";

import Link from "next/link";
import { Sparkles, Heart, ArrowRight, BookOpen, Users, Compass } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function MissionSection() {
  const { isBn } = useLanguage();

  const missionPillars = [
    {
      title: isBn ? "দ্বীনের খেদমত" : "Serving Faith",
      desc: isBn
        ? "ইবাদত, পাঁচ ওয়াক্ত জামাআত ও সহীহ দ্বীনি দাওয়াহ প্রচারের মাধ্যমে আল্লাহর সন্তুষ্টি অর্জন।"
        : "Fostering sincere worship, congregational prayers, and sharing the peaceful message of Islam.",
      icon: Compass,
    },
    {
      title: isBn ? "আগামী প্রজন্মকে শিক্ষা" : "Educating Generations",
      desc: isBn
        ? "কুরআনুল কারীম, সহীহ তাজবীদ, হাদীস ও বুনিয়াদি ইসলামী জ্ঞানে ভবিষ্যৎ প্রজন্মকে আলোকিত করা।"
        : "Illuminating the hearts of our youth with the Holy Qur'an, sound creed, and authentic Sunnah.",
      icon: BookOpen,
    },
    {
      title: isBn ? "পরিবারকে শক্তিশালীকরণ" : "Strengthening Families",
      desc: isBn
        ? "ইসলামী শিষ্টাচার, সুন্নাহ ও সীরাতের অনুসরণে পরিবার ও পারিবারিক মূল্যবোধ দৃঢ় করা।"
        : "Cultivating prophetic character, family harmony, and moral resilience for modern living.",
      icon: Users,
    },
    {
      title: isBn ? "মানবতার সেবা" : "Supporting Humanity",
      desc: isBn
        ? "অসহায় মানুষের পাশে দাঁড়ানো, খাদ্য-বস্ত্র সহায়তা ও কমিউনিটির সার্বিক মানবকল্যাণ সাধন।"
        : "Extending food aid, seasonal clothing, and compassionate relief to vulnerable families.",
      icon: Heart,
    },
  ];

  return (
    <section
      id="mission"
      className="relative w-full bg-[#F1EDE3] text-[#252525] py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#E5DFD3] overflow-hidden"
    >
      {/* Background Ambient Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[450px] rounded-full opacity-35 blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(184, 149, 80, 0.15) 0%, rgba(250, 248, 242, 0.45) 50%, transparent 70%)",
          }}
        />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B89550]/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto min-w-0">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 min-w-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-white/90 text-xs sm:text-sm font-semibold text-[#B89550] shadow-2xs mb-3.5 sm:mb-4 relative overflow-hidden">
            <div className="glass-specular-top" />
            <Sparkles className="w-4 h-4 text-[#B89550]" />
            <span>{isBn ? "আমাদের মিশন ও লক্ষ্য" : "Our Guiding Mission"}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#252525] leading-tight">
            {isBn ? (
              <>
                আমাদের{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C]">
                  মূল মিশন ও উদ্দেশ্য
                </span>
              </>
            ) : (
              <>
                Our Purpose &amp;{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C]">
                  Guiding Mission
                </span>
              </>
            )}
          </h2>

          <p className="mt-3 text-sm sm:text-base md:text-lg text-[#B89550] font-semibold tracking-wide">
            {isBn
              ? "দ্বীনের খেদমত • আগামী প্রজন্মকে শিক্ষাদান • মানবতার সেবা"
              : "Serving Faith • Educating Generations • Supporting Humanity"}
          </p>
        </div>

        {/* Master Mission Statement Frosted Glass Card */}
        <div className="relative rounded-3xl sm:rounded-4xl glass-panel border border-white/90 shadow-2xl p-8 sm:p-12 lg:p-14 overflow-hidden text-center">
          <div className="glass-specular-top" />

          {/* Decorative Opening Quote Symbol */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/90 text-[#B89550] border border-[#B89550]/30 flex items-center justify-center mx-auto mb-6 shadow-xs text-2xl font-serif">
            “
          </div>

          {/* Mission Statement */}
          <blockquote className="text-lg sm:text-2xl md:text-3xl font-extrabold text-[#252525] leading-relaxed sm:leading-relaxed max-w-4xl mx-auto tracking-normal">
            {isBn
              ? "“ইবাদত, কুরআন শিক্ষা, ইসলামী জ্ঞান, দাওয়াহ, মানবসেবা ও কমিউনিটি উন্নয়নের মাধ্যমে দ্বীনের খেদমত করা, আগামী প্রজন্মকে শিক্ষিত করা, পরিবারকে শক্তিশালী করা এবং মানবতার সেবা করাই আমাদের মিশন।”"
              : "“Our mission is to serve the faith, educate future generations, strengthen families, and uplift humanity through worship, Qur'anic education, sacred knowledge, dawah, humanitarian relief, and community development.”"}
          </blockquote>

          {/* Tagline */}
          <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg font-medium text-[#8C827A] tracking-wider uppercase">
            Serving Faith • Educating Generations • Supporting Humanity
          </p>

          {/* 4 Mission Pillars Grid */}
          <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-stone-200/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 text-left">
            {missionPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/75 backdrop-blur-xs border border-white/85 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F2] text-[#B89550] border border-[#B89550]/30 flex items-center justify-center shadow-3xs mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-[#252525]">{pillar.title}</h3>
                    <p className="mt-1.5 text-xs text-[#595959] leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="mt-10 sm:mt-12 pt-8 border-t border-stone-200/60 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#donate"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-[#B89550] hover:bg-[#A58342] shadow-md shadow-[#B89550]/20 hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
            >
              <Heart className="w-4 h-4 fill-white shrink-0" />
              <span>{isBn ? "অনুদান দিয়ে পাশে থাকুন" : "Support Our Mission"}</span>
            </Link>

            <Link
              href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-[#252525] bg-white/85 backdrop-blur-md hover:bg-white border border-white/90 hover:border-[#B89550]/60 shadow-2xs transition-all duration-200"
            >
              <span>{isBn ? "আমাদের সম্পর্কে জানুন" : "About Us"}</span>
              <ArrowRight className="w-4 h-4 text-[#B89550]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
