import { Plus_Jakarta_Sans, Cinzel, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

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
      className={`${plusJakartaSans.variable} ${cinzel.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
