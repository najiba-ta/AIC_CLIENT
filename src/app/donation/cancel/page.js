import Link from "next/link";
import { XCircle, ArrowLeft, RefreshCw, Heart } from "lucide-react";

export const metadata = {
  title: "Donation Canceled | Al Hidayah Islamic Center",
  description: "Your donation checkout session was canceled.",
};

export default function DonationCancelPage() {
  return (
    <div className="flex-1 w-full bg-[#FAF8F2] text-[#252525] flex items-center justify-center py-16 sm:py-24 px-3.5 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambient Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[850px] h-[350px] sm:h-[450px] rounded-full opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(241, 237, 227, 0.8) 0%, rgba(184, 149, 80, 0.12) 50%, transparent 70%)",
          }}
        />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B89550]/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-xl w-full mx-auto min-w-0">
        {/* Cancel Notice Card */}
        <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-10 glass-panel shadow-2xl text-center flex flex-col items-center overflow-hidden">
          {/* Top Subtle Card Highlight */}
          <div className="glass-specular-top" />

          {/* Cancel Icon Badge */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 backdrop-blur-md border-2 border-amber-300 flex items-center justify-center text-amber-600 shadow-md mb-6">
            <XCircle className="w-9 h-9 sm:w-11 sm:h-11 text-amber-600" />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-stone-200 text-xs sm:text-sm font-semibold text-[#595959] shadow-2xs mb-4">
            <span>Checkout Canceled</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#252525] leading-tight">
            Donation Was{" "}
            <span className="text-[#B89550]">
              Not Completed
            </span>
          </h1>

          {/* Cancellation Explanation */}
          <p className="mt-4 text-sm sm:text-base text-[#595959] leading-relaxed">
            Your donation checkout session was canceled. No payment has been processed and no charges were made to your card.
          </p>

          <p className="mt-3 text-xs sm:text-sm text-[#6B7280] leading-relaxed max-w-md">
            If you experienced an issue or wish to choose a different donation amount, you can try again at any time.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full">
            {/* Try Again Button */}
            <Link
              href="/#donate"
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-bold text-white bg-[#B89550] hover:bg-[#A58342] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#B89550] focus:ring-offset-2 focus:ring-offset-white rounded-xl shadow-md shadow-[#B89550]/20 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <RefreshCw className="w-4 h-4 shrink-0" />
              <span>Try Again</span>
            </Link>

            {/* Return to Homepage Button */}
            <Link
              href="/"
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#252525] bg-[#FAF8F2] hover:bg-[#F1EDE3] border border-[#E5DFD3] hover:border-[#B89550]/60 hover:text-[#B89550] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#B89550]/50 focus:ring-offset-2 focus:ring-offset-white rounded-xl transition-all duration-200 shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
