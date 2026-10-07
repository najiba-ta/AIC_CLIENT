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
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactForm() {
  const { isBn } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "General Inquiry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError(isBn ? "অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।" : "Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Simulate clean submission handling
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "General Inquiry",
        message: "",
      });
    }, 800);
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
            <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-[#B89550]/40 text-center space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#FAF8F2] border border-[#B89550]/50 text-[#B89550] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#252525]">
                {isBn ? "বার্তা সফলভাবে গৃহীত হয়েছে" : "Message Received"}
              </h3>
              <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                {isBn
                  ? "আল হিদায়াহ ইসলামিক সেন্টারে যোগাযোগ করার জন্য ধন্যবাদ। আমরা আপনার বার্তা পেয়েছি এবং শীঘ্রই উত্তর দেব।"
                  : "Thank you for contacting Al Hidayah Islamic Center. We have received your message and will get back to you shortly."}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-3 px-5 py-2 rounded-xl bg-[#B89550] hover:bg-[#A58342] text-white text-xs font-semibold cursor-pointer shadow-sm transition-all"
              >
                {isBn ? "আরেকটি বার্তা পাঠান" : "Send Another Message"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {error && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{error}</span>
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
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-[#D6CEC0] text-sm text-[#252525] placeholder-stone-400 focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all"
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
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-[#D6CEC0] text-sm text-[#252525] placeholder-stone-400 focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-[#D6CEC0] text-sm text-[#252525] focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all"
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
                    {isBn ? "বিষয়" : "Subject"}
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder={isBn ? "সংক্ষিপ্ত বিষয়" : "Brief topic summary"}
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-[#D6CEC0] text-sm text-[#252525] placeholder-stone-400 focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all"
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
                  className="w-full p-3.5 rounded-xl bg-white/90 backdrop-blur-xs border border-[#D6CEC0] text-sm text-[#252525] placeholder-stone-400 focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#B89550] hover:bg-[#A58342] text-white font-bold text-sm shadow-md shadow-[#B89550]/20 hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
              href="mailto:alhidayahislamiccenter@gmail.com"
              className="flex items-center gap-2.5 text-[#595959] hover:text-[#B89550] transition-colors break-all"
            >
              <Mail className="w-4 h-4 text-[#B89550] shrink-0" />
              <span className="font-semibold text-[#252525]">alhidayahislamiccenter@gmail.com</span>
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
