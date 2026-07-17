"use client";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo & Title */}
        <div className="flex items-center gap-2.5 select-none">
          {/* HACA */}
          <div className="text-3xl font-black tracking-tighter text-white" style={{ fontFamily: 'Arial, sans-serif' }}>
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
