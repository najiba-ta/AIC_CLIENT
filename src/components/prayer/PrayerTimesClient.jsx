"use client";

import Link from "next/link";
import {
  Clock,
  Sun,
  Sunrise,
  Sunset,
  Moon,
  Building2,
  CheckCircle2,
  Volume2,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function PrayerTimesClient() {
  const { isBn } = useLanguage();

  const dailyPrayers = [
    {
      name: isBn ? "ফজর" : "Fajr",
      arabic: "الفجر",
      description: isBn ? "সূর্যোদয়ের পূর্বের ভোরের নামাজ" : "Dawn prayer before sunrise",
      adhan: "5:30 AM",
      iqamah: "6:00 AM",
      icon: Sunrise,
    },
    {
      name: isBn ? "যোহর" : "Dhuhr",
      arabic: "الظهر",
      description: isBn ? "মধ্যাহ্ন পরবর্তী দুপুরের নামাজ" : "Midday prayer after true noon",
      adhan: "1:00 PM",
      iqamah: "1:30 PM",
      icon: Sun,
    },
    {
      name: isBn ? "আসর" : "Asr",
      arabic: "العصر",
      description: isBn ? "সূর্যাস্তের পূর্বের বিকেলের নামাজ" : "Late afternoon prayer",
      adhan: "4:45 PM",
      iqamah: "5:00 PM",
      icon: Sun,
    },
    {
      name: isBn ? "মাগরিব" : "Maghrib",
      arabic: "المغرب",
      description: isBn ? "সূর্যাস্তের পরপরই সন্ধ্যার নামাজ" : "Sunset prayer immediately after sunset",
      adhan: "6:45 PM",
      iqamah: "6:50 PM",
      icon: Sunset,
    },
    {
      name: isBn ? "এশা" : "Isha",
      arabic: "العشاء",
      description: isBn ? "রাত্রিকালীন রাতের নামাজ" : "Night prayer after dusk",
      adhan: "8:15 PM",
      iqamah: "8:30 PM",
      icon: Moon,
    },
  ];

  const guidelines = isBn
    ? [
        "মসজিদের মূল হলে প্রবেশের পূর্বে সুন্দরভাবে অজু সম্পন্ন করুন।",
        "প্রবেশদ্বারে নির্ধারিত স্থানে জুতো জোড়া পরিপাটি করে রাখুন।",
        "মসজিদে প্রবেশের পর মোবাইল ফোন সাইলেন্ট বা বন্ধ রাখুন।",
        "ইবাদতের ভাবগাম্ভীর্য ও পবিত্র পরিবেশ বজায় রাখুন।",
        "ছোট শিশুদের নিরাপত্তার জন্য তাদের প্রতি সবসময় খেয়াল রাখুন।",
        "জরুরি নির্গমন পথ খোলা রেখে নির্ধারিত পার্কিংয়ে গাড়ি রাখুন।",
      ]
    : [
        "Perform wudu (ablution) prior to entering the main prayer hall.",
        "Place shoes neatly in the designated shoe racks at the entrance.",
        "Silence all mobile devices and electronic equipment upon entry.",
        "Maintain a respectful, quiet, and reflective environment inside the sanctuary.",
        "Ensure children remain supervised at all times for safety and tranquility.",
        "Park only in marked parking stalls without obstructing emergency lanes.",
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
            <Clock className="w-4 h-4 text-[#B89550]" />
            <span>{isBn ? "দৈনিক পাঁচ ওয়াক্ত জামাত" : "Daily Congregational Schedule"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#252525] leading-tight">
            {isBn ? "নামাজের সময়সূচি ও " : "Prayer Times & "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C]">
              {isBn ? "জুমার জামাত" : "Jumu'ah Services"}
            </span>
          </h1>

          <div className="flex items-center justify-center gap-2 my-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#B89550]/60" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#B89550]" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#B89550]/60" />
          </div>

          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-[#595959] leading-relaxed font-normal">
            {isBn
              ? "“নিশ্চয়ই সালাত বিশ্বাসীদের ওপর নির্দিষ্ট সময়ে নির্ধারিত একটি ফরজ বিধান।”"
              : "“Indeed, prayer has been decreed upon the believers a decree of specified times.”"}
            <span className="block text-xs sm:text-sm text-[#B89550] mt-1 font-medium">
              {isBn ? "— সূরা আন-নিসা (৪:১০৩)" : "— Surah An-Nisa (4:103)"}
            </span>
          </p>
        </div>
      </section>

      {/* Daily Prayers Schedule Cards */}
      <section className="relative w-full py-14 sm:py-20 px-3.5 sm:px-6 lg:px-8 border-b border-[#E5DFD3] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525]">
              {isBn ? "দৈনিক পাঁচ ওয়াক্ত নামাজ (সালাত)" : "Five Daily Prayers (Salah)"}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#595959]">
              {isBn
                ? "নারী ও পুরুষ উভয়ের জন্য সুসজ্জিত ও পৃথক অজুখানা এবং নামাজ হলের সুব্যবস্থা।"
                : "Congregational prayers held daily with dedicated facilities for brothers and sisters."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {dailyPrayers.map((prayer) => {
              const Icon = prayer.icon;
              return (
                <div
                  key={prayer.name}
                  className="rounded-2xl p-5 glass-card flex flex-col justify-between group overflow-hidden"
                >
                  <div className="glass-specular-top" />
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#B89550]/40 to-transparent group-hover:via-[#B89550] transition-all rounded-t-2xl" />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-xs text-[#B89550] border border-white/90 flex items-center justify-center shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-base font-arabic font-bold text-[#B89550]">
                        {prayer.arabic}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#252525]">{prayer.name}</h3>
                    <p className="text-[11px] text-[#6B7280] mt-1 min-h-[32px]">
                      {prayer.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/60 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[#6B7280]">
                      <span>{isBn ? "আজান:" : "Adhan:"}</span>
                      <strong className="text-[#252525] font-mono text-sm">{prayer.adhan}</strong>
                    </div>
                    <div className="flex items-center justify-between text-[#B89550] bg-white/90 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-[#B89550]/30 shadow-2xs">
                      <span className="font-semibold text-[11px] uppercase tracking-wider">
                        {isBn ? "ইক্বামাত:" : "Iqamah:"}
                      </span>
                      <strong className="font-mono text-sm text-[#B89550]">{prayer.iqamah}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Friday Jumu'ah Service Spotlight Banner */}
      <section className="relative w-full py-14 sm:py-20 px-3.5 sm:px-6 lg:px-8 border-b border-[#E5DFD3] bg-[#F1EDE3]">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl p-6 sm:p-10 bg-white/85 backdrop-blur-xl border border-white/90 shadow-xl overflow-hidden">
            <div className="glass-specular-top" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
              <div className="md:col-span-7 space-y-3 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/90 text-[#B89550] text-xs font-bold uppercase tracking-wider shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isBn ? "সাপ্তাহিক মহাসম্মিলন" : "Weekly Congregation"}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525]">
                  {isBn ? "পবিত্র জুমার জামাত" : "Friday Jumu'ah Prayer"}
                </h2>
                <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                  {isBn
                    ? "প্রতি শুক্রবার অনুষ্ঠিত জুমার নামাজে তাৎপর্যপূর্ণ আলোচনা ও খুতবা এবং ভ্রাতৃত্বপূর্ণ সান্নিধ্যে অংশ নিন।"
                    : "Join our vibrant weekly Friday prayer featuring uplifting khutbahs in English and Arabic, bringing our community together in shared worship and brotherly fellowship."}
                </p>
              </div>

              <div className="md:col-span-5 bg-[#FAF8F2] p-5 rounded-2xl border border-[#E5DFD3] space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm pb-2.5 border-b border-[#E5DFD3]">
                  <span className="text-[#6B7280]">{isBn ? "প্রথম আজান:" : "First Adhan:"}</span>
                  <strong className="text-[#252525] font-mono">1:00 PM</strong>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm pb-2.5 border-b border-[#E5DFD3]">
                  <span className="text-[#6B7280]">{isBn ? "খুতবা:" : "Khutbah (Sermon):"}</span>
                  <strong className="text-[#B89550] font-mono">1:10 PM</strong>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm text-[#252525] font-bold">
                  <span>{isBn ? "ইক্বামাত (নামাজ):" : "Iqamah (Prayer):"}</span>
                  <strong className="font-mono text-base text-[#B89550]">1:35 PM</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guidelines & Amenities */}
      <section className="relative w-full py-16 sm:py-20 px-3.5 sm:px-6 lg:px-8 bg-[#FAF8F2]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Mosque Etiquette */}
            <div className="p-6 sm:p-8 rounded-2xl glass-card relative overflow-hidden space-y-4">
              <div className="glass-specular-top" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-xs text-[#B89550] border border-[#E5DFD3] flex items-center justify-center shadow-2xs">
                  <Volume2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#252525]">
                  {isBn ? "মসজিদের আদব ও শিষ্টাচার" : "Sanctuary & Prayer Hall Etiquette"}
                </h3>
              </div>

              <ul className="space-y-3 pt-2">
                {guidelines.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#595959]">
                    <CheckCircle2 className="w-4 h-4 text-[#B89550] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Facilities & Accessibility */}
            <div className="p-6 sm:p-8 rounded-2xl glass-card relative overflow-hidden space-y-4">
              <div className="glass-specular-top" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-xs text-[#B89550] border border-[#B89550]/30 flex items-center justify-center shadow-2xs">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#252525]">
                  {isBn ? "সুযোগ-সুবিধা ও পরিবেশ" : "Center Facilities & Amenities"}
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#595959] leading-relaxed pt-2">
                <p>
                  <strong className="text-[#252525]">{isBn ? "মূল নামাজ হল: " : "Main Prayer Hall: "}</strong>
                  {isBn
                    ? "পুরুষদের জন্য শীতাতপ নিয়ন্ত্রিত, পরিষ্কার ও প্রশস্ত কার্পেটযুক্ত নামাজ হল।"
                    : "Clean, climate-controlled, and carpeted hall accommodating brothers for all prayers."}
                </p>
                <p>
                  <strong className="text-[#252525]">{isBn ? "মহিলাদের নামাজ হল: " : "Sisters Prayer Hall: "}</strong>
                  {isBn
                    ? "মা-বোনদের জন্য সম্পূর্ণ পৃথক ও সুরক্ষিত হল, স্বতন্ত্র অজুখানা ও সাউন্ড সিস্টেম।"
                    : "Dedicated, fully-equipped hall with audio/visual link and private wudu facilities."}
                </p>
                <p>
                  <strong className="text-[#252525]">{isBn ? "বিশেষ সক্ষমদের সুবিধা: " : "Accessibility: "}</strong>
                  {isBn
                    ? "হুইলচেয়ার র‍্যাম্প এবং বয়োজ্যেষ্ঠ ও অসুস্থদের জন্য আরামদায়ক বসার সুব্যবস্থা।"
                    : "Wheelchair accessible entrance ramps and designated accessible prayer spaces."}
                </p>
                <p>
                  <strong className="text-[#252525]">{isBn ? "পার্কিং সুবিধা: " : "Parking: "}</strong>
                  {isBn
                    ? "জুমার নামাজ ও তারাবীতে সুশৃঙ্খল পার্কিং তদারকি।"
                    : "On-site parking with volunteer coordination during high-attendance Friday Jumu'ah and Ramadan prayers."}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200/60 flex items-center justify-between">
                <span className="text-xs text-[#6B7280]">
                  {isBn ? "নামাজের সময় নিয়ে কোনো প্রশ্ন আছে?" : "Questions about prayer facilities?"}
                </span>
                <Link
                  href="/contact"
                  className="text-xs font-semibold text-[#B89550] hover:underline"
                >
                  {isBn ? "যোগাযোগ করুন →" : "Contact Us →"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
