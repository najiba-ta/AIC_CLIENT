"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  BookOpen,
  GraduationCap,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ShieldCheck,
  FileText,
  Lock,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function StudentAdmissionPage() {
  const router = useRouter();
  const { isBn } = useLanguage();

  const [currentUser, setCurrentUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Form State initialized with all 6 required sections
  const [formData, setFormData] = useState({
    // 1. Student Information
    studentInfo: {
      fullName: "",
      dateOfBirth: "",
      age: "",
      gender: "Boy", // "Boy" | "Girl"
      homeAddress: "",
      cityStateZip: "",
    },
    // 2. Parent / Guardian Information
    parentInfo: {
      guardianName: "",
      phoneWhatsApp: "",
      email: "",
      emergencyContact: "",
    },
    // 3. Program Selection
    programSelection: {
      quranReading: {
        qaida: false,
        fluentReading: false,
        tajweed: false,
        correctPronunciation: false,
      },
      hifzulQuran: {
        memorization: false,
        revision: false,
        stepByStepGuidance: false,
      },
      islamicStudies: {
        aqeedah: false,
        fiqh: false,
        seerah: false,
        islamicHistory: false,
        mannersCharacter: false,
      },
      classType: "One-on-One", // "One-on-One" | "Group Class" | "No Preference"
      currentQuranLevel: "",
    },
    // 4. Schedule Preference
    schedulePreference: {
      preferredDays: ["Monday", "Wednesday", "Friday"],
      preferredTime: "5:00 PM – 6:00 PM EST",
      alternativeTime: "6:30 PM – 7:30 PM EST",
    },
    // 5. Learning Information
    learningInfo: {
      previousExperience: "",
      teacherInstitute: "",
      learningNeedsNotes: "",
    },
    // 6. Parent / Guardian Agreement
    agreement: {
      hasAgreed: false,
      signature: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  // Load active student profile
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (!res.ok || !data?.user) {
          router.replace("/portal/login?redirect=/portal/admission");
          return;
        }

        const user = data.user;
        setCurrentUser(user);

        // Pre-fill student & guardian info from registration account
        setFormData((prev) => ({
          ...prev,
          studentInfo: {
            ...prev.studentInfo,
            fullName: user.name || prev.studentInfo.fullName,
            dateOfBirth: user.dateOfBirth
              ? new Date(user.dateOfBirth).toISOString().split("T")[0]
              : prev.studentInfo.dateOfBirth,
            homeAddress: user.address || prev.studentInfo.homeAddress,
          },
          parentInfo: {
            ...prev.parentInfo,
            guardianName: user.guardianName || prev.parentInfo.guardianName,
            phoneWhatsApp: user.guardianPhone || user.phone || prev.parentInfo.phoneWhatsApp,
            email: user.email || prev.parentInfo.email,
          },
        }));

        // Check if admission application is already submitted
        if (user.admissionStatus === "pending" || user.admissionStatus === "approved" || user.status === "approved") {
          setSubmissionSuccess(true);
        }
      } catch (err) {
        console.error("[Admission Check Error]", err);
      } finally {
        setIsInitializing(false);
      }
    }
    loadUser();
  }, [router]);

  // Handle Date of Birth change and auto-calculate Age
  const handleDobChange = (e) => {
    const dobValue = e.target.value;
    let calculatedAge = "";
    if (dobValue) {
      const birthDate = new Date(dobValue);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age >= 0 && age <= 120) {
        calculatedAge = String(age);
      }
    }
    setFormData((prev) => ({
      ...prev,
      studentInfo: {
        ...prev.studentInfo,
        dateOfBirth: dobValue,
        age: calculatedAge || prev.studentInfo.age,
      },
    }));
  };

  const handleCheckboxToggle = (category, field) => {
    setFormData((prev) => ({
      ...prev,
      programSelection: {
        ...prev.programSelection,
        [category]: {
          ...prev.programSelection[category],
          [field]: !prev.programSelection[category][field],
        },
      },
    }));
  };

  const handleDayToggle = (day) => {
    setFormData((prev) => {
      const currentDays = prev.schedulePreference.preferredDays;
      const exists = currentDays.includes(day);
      const updated = exists ? currentDays.filter((d) => d !== day) : [...currentDays, day];
      return {
        ...prev,
        schedulePreference: {
          ...prev.schedulePreference,
          preferredDays: updated,
        },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    // Validation: Agreement
    if (!formData.agreement.hasAgreed) {
      setSubmitError(
        isBn
          ? "অনুগ্রহ করে নিয়ম ও শর্তাবলীর সাথে সম্মতি বক্সে টিক দিন।"
          : "Please check the required agreement checkbox to proceed."
      );
      return;
    }

    // Validation: Signature
    if (!formData.agreement.signature.trim()) {
      setSubmitError(
        isBn
          ? "অভিভাবকের ডিজিটাল স্বাক্ষর প্রদান করা আবশ্যক।"
          : "Parent / Guardian Signature is required."
      );
      return;
    }

    // Validation: Student Name & Phone
    if (!formData.studentInfo.fullName.trim()) {
      setSubmitError(
        isBn ? "শিক্ষার্থীর পূর্ণ নাম আবশ্যক।" : "Student Full Name is required."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(
          data?.error ||
            (isBn
              ? "আবেদনটি জমা দেওয়া সম্ভব হয়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।"
              : "Failed to submit admission application. Please check your information.")
        );
        setIsSubmitting(false);
        return;
      }

      setSubmissionSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("[Admission Submit Error]", err);
      setSubmitError(
        err?.message ||
          (isBn
            ? "একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। পুনরায় চেষ্টা করুন।"
            : "An unexpected error occurred. Please try again.")
      );
      setIsSubmitting(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#FAF8F2] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#B89550]" />
          <p className="text-sm font-medium text-[#595959]">
            {isBn ? "তথ্য লোড হচ্ছে..." : "Loading admission portal..."}
          </p>
        </div>
      </div>
    );
  }

  // SUCCESS / PENDING ADMIN REVIEW VIEW
  if (submissionSuccess) {
    const isApproved =
      currentUser?.status === "approved" ||
      currentUser?.isVerified === true ||
      currentUser?.admissionStatus === "approved";
    const isRejected =
      currentUser?.status === "rejected" ||
      currentUser?.admissionStatus === "rejected";

    return (
      <div className="min-h-screen bg-[#FAF8F2] text-[#252525] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl mx-auto w-full space-y-6">
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
          </div>

          <div className="p-6 sm:p-8 rounded-3xl glass-panel relative overflow-hidden shadow-xl text-center space-y-6">
            <div className="glass-specular-top" />

            {isApproved ? (
              <>
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full inline-block">
                    {isBn ? "ভর্তি অনুমোদিত" : "Admission Approved"}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#252525]">
                    {isBn ? "অভিনন্দন! আপনার ভর্তি সম্পন্ন হয়েছে" : "Congratulations! Admission Approved"}
                  </h1>
                  <p className="text-sm text-[#595959] max-w-md mx-auto">
                    {isBn
                      ? "আপনার অনলাইন কুরআন ও ইসলামিক স্টাডিজ ভর্তি আবেদনটি প্রশাসন কর্তৃক অনুমোদিত হয়েছে।"
                      : "Your Online Quran & Islamic Studies admission application has been officially accepted by the administration."}
                  </p>
                </div>
              </>
            ) : isRejected ? (
              <>
                <div className="w-16 h-16 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto border-2 border-red-300 shadow-sm">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-800 bg-red-50 border border-red-200 rounded-full inline-block">
                    {isBn ? "আবেদন বাতিলকৃত" : "Application Rejected"}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#252525]">
                    {isBn ? "আবেদনের অবস্থা: বাতিলকৃত" : "Application Status: Rejected"}
                  </h1>
                  <p className="text-sm text-red-800 max-w-md mx-auto bg-red-50/80 p-3 rounded-xl border border-red-200">
                    {currentUser?.rejectionReason ||
                      (isBn
                        ? "প্রদত্ত তথ্যের ঘাটতির কারণে আবেদনটি মঞ্জুর করা সম্ভব হয়নি।"
                        : "The application could not be verified with the provided details.")}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto border-2 border-amber-300 shadow-sm">
                  <Clock className="w-8 h-8 text-amber-700 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-50 border border-amber-200 rounded-full inline-block">
                    {isBn ? "পর্যালোচনাধীন" : "Pending Admission"}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#252525]">
                    {isBn ? "আবেদন জমা হয়েছে / অ্যাডমিন পর্যালোচনাধীন" : "Application Submitted / Pending Admin Review"}
                  </h1>
                  <p className="text-sm text-[#595959] max-w-md mx-auto leading-relaxed">
                    {isBn
                      ? "আপনার অনলাইন কুরআন ও ইসলামিক স্টাডিজ ভর্তি ফরমটি সফলভাবে সেন্টারের ডেটাবেসে সংরক্ষিত হয়েছে। একজন প্রশাসনিক কর্মকর্তা আবেদনটি যাচাই করে আপনার অফিসিয়াল শিক্ষার্থী আইডি ও ক্লাস সূচি চূড়ান্ত করবেন।"
                      : "Your Online Quran & Islamic Studies admission form has been received and logged in the system. An administrator will review your application to assign your official Student ID and class schedule."}
                  </p>
                </div>
              </>
            )}

            {/* Application Quick Summary Card */}
            <div className="p-4 rounded-2xl bg-white/80 border border-[#E5DFD3] text-left text-xs space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5DFD3]">
                <span className="font-bold text-[#252525]">
                  {isBn ? "আবেদনকারী শিক্ষার্থী:" : "Student Name:"}
                </span>
                <span className="font-semibold text-[#B89550]">
                  {formData.studentInfo.fullName || currentUser?.name}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#E5DFD3]">
                <span className="font-bold text-[#252525]">
                  {isBn ? "প্যারেন্ট / অভিভাবক:" : "Parent / Guardian:"}
                </span>
                <span className="text-[#595959]">
                  {formData.parentInfo.guardianName || currentUser?.guardianName || "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#E5DFD3]">
                <span className="font-bold text-[#252525]">
                  {isBn ? "ক্লাসের ধরন:" : "Class Type:"}
                </span>
                <span className="text-[#595959]">
                  {formData.programSelection.classType}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#252525]">
                  {isBn ? "বর্তমান অবস্থা:" : "Current Status:"}
                </span>
                <span
                  className={`font-bold px-2 py-0.5 rounded-md ${
                    isApproved
                      ? "bg-emerald-100 text-emerald-800"
                      : isRejected
                      ? "bg-red-100 text-red-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {isApproved
                    ? isBn ? "অনুমোদিত" : "Approved"
                    : isRejected
                    ? isBn ? "বাতিলকৃত" : "Rejected"
                    : isBn ? "পর্যালোচনাধীন" : "Pending Admin Review"}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/portal"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#B89550] hover:bg-[#A58342] shadow-sm transition-all cursor-pointer"
              >
                <span>{isBn ? "মেম্বার পোর্টালে যান" : "Go to Member Portal"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-[#252525] bg-white hover:bg-stone-50 border border-[#E5DFD3] transition-all cursor-pointer"
              >
                <span>{isBn ? "হোমপেজে ফিরে যান" : "Back to Home"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MAIN ADMISSION FORM VIEW
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="min-h-screen bg-[#FAF8F2] text-[#252525] py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-105 transition-all border border-[#E5DFD3]">
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#B89550]/40 text-xs font-semibold text-[#B89550] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isBn ? "ভর্তি ফরম" : "Online Student Admission"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525] tracking-tight">
            {isBn
              ? "অনলাইন কুরআন ও ইসলামিক স্টাডিজ ভর্তি আবেদন ফরম"
              : "Online Quran & Islamic Studies Admission Form"}
          </h1>
          <p className="text-xs sm:text-sm text-[#595959] max-w-2xl mx-auto leading-relaxed">
            {isBn
              ? "নতুন শিক্ষার্থীদের পূর্ণাঙ্গ তথ্য দিয়ে নিচের ফরমটি পূরণ করার জন্য অনুরোধ করা হচ্ছে। আবেদন জমা দেওয়ার পর অ্যাডমিন পর্যালোচনা করে চূড়ান্ত অনুমোদন প্রদান করবেন।"
              : "Please complete the comprehensive admission form below. Once submitted, your application will be placed in Pending Admin Review status."}
          </p>
        </div>

        {/* Global Error Banner */}
        {submitError && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">{isBn ? "আবেদনে সমস্যা দেখা দিয়েছে" : "Submission Error"}</p>
              <p className="mt-0.5">{submitError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* ============================================================== */}
          {/* SECTION 1: STUDENT INFORMATION                                 */}
          {/* ============================================================== */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/85 shadow-lg relative overflow-hidden space-y-6">
            <div className="glass-specular-top" />
            
            <div className="flex items-center gap-3 pb-3 border-b border-[#E5DFD3]">
              <div className="w-9 h-9 rounded-xl bg-[#FAF8F2] border border-[#B89550]/30 text-[#B89550] flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#252525]">
                  {isBn ? "শিক্ষার্থীর তথ্য (Student Information)" : "1. Student Information"}
                </h2>
                <p className="text-xs text-[#595959]">
                  {isBn ? "শিক্ষার্থীর ব্যক্তিগত ও ঠিকানাসংক্রান্ত বিবরণ" : "Personal details and home address"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {/* Full Name */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-[#252525] block">
                  {isBn ? "শিক্ষার্থীর পূর্ণ নাম *" : "Student Full Name *"}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.studentInfo.fullName}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        studentInfo: { ...p.studentInfo, fullName: e.target.value },
                      }))
                    }
                    placeholder={isBn ? "যেমন: মোহাম্মদ আবদুল্লাহ" : "e.g. Muhammad Abdullah"}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-[#E5DFD3] focus:outline-none focus:border-[#B89550] text-xs sm:text-sm text-[#252525] shadow-2xs"
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#252525] block">
                  {isBn ? "লিঙ্গ (Gender) *" : "Gender: Boy / Girl *"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({
                        ...p,
                        studentInfo: { ...p.studentInfo, gender: "Boy" },
                      }))
                    }
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      formData.studentInfo.gender === "Boy"
                        ? "bg-[#B89550] text-white border-[#B89550] shadow-xs"
                        : "bg-white text-[#595959] border-[#E5DFD3] hover:border-[#B89550]"
                    }`}
                  >
                    {isBn ? "ছেলে (Boy)" : "Boy"}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({
                        ...p,
                        studentInfo: { ...p.studentInfo, gender: "Girl" },
                      }))
                    }
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      formData.studentInfo.gender === "Girl"
                        ? "bg-[#B89550] text-white border-[#B89550] shadow-xs"
                        : "bg-white text-[#595959] border-[#E5DFD3] hover:border-[#B89550]"
                    }`}
                  >
                    {isBn ? "মেয়ে (Girl)" : "Girl"}
                  </button>
                </div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#252525] block">
                  {isBn ? "জন্ম তারিখ (Date of Birth) *" : "Date of Birth *"}
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-3" />
                  <input
                    type="date"
                    required
                    value={formData.studentInfo.dateOfBirth}
                    onChange={handleDobChange}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-[#E5DFD3] focus:outline-none focus:border-[#B89550] text-xs sm:text-sm text-[#252525] shadow-2xs"
                  />
                </div>
              </div>

              {/* Age */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#252525] block">
                  {isBn ? "বয়স (Age) *" : "Age *"}
                </label>
                <input
                  type="number"
                  required
                  min="3"
                  max="100"
                  value={formData.studentInfo.age}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      studentInfo: { ...p.studentInfo, age: e.target.value },
                    }))
                  }
                  placeholder={isBn ? "যেমন: 10" : "e.g. 10"}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DFD3] focus:outline-none focus:border-[#B89550] text-xs sm:text-sm text-[#252525] shadow-2xs"
                />
              </div>

              {/* City / State / ZIP */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#252525] block">
                  {isBn ? "শহর / রাজ্য / জিপ কোড *" : "City / State / ZIP *"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.studentInfo.cityStateZip}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      studentInfo: { ...p.studentInfo, cityStateZip: e.target.value },
                    }))
                  }
                  placeholder={isBn ? "যেমন: Bronx, NY 10462" : "e.g. Bronx, NY 10462"}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DFD3] focus:outline-none focus:border-[#B89550] text-xs sm:text-sm text-[#252525] shadow-2xs"
                />
              </div>

              {/* Home Address */}
              <div className="sm:col-span-2 lg:col-span-3 space-y-1.5">
                <label className="text-xs font-bold text-[#252525] block">
                  {isBn ? "বাসার ঠিকানা (Home Address) *" : "Home Address *"}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.studentInfo.homeAddress}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        studentInfo: { ...p.studentInfo, homeAddress: e.target.value },
                      }))
                    }
                    placeholder={isBn ? "যেমন: 1234 Starling Ave" : "e.g. 1234 Starling Ave"}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-[#E5DFD3] focus:outline-none focus:border-[#B89550] text-xs sm:text-sm text-[#252525] shadow-2xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 2: PARENT / GUARDIAN INFORMATION                       */}
          {/* ============================================================== */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/85 shadow-lg relative overflow-hidden space-y-6">
            <div className="glass-specular-top" />

            <div className="flex items-center gap-3 pb-3 border-b border-[#E5DFD3]">
              <div className="w-9 h-9 rounded-xl bg-[#FAF8F2] border border-[#B89550]/30 text-[#B89550] flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#252525]">
                  {isBn ? "অভিভাবকের তথ্য (Parent / Guardian Information)" : "2. Parent / Guardian Information"}
                </h2>
                <p className="text-xs text-[#595959]">
                  {isBn ? "যোগাযোগের ফোন ও জরুরি নম্বর" : "Primary and emergency contact details"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Parent Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#252525] block">
                  {isBn ? "প্যারেন্ট / অভিভাবকের নাম *" : "Parent / Guardian Name *"}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.parentInfo.guardianName}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        parentInfo: { ...p.parentInfo, guardianName: e.target.value },
                      }))
                    }
                    placeholder={isBn ? "অভিভাবকের পূর্ণ নাম" : "Parent / Guardian Full Name"}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-[#E5DFD3] focus:outline-none focus:border-[#B89550] text-xs sm:text-sm text-[#252525] shadow-2xs"
                  />
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#252525] block">
                  {isBn ? "ফোন / হোয়াটসঅ্যাপ নম্বর *" : "Phone / WhatsApp *"}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={formData.parentInfo.phoneWhatsApp}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        parentInfo: { ...p.parentInfo, phoneWhatsApp: e.target.value },
                      }))
                    }
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-[#E5DFD3] focus:outline-none focus:border-[#B89550] text-xs sm:text-sm text-[#252525] shadow-2xs"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#252525] block">
                  {isBn ? "ইমেইল ঠিকানা *" : "Email *"}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={formData.parentInfo.email}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        parentInfo: { ...p.parentInfo, email: e.target.value },
                      }))
                    }
                    placeholder="parent@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-[#E5DFD3] focus:outline-none focus:border-[#B89550] text-xs sm:text-sm text-[#252525] shadow-2xs"
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#252525] block">
                  {isBn ? "জরুরি যোগাযোগের নাম ও ফোন নম্বর *" : "Emergency Contact Name & Phone *"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.parentInfo.emergencyContact}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      parentInfo: { ...p.parentInfo, emergencyContact: e.target.value },
                    }))
                  }
                  placeholder={isBn ? "যেমন: আব্দুল্লাহ (মামা) - +1 555-123-4567" : "e.g. Uncle Farhan - +1 555-123-4567"}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DFD3] focus:outline-none focus:border-[#B89550] text-xs sm:text-sm text-[#252525] shadow-2xs"
                />
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 3: PROGRAM SELECTION                                   */}
          {/* ============================================================== */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/85 shadow-lg relative overflow-hidden space-y-6">
            <div className="glass-specular-top" />

            <div className="flex items-center gap-3 pb-3 border-b border-[#E5DFD3]">
              <div className="w-9 h-9 rounded-xl bg-[#FAF8F2] border border-[#B89550]/30 text-[#B89550] flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#252525]">
                  {isBn ? "প্রোগ্রাম নির্বাচন (Program Selection)" : "3. Program Selection"}
                </h2>
                <p className="text-xs text-[#595959]">
                  {isBn
                    ? "অনলাইন কুরআন ও ইসলামিক স্টাডিজ বিষয়সমূহ নির্বাচন করুন"
                    : "Select your required Quran reading, Hifz, and Islamic studies tracks"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* 3.1 Quran Reading */}
              <div className="p-4 rounded-2xl bg-white/70 border border-[#E5DFD3] space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#252525] pb-2 border-b border-stone-200">
                  <BookOpen className="w-4 h-4 text-[#B89550]" />
                  <span>{isBn ? "কুরআন পাঠ (Quran Reading)" : "Quran Reading"}</span>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    { key: "qaida", labelEn: "Qaida", labelBn: "কায়দা (Qaida)" },
                    { key: "fluentReading", labelEn: "Fluent Reading", labelBn: "নাযেরা / সাবলীল তিলাওয়াত" },
                    { key: "tajweed", labelEn: "Tajweed", labelBn: "তাজবীদ (Tajweed)" },
                    { key: "correctPronunciation", labelEn: "Correct Pronunciation", labelBn: "সহিহ মাখরাজ ও উচ্চারণ" },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white transition-all cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.programSelection.quranReading[item.key]}
                        onChange={() => handleCheckboxToggle("quranReading", item.key)}
                        className="w-4 h-4 rounded text-[#B89550] focus:ring-[#B89550] accent-[#B89550]"
                      />
                      <span className="text-[#252525] font-medium">
                        {isBn ? item.labelBn : item.labelEn}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 3.2 Hifzul Quran */}
              <div className="p-4 rounded-2xl bg-white/70 border border-[#E5DFD3] space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#252525] pb-2 border-b border-stone-200">
                  <GraduationCap className="w-4 h-4 text-[#B89550]" />
                  <span>{isBn ? "হিফজুল কুরআন (Hifzul Quran)" : "Hifzul Quran"}</span>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    { key: "memorization", labelEn: "Memorization", labelBn: "কুরআন মুখস্থ (Memorization)" },
                    { key: "revision", labelEn: "Revision", labelBn: "রিভিশন ও দাওর (Revision)" },
                    { key: "stepByStepGuidance", labelEn: "Step-by-Step Guidance", labelBn: "ধারাবাহিক গাইডেন্স" },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white transition-all cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.programSelection.hifzulQuran[item.key]}
                        onChange={() => handleCheckboxToggle("hifzulQuran", item.key)}
                        className="w-4 h-4 rounded text-[#B89550] focus:ring-[#B89550] accent-[#B89550]"
                      />
                      <span className="text-[#252525] font-medium">
                        {isBn ? item.labelBn : item.labelEn}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 3.3 Islamic Studies */}
              <div className="p-4 rounded-2xl bg-white/70 border border-[#E5DFD3] space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#252525] pb-2 border-b border-stone-200">
                  <ShieldCheck className="w-4 h-4 text-[#B89550]" />
                  <span>{isBn ? "ইসলামিক স্টাডিজ (Islamic Studies)" : "Islamic Studies"}</span>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    { key: "aqeedah", labelEn: "Aqeedah", labelBn: "আক্বীদা (Aqeedah)" },
                    { key: "fiqh", labelEn: "Fiqh", labelBn: "ফিক্বহ ও মাসআলা (Fiqh)" },
                    { key: "seerah", labelEn: "Seerah", labelBn: "সীরাতুন্নবী ﷺ (Seerah)" },
                    { key: "islamicHistory", labelEn: "Islamic History", labelBn: "ইসলামের ইতিহাস" },
                    { key: "mannersCharacter", labelEn: "Manners & Character", labelBn: "ইসলামী আদব ও চরিত্র" },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white transition-all cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.programSelection.islamicStudies[item.key]}
                        onChange={() => handleCheckboxToggle("islamicStudies", item.key)}
                        className="w-4 h-4 rounded text-[#B89550] focus:ring-[#B89550] accent-[#B89550]"
                      />
                      <span className="text-[#252525] font-medium">
                        {isBn ? item.labelBn : item.labelEn}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Class Type & Current Quran Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-3 border-t border-[#E5DFD3]">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#252525] block">
                  {isBn ? "ক্লাসের ধরন (Class Type) *" : "Class Type: One-on-One / Group Class / No Preference *"}
                </label>
                <select
                  value={formData.programSelection.classType}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      programSelection: { ...p.programSelection, classType: e.target.value },
                    }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DFD3] focus:outline-none focus:border-[#B89550] text-xs sm:text-sm text-[#252525] shadow-2xs cursor-pointer"
                >
                  <option value="One-on-One">{isBn ? "ওয়ান-অন-ওয়ান (One-on-One)" : "One-on-One"}</option>
                  <option value="Group Class">{isBn ? "গ্রুপ ক্লাস (Group Class)" : "Group Class"}</option>
                  <option value="No Preference">{isBn ? "উভয়টি প্রযোজ্য (No Preference)" : "No Preference"}</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#252525] block">
                  {isBn
                    ? "বর্তমান কুরআনিক স্তর / সর্বশেষ সমাপ্ত পাঠ বা সূরা *"
                    : "Current Quran Level / Last Completed Lesson or Surah *"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.programSelection.currentQuranLevel}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      programSelection: { ...p.programSelection, currentQuranLevel: e.target.value },
                    }))
                  }
                  placeholder={isBn ? "যেমন: কায়দা সমাপ্ত / পারা ১ / আমপারা" : "e.g. Completed Noorani Qaida / Juz 30 / Beginner"}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DFD3] focus:outline-none focus:border-[#B89550] text-xs sm:text-sm text-[#252525] shadow-2xs"
                />
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 4: SCHEDULE PREFERENCE                                 */}
          {/* ============================================================== */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/85 shadow-lg relative overflow-hidden space-y-6">
            <div className="glass-specular-top" />

            <div className="flex items-center gap-3 pb-3 border-b border-[#E5DFD3]">
              <div className="w-9 h-9 rounded-xl bg-[#FAF8F2] border border-[#B89550]/30 text-[#B89550] flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#252525]">
                  {isBn ? "সময়সূচি পছন্দ (Schedule Preference)" : "4. Schedule Preference"}
                </h2>
                <p className="text-xs text-[#595959]">
                  {isBn ? "পছন্দের দিন ও ক্লাসের সময়" : "Preferred days, class times and alternative timing"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Preferred Days */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#252525] block">
                  {isBn ? "পছন্দের দিনসমূহ (Preferred Days) *" : "Preferred Days *"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day) => {
                    const isSelected = formData.schedulePreference.preferredDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDayToggle(day)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#B89550] text-white border-[#B89550] shadow-xs"
                            : "bg-white text-[#595959] border-[#E5DFD3] hover:border-[#B89550]"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Time + Alternative Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#252525] block">
                    {isBn ? "পছন্দের সময় + টাইম জোন *" : "Preferred Time + Time Zone *"}
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={formData.schedulePreference.preferredTime}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          schedulePreference: { ...p.schedulePreference, preferredTime: e.target.value },
                        }))
                      }
                      placeholder="e.g. 5:00 PM – 6:00 PM EST"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-[#E5DFD3] focus:outline-none focus:border-[#B89550] text-xs sm:text-sm text-[#252525] shadow-2xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#252525] block">
                    {isBn ? "বিকল্প সময় (Alternative Time)" : "Alternative Time"}
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={formData.schedulePreference.alternativeTime}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          schedulePreference: { ...p.schedulePreference, alternativeTime: e.target.value },
                        }))
                      }
                      placeholder="e.g. 7:00 PM – 8:00 PM EST"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-[#E5DFD3] focus:outline-none focus:border-[#B89550] text-xs sm:text-sm text-[#252525] shadow-2xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 5: LEARNING INFORMATION                                */}
          {/* ============================================================== */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/85 shadow-lg relative overflow-hidden space-y-6">
            <div className="glass-specular-top" />

            <div className="flex items-center gap-3 pb-3 border-b border-[#E5DFD3]">
              <div className="w-9 h-9 rounded-xl bg-[#FAF8F2] border border-[#B89550]/30 text-[#B89550] flex items-center justify-center font-bold text-sm">
                5
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#252525]">
                  {isBn ? "পূর্ববর্তী শিক্ষার তথ্য (Learning Information)" : "5. Learning Information"}
                </h2>
                <p className="text-xs text-[#595959]">
                  {isBn ? "পূর্ববর্তী মাদরাসা বা শিক্ষক ও বিশেষ কোনো চাহিদা" : "Background education and student specific learning notes"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#252525] block">
                  {isBn
                    ? "পূর্ববর্তী কুরআন / ইসলামিক স্টাডিজ অভিজ্ঞতা"
                    : "Previous Quran / Islamic Studies Experience"}
                </label>
                <input
                  type="text"
                  value={formData.learningInfo.previousExperience}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      learningInfo: { ...p.learningInfo, previousExperience: e.target.value },
                    }))
                  }
                  placeholder={isBn ? "যেমন: ১ বছর স্থানীয় মাদরাসায় পড়েছেন" : "e.g. 1 year of weekend maktab"}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DFD3] focus:outline-none focus:border-[#B89550] text-xs sm:text-sm text-[#252525] shadow-2xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#252525] block">
                  {isBn ? "শিক্ষক / প্রতিষ্ঠান (যদি থাকে)" : "Teacher / Institute (if any)"}
                </label>
                <input
                  type="text"
                  value={formData.learningInfo.teacherInstitute}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      learningInfo: { ...p.learningInfo, teacherInstitute: e.target.value },
                    }))
                  }
                  placeholder={isBn ? "যেমন: আল ফালাহ একাডেমি" : "e.g. Al Falah Academy"}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DFD3] focus:outline-none focus:border-[#B89550] text-xs sm:text-sm text-[#252525] shadow-2xs"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-[#252525] block">
                  {isBn ? "কোনো বিশেষ শিক্ষার চাহিদা বা মন্তব্য" : "Any Learning Needs or Notes"}
                </label>
                <textarea
                  rows={3}
                  value={formData.learningInfo.learningNeedsNotes}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      learningInfo: { ...p.learningInfo, learningNeedsNotes: e.target.value },
                    }))
                  }
                  placeholder={isBn ? "শিক্ষার্থীর জন্য কোনো বিশেষ দিক বা নির্দেশনা থাকলে উল্লেখ করুন..." : "Any additional notes, pacing requirements, or special accommodations..."}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DFD3] focus:outline-none focus:border-[#B89550] text-xs sm:text-sm text-[#252525] shadow-2xs"
                />
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 6: PARENT / GUARDIAN AGREEMENT                         */}
          {/* ============================================================== */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/85 shadow-lg relative overflow-hidden space-y-6">
            <div className="glass-specular-top" />

            <div className="flex items-center gap-3 pb-3 border-b border-[#E5DFD3]">
              <div className="w-9 h-9 rounded-xl bg-[#FAF8F2] border border-[#B89550]/30 text-[#B89550] flex items-center justify-center font-bold text-sm">
                6
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#252525]">
                  {isBn ? "অভিভাবকের সম্মতিপত্র (Parent / Guardian Agreement)" : "6. Parent / Guardian Agreement"}
                </h2>
                <p className="text-xs text-[#595959]">
                  {isBn ? "স্বাক্ষর ও নীতিমালা সম্মতি" : "Formal acknowledgment and legal guardian digital signature"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Required Agreement Checkbox */}
              <label className="flex items-start gap-3 p-4 rounded-2xl bg-white/70 border border-[#E5DFD3] hover:border-[#B89550] transition-all cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreement.hasAgreed}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      agreement: { ...p.agreement, hasAgreed: e.target.checked },
                    }))
                  }
                  className="w-5 h-5 rounded text-[#B89550] focus:ring-[#B89550] accent-[#B89550] mt-0.5 shrink-0"
                />
                <span className="text-xs sm:text-sm text-[#252525] leading-relaxed">
                  {isBn
                    ? "আমি নিশ্চিত করছি যে উপরে প্রদত্ত সকল তথ্য সত্য ও নির্ভুল। আমি আল হিদায়াহ ইসলামিক সেন্টারের অনলাইন ক্লাস নীতিমালা, সময়ানুবর্তিতা এবং শিক্ষাগত আচরণবিধি মেনে চলতে সম্মত।"
                    : "I hereby confirm that all information provided in this admission form is true and accurate. I agree to abide by the academic guidelines, attendance policies, and code of conduct of Al Hidayah Islamic Center."}
                </span>
              </label>

              {/* Signature & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#252525] block">
                    {isBn ? "প্যারেন্ট / অভিভাবকের ডিজিটাল স্বাক্ষর *" : "Parent / Guardian Signature *"}
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={formData.agreement.signature}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          agreement: { ...p.agreement, signature: e.target.value },
                        }))
                      }
                      placeholder={isBn ? "অভিভাবকের নাম লিখে স্বাক্ষর করুন" : "Type full legal name as digital signature"}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-[#E5DFD3] focus:outline-none focus:border-[#B89550] text-xs sm:text-sm text-[#252525] shadow-2xs font-serif italic"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#252525] block">
                    {isBn ? "তারিখ (Date) *" : "Date *"}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.agreement.date}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        agreement: { ...p.agreement, date: e.target.value },
                      }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DFD3] focus:outline-none focus:border-[#B89550] text-xs sm:text-sm text-[#252525] shadow-2xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* FOR OFFICE USE ONLY (READ-ONLY / DISABLED)                     */}
          {/* ============================================================== */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#FAF8F2] border-2 border-dashed border-[#B89550]/40 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B89550]">
                <Lock className="w-3.5 h-3.5" />
                <span>{isBn ? "দাপ্তরিক ব্যবহারের জন্য (FOR OFFICE USE ONLY)" : "FOR OFFICE USE ONLY"}</span>
              </div>
              <span className="text-[10px] font-semibold text-[#8C827A] px-2 py-0.5 rounded bg-white/70 border border-[#E5DFD3]">
                {isBn ? "শিক্ষার্থী পূরণ করবে না" : "Do not fill"}
              </span>
            </div>
            
            <p className="text-[11px] text-[#737373]">
              {isBn
                ? "এই অংশটি আল হিদায়াহ ইসলামিক সেন্টার প্রশাসনের জন্য নির্ধারিত। আবেদন পর্যালোচনার পর অফিস কর্তৃক সিরিয়াল আইডি ও ব্যাচ নম্বর নির্ধারণ করা হবে।"
                : "This section is reserved for administrative officers. Application verification and sequential ID assignment will be processed by center administration."}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-white/60 border border-[#E5DFD3]">
                <span className="text-[#8C827A] block font-medium">Application ID</span>
                <span className="font-mono font-bold text-[#252525]">
                  APP-STU-AUTO
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/60 border border-[#E5DFD3]">
                <span className="text-[#8C827A] block font-medium">Admission Status</span>
                <span className="font-bold text-amber-700">Pending Review</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/60 border border-[#E5DFD3]">
                <span className="text-[#8C827A] block font-medium">Verified By</span>
                <span className="text-[#737373] italic">Administration Only</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/60 border border-[#E5DFD3]">
                <span className="text-[#8C827A] block font-medium">Assigned Teacher</span>
                <span className="text-[#737373] italic">Pending Assignment</span>
              </div>
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/portal"
              className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-[#595959] hover:text-[#252525] bg-white border border-[#E5DFD3] hover:border-[#B89550] transition-all text-center"
            >
              {isBn ? "বাতিল করে পোর্টালে ফিরুন" : "Cancel & Return to Portal"}
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#B89550] hover:bg-[#A58342] shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isBn ? "জমা হচ্ছে..." : "Submitting Application..."}</span>
                </>
              ) : (
                <>
                  <span>
                    {isBn
                      ? "ভর্তি ফরম জমা দিন (Submit Admission Form)"
                      : "Submit Admission Application"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
