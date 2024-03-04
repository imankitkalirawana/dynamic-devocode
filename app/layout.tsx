import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/common/Navbar";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
// import ProgressBarI from "@/components/common/ProgressBar";

export const metadata: Metadata = {
  title: "Devocode By Divinely Developer",
  description:
    "Devocode by Divinely Developer is a platform for LPU students to share study resources and get easy access to study materials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme={"default"}
      className="transition-all duration-1000"
    >
      <body>
        <Providers>
          <Navbar />
          <Toaster position="bottom-center" containerClassName="mt-16" />

          <main className="mb-24">
            {children}
            <Analytics />
            <SpeedInsights />
          </main>
          {/* <ProgressBarI /> */}
        </Providers>
      </body>
    </html>
  );
}
