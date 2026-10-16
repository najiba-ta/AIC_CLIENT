"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Heart, Menu, X, User, GraduationCap, BookOpen, LogIn, Globe, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, isBn } = useLanguage();

  const navLinks = [
    { name: isBn ? "পরিচিতি" : "About", href: "/about" },
    { name: isBn ? "নেতৃত্ব ও টিম" : "Our Team", href: "/our-team" },
    { name: isBn ? "শিক্ষা কার্যক্রম" : "Courses", href: "/courses" },
    { name: isBn ? "প্রোগ্রামসমূহ" : "Programs", href: "/programs" },
    { name: isBn ? "নামাজের সময়সূচি" : "Prayer Times", href: "/prayer-times" },
    { name: isBn ? "ইভেন্টস" : "Events", href: "/events" },
    { name: isBn ? "যোগাযোগ" : "Contact", href: "/contact" },
  ];

  // Fetch current user session (Student/Teacher)
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data?.user) {
            setCurrentUser(data.user);
          } else {
            setCurrentUser(null);
          }
        }
      } catch {
        setCurrentUser(null);
      }
    }
    checkAuth();
  }, [pathname]);

  // Track scroll position for subtle navbar elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on screen resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full px-2.5 sm:px-4 lg:px-6 pt-2.5 sm:pt-3 pb-2 transition-all duration-300">
      <div
        className={`max-w-[1400px] w-full mx-auto rounded-2xl sm:rounded-3xl glass-navbar transition-all duration-300 px-3.5 sm:px-5 lg:px-6 xl:px-8 relative ${
          isScrolled
            ? "!border-[#B89550]/40 shadow-2xl shadow-black/60 py-0.5"
            : "border-white/20 shadow-xl shadow-black/40"
        }`}
      >
        {/* Specular Light Reflection at the top edge */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A86A]/50 to-transparent pointer-events-none rounded-t-2xl sm:rounded-t-3xl" />

        <div className="flex items-center justify-between h-16 sm:h-18 gap-3 lg:gap-4 xl:gap-6">
          
          {/* 1. LEFT SIDE: Logo and Brand Name */}
          <div className="flex items-center shrink-0 min-w-0 mr-1 sm:mr-2">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 group min-w-0 py-1 transition-transform duration-200 active:scale-[0.98]"
            >
              {/* Logo Image with Animated Gold Glow */}
              <div className="relative shrink-0 aspect-square w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-105 transition-all duration-300 border border-white/20 ring-1 ring-[#B89550]/40 group-hover:ring-[#B89550] shadow-md group-hover:shadow-[#B89550]/20">
                <Image
                  src="/images/logo.png"
                  alt="Al Hidayah Islamic Center Logo"
                  width={40}
                  height={40}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Brand Title */}
              <span className="font-brand text-xs sm:text-sm xl:text-base font-bold tracking-wide text-white group-hover:text-[#C9A86A] transition-colors duration-200 truncate whitespace-nowrap">
                {isBn ? "আল হিদায়াহ ইসলামিক সেন্টার" : "Al Hidayah Islamic Center"}
              </span>
            </Link>
          </div>

          {/* 2. MIDDLE: Navigation Links + Highlighted Donate Button with generous spacing */}
          <nav className="hidden lg:flex items-center justify-center gap-1.5 xl:gap-2.5 2xl:gap-3.5 flex-1 min-w-0 mx-2 xl:mx-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 xl:px-3 py-1.5 text-[12px] xl:text-[13px] font-medium rounded-xl transition-all duration-200 relative whitespace-nowrap shrink-0 tracking-normal group ${
                    isActive
                      ? "text-[#C9A86A] bg-white/[0.12] border border-[#B89550]/40 font-semibold shadow-inner"
                      : "text-stone-300 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive ? (
                    <span className="absolute bottom-1 left-2.5 right-2.5 h-0.5 bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#B89550] rounded-full shadow-xs shadow-[#B89550]" />
                  ) : (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#C9A86A]/60 rounded-full group-hover:w-4/5 transition-all duration-200" />
                  )}
                </Link>
              );
            })}

            {/* Highlighted Donate Button with generous spacing after links */}
            <Link
              href="/#donate"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 xl:px-4 py-1.5 text-xs xl:text-sm font-bold text-white bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C] hover:from-[#C29F5B] hover:to-[#AC8947] active:scale-[0.97] rounded-full shadow-md shadow-[#B89550]/30 hover:shadow-lg hover:shadow-[#B89550]/40 transition-all duration-200 whitespace-nowrap ml-3 xl:ml-5 shrink-0 relative overflow-hidden group"
            >
              <div className="absolute top-0 inset-x-0 h-px bg-white/40 pointer-events-none" />
              <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <Heart className="w-3.5 h-3.5 fill-white group-hover:scale-110 transition-transform duration-200" />
              <span>{isBn ? "দান করুন" : "Donate"}</span>
            </Link>
          </nav>

          {/* 3. RIGHT SIDE: GLOBAL LANGUAGE TOGGLE (EN / বাং) + Auth Buttons */}
          <div className="hidden lg:flex items-center justify-end gap-3 xl:gap-4 shrink-0">
            {/* GLOBAL LANGUAGE TOGGLE SWITCH: EN / বাং */}
            <div className="inline-flex items-center p-1 rounded-full bg-stone-900/80 backdrop-blur-md border border-white/15 shadow-inner shrink-0 relative">
              <div className="pl-1.5 pr-1 hidden xl:flex items-center text-stone-400">
                <Globe className="w-3.5 h-3.5 text-[#C9A86A]" />
              </div>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`relative z-10 px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  language === "en"
                    ? "bg-gradient-to-r from-[#B89550] to-[#C9A86A] text-white shadow-xs"
                    : "text-stone-300 hover:text-white hover:bg-white/[0.08]"
                }`}
                aria-label="Switch to English"
                aria-pressed={language === "en"}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("bn")}
                className={`relative z-10 px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  language === "bn"
                    ? "bg-gradient-to-r from-[#B89550] to-[#C9A86A] text-white shadow-xs"
                    : "text-stone-300 hover:text-white hover:bg-white/[0.08]"
                }`}
                aria-label="বাংলা ভাষায় দেখুন"
                aria-pressed={language === "bn"}
              >
                বাং
              </button>
            </div>

            {currentUser ? (
              // Logged-in User Profile Link
              <Link
                href="/portal"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs xl:text-sm font-semibold text-stone-200 hover:text-white bg-white/[0.1] hover:bg-white/[0.16] border border-white/20 hover:border-[#B89550]/50 rounded-full shadow-2xs transition-all duration-200 shrink-0 active:scale-[0.98]"
              >
                {currentUser.role === "teacher" ? (
                  <BookOpen className="w-3.5 h-3.5 text-[#C9A86A]" />
                ) : (
                  <GraduationCap className="w-3.5 h-3.5 text-[#C9A86A]" />
                )}
                <span className="truncate max-w-[80px] xl:max-w-[100px]">{currentUser.name?.split(" ")[0]}</span>
                {currentUser.serialId && (
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-black/60 text-[#C9A86A] rounded border border-[#B89550]/40">
                    {currentUser.serialId}
                  </span>
                )}
              </Link>
            ) : (
              // Sign In & Sign Up Right Buttons with clear spacing
              <div className="flex items-center gap-2 xl:gap-3 shrink-0">
                <Link
                  href="/portal/login"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs xl:text-sm font-semibold text-stone-200 hover:text-white hover:bg-white/[0.1] rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 active:scale-[0.98]"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#C9A86A]" />
                  <span>{isBn ? "লগইন" : "Sign In"}</span>
                </Link>

                <Link
                  href="/portal/register"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs xl:text-sm font-bold text-white hover:text-white bg-[#B89550]/30 hover:bg-[#B89550]/50 border border-[#B89550]/60 hover:border-[#B89550] rounded-xl shadow-xs transition-all duration-200 whitespace-nowrap shrink-0 active:scale-[0.98]"
                >
                  <User className="w-3.5 h-3.5 text-[#C9A86A]" />
                  <span>{isBn ? "নিবন্ধন" : "Sign Up"}</span>
                </Link>
              </div>
            )}
          </div>

          {/* 4. MOBILE / TABLET CONTROLS (Compact Language Toggle + Menu) */}
          <div className="flex lg:hidden items-center justify-end gap-2 shrink-0">
            {/* Compact Language Toggle on Mobile Top Bar */}
            <div className="inline-flex items-center p-0.5 rounded-full bg-stone-900/95 border border-white/10 shadow-inner">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 rounded-full text-[11px] font-bold transition-all duration-200 ${
                  language === "en"
                    ? "bg-[#B89550] text-white"
                    : "text-stone-400"
                }`}
                aria-label="English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("bn")}
                className={`px-2 py-1 rounded-full text-[11px] font-bold transition-all duration-200 ${
                  language === "bn"
                    ? "bg-[#B89550] text-white"
                    : "text-stone-400"
                }`}
                aria-label="বাংলা"
              >
                বাং
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-stone-300 hover:text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#B89550]/50 transition-all duration-200 active:scale-95"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-[#C9A86A]" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5 text-white" aria-hidden="true" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile and Tablet Floating Frosted-Glass Drawer */}
      {isOpen && (
        <div className="lg:hidden max-w-[1400px] w-full mx-auto rounded-2xl glass-navbar !border-white/20 shadow-2xl mt-2 p-4 text-stone-200 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="glass-specular-gold" />

          {/* Full Language Switcher inside Mobile Drawer: EN / বাং */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-800">
            <span className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>Language / ভাষা</span>
            </span>

            <div className="inline-flex items-center p-1 rounded-full bg-stone-900/80 border border-white/15 shadow-inner">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
                  language === "en"
                    ? "bg-gradient-to-r from-[#B89550] to-[#C9A86A] text-white shadow-xs"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("bn")}
                className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
                  language === "bn"
                    ? "bg-gradient-to-r from-[#B89550] to-[#C9A86A] text-white shadow-xs"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                বাং
              </button>
            </div>
          </div>

          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-[#C9A86A] bg-white/[0.1] font-semibold border border-[#B89550]/40 shadow-inner"
                      : "text-stone-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Auth & Donate Actions */}
          <div className="pt-3 mt-3 border-t border-stone-800 space-y-2.5">
            {currentUser ? (
              <Link
                href="/portal"
                onClick={closeMenu}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.08] border border-white/15 text-sm font-semibold text-white active:scale-[0.98]"
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#C9A86A]" />
                  <span>{currentUser.name} ({currentUser.role})</span>
                </div>
                {currentUser.serialId && (
                  <span className="text-xs font-mono font-bold text-[#C9A86A] bg-black/50 px-2 py-0.5 rounded border border-[#B89550]/40">
                    {currentUser.serialId}
                  </span>
                )}
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/portal/login"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-sm font-semibold text-stone-200 hover:text-white text-center transition-all duration-200 active:scale-[0.98]"
                >
                  <LogIn className="w-4 h-4 text-[#C9A86A]" />
                  <span>{isBn ? "লগইন" : "Sign In"}</span>
                </Link>
                <Link
                  href="/portal/register"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#B89550]/25 hover:bg-[#B89550]/35 border border-[#B89550]/50 text-sm font-semibold text-[#E5DFD3] hover:text-white text-center transition-all duration-200 active:scale-[0.98]"
                >
                  <User className="w-4 h-4 text-[#C9A86A]" />
                  <span>{isBn ? "নিবন্ধন" : "Sign Up"}</span>
                </Link>
              </div>
            )}

            <Link
              href="/#donate"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C] hover:from-[#C29F5B] hover:to-[#AC8947] active:scale-[0.98] rounded-xl shadow-lg shadow-[#B89550]/30 transition-all duration-200 relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-px bg-white/40 pointer-events-none" />
              <Heart className="w-4 h-4 fill-white" />
              <span>{isBn ? "দান করুন" : "Donate"}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
