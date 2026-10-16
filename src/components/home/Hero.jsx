"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Compass, Sparkles, BookOpen, MapPin, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { isBn } = useLanguage();

  return (
    <section className="relative w-full bg-[#FAF8F2] text-[#252525] py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Layers: Sacred Quran & Rehal Warm Lighting with Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {/* Sacred Quran Rehal Background Image with Soft Warm Blur */}
        <div className="absolute inset-0 opacity-25 filter blur-[2px] scale-[1.03]">
          <Image
            src="/images/quran-rehal.jpg"
            alt="Holy Quran on Carved Rehal"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Soft Warm Radial Glow */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[450px] sm:h-[550px] rounded-full opacity-70 blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(245, 239, 227, 0.9) 0%, rgba(184, 149, 80, 0.16) 45%, transparent 72%)",
          }}
        />

        {/* Delicate Islamic Geometric Pattern Overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.05]"
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
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B89550]/40 to-transparent" />
      </div>

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Arabic Calligraphy Header (Bismillah) */}
        <div className="mb-3 animate-fade-in">
          <p className="bismillah-text text-xl sm:text-2xl font-serif">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>

        {/* Frosted Glass Pill Badge with Smooth Fade */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill mb-5 sm:mb-6 text-xs sm:text-sm font-semibold text-[#B89550] shadow-sm animate-fade-in delay-100">
          <div className="glass-specular-top" />
          <Sparkles className="w-4 h-4 text-[#B89550] animate-pulse-glow" />
          <span>
            {isBn
              ? "আল হিদায়াহ ইসলামিক সেন্টার • দ্বীন, শিক্ষা ও মানবসেবা"
              : "Al Hidayah Islamic Center • Faith, Learning & Community"}
          </span>
        </div>

        {/* Main Heading with Line-by-Line Entrance and Gradient Reveal */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#252525] leading-[1.2] sm:leading-[1.18] md:leading-[1.15] break-words animate-fade-in-up delay-150">
          {isBn ? (
            <>
              <span className="block mb-1 sm:mb-2">দ্বীনের খেদমত, আগামী প্রজন্মকে শিক্ষাদান ও</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C] inline-block font-extrabold">
                মানবতার সেবা
              </span>
            </>
          ) : (
            <>
              <span className="block mb-1 sm:mb-2">Serving Faith, Educating Generations &amp;</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C] inline-block font-extrabold">
                Supporting Humanity
              </span>
            </>
          )}
        </h1>

        {/* Ornamental Divider with Gold Diamond */}
        <div className="ornament-divider my-4 sm:my-5 animate-fade-in delay-200">
          <div className="ornament-line" />
          <div className="ornament-diamond" />
          <div className="ornament-line" />
        </div>

        {/* Core Subtitle / Description */}
        <p className="mt-2 text-sm sm:text-base md:text-lg text-[#595959] max-w-2xl sm:max-w-3xl leading-relaxed sm:leading-loose font-normal animate-fade-in-up delay-250">
          {isBn
            ? "ইবাদত, কুরআন শিক্ষা, ইসলামী জ্ঞান, দাওয়াহ, মানবসেবা ও কমিউনিটি উন্নয়নের মাধ্যমে দ্বীনের খেদমত করা, আগামী প্রজন্মকে শিক্ষিত করা, পরিবারকে শক্তিশালী করা এবং মানবতার সেবা করাই আমাদের মূল লক্ষ্য।"
            : "Welcome to Al Hidayah Islamic Center. Dedicated to serving faith, educating future generations, strengthening families, and uplifting humanity through worship, sacred knowledge, and compassionate community care."}
        </p>

        {/* Action Buttons in Frosted Glass Styling with Smooth Lift and Active Scale */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto animate-fade-in-up delay-300">
          {/* Primary Gold CTA: Donate Now */}
          <Link
            href="/#donate"
            className="w-full sm:w-auto min-h-[48px] btn-gold shadow-md shadow-[#B89550]/25 hover:shadow-xl hover:shadow-[#B89550]/35"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-white/40 pointer-events-none" />
            <Heart className="w-4 h-4 fill-white shrink-0" />
            <span>{isBn ? "দান করুন" : "Donate Now"}</span>
          </Link>

          {/* Secondary Glass CTA: Our Activities */}
          <Link
            href="/#activities"
            className="w-full sm:w-auto min-h-[48px] btn-glass"
          >
            <div className="glass-specular-top" />
            <Compass className="w-4 h-4 shrink-0 text-[#B89550]" />
            <span>{isBn ? "আমাদের কার্যক্রম" : "Our Activities"}</span>
          </Link>

          {/* Tertiary Glass CTA: Islamic Education */}
          <Link
            href="/courses"
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 text-sm sm:text-base font-semibold text-[#595959] bg-white/70 backdrop-blur-md hover:bg-white/95 border border-white/80 hover:border-[#B89550]/40 hover:text-[#252525] active:scale-[0.98] rounded-xl shadow-xs transition-all duration-200 relative overflow-hidden"
          >
            <div className="glass-specular-top" />
            <BookOpen className="w-4 h-4 shrink-0 text-[#B89550]" />
            <span>{isBn ? "শিক্ষা কার্যক্রম" : "Islamic Education"}</span>
          </Link>
        </div>

        {/* Quick Highlights Strip in Frosted Glass Cards */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-3xl animate-fade-in-up delay-400">
          <Link
            href="/#activities"
            className="p-4 rounded-2xl glass-card relative overflow-hidden text-xs sm:text-sm font-medium text-[#252525] flex items-center justify-center gap-2.5 hover:border-[#B89550]/60 transition-all group"
          >
            <div className="glass-specular-top" />
            <div className="w-7 h-7 rounded-lg bg-[#FAF8F2] border border-[#B89550]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <MapPin className="w-4 h-4 text-[#B89550]" />
            </div>
            <span>{isBn ? "বাংলাদেশে বর্তমান কার্যক্রম" : "Current Activities in Bangladesh"}</span>
          </Link>

          <Link
            href="/#activities"
            className="p-4 rounded-2xl glass-card relative overflow-hidden text-xs sm:text-sm font-medium text-[#252525] flex items-center justify-center gap-2.5 hover:border-[#B89550]/60 transition-all group"
          >
            <div className="glass-specular-top" />
            <div className="w-7 h-7 rounded-lg bg-[#FAF8F2] border border-[#B89550]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Globe className="w-4 h-4 text-[#B89550]" />
            </div>
            <span>{isBn ? "আমেরিকায় বর্তমান কার্যক্রম" : "Current Activities in the USA"}</span>
          </Link>

          <Link
            href="/#future-vision"
            className="p-4 rounded-2xl glass-card relative overflow-hidden text-xs sm:text-sm font-medium text-[#252525] flex items-center justify-center gap-2.5 hover:border-[#B89550]/60 transition-all group"
          >
            <div className="glass-specular-top" />
            <div className="w-7 h-7 rounded-lg bg-[#FAF8F2] border border-[#B89550]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4 text-[#B89550]" />
            </div>
            <span>{isBn ? "আমেরিকায় ভবিষ্যৎ পরিকল্পনা" : "Future Vision in the USA"}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
