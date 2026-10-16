"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Globe,
  Compass,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ActivitiesSection() {
  const { language } = useLanguage();
  const [expandedCards, setExpandedCards] = useState({});

  const INITIAL_VISIBLE_COUNT = 3;

  const toggleCard = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Content for English Mode
  const contentEn = {
    badge: "Our Activities",
    headingPart1: "Our",
    headingPart2: "Activities & Programs",
    subtitle:
      "Dedicated to sacred learning, religious observance, and community outreach across Bangladesh and the United States.",
    categories: [
      {
        badge: "Bangladesh Branch",
        status: "Active",
        icon: MapPin,
        title: "Current Activities in Bangladesh",
        intro:
          "Comprehensive maktab, hifz, and community welfare initiatives conducted at our Bangladesh center.",
        buttonText: "View Details",
        buttonHref: "/programs",
        buttonIsPrimary: false,
        activities: [
          {
            title: "Maktab Education for Children & Youth",
            desc: "Providing foundational religious education, Qur'an reading, and essential Islamic manners for young learners.",
          },
          {
            title: "Hifzul Qur'an Department",
            desc: "Structured Qur'an memorization with Tajweed under constant supervision of qualified and experienced teachers.",
          },
          {
            title: "Qur'an Recitation & Tajweed Instruction",
            desc: "Specialized training for accurate Makharij phonetics and beautiful, error-free recitation of the Holy Qur'an.",
          },
          {
            title: "Aqaaid, Fiqh, Seerah, Duas & Islamic Adab",
            desc: "Holistic curriculum covering daily Islamic rulings, Sunnah practices, and moral character building.",
          },
          {
            title: "Temporary Prayer Facility",
            desc: "Facilitating five daily congregational prayers and regular community gatherings in a dedicated prayer space.",
          },
          {
            title: "Permanent Masjid Project Planning",
            desc: "Strategic development and acquisition initiatives to establish a permanent, full-scale masjid complex.",
          },
          {
            title: "Educational Support for Underprivileged Students",
            desc: "Providing tuition subsidies, books, and essential humanitarian assistance for needy students and families.",
          },
        ],
      },
      {
        badge: "USA Branch",
        status: "Active",
        icon: Globe,
        title: "Current Activities in the USA",
        intro:
          "Religious services, family halaqahs, and youth Islamic learning across local American communities.",
        buttonText: "View Details",
        buttonHref: "/programs",
        buttonIsPrimary: false,
        activities: [
          {
            title: "Online Qur'an & Tajweed Classes",
            desc: "Interactive distance learning classes offering authentic Tajweed and Qur'an education from home.",
          },
          {
            title: "Basic Islamic Studies",
            desc: "Foundational Islamic knowledge, faith creed, and daily practical guidance for children, youth, and adults.",
          },
          {
            title: "Food & Grocery Distribution",
            desc: "Delivering essential groceries, nutritional packs, and provisions to vulnerable and low-income families.",
          },
          {
            title: "Winter Clothes Distribution",
            desc: "Distributing warm winter garments and blankets to disadvantaged individuals during cold seasons.",
          },
          {
            title: "Educational & Humanitarian Support",
            desc: "Addressing urgent humanitarian needs and providing academic and religious sponsorship programs.",
          },
        ],
      },
      {
        badge: "Future Roadmap",
        status: "Planning",
        icon: Compass,
        title: "Future Vision in the USA",
        intro:
          "Strategic development goals for establishing a permanent Islamic Center, school, and community hub.",
        buttonText: "Support Our Vision",
        buttonHref: "/#donate",
        buttonIsPrimary: true,
        activities: [
          {
            title: "Five Daily Congregational Prayers",
            desc: "Establishing regular, structured daily congregational prayers in a peaceful and welcoming environment.",
          },
          {
            title: "Weekly Friday Jumu'ah & Khutbah",
            desc: "Conducting regular Friday congregational prayers with inspiring sermons addressing faith and contemporary life.",
          },
          {
            title: "Full-time Maktab & Hifz Department",
            desc: "Operating dedicated full-time maktab classes and a comprehensive Qur'an memorization department.",
          },
          {
            title: "Comprehensive Sacred Disciplines",
            desc: "Structured courses in Qur'an, Tajweed, Tafsir, Hadith, Fiqh, Aqaaid, Seerah, and Islamic history.",
          },
          {
            title: "Family, Youth & Senior Programs",
            desc: "Tailored halaqahs, workshops, and supportive social gatherings designed for every family member.",
          },
          {
            title: "Permanent Masjid & Islamic Center",
            desc: "Acquiring dedicated property to build a permanent mosque, library, and vibrant Islamic cultural center.",
          },
          {
            title: "Halal Food Bank & Immigrant Assistance",
            desc: "Establishing a dedicated food relief pantry and guidance cell to assist new immigrants and refugees.",
          },
        ],
      },
    ],
  };

  // Content for Bengali Mode (Exact AIC Activities Profile Content)
  const contentBn = {
    badge: "আমাদের কার্যক্রম",
    headingPart1: "আমাদের",
    headingPart2: "কার্যক্রম ও সেবাসমূহ",
    subtitle:
      "দ্বীনের খেদমত, কুরআন শিক্ষা, ইবাদত ও সমাজকল্যাণমূলক কর্মসূচি—বাংলাদেশ ও যুক্তরাষ্ট্রে।",
    categories: [
      {
        badge: "বাংলাদেশ শাখা",
        status: "চলমান",
        icon: MapPin,
        title: "বাংলাদেশে বর্তমান কার্যক্রম",
        intro:
          "আমাদের বাংলাদেশ কেন্দ্রে পরিচালিত বুনিয়াদি মক্তব, হিফজ ও বহুমুখী সামাজিক সেবা কার্যক্রম।",
        buttonText: "বিস্তারিত দেখুন",
        buttonHref: "/programs",
        buttonIsPrimary: false,
        activities: [
          {
            title: "শিশু-কিশোরদের মক্তব শিক্ষা",
            desc: "শিশুদের বুনিয়াদি দ্বীনি শিক্ষা, কুরআন পাঠ এবং প্রাথমিক মাসআলা ও আদব শিক্ষা প্রদান।",
          },
          {
            title: "হিফজুল কুরআন বিভাগ",
            desc: "তাজবীদসহ হিফজুল কুরআন ও অভিজ্ঞ শিক্ষকের সার্বক্ষণিক তত্ত্বাবধানে নিয়মিত হিফজ প্রোগ্রাম।",
          },
          {
            title: "কুরআন তিলাওয়াত ও তাজবীদ শিক্ষা",
            desc: "সঠিক মাখরাজ ও বিশুদ্ধ উচ্চারণে কুরআন তিলাওয়াত শিক্ষার বিশেষ ব্যবস্থা।",
          },
          {
            title: "আকীদা, ফিকহ, সীরাত, দোয়া, নামাজ ও ইসলামী আদব শিক্ষা",
            desc: "দৈনন্দিন জীবনের প্রয়োজনীয় ধর্মীয় বিধান, সুন্নাহ ও চারিত্রিক উৎকর্ষ অর্জনের সামগ্রিক পাঠ।",
          },
          {
            title: "অস্থায়ী মসজিদ",
            desc: "প্রতিদিনের পাঁচ ওয়াক্ত নামাজ এবং দ্বীনি আলোচনার জন্য প্রস্তুতকৃত অস্থায়ী ইবাদতখানা।",
          },
          {
            title: "স্থায়ী মসজিদ নির্মাণের পরিকল্পনা",
            desc: "কমিউনিটির স্থায়ী দ্বীনি আশ্রয় ও ইবাদতের জন্য পূর্ণাঙ্গ স্থায়ী মসজিদ কমপ্লেক্স নির্মাণের পরিকল্পনা।",
          },
          {
            title: "অসহায় শিক্ষার্থীদের শিক্ষাব্যয় ও প্রয়োজনীয় সহায়তা",
            desc: "আর্থিক অসচ্ছল শিক্ষার্থী ও পরিবারের জন্য শিক্ষা অনুদান ও প্রয়োজনীয় মানবিক সহায়তা প্রদান।",
          },
        ],
      },
      {
        badge: "যুক্তরাষ্ট্র শাখা",
        status: "চলমান",
        icon: Globe,
        title: "আমেরিকায় বর্তমান কার্যক্রম",
        intro:
          "আমেরিকার স্থানীয় কমিউনিটিতে পরিচালিত দ্বীনি সেবা, পরিবারভিত্তিক হালাকা ও দূরশিক্ষণ কার্যক্রম।",
        buttonText: "বিস্তারিত দেখুন",
        buttonHref: "/programs",
        buttonIsPrimary: false,
        activities: [
          {
            title: "অনলাইন কুরআন ও তাজবীদ শিক্ষা",
            desc: "আমেরিকার শিক্ষার্থীদের জন্য ঘরে বসেই অনলাইনে বিশুদ্ধ তাজবীদসহ কুরআন শিক্ষার ক্লাস।",
          },
          {
            title: "বেসিক ইসলামিক শিক্ষা",
            desc: "শিশু, কিশোর ও বয়স্কদের জন্য মৌলিক ইসলামিক জ্ঞান, ঈমান-আকীদা ও দৈনন্দিন আমল শিক্ষা।",
          },
          {
            title: "খাবার ও খাদ্যসামগ্রী সহায়তা",
            desc: "অসহায় ও অভাবগ্রস্ত পরিবারসমূহের কাছে খাদ্য সামগ্রী ও নিত্যপ্রয়োজনীয় রেশন পৌঁছে দেওয়া।",
          },
          {
            title: "শীতবস্ত্র বিতরণ",
            desc: "শীতকালে সুবিধাবঞ্চিত ও শীতার্ত মানুষের মাঝে উষ্ণ শীতবস্ত্র বিতরণ কর্মসূচি।",
          },
          {
            title: "শিক্ষা ও মানবিক সহায়তা",
            desc: "জরুরি মানবিক সংকট মোকাবেলা এবং দ্বীনি ও সাধারণ শিক্ষায় নানামুখী পৃষ্ঠপোষকতা প্রদান।",
          },
        ],
      },
      {
        badge: "ভবিষ্যৎ পরিকল্পনা",
        status: "পরিকল্পনাধীন",
        icon: Compass,
        title: "আমেরিকায় ভবিষ্যৎ পরিকল্পনা",
        intro:
          "আমেরিকায় একটি পূর্ণাঙ্গ ও স্বয়ংসম্পূর্ণ দ্বীনি মারকাজ হিসেবে গড়ে তোলার সুদূরপ্রসারী রূপরেখা।",
        buttonText: "আমাদের কার্যক্রমে অংশ নিন",
        buttonHref: "/#donate",
        buttonIsPrimary: true,
        activities: [
          {
            title: "পাঁচ ওয়াক্ত জামাআতে নামাজ",
            desc: "প্রতিদিন শান্ত ও বরকতময় পরিবেশে পাঁচ ওয়াক্ত নামাজের সুশৃঙ্খল জামাআত পরিচালনা।",
          },
          {
            title: "সাপ্তাহিক জুমুআহ ও খুতবা",
            desc: "সাপ্তাহিক জুমুআহর জামাআত এবং সমসাময়িক ও দ্বীনি বিষয়ে দিকনির্দেশনামূলক খুতবা প্রদান।",
          },
          {
            title: "মক্তব ও হিফজ বিভাগ",
            desc: "শিশু-কিশোর ও আগ্রহীদের জন্য নিয়মিত মক্তব এবং পূর্ণাঙ্গ হিফজুল কুরআন বিভাগ পরিচালনা।",
          },
          {
            title: "কুরআন, তাজবীদ, তাফসীর, হাদীস, ফিকহ, আকীদা, সীরাত ও ইতিহাস শিক্ষা",
            desc: "ইসলামের সকল মৌলিক ও অপরিহার্য শাখার সমন্বয়ে গঠিত ধারাবাহিক শিক্ষা ব্যবস্থা।",
          },
          {
            title: "শিশু, যুবক, নারী, পরিবার ও প্রবীণদের জন্য প্রোগ্রাম",
            desc: "পরিবারের প্রতিটি সদস্যের মানসিক ও দ্বীনি উন্নতির উপযোগী বিশেষায়িত হালাকাহ ও কর্মশালা।",
          },
          {
            title: "স্থায়ী মসজিদ ও ইসলামিক সেন্টার প্রতিষ্ঠা",
            desc: "আমেরিকায় নিজস্ব ভূমিতে স্থায়ী মসজিদ, লাইব্রেরি ও সার্বক্ষণিক ইসলামিক সেন্টার গড়ে তোলা।",
          },
          {
            title: "হালাল ফুড ব্যাংক ও অভিবাসী সহায়তা সেল",
            desc: "অভাবগ্রস্ত মানুষের জন্য হালাল খাদ্য ব্যাংক এবং নতুন অভিবাসীদের সহায়তায় বিশেষ সেল গঠন।",
          },
        ],
      },
    ],
  };

  const currentContent = language === "bn" ? contentBn : contentEn;

  const isAllExpanded = currentContent.categories.every(
    (_, idx) => !!expandedCards[idx]
  );

  const toggleAll = () => {
    if (isAllExpanded) {
      setExpandedCards({});
    } else {
      const all = {};
      currentContent.categories.forEach((_, idx) => {
        all[idx] = true;
      });
      setExpandedCards(all);
    }
  };

  return (
    <section
      id="activities"
      className="relative w-full bg-[#FAF8F2] text-[#252525] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-[#E5DFD3] overflow-hidden"
    >
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[950px] h-[400px] sm:h-[500px] rounded-full opacity-35 blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(184, 149, 80, 0.15) 0%, rgba(250, 248, 242, 0.45) 50%, transparent 70%)",
          }}
        />
        {/* Top Decorative Gold Line Accent */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B89550]/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto min-w-0">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 min-w-0 flex flex-col items-center">
          {/* Section Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-white/90 text-xs sm:text-sm font-semibold text-[#B89550] shadow-2xs mb-2.5 sm:mb-3 relative overflow-hidden">
            <div className="glass-specular-top" />
            <Sparkles className="w-3.5 h-3.5 text-[#B89550]" />
            <span>{currentContent.badge}</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#252525] leading-tight">
            {currentContent.headingPart1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C]">
              {currentContent.headingPart2}
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-[#595959] leading-relaxed max-w-2xl">
            {currentContent.subtitle}
          </p>
        </div>

        {/* 3 Main Activity Glass Categories (Half Size / Height) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-start">
          {currentContent.categories.map((cat, catIdx) => {
            const Icon = cat.icon;
            const isExpanded = !!expandedCards[catIdx];
            const visibleActivities = isExpanded
              ? cat.activities
              : cat.activities.slice(0, INITIAL_VISIBLE_COUNT);
            const remainingCount = cat.activities.length - INITIAL_VISIBLE_COUNT;

            return (
              <div
                key={catIdx}
                className="rounded-2xl sm:rounded-3xl glass-card p-5 sm:p-6 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-[#B89550]/60 transition-all duration-300"
              >
                  <div className="glass-specular-top" />
                  <div>
                    {/* Category Badge & Status */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-[11px] font-semibold text-[#B89550] border border-[#B89550]/35 shadow-2xs">
                        <Icon className="w-3.5 h-3.5" />
                        <span>{cat.badge}</span>
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          catIdx === 2
                            ? "text-[#B89550] bg-[#FAF8F2] border-[#B89550]/40"
                            : "text-[#595959] bg-white/70 border-stone-200"
                        }`}
                      >
                        {cat.status}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#252525] leading-snug">
                      {cat.title}
                    </h3>

                    <p className="mt-1.5 text-xs text-[#595959] leading-relaxed">
                      {cat.intro}
                    </p>

                    {/* Compact Activity Item List */}
                    <div className="mt-3.5 space-y-2">
                      {visibleActivities.map((act, actIdx) => (
                        <div
                          key={actIdx}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/55 hover:bg-white/90 border border-white/80 transition-all text-left shadow-2xs"
                        >
                          <div className="w-4 h-4 rounded-full bg-[#B89550]/15 text-[#B89550] flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-3 h-3" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-[#252525] leading-snug">
                              {act.title}
                            </h4>
                            <p className="text-[11px] text-[#595959] mt-0.5 leading-relaxed">
                              {act.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* "View More" Toggle Button */}
                    {remainingCount > 0 && (
                      <div className="mt-3 pt-1 flex justify-start">
                        <button
                          type="button"
                          onClick={() => toggleCard(catIdx)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-[#B89550] bg-white/80 hover:bg-white border border-[#B89550]/35 hover:border-[#B89550] transition-all shadow-2xs cursor-pointer active:scale-95 group/btn"
                        >
                          <span>
                            {isExpanded
                              ? language === "bn"
                                ? "সংক্ষেপ করুন"
                                : "View Less"
                              : language === "bn"
                              ? `আরও ${remainingCount}টি দেখুন`
                              : `View More (+${remainingCount})`}
                          </span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-[#B89550] transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Footer Action Button */}
                  <div className="mt-5 pt-3.5 border-t border-stone-200/60">
                    <Link
                      href={cat.buttonHref}
                      className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 active:scale-[0.98] relative overflow-hidden ${
                        cat.buttonIsPrimary
                          ? "btn-gold !py-2.5 !text-xs"
                          : "btn-glass !py-2.5 !text-xs !bg-white/70 hover:!bg-white"
                      }`}
                    >
                      {!cat.buttonIsPrimary && <div className="glass-specular-top" />}
                      <span>{cat.buttonText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
          })}
        </div>

        {/* Section-wide "View All Activities" Toggle Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={toggleAll}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#252525] bg-white/80 hover:bg-white backdrop-blur-md border border-white/90 hover:border-[#B89550]/50 shadow-2xs hover:shadow-xs transition-all cursor-pointer relative overflow-hidden group"
          >
            <div className="glass-specular-top" />
            <span>
              {isAllExpanded
                ? language === "bn"
                  ? "সংক্ষেপ করুন"
                  : "Show Less Activities"
                : language === "bn"
                ? "সকল কার্যক্রম বিস্তারিত দেখুন"
                : "View All Activities & Programs"}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#B89550] transition-transform duration-200 ${
                isAllExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
}

