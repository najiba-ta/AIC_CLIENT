"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  GraduationCap,
  BookOpen,
  UserCheck,
  UserX,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCw,
  LogOut,
  ShieldCheck,
  Sparkles,
  Inbox,
  DollarSign,
  Users,
  Phone,
  Building,
  User,
  XCircle,
  FileText,
  X,
  Lock,
  Briefcase,
} from "lucide-react";

export default function AdminMembersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("pending-students"); // 'pending-students' | 'pending-teachers' | 'all'
  const [applications, setApplications] = useState([]);
  const [pendingStudents, setPendingStudents] = useState([]);
  const [pendingTeachers, setPendingTeachers] = useState([]);
  const [counts, setCounts] = useState({
    pendingStudents: 0,
    pendingTeachers: 0,
    approvedStudents: 0,
    approvedTeachers: 0,
    rejectedTotal: 0,
  });
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [adminEmail, setAdminEmail] = useState("Admin");
  const [selectedAdmissionModal, setSelectedAdmissionModal] = useState(null);

  const fetchApplications = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        ...(search ? { search } : {}),
      });

      const res = await fetch(`/api/admin/applications?${params.toString()}`, {
        credentials: "include",
      });

      const data = await res.json();

      if (res.status === 401 && data?.error?.includes("Admin authentication required")) {
        router.replace("/admin/login");
        return;
      }

      if (res.ok) {
        const all = data.applications || [];
        setApplications(all);
        setPendingStudents(all.filter((a) => a.role === "student" && a.status === "pending"));
        setPendingTeachers(all.filter((a) => a.role === "teacher" && a.status === "pending"));
        if (data.counts) {
          setCounts(data.counts);
        }
      } else {
        setFeedback({
          type: "error",
          message: data?.error || data?.message || "Failed to load applications from server.",
        });
      }
    } catch (err) {
      console.error("[Admin Applications Fetch Error]", err);
      setFeedback({
        type: "error",
        message: "Network error loading applications. Please refresh.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [search, router]);

  useEffect(() => {
    async function initAdmin() {
      try {
        const res = await fetch("/api/admin/me", {
          credentials: "include",
        });
        if (res.status === 401) {
          router.replace("/admin/login");
          return;
        }
        const data = await res.json();
        if (data?.email) setAdminEmail(data.email);
      } catch {
        // ignore
      }
      fetchApplications();
    }
    initAdmin();
  }, [fetchApplications, router]);

  const handleApprove = async (userId, userName) => {
    setActionLoading((prev) => ({ ...prev, [userId]: "approve" }));
    setFeedback(null);

    try {
      const res = await fetch(`/api/admin/applications/${userId}/approve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const assignedId = data.user?.memberId || "Approved";
        setFeedback({
          type: "success",
          message: `${userName || "Applicant"} approved successfully! Assigned official ID: ${assignedId}`,
        });
        if (selectedAdmissionModal && (selectedAdmissionModal.id === userId || selectedAdmissionModal._id === userId)) {
          setSelectedAdmissionModal(null);
        }
        await fetchApplications();
      } else {
        setFeedback({
          type: "error",
          message: data?.message || data?.error || "Failed to approve application.",
        });
      }
    } catch (err) {
      setFeedback({ type: "error", message: err?.message || "Network error occurred during approval." });
    } finally {
      setActionLoading((prev) => ({ ...prev, [userId]: null }));
    }
  };

  const handleReject = async (userId, userName, customReason) => {
    let reason = customReason;
    if (reason === undefined && typeof window !== "undefined") {
      const promptRes = window.prompt(
        `Enter rejection reason for ${userName || "applicant"} (optional):`,
        "Incomplete or unverified admission information"
      );
      if (promptRes === null) return;
      reason = promptRes.trim() || "Incomplete or unverified admission information";
    }

    setActionLoading((prev) => ({ ...prev, [userId]: "reject" }));
    setFeedback(null);

    try {
      const res = await fetch(`/api/admin/applications/${userId}/reject`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: reason || "Verification criteria not met" }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback({
          type: "success",
          message: `${userName || "Applicant"} application was rejected.`,
        });
        if (selectedAdmissionModal && (selectedAdmissionModal.id === userId || selectedAdmissionModal._id === userId)) {
          setSelectedAdmissionModal(null);
        }
        await fetchApplications();
      } else {
        setFeedback({
          type: "error",
          message: data?.message || data?.error || "Failed to reject application.",
        });
      }
    } catch (err) {
      setFeedback({ type: "error", message: err?.message || "Network error occurred during rejection." });
    } finally {
      setActionLoading((prev) => ({ ...prev, [userId]: null }));
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // ignore
    } finally {
      router.refresh();
      router.replace("/admin/login");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };

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

  return (
    <div className="min-h-screen bg-[#FAF8F2] text-[#252525] py-8 sm:py-12 px-3.5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header & Navigation Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-[#E5DFD3] shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#FAF8F2] border border-[#B89550]/40 flex items-center justify-center text-[#B89550] shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-[#252525]">
                  Member Verification Portal
                </h1>
                <span className="px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#B89550] bg-[#FAF8F2] border border-[#B89550]/30 rounded-full">
                  Admin
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#595959]">
                Review Student & Teacher registrations and assign official server-generated IDs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm text-[#595959] hidden sm:inline">
              Logged in as: <strong className="text-[#252525]">{adminEmail}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[#595959] hover:text-red-700 bg-[#FAF8F2] hover:bg-red-50 border border-[#E5DFD3] hover:border-red-200 rounded-xl transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-[#E5DFD3] pb-3">
          <Link
            href="/admin/donations"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#595959] hover:text-[#252525] hover:bg-white border border-transparent transition-all"
          >
            <DollarSign className="w-4 h-4 text-[#8C827A]" />
            <span>Stripe Donations</span>
          </Link>

          <Link
            href="/admin/members"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#B89550] bg-white border border-[#E5DFD3] shadow-xs transition-all"
          >
            <Users className="w-4 h-4 text-[#B89550]" />
            <span>Member Verifications & IDs</span>
            {(pendingStudents.length + pendingTeachers.length) > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                {pendingStudents.length + pendingTeachers.length} pending
              </span>
            )}
          </Link>

          <Link
            href="/admin/teacher-applications"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#595959] hover:text-[#252525] hover:bg-white border border-transparent transition-all"
          >
            <BookOpen className="w-4 h-4 text-[#8C827A]" />
            <span>Teacher Applications</span>
          </Link>

          <Link
            href="/admin/team"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#595959] hover:text-[#252525] hover:bg-white border border-transparent transition-all"
          >
            <Briefcase className="w-4 h-4 text-[#8C827A]" />
            <span>Leadership & Team</span>
          </Link>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-white border border-amber-300/80 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                  Pending Students
                </p>
                <h3 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-amber-900">
                  {counts.pendingStudents ?? pendingStudents.length}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-2 text-xs text-amber-700/80">Awaiting ID generation (e.g. AIC-STU-001)</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-amber-300/80 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                  Pending Teachers
                </p>
                <h3 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-amber-900">
                  {counts.pendingTeachers ?? pendingTeachers.length}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-2 text-xs text-amber-700/80">Awaiting ID generation (e.g. AIC-TEA-001)</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-emerald-300/80 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                  Approved Members
                </p>
                <h3 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-emerald-900">
                  {(counts.approvedStudents || 0) + (counts.approvedTeachers || 0)}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-2 text-xs text-emerald-700/80">
              {counts.approvedStudents || 0} Students • {counts.approvedTeachers || 0} Teachers
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E5DFD3] shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#595959] uppercase tracking-wider">
                  Total Registrations
                </p>
                <h3 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-[#252525]">
                  {applications.length}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F2] text-[#B89550] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-2 text-xs text-[#8C827A]">Recorded in MongoDB database</p>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`p-4 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2.5 ${
            feedback.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}>
            {feedback.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Sub-Queue Switcher: Separate Pending Students vs Separate Pending Teachers vs All Directory */}
        <div className="p-2 rounded-2xl bg-white border border-[#E5DFD3] shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* Pending Students Tab */}
            <button
              onClick={() => setActiveTab("pending-students")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "pending-students"
                  ? "bg-[#B89550] text-white shadow-sm"
                  : "text-[#595959] hover:text-[#252525] hover:bg-[#FAF8F2]"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Pending Students</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === "pending-students"
                  ? "bg-white text-[#B89550]"
                  : "bg-amber-100 text-amber-900 border border-amber-300"
              }`}>
                {pendingStudents.length}
              </span>
            </button>

            {/* Pending Teachers Tab */}
            <button
              onClick={() => setActiveTab("pending-teachers")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "pending-teachers"
                  ? "bg-[#B89550] text-white shadow-sm"
                  : "text-[#595959] hover:text-[#252525] hover:bg-[#FAF8F2]"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Pending Teachers</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === "pending-teachers"
                  ? "bg-white text-[#B89550]"
                  : "bg-amber-100 text-amber-900 border border-amber-300"
              }`}>
                {pendingTeachers.length}
              </span>
            </button>

            {/* All Applications Tab */}
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-[#B89550] text-white shadow-sm"
                  : "text-[#595959] hover:text-[#252525] hover:bg-[#FAF8F2]"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>All Registrations & History</span>
            </button>
          </div>

          {/* Search & Refresh */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
              <input
                type="text"
                placeholder="Search name, email, ID..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3] text-xs sm:text-sm text-[#252525] placeholder-[#8C827A] focus:outline-none focus:border-[#B89550]"
              />
            </form>
            <button
              onClick={fetchApplications}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-[#252525] bg-[#FAF8F2] hover:bg-[#F1EDE3] border border-[#E5DFD3] rounded-xl transition-all cursor-pointer shrink-0"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* VIEW 1: SEPARATE PENDING STUDENTS QUEUE                            */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === "pending-students" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#252525] flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#B89550]" />
                  <span>Pending Student Verification Queue</span>
                </h2>
                <p className="text-xs text-[#595959]">
                  Review applicant details and click Accept to trigger sequential student ID generation (e.g. AIC-STU-001)
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-[#E5DFD3] animate-pulse text-[#595959] text-sm">
                Loading pending students...
              </div>
            ) : pendingStudents.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-[#E5DFD3] space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF8F2] text-[#B89550] flex items-center justify-center mx-auto">
                  <Inbox className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#252525]">No pending student applications</h3>
                <p className="text-xs text-[#595959]">All student applications have been processed and verified.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {pendingStudents.map((student) => {
                  const isApproving = actionLoading[student.id || student._id] === "approve";
                  const isRejecting = actionLoading[student.id || student._id] === "reject";

                  return (
                    <div
                      key={student.id || student._id}
                      className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5DFD3] shadow-sm hover:shadow-md transition-all space-y-4"
                    >
                      {/* Student Card Top Info */}
                      <div className="flex items-start gap-3.5">
                        <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#B89550]/40 shrink-0 bg-[#FAF8F2]">
                          <Image
                            src={student.profileImage || student.profilePicture || student.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"}
                            alt={student.name}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-bold text-[#252525] text-base truncate">{student.name}</h3>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                              Pending
                            </span>
                          </div>
                          <p className="text-xs text-[#595959] truncate">{student.email}</p>
                          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#8C827A]">
                            <Clock className="w-3 h-3" />
                            <span>Registered: {formatDate(student.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Student Relevant Registration Information */}
                      <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3] text-xs">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C827A] block">
                            Grade / Class Level
                          </span>
                          <span className="font-semibold text-[#252525] truncate block">
                            {student.classLevel || student.department || "General"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C827A] block">
                            Guardian Name
                          </span>
                          <span className="font-semibold text-[#252525] truncate block">
                            {student.guardianName || "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C827A] block">
                            Contact Phone
                          </span>
                          <span className="font-semibold text-[#252525] truncate block">
                            {student.guardianPhone || student.phone || "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C827A] block">
                            Target ID Format
                          </span>
                          <span className="font-mono font-bold text-[#B89550] block">
                            AIC-STU-XXX
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-[#E5DFD3]">
                        <div>
                          {student.admissionForm ? (
                            <button
                              type="button"
                              onClick={() => setSelectedAdmissionModal(student)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#B89550] bg-[#FAF8F2] hover:bg-[#B89550]/15 border border-[#B89550]/30 transition-all cursor-pointer shadow-2xs"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>View Admission Form</span>
                            </button>
                          ) : (
                            <span className="text-[11px] text-[#8C827A] italic px-2 py-1 rounded bg-[#FAF8F2]">
                              Admission Form: Not Submitted
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleReject(student.id || student._id, student.name)}
                            disabled={isApproving || isRejecting}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-all cursor-pointer disabled:opacity-50"
                          >
                            {isRejecting ? "Rejecting..." : "Reject"}
                          </button>

                          <button
                            onClick={() => handleApprove(student.id || student._id, student.name)}
                            disabled={isApproving || isRejecting}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#B89550] hover:bg-[#A58342] shadow-xs transition-all cursor-pointer disabled:opacity-50"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>{isApproving ? "Accepting..." : "Accept & Generate ID"}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* VIEW 2: SEPARATE PENDING TEACHERS QUEUE                            */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === "pending-teachers" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#252525] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#B89550]" />
                  <span>Pending Teacher / Scholar Verification Queue</span>
                </h2>
                <p className="text-xs text-[#595959]">
                  Review scholar credentials and click Accept to trigger sequential teacher ID generation (e.g. AIC-TEA-001)
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-[#E5DFD3] animate-pulse text-[#595959] text-sm">
                Loading pending teachers...
              </div>
            ) : pendingTeachers.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-[#E5DFD3] space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF8F2] text-[#B89550] flex items-center justify-center mx-auto">
                  <Inbox className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#252525]">No pending teacher applications</h3>
                <p className="text-xs text-[#595959]">All teacher registrations have been processed.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {pendingTeachers.map((teacher) => {
                  const isApproving = actionLoading[teacher.id || teacher._id] === "approve";
                  const isRejecting = actionLoading[teacher.id || teacher._id] === "reject";

                  return (
                    <div
                      key={teacher.id || teacher._id}
                      className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5DFD3] shadow-sm hover:shadow-md transition-all space-y-4"
                    >
                      {/* Teacher Card Top Info */}
                      <div className="flex items-start gap-3.5">
                        <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#B89550]/40 shrink-0 bg-[#FAF8F2]">
                          <Image
                            src={teacher.profileImage || teacher.profilePicture || teacher.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"}
                            alt={teacher.name}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-bold text-[#252525] text-base truncate">{teacher.name}</h3>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                              Pending
                            </span>
                          </div>
                          <p className="text-xs text-[#595959] truncate">{teacher.email}</p>
                          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#8C827A]">
                            <Clock className="w-3 h-3" />
                            <span>Registered: {formatDate(teacher.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Teacher Relevant Registration Information */}
                      <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3] text-xs">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C827A] block">
                            Subject / Specialization
                          </span>
                          <span className="font-semibold text-[#252525] truncate block">
                            {teacher.subject || teacher.department || "Islamic Studies"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C827A] block">
                            Academic Qualification
                          </span>
                          <span className="font-semibold text-[#252525] truncate block">
                            {teacher.qualification || "Educator"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C827A] block">
                            Phone Number
                          </span>
                          <span className="font-semibold text-[#252525] truncate block">
                            {teacher.phone || "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C827A] block">
                            Target ID Format
                          </span>
                          <span className="font-mono font-bold text-[#B89550] block">
                            AIC-TEA-XXX
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-[#E5DFD3]">
                        <Link
                          href={`/admin/teacher-applications?search=${encodeURIComponent(teacher.email || teacher.name || "")}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#B89550] bg-[#FAF8F2] hover:bg-[#B89550]/15 border border-[#B89550]/30 transition-all cursor-pointer shadow-2xs"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Teacher Application</span>
                        </Link>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleReject(teacher.id || teacher._id, teacher.name)}
                            disabled={isApproving || isRejecting}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-all cursor-pointer disabled:opacity-50"
                          >
                            {isRejecting ? "Rejecting..." : "Reject"}
                          </button>

                          <button
                            onClick={() => handleApprove(teacher.id || teacher._id, teacher.name)}
                            disabled={isApproving || isRejecting}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#B89550] hover:bg-[#A58342] shadow-xs transition-all cursor-pointer disabled:opacity-50"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>{isApproving ? "Accepting..." : "Accept & Generate ID"}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* VIEW 3: ALL REGISTRATIONS & VERIFICATION DIRECTORY                  */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === "all" && (
          <div className="relative rounded-2xl bg-white border border-[#E5DFD3] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#252525]">
                <thead className="text-xs uppercase tracking-wider text-[#B89550] bg-[#F1EDE3] border-b border-[#E5DFD3]">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-bold">Applicant / Member</th>
                    <th scope="col" className="px-5 py-4 font-bold">Role & Details</th>
                    <th scope="col" className="px-5 py-4 font-bold">Assigned Member ID</th>
                    <th scope="col" className="px-5 py-4 font-bold">Verification Status</th>
                    <th scope="col" className="px-5 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DFD3] font-normal">
                  {isLoading ? (
                    [...Array(4)].map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="px-5 py-4"><div className="h-5 w-40 bg-[#F1EDE3] rounded" /></td>
                        <td className="px-5 py-4"><div className="h-5 w-28 bg-[#F1EDE3] rounded" /></td>
                        <td className="px-5 py-4"><div className="h-5 w-24 bg-[#F1EDE3] rounded" /></td>
                        <td className="px-5 py-4"><div className="h-5 w-20 bg-[#F1EDE3] rounded" /></td>
                        <td className="px-5 py-4"><div className="h-5 w-32 bg-[#F1EDE3] rounded ml-auto" /></td>
                      </tr>
                    ))
                  ) : applications.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-5 py-12 text-center text-[#595959]">
                        <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                          <Inbox className="w-8 h-8 text-[#B89550] mb-2" />
                          <h4 className="text-base font-semibold text-[#252525]">No member registrations found</h4>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    applications.map((app) => {
                      const isApproving = actionLoading[app.id || app._id] === "approve";
                      const isRejecting = actionLoading[app.id || app._id] === "reject";

                      return (
                        <tr key={app.id || app._id} className="hover:bg-[#FAF8F2]/60 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#B89550]/40 shrink-0 bg-[#FAF8F2]">
                                <Image
                                  src={app.profileImage || app.profilePicture || app.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"}
                                  alt={app.name}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="font-bold text-[#252525] truncate">{app.name}</span>
                                <span className="text-xs text-[#595959] truncate">{app.email}</span>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex flex-col">
                              <span className="inline-flex items-center gap-1 text-xs font-bold capitalize text-[#252525]">
                                {app.role === "teacher" ? (
                                  <BookOpen className="w-3.5 h-3.5 text-[#B89550]" />
                                ) : (
                                  <GraduationCap className="w-3.5 h-3.5 text-[#B89550]" />
                                )}
                                <span>{app.role}</span>
                              </span>
                              <span className="text-xs text-[#595959] truncate">
                                {app.subject || app.classLevel || app.department || "General"}
                              </span>
                            </div>
                          </td>

                          <td className="px-5 py-4 whitespace-nowrap">
                            {app.memberId ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FAF8F2] border border-[#B89550]/50 font-mono font-bold text-xs text-[#B89550] shadow-2xs">
                                <Sparkles className="w-3.5 h-3.5 text-[#B89550]" />
                                <span>{app.memberId}</span>
                              </span>
                            ) : (
                              <span className="text-xs text-[#8C827A] italic">
                                {app.status === "rejected" ? "None (Rejected)" : "Unassigned (Pending)"}
                              </span>
                            )}
                          </td>

                          <td className="px-5 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                              app.status === "approved"
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                : app.status === "pending"
                                ? "bg-amber-50 text-amber-800 border border-amber-200"
                                : "bg-red-50 text-red-800 border border-red-200"
                            }`}>
                              {app.status === "approved" && <CheckCircle2 className="w-3 h-3" />}
                              {app.status === "pending" && <Clock className="w-3 h-3" />}
                              {app.status === "rejected" && <XCircle className="w-3 h-3" />}
                              <span>{app.status}</span>
                            </span>
                          </td>

                          <td className="px-5 py-4 whitespace-nowrap text-right">
                            <div className="inline-flex items-center gap-2">
                              {app.status !== "approved" && (
                                <button
                                  onClick={() => handleApprove(app.id || app._id, app.name)}
                                  disabled={isApproving || isRejecting}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-xs cursor-pointer disabled:opacity-50"
                                >
                                  <UserCheck className="w-3.5 h-3.5" />
                                  <span>{isApproving ? "Accepting..." : "Accept"}</span>
                                </button>
                              )}

                              {app.status !== "rejected" && (
                                <button
                                  onClick={() => handleReject(app.id || app._id, app.name)}
                                  disabled={isApproving || isRejecting}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-red-50 border border-red-200 text-red-700 font-semibold text-xs transition-all cursor-pointer disabled:opacity-50"
                                >
                                  <UserX className="w-3.5 h-3.5" />
                                  <span>{isRejecting ? "Rejecting..." : "Reject"}</span>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Full Student Admission Form Review Modal */}
        {selectedAdmissionModal && (() => {
          const form = selectedAdmissionModal.admissionForm || {};
          const studentInfo = form.studentInfo || {};
          const parentInfo = form.parentInfo || {};
          const programSelection = form.programSelection || {};
          const schedulePreference = form.schedulePreference || {};
          const learningInfo = form.learningInfo || {};
          const agreement = form.agreement || {};

          // Helper to check track selection across both boolean object and array formats
          const isTrackSelected = (category, trackKey, trackLabel) => {
            if (!category) return false;
            if (Array.isArray(category)) {
              return category.some(
                (item) =>
                  String(item).trim().toLowerCase() === trackKey.toLowerCase() ||
                  String(item).trim().toLowerCase() === trackLabel.toLowerCase()
              );
            }
            if (typeof category === "object") {
              return !!category[trackKey];
            }
            return false;
          };

          // Safe days formatter
          const getDaysDisplay = (days) => {
            if (!days) return "N/A";
            if (Array.isArray(days)) return days.length > 0 ? days.join(", ") : "N/A";
            if (typeof days === "string") return days.trim() || "N/A";
            return "N/A";
          };

          return (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#E5DFD3] max-h-[90vh] flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
                
                {/* Modal Header */}
                <div className="p-5 sm:p-6 border-b border-[#E5DFD3] flex items-center justify-between bg-[#FAF8F2]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#B89550]/40 flex items-center justify-center text-[#B89550] shadow-xs">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#252525]">
                        Student Admission Form Review
                      </h3>
                      <p className="text-xs text-[#595959]">
                        Applicant: <strong className="text-[#252525]">{studentInfo.fullName || selectedAdmissionModal.name}</strong> ({parentInfo.email || selectedAdmissionModal.email})
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedAdmissionModal(null)}
                    className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 border border-[#E5DFD3] flex items-center justify-center text-[#595959] hover:text-[#252525] transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Modal Body (Scrollable) */}
                <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
                  
                  {/* 1. Student Information */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#252525] uppercase tracking-wider text-xs flex items-center gap-2 pb-1.5 border-b border-[#E5DFD3]">
                      <span className="w-5 h-5 rounded-md bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] flex items-center justify-center text-[11px] font-bold">1</span>
                      <span>Student Information</span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3]">
                      <div>
                        <span className="text-[#8C827A] text-[11px] block">Full Name:</span>
                        <strong className="text-[#252525]">{studentInfo.fullName || selectedAdmissionModal.name}</strong>
                      </div>
                      <div>
                        <span className="text-[#8C827A] text-[11px] block">Date of Birth:</span>
                        <strong className="text-[#252525]">{studentInfo.dateOfBirth || "N/A"}</strong>
                      </div>
                      <div>
                        <span className="text-[#8C827A] text-[11px] block">Age & Gender:</span>
                        <strong className="text-[#252525]">
                          {studentInfo.age ? `${studentInfo.age} yrs` : "N/A"} • {studentInfo.gender || selectedAdmissionModal.gender || "N/A"}
                        </strong>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-[#8C827A] text-[11px] block">Home Address:</span>
                        <span className="text-[#252525] font-medium">{studentInfo.homeAddress || selectedAdmissionModal.address || "N/A"}</span>
                      </div>
                      <div>
                        <span className="text-[#8C827A] text-[11px] block">City / State / ZIP:</span>
                        <span className="text-[#252525] font-medium">{studentInfo.cityStateZip || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  {/* 2. Parent / Guardian Information */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#252525] uppercase tracking-wider text-xs flex items-center gap-2 pb-1.5 border-b border-[#E5DFD3]">
                      <span className="w-5 h-5 rounded-md bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] flex items-center justify-center text-[11px] font-bold">2</span>
                      <span>Parent / Guardian Information</span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3]">
                      <div>
                        <span className="text-[#8C827A] text-[11px] block">Guardian Name:</span>
                        <strong className="text-[#252525]">{parentInfo.guardianName || selectedAdmissionModal.guardianName || "N/A"}</strong>
                      </div>
                      <div>
                        <span className="text-[#8C827A] text-[11px] block">Phone / WhatsApp:</span>
                        <strong className="text-[#252525]">{parentInfo.phoneWhatsApp || selectedAdmissionModal.phone || "N/A"}</strong>
                      </div>
                      <div>
                        <span className="text-[#8C827A] text-[11px] block">Email:</span>
                        <span className="text-[#252525] font-medium">{parentInfo.email || selectedAdmissionModal.email}</span>
                      </div>
                      <div className="sm:col-span-3">
                        <span className="text-[#8C827A] text-[11px] block">Emergency Contact Name & Phone:</span>
                        <span className="text-[#252525] font-medium">{parentInfo.emergencyContact || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. Program Selection */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#252525] uppercase tracking-wider text-xs flex items-center gap-2 pb-1.5 border-b border-[#E5DFD3]">
                      <span className="w-5 h-5 rounded-md bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] flex items-center justify-center text-[11px] font-bold">3</span>
                      <span>Program Selection & Current Level</span>
                    </h4>
                    <div className="p-3.5 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] space-y-3">
                      <div className="grid grid-cols-2 gap-3 pb-2 border-b border-[#E5DFD3]">
                        <div>
                          <span className="text-[#8C827A] text-[11px] block">Class Type:</span>
                          <strong className="text-[#B89550]">{programSelection.classType || "One-on-One"}</strong>
                        </div>
                        <div>
                          <span className="text-[#8C827A] text-[11px] block">Current Quran Level:</span>
                          <strong className="text-[#252525]">{programSelection.currentQuranLevel || programSelection.currentLevel || "N/A"}</strong>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[#8C827A] text-[11px] font-semibold block">Selected Subjects / Tracks:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {/* Quran Reading */}
                          {isTrackSelected(programSelection.quranReading, "qaida", "Qaida") && (
                            <span className="px-2 py-0.5 rounded-md bg-white border border-[#E5DFD3] text-[#252525] text-xs font-medium">Qaida</span>
                          )}
                          {isTrackSelected(programSelection.quranReading, "fluentReading", "Fluent Reading") && (
                            <span className="px-2 py-0.5 rounded-md bg-white border border-[#E5DFD3] text-[#252525] text-xs font-medium">Fluent Reading</span>
                          )}
                          {isTrackSelected(programSelection.quranReading, "tajweed", "Tajweed") && (
                            <span className="px-2 py-0.5 rounded-md bg-white border border-[#E5DFD3] text-[#252525] text-xs font-medium">Tajweed</span>
                          )}
                          {isTrackSelected(programSelection.quranReading, "correctPronunciation", "Correct Pronunciation") && (
                            <span className="px-2 py-0.5 rounded-md bg-white border border-[#E5DFD3] text-[#252525] text-xs font-medium">Correct Pronunciation</span>
                          )}
                          {/* Hifz */}
                          {isTrackSelected(programSelection.hifzulQuran, "memorization", "Memorization") && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold">Hifz Memorization</span>
                          )}
                          {isTrackSelected(programSelection.hifzulQuran, "revision", "Revision") && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold">Hifz Revision</span>
                          )}
                          {isTrackSelected(programSelection.hifzulQuran, "stepByStepGuidance", "Step-by-Step Guidance") && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold">Step-by-Step Guidance</span>
                          )}
                          {/* Islamic Studies */}
                          {isTrackSelected(programSelection.islamicStudies, "aqeedah", "Aqeedah") && (
                            <span className="px-2 py-0.5 rounded-md bg-white border border-[#E5DFD3] text-[#252525] text-xs font-medium">Aqeedah</span>
                          )}
                          {isTrackSelected(programSelection.islamicStudies, "fiqh", "Fiqh") && (
                            <span className="px-2 py-0.5 rounded-md bg-white border border-[#E5DFD3] text-[#252525] text-xs font-medium">Fiqh</span>
                          )}
                          {isTrackSelected(programSelection.islamicStudies, "seerah", "Seerah") && (
                            <span className="px-2 py-0.5 rounded-md bg-white border border-[#E5DFD3] text-[#252525] text-xs font-medium">Seerah</span>
                          )}
                          {isTrackSelected(programSelection.islamicStudies, "islamicHistory", "Islamic History") && (
                            <span className="px-2 py-0.5 rounded-md bg-white border border-[#E5DFD3] text-[#252525] text-xs font-medium">Islamic History</span>
                          )}
                          {isTrackSelected(programSelection.islamicStudies, "mannersCharacter", "Manners & Character") && (
                            <span className="px-2 py-0.5 rounded-md bg-white border border-[#E5DFD3] text-[#252525] text-xs font-medium">Manners & Character</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4. Schedule Preference */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#252525] uppercase tracking-wider text-xs flex items-center gap-2 pb-1.5 border-b border-[#E5DFD3]">
                      <span className="w-5 h-5 rounded-md bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] flex items-center justify-center text-[11px] font-bold">4</span>
                      <span>Schedule Preference</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3]">
                      <div>
                        <span className="text-[#8C827A] text-[11px] block">Preferred Days:</span>
                        <strong className="text-[#252525]">
                          {getDaysDisplay(schedulePreference.preferredDays)}
                        </strong>
                      </div>
                      <div>
                        <span className="text-[#8C827A] text-[11px] block">Preferred Time:</span>
                        <strong className="text-[#252525]">
                          {schedulePreference.preferredTime || "N/A"}
                        </strong>
                      </div>
                      <div>
                        <span className="text-[#8C827A] text-[11px] block">Alternative Time:</span>
                        <span className="text-[#252525] font-medium">
                          {schedulePreference.alternativeTime || "None"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 5. Learning Information */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#252525] uppercase tracking-wider text-xs flex items-center gap-2 pb-1.5 border-b border-[#E5DFD3]">
                      <span className="w-5 h-5 rounded-md bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] flex items-center justify-center text-[11px] font-bold">5</span>
                      <span>Learning Background & Notes</span>
                    </h4>
                    <div className="p-3.5 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] space-y-2">
                      <div className="grid grid-cols-2 gap-3 pb-2 border-b border-[#E5DFD3]">
                        <div>
                          <span className="text-[#8C827A] text-[11px] block">Previous Experience:</span>
                          <span className="text-[#252525] font-medium">{learningInfo.previousExperience || learningInfo.experience || "None reported"}</span>
                        </div>
                        <div>
                          <span className="text-[#8C827A] text-[11px] block">Previous Institute/Teacher:</span>
                          <span className="text-[#252525] font-medium">{learningInfo.teacherInstitute || "None reported"}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[#8C827A] text-[11px] block">Special Learning Needs or Notes:</span>
                        <p className="text-[#252525] italic">{learningInfo.learningNeedsNotes || learningInfo.learningNeeds || "None provided"}</p>
                      </div>
                    </div>
                  </div>

                  {/* 6. Parent / Guardian Agreement */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#252525] uppercase tracking-wider text-xs flex items-center gap-2 pb-1.5 border-b border-[#E5DFD3]">
                      <span className="w-5 h-5 rounded-md bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] flex items-center justify-center text-[11px] font-bold">6</span>
                      <span>Parent / Guardian Agreement</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3]">
                      <div>
                        <span className="text-[#8C827A] text-[11px] block">Digital Signature:</span>
                        <strong className="text-[#252525] font-serif italic text-base">
                          {agreement.signature || agreement.parentSignature || "Signed Digitally"}
                        </strong>
                      </div>
                      <div>
                        <span className="text-[#8C827A] text-[11px] block">Submission Date:</span>
                        <strong className="text-[#252525]">
                          {agreement.date || (selectedAdmissionModal.createdAt ? formatDate(selectedAdmissionModal.createdAt) : "N/A")}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* 7. FOR OFFICE USE ONLY */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F2] border-2 border-dashed border-[#B89550]/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#B89550] uppercase tracking-wider flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" /> FOR OFFICE USE ONLY
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        selectedAdmissionModal.status === "approved"
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          : selectedAdmissionModal.status === "rejected"
                          ? "bg-red-100 text-red-900 border border-red-300"
                          : "bg-amber-100 text-amber-900 border border-amber-300"
                      }`}>
                        Admission Status: {selectedAdmissionModal.status || "Pending"}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                      <div className="p-2 rounded bg-white border border-[#E5DFD3]">
                        <span className="text-[#8C827A] block">Target ID Format</span>
                        <span className="font-mono font-bold text-[#B89550]">
                          {selectedAdmissionModal.memberId || "AIC-STU-XXX"}
                        </span>
                      </div>
                      <div className="p-2 rounded bg-white border border-[#E5DFD3]">
                        <span className="text-[#8C827A] block">Admin Reviewer</span>
                        <span className="font-medium text-[#252525]">{adminEmail}</span>
                      </div>
                      <div className="p-2 rounded bg-white border border-[#E5DFD3]">
                        <span className="text-[#8C827A] block">Review Date</span>
                        <span className="font-medium text-[#252525]">{new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="p-2 rounded bg-white border border-[#E5DFD3]">
                        <span className="text-[#8C827A] block">Teacher Assign</span>
                        <span className="text-[#8C827A] italic">
                          {selectedAdmissionModal.status === "approved" ? "Assigned" : "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Modal Footer with Actions */}
                <div className="p-5 border-t border-[#E5DFD3] flex items-center justify-between bg-[#FAF8F2]">
                  <button
                    type="button"
                    onClick={() => setSelectedAdmissionModal(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#595959] hover:text-[#252525] bg-white border border-[#E5DFD3] transition-all cursor-pointer"
                  >
                    Close
                  </button>

                  <div className="flex items-center gap-2.5">
                    {selectedAdmissionModal.status !== "rejected" && (
                      <button
                        type="button"
                        onClick={() =>
                          handleReject(
                            selectedAdmissionModal.id || selectedAdmissionModal._id,
                            selectedAdmissionModal.name
                          )
                        }
                        className="px-4 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-all cursor-pointer"
                      >
                        Reject Application
                      </button>
                    )}

                    {selectedAdmissionModal.status !== "approved" && (
                      <button
                        type="button"
                        onClick={() =>
                          handleApprove(
                            selectedAdmissionModal.id || selectedAdmissionModal._id,
                            selectedAdmissionModal.name
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#B89550] hover:bg-[#A58342] shadow-sm transition-all cursor-pointer"
                      >
                        <UserCheck className="w-4 h-4" />
                        <span>Approve & Assign ID</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
}
