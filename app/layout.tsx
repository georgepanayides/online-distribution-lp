import type { Metadata } from "next";
import { Lato, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const outfitSans = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
})

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Online Distribution - 3PL & Warehousing Experts",
  description: "New Zealand's leading 3PL provider. Enterprise-grade warehousing, fulfilment, and logistics solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfitSans.variable} ${lato.variable} antialiased`}
      >
        <Header />
        <div className="pt-19"> {/* Offset for fixed header */}
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}