"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  GraduationCap,
  BookOpen,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function MemberLoginPage() {
  const router = useRouter();
  const { isBn } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data?.error ||
            (isBn
              ? "লগইন ব্যর্থ হয়েছে। আপনার ইমেইল বা পাসওয়ার্ড পুনরায় যাচাই করুন।"
              : "Login failed. Please check your credentials.")
        );
        setIsLoading(false);
        return;
      }

      router.refresh();
      router.push("/portal");
    } catch (err) {
      setError(
        err?.message ||
          (isBn
            ? "একটি অপ্রত্যাশিত সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
            : "An unexpected error occurred. Please try again.")
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] text-[#252525] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full space-y-6">
        
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
            {isBn ? "মেম্বার পোর্টাল সাইন ইন" : "Member Portal Sign In"}
          </h1>
          <p className="text-sm text-[#595959]">
            {isBn
              ? "আপনার শিক্ষার্থী বা শিক্ষক প্রোফাইল ও ডিজিটাল আইডি কার্ডে প্রবেশ করুন।"
              : "Access your Student or Teacher profile and verified ID card."}
          </p>
        </div>

        {/* Card Container */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel relative overflow-hidden shadow-xl space-y-6">
          <div className="glass-specular-top" />
          
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#595959] mb-1.5">
                {isBn ? "ইমেইল ঠিকানা" : "Email Address"}
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
                {isBn ? "পাসওয়ার্ড" : "Password"}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3] text-sm text-[#252525] placeholder-[#8C827A] focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 btn-gold !py-3.5 !text-sm shadow-md shadow-[#B89550]/25 hover:shadow-xl hover:shadow-[#B89550]/35 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <div className="absolute top-0 inset-x-0 h-px bg-white/40 pointer-events-none" />
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>{isBn ? "প্রবেশ করা হচ্ছে..." : "Signing In..."}</span>
                </>
              ) : (
                <>
                  <span>{isBn ? "পোর্টালে সাইন ইন করুন" : "Sign In to Portal"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Seed demo accounts helper */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3] text-xs text-[#595959] space-y-1.5">
            <div className="font-bold text-[#252525] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B89550]" />
              <span>{isBn ? "ডেমো লগইন অ্যাকাউন্টসমূহ:" : "Sample Demo Logins:"}</span>
            </div>
            <div className="flex flex-col gap-1 text-[11px] font-mono">
              <div>{isBn ? "শিক্ষক:" : "Teacher:"} <strong className="text-[#252525]">teacher@alhidayahcenter.org</strong> (pass: teacher123)</div>
              <div>{isBn ? "শিক্ষার্থী:" : "Student:"} <strong className="text-[#252525]">student@alhidayahcenter.org</strong> (pass: student123)</div>
            </div>
          </div>

          {/* Footer Register Link */}
          <div className="pt-4 border-t border-[#E5DFD3] text-center text-xs text-[#595959]">
            {isBn ? "এখনও কোনো অ্যাকাউন্ট নেই? " : "Don't have an account yet? "}
            <Link
              href="/portal/register"
              className="font-bold text-[#B89550] hover:underline"
            >
              {isBn ? "শিক্ষার্থী বা শিক্ষক হিসেবে রেজিস্টার করুন" : "Register as Student or Teacher"}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
