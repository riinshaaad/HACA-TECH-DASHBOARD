import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HACA Dashboard — Live Enrollment Analytics",
  description:
    "Real-time enrollment analytics dashboard for HACA Tech School. Track courses, lead sources, district breakdowns, and competitive benchmarks from live Google Form responses.",
  keywords: [
    "enrollment dashboard",
    "analytics",
    "courses",
    "leads",
    "HACA Tech School",
  ],
  openGraph: {
    title: "HACA Dashboard — Live Enrollment Analytics",
    description:
      "Real-time enrollment analytics dashboard with interactive charts and competitive benchmarking.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
