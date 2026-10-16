"use client";

import Link from "next/link";
import {
  Clock,
  Users,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  HandHeart,
  CheckCircle2,
  Calendar,
  Heart,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ProgramsClient() {
  const { isBn } = useLanguage();

  const detailedPrograms = isBn
    ? [
        {
          id: "daily-prayers",
          title: "দৈনিক পাঁচ ওয়াক্ত জামাত",
          category: "ইবাদত ও আধ্যাত্মিক সেবা",
          schedule: "প্রতিদিন • ফজর, যোহর, আসর, মাগরিব, এশা",
          target: "সকল ধর্মপ্রাণ মুসলিম ও পরিবার",
          description:
            "প্রতিদিন পাঁচ ওয়াক্ত ফরজ নামাজের জন্য মূল মসজিদ প্রাঙ্গণ উন্মুক্ত। পুরুষ ও মহিলাদের জন্য আলাদা ও মানসম্মত পরিবেশ নিশ্চিত রয়েছে।",
          features: [
            "প্রতিটি ওয়াক্তে নিয়মমাফিক আজান ও নির্ধারিত সময়ে জামাত",
            "প্রশস্ত, শীতাতপ নিয়ন্ত্রিত ও পরিচ্ছন্ন নামাজ হল",
            "পুরুষ ও নারীদের জন্য স্বতন্ত্র অজুখানা",
            "নির্বাচিত ওয়াক্তের পর সংক্ষিপ্ত তাযকিয়া ও হাদিসের আলোচনা",
          ],
          icon: Clock,
        },
        {
          id: "jumuah-prayer",
          title: "পবিত্র জুমার জামাত ও খুতবা",
          category: "ইবাদত ও আধ্যাত্মিক সেবা",
          schedule: "প্রতি শুক্রবার • ১:০০ PM খুতবা ও ১:৩০ PM জামাত",
          target: "সার্বিক মুসলিম সমাজ",
          description:
            "সপ্তাহের শ্রেষ্ঠ দিনে পবিত্র জুমার নামাজে অংশগ্রহণ। সমসাময়িক প্রেক্ষাপটে জীবনঘনিষ্ঠ উপদেশ ও দিকনির্দেশনামূলক খুতবা প্রদান।",
          features: [
            "যোগ্য ও অভিজ্ঞ ইমামগণের দ্বারা তথ্যবহুল ও শিক্ষণীয় খুতবা",
            "অতিরিক্ত মুসল্লির জন্য সুব্যবস্থাপনা",
            "মসজিদ প্রাঙ্গণে সুশৃঙ্খল পার্কিং ও প্রবেশ সুবিধা",
            "নামাজ শেষে জরুরি ঘোষণা ও দ্বীনি সৌহার্দ্য বিনিময়",
          ],
          icon: Users,
        },
        {
          id: "quran-hifz",
          title: "কুরআন তিলাওয়াত, তাজবীদ ও হিফজ",
          category: "ইসলামী শিক্ষা কার্যক্রম",
          schedule: "সপ্তাহের দিনগুলোতে বিকেল ও সাপ্তাহিক ছুটির সকালে",
          target: "শিশু (৫+ বছর), কিশোর ও প্রাপ্তবয়স্ক",
          description:
            "অভিজ্ঞ কারী ও উস্তাদগণের তত্ত্বাবধানে সহিহ মাখরাজ ও তাজবীদের নিয়মানুযায়ী কুরআন তিলাওয়াত ও হিফজ প্রশিক্ষণ।",
          features: [
            "শিক্ষানবিস থেকে উচ্চতর তাজবীদ অনুশীলনের ধাপ",
            "ব্যক্তিগত মনোযোগ ও প্রত্যেকের নিজস্ব গতি অনুযায়ী পাঠ",
            "তিলাওয়াতের পাশাপাশি নির্বাচিত সূরার মর্মার্থ অনুধাবন",
            "নির্দিষ্ট সময় পর পর মূল্যায়ন ও অগ্রগতি সনদ প্রদান",
          ],
          icon: BookOpen,
        },
        {
          id: "islamic-studies",
          title: "মৌলিক ইসলামিক স্টাডিজ ও সীরাত",
          category: "ইসলামী শিক্ষা কার্যক্রম",
          schedule: "শনি ও রবিবার • সকাল ১০:০০ – দুপুর ১:০০",
          target: "কিশোর, তরুণ ও উইকেন্ড স্কুলের শিক্ষার্থী",
          description:
            "আক্বিদা, ফিক্বহ, সীরাতুন্নবী ﷺ এবং ইসলামী শিষ্টাচার (আদব)-এর ওপর সমন্বিত উইকেন্ড পাঠ্যক্রম।",
          features: [
            "বয়সভিত্তিক আকর্ষণীয় পাঠ্যবই ও ইন্টারঅ্যাক্টিভ ক্লাস",
            "নৈতিক চরিত্র গঠন ও আত্মপরিচয় বিকাশের ওপর গুরুত্ব",
            "অভিভাবকদের সাথে নিয়মিত অগ্রগতি শেয়ারিং",
            "বাৎসরিক মেধা মূল্যায়ন ও সনদ বিতরণ",
          ],
          icon: GraduationCap,
        },
        {
          id: "youth-family",
          title: "যুব ও পরিবার দিকনির্দেশনা প্রোগ্রাম",
          category: "সামাজিক ও পারিবারিক কল্যাণ",
          schedule: "মাসিক কিয়ামুল লাইল ও পাক্ষিক ফ্যামিলি নাইট",
          target: "কিশোর-কিশোরী, যুবক ও পরিবারবর্গ",
          description:
            "তরুণদের আদর্শ মূল্যবোধে গড়ে তুলতে এবং পারিবারিক বন্ধন দৃঢ় করতে বিশেষ কাউন্সিলিং ও নিয়মিত আলোচনা সভা।",
          features: [
            "মাসিক তাহাজ্জুদ ও কিয়ামুল লাইল আলোচনা মাহফিল",
            "পড়াশোনা, ক্যারিয়ার ও মানসিক স্বাস্থ্য সচেতনতামূলক সেশন",
            "মা-বোনদের জন্য বিশেষ হালাকাহ ও পরামর্শ সভা",
            "পারিবারিক সম্মিলন ও সম্প্রীতি বৃদ্ধির উদ্যোগ",
          ],
          icon: HeartHandshake,
        },
        {
          id: "charity-relief",
          title: "ত্রাণ কার্যক্রম ও যাকাত তহবিল",
          category: "আর্তমানবতার সেবা",
          schedule: "সারাবছর চলমান / তাৎক্ষণিক সহায়তা",
          target: "দরিদ্র, অসহায় ও দুর্যোগপীড়িত পরিবার",
          description:
            "যাকাত ও সদকার সুষ্ঠু ব্যবস্থাপনা এবং সম্পূর্ণ গোপনীয়তা ও মর্যাদার সাথে অভাবী পরিবারের মাঝে খাদ্য ও আর্থিক সহায়তা বণ্টন।",
          features: [
            "গোপনীয়তা রক্ষা করে আবেদন যাচাই ও সহায়তা প্রদান",
            "যাকাতুল মাল ও ফিতরা সরাসরি হকদারদের কাছে পৌঁছানো",
            "রমজান ও ঈদে খাদ্য উপহার ও নিত্যপ্রয়োজনীয় সামগ্রী বিতরণ",
            "জরুরি চিকিৎসা ও সংকটে বিশেষ আর্থিক অনুদান",
          ],
          icon: HandHeart,
        },
      ]
    : [
        {
          id: "daily-prayers",
          title: "Five Daily Congregational Prayers",
          category: "Worship & Spiritual Services",
          schedule: "Daily • Fajr, Dhuhr, Asr, Maghrib, Isha",
          target: "Brothers, Sisters, and Families",
          description:
            "The prayer hall is open daily for all five obligatory prayers in congregation, providing an atmosphere of serenity, focus, and spiritual renewal with dedicated facilities for men and women.",
          features: [
            "Adhan and Iqamah called for all 5 daily prayers",
            "Spacious, carpeted main prayer hall and dedicated sisters section",
            "Clean wudu and ablution facilities",
            "Short spiritual reflections (khatirah) after select prayers",
          ],
          icon: Clock,
        },
        {
          id: "jumuah-prayer",
          title: "Friday Jumu'ah Congregational Service",
          category: "Worship & Spiritual Services",
          schedule: "Every Friday • 1:00 PM Khutbah & 1:30 PM Prayer",
          target: "Entire Community",
          description:
            "The highlight of the weekly Islamic calendar. Featuring insightful khutbahs in English with Arabic citations addressing modern life, moral uprightness, and community solidarity.",
          features: [
            "Inspirational weekly sermons by qualified imams and speakers",
            "Full capacity main hall with overflow areas",
            "Ample parking coordination and accessible entry",
            "Community announcements and fellowship following prayer",
          ],
          icon: Users,
        },
        {
          id: "quran-hifz",
          title: "Qur'an Recitation, Tajweed & Hifz",
          category: "Islamic Education",
          schedule: "Weekday Afternoons & Weekend Mornings",
          target: "Children (Ages 5+), Youth, and Adults",
          description:
            "Structured curriculum designed to teach proper pronunciation (makharij), tajweed rules, fluent recitation, and comprehensive memorization (Hifz) under certified instructors.",
          features: [
            "Beginner to advanced tajweed mastery tracks",
            "Personalized one-on-one memorization pacing",
            "Tafseer and meaning understanding alongside recitation",
            "Periodic student assessments and milestone celebrations",
          ],
          icon: BookOpen,
        },
        {
          id: "islamic-studies",
          title: "Foundational Islamic Studies & Seerah",
          category: "Islamic Education",
          schedule: "Saturdays & Sundays • 10:00 AM – 1:00 PM",
          target: "Youth & Weekend School Students",
          description:
            "Comprehensive courses in Islamic theology (Aqeedah), prophetic biography (Seerah), daily jurisprudence (Fiqh), and Islamic etiquette (Adab) tailored for contemporary Muslim youth.",
          features: [
            "Age-appropriate textbooks and interactive lessons",
            "Focus on identity, ethics, and character building",
            "Parent-teacher collaboration and progress reports",
            "Enrichment activities, quizzes, and annual graduation",
          ],
          icon: GraduationCap,
        },
        {
          id: "youth-family",
          title: "Youth Mentorship & Family Programs",
          category: "Community & Fellowship",
          schedule: "Bi-Weekly Friday Family Nights & Monthly Qiyam",
          target: "Teens, Young Adults, and Families",
          description:
            "Safe, uplifting spaces for youth to build lifelong Muslim friendships, discuss contemporary issues with mentors, participate in sports, and engage in wholesome social activities.",
          features: [
            "Monthly Qiyam-ul-Layl night programs with discussions",
            "Interactive workshops on college, career, and mental health",
            "Sisters tea circles and specialized halaqahs",
            "Family potluck dinners and community celebrations",
          ],
          icon: HeartHandshake,
        },
        {
          id: "charity-relief",
          title: "Charitable Assistance & Zakat Distribution",
          category: "Community Welfare",
          schedule: "Ongoing / Case-by-Case Assessment",
          target: "Local Families in Need & Beneficiaries",
          description:
            "Administering local zakat funds, seasonal food drives, clothing assistance, and emergency relief with complete discretion, dignity, and Islamic accountability.",
          features: [
            "Confidential application and needs-assessment process",
            "Direct local distribution of Zakat-ul-Maal and Zakat-ul-Fitr",
            "Holiday food box distributions and community pantry support",
            "Emergency financial relief for eligible community members",
          ],
          icon: HandHeart,
        },
      ];

  return (
    <main className="flex-1 w-full bg-[#FAF8F2] dark:bg-transparent text-[#252525] dark:text-[#F5F1E8]">
      {/* Header Section */}
      <section className="relative w-full bg-[#FAF8F2] dark:bg-transparent py-16 sm:py-24 px-3.5 sm:px-6 lg:px-8 border-b border-[#E5DFD3] dark:border-[#D6B66D]/20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden dark:hidden" aria-hidden="true">
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#191814]/80 border border-[#B89550]/40 text-xs sm:text-sm font-semibold text-[#B89550] dark:text-[#D6B66D] shadow-2xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89550]" />
            <span>{isBn ? "দ্বীনি, শিক্ষামূলক ও সামাজিক সেবা" : "Spiritual, Educational & Social Services"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#252525] leading-tight">
            {isBn ? "আমাদের " : "Our "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C]">
              {isBn ? "প্রোগ্রাম ও কার্যক্রম" : "Programs & Services"}
            </span>
          </h1>

          <div className="flex items-center justify-center gap-2 my-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#B89550]/60" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#B89550]" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#B89550]/60" />
          </div>

          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-[#595959] leading-relaxed font-normal">
            {isBn
              ? "শিশু, কিশোর, প্রাপ্তবয়স্ক ও পরিবারের জন্য ঈমান, নৈতিকতা ও মানবিক সেবামূলক কার্যক্রম।"
              : "Fostering faith, scholarship, and compassionate service through comprehensive initiatives for youth, adults, and families."}
          </p>
        </div>
      </section>

      {/* Programs Cards Grid */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 px-3.5 sm:px-6 lg:px-8 bg-white dark:bg-transparent border-b border-[#E5DFD3] dark:border-[#D6B66D]/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {detailedPrograms.map((prog) => {
              const Icon = prog.icon;
              return (
                <div
                  key={prog.id}
                  id={prog.id}
                  className="rounded-3xl glass-panel p-6 sm:p-7 shadow-lg flex flex-col justify-between relative overflow-hidden group hover:border-[#B89550]/60 transition-all duration-300"
                >
                  <div className="glass-specular-top" />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-stone-200/60">
                      <div className="w-11 h-11 rounded-xl bg-white/90 backdrop-blur-xs text-[#B89550] border border-[#B89550]/30 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 border border-stone-200 text-[#B89550]">
                        {prog.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#252525] group-hover:text-[#B89550] transition-colors">
                        {prog.title}
                      </h3>
                      <div className="mt-2 space-y-1 text-xs text-[#8C827A]">
                        <p className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#B89550] shrink-0" />
                          <span>{prog.schedule}</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#B89550] shrink-0" />
                          <span>{prog.target}</span>
                        </p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                      {prog.description}
                    </p>

                    <div className="pt-2 border-t border-stone-200/60 space-y-2">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#8C827A]">
                        {isBn ? "প্রধান বৈশিষ্ট্যসমূহ" : "Program Highlights"}
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[#595959]">
                        {prog.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#B89550] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-stone-200/60">
                    <Link
                      href="/contact"
                      className="w-full btn-glass !py-2.5 !text-xs"
                    >
                      <span>{isBn ? "প্রোগ্রাম সম্পর্কে জানুন" : "Inquire About Program"}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B89550]" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="relative w-full py-16 sm:py-20 px-3.5 sm:px-6 lg:px-8 bg-[#FAF8F2] dark:bg-transparent">
        <div className="max-w-4xl mx-auto text-center p-8 sm:p-10 rounded-3xl glass-panel relative overflow-hidden">
          <div className="glass-specular-top" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525]">
            {isBn ? "আমাদের দ্বীনি কার্যক্রম সমৃদ্ধ করতে সহায়তা করুন" : "Help Sustain Our Community Programs"}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#595959] max-w-xl mx-auto leading-relaxed">
            {isBn
              ? "আপনার সদকা ও যাকাতের মাধ্যমে শিক্ষা কার্যক্রম, নামাজ হল পরিচালনা ও মানবিক ত্রাণ কার্যক্রম পরিচালিত হয়।"
              : "Your contributions directly support prayer facilities, youth mentorship, food distribution, and community services."}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#donate"
              className="btn-gold !px-7 !py-3 !text-sm shadow-md shadow-[#B89550]/25 hover:shadow-xl hover:shadow-[#B89550]/35"
            >
              <div className="absolute top-0 inset-x-0 h-px bg-white/40 pointer-events-none" />
              <Heart className="w-4 h-4 fill-white" />
              <span>{isBn ? "দান করুন" : "Donate to Programs"}</span>
            </Link>
            <Link
              href="/contact"
              className="btn-glass !px-6 !py-3 !text-sm"
            >
              <span>{isBn ? "যোগাযোগ করুন" : "Contact Us"}</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
