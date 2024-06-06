import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/common/Navbar";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
// import ProgressBarI from "@/components/common/ProgressBar";
import { AxiomWebVitals } from "next-axiom";
import ProgressBarI from "@/components/common/ProgressBar";

export const metadata: Metadata = {
  title: {
    default: "Devocode By Divinely Developer",
    template: "%s - Devocode By Divinely Developer",
  },
  description:
    "Devocode by Divinely Developer is a platform for LPU students to share study resources and get easy access to study materials.",
  category: "Education",
  twitter: {
    card: "summary_large_image",
    site: "@divinelydevs",
    title: "Devocode By Divinely Developer",
    description:
      "Devocode by Divinely Developer is a platform for LPU students to share study resources and get easy access to study materials.",
    siteId: "devocode",
    creator: "@divinelydevs",
    images: [
      {
        url: "https://www.devocode.in/devocode.png",
        width: 350,
        height: 350,
        alt: "Devocode By Divinely Developer",
      },
      {
        url: "https://www.devocode.in/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Devocode By Divinely Developer",
      },
    ],
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: ["my-email", "my-link"],
    },
  },
  openGraph: {
    title: "Devocode By Divinely Developer",
    description:
      "Devocode by Divinely Developer is a platform for LPU students to share study resources and get easy access to study materials.",
    type: "website",
    locale: "en_US",
    url: "https://www.devocode.in",
    siteName: "Devocode By Divinely Developer",
    images: [
      {
        url: "https://www.devocode.in/devocode.png",
        width: 350,
        height: 350,
        alt: "Devocode By Divinely Developer",
      },
      {
        url: "https://www.devocode.in/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Devocode By Divinely Developer",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme={"lemonade"} className="dark">
      <body>
        <Providers>
          <Navbar />
          <Toaster
            position="bottom-right"
            theme="dark"
            richColors
            closeButton
          />

          <main className="mb-24">
            {children}
            <Analytics />
            <SpeedInsights />
            <AxiomWebVitals />
          </main>
          <ProgressBarI />
        </Providers>
      </body>
    </html>
  );
}
