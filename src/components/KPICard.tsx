"use client";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: number;
  icon: React.ReactNode;
  gradient: string;
  delay?: number;
}

export default function KPICard({
  title,
  value,
  subtitle,
  change,
  icon,
  gradient,
  delay = 0,
}: KPICardProps) {
  const animClass =
    delay === 0
      ? "fade-in-up"
      : delay === 1
        ? "fade-in-up-delay-1"
        : delay === 2
          ? "fade-in-up-delay-2"
          : delay === 3
            ? "fade-in-up-delay-3"
            : "fade-in-up-delay-4";

  return (
    <div
      className={`glass-card group relative overflow-hidden p-5 ${animClass}`}
      id={`kpi-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {/* Background Gradient Orb */}
      <div
        className={`absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40 ${gradient}`}
      />

      <div className="relative">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            {title}
          </span>
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-white shadow-md`}
          >
            {icon}
          </div>
        </div>

        {/* Value */}
        <div className="mb-1 text-3xl font-bold tracking-tight text-text-primary">
          {value}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2">
          {change !== undefined && (
            <span
              className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
                change >= 0
                  ? "bg-accent-emerald/10 text-accent-emerald"
                  : "bg-accent-red/10 text-accent-red"
              }`}
            >
              {change >= 0 ? (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M7 17l5-5 5 5" />
                </svg>
              ) : (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M7 7l5 5 5-5" />
                </svg>
              )}
              {Math.abs(change)}%
            </span>
          )}
          {subtitle && (
            <span className="text-xs text-text-muted">{subtitle}</span>
          )}
        </div>
      </div>
    </div>
  );
}
