"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isInsights = pathname === "/insights";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[98%] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo & Title */}
        <Link href="/dashboard" className="flex items-center gap-2.5 select-none">
          {/* HACA */}
          <div
            className="text-3xl font-black tracking-tighter text-white"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            HACA
          </div>
          {/* Vertical Divider */}
          <div className="h-8 w-[1px] bg-white/50" />
          {/* TECH SCHOOL */}
          <div className="flex flex-col justify-center leading-none pt-0.5">
            <span className="text-[15px] font-bold tracking-[0.15em] text-white">
              TECH
            </span>
            <span className="mt-[2px] bg-[#7B5CFA] px-1 text-[11px] font-bold tracking-[0.15em] text-white w-fit">
              SCHOOL
            </span>
          </div>
        </Link>

        {/* Center Nav Links: Dashboard vs Insights */}
        <div className="flex items-center gap-2 rounded-2xl bg-surface-elevated p-1 border border-border">
          <Link
            href="/dashboard"
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              !isInsights
                ? "bg-accent-primary text-white shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            Dashboard
          </Link>

          <Link
            href="/insights"
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              isInsights
                ? "bg-accent-primary text-white shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-amber-400"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Insights & Reports
          </Link>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-accent-emerald/10 px-3 py-1.5 text-xs font-medium text-accent-emerald">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-emerald opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-emerald" />
            </span>
            Live
          </div>
          <div className="hidden items-center gap-1 text-xs text-text-muted sm:flex">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
            Auto-refresh 60s
          </div>
        </div>
      </div>
    </header>
  );
}
