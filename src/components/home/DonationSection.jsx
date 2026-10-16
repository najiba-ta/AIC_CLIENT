"use client";

import { useState } from "react";
import { Heart, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function DonationSection() {
  const { isBn } = useLanguage();
  const [selectedPreset, setSelectedPreset] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [touchedCustom, setTouchedCustom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const donationOptions = [
    {
      amount: 25,
      label: "$25",
      impact: isBn
        ? "প্রতিদিনের নামাজখানা ও সেন্টারের রক্ষণাবেক্ষণে সহায়তা করে।"
        : "Supports daily prayer hall operations and center upkeep.",
    },
    {
      amount: 50,
      label: "$50",
      impact: isBn
        ? "দ্বীনি শিক্ষার উপকরণ ও নিয়মিত ক্লাসের খরচ বহনে ভূমিকা রাখে।"
        : "Sponsors educational materials and weekly youth classes.",
      suggested: true,
    },
    {
      amount: 100,
      label: "$100",
      impact: isBn
        ? "কমিউনিটি খাদ্য বিতরণ, জরুরি মানবিক সহায়তা ও পরিবার কল্যাণ নিশ্চিত করে।"
        : "Empowers community outreach, food drives, and family welfare.",
    },
  ];

  // Validation logic
  const parsedCustom = Number(customAmount);
  const isCustomValidNumber =
    customAmount.trim() !== "" &&
    !isNaN(parsedCustom) &&
    isFinite(parsedCustom) &&
    parsedCustom >= 1 &&
    parsedCustom <= 100000;

  let validationError = null;
  if (isCustom) {
    if (!customAmount.trim()) {
      if (touchedCustom) {
        validationError = "Please enter a donation amount (minimum $1.00).";
      }
    } else if (isNaN(parsedCustom) || !isFinite(parsedCustom) || parsedCustom <= 0) {
      validationError = "Please enter a valid positive amount (e.g. $10).";
    } else if (parsedCustom < 1) {
      validationError = "Donation amount must be at least $1.00 USD.";
    } else if (parsedCustom > 100000) {
      validationError = "Donation amount cannot exceed $100,000 USD.";
    }
  }

  const isValidAmount = isCustom ? isCustomValidNumber : selectedPreset !== null && selectedPreset > 0;

  const currentAmountDisplay = isCustom
    ? isCustomValidNumber
      ? `$${parsedCustom.toLocaleString()}`
      : ""
    : `$${selectedPreset}`;

  const handleSelectPreset = (amount) => {
    setSelectedPreset(amount);
    setIsCustom(false);
    setTouchedCustom(false);
    setCheckoutError(null);
  };

  const handleSelectCustom = () => {
    setIsCustom(true);
    setSelectedPreset(null);
    setTouchedCustom(true);
    setCheckoutError(null);
  };

  const handleCustomInputChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    setIsCustom(true);
    setSelectedPreset(null);
    setTouchedCustom(true);
    setCheckoutError(null);
  };

  const handleDonateClick = async () => {
    if (!isValidAmount || isLoading) return;

    const finalAmount = isCustom ? parsedCustom : selectedPreset;
    if (!finalAmount || finalAmount <= 0) return;

    setIsLoading(true);
    setCheckoutError(null);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: finalAmount,
          category: "General Donation",
          donationType: "general",
        }),
      });

      const data = await response.json();

      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || data?.error || "Failed to initiate checkout session.");
      }

      if (data?.url) {
        // Redirect client securely to the Stripe Checkout page returned by AIC_SERVER
        window.location.href = data.url;
      } else {
        throw new Error("No checkout redirect URL received from payment server.");
      }
    } catch (err) {
      console.error("[Donation Checkout Error]", err);
      setCheckoutError(
        err.message || "An unexpected error occurred while connecting to payment. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <section
      id="donate"
      className="relative w-full bg-[#F1EDE3] text-[#252525] py-14 sm:py-20 lg:py-28 px-3 sm:px-6 lg:px-8 border-t border-[#E5DFD3] overflow-hidden scroll-mt-20"
    >
      {/* Background Ambient Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[900px] h-[350px] sm:h-[450px] rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(184, 149, 80, 0.15) 0%, rgba(250, 248, 242, 0.5) 50%, transparent 70%)",
          }}
        />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B89550]/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto min-w-0">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 min-w-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#B89550]/40 text-xs sm:text-sm font-semibold text-[#B89550] shadow-2xs mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89550]" />
            <span>{isBn ? "সহযোগিতা ও দান" : "Support & Give"}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#252525] leading-tight">
            {isBn ? (
              <>
                আমাদের মিশনে{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C]">
                  অনুদান দিন
                </span>
              </>
            ) : (
              <>
                Support{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C]">
                  Our Mission
                </span>
              </>
            )}
          </h2>

          {/* Decorative Subtle Gold Accent Motif */}
          <div className="flex items-center justify-center gap-2 my-3 sm:my-3.5">
            <div className="w-10 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#B89550]/60" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#B89550]" />
            <div className="w-10 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#B89550]/60" />
          </div>

          <p className="text-sm sm:text-base md:text-lg text-[#595959] leading-relaxed sm:leading-loose">
            {isBn
              ? "আপনার আন্তরিক অনুদান আল হিদায়াহ ইসলামিক সেন্টারের ইবাদতখানা রক্ষণাবেক্ষণ, দ্বীনি শিক্ষা এবং অসহায় মানুষের সহায়তায় সরাসরি ব্যবহৃত হয়।"
              : "Your generous contributions enable Al Hidayah Islamic Center to maintain our sacred sanctuary, provide Islamic education, and extend compassionate community support."}
          </p>
        </div>

        {/* Donation Container Card in Frosted Glass */}
        <div className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-10 bg-white/80 backdrop-blur-xl border border-white/85 shadow-xl shadow-stone-300/30 overflow-hidden">
          {/* Specular Light Reflection at the top edge */}
          <div className="glass-specular-top" />
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#B89550]/40 to-transparent rounded-t-2xl sm:rounded-t-3xl" />

          {/* Preset Amount Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 mb-5 sm:mb-6 sm:[&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1">
            {donationOptions.map((option) => {
              const active = !isCustom && selectedPreset === option.amount;
              return (
                <button
                  key={option.amount}
                  type="button"
                  onClick={() => handleSelectPreset(option.amount)}
                  disabled={isLoading}
                  className={`group relative flex flex-col justify-between p-4.5 sm:p-6 rounded-2xl border text-left transition-all duration-200 cursor-pointer disabled:cursor-not-allowed overflow-hidden ${
                    active
                      ? "bg-white border-[#B89550] shadow-md shadow-[#B89550]/15 ring-2 ring-[#B89550]/30"
                      : "bg-white/70 backdrop-blur-sm border-white/80 hover:border-[#B89550]/50 hover:bg-white/95 shadow-xs"
                  }`}
                  aria-pressed={active}
                >
                  <div className="glass-specular-top" />
                  {option.suggested && (
                    <span className="absolute -top-2.5 sm:-top-3 right-3 sm:right-4 px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white bg-[#B89550] rounded-full shadow-2xs">
                      {isBn ? "প্রস্তাবিত" : "Suggested"}
                    </span>
                  )}

                  <div className="flex items-center justify-between w-full mb-2.5 sm:mb-3">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#252525] group-hover:text-[#B89550] transition-colors">
                      {option.label}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors shrink-0 ${
                        active
                          ? "bg-[#B89550] border-[#B89550] text-white"
                          : "border-[#D6CEC0] bg-white/80 group-hover:border-[#B89550]/60"
                      }`}
                    >
                      {active && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#595959] leading-relaxed font-normal">
                    {option.impact}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Custom Amount Option in Frosted Glass */}
          <div
            className={`mb-6 sm:mb-8 p-3.5 sm:p-5 rounded-2xl border transition-all duration-200 overflow-hidden relative ${
              isCustom
                ? "bg-white border-[#B89550] shadow-xs ring-1 ring-[#B89550]/30"
                : "bg-white/70 backdrop-blur-sm border-white/80 hover:border-[#D6CEC0]"
            }`}
          >
            <div className="glass-specular-top" />
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={handleSelectCustom}
                  disabled={isLoading}
                  className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center disabled:cursor-not-allowed ${
                    isCustom
                      ? "bg-[#B89550] text-white border border-[#B89550] ring-2 ring-[#B89550]/30"
                      : "bg-white text-[#252525] border border-[#E5DFD3] hover:border-[#B89550]/50"
                  }`}
                  aria-pressed={isCustom}
                >
                  {isBn ? "অন্যান্য পরিমাণ" : "Custom Amount"}
                </button>
                <span className="text-xs sm:text-sm text-[#595959] text-center sm:text-left">
                  {isBn ? "যেকোনো অঙ্কের অনুদান প্রদান করুন" : "Enter any contribution amount"}
                </span>
              </div>

              {/* Custom Input Field */}
              <div className="relative w-full sm:w-48 lg:w-56">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B89550] font-bold text-base select-none pointer-events-none">
                  $
                </span>
                <input
                  type="number"
                  min="1"
                  step="any"
                  placeholder={isBn ? "পরিমাণ (USD)" : "Other amount"}
                  disabled={isLoading}
                  value={customAmount}
                  onChange={handleCustomInputChange}
                  onFocus={() => {
                    setIsCustom(true);
                    setSelectedPreset(null);
                    setTouchedCustom(true);
                  }}
                  className={`w-full pl-8 pr-4 py-2.5 rounded-xl bg-white border text-[#252525] placeholder-stone-400 text-sm font-semibold focus:outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                    validationError
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : isCustom
                      ? "border-[#B89550] focus:border-[#B89550] focus:ring-2 focus:ring-[#B89550]/30"
                      : "border-[#D6CEC0] focus:border-[#B89550] focus:ring-2 focus:ring-[#B89550]/30"
                  }`}
                />
              </div>
            </div>

            {/* Validation Error Message */}
            {validationError && (
              <div className="mt-3 pt-2.5 border-t border-red-200 flex items-center gap-1.5 text-xs sm:text-sm text-red-600 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}
          </div>

          {/* Action CTA & Transparency Note */}
          <div className="flex flex-col items-center text-center">
            {/* Checkout Error Message */}
            {checkoutError && (
              <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center justify-center gap-2 max-w-lg w-full">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{checkoutError}</span>
              </div>
            )}

            {/* Donate Now Button with Glass Highlight */}
            <button
              type="button"
              onClick={handleDonateClick}
              disabled={!isValidAmount || isLoading}
              className={`w-full sm:w-auto min-h-[50px] inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-bold rounded-xl transition-all duration-200 relative overflow-hidden ${
                isValidAmount && !isLoading
                  ? "btn-gold shadow-lg shadow-[#B89550]/25 hover:shadow-xl hover:shadow-[#B89550]/35"
                  : "bg-stone-200 text-stone-400 border border-stone-300 cursor-not-allowed opacity-70 shadow-none"
              }`}
            >
              {isValidAmount && !isLoading && (
                <div className="absolute top-0 inset-x-0 h-px bg-white/40 pointer-events-none" />
              )}
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white shrink-0" />
                  <span className="text-white font-bold">
                    {isBn ? "চেকআউটে রিডাইরেক্ট হচ্ছে..." : "Redirecting to Checkout..."}
                  </span>
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 fill-current shrink-0" />
                  <span>
                    {isValidAmount
                      ? isBn
                        ? `এখনই ${currentAmountDisplay} দান করুন`
                        : `Donate ${currentAmountDisplay} Now`
                      : isBn
                      ? "একটি পরিমাণ নির্বাচন করুন"
                      : "Select an Amount"}
                  </span>
                </>
              )}
            </button>

            {/* Explanatory Mission Message */}
            <div className="mt-5 sm:mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-[#6B7280] max-w-xl">
              <ShieldCheck className="w-4 h-4 text-[#B89550] shrink-0" />
              <p>
                {isBn
                  ? "আপনার সম্পূর্ণ অনুদান আল হিদায়াহ সেন্টারের ধর্মীয়, শিক্ষামূলক ও মানবিক কার্যক্রমে সরাসরি ব্যবহৃত হয়।"
                  : "Donations directly support the center's religious, educational, and community welfare programs."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
