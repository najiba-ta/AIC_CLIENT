"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  GraduationCap,
  BookOpen,
  User,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  Clock,
  LogOut,
  Loader2,
  IdCard,
  Sparkles,
  XCircle,
  FileText,
  ArrowRight,
  Briefcase,
  RotateCcw,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function MemberPortalPage() {
  const router = useRouter();
  const { isBn } = useLanguage();
  const [user, setUser] = useState(null);
  const [teacherApp, setTeacherApp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (res.ok && data?.user) {
          setUser(data.user);

          if (data.user.role === "teacher") {
            try {
              const tRes = await fetch("/api/teacher-applications/my-application");
              const tData = await tRes.json();
              if (tRes.ok && tData?.hasApplication && tData.application) {
                setTeacherApp(tData);
              }
            } catch (tErr) {
              console.warn("[Teacher App Load Warning]", tErr);
            }
          }
        } else {
          router.replace("/portal/login");
        }
      } catch (err) {
        console.error("[Profile Fetch Error]", err);
        router.replace("/portal/login");
      } finally {
        setIsLoading(false);
      }
    }
    loadProfile();
  }, [router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    } finally {
      router.refresh();
      router.replace("/");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F2] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#B89550]" />
          <p className="text-sm font-medium text-[#595959]">Loading your profile from server...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isApproved = user.status === "approved" || user.isVerified === true;
  const isPending = user.status === "pending" || (!isApproved && user.status !== "rejected");
  const isRejected = user.status === "rejected";

  const memberId = user.memberId || user.serialId;
  const profileImg =
    user.profileImage ||
    user.profilePicture ||
    user.avatarUrl ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80";

  const programOrSubject =
    user.subject || user.classLevel || user.department || (user.role === "teacher" ? "Faculty Department" : "Enrolled Student");

  return (
    <div className="min-h-screen bg-[#FAF8F2] text-[#252525] py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl glass-panel relative overflow-hidden shadow-sm">
          <div className="glass-specular-top" />
          <div className="flex items-center gap-3.5">
            <Link href="/" className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center border border-[#E5DFD3] shrink-0 group-hover:scale-105 transition-all">
              <Image
                src="/images/logo.png"
                alt="Al Hidayah Islamic Center Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-[#252525]">
                  {isBn ? "মেম্বার পোর্টাল" : "Member Portal"}
                </h1>
                <span className="px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#B89550] bg-[#FAF8F2] border border-[#B89550]/30 rounded-full">
                  {user.role === "teacher" ? (isBn ? "শিক্ষক" : "Teacher") : (isBn ? "শিক্ষার্থী" : "Student")}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#595959]">
                {isBn
                  ? "আল হিদায়াহ ইসলামিক সেন্টার — শিক্ষার্থী ও শিক্ষক পরিচয়পত্র"
                  : "Al Hidayah Islamic Center — Official Student & Teacher Identity"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[#595959] hover:text-red-700 bg-[#FAF8F2] hover:bg-red-50 border border-[#E5DFD3] hover:border-red-200 rounded-xl transition-all cursor-pointer disabled:opacity-50 active:scale-95"
            >
              <LogOut className="w-4 h-4" />
              <span>
                {isLoggingOut
                  ? (isBn ? "বের হওয়া হচ্ছে..." : "Signing Out...")
                  : (isBn ? "লগআউট" : "Sign Out")}
              </span>
            </button>
          </div>
        </div>

        {/* Student Admission Form: Action Required Banner if not submitted */}
        {user.role === "student" &&
          !isApproved &&
          !isRejected &&
          (!user.admissionForm || user.admissionStatus === "not_submitted") && (
            <div className="p-5 sm:p-6 rounded-3xl glass-card border-2 border-[#B89550]/40 text-[#252525] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 font-bold text-base text-[#252525]">
                  <FileText className="w-5 h-5 text-[#B89550] shrink-0" />
                  <span>
                    {isBn
                      ? "ভর্তি ফরম পূরণ আবশ্যক"
                      : "Action Required: Complete Student Admission Form"}
                  </span>
                </div>
                <Link
                  href="/portal/admission"
                  className="btn-gold inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-xs shrink-0 cursor-pointer"
                >
                  <span>{isBn ? "ভর্তি ফরম পূরণ করুন" : "Complete Admission Form"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                {isBn
                  ? "আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে। অনলাইন কুরআন ও ইসলামিক স্টাডিজ কোর্সে তালিকাভুক্তি এবং শিক্ষার্থী আইডি নিশ্চিত করতে ভর্তি ফরমটি সম্পন্ন করুন।"
                  : "Your account is created. To finalize your enrollment and generate your official Student ID, please complete the Online Quran & Islamic Studies Admission Form."}
              </p>
            </div>
          )}

        {/* Teacher Application: Action Required Banner if not submitted */}
        {user.role === "teacher" &&
          !isApproved &&
          !isRejected &&
          !teacherApp?.hasApplication && (
            <div className="p-5 sm:p-6 rounded-3xl bg-amber-500/10 border-2 border-[#B89550]/40 text-[#252525] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 font-bold text-base text-[#252525]">
                  <Briefcase className="w-5 h-5 text-[#B89550] shrink-0" />
                  <span>
                    {isBn
                      ? "শিক্ষক নিয়োগ আবেদন ফরম পূরণ আবশ্যক"
                      : "Action Required: Complete Teacher Employment Application"}
                  </span>
                </div>
                <Link
                  href="/portal/teacher-application"
                  className="btn-gold inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-xs shrink-0 cursor-pointer"
                >
                  <span>{isBn ? "শিক্ষক আবেদন ফরম পূরণ করুন" : "Complete Teacher Application"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                {isBn
                  ? "আপনার শিক্ষক অ্যাকাউন্ট তৈরি হয়েছে। আল হিদায়াহ ইসলামিক সেন্টারে অনুমোদিত শিক্ষক হিসেবে গণ্য হতে অফিসিয়াল শিক্ষক নিয়োগ আবেদন ফরমটি সম্পূর্ণ করা আবশ্যক।"
                  : "The teacher must complete the Teacher Employment Application before being considered an approved teacher. Please complete the official application form to proceed with your verification."}
              </p>
            </div>
          )}

        {/* Teacher Application Status: Pending Review Banner */}
        {user.role === "teacher" &&
          teacherApp?.hasApplication &&
          teacherApp.application?.status === "pending" && (
            <div className="p-5 sm:p-6 rounded-3xl bg-amber-50/90 border border-amber-200 text-amber-900 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 font-bold text-base text-amber-950">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 animate-pulse" />
                  <span>
                    {isBn
                      ? "আপনার শিক্ষক আবেদনটি বর্তমানে পর্যালোচনাধীন রয়েছে"
                      : "Your teacher application is currently under review."}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-full bg-amber-100 text-amber-900 border border-amber-300 w-fit">
                    {isBn ? "পর্যালোচনাধীন" : "Under Review"}
                  </span>
                  <Link
                    href="/portal/teacher-application"
                    className="text-xs font-bold text-[#B89550] hover:underline"
                  >
                    {isBn ? "আবেদন দেখুন" : "View Application"}
                  </Link>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-amber-800/90 leading-relaxed">
                {isBn
                  ? "আপনার জমাকৃত শিক্ষক নিয়োগ আবেদনপত্রটি প্রশাসন কর্তৃক পর্যালোচনার অধীন রয়েছে। অনুমোদন সাপেক্ষে আপনার অফিসিয়াল শিক্ষক সিরিয়াল আইডি (যেমন: AIC-TEA-001) তৈরি করা হবে।"
                  : "Your official Teacher Employment Application has been received. Once accepted by the administration, your sequential Teacher ID (e.g. AIC-TEA-001) will be generated by the server."}
              </p>
            </div>
          )}

        {/* Teacher Application Status: Rejected Banner with Re-apply */}
        {user.role === "teacher" &&
          teacherApp?.hasApplication &&
          teacherApp.application?.status === "rejected" && (
            <div className="p-5 sm:p-6 rounded-3xl bg-red-50/90 border border-red-200 text-red-900 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 font-bold text-base text-red-950">
                  <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>
                    {isBn
                      ? "শিক্ষক নিয়োগ আবেদন বাতিলকৃত"
                      : "Teacher Application Status: Rejected"}
                  </span>
                </div>
                <Link
                  href="/portal/teacher-application"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#B89550] hover:bg-[#A58342] shadow-xs transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isBn ? "পুনরায় আবেদন করুন" : "Re-apply Now"}</span>
                </Link>
              </div>
              <p className="text-xs sm:text-sm text-red-800/90 leading-relaxed">
                <strong>{isBn ? "প্রশাসনের কারণ: " : "Rejection Reason: "}</strong>
                {teacherApp.application.rejectionReason ||
                  (isBn ? "প্রয়োজনীয় শর্তাবলি পূরণ না হওয়ায় আবেদনটি বাতিল করা হয়েছে।" : "Application criteria were not met.")}
              </p>
            </div>
          )}

        {/* Student: Pending Verification / Admission Review Notice Banner */}
        {user.role === "student" && isPending && user.admissionForm && user.admissionStatus !== "not_submitted" && (
          <div className="p-5 sm:p-6 rounded-3xl bg-amber-50/90 border border-amber-200 text-amber-900 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 font-bold text-base text-amber-950">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 animate-pulse" />
                <span>
                  {isBn
                    ? "ভর্তি আবেদন জমা হয়েছে / অ্যাডমিন পর্যালোচনাধীন"
                    : "Application Submitted / Pending Admin Review"}
                </span>
              </div>
              <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-full bg-amber-100 text-amber-900 border border-amber-300 w-fit">
                {isBn ? "ভর্তি পর্যালোচনাধীন" : "Pending Admission"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-800/90 leading-relaxed">
              {isBn ? (
                <>
                  আপনার অনলাইন কুরআন ও ইসলামিক স্টাডিজ ভর্তি আবেদন সেন্টারে সংরক্ষিত হয়েছে। একজন প্রশাসনিক কর্মকর্তা আবেদনটি পর্যালোচনা করে আপনার অফিসিয়াল শিক্ষার্থী আইডি (যেমন:{" "}
                  <span className="font-mono font-bold text-[#B89550]">AIC-STU-001</span>
                  ) বরাদ্দ করবেন।
                </>
              ) : (
                <>
                  Your Online Quran & Islamic Studies admission application is currently under review by our administration. Once accepted by an administrator, your official sequential Student ID (e.g. <span className="font-mono font-bold text-[#B89550]">AIC-STU-001</span>) will be generated by the server.
                </>
              )}
            </p>
          </div>
        )}

        {/* Approved Status Banner */}
        {isApproved && (
          <div className="p-5 sm:p-6 rounded-3xl bg-emerald-50/90 border border-emerald-200 text-emerald-900 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 font-bold text-base text-emerald-950">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  {user.role === "student"
                    ? isBn
                      ? "ভর্তি আবেদন অনুমোদিত ও সক্রিয়"
                      : "Admission Status: Approved & Enrolled"
                    : isBn
                    ? "শিক্ষক অ্যাকাউন্ট অনুমোদিত ও সক্রিয়"
                    : "Teacher Account Approved & Verified"}
                </span>
              </div>
              <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 w-fit">
                {isBn ? "অনুমোদিত" : "Approved"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-800/90 leading-relaxed">
              {isBn
                ? `আলহামদুলিল্লাহ! আপনার আবেদনটি প্রশাসন কর্তৃক সফলভাবে অনুমোদিত হয়েছে। আপনার বরাদ্দকৃত সিরিয়াল আইডি: ${memberId || "নির্ধারিত"}`
                : `Alhamdulillah! Your application has been approved by the administration. Your assigned Member ID is: ${memberId || "Assigned"}`}
            </p>
          </div>
        )}

        {/* User Account Level Rejected Status Banner (for non-teachers or fallback) */}
        {isRejected && (!teacherApp?.hasApplication || teacherApp.application?.status !== "rejected") && (
          <div className="p-5 sm:p-6 rounded-3xl bg-red-50/90 border border-red-200 text-red-900 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 font-bold text-base text-red-950">
                <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>
                  {user.role === "student"
                    ? isBn
                      ? "ভর্তি আবেদনের অবস্থা: বাতিলকৃত"
                      : "Admission Status: Rejected"
                    : isBn
                    ? "আবেদনের অবস্থা: বাতিলকৃত"
                    : "Application Status: Rejected"}
                </span>
              </div>
              <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-full bg-red-100 text-red-800 border border-red-300 w-fit">
                {isBn ? "বাতিলকৃত" : "Rejected"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-red-800/90 leading-relaxed">
              {user.rejectionReason ||
                (isBn
                  ? "আপনার আবেদনটি পর্যালোচনার পর প্রদত্ত তথ্যের ঘাটতির কারণে নিশ্চিত করা সম্ভব হয়নি। সহায়তার জন্য প্রশাসন দপ্তরে যোগাযোগ করুন।"
                  : "Your application was reviewed and could not be verified with the provided information. Please contact the center administration for further assistance.")}
            </p>
          </div>
        )}

        {/* Official Member ID Card & Profile Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Official ID Card with Profile Picture & ID Directly Below */}
          <div className="md:col-span-5 w-full">
            <div className="relative rounded-3xl glass-panel border border-white/85 p-6 shadow-xl flex flex-col items-center text-center overflow-hidden">
              <div className="glass-specular-top" />
              
              {/* Islamic Pattern Accent Header on ID Card */}
              <div className="w-full flex items-center justify-between pb-4 mb-4 border-b border-stone-200/60">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-[#B89550]/30">
                    <Image
                      src="/images/logo.png"
                      alt="Logo"
                      width={28}
                      height={28}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-brand text-xs font-bold text-[#252525] tracking-wide">
                    {isBn ? "আল হিদায়াহ সেন্টার" : "Al Hidayah Center"}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 border border-[#B89550]/30 text-[#B89550]">
                  {user.role === "teacher" ? (isBn ? "শিক্ষক আইডি" : "Teacher ID") : (isBn ? "শিক্ষার্থী আইডি" : "Student ID")}
                </span>
              </div>

              {/* Profile Picture */}
              <div className="relative">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-3 border-[#B89550] shadow-md shadow-stone-300 bg-[#FAF8F2]">
                  <Image
                    src={profileImg}
                    alt={user.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Verified Shield Overlay */}
                {isApproved && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#B89550] text-white flex items-center justify-center border-2 border-white shadow-md">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}
              </div>

              {/* OFFICIAL MEMBER ID DIRECTLY BELOW PROFILE PICTURE */}
              <div className="mt-4 w-full flex flex-col items-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C827A]">
                  {isBn ? "অফিসিয়াল মেম্বার সিরিয়াল আইডি" : "Official Member Serial ID"}
                </span>

                {isApproved && memberId ? (
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/90 border-2 border-[#B89550] shadow-xs">
                    <Sparkles className="w-4 h-4 text-[#B89550]" />
                    <span className="font-mono text-base sm:text-lg font-black tracking-wider text-[#252525]">
                      {memberId}
                    </span>
                  </div>
                ) : isRejected ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs font-semibold">
                    <XCircle className="w-3.5 h-3.5 text-red-600" />
                    <span>{isBn ? "বাতিলকৃত" : "Rejected"}</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{isBn ? "অনুমোদনের অপেক্ষায়" : "Pending Approval"}</span>
                  </div>
                )}
              </div>

              {/* Name & Role */}
              <div className="mt-4 space-y-1 w-full">
                <h3 className="text-lg font-bold text-[#252525] truncate">
                  {user.name}
                </h3>
                <p className="text-xs text-[#595959] font-medium">
                  {programOrSubject}
                </p>
              </div>

              {/* Card Footer Badge */}
              <div className="mt-5 pt-3 border-t border-stone-200/60 w-full flex items-center justify-between text-[11px] text-[#8C827A]">
                <span>{isBn ? "অবস্থা:" : "Status:"}</span>
                <span className={`font-bold uppercase tracking-wider ${isApproved ? "text-[#B89550]" : isRejected ? "text-red-700" : "text-amber-700"}`}>
                  {user.status === "approved"
                    ? (isBn ? "অনুমোদিত" : "Approved")
                    : user.status === "rejected"
                    ? (isBn ? "বাতিলকৃত" : "Rejected")
                    : (isBn ? "পর্যালোচনাধীন" : "Pending")}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Member Information */}
          <div className="md:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel relative overflow-hidden space-y-6">
              <div className="glass-specular-top" />
              <div className="flex items-center justify-between border-b border-stone-200/60 pb-4">
                <h2 className="text-lg font-bold text-[#252525] flex items-center gap-2">
                  <User className="w-5 h-5 text-[#B89550]" />
                  <span>{isBn ? "প্রোফাইল বিবরণ" : "Profile Information"}</span>
                </h2>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isApproved
                    ? "bg-white/90 text-[#B89550] border border-[#B89550]/40 shadow-2xs"
                    : isRejected
                    ? "bg-red-50 text-red-800 border border-red-200"
                    : "bg-amber-50 text-amber-800 border border-amber-200"
                }`}>
                  {isApproved ? <CheckCircle2 className="w-3.5 h-3.5" /> : isRejected ? <XCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                  <span>
                    {isApproved
                      ? (isBn ? "যাচাইকৃত অ্যাকাউন্ট" : "Verified Account")
                      : isRejected
                      ? (isBn ? "বাতিলকৃত" : "Rejected")
                      : (isBn ? "যাচাইকরণ বাকি" : "Pending Verification")}
                  </span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C827A] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#B89550]" /> {isBn ? "পূর্ণ নাম" : "Full Name"}
                  </span>
                  <p className="font-semibold text-[#252525] text-base">{user.name}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C827A] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#B89550]" /> {isBn ? "ইমেইল ঠিকানা" : "Email Address"}
                  </span>
                  <p className="font-semibold text-[#252525] truncate">{user.email}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C827A] flex items-center gap-1.5">
                    {user.role === "teacher" ? <BookOpen className="w-3.5 h-3.5 text-[#B89550]" /> : <GraduationCap className="w-3.5 h-3.5 text-[#B89550]" />}
                    {isBn ? "অ্যাকাউন্টের ধরন" : "Account Type"}
                  </span>
                  <p className="font-semibold text-[#252525] capitalize">
                    {user.role === "teacher" ? (isBn ? "শিক্ষক" : "Teacher") : (isBn ? "শিক্ষার্থী" : "Student")}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C827A] flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#B89550]" />
                    {user.role === "teacher"
                      ? (isBn ? "পাঠদানের বিষয়" : "Teaching Subject")
                      : (isBn ? "কোর্স / প্রোগ্রাম" : "Program / Course")}
                  </span>
                  <p className="font-semibold text-[#252525]">{programOrSubject}</p>
                </div>

                {user.role === "student" && user.guardianName && (
                  <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C827A] flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#B89550]" /> {isBn ? "অভিভাবকের নাম" : "Guardian Name"}
                    </span>
                    <p className="font-semibold text-[#252525]">{user.guardianName}</p>
                  </div>
                )}

                {user.role === "teacher" && user.qualification && (
                  <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C827A] flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#B89550]" /> {isBn ? "শিক্ষাগত যোগ্যতা" : "Academic Qualification"}
                    </span>
                    <p className="font-semibold text-[#252525]">{user.qualification}</p>
                  </div>
                )}

                <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C827A] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#B89550]" /> {isBn ? "ফোন নম্বর" : "Phone Number"}
                  </span>
                  <p className="font-semibold text-[#252525]">{user.phone || user.guardianPhone || (isBn ? "প্রযোজ্য নয়" : "Not specified")}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C827A] flex items-center gap-1.5">
                    <IdCard className="w-3.5 h-3.5 text-[#B89550]" /> {isBn ? "অফিসিয়াল সদস্য আইডি" : "Official Member ID"}
                  </span>
                  <p className="font-mono font-bold text-[#B89550]">
                    {memberId || (isBn ? "প্রশাসন কর্তৃক অনুমোদনের অপেক্ষায়" : "Pending administrator approval")}
                  </p>
                </div>
              </div>

              {/* Submitted Admission Application Details for Students */}
              {user.role === "student" && user.admissionForm && (
                <div className="pt-4 border-t border-stone-200/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#252525] flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#B89550]" />
                      <span>
                        {isBn
                          ? "অনলাইন কুরআন ও ইসলামিক স্টাডিজ ভর্তি আবেদন বিবরণ"
                          : "Online Quran & Islamic Studies Admission Details"}
                      </span>
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-[#B89550]/30 text-[#B89550]">
                      {isApproved
                        ? isBn ? "অনুমোদিত" : "Approved"
                        : isRejected
                        ? isBn ? "বাতিলকৃত" : "Rejected"
                        : isBn ? "পর্যালোচনাধীন" : "Under Review"}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] text-xs space-y-3.5">
                    {/* Student & Class Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-3 border-b border-[#E5DFD3]/80">
                      <div>
                        <span className="text-[#8C827A] block text-[10px] font-bold uppercase tracking-wider">
                          {isBn ? "শিক্ষার্থীর বয়স ও লিঙ্গ" : "Age & Gender"}
                        </span>
                        <span className="font-semibold text-[#252525]">
                          {user.admissionForm.studentInfo?.age ? `${user.admissionForm.studentInfo.age} yrs` : "N/A"} • {user.admissionForm.studentInfo?.gender || "N/A"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#8C827A] block text-[10px] font-bold uppercase tracking-wider">
                          {isBn ? "ক্লাসের ধরন" : "Class Type"}
                        </span>
                        <span className="font-semibold text-[#252525]">
                          {user.admissionForm.programSelection?.classType || "One-on-One"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#8C827A] block text-[10px] font-bold uppercase tracking-wider">
                          {isBn ? "কুরআনিক স্তর" : "Current Quran Level"}
                        </span>
                        <span className="font-semibold text-[#252525]">
                          {user.admissionForm.programSelection?.currentQuranLevel || "Beginner"}
                        </span>
                      </div>
                    </div>

                    {/* Selected Programs & Subjects */}
                    <div className="space-y-1.5 pb-3 border-b border-[#E5DFD3]/80">
                      <span className="text-[#8C827A] block text-[10px] font-bold uppercase tracking-wider">
                        {isBn ? "নির্বাচিত কোর্স ও বিষয়সমূহ" : "Selected Course Tracks & Subjects"}
                      </span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {/* Quran Reading */}
                        {user.admissionForm.programSelection?.quranReading?.qaida && (
                          <span className="px-2.5 py-0.5 rounded-lg bg-white border border-[#E5DFD3] text-[#252525] font-medium text-[11px]">
                            Qaida
                          </span>
                        )}
                        {user.admissionForm.programSelection?.quranReading?.fluentReading && (
                          <span className="px-2.5 py-0.5 rounded-lg bg-white border border-[#E5DFD3] text-[#252525] font-medium text-[11px]">
                            Fluent Reading (Nazra)
                          </span>
                        )}
                        {user.admissionForm.programSelection?.quranReading?.tajweed && (
                          <span className="px-2.5 py-0.5 rounded-lg bg-white border border-[#E5DFD3] text-[#252525] font-medium text-[11px]">
                            Tajweed
                          </span>
                        )}
                        {user.admissionForm.programSelection?.quranReading?.correctPronunciation && (
                          <span className="px-2.5 py-0.5 rounded-lg bg-white border border-[#E5DFD3] text-[#252525] font-medium text-[11px]">
                            Correct Pronunciation
                          </span>
                        )}
                        {/* Hifzul Quran */}
                        {user.admissionForm.programSelection?.hifzulQuran?.memorization && (
                          <span className="px-2.5 py-0.5 rounded-lg bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] font-semibold text-[11px]">
                            Hifz Memorization
                          </span>
                        )}
                        {user.admissionForm.programSelection?.hifzulQuran?.revision && (
                          <span className="px-2.5 py-0.5 rounded-lg bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] font-semibold text-[11px]">
                            Hifz Revision
                          </span>
                        )}
                        {user.admissionForm.programSelection?.hifzulQuran?.stepByStepGuidance && (
                          <span className="px-2.5 py-0.5 rounded-lg bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] font-semibold text-[11px]">
                            Step-by-Step Guidance
                          </span>
                        )}
                        {/* Islamic Studies */}
                        {user.admissionForm.programSelection?.islamicStudies?.aqeedah && (
                          <span className="px-2.5 py-0.5 rounded-lg bg-white border border-[#E5DFD3] text-[#252525] font-medium text-[11px]">
                            Aqeedah
                          </span>
                        )}
                        {user.admissionForm.programSelection?.islamicStudies?.fiqh && (
                          <span className="px-2.5 py-0.5 rounded-lg bg-white border border-[#E5DFD3] text-[#252525] font-medium text-[11px]">
                            Fiqh
                          </span>
                        )}
                        {user.admissionForm.programSelection?.islamicStudies?.seerah && (
                          <span className="px-2.5 py-0.5 rounded-lg bg-white border border-[#E5DFD3] text-[#252525] font-medium text-[11px]">
                            Seerah
                          </span>
                        )}
                        {user.admissionForm.programSelection?.islamicStudies?.islamicHistory && (
                          <span className="px-2.5 py-0.5 rounded-lg bg-white border border-[#E5DFD3] text-[#252525] font-medium text-[11px]">
                            Islamic History
                          </span>
                        )}
                        {user.admissionForm.programSelection?.islamicStudies?.mannersCharacter && (
                          <span className="px-2.5 py-0.5 rounded-lg bg-white border border-[#E5DFD3] text-[#252525] font-medium text-[11px]">
                            Manners & Character
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Schedule & Timing */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-[#E5DFD3]/80">
                      <div>
                        <span className="text-[#8C827A] block text-[10px] font-bold uppercase tracking-wider">
                          {isBn ? "পছন্দের দিনসমূহ" : "Preferred Days"}
                        </span>
                        <span className="font-semibold text-[#252525]">
                          {user.admissionForm.schedulePreference?.preferredDays?.join(", ") || "Mon, Wed, Fri"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#8C827A] block text-[10px] font-bold uppercase tracking-wider">
                          {isBn ? "পছন্দের সময়" : "Preferred Time"}
                        </span>
                        <span className="font-semibold text-[#252525]">
                          {user.admissionForm.schedulePreference?.preferredTime || "N/A"}
                        </span>
                      </div>
                    </div>

                    {/* Parent Signature & Emergency Contact */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                      <div>
                        <span className="text-[#8C827A] block text-[10px] font-bold uppercase tracking-wider">
                          {isBn ? "জরুরি যোগাযোগ" : "Emergency Contact"}
                        </span>
                        <span className="text-[#252525]">
                          {user.admissionForm.parentInfo?.emergencyContact || "N/A"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#8C827A] block text-[10px] font-bold uppercase tracking-wider">
                          {isBn ? "অভিভাবকের স্বাক্ষর ও তারিখ" : "Parent Signature & Date"}
                        </span>
                        <span className="text-[#252525] italic font-serif">
                          {user.admissionForm.agreement?.signature || "Digital Signature"} ({user.admissionForm.agreement?.date || "Logged"})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Teacher Employment Application Status Card */}
              {user.role === "teacher" && (
                <div className="pt-2">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E5DFD3]">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#B89550]" />
                      <h3 className="font-bold text-[#252525] text-sm">
                        {isBn ? "শিক্ষক নিয়োগ আবেদন" : "Teacher Employment Application"}
                      </h3>
                    </div>
                    <Link
                      href="/portal/teacher-application"
                      className="text-xs font-bold text-[#B89550] hover:underline"
                    >
                      {teacherApp?.hasApplication
                        ? isBn ? "সম্পূর্ণ আবেদন দেখুন" : "View Application"
                        : isBn ? "আবেদন জমা দিন" : "Submit Application"}
                    </Link>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] text-xs space-y-3">
                    {teacherApp?.hasApplication && teacherApp.application ? (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2 border-b border-[#E5DFD3]/80">
                          <div>
                            <span className="text-[#8C827A] block text-[10px] font-bold uppercase tracking-wider">
                              {isBn ? "আবেদিত পদ" : "Applied Position"}
                            </span>
                            <span className="font-semibold text-[#252525]">
                              {teacherApp.application.position || "Teacher"}
                            </span>
                          </div>
                          <div>
                            <span className="text-[#8C827A] block text-[10px] font-bold uppercase tracking-wider">
                              {isBn ? "কাজের ধরন" : "Employment Type"}
                            </span>
                            <span className="font-semibold text-[#252525]">
                              {teacherApp.application.employmentType || "Part-time"}
                            </span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[#8C827A] block text-[10px] font-bold uppercase tracking-wider mb-1">
                            {isBn ? "শিক্ষাদানের বিষয়সমূহ" : "Teaching Subjects"}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {teacherApp.application.subjects?.map((s, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-[#E5DFD3] text-[11px] font-medium text-[#252525]">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#E5DFD3]/80 flex items-center justify-between">
                          <span className="text-[11px] text-[#8C827A]">
                            Status: <strong className="uppercase text-[#252525]">{teacherApp.application.status}</strong>
                          </span>
                          <Link
                            href="/portal/teacher-application"
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#B89550] hover:underline"
                          >
                            <span>{isBn ? "বিস্তারিত দেখুন" : "View Full Details"}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="py-2 text-center space-y-2">
                        <p className="text-[#595959] text-xs">
                          {isBn
                            ? "আপনি এখনো শিক্ষক নিয়োগ আবেদন সম্পন্ন করেননি।"
                            : "You have not submitted the Teacher Employment Application yet."}
                        </p>
                        <Link
                          href="/portal/teacher-application"
                          className="btn-gold inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                        >
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>{isBn ? "আবেদন ফরম পূরণ করুন" : "Fill Application Form"}</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Quick Navigation Links */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {user.role === "teacher" && (
                  <Link
                    href="/portal/teacher-application"
                    className="btn-glass px-5 py-2.5 rounded-xl border border-[#B89550]/40 text-xs sm:text-sm font-bold text-[#B89550] flex items-center gap-1.5"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>{isBn ? "শিক্ষক নিয়োগ আবেদন" : "Teacher Application"}</span>
                  </Link>
                )}
                <Link
                  href="/programs"
                  className="btn-glass px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#252525]"
                >
                  {isBn ? "প্রোগ্রামসমূহ দেখুন" : "View Programs"}
                </Link>
                <Link
                  href="/prayer-times"
                  className="btn-glass px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#252525]"
                >
                  {isBn ? "নামাজের সময়সূচি" : "Prayer Times"}
                </Link>
                <Link
                  href="/contact"
                  className="btn-glass px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#252525]"
                >
                  {isBn ? "প্রশাসনে যোগাযোগ" : "Contact Administration"}
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
