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
  Plus,
  Trash2,
  Briefcase,
  Languages,
  Award,
  Users,
  XCircle,
  RotateCcw,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function TeacherApplicationPage() {
  const router = useRouter();
  const { isBn } = useLanguage();

  const [currentUser, setCurrentUser] = useState(null);
  const [existingApplication, setExistingApplication] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isReapplying, setIsReapplying] = useState(false);

  // Form State initialized with all 6 required sections
  const [formData, setFormData] = useState({
    // 1. Personal Information
    position: "Islamic Studies & Quran Teacher",
    fullName: "",
    fatherOrSpouseName: "",
    address: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    citizenship: "US Citizen",
    emergencyContact: {
      name: "",
      phone: "",
    },

    // 2. Education & Islamic Qualifications
    educationQualifications: [
      {
        degreeCertificate: "",
        institution: "",
        subject: "",
        year: "",
      },
    ],
    quranTajweedHifzQualifications: "",
    ijazahOrCertification: "",

    // 3. Teaching Experience
    teachingExperience: [
      {
        institution: "",
        position: "",
        subjectOrClass: "",
        dates: "",
      },
    ],

    // 4. Skills & Availability
    subjects: ["Quran", "Tajweed", "Islamic Studies"],
    otherSubject: "",
    levels: ["Children", "Teens", "Beginner"],
    languages: ["English", "Bangla"],
    otherLanguage: "",
    employmentType: "Part-time", // 'Full-time' | 'Part-time' | 'Weekend' | 'Substitute'
    availability: {
      days: ["Monday", "Wednesday", "Friday"],
      time: "Weekday Evenings (5:00 PM – 8:00 PM EST)",
    },
    startDate: "",

    // 5. References
    references: [
      {
        name: "",
        relation: "",
        organization: "",
        phone: "",
      },
    ],

    // 6. Applicant Declaration
    applicantAgreement: false,
    signature: "",
    signatureDate: new Date().toISOString().split("T")[0],
  });

  // Load active user and check existing teacher application
  useEffect(() => {
    async function loadUserAndApplication() {
      try {
        const userRes = await fetch("/api/auth/me");
        const userData = await userRes.json();

        if (!userRes.ok || !userData?.user) {
          router.replace("/portal/login?redirect=/portal/teacher-application");
          return;
        }

        const user = userData.user;
        setCurrentUser(user);

        // Pre-fill personal info from user account
        setFormData((prev) => ({
          ...prev,
          fullName: user.name || prev.fullName,
          email: user.email || prev.email,
          phone: user.phone || prev.phone,
          address: user.address || prev.address,
          dateOfBirth: user.dateOfBirth
            ? new Date(user.dateOfBirth).toISOString().split("T")[0]
            : prev.dateOfBirth,
        }));

        // Fetch teacher's existing application status
        try {
          const appRes = await fetch("/api/teacher-applications/my-application");
          const appData = await appRes.json();
          if (appRes.ok && appData?.hasApplication && appData.application) {
            setExistingApplication(appData.application);
          }
        } catch (appErr) {
          console.warn("[Fetch Application Status Warning]", appErr);
        }
      } catch (err) {
        console.error("[Teacher Application Load Error]", err);
      } finally {
        setIsInitializing(false);
      }
    }

    loadUserAndApplication();
  }, [router]);

  // Handle Dynamic Education Rows
  const handleAddEducation = () => {
    setFormData((prev) => ({
      ...prev,
      educationQualifications: [
        ...prev.educationQualifications,
        { degreeCertificate: "", institution: "", subject: "", year: "" },
      ],
    }));
  };

  const handleRemoveEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      educationQualifications: prev.educationQualifications.filter((_, i) => i !== index),
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.educationQualifications];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, educationQualifications: updated };
    });
  };

  // Handle Dynamic Experience Rows
  const handleAddExperience = () => {
    setFormData((prev) => ({
      ...prev,
      teachingExperience: [
        ...prev.teachingExperience,
        { institution: "", position: "", subjectOrClass: "", dates: "" },
      ],
    }));
  };

  const handleRemoveExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      teachingExperience: prev.teachingExperience.filter((_, i) => i !== index),
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.teachingExperience];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, teachingExperience: updated };
    });
  };

  // Handle Dynamic References Rows
  const handleAddReference = () => {
    setFormData((prev) => ({
      ...prev,
      references: [
        ...prev.references,
        { name: "", relation: "", organization: "", phone: "" },
      ],
    }));
  };

  const handleRemoveReference = (index) => {
    setFormData((prev) => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index),
    }));
  };

  const handleReferenceChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.references];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, references: updated };
    });
  };

  // Toggle multi-select items (Subjects, Levels, Languages, Days)
  const handleToggleItem = (arrayField, value) => {
    setFormData((prev) => {
      const list = prev[arrayField] || [];
      const exists = list.includes(value);
      const updated = exists ? list.filter((item) => item !== value) : [...list, value];
      return { ...prev, [arrayField]: updated };
    });
  };

  const handleToggleDay = (day) => {
    setFormData((prev) => {
      const days = prev.availability.days || [];
      const exists = days.includes(day);
      const updated = exists ? days.filter((d) => d !== day) : [...days, day];
      return {
        ...prev,
        availability: {
          ...prev.availability,
          days: updated,
        },
      };
    });
  };

  // Handle Re-apply for rejected applicants
  const handleStartReapply = () => {
    if (existingApplication) {
      setFormData((prev) => ({
        ...prev,
        position: existingApplication.position || prev.position,
        fullName: existingApplication.fullName || prev.fullName,
        fatherOrSpouseName: existingApplication.fatherOrSpouseName || prev.fatherOrSpouseName,
        address: existingApplication.address || prev.address,
        phone: existingApplication.phone || prev.phone,
        email: existingApplication.email || prev.email,
        dateOfBirth: existingApplication.dateOfBirth
          ? new Date(existingApplication.dateOfBirth).toISOString().split("T")[0]
          : prev.dateOfBirth,
        citizenship: existingApplication.citizenship || prev.citizenship,
        emergencyContact: existingApplication.emergencyContact || prev.emergencyContact,
        educationQualifications:
          existingApplication.educationQualifications?.length > 0
            ? existingApplication.educationQualifications
            : prev.educationQualifications,
        quranTajweedHifzQualifications:
          existingApplication.quranTajweedHifzQualifications || prev.quranTajweedHifzQualifications,
        ijazahOrCertification:
          existingApplication.ijazahOrCertification || prev.ijazahOrCertification,
        teachingExperience:
          existingApplication.teachingExperience?.length > 0
            ? existingApplication.teachingExperience
            : prev.teachingExperience,
        subjects: existingApplication.subjects?.length > 0 ? existingApplication.subjects : prev.subjects,
        otherSubject: existingApplication.otherSubject || prev.otherSubject,
        levels: existingApplication.levels?.length > 0 ? existingApplication.levels : prev.levels,
        languages: existingApplication.languages?.length > 0 ? existingApplication.languages : prev.languages,
        otherLanguage: existingApplication.otherLanguage || prev.otherLanguage,
        employmentType: existingApplication.employmentType || prev.employmentType,
        availability: existingApplication.availability || prev.availability,
        startDate: existingApplication.startDate
          ? new Date(existingApplication.startDate).toISOString().split("T")[0]
          : prev.startDate,
        references:
          existingApplication.references?.length > 0
            ? existingApplication.references
            : prev.references,
        applicantAgreement: false,
        signature: "",
        signatureDate: new Date().toISOString().split("T")[0],
      }));
    }
    setIsReapplying(true);
    setSubmitError(null);
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    // 1. Validation: Declaration Agreement
    if (!formData.applicantAgreement) {
      setSubmitError(
        isBn
          ? "অনুগ্রহ করে আবেদনকারী ঘোষণার সম্মতি বক্সে টিক দিন।"
          : "Please check the required applicant declaration agreement checkbox."
      );
      return;
    }

    // 2. Validation: Signature
    if (!formData.signature.trim()) {
      setSubmitError(
        isBn
          ? "আবেদনকারীর ডিজিটাল স্বাক্ষর প্রদান করা আবশ্যক।"
          : "Electronic signature is required."
      );
      return;
    }

    // 3. Validation: Mandatory Fields
    if (!formData.fullName.trim()) {
      setSubmitError(isBn ? "পূর্ণ নাম আবশ্যক।" : "Full Name is required.");
      return;
    }
    if (!formData.position.trim()) {
      setSubmitError(isBn ? "আবেদিত পদ আবশ্যক।" : "Applied Position is required.");
      return;
    }
    if (!formData.address.trim()) {
      setSubmitError(isBn ? "বর্তমান ঠিকানা আবশ্যক।" : "Residential address is required.");
      return;
    }
    if (!formData.phone.trim()) {
      setSubmitError(isBn ? "ফোন নম্বর আবশ্যক।" : "Phone number is required.");
      return;
    }
    if (!formData.email.trim()) {
      setSubmitError(isBn ? "ইমেইল ঠিকানা আবশ্যক।" : "Email address is required.");
      return;
    }
    if (!formData.dateOfBirth) {
      setSubmitError(isBn ? "জন্ম তারিখ নির্বাচন করুন।" : "Date of birth is required.");
      return;
    }
    if (!formData.citizenship.trim()) {
      setSubmitError(isBn ? "নাগরিকত্ব তথ্য আবশ্যক।" : "Citizenship status is required.");
      return;
    }
    if (!formData.emergencyContact.name.trim() || !formData.emergencyContact.phone.trim()) {
      setSubmitError(
        isBn
          ? "জরুরি যোগাযোগের নাম ও ফোন নম্বর উভয়ই আবশ্যক।"
          : "Emergency contact name and phone number are both required."
      );
      return;
    }
    if (formData.subjects.length === 0) {
      setSubmitError(
        isBn
          ? "কমপক্ষে একটি শিক্ষাদানের বিষয় নির্বাচন করুন।"
          : "Please select at least one teaching subject."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        position: formData.position.trim(),
        fullName: formData.fullName.trim(),
        fatherOrSpouseName: formData.fatherOrSpouseName.trim(),
        address: formData.address.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim().toLowerCase(),
        dateOfBirth: formData.dateOfBirth,
        citizenship: formData.citizenship.trim(),
        emergencyContact: {
          name: formData.emergencyContact.name.trim(),
          phone: formData.emergencyContact.phone.trim(),
        },
        educationQualifications: formData.educationQualifications.filter(
          (item) => item.degreeCertificate.trim() || item.institution.trim()
        ),
        quranTajweedHifzQualifications: formData.quranTajweedHifzQualifications.trim(),
        ijazahOrCertification: formData.ijazahOrCertification.trim(),
        teachingExperience: formData.teachingExperience.filter(
          (item) => item.institution.trim() || item.position.trim()
        ),
        subjects: formData.subjects,
        otherSubject: formData.otherSubject.trim(),
        levels: formData.levels,
        languages: formData.languages,
        otherLanguage: formData.otherLanguage.trim(),
        employmentType: formData.employmentType,
        availability: formData.availability,
        startDate: formData.startDate || undefined,
        references: formData.references.filter(
          (item) => item.name.trim() || item.organization.trim()
        ),
        applicantAgreement: true,
        signature: formData.signature.trim(),
        signatureDate: formData.signatureDate,
      };

      const res = await fetch("/api/teacher-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && (data.success || data.application)) {
        setSubmitSuccess(true);
        setExistingApplication(data.application || { ...payload, status: "pending" });
        setIsReapplying(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setSubmitError(
          data?.error || data?.message || "Failed to submit teacher application. Please try again."
        );
      }
    } catch (err) {
      console.error("[Teacher Application Submit Error]", err);
      setSubmitError(err?.message || "A network error occurred. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper date formatter
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#FAF8F2] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#B89550]" />
          <p className="text-sm font-medium text-[#595959]">
            {isBn ? "শিক্ষক পোর্টাল লোড হচ্ছে..." : "Loading Teacher Application..."}
          </p>
        </div>
      </div>
    );
  }

  const appStatus = existingApplication?.status;
  const showExistingStatus = existingApplication && !isReapplying;

  return (
    <div className="min-h-screen bg-[#FAF8F2] text-[#252525] py-8 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-white border border-[#E5DFD3] shadow-sm">
          <div className="flex items-center gap-3.5">
            <Link
              href="/portal"
              className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center border border-[#E5DFD3] shrink-0"
            >
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
                  {isBn ? "শিক্ষক নিয়োগ আবেদন" : "Teacher Employment Application"}
                </h1>
                <span className="px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#B89550] bg-[#FAF8F2] border border-[#B89550]/30 rounded-full">
                  {isBn ? "অনলাইন ফরম" : "Official Form"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#595959]">
                {isBn
                  ? "আল হিদায়াহ ইসলামিক সেন্টার — শিক্ষক ও স্কলার নিয়োগ আবেদনপত্র"
                  : "Al Hidayah Islamic Center — Teacher & Faculty Employment Portal"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/portal"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[#595959] hover:text-[#252525] bg-[#FAF8F2] hover:bg-stone-100 border border-[#E5DFD3] rounded-xl transition-all cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>{isBn ? "মেম্বার পোর্টালে ফিরুন" : "Back to Portal"}</span>
            </Link>
          </div>
        </div>

        {/* ================================================================= */}
        {/* VIEW 1: EXISTING APPLICATION STATUS (PENDING / APPROVED / REJECTED) */}
        {/* ================================================================= */}
        {showExistingStatus && (
          <div className="space-y-6">

            {/* Status Notification Banner */}
            {appStatus === "pending" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/90 border-2 border-amber-300 text-amber-950 space-y-3 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 font-bold text-lg text-amber-900">
                    <Clock className="w-6 h-6 text-amber-600 animate-pulse shrink-0" />
                    <span>
                      {isBn
                        ? "আপনার শিক্ষক আবেদনটি বর্তমানে পর্যালোচনাধীন রয়েছে"
                        : "Your teacher application is currently under review."}
                    </span>
                  </div>
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-amber-100 text-amber-900 border border-amber-300 w-fit">
                    {isBn ? "পর্যালোচনাধীন" : "Pending Review"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                  {isBn
                    ? "আলহামদুলিল্লাহ! আপনার শিক্ষক নিয়োগ আবেদনটি সফলভাবে জমা হয়েছে। আমাদের প্রশাসনিক টিম আপনার ইসলামিক ও একাডেমিক যোগ্যতা এবং অভিজ্ঞতা যাচাই করে শীঘ্রই আপনাকে অফিসিয়াল শিক্ষক আইডি (যেমন: AIC-TEA-001) বরাদ্দ করবে।"
                    : "Alhamdulillah! Your teacher employment application has been received by Al Hidayah Islamic Center. An administrator is currently reviewing your qualifications, and an official sequential Teacher ID (e.g. AIC-TEA-001) will be generated upon approval."}
                </p>
                <div className="text-xs text-amber-700/90 pt-1 border-t border-amber-200 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {isBn ? "জমার তারিখ: " : "Submitted on: "}
                    <strong>{formatDate(existingApplication.createdAt || existingApplication.submittedAt)}</strong>
                  </span>
                </div>
              </div>
            )}

            {appStatus === "approved" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/90 border-2 border-emerald-300 text-emerald-950 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 font-bold text-lg text-emerald-900">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <span>
                      {isBn
                        ? "অভিনন্দন! আপনার শিক্ষক আবেদন অনুমোদিত হয়েছে"
                        : "Congratulations! Your Teacher Application is Approved"}
                    </span>
                  </div>
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 w-fit">
                    {isBn ? "অনুমোদিত" : "Approved"}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-emerald-200">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C827A] block">
                      {isBn ? "অফিসিয়াল শিক্ষক আইডি" : "Official Teacher Serial ID"}
                    </span>
                    <span className="font-mono text-2xl font-black text-[#B89550] block mt-0.5">
                      {existingApplication.teacherId || currentUser?.memberId || "AIC-TEA-001"}
                    </span>
                  </div>
                  <Link
                    href="/portal"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#B89550] hover:bg-[#A58342] shadow-sm transition-all"
                  >
                    <span>{isBn ? "মেম্বার আইডি কার্ড দেখুন" : "View Member ID Card"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {appStatus === "rejected" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-red-50/90 border-2 border-red-300 text-red-950 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 font-bold text-lg text-red-900">
                    <XCircle className="w-6 h-6 text-red-600 shrink-0" />
                    <span>
                      {isBn ? "শিক্ষক আবেদন স্থিতি: বাতিলকৃত" : "Teacher Application Status: Rejected"}
                    </span>
                  </div>
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-red-100 text-red-900 border border-red-300 w-fit">
                    {isBn ? "বাতিলকৃত" : "Rejected"}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-red-200 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-red-800 block">
                    {isBn ? "প্রশাসনের মন্তব্য / কারণ:" : "Administrator's Rejection Reason:"}
                  </span>
                  <p className="text-sm text-[#252525] font-medium leading-relaxed">
                    {existingApplication.rejectionReason ||
                      (isBn
                        ? "তথ্য অসম্পূর্ণ বা যাচাইকরণ শর্ত পূরণ হয়নি।"
                        : "Verification criteria not met or incomplete details.")}
                  </p>
                </div>

                <div className="flex items-center justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleStartReapply}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#B89550] hover:bg-[#A58342] shadow-sm transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{isBn ? "পুনরায় আবেদন করুন (Re-apply)" : "Re-apply with Updated Information"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Read-only Review Summary of Submitted Application */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DFD3] shadow-sm space-y-6">
              <div className="border-b border-[#E5DFD3] pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#252525]">
                    {isBn ? "জমাকৃত আবেদনের বিবরণ" : "Submitted Application Details"}
                  </h2>
                  <p className="text-xs text-[#595959]">
                    {isBn ? "আপনার রেকর্ডের জন্য সংরক্ষিত কপি" : "Summary of information submitted to AIC"}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550]">
                  {existingApplication.position || "Teacher"}
                </span>
              </div>

              {/* 1. Personal Info */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-[#B89550] uppercase tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>1. {isBn ? "ব্যক্তিগত তথ্য" : "Personal Information"}</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] text-xs">
                  <div>
                    <span className="text-[#8C827A] block">{isBn ? "পূর্ণ নাম:" : "Full Name:"}</span>
                    <strong className="text-[#252525]">{existingApplication.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-[#8C827A] block">{isBn ? "পিতা / স্বামীর নাম:" : "Father / Spouse:"}</span>
                    <strong className="text-[#252525]">{existingApplication.fatherOrSpouseName || "N/A"}</strong>
                  </div>
                  <div>
                    <span className="text-[#8C827A] block">{isBn ? "জন্ম তারিখ:" : "Date of Birth:"}</span>
                    <strong className="text-[#252525]">{formatDate(existingApplication.dateOfBirth)}</strong>
                  </div>
                  <div>
                    <span className="text-[#8C827A] block">{isBn ? "ফোন:" : "Phone:"}</span>
                    <strong className="text-[#252525]">{existingApplication.phone}</strong>
                  </div>
                  <div>
                    <span className="text-[#8C827A] block">{isBn ? "ইমেইল:" : "Email:"}</span>
                    <strong className="text-[#252525]">{existingApplication.email}</strong>
                  </div>
                  <div>
                    <span className="text-[#8C827A] block">{isBn ? "নাগরিকত্ব:" : "Citizenship:"}</span>
                    <strong className="text-[#252525]">{existingApplication.citizenship}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[#8C827A] block">{isBn ? "ঠিকানা:" : "Address:"}</span>
                    <span className="text-[#252525] font-medium">{existingApplication.address}</span>
                  </div>
                  <div>
                    <span className="text-[#8C827A] block">{isBn ? "জরুরি যোগাযোগ:" : "Emergency Contact:"}</span>
                    <span className="text-[#252525] font-medium">
                      {existingApplication.emergencyContact?.name} ({existingApplication.emergencyContact?.phone})
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Education Qualifications */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-[#B89550] uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>2. {isBn ? "শিক্ষা ও ইসলামিক যোগ্যতা" : "Education & Islamic Qualifications"}</span>
                </h3>
                {existingApplication.educationQualifications?.length > 0 ? (
                  <div className="overflow-x-auto rounded-2xl border border-[#E5DFD3]">
                    <table className="w-full text-left text-xs bg-white">
                      <thead className="bg-[#FAF8F2] text-[#8C827A] border-b border-[#E5DFD3]">
                        <tr>
                          <th className="p-2.5 font-semibold">Degree / Certificate</th>
                          <th className="p-2.5 font-semibold">Institution</th>
                          <th className="p-2.5 font-semibold">Subject</th>
                          <th className="p-2.5 font-semibold">Year</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5DFD3]">
                        {existingApplication.educationQualifications.map((item, idx) => (
                          <tr key={idx}>
                            <td className="p-2.5 font-medium text-[#252525]">{item.degreeCertificate || "—"}</td>
                            <td className="p-2.5 text-[#595959]">{item.institution || "—"}</td>
                            <td className="p-2.5 text-[#595959]">{item.subject || "—"}</td>
                            <td className="p-2.5 text-[#595959]">{item.year || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs text-[#8C827A] italic p-3 bg-[#FAF8F2] rounded-xl">No qualifications listed</p>
                )}
                {existingApplication.quranTajweedHifzQualifications && (
                  <div className="p-3 bg-[#FAF8F2] rounded-xl text-xs space-y-1">
                    <span className="font-semibold text-[#8C827A] block">Quran/Tajweed/Hifz Qualifications:</span>
                    <p className="text-[#252525]">{existingApplication.quranTajweedHifzQualifications}</p>
                  </div>
                )}
                {existingApplication.ijazahOrCertification && (
                  <div className="p-3 bg-[#FAF8F2] rounded-xl text-xs space-y-1">
                    <span className="font-semibold text-[#8C827A] block">Ijazah / Certifications:</span>
                    <p className="text-[#252525]">{existingApplication.ijazahOrCertification}</p>
                  </div>
                )}
              </div>

              {/* 3. Teaching Experience */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-[#B89550] uppercase tracking-wider flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>3. {isBn ? "শিক্ষাদানের অভিজ্ঞতা" : "Teaching Experience"}</span>
                </h3>
                {existingApplication.teachingExperience?.length > 0 ? (
                  <div className="overflow-x-auto rounded-2xl border border-[#E5DFD3]">
                    <table className="w-full text-left text-xs bg-white">
                      <thead className="bg-[#FAF8F2] text-[#8C827A] border-b border-[#E5DFD3]">
                        <tr>
                          <th className="p-2.5 font-semibold">Institution</th>
                          <th className="p-2.5 font-semibold">Position</th>
                          <th className="p-2.5 font-semibold">Subject / Class</th>
                          <th className="p-2.5 font-semibold">Dates</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5DFD3]">
                        {existingApplication.teachingExperience.map((item, idx) => (
                          <tr key={idx}>
                            <td className="p-2.5 font-medium text-[#252525]">{item.institution || "—"}</td>
                            <td className="p-2.5 text-[#595959]">{item.position || "—"}</td>
                            <td className="p-2.5 text-[#595959]">{item.subjectOrClass || "—"}</td>
                            <td className="p-2.5 text-[#595959]">{item.dates || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs text-[#8C827A] italic p-3 bg-[#FAF8F2] rounded-xl">No experience records listed</p>
                )}
              </div>

              {/* 4. Skills & Availability */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-[#B89550] uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>4. {isBn ? "দক্ষতা ও সময়সূচী" : "Skills & Availability"}</span>
                </h3>
                <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] text-xs space-y-3">
                  <div>
                    <span className="text-[#8C827A] font-semibold block mb-1">Subjects:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {existingApplication.subjects?.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-[#E5DFD3] font-medium text-[#252525]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-[#E5DFD3]">
                    <div>
                      <span className="text-[#8C827A] block">Employment:</span>
                      <strong className="text-[#B89550]">{existingApplication.employmentType}</strong>
                    </div>
                    <div>
                      <span className="text-[#8C827A] block">Teaching Time:</span>
                      <strong className="text-[#252525]">{existingApplication.availability?.time || "N/A"}</strong>
                    </div>
                    <div>
                      <span className="text-[#8C827A] block">Available Days:</span>
                      <strong className="text-[#252525]">
                        {Array.isArray(existingApplication.availability?.days)
                          ? existingApplication.availability.days.join(", ")
                          : existingApplication.availability?.days || "N/A"}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. References */}
              {existingApplication.references?.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-[#B89550] uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>5. {isBn ? "রেফারেন্স" : "References"}</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {existingApplication.references.map((ref, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3] text-xs space-y-0.5">
                        <strong className="text-[#252525] block">{ref.name}</strong>
                        <p className="text-[#595959]">{ref.relation} • {ref.organization}</p>
                        <p className="text-[#8C827A] font-mono">{ref.phone}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. Declaration & Signature */}
              <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#8C827A] block">{isBn ? "ডিজিটাল স্বাক্ষর:" : "Digital Signature:"}</span>
                  <span className="font-serif italic font-bold text-base text-[#252525]">{existingApplication.signature}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#8C827A] block">{isBn ? "তারিখ:" : "Signature Date:"}</span>
                  <span className="font-semibold text-[#252525]">{formatDate(existingApplication.signatureDate)}</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 2: SUBMISSION FORM (NEW OR RE-APPLYING)                      */}
        {/* ================================================================= */}
        {(!existingApplication || isReapplying) && (
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Error Message Alert */}
            {submitError && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1 text-xs sm:text-sm">
                  <strong className="block font-semibold">
                    {isBn ? "আবেদন জমা দেওয়া যায়নি" : "Application Submission Error"}
                  </strong>
                  <p>{submitError}</p>
                </div>
              </div>
            )}

            {/* Success Toast / Notification */}
            {submitSuccess && (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div className="text-xs sm:text-sm">
                  <strong className="block font-bold">
                    {isBn ? "আবেদন সফলভাবে গৃহীত হয়েছে!" : "Application Submitted Successfully!"}
                  </strong>
                  <p>
                    {isBn
                      ? "আপনার শিক্ষক নিয়োগ আবেদনটি প্রশাসন কর্তৃক পর্যালোচনার জন্য জমা দেওয়া হয়েছে।"
                      : "Your teacher employment application is now pending admin review."}
                  </p>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* 1. PERSONAL INFORMATION                                       */}
            {/* ------------------------------------------------------------- */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DFD3] shadow-sm space-y-6">
              <div className="border-b border-[#E5DFD3] pb-3">
                <h2 className="text-base sm:text-lg font-bold text-[#252525] flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>{isBn ? "ব্যক্তিগত তথ্য" : "Personal Information"}</span>
                </h2>
                <p className="text-xs text-[#595959] mt-0.5">
                  {isBn
                    ? "আবেদনকারীর প্রাথমিক ও জরুরি যোগাযোগের বিবরণ"
                    : "Primary identity and residential details"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Applied Position */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#252525] uppercase tracking-wider mb-1.5">
                    {isBn ? "আবেদিত পদ *" : "Position Applied For *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="e.g. Quran & Tajweed Teacher, Hifz Scholar, Islamic Studies Educator"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] bg-[#FAF8F2] focus:bg-white focus:border-[#B89550] text-sm text-[#252525] outline-none transition-all font-medium"
                  />
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-[#252525] uppercase tracking-wider mb-1.5">
                    {isBn ? "পূর্ণ নাম *" : "Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Full legal name"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] bg-[#FAF8F2] focus:bg-white focus:border-[#B89550] text-sm text-[#252525] outline-none transition-all font-medium"
                  />
                </div>

                {/* Father or Spouse Name */}
                <div>
                  <label className="block text-xs font-bold text-[#252525] uppercase tracking-wider mb-1.5">
                    {isBn ? "পিতা / স্বামীর নাম" : "Father / Spouse Name"}
                  </label>
                  <input
                    type="text"
                    value={formData.fatherOrSpouseName}
                    onChange={(e) => setFormData({ ...formData, fatherOrSpouseName: e.target.value })}
                    placeholder="Guardian or spouse name"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] bg-[#FAF8F2] focus:bg-white focus:border-[#B89550] text-sm text-[#252525] outline-none transition-all"
                  />
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#252525] uppercase tracking-wider mb-1.5">
                    {isBn ? "বর্তমান ঠিকানা *" : "Residential Address *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Street, City, State, ZIP code"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] bg-[#FAF8F2] focus:bg-white focus:border-[#B89550] text-sm text-[#252525] outline-none transition-all font-medium"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-[#252525] uppercase tracking-wider mb-1.5">
                    {isBn ? "ফোন / হোয়াটসঅ্যাপ *" : "Phone / WhatsApp *"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] bg-[#FAF8F2] focus:bg-white focus:border-[#B89550] text-sm text-[#252525] outline-none transition-all font-medium"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-[#252525] uppercase tracking-wider mb-1.5">
                    {isBn ? "ইমেইল ঠিকানা *" : "Email Address *"}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="teacher@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] bg-[#FAF8F2] focus:bg-white focus:border-[#B89550] text-sm text-[#252525] outline-none transition-all font-medium"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-xs font-bold text-[#252525] uppercase tracking-wider mb-1.5">
                    {isBn ? "জন্ম তারিখ *" : "Date of Birth *"}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] bg-[#FAF8F2] focus:bg-white focus:border-[#B89550] text-sm text-[#252525] outline-none transition-all font-medium"
                  />
                </div>

                {/* Citizenship */}
                <div>
                  <label className="block text-xs font-bold text-[#252525] uppercase tracking-wider mb-1.5">
                    {isBn ? "নাগরিকত্ব / কাজের অধিকার *" : "Citizenship / Work Status *"}
                  </label>
                  <select
                    value={formData.citizenship}
                    onChange={(e) => setFormData({ ...formData, citizenship: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] bg-[#FAF8F2] focus:bg-white focus:border-[#B89550] text-sm text-[#252525] outline-none transition-all font-medium"
                  >
                    <option value="US Citizen">US Citizen</option>
                    <option value="Permanent Resident (Green Card)">Permanent Resident (Green Card)</option>
                    <option value="Employment Authorized">Employment Authorized</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Emergency Contact */}
                <div className="sm:col-span-2 p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] space-y-3">
                  <span className="text-xs font-bold text-[#B89550] uppercase tracking-wider block">
                    {isBn ? "জরুরি যোগাযোগের ব্যক্তি *" : "Emergency Contact *"}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#595959] mb-1">
                        {isBn ? "ব্যক্তির নাম *" : "Contact Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.emergencyContact.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            emergencyContact: { ...formData.emergencyContact, name: e.target.value },
                          })
                        }
                        placeholder="Relative / Spouse name"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E5DFD3] bg-white text-xs text-[#252525] outline-none focus:border-[#B89550]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#595959] mb-1">
                        {isBn ? "জরুরি ফোন নম্বর *" : "Emergency Phone *"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.emergencyContact.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            emergencyContact: { ...formData.emergencyContact, phone: e.target.value },
                          })
                        }
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E5DFD3] bg-white text-xs text-[#252525] outline-none focus:border-[#B89550]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* 2. EDUCATION & ISLAMIC QUALIFICATIONS                         */}
            {/* ------------------------------------------------------------- */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DFD3] shadow-sm space-y-6">
              <div className="border-b border-[#E5DFD3] pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#252525] flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <span>{isBn ? "শিক্ষা ও ইসলামিক যোগ্যতা" : "Education & Islamic Qualifications"}</span>
                  </h2>
                  <p className="text-xs text-[#595959] mt-0.5">
                    {isBn
                      ? "একাডেমিক ডিগ্রি, দাওরায়ে হাদিস, মাদরাসা সার্টিফিকেট ও ইজাজাহ"
                      : "Degrees, certificates, Islamic diplomas and Ijazah credentials"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddEducation}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#B89550] bg-[#FAF8F2] hover:bg-[#B89550]/15 border border-[#B89550]/30 transition-all cursor-pointer shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isBn ? "সার্টিফিকেট যোগ করুন" : "Add Qualification Row"}</span>
                </button>
              </div>

              {/* Dynamic Education Rows */}
              <div className="space-y-3">
                {formData.educationQualifications.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] relative space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#8C827A]">
                        {isBn ? `যোগ্যতা #${index + 1}` : `Qualification Entry #${index + 1}`}
                      </span>
                      {formData.educationQualifications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveEducation(index)}
                          className="text-red-600 hover:text-red-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{isBn ? "মুছে ফেলুন" : "Remove"}</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] text-[#595959] mb-1">
                          Degree / Certificate
                        </label>
                        <input
                          type="text"
                          value={item.degreeCertificate}
                          onChange={(e) => handleEducationChange(index, "degreeCertificate", e.target.value)}
                          placeholder="e.g. Alimiyyah, Dawra Hadith, BA"
                          className="w-full px-3 py-2 rounded-xl border border-[#E5DFD3] bg-white text-xs text-[#252525] outline-none focus:border-[#B89550]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#595959] mb-1">
                          Institution
                        </label>
                        <input
                          type="text"
                          value={item.institution}
                          onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                          placeholder="Madrasah / University"
                          className="w-full px-3 py-2 rounded-xl border border-[#E5DFD3] bg-white text-xs text-[#252525] outline-none focus:border-[#B89550]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#595959] mb-1">
                          Subject / Field
                        </label>
                        <input
                          type="text"
                          value={item.subject}
                          onChange={(e) => handleEducationChange(index, "subject", e.target.value)}
                          placeholder="Islamic Studies, Quran, etc."
                          className="w-full px-3 py-2 rounded-xl border border-[#E5DFD3] bg-white text-xs text-[#252525] outline-none focus:border-[#B89550]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#595959] mb-1">
                          Year
                        </label>
                        <input
                          type="text"
                          value={item.year}
                          onChange={(e) => handleEducationChange(index, "year", e.target.value)}
                          placeholder="e.g. 2020"
                          className="w-full px-3 py-2 rounded-xl border border-[#E5DFD3] bg-white text-xs text-[#252525] outline-none focus:border-[#B89550]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quran/Tajweed/Hifz Qualifications */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#252525] uppercase tracking-wider">
                  {isBn ? "কুরআন / তাজবীদ / হিফজ যোগ্যতা" : "Quran / Tajweed / Hifz Qualifications"}
                </label>
                <textarea
                  rows={2}
                  value={formData.quranTajweedHifzQualifications}
                  onChange={(e) => setFormData({ ...formData, quranTajweedHifzQualifications: e.target.value })}
                  placeholder="Detail your Quran recitation, rules of Tajweed, Hafiz status, or Sanad chain..."
                  className="w-full p-3.5 rounded-xl border border-[#E5DFD3] bg-[#FAF8F2] focus:bg-white focus:border-[#B89550] text-xs text-[#252525] outline-none transition-all"
                />
              </div>

              {/* Ijazah / Certification */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#252525] uppercase tracking-wider">
                  {isBn ? "ইজাজাহ / সনদ / সার্টিফিকেট বিবরণ" : "Ijazah / Certification / Sanad"}
                </label>
                <textarea
                  rows={2}
                  value={formData.ijazahOrCertification}
                  onChange={(e) => setFormData({ ...formData, ijazahOrCertification: e.target.value })}
                  placeholder="Name of Shaykh/Institute, Riwayah (e.g. Hafs an Asim), Year received..."
                  className="w-full p-3.5 rounded-xl border border-[#E5DFD3] bg-[#FAF8F2] focus:bg-white focus:border-[#B89550] text-xs text-[#252525] outline-none transition-all"
                />
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* 3. TEACHING EXPERIENCE                                        */}
            {/* ------------------------------------------------------------- */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DFD3] shadow-sm space-y-6">
              <div className="border-b border-[#E5DFD3] pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#252525] flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <span>{isBn ? "শিক্ষাদানের অভিজ্ঞতা" : "Teaching Experience"}</span>
                  </h2>
                  <p className="text-xs text-[#595959] mt-0.5">
                    {isBn
                      ? "বিগত বা বর্তমান মাদরাসা, স্কুল বা সেন্টারে শিক্ষকতার বিবরণ"
                      : "Previous or current teaching positions held"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#B89550] bg-[#FAF8F2] hover:bg-[#B89550]/15 border border-[#B89550]/30 transition-all cursor-pointer shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isBn ? "অভিজ্ঞতা যোগ করুন" : "Add Experience Row"}</span>
                </button>
              </div>

              {/* Dynamic Experience Rows */}
              <div className="space-y-3">
                {formData.teachingExperience.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] relative space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#8C827A]">
                        {isBn ? `অভিজ্ঞতা #${index + 1}` : `Experience Entry #${index + 1}`}
                      </span>
                      {formData.teachingExperience.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveExperience(index)}
                          className="text-red-600 hover:text-red-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{isBn ? "মুছে ফেলুন" : "Remove"}</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] text-[#595959] mb-1">
                          Institution / Organization
                        </label>
                        <input
                          type="text"
                          value={item.institution}
                          onChange={(e) => handleExperienceChange(index, "institution", e.target.value)}
                          placeholder="e.g. Al Hidayah Center"
                          className="w-full px-3 py-2 rounded-xl border border-[#E5DFD3] bg-white text-xs text-[#252525] outline-none focus:border-[#B89550]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#595959] mb-1">
                          Position / Role
                        </label>
                        <input
                          type="text"
                          value={item.position}
                          onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                          placeholder="e.g. Quran Teacher"
                          className="w-full px-3 py-2 rounded-xl border border-[#E5DFD3] bg-white text-xs text-[#252525] outline-none focus:border-[#B89550]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#595959] mb-1">
                          Subject / Class
                        </label>
                        <input
                          type="text"
                          value={item.subjectOrClass}
                          onChange={(e) => handleExperienceChange(index, "subjectOrClass", e.target.value)}
                          placeholder="e.g. Tajweed Grade 3-5"
                          className="w-full px-3 py-2 rounded-xl border border-[#E5DFD3] bg-white text-xs text-[#252525] outline-none focus:border-[#B89550]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#595959] mb-1">
                          Dates / Duration
                        </label>
                        <input
                          type="text"
                          value={item.dates}
                          onChange={(e) => handleExperienceChange(index, "dates", e.target.value)}
                          placeholder="e.g. 2021 – 2024"
                          className="w-full px-3 py-2 rounded-xl border border-[#E5DFD3] bg-white text-xs text-[#252525] outline-none focus:border-[#B89550]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* 4. SKILLS & AVAILABILITY                                      */}
            {/* ------------------------------------------------------------- */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DFD3] shadow-sm space-y-6">
              <div className="border-b border-[#E5DFD3] pb-3">
                <h2 className="text-base sm:text-lg font-bold text-[#252525] flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <span>{isBn ? "দক্ষতা ও প্রাপ্যতা / সময়সূচী" : "Skills & Availability"}</span>
                </h2>
                <p className="text-xs text-[#595959] mt-0.5">
                  {isBn
                    ? "শিক্ষাদানের বিষয়, শিক্ষার্থীদের বয়সস্তর, ভাষা ও সাপ্তাহিক সময়"
                    : "Subjects you teach, age levels, languages and preferred schedule"}
                </p>
              </div>

              {/* Subjects Checklist */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#252525] uppercase tracking-wider">
                  {isBn ? "শিক্ষাদানের বিষয়সমূহ (কমপক্ষে ১টি) *" : "Teaching Subjects (Select at least 1) *"}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {["Quran", "Qaida", "Tajweed", "Hifz", "Islamic Studies", "Arabic", "Other"].map((subj) => {
                    const isChecked = formData.subjects.includes(subj);
                    return (
                      <button
                        type="button"
                        key={subj}
                        onClick={() => handleToggleItem("subjects", subj)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold text-left border transition-all cursor-pointer flex items-center justify-between ${
                          isChecked
                            ? "bg-[#FAF8F2] border-[#B89550] text-[#252525] shadow-xs"
                            : "bg-white border-[#E5DFD3] text-[#595959] hover:bg-stone-50"
                        }`}
                      >
                        <span>{subj}</span>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-[#B89550]" />}
                      </button>
                    );
                  })}
                </div>
                {formData.subjects.includes("Other") && (
                  <input
                    type="text"
                    value={formData.otherSubject}
                    onChange={(e) => setFormData({ ...formData, otherSubject: e.target.value })}
                    placeholder="Specify other subject(s)..."
                    className="w-full mt-2 px-3.5 py-2 rounded-xl border border-[#E5DFD3] bg-[#FAF8F2] text-xs text-[#252525] outline-none focus:border-[#B89550]"
                  />
                )}
              </div>

              {/* Levels Checklist */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#252525] uppercase tracking-wider">
                  {isBn ? "শিক্ষার্থীর শ্রেণি / স্তর" : "Student Levels"}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {["Children", "Teens", "Adults", "Beginner", "Intermediate", "Advanced"].map((level) => {
                    const isChecked = formData.levels.includes(level);
                    return (
                      <button
                        type="button"
                        key={level}
                        onClick={() => handleToggleItem("levels", level)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold text-left border transition-all cursor-pointer flex items-center justify-between ${
                          isChecked
                            ? "bg-[#FAF8F2] border-[#B89550] text-[#252525] shadow-xs"
                            : "bg-white border-[#E5DFD3] text-[#595959] hover:bg-stone-50"
                        }`}
                      >
                        <span>{level}</span>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-[#B89550]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Languages Checklist */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#252525] uppercase tracking-wider">
                  {isBn ? "শিক্ষাদানের ভাষা" : "Languages Spoken / Taught"}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {["Bangla", "English", "Arabic", "Urdu", "Other"].map((lang) => {
                    const isChecked = formData.languages.includes(lang);
                    return (
                      <button
                        type="button"
                        key={lang}
                        onClick={() => handleToggleItem("languages", lang)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold text-left border transition-all cursor-pointer flex items-center justify-between ${
                          isChecked
                            ? "bg-[#FAF8F2] border-[#B89550] text-[#252525] shadow-xs"
                            : "bg-white border-[#E5DFD3] text-[#595959] hover:bg-stone-50"
                        }`}
                      >
                        <span>{lang}</span>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-[#B89550]" />}
                      </button>
                    );
                  })}
                </div>
                {formData.languages.includes("Other") && (
                  <input
                    type="text"
                    value={formData.otherLanguage}
                    onChange={(e) => setFormData({ ...formData, otherLanguage: e.target.value })}
                    placeholder="Specify other language(s)..."
                    className="w-full mt-2 px-3.5 py-2 rounded-xl border border-[#E5DFD3] bg-[#FAF8F2] text-xs text-[#252525] outline-none focus:border-[#B89550]"
                  />
                )}
              </div>

              {/* Employment Type & Start Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E5DFD3]">
                <div>
                  <label className="block text-xs font-bold text-[#252525] uppercase tracking-wider mb-1.5">
                    {isBn ? "কাজের ধরন *" : "Employment Type *"}
                  </label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] bg-[#FAF8F2] focus:bg-white focus:border-[#B89550] text-sm text-[#252525] outline-none font-medium"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Weekend">Weekend</option>
                    <option value="Substitute">Substitute</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#252525] uppercase tracking-wider mb-1.5">
                    {isBn ? "সম্ভাব্য যোগদানের তারিখ" : "Expected Start Date"}
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] bg-[#FAF8F2] focus:bg-white focus:border-[#B89550] text-sm text-[#252525] outline-none font-medium"
                  />
                </div>
              </div>

              {/* Availability Days & Time */}
              <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] space-y-3">
                <label className="block text-xs font-bold text-[#B89550] uppercase tracking-wider">
                  {isBn ? "উপলব্ধ দিন ও সময় *" : "Weekly Availability Days & Time *"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => {
                    const isSelected = formData.availability.days.includes(day);
                    return (
                      <button
                        type="button"
                        key={day}
                        onClick={() => handleToggleDay(day)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#B89550] text-white border-[#B89550] shadow-xs"
                            : "bg-white text-[#595959] border-[#E5DFD3] hover:bg-stone-50"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
                <div>
                  <label className="block text-[11px] text-[#595959] mb-1">
                    {isBn ? "উপলব্ধ সময় সীমা (ঘন্টা ও টাইমজোন)" : "Preferred Time Slot(s) & Time Zone"}
                  </label>
                  <input
                    type="text"
                    value={formData.availability.time}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availability: { ...formData.availability, time: e.target.value },
                      })
                    }
                    placeholder="e.g. 5:00 PM – 9:00 PM EST, Weekend mornings 9:00 AM – 1:00 PM"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E5DFD3] bg-white text-xs text-[#252525] outline-none focus:border-[#B89550]"
                  />
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* 5. REFERENCES                                                 */}
            {/* ------------------------------------------------------------- */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DFD3] shadow-sm space-y-6">
              <div className="border-b border-[#E5DFD3] pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#252525] flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] flex items-center justify-center text-xs font-bold">
                      5
                    </span>
                    <span>{isBn ? "রেফারেন্স (পরিচিত ব্যক্তিত্ব)" : "Professional References"}</span>
                  </h2>
                  <p className="text-xs text-[#595959] mt-0.5">
                    {isBn
                      ? "প্রাক্তন শিক্ষক, অধ্যক্ষ, আলেম বা কর্মক্ষেত্রের সহকর্মী"
                      : "Scholars, principals, community leaders or supervisors who can vouch for you"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddReference}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#B89550] bg-[#FAF8F2] hover:bg-[#B89550]/15 border border-[#B89550]/30 transition-all cursor-pointer shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isBn ? "রেফারেন্স যোগ করুন" : "Add Reference Row"}</span>
                </button>
              </div>

              {/* Dynamic Reference Rows */}
              <div className="space-y-3">
                {formData.references.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] relative space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#8C827A]">
                        {isBn ? `রেফারেন্স #${index + 1}` : `Reference #${index + 1}`}
                      </span>
                      {formData.references.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveReference(index)}
                          className="text-red-600 hover:text-red-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{isBn ? "মুছে ফেলুন" : "Remove"}</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] text-[#595959] mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleReferenceChange(index, "name", e.target.value)}
                          placeholder="e.g. Imam Ahmad"
                          className="w-full px-3 py-2 rounded-xl border border-[#E5DFD3] bg-white text-xs text-[#252525] outline-none focus:border-[#B89550]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#595959] mb-1">
                          Relationship
                        </label>
                        <input
                          type="text"
                          value={item.relation}
                          onChange={(e) => handleReferenceChange(index, "relation", e.target.value)}
                          placeholder="e.g. Former Principal"
                          className="w-full px-3 py-2 rounded-xl border border-[#E5DFD3] bg-white text-xs text-[#252525] outline-none focus:border-[#B89550]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#595959] mb-1">
                          Organization / Masjid
                        </label>
                        <input
                          type="text"
                          value={item.organization}
                          onChange={(e) => handleReferenceChange(index, "organization", e.target.value)}
                          placeholder="e.g. Islamic Academy"
                          className="w-full px-3 py-2 rounded-xl border border-[#E5DFD3] bg-white text-xs text-[#252525] outline-none focus:border-[#B89550]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#595959] mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={item.phone}
                          onChange={(e) => handleReferenceChange(index, "phone", e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-3 py-2 rounded-xl border border-[#E5DFD3] bg-white text-xs text-[#252525] outline-none focus:border-[#B89550]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* 6. APPLICANT DECLARATION & ELECTRONIC SIGNATURE               */}
            {/* ------------------------------------------------------------- */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DFD3] shadow-sm space-y-6">
              <div className="border-b border-[#E5DFD3] pb-3">
                <h2 className="text-base sm:text-lg font-bold text-[#252525] flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] flex items-center justify-center text-xs font-bold">
                    6
                  </span>
                  <span>{isBn ? "আবেদনকারী ঘোষণা ও ডিজিটাল স্বাক্ষর" : "Applicant Declaration & Signature"}</span>
                </h2>
                <p className="text-xs text-[#595959] mt-0.5">
                  {isBn
                    ? "আইনগত নিশ্চয়তা ও ডিজিটাল সত্যায়ন"
                    : "Legal affirmation and electronic authentication"}
                </p>
              </div>

              {/* Agreement Checkbox */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.applicantAgreement}
                    onChange={(e) => setFormData({ ...formData, applicantAgreement: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-[#E5DFD3] text-[#B89550] focus:ring-[#B89550] cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm text-[#252525] leading-relaxed">
                    {isBn
                      ? "আমি প্রত্যয়ন করছি যে এই আবেদনপত্রে প্রদত্ত সকল তথ্য আমার সর্বোত্তম জ্ঞান ও বিশ্বাস মতে সত্য, সম্পূর্ণ ও নির্ভুল। আমি স্বীকার করছি যে কোনো মিথ্যা বিবৃতি বা ইচ্ছাকৃত তথ্য গোপন আমার নিয়োগ বাতিল বা তাৎক্ষণিক বরখাস্তের কারণ হতে পারে।"
                      : "I hereby certify that all information submitted in this application is true, accurate, and complete to the best of my knowledge. I understand that any false statements, misrepresentations, or deliberate omissions may lead to disqualification from consideration or immediate termination of service."}
                  </span>
                </label>
              </div>

              {/* Signature & Date Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#252525] uppercase tracking-wider mb-1.5">
                    {isBn ? "আবেদনকারীর ডিজিটাল স্বাক্ষর *" : "Electronic Signature *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.signature}
                    onChange={(e) => setFormData({ ...formData, signature: e.target.value })}
                    placeholder="Type your full legal name as digital signature"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] bg-[#FAF8F2] focus:bg-white focus:border-[#B89550] text-sm text-[#252525] outline-none font-serif italic font-medium"
                  />
                  <span className="text-[11px] text-[#8C827A] mt-1 block">
                    {isBn
                      ? "আপনার পূর্ণ নাম টাইপ করে স্বাক্ষর সম্পন্ন করুন।"
                      : "Type your full legal name to execute this electronic signature."}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#252525] uppercase tracking-wider mb-1.5">
                    {isBn ? "স্বাক্ষরের তারিখ *" : "Signature Date *"}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.signatureDate}
                    onChange={(e) => setFormData({ ...formData, signatureDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] bg-[#FAF8F2] focus:bg-white focus:border-[#B89550] text-sm text-[#252525] outline-none font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Submission Actions */}
            <div className="p-6 rounded-3xl glass-panel flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Link
                href="/portal"
                className="btn-glass px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#595959] hover:text-[#252525] text-center"
              >
                {isBn ? "বাতিল করে মেম্বার পোর্টালে ফিরুন" : "Cancel & Return to Portal"}
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl text-sm font-bold shadow-md cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>{isBn ? "জমা দেওয়া হচ্ছে..." : "Submitting Application..."}</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>
                      {isBn
                        ? isReapplying
                          ? "আপডেট আবেদন জমা দিন"
                          : "শিক্ষক আবেদন জমা দিন"
                        : isReapplying
                        ? "Submit Updated Application"
                        : "Submit Official Teacher Application"}
                    </span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
