"use client";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-indigo shadow-lg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3v18h18" />
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
            <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent-emerald ring-2 ring-surface" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-text-primary">
              HACA<span className="gradient-text ml-1">Dashboard</span>
            </h1>
            <p className="hidden text-xs text-text-muted sm:block">
              Live Enrollment Analytics
            </p>
          </div>
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
