"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Sparkles,
  BookOpen,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  X,
  Building,
  Mail,
  Award,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function OurTeamClient() {
  const { isBn } = useLanguage();
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all"); // 'all' | 'Leadership' | 'Teacher' | 'Administration'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);

  // Fetch only published members from public endpoint
  const fetchMembers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/team-members", {
        cache: "no-store",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || (isBn ? "সদস্য তালিকা লোড করতে ব্যর্থ হয়েছে।" : "Failed to load team members."));
      }

      // Backend returns either an array, teamMembers, members, or data
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.teamMembers)
        ? data.teamMembers
        : Array.isArray(data?.members)
        ? data.members
        : Array.isArray(data?.data)
        ? data.data
        : [];

      // Sort by displayOrder ascending, then fallback to createdAt
      const sorted = [...list].sort((a, b) => {
        const orderA = Number(a.displayOrder ?? 0);
        const orderB = Number(b.displayOrder ?? 0);
        if (orderA !== orderB) return orderA - orderB;
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      });

      setMembers(sorted);
    } catch (err) {
      console.error("[OurTeamClient Fetch Error]", err);
      setError(err?.message || (isBn ? "সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি।" : "Failed to connect to the center server."));
    } finally {
      setIsLoading(false);
    }
  }, [isBn]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // Categories definition
  const categories = useMemo(() => [
    {
      id: "all",
      label: isBn ? "সকল সদস্য" : "All Members",
      icon: Users,
    },
    {
      id: "Leadership",
      label: isBn ? "নেতৃত্ব ও পরিচালনা" : "Leadership",
      icon: ShieldCheck,
      description: isBn
        ? "আল হিদায়াহ ইসলামিক সেন্টারের দিকনির্দেশনা ও নীতিনির্ধারণে নিবেদিত সম্মানিত পরিচালনা পরিষদ।"
        : "Guiding the strategic vision, governance, and spiritual direction of Al Hidayah Islamic Center.",
    },
    {
      id: "Teacher",
      label: isBn ? "শিক্ষক ও ওলামাবৃন্দ" : "Teachers & Faculty",
      icon: GraduationCap,
      description: isBn
        ? "বিশুদ্ধ কুরআন, সুন্নাহ ও দ্বীনি শিক্ষার আলো প্রসারে নিয়োজিত অভিজ্ঞ শিক্ষক ও উলামায়ে কেরাম।"
        : "Dedicated scholars and educators nurturing the next generation with authentic Islamic knowledge.",
    },
    {
      id: "Administration",
      label: isBn ? "প্রশাসন ও সেবা" : "Administration",
      icon: Briefcase,
      description: isBn
        ? "কেন্দ্রের দৈনন্দিন কার্যক্রম, সেবা ব্যবস্থাপনা ও সমন্বয় সাধনে একনিষ্ঠ কর্মীদল।"
        : "Ensuring smooth daily operations, pastoral coordination, and community member support.",
    },
  ], [isBn]);

  // Filtered members based on category and search query
  const filteredMembers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return members.filter((member) => {
      // Category match
      if (activeCategory !== "all" && member.category !== activeCategory) {
        return false;
      }
      // Search match
      if (!q) return true;
      const name = (member.fullName || "").toLowerCase();
      const designation = (member.designation || "").toLowerCase();
      const department = (member.department || "").toLowerCase();
      const subject = (member.subject || "").toLowerCase();
      const qualifications = (member.qualifications || "").toLowerCase();
      return (
        name.includes(q) ||
        designation.includes(q) ||
        department.includes(q) ||
        subject.includes(q) ||
        qualifications.includes(q)
      );
    });
  }, [members, activeCategory, searchQuery]);

  // Split into prominent leadership vs other members when on "all" tab
  const leadershipMembers = useMemo(() => {
    return filteredMembers.filter((m) => m.category === "Leadership");
  }, [filteredMembers]);

  const teacherMembers = useMemo(() => {
    return filteredMembers.filter((m) => m.category === "Teacher");
  }, [filteredMembers]);

  const adminMembers = useMemo(() => {
    return filteredMembers.filter((m) => m.category === "Administration");
  }, [filteredMembers]);

  // Format initials for placeholder avatar
  const getInitials = (name) => {
    if (!name) return "AIC";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <main className="flex-1 w-full bg-[#FAF8F2] text-[#252525] min-h-screen">
      {/* Hero Header Section */}
      <section className="relative w-full bg-[#FAF8F2] py-16 sm:py-20 lg:py-24 px-3.5 sm:px-6 lg:px-8 border-b border-[#E5DFD3] overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[320px] sm:h-[420px] rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(241, 237, 227, 0.9) 0%, rgba(184, 149, 80, 0.14) 50%, transparent 70%)",
            }}
          />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B89550]/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center min-w-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#B89550]/40 text-xs sm:text-sm font-semibold text-[#B89550] shadow-2xs mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isBn ? "আল হিদায়াহ ইসলামিক সেন্টার" : "Al Hidayah Islamic Center"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#252525] leading-tight">
            {isBn ? "আমাদের " : "Our "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C]">
              {isBn ? "নেতৃত্ব ও পরিচালনা পরিষদ" : "Leadership & Team"}
            </span>
          </h1>

          <div className="flex items-center justify-center gap-2 my-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#B89550]/60" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#B89550]" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#B89550]/60" />
          </div>

          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-[#595959] leading-relaxed font-normal">
            {isBn
              ? "সম্মানিত নেতৃত্ব, অভিজ্ঞ ওলামায়ে কেরাম এবং নিবেদিত প্রশাসনিক ব্যক্তিবর্গের সমন্বয়ে আমরা একটি প্রাণবন্ত, দ্বীনদার ও আদর্শ সমাজ বিনির্মাণে কাজ করছি।"
              : "Meet the devoted leadership, distinguished academic scholars, and committed administrative staff guiding our sacred community with excellence and integrity."}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="relative w-full py-10 sm:py-14 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        {/* Controls Bar: Category Tabs & Search */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E5DFD3] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              const count = cat.id === "all"
                ? members.length
                : members.filter((m) => m.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#B89550] text-white shadow-xs"
                      : "bg-[#FAF8F2] text-[#595959] hover:text-[#252525] hover:bg-[#F3EFE6] border border-[#E5DFD3]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-white text-[#8C827A] border border-[#E5DFD3]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 lg:w-80">
            <Search className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? "নাম বা পদবী দিয়ে খুঁজুন..." : "Search by name, role, subject..."}
              className="w-full pl-10 pr-4 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-xs sm:text-sm text-[#252525] placeholder-[#8C827A] focus:outline-hidden focus:ring-2 focus:ring-[#B89550]/40 focus:border-[#B89550] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C827A] hover:text-[#252525]"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-20 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[#FAF8F2] border border-[#B89550]/30 flex items-center justify-center text-[#B89550] animate-spin">
              <RefreshCw className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-[#595959]">
              {isBn ? "টিম সদস্যদের তথ্য লোড হচ্ছে..." : "Loading directory members..."}
            </p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="p-8 rounded-2xl bg-white border border-red-200 text-center max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-red-50 text-red-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#252525]">
              {isBn ? "তথ্য লোড করা সম্ভব হয়নি" : "Unable to load team members"}
            </h3>
            <p className="text-xs sm:text-sm text-[#595959]">{error}</p>
            <button
              onClick={fetchMembers}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B89550] hover:bg-[#A07E3C] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{isBn ? "পুনরায় চেষ্টা করুন" : "Try Again"}</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredMembers.length === 0 && (
          <div className="py-20 text-center bg-white rounded-3xl border border-[#E5DFD3] p-8 max-w-lg mx-auto space-y-4 shadow-2xs">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FAF8F2] border border-[#B89550]/30 text-[#B89550] flex items-center justify-center shadow-xs">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-[#252525]">
              {searchQuery
                ? (isBn ? "কোনো সদস্য খুঁজে পাওয়া যায়নি" : "No matching members found")
                : (isBn ? "বর্তমানে কোনো সদস্য প্রকাশিত নেই" : "No published team members")}
            </h3>
            <p className="text-xs sm:text-sm text-[#595959]">
              {searchQuery
                ? (isBn ? "অনুগ্রহ করে অন্য কোনো শব্দ দিয়ে অনুসন্ধান করুন।" : "Try clearing your search query or switching categories.")
                : (isBn ? "প্রশাসন শীঘ্রই সদস্যদের তালিকা হালনাগাদ করবে।" : "The center directory is currently being updated. Please check back soon.")}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF8F2] text-[#252525] border border-[#E5DFD3] hover:bg-[#F3EFE6] text-xs font-semibold cursor-pointer transition-all"
              >
                <span>{isBn ? "অনুসন্ধান রিসেট করুন" : "Clear Filter"}</span>
              </button>
            )}
          </div>
        )}

        {/* Members Directory Views */}
        {!isLoading && !error && filteredMembers.length > 0 && (
          <div className="space-y-12">
            {/* If a single category is selected (or searching within a category) */}
            {activeCategory !== "all" ? (
              <div className="space-y-6">
                <div className="border-b border-[#E5DFD3] pb-4">
                  <h2 className="text-2xl font-bold text-[#252525]">
                    {categories.find((c) => c.id === activeCategory)?.label}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#595959] mt-1">
                    {categories.find((c) => c.id === activeCategory)?.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredMembers.map((member) => (
                    <MemberCard
                      key={member._id}
                      member={member}
                      isBn={isBn}
                      onSelect={() => setSelectedMember(member)}
                      getInitials={getInitials}
                      isProminent={activeCategory === "Leadership"}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* "All" Category View: Structured with Leadership prominent on top, followed by Faculty and Administration */
              <div className="space-y-14">
                {/* 1. Senior Leadership Section */}
                {leadershipMembers.length > 0 && (
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-[#E5DFD3] pb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-extrabold text-[#252525]">
                          {isBn ? "নেতৃত্ব ও পরিচালনা পরিষদ" : "Center Leadership"}
                        </h2>
                        <p className="text-xs sm:text-sm text-[#595959]">
                          {isBn
                            ? "সম্মানিত দিকনির্দেশনা ও তত্ত্বাবধানে পরিচালিত"
                            : "Senior leadership overseeing strategic initiatives, spiritual vision, and trust."}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {leadershipMembers.map((member) => (
                        <MemberCard
                          key={member._id}
                          member={member}
                          isBn={isBn}
                          onSelect={() => setSelectedMember(member)}
                          getInitials={getInitials}
                          isProminent={true}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* 2. Teachers & Academic Faculty Section */}
                {teacherMembers.length > 0 && (
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-[#E5DFD3] pb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] flex items-center justify-center">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-extrabold text-[#252525]">
                          {isBn ? "শিক্ষক ও ওলামা পরিষদ" : "Teachers & Academic Faculty"}
                        </h2>
                        <p className="text-xs sm:text-sm text-[#595959]">
                          {isBn
                            ? "কুরআন, হাদিস ও ইসলামিক স্টাডিজের সম্মানিত শিক্ষকবৃন্দ"
                            : "Esteemed scholars and instructors guiding academic curricula and character building."}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {teacherMembers.map((member) => (
                        <MemberCard
                          key={member._id}
                          member={member}
                          isBn={isBn}
                          onSelect={() => setSelectedMember(member)}
                          getInitials={getInitials}
                          isProminent={false}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* 3. Administration & Services Section */}
                {adminMembers.length > 0 && (
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-[#E5DFD3] pb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF8F2] border border-[#B89550]/40 text-[#B89550] flex items-center justify-center">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-extrabold text-[#252525]">
                          {isBn ? "প্রশাসন ও সেবা কর্মকর্তা" : "Administration & Operations"}
                        </h2>
                        <p className="text-xs sm:text-sm text-[#595959]">
                          {isBn
                            ? "দৈনন্দিন কার্যপরিচালনা ও সেবা সহায়তা প্রদানকারী কর্মকর্তা"
                            : "Managing center facilities, communication, pastoral assistance, and coordination."}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {adminMembers.map((member) => (
                        <MemberCard
                          key={member._id}
                          member={member}
                          isBn={isBn}
                          onSelect={() => setSelectedMember(member)}
                          getInitials={getInitials}
                          isProminent={false}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Member Profile Details Modal */}
      {selectedMember && (
        <MemberDetailModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          isBn={isBn}
          getInitials={getInitials}
        />
      )}
    </main>
  );
}

// Subcomponent: Individual Member Card
function MemberCard({ member, isBn, onSelect, getInitials, isProminent }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={onSelect}
      className={`group relative bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-1 ${
        isProminent
          ? "border-[#B89550]/40 shadow-xs ring-1 ring-[#B89550]/20"
          : "border-[#E5DFD3] shadow-2xs"
      }`}
    >
      {/* Top Banner Accent */}
      <div
        className={`h-1.5 w-full bg-gradient-to-r ${
          isProminent
            ? "from-[#B89550] via-[#D8B775] to-[#A07E3C]"
            : "from-[#E5DFD3] via-[#B89550]/40 to-[#E5DFD3]"
        }`}
      />

      <div className="p-5 flex-1 flex flex-col">
        {/* Photo / Avatar Section */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative shrink-0">
            {member.profileImage && !imageError ? (
              <img
                src={member.profileImage}
                alt={member.fullName}
                onError={() => setImageError(true)}
                className={`rounded-2xl object-cover border border-[#E5DFD3] group-hover:border-[#B89550]/60 transition-colors ${
                  isProminent ? "w-20 h-20 sm:w-22 sm:h-22" : "w-16 h-16 sm:w-18 sm:h-18"
                }`}
              />
            ) : (
              <div
                className={`rounded-2xl bg-gradient-to-br from-[#FAF8F2] to-[#F1EDE3] border border-[#B89550]/30 flex flex-col items-center justify-center text-[#B89550] font-extrabold shadow-inner ${
                  isProminent
                    ? "w-20 h-20 sm:w-22 sm:h-22 text-lg"
                    : "w-16 h-16 sm:w-18 sm:h-18 text-base"
                }`}
              >
                <span>{getInitials(member.fullName)}</span>
                <span className="text-[9px] uppercase tracking-wider font-semibold opacity-75 mt-0.5">
                  AIC
                </span>
              </div>
            )}

            {isProminent && (
              <div className="absolute -bottom-1 -right-1 p-1 bg-[#B89550] rounded-full text-white shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <span
              className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase mb-1 ${
                member.category === "Leadership"
                  ? "bg-[#FAF8F2] text-[#B89550] border border-[#B89550]/30"
                  : member.category === "Teacher"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-blue-50 text-blue-800 border border-blue-200"
              }`}
            >
              {member.category === "Leadership"
                ? (isBn ? "নেতৃত্ব" : "Leadership")
                : member.category === "Teacher"
                ? (isBn ? "শিক্ষক" : "Faculty")
                : (isBn ? "প্রশাসন" : "Admin")}
            </span>
            <h3
              className={`font-bold text-[#252525] group-hover:text-[#B89550] transition-colors truncate ${
                isProminent ? "text-lg sm:text-xl" : "text-base"
              }`}
              title={member.fullName}
            >
              {member.fullName}
            </h3>
            <p className="text-xs font-semibold text-[#8C827A] truncate mt-0.5" title={member.designation}>
              {member.designation}
            </p>
          </div>
        </div>

        {/* Department / Subject Pill */}
        {(member.department || member.subject) && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {member.department && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#595959] bg-[#FAF8F2] px-2.5 py-1 rounded-lg border border-[#E5DFD3]">
                <Building className="w-3 h-3 text-[#B89550]" />
                <span className="truncate max-w-[150px]">{member.department}</span>
              </span>
            )}
            {member.subject && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#595959] bg-[#FAF8F2] px-2.5 py-1 rounded-lg border border-[#E5DFD3]">
                <BookOpen className="w-3 h-3 text-[#B89550]" />
                <span className="truncate max-w-[150px]">{member.subject}</span>
              </span>
            )}
          </div>
        )}

        {/* Qualifications (if any) */}
        {member.qualifications && (
          <div className="text-[11px] text-[#595959] mb-3 flex items-start gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#B89550] shrink-0 mt-0.5" />
            <span className="line-clamp-2 leading-relaxed">{member.qualifications}</span>
          </div>
        )}

        {/* Short Bio snippet */}
        {member.biography && (
          <p className="text-xs text-[#595959] line-clamp-3 leading-relaxed mb-4 flex-1">
            {member.biography}
          </p>
        )}
      </div>

      {/* Card Footer / View Details trigger */}
      <div className="px-5 py-3 bg-[#FAF8F2]/60 border-t border-[#E5DFD3] flex items-center justify-between text-xs font-bold text-[#B89550] group-hover:bg-[#FAF8F2] transition-colors">
        <span>{isBn ? "বিস্তারিত পরিচিতি" : "View Full Profile"}</span>
        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}

// Subcomponent: Detailed Profile Modal
function MemberDetailModal({ member, onClose, isBn, getInitials }) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#E5DFD3] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Decorative Top */}
        <div className="h-2 w-full bg-gradient-to-r from-[#B89550] via-[#D8B775] to-[#A07E3C]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF8F2] text-[#8C827A] hover:text-[#252525] hover:bg-[#E5DFD3] transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Member Identity Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative shrink-0">
              {member.profileImage && !imageError ? (
                <img
                  src={member.profileImage}
                  alt={member.fullName}
                  onError={() => setImageError(true)}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#B89550]/40 shadow-sm"
                />
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#FAF8F2] border-2 border-[#B89550]/30 flex flex-col items-center justify-center text-[#B89550] font-extrabold text-2xl shadow-inner">
                  <span>{getInitials(member.fullName)}</span>
                  <span className="text-[10px] tracking-wider uppercase opacity-75 mt-0.5">AIC</span>
                </div>
              )}
            </div>

            <div className="space-y-1.5 flex-1 min-w-0">
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase ${
                  member.category === "Leadership"
                    ? "bg-[#FAF8F2] text-[#B89550] border border-[#B89550]/30"
                    : member.category === "Teacher"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-blue-50 text-blue-800 border border-blue-200"
                }`}
              >
                {member.category === "Leadership"
                  ? (isBn ? "নেতৃত্ব ও পরিচালনা পরিষদ" : "Leadership & Governance")
                  : member.category === "Teacher"
                  ? (isBn ? "শিক্ষক ও ওলামা পরিষদ" : "Teachers & Academic Faculty")
                  : (isBn ? "প্রশাসন ও সেবা কর্মকর্তা" : "Administration & Operations")}
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525]">
                {member.fullName}
              </h2>
              <p className="text-sm sm:text-base font-semibold text-[#B89550]">
                {member.designation}
              </p>

              {(member.department || member.subject) && (
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                  {member.department && (
                    <span className="inline-flex items-center gap-1 text-xs text-[#595959] bg-[#FAF8F2] px-2.5 py-1 rounded-md border border-[#E5DFD3]">
                      <Building className="w-3.5 h-3.5 text-[#B89550]" />
                      <span>{member.department}</span>
                    </span>
                  )}
                  {member.subject && (
                    <span className="inline-flex items-center gap-1 text-xs text-[#595959] bg-[#FAF8F2] px-2.5 py-1 rounded-md border border-[#E5DFD3]">
                      <BookOpen className="w-3.5 h-3.5 text-[#B89550]" />
                      <span>{member.subject}</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

            {/* Qualifications Card */}
            {member.qualifications && (
              <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B89550]">
                  <Award className="w-4 h-4" />
                  <span>{isBn ? "শিক্ষাগত যোগ্যতা ও সনদ" : "Qualifications & Accreditations"}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#252525] font-medium leading-relaxed whitespace-pre-line">
                  {member.qualifications}
                </p>
              </div>
            )}

            {/* Responsibilities */}
            {member.responsibilities && (
              <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B89550]">
                  <Briefcase className="w-4 h-4" />
                  <span>{isBn ? "দায়িত্ব ও কার্যপরিধি" : "Key Responsibilities & Focus"}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#252525] font-medium leading-relaxed whitespace-pre-line">
                  {member.responsibilities}
                </p>
              </div>
            )}

            {/* Biography */}
            {member.biography && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C827A]">
                  {isBn ? "জীবনী ও পটভূমি" : "Biography & Profile"}
                </h4>
                <p className="text-xs sm:text-sm text-[#595959] leading-relaxed whitespace-pre-line">
                  {member.biography}
                </p>
              </div>
            )}
          </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#FAF8F2] border-t border-[#E5DFD3] flex items-center justify-between">
          <div className="text-xs text-[#8C827A]">
            <span>Al Hidayah Islamic Center</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white border border-[#E5DFD3] hover:bg-[#E5DFD3] text-xs font-bold text-[#252525] transition-all cursor-pointer shadow-2xs"
          >
            {isBn ? "বন্ধ করুন" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
