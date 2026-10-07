"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DollarSign,
  Heart,
  Calendar,
  ShieldCheck,
  Search,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  LogOut,
  AlertCircle,
  CheckCircle2,
  Inbox,
  User,
  Users,
  BookOpen,
} from "lucide-react";

export default function AdminDonationsClient({ initialAdminEmail = "Admin" }) {
  const router = useRouter();
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({ totalCount: 0, totalAmountUsd: 0 });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 10,
  });
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState(null);
  const [adminEmail, setAdminEmail] = useState(initialAdminEmail);

  // Fetch verified donations through the server-side BFF proxy
  const fetchDonations = useCallback(
    async (page = 1, searchQuery = "", shouldSetLoading = true) => {
      if (shouldSetLoading) {
        setIsLoading(true);
      }
      setError(null);

      try {
        const queryParams = new URLSearchParams({
          page: String(page),
          limit: "10",
          ...(searchQuery ? { search: searchQuery } : {}),
        });

        const res = await fetch(`/api/admin/donations?${queryParams.toString()}`, {
          credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data?.error || "Failed to load donation records.");
          setDonations([]);
          return;
        }

        setDonations(data.donations || []);
        setPagination(
          data.pagination || { currentPage: 1, totalPages: 1, totalCount: 0, limit: 10 }
        );
        setStats(data.stats || { totalCount: 0, totalAmountUsd: 0 });
      } catch (err) {
        console.error("[Admin Fetch Error]", err);
        setError(err?.message || "Failed to fetch donations from server.");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    let isMounted = true;

    async function initDashboard() {
      try {
        const res = await fetch("/api/admin/me", {
          credentials: "include",
        });
        if (res.status === 401) {
          router.replace("/admin/login");
          return;
        }
        const data = await res.json();
        if (isMounted && data?.email) {
          setAdminEmail(data.email);
        }
      } catch (err) {
        console.warn("[Session check warning]", err?.message);
      }

      if (isMounted) {
        await fetchDonations(1, "", false);
      }
    }

    initDashboard();

    return () => {
      isMounted = false;
    };
  }, [router, fetchDonations]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    fetchDonations(1, searchInput);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    fetchDonations(newPage, search);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (amount) => {
    const num = typeof amount === "number" ? amount : parseFloat(amount) || 0;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] text-[#252525] py-8 sm:py-12 px-3.5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Admin Top Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-[#E5DFD3] shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#FAF8F2] border border-[#B89550]/40 flex items-center justify-center text-[#B89550] shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-[#252525]">
                  Donation Management
                </h1>
                <span className="px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#B89550] bg-[#FAF8F2] border border-[#B89550]/30 rounded-full">
                  Admin
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#595959]">
                Al Hidayah Islamic Center — Verified Stripe Donations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm text-[#595959] hidden sm:inline">
              Logged in as: <strong className="text-[#252525]">{adminEmail}</strong>
            </span>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[#595959] hover:text-red-700 bg-[#FAF8F2] hover:bg-red-50 border border-[#E5DFD3] hover:border-red-200 rounded-xl transition-all cursor-pointer disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              <span>{isLoggingOut ? "Signing Out..." : "Sign Out"}</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher: Donations vs Verifications */}
        <div className="flex items-center gap-3 border-b border-[#E5DFD3] pb-3">
          <Link
            href="/admin/donations"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#B89550] bg-white border border-[#E5DFD3] shadow-xs transition-all"
          >
            <DollarSign className="w-4 h-4 text-[#B89550]" />
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
        </div>

        {/* Live Aggregate Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Total Verified Revenue */}
          <div className="relative p-5 sm:p-6 rounded-2xl bg-white border border-[#B89550]/30 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-[#B89550] uppercase tracking-wider">
                  Total Verified Funds
                </p>
                <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#252525]">
                  {formatCurrency(stats.totalAmountUsd)}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F2] text-[#B89550] border border-[#B89550]/30 flex items-center justify-center shadow-sm">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
            <p className="mt-3 text-xs text-[#595959]">
              Aggregated directly from verified Stripe payments via AIC_SERVER
            </p>
          </div>

          {/* Confirmed Donations Count */}
          <div className="relative p-5 sm:p-6 rounded-2xl bg-white border border-[#E5DFD3] shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-[#595959] uppercase tracking-wider">
                  Confirmed Donations
                </p>
                <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#252525]">
                  {stats.totalCount.toLocaleString()}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F2] text-[#B89550] border border-[#E5DFD3] flex items-center justify-center shadow-sm">
                <Heart className="w-6 h-6" />
              </div>
            </div>
            <p className="mt-3 text-xs text-[#595959]">
              Verified individual transactions recorded in database
            </p>
          </div>

          {/* Verified Status Banner */}
          <div className="relative p-5 sm:p-6 rounded-2xl bg-white border border-[#E5DFD3] shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-emerald-700 uppercase tracking-wider">
                  Verification Protocol
                </p>
                <h3 className="mt-2 text-lg font-bold text-[#252525] flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  Stripe Webhook Sync
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>
            <p className="mt-3 text-xs text-[#595959]">
              Live server-to-server proxy with cryptographically verified records
            </p>
          </div>
        </div>

        {/* Search Bar & Refresh Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DFD3] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
            <input
              type="text"
              placeholder="Search by email, name, or session ID..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3] text-sm text-[#252525] placeholder-[#8C827A] focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all"
            />
          </form>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => fetchDonations(pagination.currentPage, search)}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[#252525] hover:text-[#B89550] bg-[#FAF8F2] hover:bg-[#F1EDE3] border border-[#E5DFD3] rounded-xl transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Error State Banner */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <div className="flex-1">
              <p className="font-semibold">Unable to fetch records</p>
              <p className="text-xs text-red-700/80">{error}</p>
            </div>
            <button
              onClick={() => fetchDonations(pagination.currentPage, search)}
              className="px-3 py-1 text-xs font-bold text-red-800 bg-red-100 rounded-lg hover:bg-red-200 border border-red-300 cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Responsive Donations Table */}
        <div className="relative rounded-2xl bg-white border border-[#E5DFD3] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#252525]">
              <thead className="text-xs uppercase tracking-wider text-[#B89550] bg-[#F1EDE3] border-b border-[#E5DFD3]">
                <tr>
                  <th scope="col" className="px-5 py-4 font-bold">
                    Date & Time
                  </th>
                  <th scope="col" className="px-5 py-4 font-bold">
                    Donor
                  </th>
                  <th scope="col" className="px-5 py-4 font-bold">
                    Amount (USD)
                  </th>
                  <th scope="col" className="px-5 py-4 font-bold">
                    Status
                  </th>
                  <th scope="col" className="px-5 py-4 font-bold">
                    Session Identifier
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DFD3] font-normal">
                {isLoading ? (
                  // Loading Skeleton Rows
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-5 py-4">
                        <div className="h-4 w-28 bg-[#F1EDE3] rounded" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="h-4 w-36 bg-[#F1EDE3] rounded" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="h-4 w-20 bg-[#F1EDE3] rounded" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="h-4 w-16 bg-[#F1EDE3] rounded" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="h-4 w-44 bg-[#F1EDE3] rounded" />
                      </td>
                    </tr>
                  ))
                ) : donations.length === 0 ? (
                  // Empty State
                  <tr>
                    <td colSpan="5" className="px-5 py-12 text-center text-[#595959]">
                      <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                        <div className="w-14 h-14 rounded-2xl bg-[#FAF8F2] border border-[#E5DFD3] flex items-center justify-center text-[#B89550] mb-3">
                          <Inbox className="w-7 h-7" />
                        </div>
                        <h4 className="text-base font-semibold text-[#252525]">
                          No verified donations found
                        </h4>
                        <p className="mt-1 text-xs text-[#595959] leading-relaxed">
                          {search
                            ? `No records match your search "${search}". Try clearing your search query.`
                            : "Verified donation payments recorded by the Stripe webhook will appear here automatically."}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  // Donation Rows
                  donations.map((donation) => (
                    <tr
                      key={donation._id || donation.stripeSessionId}
                      className="hover:bg-[#FAF8F2]/60 transition-colors"
                    >
                      {/* Date */}
                      <td className="px-5 py-4 whitespace-nowrap text-xs sm:text-sm text-[#595959]">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[#B89550]" />
                          <span>{formatDate(donation.createdAt)}</span>
                        </div>
                      </td>

                      {/* Donor */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#FAF8F2] text-[#B89550] border border-[#B89550]/30 flex items-center justify-center text-xs font-bold shrink-0">
                            {donation.donorName
                              ? donation.donorName.charAt(0).toUpperCase()
                              : donation.donorEmail
                              ? donation.donorEmail.charAt(0).toUpperCase()
                              : "A"}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-[#252525] truncate">
                              {donation.donorName || "Anonymous Donor"}
                            </span>
                            {donation.donorEmail && (
                              <span className="text-xs text-[#595959] truncate">
                                {donation.donorEmail}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="text-base font-extrabold text-[#B89550]">
                          {formatCurrency(donation.amountUsd ?? donation.amount)}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Paid</span>
                        </span>
                      </td>

                      {/* Stripe Session Identifier */}
                      <td className="px-5 py-4 whitespace-nowrap text-xs font-mono text-[#595959]">
                        <span className="bg-[#FAF8F2] px-2 py-1 rounded border border-[#E5DFD3]">
                          {donation.stripeSessionId
                            ? `${donation.stripeSessionId.slice(0, 14)}...${donation.stripeSessionId.slice(-6)}`
                            : "N/A"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="p-4 sm:p-5 bg-[#F1EDE3]/60 border-t border-[#E5DFD3] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#595959]">
              Showing{" "}
              <strong className="text-[#252525]">
                {donations.length > 0 ? (pagination.currentPage - 1) * pagination.limit + 1 : 0}
              </strong>{" "}
              to{" "}
              <strong className="text-[#252525]">
                {Math.min(pagination.currentPage * pagination.limit, pagination.totalCount)}
              </strong>{" "}
              of <strong className="text-[#252525]">{pagination.totalCount}</strong> matching records
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage <= 1 || isLoading}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#252525] hover:text-[#B89550] bg-white hover:bg-[#FAF8F2] border border-[#E5DFD3] rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              <span className="px-3 py-1 text-xs font-semibold text-[#252525] bg-white border border-[#E5DFD3] rounded-lg shadow-sm">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>

              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage >= pagination.totalPages || isLoading}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#252525] hover:text-[#B89550] bg-white hover:bg-[#FAF8F2] border border-[#E5DFD3] rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
