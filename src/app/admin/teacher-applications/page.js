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
  Briefcase,
  Award,
  Languages,
  Calendar,
  Lock,
  RotateCcw,
} from "lucide-react";

export default function AdminTeacherApplicationsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("pending"); // 'pending' | 'approved' | 'rejected' | 'all'
  const [applications, setApplications] = useState([]);
  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [selectedAppModal, setSelectedAppModal] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [adminEmail, setAdminEmail] = useState("Administrator");

  // Fetch teacher applications from BFF
  const fetchApplications = useCallback(async () => {
    setIsLoading(true);
    setFeedback(null);
    try {
      const query = new URLSearchParams();
      if (activeTab && activeTab !== "all") query.set("status", activeTab);
      if (search) query.set("search", search);

      const res = await fetch(`/api/admin/teacher-applications?${query.toString()}`, {
        credentials: "include",
      });

      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const data = await res.json();

      if (res.ok && data?.applications) {
        setApplications(data.applications);
        if (data.counts) {
          setCounts(data.counts);
        }
      } else {
        setFeedback({
          type: "error",
          message: data?.error || data?.message || "Failed to load teacher applications.",
        });
      }
    } catch (err) {
      console.error("[Teacher Applications Fetch Error]", err);
      setFeedback({
        type: "error",
        message: "Network error loading applications. Please refresh the page.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, search, router]);

  useEffect(() => {
    async function initAdmin() {
      try {
        const res = await fetch("/api/admin/me", { credentials: "include" });
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

  // Handle Approve
  const handleApprove = async (appId, teacherName) => {
    setActionLoading((prev) => ({ ...prev, [appId]: "approve" }));
    setFeedback(null);

    try {
      const res = await fetch(`/api/admin/teacher-applications/${appId}/approve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const assignedId = data.application?.teacherId || data.teacher?.memberId || "Approved";
        setFeedback({
          type: "success",
          message: `${teacherName || "Applicant"} approved successfully! Generated Official Teacher ID: ${assignedId}`,
        });

        if (selectedAppModal && selectedAppModal._id === appId) {
          setSelectedAppModal({
            ...selectedAppModal,
            status: "approved",
            teacherId: assignedId,
            reviewedAt: new Date(),
          });
        }
        await fetchApplications();
      } else {
        setFeedback({
          type: "error",
          message: data?.error || data?.message || "Failed to approve teacher application.",
        });
      }
    } catch (err) {
      setFeedback({ type: "error", message: err?.message || "Network error during approval." });
    } finally {
      setActionLoading((prev) => ({ ...prev, [appId]: null }));
    }
  };

  // Handle Reject
  const handleReject = async (appId, teacherName, customReason) => {
    let reason = customReason;
    if (reason === undefined && typeof window !== "undefined") {
      const promptRes = window.prompt(
        `Enter rejection reason for ${teacherName || "applicant"} (optional):`,
        "Teaching qualifications or availability criteria not met"
      );
      if (promptRes === null) return;
      reason = promptRes.trim() || "Teaching qualifications or availability criteria not met";
    }

    setActionLoading((prev) => ({ ...prev, [appId]: "reject" }));
    setFeedback(null);

    try {
      const res = await fetch(`/api/admin/teacher-applications/${appId}/reject`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback({
          type: "success",
          message: `${teacherName || "Applicant"} application was rejected.`,
        });

        if (selectedAppModal && selectedAppModal._id === appId) {
          setSelectedAppModal({
            ...selectedAppModal,
            status: "rejected",
            rejectionReason: reason,
            reviewedAt: new Date(),
          });
        }
        await fetchApplications();
      } else {
        setFeedback({
          type: "error",
          message: data?.error || data?.message || "Failed to reject teacher application.",
        });
      }
    } catch (err) {
      setFeedback({ type: "error", message: err?.message || "Network error during rejection." });
    } finally {
      setActionLoading((prev) => ({ ...prev, [appId]: null }));
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
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

        {/* Admin Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-[#E5DFD3] shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#FAF8F2] border border-[#B89550]/40 flex items-center justify-center text-[#B89550] shadow-sm">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-[#252525]">
                  Teacher Applications Portal
                </h1>
                <span className="px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#B89550] bg-[#FAF8F2] border border-[#B89550]/30 rounded-full">
                  Admin
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#595959]">
                Review official Teacher Employment Applications, verify credentials, and generate Teacher IDs
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

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-[#E5DFD3] pb-3 flex-wrap">
          <Link
            href="/admin/donations"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#595959] hover:text-[#252525] hover:bg-white border border-transparent transition-all"
          >
            <DollarSign className="w-4 h-4 text-[#8C827A]" />
            <span>Stripe Donations</span>
          </Link>

          <Link
            href="/admin/members"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#595959] hover:text-[#252525] hover:bg-white border border-transparent transition-all"
          >
            <Users className="w-4 h-4 text-[#8C827A]" />
            <span>Member Verifications & IDs</span>
          </Link>

          <Link
            href="/admin/teacher-applications"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#B89550] bg-white border border-[#E5DFD3] shadow-xs transition-all"
          >
            <BookOpen className="w-4 h-4 text-[#B89550]" />
            <span>Teacher Applications</span>
            {counts.pending > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                {counts.pending} pending
              </span>
            )}
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
                  Pending Applications
                </p>
                <h3 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-amber-900">
                  {counts.pending}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-2 text-xs text-amber-700/80">Awaiting Admin review and Teacher ID generation</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-emerald-300/80 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                  Approved Teachers
                </p>
                <h3 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-emerald-900">
                  {counts.approved}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-2 text-xs text-emerald-700/80">Assigned official IDs (e.g. AIC-TEA-001)</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-red-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-red-700 uppercase tracking-wider">
                  Rejected Applications
                </p>
                <h3 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-red-900">
                  {counts.rejected}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center">
                <XCircle className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-2 text-xs text-red-700/80">Declined applications with logged feedback</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E5DFD3] shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#8C827A] uppercase tracking-wider">
                  Total Applications
                </p>
                <h3 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-[#252525]">
                  {counts.total}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F2] text-[#B89550] flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-2 text-xs text-[#8C827A]">All historical submissions on file</p>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-sm animate-in fade-in duration-200 ${
              feedback.type === "success"
                ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                : "bg-red-50 border-red-300 text-red-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              )}
              <span className="font-medium">{feedback.message}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="text-xs font-bold uppercase tracking-wider hover:opacity-75 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Filter Tabs & Search Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5DFD3] shadow-xs">
          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3] w-fit">
            {[
              { id: "pending", label: "Pending", count: counts.pending },
              { id: "approved", label: "Approved", count: counts.approved },
              { id: "rejected", label: "Rejected", count: counts.rejected },
              { id: "all", label: "All", count: counts.total },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? "bg-white text-[#B89550] shadow-xs border border-[#E5DFD3]"
                    : "text-[#595959] hover:text-[#252525]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    activeTab === tab.id ? "bg-[#FAF8F2] text-[#B89550]" : "bg-stone-200/60 text-[#595959]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 max-w-md w-full">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by name, email, phone, ID, position..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E5DFD3] bg-[#FAF8F2] focus:bg-white focus:border-[#B89550] text-[#252525] outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#B89550] hover:bg-[#A58342] shadow-xs cursor-pointer"
            >
              Search
            </button>
            {(search || searchInput) && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSearchInput("");
                }}
                className="p-2 rounded-xl text-xs text-[#595959] hover:text-[#252525] hover:bg-stone-100 border border-[#E5DFD3]"
                title="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={fetchApplications}
              className="p-2 rounded-xl text-xs text-[#595959] hover:text-[#252525] hover:bg-stone-100 border border-[#E5DFD3]"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          </form>
        </div>

        {/* Applications List */}
        {isLoading ? (
          <div className="p-16 text-center bg-white rounded-3xl border border-[#E5DFD3] space-y-3">
            <RefreshCw className="w-6 h-6 animate-spin text-[#B89550] mx-auto" />
            <p className="text-xs text-[#595959]">Loading teacher applications from server...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="p-16 text-center bg-white rounded-3xl border border-[#E5DFD3] space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF8F2] text-[#B89550] flex items-center justify-center mx-auto">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[#252525] text-base">No Teacher Applications Found</h3>
            <p className="text-xs text-[#595959] max-w-md mx-auto">
              {search
                ? `No applications matched "${search}". Try adjusting your search query.`
                : `There are currently no ${activeTab === "all" ? "" : activeTab} teacher applications on record.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {applications.map((app) => {
              const isApproving = actionLoading[app._id] === "approve";
              const isRejecting = actionLoading[app._id] === "reject";

              return (
                <div
                  key={app._id}
                  className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E5DFD3] shadow-sm hover:shadow-md transition-all space-y-4"
                >
                  {/* Top Bar: Name, Position, Status */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#FAF8F2] border border-[#B89550]/40 flex items-center justify-center text-[#B89550] font-bold text-base shrink-0">
                        {app.fullName ? app.fullName.charAt(0).toUpperCase() : "T"}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-[#252525] text-base truncate">{app.fullName}</h3>
                          {app.teacherId && (
                            <span className="font-mono text-xs font-bold text-[#B89550] bg-[#FAF8F2] px-2 py-0.5 rounded-md border border-[#B89550]/30">
                              {app.teacherId}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#595959] truncate">{app.email} • {app.phone}</p>
                        <p className="text-[11px] text-[#B89550] font-medium mt-0.5">
                          {app.position || "Teacher"} ({app.employmentType || "Part-time"})
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                        app.status === "approved"
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          : app.status === "rejected"
                          ? "bg-red-100 text-red-900 border border-red-300"
                          : "bg-amber-100 text-amber-900 border border-amber-300"
                      }`}
                    >
                      {app.status || "Pending"}
                    </span>
                  </div>

                  {/* Summary Details Grid */}
                  <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C827A] block">
                        Subjects
                      </span>
                      <span className="font-semibold text-[#252525] truncate block">
                        {app.subjects?.join(", ") || "General"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C827A] block">
                        Availability
                      </span>
                      <span className="font-semibold text-[#252525] truncate block">
                        {app.availability?.time || (Array.isArray(app.availability?.days) ? app.availability.days.join(", ") : "Flexible")}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C827A] block">
                        Submitted Date
                      </span>
                      <span className="text-[#595959] block">
                        {formatDate(app.createdAt || app.submittedAt)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C827A] block">
                        Target ID Format
                      </span>
                      <span className="font-mono font-bold text-[#B89550] block">
                        {app.teacherId || "AIC-TEA-XXX"}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-[#E5DFD3]">
                    <button
                      type="button"
                      onClick={() => setSelectedAppModal(app)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#B89550] bg-[#FAF8F2] hover:bg-[#B89550]/15 border border-[#B89550]/30 transition-all cursor-pointer shadow-2xs"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Application</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {app.status !== "rejected" && (
                        <button
                          type="button"
                          onClick={() => handleReject(app._id, app.fullName)}
                          disabled={isApproving || isRejecting}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-all cursor-pointer disabled:opacity-50"
                        >
                          {isRejecting ? "Rejecting..." : "Reject"}
                        </button>
                      )}

                      {app.status !== "approved" && (
                        <button
                          type="button"
                          onClick={() => handleApprove(app._id, app.fullName)}
                          disabled={isApproving || isRejecting}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#B89550] hover:bg-[#A58342] shadow-xs transition-all cursor-pointer disabled:opacity-50"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>{isApproving ? "Approving..." : "Approve & Generate ID"}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================================================================= */}
        {/* COMPLETE VIEW APPLICATION MODAL (ALL 6 SECTIONS + OFFICE USE)    */}
        {/* ================================================================= */}
        {selectedAppModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#E5DFD3] max-h-[90vh] flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">

              {/* Modal Header */}
              <div className="p-5 sm:p-6 border-b border-[#E5DFD3] flex items-center justify-between bg-[#FAF8F2]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#B89550]/40 flex items-center justify-center text-[#B89550] shadow-xs">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#252525]">
                      Teacher Employment Application Review
                    </h3>
                    <p className="text-xs text-[#595959]">
                      Applicant: <strong className="text-[#252525]">{selectedAppModal.fullName}</strong> ({selectedAppModal.email})
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedAppModal(null)}
                  className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 border border-[#E5DFD3] flex items-center justify-center text-[#595959] hover:text-[#252525] transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">

                {/* 1. Personal Information */}
                <div className="space-y-2">
                  <h4 className="font-bold text-[#252525] uppercase tracking-wider text-xs flex items-center gap-2 pb-1.5 border-b border-[#E5DFD3]">
                    <span className="w-5 h-5 rounded-md bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] flex items-center justify-center text-[11px] font-bold">1</span>
                    <span>Personal Information</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3]">
                    <div>
                      <span className="text-[#8C827A] text-[11px] block">Full Name:</span>
                      <strong className="text-[#252525]">{selectedAppModal.fullName}</strong>
                    </div>
                    <div>
                      <span className="text-[#8C827A] text-[11px] block">Position Applied For:</span>
                      <strong className="text-[#B89550]">{selectedAppModal.position}</strong>
                    </div>
                    <div>
                      <span className="text-[#8C827A] text-[11px] block">Father / Spouse:</span>
                      <span className="text-[#252525] font-medium">{selectedAppModal.fatherOrSpouseName || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-[#8C827A] text-[11px] block">Phone / WhatsApp:</span>
                      <strong className="text-[#252525]">{selectedAppModal.phone}</strong>
                    </div>
                    <div>
                      <span className="text-[#8C827A] text-[11px] block">Email:</span>
                      <span className="text-[#252525] font-medium">{selectedAppModal.email}</span>
                    </div>
                    <div>
                      <span className="text-[#8C827A] text-[11px] block">Date of Birth:</span>
                      <span className="text-[#252525] font-medium">{formatDate(selectedAppModal.dateOfBirth)}</span>
                    </div>
                    <div>
                      <span className="text-[#8C827A] text-[11px] block">Citizenship:</span>
                      <span className="text-[#252525] font-medium">{selectedAppModal.citizenship}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-[#8C827A] text-[11px] block">Residential Address:</span>
                      <span className="text-[#252525] font-medium">{selectedAppModal.address}</span>
                    </div>
                    <div className="sm:col-span-3 pt-2 border-t border-[#E5DFD3]">
                      <span className="text-[#8C827A] text-[11px] block">Emergency Contact:</span>
                      <span className="text-[#252525] font-medium">
                        {selectedAppModal.emergencyContact?.name} ({selectedAppModal.emergencyContact?.phone})
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Education & Islamic Qualifications */}
                <div className="space-y-2">
                  <h4 className="font-bold text-[#252525] uppercase tracking-wider text-xs flex items-center gap-2 pb-1.5 border-b border-[#E5DFD3]">
                    <span className="w-5 h-5 rounded-md bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] flex items-center justify-center text-[11px] font-bold">2</span>
                    <span>Education & Islamic Qualifications</span>
                  </h4>
                  {selectedAppModal.educationQualifications?.length > 0 ? (
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
                          {selectedAppModal.educationQualifications.map((item, idx) => (
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
                  {selectedAppModal.quranTajweedHifzQualifications && (
                    <div className="p-3 bg-[#FAF8F2] rounded-xl text-xs space-y-1">
                      <span className="font-semibold text-[#8C827A] block">Quran/Tajweed/Hifz Qualifications:</span>
                      <p className="text-[#252525]">{selectedAppModal.quranTajweedHifzQualifications}</p>
                    </div>
                  )}
                  {selectedAppModal.ijazahOrCertification && (
                    <div className="p-3 bg-[#FAF8F2] rounded-xl text-xs space-y-1">
                      <span className="font-semibold text-[#8C827A] block">Ijazah / Sanad / Certification:</span>
                      <p className="text-[#252525]">{selectedAppModal.ijazahOrCertification}</p>
                    </div>
                  )}
                </div>

                {/* 3. Teaching Experience */}
                <div className="space-y-2">
                  <h4 className="font-bold text-[#252525] uppercase tracking-wider text-xs flex items-center gap-2 pb-1.5 border-b border-[#E5DFD3]">
                    <span className="w-5 h-5 rounded-md bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] flex items-center justify-center text-[11px] font-bold">3</span>
                    <span>Teaching Experience</span>
                  </h4>
                  {selectedAppModal.teachingExperience?.length > 0 ? (
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
                          {selectedAppModal.teachingExperience.map((item, idx) => (
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
                    <p className="text-xs text-[#8C827A] italic p-3 bg-[#FAF8F2] rounded-xl">No experience listed</p>
                  )}
                </div>

                {/* 4. Skills & Availability */}
                <div className="space-y-2">
                  <h4 className="font-bold text-[#252525] uppercase tracking-wider text-xs flex items-center gap-2 pb-1.5 border-b border-[#E5DFD3]">
                    <span className="w-5 h-5 rounded-md bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] flex items-center justify-center text-[11px] font-bold">4</span>
                    <span>Skills & Availability</span>
                  </h4>
                  <div className="p-3.5 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] space-y-3">
                    <div>
                      <span className="text-[#8C827A] text-[11px] font-semibold block mb-1">Teaching Subjects:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedAppModal.subjects?.map((s, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-[#E5DFD3] font-medium text-[#252525]">
                            {s}
                          </span>
                        ))}
                        {selectedAppModal.otherSubject && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-300 text-amber-900 font-medium">
                            Other: {selectedAppModal.otherSubject}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#E5DFD3]">
                      <div>
                        <span className="text-[#8C827A] text-[11px] block">Employment:</span>
                        <strong className="text-[#B89550]">{selectedAppModal.employmentType}</strong>
                      </div>
                      <div>
                        <span className="text-[#8C827A] text-[11px] block">Time Slot:</span>
                        <strong className="text-[#252525]">{selectedAppModal.availability?.time || "Flexible"}</strong>
                      </div>
                      <div>
                        <span className="text-[#8C827A] text-[11px] block">Days:</span>
                        <span className="text-[#252525] font-medium">
                          {Array.isArray(selectedAppModal.availability?.days)
                            ? selectedAppModal.availability.days.join(", ")
                            : selectedAppModal.availability?.days || "N/A"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#8C827A] text-[11px] block">Start Date:</span>
                        <span className="text-[#252525] font-medium">{formatDate(selectedAppModal.startDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. References */}
                <div className="space-y-2">
                  <h4 className="font-bold text-[#252525] uppercase tracking-wider text-xs flex items-center gap-2 pb-1.5 border-b border-[#E5DFD3]">
                    <span className="w-5 h-5 rounded-md bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] flex items-center justify-center text-[11px] font-bold">5</span>
                    <span>Professional References</span>
                  </h4>
                  {selectedAppModal.references?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedAppModal.references.map((ref, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3] text-xs space-y-0.5">
                          <strong className="text-[#252525] block">{ref.name}</strong>
                          <p className="text-[#595959]">{ref.relation} • {ref.organization}</p>
                          <p className="text-[#8C827A] font-mono">{ref.phone}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#8C827A] italic p-3 bg-[#FAF8F2] rounded-xl">No references listed</p>
                  )}
                </div>

                {/* 6. Declaration & Signature */}
                <div className="space-y-2">
                  <h4 className="font-bold text-[#252525] uppercase tracking-wider text-xs flex items-center gap-2 pb-1.5 border-b border-[#E5DFD3]">
                    <span className="w-5 h-5 rounded-md bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] flex items-center justify-center text-[11px] font-bold">6</span>
                    <span>Applicant Declaration & Signature</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3]">
                    <div>
                      <span className="text-[#8C827A] text-[11px] block">Digital Signature:</span>
                      <strong className="text-[#252525] font-serif italic text-base">
                        {selectedAppModal.signature}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#8C827A] text-[11px] block">Signed Date:</span>
                      <strong className="text-[#252525]">{formatDate(selectedAppModal.signatureDate)}</strong>
                    </div>
                  </div>
                </div>

                {/* 7. Office Review & Status */}
                <div className="p-4 rounded-2xl bg-[#FAF8F2] border-2 border-dashed border-[#B89550]/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#B89550] uppercase tracking-wider flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" /> FOR OFFICE USE ONLY
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        selectedAppModal.status === "approved"
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          : selectedAppModal.status === "rejected"
                          ? "bg-red-100 text-red-900 border border-red-300"
                          : "bg-amber-100 text-amber-900 border border-amber-300"
                      }`}
                    >
                      Application Status: {selectedAppModal.status || "Pending"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                    <div className="p-2 rounded bg-white border border-[#E5DFD3]">
                      <span className="text-[#8C827A] block">Assigned Teacher ID</span>
                      <span className="font-mono font-bold text-[#B89550]">
                        {selectedAppModal.teacherId || "AIC-TEA-XXX"}
                      </span>
                    </div>
                    <div className="p-2 rounded bg-white border border-[#E5DFD3]">
                      <span className="text-[#8C827A] block">Admin Reviewer</span>
                      <span className="font-medium text-[#252525]">
                        {selectedAppModal.reviewedByName || adminEmail}
                      </span>
                    </div>
                    <div className="p-2 rounded bg-white border border-[#E5DFD3]">
                      <span className="text-[#8C827A] block">Reviewed Date</span>
                      <span className="font-medium text-[#252525]">
                        {selectedAppModal.reviewedAt ? formatDate(selectedAppModal.reviewedAt) : "Pending"}
                      </span>
                    </div>
                    <div className="p-2 rounded bg-white border border-[#E5DFD3]">
                      <span className="text-[#8C827A] block">Account Sync</span>
                      <span className="text-emerald-700 font-semibold">
                        {selectedAppModal.status === "approved" ? "Synchronized" : "Pending"}
                      </span>
                    </div>
                  </div>

                  {selectedAppModal.rejectionReason && (
                    <div className="p-2.5 rounded bg-red-50 border border-red-200 text-red-800 text-xs">
                      <strong>Rejection Reason: </strong>
                      <span>{selectedAppModal.rejectionReason}</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Modal Footer with Actions */}
              <div className="p-5 border-t border-[#E5DFD3] flex items-center justify-between bg-[#FAF8F2]">
                <button
                  type="button"
                  onClick={() => setSelectedAppModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#595959] hover:text-[#252525] bg-white border border-[#E5DFD3] transition-all cursor-pointer"
                >
                  Close
                </button>

                <div className="flex items-center gap-2.5">
                  {selectedAppModal.status !== "rejected" && (
                    <button
                      type="button"
                      onClick={() => handleReject(selectedAppModal._id, selectedAppModal.fullName)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-all cursor-pointer"
                    >
                      Reject Application
                    </button>
                  )}

                  {selectedAppModal.status !== "approved" && (
                    <button
                      type="button"
                      onClick={() => handleApprove(selectedAppModal._id, selectedAppModal.fullName)}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#B89550] hover:bg-[#A58342] shadow-sm transition-all cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Approve & Generate Teacher ID</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
