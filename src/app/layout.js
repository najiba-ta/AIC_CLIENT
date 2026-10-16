import { Plus_Jakarta_Sans, Cinzel, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Al Hidayah Islamic Center",
  description: "Al Hidayah Islamic Center - Community, Prayer & Services",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${cinzel.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('aic-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans transition-colors duration-300 relative">
        <ThemeProvider>
          <LanguageProvider>
            {/* Cinematic Full-Website Dark Mode Background Layer (Fixed & continuous across scrolling) */}
            <div
              className="fixed inset-0 pointer-events-none z-0 hidden dark:block overflow-hidden"
              aria-hidden="true"
            >
              {/* Quran on Rehal & Madrasa Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transform-gpu"
                style={{
                  backgroundImage: "url('/images/dark-quran-madrasa.jpg')",
                  filter: "brightness(0.36) contrast(1.15) saturate(1.1)",
                }}
              />

              {/* Carefully tuned Dark Charcoal Vignette & Ambient Radial Overlays */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 18%, rgba(25, 24, 20, 0.55) 0%, rgba(17, 17, 15, 0.88) 55%, #11110F 100%)",
                }}
              />

              {/* Subtle Champagne Gold Ambient Glow Bloom from Top */}
              <div
                className="absolute top-0 inset-x-0 h-[600px]"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(214, 182, 109, 0.12) 0%, transparent 70%)",
                }}
              />

              {/* Extra micro-texture overlay for rich luxury feel */}
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#D6B66D_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>

            {/* Application Content with z-10 for proper layering above the fixed background */}
            <div className="relative z-10 flex-1 flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-1 flex flex-col">
                {children}
              </div>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
