"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  Heart,
  User,
  RefreshCw,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactForm() {
  const { isBn } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successInfo, setSuccessInfo] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorInfo) setErrorInfo(null);
  };

  const validate = () => {
    const trimmedName = formData.name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setErrorInfo({
        status: null,
        titleEn: "Name is required",
        titleBn: "নাম পূরণ করা আবশ্যক",
        en: "Please enter your name (at least 2 characters).",
        bn: "অনুগ্রহ করে আপনার নাম লিখুন (কমপক্ষে ২ অক্ষর)।",
      });
      return false;
    }

    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage || trimmedMessage.length < 5) {
      setErrorInfo({
        status: null,
        titleEn: "Message is required",
        titleBn: "বার্তার বিবরণ প্রয়োজন",
        en: "Please enter your message details (at least 5 characters).",
        bn: "অনুগ্রহ করে আপনার বার্তার বিস্তারিত লিখুন (কমপক্ষে ৫ অক্ষর)।",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting) return;

    // Spam protection: check honeypot
    if (honeypot) {
      console.warn("[ContactForm] Honeypot triggered. Aborting submission.");
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    setErrorInfo(null);

    try {
      const payload = {
        name: formData.name.trim(),
        message: formData.message.trim(),
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      // Check if delivery was not confirmed
      if (!res.ok || !data?.success) {
        const status = res.status;
        const serverMsg = data?.message || data?.error || "";

        if (
          status === 503 ||
          serverMsg.toLowerCase().includes("configured") ||
          serverMsg.toLowerCase().includes("smtp") ||
          serverMsg.toLowerCase().includes("delivery service")
        ) {
          setErrorInfo({
            status: 503,
            titleEn: "Email Delivery Notice",
            titleBn: "ইমেইল ডেলিভারি সংক্রান্ত বিজ্ঞপ্তি",
            en:
              serverMsg ||
              "Email delivery service is currently being configured on the server. Your message was saved. You may also contact us directly at alhidayahislamiccenter26@gmail.com.",
            bn:
              "সার্ভারে ইমেইল ডেলিভারি সেবা বর্তমানে কনফিগার করা হচ্ছে। আপনার বার্তাটি সিস্টেমে সংরক্ষিত হয়েছে। আপনি সরাসরি alhidayahislamiccenter26@gmail.com ঠিকানায়ও যোগাযোগ করতে পারেন।",
          });
        } else {
          setErrorInfo({
            status: status || 500,
            titleEn: "Unable to Send Message",
            titleBn: "বার্তা পাঠানো সম্ভব হয়নি",
            en:
              serverMsg ||
              "Failed to deliver your message. Please try again shortly or contact us directly at alhidayahislamiccenter26@gmail.com.",
            bn:
              "আপনার বার্তাটি এই মুহূর্তে পাঠানো সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন অথবা সরাসরি alhidayahislamiccenter26@gmail.com ঠিকানায় যোগাযোগ করুন।",
          });
        }

        // NOTE: We do NOT clear formData here, preserving the visitor's entered message!
        return;
      }

      // ONLY show success when the API confirms successful email delivery
      setSubmitted(true);
      setSuccessInfo({
        titleEn: "Message Delivered Successfully",
        titleBn: "বার্তা সফলভাবে পাঠানো হয়েছে",
        en:
          data?.message ||
          "Thank you for contacting Al Hidayah Islamic Center. We have received your message and will respond shortly.",
        bn:
          "আল হিদায়াহ ইসলামিক সেন্টারে যোগাযোগ করার জন্য ধন্যবাদ। আমরা আপনার বার্তা পেয়েছি এবং শীঘ্রই উত্তর দেব।",
      });

      // Reset form fields upon confirmed success
      setFormData({
        name: "",
        message: "",
      });
    } catch (err) {
      console.error("[Contact Form Submit Error]", err);
      // Network or client exception: preserve visitor's entered message
      setErrorInfo({
        status: null,
        titleEn: "Connection Error",
        titleBn: "সংযোগ ত্রুটি",
        en:
          "Network error connecting to the center server. Please check your connection and try again, or write directly to alhidayahislamiccenter26@gmail.com.",
        bn:
          "সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি। অনুগ্রহ করে আপনার ইন্টারনেট সংযোগ পরীক্ষা করে পুনরায় চেষ্টা করুন, অথবা সরাসরি alhidayahislamiccenter26@gmail.com ঠিকানায় যোগাযোগ করুন।",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      {/* Left Column: Contact Form */}
      <div className="lg:col-span-7">
        <div className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl glass-panel relative overflow-hidden">
          <div className="glass-specular-top" />

          <h2 className="text-xl sm:text-2xl font-bold text-[#252525] mb-2">
            {isBn ? "আমাদের বার্তা পাঠান" : "Send Us a Message"}
          </h2>
          <p className="text-xs sm:text-sm text-[#595959] mb-6">
            {isBn
              ? "নিচের ফরমটিতে আপনার নাম ও বার্তা লিখে জমা দিন। আমাদের প্রশাসনিক দল দ্রুত আপনার সাথে যোগাযোগ করবে।"
              : "Fill out your name and message below. Our administrative team will review your inquiry promptly."}
          </p>

          {submitted && successInfo ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-white/95 backdrop-blur-md border border-[#B89550]/40 text-center space-y-4 shadow-sm animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-[#FAF8F2] border-2 border-[#B89550]/50 text-[#B89550] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#252525]">
                  {successInfo.titleEn}
                </h3>
                <p className="text-sm font-semibold text-[#B89550]">
                  {successInfo.titleBn}
                </p>
              </div>

              <div className="text-xs sm:text-sm text-[#595959] leading-relaxed max-w-md mx-auto space-y-2.5 pt-1">
                <p>{successInfo.en}</p>
                <div className="pt-2 border-t border-stone-200/70 text-[#3A3A3A] font-medium">
                  {successInfo.bn}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setSuccessInfo(null);
                }}
                className="mt-3 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B89550] hover:bg-[#A58342] text-white text-xs sm:text-sm font-bold cursor-pointer shadow-sm transition-all"
              >
                <span>{isBn ? "আরেকটি বার্তা পাঠান" : "Send Another Message"}</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
              {/* Spam protection: hidden honeypot field */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="_hp_contact">Leave this blank</label>
                <input
                  id="_hp_contact"
                  name="_hp_contact"
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Bilingual Error Alert */}
              {errorInfo && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className={`p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-3 shadow-2xs ${
                    errorInfo.status === 503
                      ? "bg-amber-50/95 border-amber-300 text-amber-950"
                      : "bg-red-50/95 border-red-200 text-red-900"
                  }`}
                >
                  <AlertCircle
                    className={`w-5 h-5 shrink-0 mt-0.5 ${
                      errorInfo.status === 503 ? "text-amber-600" : "text-red-600"
                    }`}
                  />
                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <strong className="block font-bold">
                        {isBn
                          ? `${errorInfo.titleBn} (${errorInfo.titleEn})`
                          : `${errorInfo.titleEn} / ${errorInfo.titleBn}`}
                      </strong>
                      {errorInfo.status && (
                        <span
                          className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                            errorInfo.status === 503
                              ? "bg-amber-200/70 text-amber-900"
                              : "bg-red-200/70 text-red-900"
                          }`}
                        >
                          HTTP {errorInfo.status}
                        </span>
                      )}
                    </div>
                    <p className="leading-snug">{errorInfo.en}</p>
                    <p
                      className={`leading-snug pt-1 border-t font-medium ${
                        errorInfo.status === 503
                          ? "border-amber-200/70 text-amber-900"
                          : "border-red-200/70 text-red-800"
                      }`}
                    >
                      {errorInfo.bn}
                    </p>
                  </div>
                </div>
              )}

              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#595959] mb-1.5"
                >
                  {isBn ? "আপনার নাম *" : "Your Name *"}
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder={isBn ? "উদা: আহমদ খান" : "e.g. Ahmad Khan"}
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/90 backdrop-blur-xs border border-[#D6CEC0] text-sm text-[#252525] placeholder-stone-400 focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Message Details Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#595959] mb-1.5"
                >
                  {isBn ? "বার্তার বিস্তারিত *" : "Message Details *"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  placeholder={
                    isBn
                      ? "আপনার বার্তা বা জিজ্ঞাসা এখানে লিখুন..."
                      : "Please write your inquiry or message here..."
                  }
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-3.5 rounded-xl bg-white/90 backdrop-blur-xs border border-[#D6CEC0] text-sm text-[#252525] placeholder-stone-400 focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all resize-none disabled:opacity-60"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#B89550] hover:bg-[#A58342] text-white font-bold text-sm shadow-md shadow-[#B89550]/20 hover:shadow-lg transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{isBn ? "বার্তা পাঠানো হচ্ছে..." : "Sending Message..."}</span>
                  </>
                ) : (
                  <>
                    <span>{isBn ? "বার্তা পাঠান" : "Submit Message"}</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Right Column: Center Hours & Inquiries Info */}
      <div className="lg:col-span-5 space-y-6">
        {/* Daily Sanctuary Hours */}
        <div className="p-6 sm:p-7 rounded-2xl glass-card relative overflow-hidden space-y-4">
          <div className="glass-specular-top" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-xs text-[#B89550] border border-[#B89550]/30 flex items-center justify-center shadow-2xs">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#252525]">
                {isBn ? "মসজিদের সময়সূচি" : "Sanctuary Hours"}
              </h3>
              <p className="text-xs text-[#B89550] font-semibold">
                {isBn ? "সপ্তাহের ৭ দিনই উন্মুক্ত" : "Open 7 Days a Week"}
              </p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm text-[#595959] pt-1">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
              <span>{isBn ? "দৈনিক নামাজ:" : "Daily Prayers:"}</span>
              <strong className="text-[#252525]">{isBn ? "ফজর থেকে এশা" : "Fajr to Isha"}</strong>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
              <span>{isBn ? "পবিত্র জুমা:" : "Friday Jumu'ah:"}</span>
              <strong className="text-[#B89550]">1:00 PM – 2:00 PM</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>{isBn ? "উইকেন্ড ক্লাস:" : "Weekend Classes:"}</span>
              <strong className="text-[#252525]">10:00 AM – 1:00 PM</strong>
            </div>
          </div>
        </div>

        {/* Administrative Inquiries Card */}
        <div className="p-6 sm:p-7 rounded-2xl glass-card relative overflow-hidden space-y-4">
          <div className="glass-specular-top" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-xs text-[#B89550] border border-[#E5DFD3] flex items-center justify-center shadow-2xs">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#252525]">
                {isBn ? "কেন্দ্রীয় যোগাযোগ" : "Center Inquiries"}
              </h3>
              <p className="text-xs text-[#8C827A]">
                {isBn ? "অফিসিয়াল যোগাযোগ মাধ্যম" : "Official Direct Channels"}
              </p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm text-[#595959] pt-1">
            <a
              href="tel:+17869014304"
              className="flex items-center gap-2.5 text-[#595959] hover:text-[#B89550] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#B89550] shrink-0" />
              <span className="font-semibold text-[#252525]">+1 786-901-4304</span>
            </a>

            <a
              href="mailto:alhidayahislamiccenter26@gmail.com"
              className="flex items-center gap-2.5 text-[#595959] hover:text-[#B89550] transition-colors break-all"
            >
              <Mail className="w-4 h-4 text-[#B89550] shrink-0" />
              <span className="font-semibold text-[#252525]">alhidayahislamiccenter26@gmail.com</span>
            </a>

            <div className="flex items-start gap-2.5 text-[#595959]">
              <MapPin className="w-4 h-4 text-[#B89550] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#252525] font-semibold">Orvylle Dr</strong>
                <span className="text-xs text-[#6B7280]">Warren, MI, United States, Michigan</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-200/60">
            <Link
              href="/#donate"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#B89550] hover:text-[#A58342]"
            >
              <Heart className="w-4 h-4 fill-[#B89550]" />
              <span>
                {isBn ? "মসজিদের রক্ষণাবেক্ষণ ও কার্যক্রমে দান করুন →" : "Support center maintenance & services →"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
