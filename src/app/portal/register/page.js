"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  GraduationCap,
  BookOpen,
  User,
  Mail,
  Lock,
  Phone,
  Building,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Loader2,
  Award,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function MemberRegisterPage() {
  const router = useRouter();
  const { isBn } = useLanguage();
  const [role, setRole] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlRole = params.get("role");
        if (urlRole === "student" || urlRole === "teacher") return urlRole;
      } catch {
        // Ignore fallback
      }
    }
    return "student";
  });

  const [formData, setFormData] = useState(() => {
    let initialDepartment = "";
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        initialDepartment = params.get("program") || params.get("course") || "";
      } catch {
        // Ignore fallback
      }
    }
    return {
      name: "",
      email: "",
      password: "",
      phone: "",
      department: initialDepartment,
      guardianName: "",
      qualification: "",
      avatarUrl: "",
    };
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Avatar presets for quick and easy selection
  const avatarPresets = [
    {
      id: "av1",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      label: "Avatar 1",
    },
    {
      id: "av2",
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      label: "Avatar 2",
    },
    {
      id: "av3",
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
      label: "Avatar 3",
    },
    {
      id: "av4",
      url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
      label: "Avatar 4",
    },
    {
      id: "av5",
      url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80",
      label: "Avatar 5",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          role,
          avatarUrl: formData.avatarUrl || avatarPresets[0].url,
          profileImage: formData.avatarUrl || avatarPresets[0].url,
          classLevel: formData.department,
          subject: formData.department,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Registration failed. Please check your information.");
        setIsLoading(false);
        return;
      }

      if (role === "student") {
        setSuccessMessage(
          isBn
            ? "রেজিস্ট্রেশন সফল হয়েছে! এবার আপনার অনলাইন কুরআন ও ইসলামিক স্টাডিজ ভর্তি ফরমটি পূরণ করুন..."
            : "Account created successfully! Please complete the Online Quran & Islamic Studies Admission Form to finalize your application..."
        );
        setTimeout(() => {
          router.push("/portal/admission");
        }, 1200);
      } else {
        setSuccessMessage(
          isBn
            ? "আপনার শিক্ষক রেজিস্ট্রেশন সফলভাবে জমা হয়েছে! একজন অ্যাডমিনের অনুমোদনের পর আপনার আইডি নিশ্চিত করা হবে।"
            : "Your teacher registration has been submitted successfully! An administrator will review your credentials to assign your official ID."
        );
        setTimeout(() => {
          router.push("/portal");
        }, 1500);
      }
    } catch (err) {
      setError(err?.message || "An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] text-[#252525] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-xl mx-auto w-full space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-105 transition-all">
              <Image
                src="/images/logo.png"
                alt="Al Hidayah Islamic Center Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-brand text-xl font-bold tracking-wide text-[#252525]">
              {isBn ? "আল হিদায়াহ ইসলামিক সেন্টার" : "Al Hidayah Islamic Center"}
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
            {isBn ? "মেম্বার রেজিস্ট্রেশন পোর্টাল" : "Member Registration Portal"}
          </h1>
          <p className="text-sm text-[#595959] max-w-md mx-auto">
            {isBn
              ? "একজন শিক্ষার্থী বা শিক্ষক হিসেবে আমাদের দ্বীনি ও শিক্ষামূলক প্ল্যাটফর্মে যুক্ত হোন।"
              : "Join our spiritual and educational community as a verified Student or Teacher."}
          </p>
        </div>

        {/* Main Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel relative overflow-hidden shadow-xl space-y-6">
          <div className="glass-specular-top" />
          
          {/* Role Selection Switcher */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#595959]">
              {isBn ? "অ্যাকাউন্টের ধরন নির্বাচন করুন" : "Select Account Type"}
            </label>
            <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#FAF8F2] border border-[#E5DFD3] rounded-2xl">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  role === "student"
                    ? "bg-[#B89550] text-white shadow-sm"
                    : "text-[#595959] hover:text-[#252525] hover:bg-[#F1EDE3]"
                }`}
              >
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span>{isBn ? "শিক্ষার্থী (Student)" : "Student"}</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  role === "teacher"
                    ? "bg-[#B89550] text-white shadow-sm"
                    : "text-[#595959] hover:text-[#252525] hover:bg-[#F1EDE3]"
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>{isBn ? "শিক্ষক / ওস্তাদ (Teacher)" : "Teacher / Scholar"}</span>
              </button>
            </div>
          </div>

          {/* Verification Protocol Notice */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#B89550]/30 text-xs text-[#595959] flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-[#B89550] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {isBn ? (
                <>
                  <strong>অ্যাডমিন যাচাইকরণ:</strong> রেজিস্ট্রেশনের পর আপনার আবেদনটি পর্যালোচনা করা হবে এবং অনুমোদিত হলে আপনার ডিজিটাল আইডি নম্বর (যেমন:{" "}
                  <span className="font-mono text-[#252525] font-bold">
                    {role === "teacher" ? "AIC-TEA-001" : "AIC-STU-001"}
                  </span>
                  ) প্রদান করা হবে।
                </>
              ) : (
                <>
                  <strong>Admin Verification:</strong> Upon sign up, your account will be marked as{" "}
                  <span className="text-[#B89550] font-semibold">Pending</span>. Once approved by the administration, your official serial ID (e.g.{" "}
                  <span className="font-mono text-[#252525] font-bold">
                    {role === "teacher" ? "AIC-TEA-001" : "AIC-STU-001"}
                  </span>
                  ) will appear under your profile picture.
                </>
              )}
            </p>
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-4 rounded-xl bg-white/90 backdrop-blur-md border border-[#B89550]/40 text-[#252525] text-xs sm:text-sm flex items-start gap-2.5 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#B89550] shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#595959] mb-1.5">
                {isBn ? "পূর্ণ নাম *" : "Full Legal Name *"}
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
                <input
                  type="text"
                  required
                  placeholder={isBn ? "উদা: মুহাম্মদ আব্দুল্লাহ" : "e.g. Muhammad Al-Ghazali"}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3] text-sm text-[#252525] placeholder-[#8C827A] focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#595959] mb-1.5">
                {isBn ? "ইমেইল ঠিকানা *" : "Email Address *"}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3] text-sm text-[#252525] placeholder-[#8C827A] focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#595959] mb-1.5">
                {isBn ? "পাসওয়ার্ড *" : "Password *"}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder={isBn ? "কমপক্ষে ৬ অক্ষর" : "Minimum 6 characters"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3] text-sm text-[#252525] placeholder-[#8C827A] focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all"
                />
              </div>
            </div>

            {/* Phone & Department Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#595959] mb-1.5">
                  {isBn ? "ফোন নম্বর" : "Phone Number"}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
                  <input
                    type="tel"
                    placeholder="+880 1XXX-XXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3] text-sm text-[#252525] placeholder-[#8C827A] focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#595959] mb-1.5">
                  {role === "teacher"
                    ? (isBn ? "পাঠদানের বিষয় / বিভাগ" : "Teaching Subject / Specialization")
                    : (isBn ? "আগ্রহী কোর্স / প্রোগ্রাম" : "Course / Program Interest")}
                </label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
                  <input
                    type="text"
                    placeholder={
                      role === "teacher"
                        ? (isBn ? "উদা: কুরআন হিফজ ও তাজবীদ" : "e.g. Quran Hifz & Tajweed")
                        : (isBn ? "উদা: পূর্ণাঙ্গ ইসলামী শিক্ষা প্রোগ্রাম" : "e.g. Comprehensive Islamic Education")
                    }
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3] text-sm text-[#252525] placeholder-[#8C827A] focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Role Specific Extra Field */}
            {role === "student" && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#595959] mb-1.5">
                  {isBn ? "অভিভাবকের পূর্ণ নাম" : "Guardian / Parent Full Name"}
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
                  <input
                    type="text"
                    placeholder={isBn ? "উদা: তারিক আল-মনসুর" : "e.g. Tariq Al-Mansoor"}
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3] text-sm text-[#252525] placeholder-[#8C827A] focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all"
                  />
                </div>
              </div>
            )}

            {role === "teacher" && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#595959] mb-1.5">
                  {isBn ? "শিক্ষাগত যোগ্যতা / ইজাযাহ" : "Academic Qualification / Ijazah"}
                </label>
                <div className="relative">
                  <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
                  <input
                    type="text"
                    placeholder={isBn ? "উদা: দাওরায়ে হাদিস / তাজবীদ ও কিরাত ইজাযাহ" : "e.g. Al-Azhar University Graduate / Ijazah in Tajweed"}
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3] text-sm text-[#252525] placeholder-[#8C827A] focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all"
                  />
                </div>
              </div>
            )}

            {/* Profile Avatar Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#595959] mb-2 flex items-center justify-between">
                <span>{isBn ? "প্রোফাইল ছবি / অবতার বেছে নিন" : "Choose Profile Photo / Avatar"}</span>
                <span className="text-[11px] text-[#8C827A] font-normal">{isBn ? "যেকোনো একটি নির্বাচন করুন" : "Select one"}</span>
              </label>
              <div className="flex items-center gap-3 overflow-x-auto py-1">
                {avatarPresets.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, avatarUrl: av.url })}
                    className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      (formData.avatarUrl || avatarPresets[0].url) === av.url
                        ? "border-[#B89550] ring-2 ring-[#B89550]/40 scale-105"
                        : "border-[#E5DFD3] hover:border-[#B89550]/60 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={av.url}
                      alt={av.label}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#B89550] hover:bg-[#A58342] text-white font-bold text-sm tracking-wide shadow-md shadow-[#B89550]/20 hover:shadow-lg transition-all transform active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>{isBn ? "রেজিস্ট্রেশন জমা দেওয়া হচ্ছে..." : "Submitting Registration..."}</span>
                </>
              ) : (
                <>
                  <span>
                    {isBn
                      ? `${role === "teacher" ? "শিক্ষক" : "শিক্ষার্থী"} হিসেবে রেজিস্টার করুন`
                      : `Register as ${role === "teacher" ? "Teacher" : "Student"}`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link to Login */}
          <div className="pt-4 border-t border-[#E5DFD3] text-center text-xs text-[#595959]">
            {isBn ? "ইতিমধ্যে অ্যাকাউন্ট আছে? " : "Already registered? "}
            <Link
              href="/portal/login"
              className="font-bold text-[#B89550] hover:underline"
            >
              {isBn ? "আপনার অ্যাকাউন্টে সাইন ইন করুন" : "Sign In to Your Account"}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
