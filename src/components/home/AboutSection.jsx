"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, Heart, BookOpen, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutSection() {
  const { isBn } = useLanguage();

  return (
    <section className="relative w-full bg-[#F1EDE3] text-[#252525] py-14 sm:py-20 lg:py-28 px-3.5 sm:px-6 lg:px-8 border-t border-[#E5DFD3] overflow-hidden">
      {/* Subtle Ambient Background Accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] sm:w-[800px] h-[350px] sm:h-[450px] rounded-full opacity-35 blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(184, 149, 80, 0.18) 0%, rgba(250, 248, 242, 0.4) 50%, transparent 70%)",
          }}
        />
        {/* Top Decorative Gold Line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B89550]/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto min-w-0">
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16 min-w-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs sm:text-sm font-semibold text-[#B89550] shadow-2xs mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89550] animate-pulse" />
            <span>{isBn ? "পরিচিতি ও লক্ষ্য" : "Who We Are"}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#252525] leading-tight">
            {isBn ? "পরিচিতি: " : "About "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C]">
              {isBn ? "আল হিদায়াহ ইসলামিক সেন্টার" : "Al Hidayah Islamic Center"}
            </span>
          </h2>

          {/* Ornamental Divider with Gold Diamond */}
          <div className="ornament-divider my-3.5 sm:my-4">
            <div className="ornament-line" />
            <div className="ornament-diamond" />
            <div className="ornament-line" />
          </div>

          <p className="text-sm sm:text-base md:text-lg text-[#595959] leading-relaxed sm:leading-loose">
            {isBn
              ? "আত্মিক বিকাশ, বিশুদ্ধ ইসলামী শিক্ষা ও অর্থবহ সমাজসেবায় নিবেদিত এক আধ্যাত্মিক ঠিকানা।"
              : "A dedicated sanctuary fostering spiritual growth, Islamic education, and meaningful community service."}
          </p>
        </div>

        {/* Layout: 2-Column on Tablet & Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-12 items-center">
          {/* Text Column */}
          <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left min-w-0">
            {/* Mission Introduction */}
            <p className="text-sm sm:text-base md:text-lg text-[#252525] font-medium leading-relaxed sm:leading-loose">
              {isBn
                ? "আল হিদায়াহ ইসলামিক সেন্টার মুসলিম উম্মাহ ও স্থানীয় কমিউনিটিকে একটি উন্মুক্ত ও প্রশান্তিময় ইবাদত, শিক্ষা ও সৌহার্দ্যের ক্ষেত্র প্রদানে নিবেদিত। ইসলামী নীতিমালার আলোকে আমাদের লক্ষ্য হলো বিশুদ্ধ ঈমানের পরিচর্যা, চারিত্রিক উৎকর্ষ অর্জন এবং বৃহত্তর সমাজে পারস্পরিক সম্প্রীতির সেতু রচনা করা।"
                : "Al Hidayah Islamic Center is dedicated to serving the Muslim community by providing a welcoming place of worship, learning, and fellowship. Guided by Islamic principles, our mission is to nurture faith, encourage moral excellence, and build bridges of understanding within the wider community."}
            </p>

            {/* Religious, Educational & Community Services Description */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#595959] leading-relaxed sm:leading-loose font-normal">
              {isBn
                ? "আমরা দৈনিক পাঁচ ওয়াক্ত জামাত ও জুমার নামাজসহ শিশু, কিশোর ও বড়দের জন্য সমন্বিত শিক্ষা কার্যক্রম পরিচালনা করি। সামাজিক উদ্যোগ, দান-সদকা ও পারিবারিক প্রোগ্রামের মাধ্যমে জীবনের প্রতিটি পদক্ষেপে আমরা কমিউনিটির পাশে থাকতে সচেষ্ট।"
                : "We offer a broad range of religious services, including daily congregational prayers and Jumu'ah services, alongside comprehensive educational programs for children, youth, and adults. Through community outreach, charity initiatives, and family programs, we strive to support individuals and families at every stage of their spiritual journey."}
            </p>

            {/* Feature Highlight Cards in Frosted Glass */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
              <div className="flex items-center gap-2.5 sm:gap-3 p-3.5 rounded-2xl glass-card relative overflow-hidden group">
                <div className="glass-specular-top" />
                <div className="w-9 h-9 rounded-xl bg-[#FAF8F2] text-[#B89550] border border-[#B89550]/30 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#252525] text-left">
                  {isBn ? "দৈনিক ইবাদত" : "Daily Worship"}
                </span>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 p-3.5 rounded-2xl glass-card relative overflow-hidden group">
                <div className="glass-specular-top" />
                <div className="w-9 h-9 rounded-xl bg-[#FAF8F2] text-[#B89550] border border-[#B89550]/30 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#252525] text-left">
                  {isBn ? "ইসলামী শিক্ষা" : "Islamic Education"}
                </span>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 p-3.5 rounded-2xl glass-card relative overflow-hidden group">
                <div className="glass-specular-top" />
                <div className="w-9 h-9 rounded-xl bg-[#FAF8F2] text-[#B89550] border border-[#B89550]/30 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
                  <Heart className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#252525] text-left">
                  {isBn ? "সামাজিক সেবা" : "Community Care"}
                </span>
              </div>
            </div>

            {/* Learn More Button */}
            <div className="mt-7 sm:mt-9 w-full sm:w-auto">
              <Link
                href="/about"
                className="w-full sm:w-auto min-h-[48px] btn-gold"
              >
                <div className="absolute top-0 inset-x-0 h-px bg-white/40 pointer-events-none" />
                <span>{isBn ? "বিস্তারিত জানুন" : "Learn More"}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>
          </div>

          {/* Visual Showcase Card in Frosted Glass Panel */}
          <div className="md:col-span-5 w-full flex justify-center md:justify-end min-w-0">
            <div className="w-full max-w-md md:max-w-none">
              <div className="relative rounded-3xl p-3 glass-panel shadow-2xl">
                <div className="glass-specular-top" />
                <div className="relative overflow-hidden rounded-2xl aspect-[4/4.5] sm:aspect-square md:aspect-[4/4.5] border border-white/80 group">
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
                  <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {isBn ? "আল হিদায়াহ ইসলামিক সেন্টার ভবন" : "Al Hidayah Islamic Center Complex"}
                      </h4>
                      <p className="text-[11px] text-[#C9A86A]">
                        {isBn ? "৪ তলা বিশিষ্ট আধুনিক ইসলামিক মারকায" : "4-Story Modern Islamic Sanctuary"}
                      </p>
                    </div>
                    <span className="w-8 h-8 rounded-lg bg-[#B89550] flex items-center justify-center text-white shrink-0 shadow-md">
                      <Sparkles className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
