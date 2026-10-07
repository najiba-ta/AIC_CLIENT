"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Invalid credentials.");
      }

      // Refresh router and navigate to protected donations dashboard
      router.refresh();
      router.replace("/admin/donations");
    } catch (err) {
      setError(err.message || "Failed to log in.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4 text-[#252525]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-[#F1EDE3] border border-[#B89550]/40 flex items-center justify-center text-[#B89550] shadow-md">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight text-[#252525]">
          Admin Portal
        </h2>
        <p className="mt-2 text-sm text-[#595959]">
          Al Hidayah Islamic Center — Secure Donation Management
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-stone-300/40 rounded-2xl border border-[#E5DFD3] relative">
          <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#B89550]/60 to-transparent" />

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-[#595959] mb-1.5"
              >
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="admin@alhidayahcenter.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#D6CEC0] text-sm text-[#252525] placeholder-stone-400 focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-[#595959] mb-1.5"
              >
                Password / Secret Key
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#D6CEC0] text-sm text-[#252525] placeholder-stone-400 focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#B89550] hover:bg-[#A58342] text-white font-bold text-sm tracking-wide shadow-md shadow-[#B89550]/20 hover:shadow-lg transition-all transform active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-[#E5DFD3] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7280]">
            <Link
              href="/admin/register"
              className="hover:text-[#B89550] transition-colors inline-flex items-center gap-1 font-medium"
            >
              New administrator? <span className="text-[#B89550] underline">Register with Code</span>
            </Link>
            <Link
              href="/"
              className="hover:text-[#B89550] transition-colors inline-flex items-center gap-1.5"
            >
              ← Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
