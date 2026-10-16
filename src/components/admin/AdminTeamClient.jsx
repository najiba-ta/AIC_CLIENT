"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  DollarSign,
  Users,
  BookOpen,
  GraduationCap,
  Briefcase,
  Search,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  LogOut,
  AlertCircle,
  CheckCircle2,
  X,
  Upload,
  Eye,
  EyeOff,
  Building,
  Award,
  ArrowUpDown,
  Image as ImageIcon,
} from "lucide-react";

export default function AdminTeamClient({ initialAdminEmail = "Admin" }) {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [adminEmail, setAdminEmail] = useState(initialAdminEmail);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: string }

  // Filter state
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'published' | 'unpublished'

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null); // null if adding new
  const [memberToDelete, setMemberToDelete] = useState(null);

  // Form input state
  const initialFormState = {
    fullName: "",
    designation: "",
    category: "Leadership",
    qualifications: "",
    department: "",
    subject: "",
    biography: "",
    responsibilities: "",
    profileImage: "",
    displayOrder: 0,
    isPublished: true,
  };
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});

  // Verify admin session client-side as well
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/admin/me", { credentials: "include" });
        if (res.status === 401) {
          router.replace("/admin/login");
          return;
        }
        const data = await res.json();
        if (data?.admin?.email) {
          setAdminEmail(data.admin.email);
        }
      } catch {
        // Handled by server redirect
      }
    }
    checkSession();
  }, [router]);

  // Fetch all team members (including drafts/unpublished)
  const fetchMembers = useCallback(async () => {
    setIsLoading(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/team-members", {
        credentials: "include",
        cache: "no-store",
      });
      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        if (res.status === 401) {
          router.replace("/admin/login");
          return;
        }
        throw new Error(data?.error || data?.message || `Server responded with status ${res.status}`);
      }

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.teamMembers)
        ? data.teamMembers
        : Array.isArray(data?.members)
        ? data.members
        : Array.isArray(data?.data)
        ? data.data
        : [];

      // Sort by displayOrder ascending, then createdAt
      const sorted = [...list].sort((a, b) => {
        const orderA = Number(a.displayOrder ?? 0);
        const orderB = Number(b.displayOrder ?? 0);
        if (orderA !== orderB) return orderA - orderB;
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      });

      setMembers(sorted);
    } catch (err) {
      console.error("[Admin Fetch Team Error]", err);
      setFeedback({ type: "error", message: err?.message || "Failed to fetch members." });
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("[Logout Error]", err);
    } finally {
      router.refresh();
      router.replace("/admin/login");
    }
  };

  // Metrics computation
  const metrics = useMemo(() => {
    const total = members.length;
    const published = members.filter((m) => m.isPublished).length;
    const unpublished = total - published;
    const leadership = members.filter((m) => m.category === "Leadership").length;
    const teachers = members.filter((m) => m.category === "Teacher").length;
    const administration = members.filter((m) => m.category === "Administration").length;
    return { total, published, unpublished, leadership, teachers, administration };
  }, [members]);

  // Filtered members list
  const filteredMembers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return members.filter((m) => {
      // Category filter
      if (categoryFilter !== "all" && m.category !== categoryFilter) {
        return false;
      }
      // Status filter
      if (statusFilter === "published" && !m.isPublished) return false;
      if (statusFilter === "unpublished" && m.isPublished) return false;

      // Search query
      if (!q) return true;
      const name = (m.fullName || "").toLowerCase();
      const designation = (m.designation || "").toLowerCase();
      const department = (m.department || "").toLowerCase();
      const subject = (m.subject || "").toLowerCase();
      const qualifications = (m.qualifications || "").toLowerCase();
      return (
        name.includes(q) ||
        designation.includes(q) ||
        department.includes(q) ||
        subject.includes(q) ||
        qualifications.includes(q)
      );
    });
  }, [members, categoryFilter, statusFilter, search]);

  // Open Form Modal for Create
  const handleOpenAddModal = () => {
    setEditingMember(null);
    setFormData({
      ...initialFormState,
      displayOrder: members.length > 0 ? Math.max(...members.map((m) => Number(m.displayOrder ?? 0))) + 1 : 1,
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  // Open Form Modal for Edit
  const handleOpenEditModal = (member) => {
    setEditingMember(member);
    setFormData({
      fullName: member.fullName || "",
      designation: member.designation || "",
      category: member.category || "Leadership",
      qualifications: member.qualifications || "",
      department: member.department || "",
      subject: member.subject || "",
      biography: member.biography || "",
      responsibilities: member.responsibilities || "",
      profileImage: member.profileImage || "",
      displayOrder: member.displayOrder ?? 0,
      isPublished: member.isPublished ?? true,
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  // Handle Photo File Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 5MB
    if (file.size > 5 * 1024 * 1024) {
      setFormErrors((prev) => ({
        ...prev,
        profileImage: "Photo file size must not exceed 5MB.",
      }));
      return;
    }

    setIsUploadingPhoto(true);
    setFormErrors((prev) => ({ ...prev, profileImage: undefined }));

    try {
      const uploadBody = new FormData();
      uploadBody.append("file", file);
      uploadBody.append("image", file);

      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        credentials: "include",
        body: uploadBody,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to upload photo file.");
      }

      setFormData((prev) => ({
        ...prev,
        profileImage: data.url,
      }));
      setFeedback({ type: "success", message: "Photo uploaded successfully." });
    } catch (err) {
      console.error("[Photo Upload Error]", err);
      setFormErrors((prev) => ({
        ...prev,
        profileImage: err?.message || "Failed to upload photo.",
      }));
    } finally {
      setIsUploadingPhoto(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required.";
    }
    if (!formData.designation.trim()) {
      errors.designation = "Designation / Position title is required.";
    }
    if (!formData.category || !["Leadership", "Teacher", "Administration"].includes(formData.category)) {
      errors.category = "Please select a valid member category.";
    }
    // Prevent direct data URI > 512 bytes (which triggers Mongoose validation error on server)
    if (formData.profileImage && formData.profileImage.startsWith("data:") && formData.profileImage.length > 512) {
      errors.profileImage = "Please upload an image file or provide an image URL. Raw base64 data URIs are not allowed.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Add / Edit Form
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        designation: formData.designation.trim(),
        category: formData.category,
        qualifications: formData.qualifications.trim(),
        department: formData.department.trim(),
        subject: formData.subject.trim(),
        biography: formData.biography.trim(),
        responsibilities: formData.responsibilities.trim(),
        profileImage: formData.profileImage.trim(),
        displayOrder: Number(formData.displayOrder) || 0,
        isPublished: Boolean(formData.isPublished),
      };

      let res;
      if (editingMember) {
        // Edit existing
        res = await fetch(`/api/admin/team-members/${editingMember._id}`, {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Create new
        res = await fetch("/api/admin/team-members", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }
      if (!res.ok) {
        throw new Error(data?.error || data?.message || `Operation failed with status ${res.status}`);
      }

      setFeedback({
        type: "success",
        message: editingMember
          ? `Successfully updated member: ${formData.fullName}`
          : `Successfully added new member: ${formData.fullName}`,
      });

      setIsFormModalOpen(false);
      fetchMembers();
    } catch (err) {
      console.error("[Team Member Save Error]", err);
      setFeedback({
        type: "error",
        message: err?.message || "Failed to save team member.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle publish / unpublish status
  const handleTogglePublish = async (member) => {
    const nextStatus = !member.isPublished;
    setFeedback(null);

    // Optimistic local update
    setMembers((prev) =>
      prev.map((m) => (m._id === member._id ? { ...m, isPublished: nextStatus } : m))
    );

    try {
      const res = await fetch(`/api/admin/team-members/${member._id}/publish`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: nextStatus }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to toggle publish status.");
      }

      setFeedback({
        type: "success",
        message: `${member.fullName} is now ${nextStatus ? "PUBLISHED" : "UNPUBLISHED"}.`,
      });
    } catch (err) {
      console.error("[Publish Toggle Error]", err);
      // Revert optimistic update
      setMembers((prev) =>
        prev.map((m) => (m._id === member._id ? { ...m, isPublished: member.isPublished } : m))
      );
      setFeedback({
        type: "error",
        message: err?.message || "Failed to update publication status.",
      });
    }
  };

  // Delete Member
  const handleDeleteMember = async () => {
    if (!memberToDelete) return;

    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/team-members/${memberToDelete._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to delete team member.");
      }

      setFeedback({
        type: "success",
        message: `Member ${memberToDelete.fullName} has been removed.`,
      });
      setMemberToDelete(null);
      fetchMembers();
    } catch (err) {
      console.error("[Delete Member Error]", err);
      setFeedback({
        type: "error",
        message: err?.message || "Failed to delete team member.",
      });
    }
  };

  // Quick display order update
  const handleDisplayOrderChange = async (member, newOrder) => {
    const orderNum = parseInt(newOrder, 10);
    if (isNaN(orderNum)) return;

    try {
      const res = await fetch(`/api/admin/team-members/${member._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayOrder: orderNum }),
      });

      if (!res.ok) {
        throw new Error("Failed to update order");
      }
      fetchMembers();
    } catch (err) {
      console.error("[Order Change Error]", err);
      setFeedback({ type: "error", message: "Failed to update display order." });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] text-[#252525] py-8 sm:py-12 px-3.5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Admin Header & Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-[#E5DFD3] shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#FAF8F2] border border-[#B89550]/40 flex items-center justify-center text-[#B89550] shadow-2xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-[#252525]">
                  Leadership & Team Management
                </h1>
                <span className="px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#B89550] bg-[#FAF8F2] border border-[#B89550]/30 rounded-full">
                  Admin
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#595959]">
                Al Hidayah Islamic Center — Direct MongoDB Database Integration
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

        {/* Tab Navigation: Donations vs Members vs Teachers vs Team */}
        <div className="flex flex-wrap items-center gap-3 border-b border-[#E5DFD3] pb-3">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#595959] hover:text-[#252525] hover:bg-white border border-transparent transition-all"
          >
            <BookOpen className="w-4 h-4 text-[#8C827A]" />
            <span>Teacher Applications</span>
          </Link>

          <Link
            href="/admin/team"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#B89550] bg-white border border-[#E5DFD3] shadow-xs transition-all"
          >
            <Briefcase className="w-4 h-4 text-[#B89550]" />
            <span>Leadership & Team</span>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#FAF8F2] text-[#B89550] border border-[#B89550]/30">
              {metrics.total}
            </span>
          </Link>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-white border border-[#E5DFD3] shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C827A]">Total</span>
            <p className="text-2xl font-extrabold text-[#252525] mt-1">{metrics.total}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Published</span>
            <p className="text-2xl font-extrabold text-emerald-800 mt-1">{metrics.published}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Unpublished</span>
            <p className="text-2xl font-extrabold text-amber-800 mt-1">{metrics.unpublished}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#B89550]/30 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#B89550]">Leadership</span>
            <p className="text-2xl font-extrabold text-[#B89550] mt-1">{metrics.leadership}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Teachers</span>
            <p className="text-2xl font-extrabold text-emerald-800 mt-1">{metrics.teachers}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">Admin</span>
            <p className="text-2xl font-extrabold text-blue-800 mt-1">{metrics.administration}</p>
          </div>
        </div>

        {/* Feedback Alert Toast */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl text-xs sm:text-sm font-medium flex items-center justify-between gap-3 ${
              feedback.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center gap-2">
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0" />
              )}
              <span>{feedback.message}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="p-1 rounded-lg hover:bg-black/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Filter and Action Header Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DFD3] shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search member name, role..."
                className="w-full pl-9 pr-3 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-xs text-[#252525] placeholder-[#8C827A] focus:outline-hidden focus:ring-2 focus:ring-[#B89550]/40"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-xs text-[#252525] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#B89550]/40"
            >
              <option value="all">All Categories</option>
              <option value="Leadership">Leadership</option>
              <option value="Teacher">Teacher / Faculty</option>
              <option value="Administration">Administration</option>
            </select>

            {/* Publication Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-xs text-[#252525] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#B89550]/40"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published Only</option>
              <option value="unpublished">Unpublished Drafts</option>
            </select>

            {/* Refresh Button */}
            <button
              onClick={fetchMembers}
              disabled={isLoading}
              className="p-2 bg-[#FAF8F2] text-[#595959] hover:text-[#252525] hover:bg-[#F3EFE6] border border-[#E5DFD3] rounded-xl transition-all cursor-pointer disabled:opacity-50"
              title="Refresh Member List"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          </div>

          {/* Add New Member Button */}
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#B89550] hover:bg-[#A07E3C] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Member</span>
          </button>
        </div>

        {/* Member Table & Records */}
        <div className="bg-white rounded-2xl border border-[#E5DFD3] shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-20 text-center space-y-3">
              <RefreshCw className="w-6 h-6 mx-auto text-[#B89550] animate-spin" />
              <p className="text-xs text-[#595959]">Fetching team members from database...</p>
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="py-16 text-center space-y-3 p-6">
              <Users className="w-10 h-10 mx-auto text-[#8C827A]/60" />
              <h3 className="text-base font-bold text-[#252525]">No members found</h3>
              <p className="text-xs text-[#595959]">
                {members.length === 0
                  ? "Get started by adding your first leadership or faculty member above."
                  : "No members match the current search and filter criteria."}
              </p>
              {members.length === 0 && (
                <button
                  onClick={handleOpenAddModal}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#B89550] text-white text-xs font-bold shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add First Member</span>
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAF8F2] border-b border-[#E5DFD3] text-[11px] font-bold uppercase tracking-wider text-[#8C827A]">
                    <th className="py-3.5 px-4 sm:px-6">Member</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Role & Department</th>
                    <th className="py-3.5 px-4 text-center">Display Order</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DFD3] text-xs">
                  {filteredMembers.map((member) => (
                    <tr key={member._id} className="hover:bg-[#FAF8F2]/60 transition-colors">
                      {/* Member Info */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          {member.profileImage ? (
                            <img
                              src={member.profileImage}
                              alt={member.fullName}
                              className="w-10 h-10 rounded-xl object-cover border border-[#E5DFD3]"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-[#FAF8F2] border border-[#B89550]/30 text-[#B89550] font-bold flex items-center justify-center text-xs">
                              {member.fullName?.slice(0, 2).toUpperCase() || "AIC"}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-bold text-[#252525] text-sm truncate max-w-xs">
                              {member.fullName}
                            </p>
                            {member.qualifications && (
                              <p className="text-[11px] text-[#8C827A] truncate max-w-xs">
                                {member.qualifications}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            member.category === "Leadership"
                              ? "bg-[#FAF8F2] text-[#B89550] border border-[#B89550]/30"
                              : member.category === "Teacher"
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-blue-50 text-blue-800 border border-blue-200"
                          }`}
                        >
                          {member.category}
                        </span>
                      </td>

                      {/* Designation & Department */}
                      <td className="py-4 px-4">
                        <p className="font-semibold text-[#252525]">{member.designation}</p>
                        {(member.department || member.subject) && (
                          <p className="text-[11px] text-[#8C827A] mt-0.5">
                            {[member.department, member.subject].filter(Boolean).join(" • ")}
                          </p>
                        )}
                      </td>

                      {/* Display Order */}
                      <td className="py-4 px-4 text-center">
                        <input
                          type="number"
                          defaultValue={member.displayOrder ?? 0}
                          onBlur={(e) => handleDisplayOrderChange(member, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.currentTarget.blur();
                            }
                          }}
                          className="w-16 text-center py-1 bg-[#FAF8F2] border border-[#E5DFD3] rounded-lg text-xs font-bold text-[#252525] focus:ring-1 focus:ring-[#B89550]"
                          title="Press Enter or click outside to save display order"
                        />
                      </td>

                      {/* Published Toggle */}
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleTogglePublish(member)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                            member.isPublished
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100"
                              : "bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100"
                          }`}
                          title="Click to toggle publication status"
                        >
                          {member.isPublished ? (
                            <>
                              <Eye className="w-3 h-3 text-emerald-600" />
                              <span>Published</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3 text-amber-600" />
                              <span>Draft</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(member)}
                            className="p-1.5 rounded-lg bg-[#FAF8F2] text-[#595959] hover:text-[#B89550] hover:bg-[#F3EFE6] border border-[#E5DFD3] transition-colors cursor-pointer"
                            title="Edit Member"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setMemberToDelete(member)}
                            className="p-1.5 rounded-lg bg-[#FAF8F2] text-[#595959] hover:text-red-700 hover:bg-red-50 border border-[#E5DFD3] hover:border-red-200 transition-colors cursor-pointer"
                            title="Delete Member"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Member Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#E5DFD3] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Accent */}
            <div className="h-2 w-full bg-gradient-to-r from-[#B89550] via-[#D8B775] to-[#A07E3C]" />

            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#E5DFD3] flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#252525]">
                  {editingMember ? "Edit Team Member" : "Add New Team Member"}
                </h3>
                <p className="text-xs text-[#595959] mt-0.5">
                  Records are saved directly to MongoDB through AIC_SERVER
                </p>
              </div>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="p-2 rounded-full bg-[#FAF8F2] text-[#8C827A] hover:text-[#252525] hover:bg-[#E5DFD3] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitForm} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
              {/* Full Name & Designation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#252525] mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Mohammad Ibrahim"
                    className="w-full px-3.5 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-xs text-[#252525] focus:outline-hidden focus:ring-2 focus:ring-[#B89550]/40"
                  />
                  {formErrors.fullName && (
                    <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#252525] mb-1">
                    Designation / Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="e.g. Senior Imam / Head of Hifz / Trustee"
                    className="w-full px-3.5 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-xs text-[#252525] focus:outline-hidden focus:ring-2 focus:ring-[#B89550]/40"
                  />
                  {formErrors.designation && (
                    <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.designation}</p>
                  )}
                </div>
              </div>

              {/* Category & Display Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#252525] mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-xs text-[#252525] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#B89550]/40"
                  >
                    <option value="Leadership">Leadership & Trustees</option>
                    <option value="Teacher">Teacher & Faculty</option>
                    <option value="Administration">Administration & Staff</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#252525] mb-1">
                    Display Order (Numeric, lower sorts first)
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-xs text-[#252525] focus:outline-hidden focus:ring-2 focus:ring-[#B89550]/40"
                  />
                </div>
              </div>

              {/* Department & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#252525] mb-1">
                    Department (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g. Islamic Studies, Administration"
                    className="w-full px-3.5 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-xs text-[#252525] focus:outline-hidden focus:ring-2 focus:ring-[#B89550]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#252525] mb-1">
                    Subject / Focus Area (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Tajweed, Fiqh, Youth Mentorship"
                    className="w-full px-3.5 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-xs text-[#252525] focus:outline-hidden focus:ring-2 focus:ring-[#B89550]/40"
                  />
                </div>
              </div>

              {/* Qualifications */}
              <div>
                <label className="block text-xs font-bold text-[#252525] mb-1">
                  Educational Qualifications & Ijazah (Optional)
                </label>
                <input
                  type="text"
                  value={formData.qualifications}
                  onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                  placeholder="e.g. B.A. in Islamic Jurisprudence (Al-Azhar University), Ijazah in Hafs 'an 'Asim"
                  className="w-full px-3.5 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-xs text-[#252525] focus:outline-hidden focus:ring-2 focus:ring-[#B89550]/40"
                />
              </div>

              {/* Profile Image Section: File Upload & URL */}
              <div>
                <label className="block text-xs font-bold text-[#252525] mb-1">
                  Profile Photo (File Upload or Image URL)
                </label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/png,image/jpeg,image/webp,image/jpg"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingPhoto}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3] hover:bg-[#F3EFE6] text-xs font-bold text-[#252525] transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Upload className={`w-3.5 h-3.5 ${isUploadingPhoto ? "animate-bounce" : ""}`} />
                      <span>{isUploadingPhoto ? "Uploading..." : "Upload Photo File"}</span>
                    </button>
                    <span className="text-[11px] text-[#8C827A]">or enter direct image URL below</span>
                  </div>

                  <input
                    type="text"
                    value={formData.profileImage}
                    onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                    placeholder="https://... or /images/team/photo.jpg"
                    className="w-full px-3.5 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-xs text-[#252525] focus:outline-hidden focus:ring-2 focus:ring-[#B89550]/40"
                  />

                  {formData.profileImage && (
                    <div className="flex items-center gap-3 p-2 bg-[#FAF8F2] rounded-xl border border-[#E5DFD3]">
                      <img
                        src={formData.profileImage}
                        alt="Preview"
                        className="w-12 h-12 rounded-lg object-cover border border-[#E5DFD3]"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-[#252525] truncate">
                          {formData.profileImage}
                        </p>
                        <p className="text-[10px] text-emerald-700">Image loaded for preview</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, profileImage: "" })}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {formErrors.profileImage && (
                    <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.profileImage}</p>
                  )}
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <label className="block text-xs font-bold text-[#252525] mb-1">
                  Responsibilities & Center Duties (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  placeholder="e.g. Oversight of Friday congregational affairs, pastoral youth guidance, and curriculum coordination."
                  className="w-full px-3.5 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-xs text-[#252525] focus:outline-hidden focus:ring-2 focus:ring-[#B89550]/40"
                />
              </div>

              {/* Biography */}
              <div>
                <label className="block text-xs font-bold text-[#252525] mb-1">
                  Short Biography (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.biography}
                  onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                  placeholder="Provide a brief background summary of their service, background, and dedication to the community."
                  className="w-full px-3.5 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-xs text-[#252525] focus:outline-hidden focus:ring-2 focus:ring-[#B89550]/40"
                />
              </div>

              {/* Published Toggle Checkbox */}
              <div className="p-3 bg-[#FAF8F2] rounded-xl border border-[#E5DFD3] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#252525]">Publish to Website Directory</p>
                  <p className="text-[11px] text-[#595959]">
                    When checked, this profile will be publicly visible on the /our-team page.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 text-[#B89550] rounded-sm focus:ring-[#B89550] cursor-pointer"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#E5DFD3] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white border border-[#E5DFD3] hover:bg-[#FAF8F2] text-xs font-bold text-[#595959] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#B89550] hover:bg-[#A07E3C] text-white text-xs font-bold shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingMember ? "Save Changes" : "Create Member"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {memberToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl border border-[#E5DFD3] shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-[#252525]">Confirm Delete Member</h3>
              <p className="text-xs text-[#595959]">
                Are you sure you want to remove <strong className="text-[#252525]">{memberToDelete.fullName}</strong> from the database? This action cannot be undone.
              </p>
            </div>

            <div className="p-3 bg-[#FAF8F2] rounded-xl border border-[#E5DFD3] text-xs text-[#595959] space-y-1">
              <p><strong>Designation:</strong> {memberToDelete.designation}</p>
              <p><strong>Category:</strong> {memberToDelete.category}</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setMemberToDelete(null)}
                className="px-4 py-2 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3] text-xs font-bold text-[#595959] hover:bg-[#F3EFE6] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteMember}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Yes, Delete Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
