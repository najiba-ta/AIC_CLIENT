"use client";

import ContactForm from "@/components/contact/ContactForm";
import OfficialContactSection from "@/components/contact/OfficialContactSection";
import { MessageSquare, HelpCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactClient() {
  const { isBn } = useLanguage();

  const faqs = isBn
    ? [
        {
          q: "মসজিদ ও কেন্দ্রের কার্যক্রমের সময়সূচি কী?",
          a: "কেন্দ্রটি প্রতিদিন ফজর থেকে এশা পর্যন্ত সকল ওয়াক্তের নামাজের জন্য উন্মুক্ত থাকে। প্রতিটি আজানের ২০ মিনিট আগে হল খুলে দেওয়া হয় এবং নামাজ ও সান্ধ্যকালীন প্রোগ্রাম সমাপ্তির পর বন্ধ করা হয়।",
        },
        {
          q: "নারী ও পুরুষদের জন্য কি আলাদা নামাজের ব্যবস্থা রয়েছে?",
          a: "হ্যাঁ। আল হিদায়াহ ইসলামিক সেন্টারে নারী ও পুরুষদের জন্য সম্পূর্ণ আলাদা অজুখানা ও নামাযের হল রয়েছে, যা আধুনিক সাউন্ড ও ভিজুয়াল সিস্টেম দ্বারা সজ্জিত।",
        },
        {
          q: "সন্তানদের কুরআন ও ইসলামিক স্টাডিজ ক্লাসে কীভাবে ভর্তি করাব?",
          a: "আপনি আমাদের কন্টাক্ট ফরমে বার্তা পাঠাতে পারেন অথবা সরাসরি জুমার নামাজের পর শিক্ষা সমন্বয়কারীদের সাথে দেখা করতে পারেন।",
        },
        {
          q: "অনলাইন দানের ক্ষেত্রে কীভাবে রশিদ পাওয়া যাবে?",
          a: "স্ট্রাইপের মাধ্যমে অনলাইনে অনুদান সম্পন্ন করার সাথে সাথেই আপনার ইমেইলে স্বয়ংক্রিয়ভাবে অফিসিয়াল স্বীকৃতি ও ট্যাক্স রশিদ পৌঁছে যাবে।",
        },
      ]
    : [
        {
          q: "What are the center's operating and prayer hours?",
          a: "The center is open daily for all five congregational prayers starting from Fajr through Isha. The prayer hall opens 20 minutes before each Adhan and closes following the conclusion of prayers and evening programs.",
        },
        {
          q: "Are there separate prayer facilities for brothers and sisters?",
          a: "Yes. Al Hidayah Islamic Center features dedicated prayer areas and private wudu (ablution) facilities for both brothers and sisters, equipped with direct audio and visual broadcast systems.",
        },
        {
          q: "How can I register my children for Qur'an and Islamic studies classes?",
          a: "You can submit an inquiry through our contact form or visit the center following Friday Jumu'ah services to meet with our education coordinators.",
        },
        {
          q: "How do I receive a tax receipt for my Stripe online donation?",
          a: "All online donations processed through our verified Stripe checkout system automatically generate an official confirmation and tax receipt sent directly to your email address.",
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
            <MessageSquare className="w-4 h-4 text-[#B89550]" />
            <span>{isBn ? "যোগাযোগ ও তথ্য অনুসন্ধান" : "Connect & Inquire"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#252525] leading-tight">
            {isBn ? "যোগাযোগ: " : "Contact "}
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
              ? "আপনার যেকোনো জিজ্ঞাসা, পরামর্শ ও মতামত আমাদের জানাতে আমরা আন্তরিকভাবে স্বাগত জানাই।"
              : "We welcome your questions, program inquiries, prayer schedule confirmations, and feedback."}
          </p>
        </div>
      </section>

      {/* Official Connect With Us Cards & Visit Us Section */}
      <OfficialContactSection />

      {/* Main Content: Form & Center Info */}
      <section className="relative w-full py-16 sm:py-20 px-3.5 sm:px-6 lg:px-8 border-b border-[#E5DFD3] dark:border-[#D6B66D]/20 bg-white dark:bg-transparent">
        <div className="max-w-7xl mx-auto">
          <ContactForm />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative w-full py-16 sm:py-20 px-3.5 sm:px-6 lg:px-8 bg-[#F1EDE3]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#B89550]/40 text-[#B89550] text-xs font-semibold mb-3 shadow-2xs">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{isBn ? "সাধারণ প্রশ্নোত্তর" : "Frequently Asked Questions"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525]">
              {isBn ? "সাধারণ প্রশ্ন ও উত্তর" : "Common Questions & Answers"}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl glass-card relative overflow-hidden space-y-2"
              >
                <div className="glass-specular-top" />
                <h3 className="text-sm sm:text-base font-bold text-[#252525] flex items-start gap-2">
                  <span className="text-[#B89550] font-mono text-sm">{isBn ? "প্র." : "Q."}</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#595959] pl-5 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
