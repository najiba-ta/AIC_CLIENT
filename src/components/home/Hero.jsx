"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Compass, Sparkles, BookOpen, MapPin, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { isBn } = useLanguage();

  return (
    <section className="relative w-full bg-[#FAF8F2] text-[#252525] py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Layers: Faded Madrasah/Quran Background Image with Soft White Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {/* Subtle Quran/Madrasah Background Image */}
        <div className="absolute inset-0 opacity-40 filter blur-[1.2px] scale-[1.02]">
          <Image
            src="/images/quran-madrasah-bg.jpg"
            alt="Islamic Center Background"
            fill
            unoptimized
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Soft Semi-Transparent White Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F2]/85 via-white/75 to-[#FAF8F2]/90 pointer-events-none" />

        {/* Soft Warm Radial Glow */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[500px] rounded-full opacity-60 blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(241, 237, 227, 0.8) 0%, rgba(184, 149, 80, 0.12) 45%, transparent 70%)",
          }}
        />

        {/* Subtle Islamic Geometric Pattern Overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <defs>
            <pattern
              id="hero-islamic-pattern"
              x="0"
              y="0"
              width="72"
              height="72"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="36,4 43.5,18.5 58,11 50.5,25.5 65,33 50.5,40.5 58,55 43.5,47.5 36,62 28.5,47.5 14,55 21.5,40.5 7,33 21.5,25.5 14,11 28.5,18.5"
                fill="none"
                stroke="#B89550"
                strokeWidth="0.85"
              />
              <circle
                cx="36"
                cy="33"
                r="18"
                fill="none"
                stroke="#B89550"
                strokeWidth="0.6"
              />
              <polygon
                points="36,15 48,24 48,42 36,51 24,42 24,24"
                fill="none"
                stroke="#B89550"
                strokeWidth="0.5"
                strokeOpacity="0.7"
              />
              <line x1="0" y1="33" x2="72" y2="33" stroke="#B89550" strokeWidth="0.5" strokeOpacity="0.35" />
              <line x1="36" y1="0" x2="36" y2="72" stroke="#B89550" strokeWidth="0.5" strokeOpacity="0.35" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-islamic-pattern)" />
        </svg>

        {/* Delicate Top Gold Line Accent */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B89550]/35 to-transparent" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Frosted Glass Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-xs mb-4 sm:mb-6 text-xs sm:text-sm font-semibold text-[#B89550] relative overflow-hidden">
          <div className="glass-specular-top" />
          <Sparkles className="w-4 h-4 text-[#B89550]" />
          <span>
            {isBn
              ? "আল হিদায়াহ ইসলামিক সেন্টার • দ্বীন, শিক্ষা ও মানবসেবা"
              : "Al Hidayah Islamic Center • Faith, Learning & Community"}
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#252525] leading-[1.2] sm:leading-[1.18] md:leading-[1.15] break-words">
          {isBn ? (
            <>
              দ্বীনের খেদমত, আগামী প্রজন্মকে শিক্ষাদান ও{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C]">
                মানবতার সেবা
              </span>
            </>
          ) : (
            <>
              Serving Faith, Educating Generations &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C]">
                Supporting Humanity
              </span>
            </>
          )}
        </h1>

        {/* Core Subtitle / Description */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-[#595959] max-w-2xl sm:max-w-3xl leading-relaxed sm:leading-loose font-normal">
          {isBn
            ? "ইবাদত, কুরআন শিক্ষা, ইসলামী জ্ঞান, দাওয়াহ, মানবসেবা ও কমিউনিটি উন্নয়নের মাধ্যমে দ্বীনের খেদমত করা, আগামী প্রজন্মকে শিক্ষিত করা, পরিবারকে শক্তিশালী করা এবং মানবতার সেবা করাই আমাদের মূল লক্ষ্য।"
            : "Welcome to Al Hidayah Islamic Center. Dedicated to serving faith, educating future generations, strengthening families, and uplifting humanity through worship, sacred knowledge, and compassionate community care."}
        </p>

        {/* Action Buttons in Frosted Glass Styling */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          {/* Primary Gold CTA: Donate Now */}
          <Link
            href="/#donate"
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3.5 text-sm sm:text-base font-bold text-white bg-[#B89550] hover:bg-[#A58342] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#B89550] focus:ring-offset-2 focus:ring-offset-[#FAF8F2] rounded-xl shadow-md shadow-[#B89550]/20 hover:shadow-lg hover:shadow-[#B89550]/30 transition-all duration-200 transform hover:-translate-y-0.5 relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-white/40 pointer-events-none" />
            <Heart className="w-4 h-4 fill-white shrink-0" />
            <span>{isBn ? "দান করুন" : "Donate Now"}</span>
          </Link>

          {/* Secondary Glass CTA: Our Activities */}
          <Link
            href="/#activities"
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 text-sm sm:text-base font-semibold text-[#252525] bg-white/80 backdrop-blur-md hover:bg-white/95 border border-white/85 hover:border-[#B89550]/50 hover:text-[#B89550] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#B89550]/50 focus:ring-offset-2 focus:ring-offset-[#FAF8F2] rounded-xl shadow-xs transition-all duration-200 relative overflow-hidden"
          >
            <div className="glass-specular-top" />
            <Compass className="w-4 h-4 shrink-0 text-[#B89550]" />
            <span>{isBn ? "আমাদের কার্যক্রম" : "Our Activities"}</span>
          </Link>

          {/* Tertiary Glass CTA: Islamic Education */}
          <Link
            href="/courses"
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 text-sm sm:text-base font-semibold text-[#595959] bg-white/60 backdrop-blur-md hover:bg-white/90 border border-white/80 hover:border-[#B89550]/40 hover:text-[#252525] active:scale-[0.98] rounded-xl shadow-2xs transition-all duration-200 relative overflow-hidden"
          >
            <div className="glass-specular-top" />
            <BookOpen className="w-4 h-4 shrink-0 text-[#B89550]" />
            <span>{isBn ? "শিক্ষা কার্যক্রম" : "Islamic Education"}</span>
          </Link>
        </div>

        {/* Quick Highlights Strip in Frosted Glass */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 w-full max-w-3xl">
          <Link
            href="/#activities"
            className="p-3.5 rounded-2xl glass-card relative overflow-hidden text-xs sm:text-sm font-medium text-[#252525] flex items-center justify-center gap-2 hover:border-[#B89550]/60 transition-all"
          >
            <div className="glass-specular-top" />
            <MapPin className="w-4 h-4 text-[#B89550] shrink-0" />
            <span>{isBn ? "বাংলাদেশে বর্তমান কার্যক্রম" : "Current Activities in Bangladesh"}</span>
          </Link>

          <Link
            href="/#activities"
            className="p-3.5 rounded-2xl glass-card relative overflow-hidden text-xs sm:text-sm font-medium text-[#252525] flex items-center justify-center gap-2 hover:border-[#B89550]/60 transition-all"
          >
            <div className="glass-specular-top" />
            <Globe className="w-4 h-4 text-[#B89550] shrink-0" />
            <span>{isBn ? "আমেরিকায় বর্তমান কার্যক্রম" : "Current Activities in the USA"}</span>
          </Link>

          <Link
            href="/#future-vision"
            className="p-3.5 rounded-2xl glass-card relative overflow-hidden text-xs sm:text-sm font-medium text-[#252525] flex items-center justify-center gap-2 hover:border-[#B89550]/60 transition-all"
          >
            <div className="glass-specular-top" />
            <Sparkles className="w-4 h-4 text-[#B89550] shrink-0" />
            <span>{isBn ? "আমেরিকায় ভবিষ্যৎ পরিকল্পনা" : "Future Vision in the USA"}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
