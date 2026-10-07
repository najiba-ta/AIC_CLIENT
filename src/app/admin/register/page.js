"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  KeyRound,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inviteCode: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [clientValidation, setClientValidation] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setClientValidation("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setClientValidation("");

    // Client-side validations
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.inviteCode.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setClientValidation("Please fill out all required fields.");
      return;
    }

    if (formData.password.length < 8) {
      setClientValidation("Password must be at least 8 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setClientValidation("Passwords do not match. Please verify and try again.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Registration failed. Please check your credentials.");
      }

      // Refresh router cache and navigate to protected donations dashboard
      router.refresh();
      router.replace("/admin/donations");
    } catch (err) {
      setError(err.message || "An unexpected error occurred during registration.");
    } finally {
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
          Admin Registration
        </h2>
        <p className="mt-2 text-sm text-[#595959]">
          Al Hidayah Islamic Center — Restricted Administrator Setup
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-stone-300/40 rounded-2xl border border-[#E5DFD3] relative">
          <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#B89550]/60 to-transparent" />

          {/* Security Notice Banner */}
          <div className="mb-6 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Restricted Access:</strong> An authorized Invitation Code is required to register new center administrators.
            </span>
          </div>

          {/* Error Message */}
          {(error || clientValidation) && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error || clientValidation}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold uppercase tracking-wider text-[#595959] mb-1.5"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Administrator"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#D6CEC0] text-sm text-[#252525] placeholder-stone-400 focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all"
                />
              </div>
            </div>

            {/* Admin Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-[#595959] mb-1.5"
              >
                Admin Email Address
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
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#D6CEC0] text-sm text-[#252525] placeholder-stone-400 focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all"
                />
              </div>
            </div>

            {/* Invitation Code / Secret Key */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="inviteCode"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#595959]"
                >
                  Admin Invitation Code
                </label>
                <span className="text-[11px] text-[#B89550] font-medium">
                  Provided by system admin
                </span>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
                <input
                  id="inviteCode"
                  name="inviteCode"
                  type="password"
                  required
                  placeholder="Enter authorized invitation secret"
                  value={formData.inviteCode}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#D6CEC0] text-sm text-[#252525] placeholder-stone-400 focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all font-mono"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-[#595959] mb-1.5"
              >
                Password (min 8 characters)
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
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

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-semibold uppercase tracking-wider text-[#595959] mb-1.5"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#D6CEC0] text-sm text-[#252525] placeholder-stone-400 focus:outline-none focus:border-[#B89550] focus:ring-1 focus:ring-[#B89550] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
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
                    <span>Create Admin Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Links */}
          <div className="mt-6 pt-6 border-t border-[#E5DFD3] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7280]">
            <Link
              href="/admin/login"
              className="hover:text-[#B89550] transition-colors inline-flex items-center gap-1 font-medium"
            >
              Already registered? <span className="text-[#B89550] underline">Sign In</span>
            </Link>
            <Link
              href="/"
              className="hover:text-[#B89550] transition-colors inline-flex items-center gap-1"
            >
              ← Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
