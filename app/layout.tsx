import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import VideoBackdrop from "@/components/VideoBackdrop";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "BareCanvas — Oceania",
  description:
    "An immersive editorial space by the Australian coastline — writing, cooking, a real astrological blueprint, and photos, carried on one continuous tide.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="grain">
        <ThemeProvider>
          <VideoBackdrop />
          <NavBar />
          <main className="relative z-10">{children}</main>
          <footer className="relative z-10 px-5 sm:px-8 py-10">
            <p className="text-center text-[11px] tracking-wide text-foam/60">
              © 2026 Bare<span className="italic">Canvas</span>. Carried on the tide.
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
