"use client";

import { Insight } from "@/lib/types";

interface InsightCardProps {
  insight: Insight;
  index: number;
}

const typeConfig: Record<
  Insight["type"],
  { icon: React.ReactNode; gradient: string; badge: string; badgeColor: string }
> = {
  highlight: {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    gradient: "from-accent-emerald to-accent-cyan",
    badge: "Highlight",
    badgeColor: "bg-accent-emerald/10 text-accent-emerald",
  },
  trend: {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    gradient: "from-accent-primary to-accent-primary-hover",
    badge: "Trend",
    badgeColor: "bg-accent-primary/10 text-accent-primary",
  },
  anomaly: {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    gradient: "from-accent-amber to-accent-red",
    badge: "Anomaly",
    badgeColor: "bg-accent-amber/10 text-accent-amber",
  },
  warning: {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    gradient: "from-accent-red to-accent-pink",
    badge: "Warning",
    badgeColor: "bg-accent-red/10 text-accent-red",
  },
};

export default function InsightCard({ insight, index }: InsightCardProps) {
  const config = typeConfig[insight.type];
  const delayClass =
    index === 0
      ? "fade-in-up"
      : index === 1
        ? "fade-in-up-delay-1"
        : index === 2
          ? "fade-in-up-delay-2"
          : index === 3
            ? "fade-in-up-delay-3"
            : "fade-in-up-delay-4";

  return (
    <div
      className={`glass-card group relative overflow-hidden p-5 ${delayClass}`}
      id={`insight-${insight.id}`}
    >
      {/* Gradient accent line */}
      <div
        className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${config.gradient}`}
      />

      <div className="pl-3">
        {/* Header */}
        <div className="mb-2 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className={`${config.badgeColor} rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider`}>
              {config.badge}
            </span>
          </div>
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${config.gradient} text-white opacity-80`}
          >
            {config.icon}
          </span>
        </div>

        {/* Title */}
        <h4 className="mb-1 text-sm font-semibold text-text-primary">
          {insight.title}
        </h4>

        {/* Description */}
        <p className="mb-3 text-xs leading-relaxed text-text-secondary">
          {insight.description}
        </p>

        {/* Footer Stats */}
        <div className="flex items-center gap-3">
          {insight.value && (
            <span className="rounded-lg bg-surface-hover px-2.5 py-1 text-xs font-bold text-text-primary">
              {insight.value}
            </span>
          )}
          {insight.change !== undefined && (
            <span
              className={`flex items-center gap-0.5 text-xs font-semibold ${
                insight.change >= 0 ? "text-accent-emerald" : "text-accent-red"
              }`}
            >
              {insight.change >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(Math.round(insight.change))}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
