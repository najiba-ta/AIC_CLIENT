import Link from "next/link";
import { CheckCircle2, Heart, ArrowLeft, ShieldCheck, Mail } from "lucide-react";

export const metadata = {
  title: "Donation Received | Al Hidayah Islamic Center",
  description: "Thank you for supporting Al Hidayah Islamic Center.",
};

export default function DonationSuccessPage() {
  return (
    <div className="flex-1 w-full bg-[#FAF8F2] text-[#252525] flex items-center justify-center py-16 sm:py-24 px-3.5 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambient Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[850px] h-[350px] sm:h-[450px] rounded-full opacity-40 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(241, 237, 227, 0.8) 0%, rgba(184, 149, 80, 0.15) 50%, transparent 70%)",
          }}
        />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B89550]/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-xl w-full mx-auto min-w-0">
        {/* Success Card */}
        <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-10 glass-panel shadow-2xl text-center flex flex-col items-center overflow-hidden">
          {/* Top Subtle Card Highlight Line */}
          <div className="glass-specular-top" />

          {/* Success Check Icon Badge */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 backdrop-blur-md border-2 border-[#B89550] flex items-center justify-center text-[#B89550] shadow-md mb-6">
            <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11 text-[#B89550]" />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#B89550]/40 text-xs sm:text-sm font-semibold text-[#B89550] shadow-2xs mb-4">
            <Heart className="w-3.5 h-3.5 fill-[#B89550]" />
            <span>Jazakum Allahu Khairan</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#252525] leading-tight">
            Thank You for Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C]">
              Generous Support
            </span>
          </h1>

          {/* Main Thank You Message */}
          <p className="mt-4 text-sm sm:text-base text-[#595959] leading-relaxed">
            Your donation checkout has been submitted successfully to support the religious, educational, and community services at Al Hidayah Islamic Center.
          </p>

          {/* Information & Confirmation Box */}
          <div className="mt-6 w-full p-4 sm:p-5 rounded-xl bg-white/70 backdrop-blur-xs border border-white/80 text-left space-y-3 shadow-xs">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#B89550] shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                Stripe will send an official payment confirmation and receipt directly to the email address provided during checkout.
              </p>
            </div>
            <div className="flex items-start gap-3 pt-2 border-t border-stone-200/60">
              <ShieldCheck className="w-4 h-4 text-[#B89550] shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                Your contribution directly impacts community programs, prayer facilities, and family outreach.
              </p>
            </div>
          </div>

          {/* Return Home Button */}
          <div className="mt-8 w-full sm:w-auto">
            <Link
              href="/"
              className="btn-gold w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm sm:text-base font-bold rounded-xl shadow-md cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span>Return to Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
