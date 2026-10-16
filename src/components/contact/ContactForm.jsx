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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const { isBn } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "General Inquiry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const validate = () => {
    const trimmedName = formData.name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setError(
        isBn
          ? "অনুগ্রহ করে আপনার নাম লিখুন (কমপক্ষে ২ অক্ষর)।"
          : "Please enter your name (at least 2 characters)."
      );
      return false;
    }

    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      setError(
        isBn
          ? "অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা প্রদান করুন।"
          : "Please provide a valid email address."
      );
      return false;
    }

    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage || trimmedMessage.length < 5) {
      setError(
        isBn
          ? "অনুগ্রহ করে আপনার বার্তার বিস্তারিত লিখুন (কমপক্ষে ৫ অক্ষর)।"
          : "Please enter your message details (at least 5 characters)."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim() || formData.category,
        category: formData.category,
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

      if (!res.ok || !data?.success) {
        throw new Error(
          data?.error ||
            data?.message ||
            (isBn
              ? "বার্তা পাঠানো সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।"
              : "Failed to send your message. Please try again shortly.")
        );
      }

      // Only show success if the server confirmed operation succeeded
      setSubmitted(true);
      setSuccessMessage(
        data?.message ||
          (isBn
            ? "আল হিদায়াহ ইসলামিক সেন্টারে যোগাযোগ করার জন্য ধন্যবাদ। আমরা আপনার বার্তা পেয়েছি এবং শীঘ্রই উত্তর দেব।"
            : "Thank you for contacting Al Hidayah Islamic Center. We have received your message and will respond shortly.")
      );

      // Reset form fields upon confirmed success
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "General Inquiry",
        message: "",
      });
    } catch (err) {
      console.error("[Contact Form Submit Error]", err);
      // Preserve visitor's entered message so they can retry without losing their text
      setError(
        err?.message ||
          (isBn
            ? "বার্তা পাঠানো সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।"
            : "Failed to send message. Please check your connection and retry.")
      );
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
              ? "নিচের ফরমটি পূরণ করুন, আমাদের প্রশাসনিক প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবেন।"
              : "Fill out the form below and our administration will respond to your inquiry promptly."}
          </p>

          {submitted ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-white/95 backdrop-blur-md border border-[#B89550]/40 text-center space-y-4 shadow-sm animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-[#FAF8F2] border-2 border-[#B89550]/50 text-[#B89550] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#252525]">
                {isBn ? "বার্তা সফলভাবে পাঠানো হয়েছে" : "Message Submitted Successfully"}
              </h3>
              <p className="text-xs sm:text-sm text-[#595959] leading-relaxed max-w-md mx-auto">
                {successMessage}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setSuccessMessage("");
                }}
                className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B89550] hover:bg-[#A58342] text-white text-xs sm:text-sm font-bold cursor-pointer shadow-sm transition-all"
              >
                <span>{isBn ? "আরেকটি বার্তা পাঠান" : "Send Another Message"}</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5 shadow-2xs">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <strong className="block font-semibold">
                      {isBn ? "ত্রুটি:" : "Error:"}
                    </strong>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Name */}
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
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-[#D6CEC0] text-sm text-[#252525] placeholder-stone-400 focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#595959] mb-1.5"
                  >
                    {isBn ? "ইমেইল ঠিকানা *" : "Email Address *"}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="ahmad@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-[#D6CEC0] text-sm text-[#252525] placeholder-stone-400 focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all disabled:opacity-60"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#595959] mb-1.5"
                  >
                    {isBn ? "জিজ্ঞাসার বিষয়" : "Inquiry Category"}
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-[#D6CEC0] text-sm text-[#252525] focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all disabled:opacity-60"
                  >
                    <option value="General Inquiry">{isBn ? "সাধারণ জিজ্ঞাসা" : "General Inquiry"}</option>
                    <option value="Prayer Services">{isBn ? "নামাজ ও জুমার সময়সূচি" : "Prayer & Jumu'ah Services"}</option>
                    <option value="Education & Classes">{isBn ? "কুরআন ও ইসলামী শিক্ষা" : "Qur'an & Islamic Education"}</option>
                    <option value="Youth & Family">{isBn ? "যুব ও পরিবার কার্যক্রম" : "Youth & Family Activities"}</option>
                    <option value="Donations & Zakat">{isBn ? "দান ও যাকাত সংক্রান্ত" : "Donations & Charitable Support"}</option>
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#595959] mb-1.5"
                  >
                    {isBn ? "বিষয় (ঐচ্ছিক)" : "Subject (Optional)"}
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder={isBn ? "সংক্ষিপ্ত বিষয়" : "Brief topic summary"}
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-[#D6CEC0] text-sm text-[#252525] placeholder-stone-400 focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Message */}
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
                  rows="4"
                  required
                  placeholder={isBn ? "আপনার বার্তা বা জিজ্ঞাসা এখানে লিখুন..." : "Please write your inquiry or message here..."}
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
