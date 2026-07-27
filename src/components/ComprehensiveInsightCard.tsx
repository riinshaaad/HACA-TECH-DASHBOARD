"use client";

import React from "react";
import { ComprehensiveInsight } from "@/lib/types";

interface ComprehensiveInsightCardProps {
  insight: ComprehensiveInsight;
}

export default function ComprehensiveInsightCard({
  insight,
}: ComprehensiveInsightCardProps) {
  const getBadgeStyle = (type?: string) => {
    switch (type) {
      case "highlight":
        return "bg-accent-primary/15 text-accent-primary border-accent-primary/30";
      case "warning":
        return "bg-amber-500/15 text-amber-300 border-amber-500/30";
      case "action":
        return "bg-accent-emerald/15 text-accent-emerald border-accent-emerald/30";
      case "trend":
      default:
        return "bg-accent-secondary/15 text-accent-secondary border-accent-secondary/30";
    }
  };

  return (
    <div className="fade-in-up glass-card-static flex flex-col justify-between p-6 transition-all hover:border-border-hover print:border print:border-gray-300 print:bg-white print:p-4 print:text-black print:shadow-none">
      <div>
        {/* Top Header: Category & Badge */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full bg-surface-elevated px-3 py-1 text-xs font-semibold text-text-secondary border border-border print:bg-gray-100 print:text-gray-700">
            {insight.category}
          </span>
          {insight.badgeType && (
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider ${getBadgeStyle(
                insight.badgeType
              )} print:border-gray-300 print:bg-gray-50 print:text-gray-600`}
            >
              {insight.badgeType}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-3 text-lg font-bold text-text-primary print:text-black">
          {insight.title}
        </h3>

        {/* Insight Interpretation */}
        <div className="mb-4">
          <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-accent-primary print:text-blue-700">
            Insight
          </h4>
          <p className="text-sm leading-relaxed text-text-secondary print:text-gray-800">
            {insight.insight}
          </p>
        </div>

        {/* Supporting Metrics */}
        <div className="mb-4 rounded-xl border border-border/80 bg-surface-hover/40 p-3.5 print:border-gray-200 print:bg-gray-50">
          <h4 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-primary print:text-gray-900">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent-primary"
            >
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            Supporting Metrics
          </h4>
          <ul className="space-y-1.5">
            {insight.supportingMetrics.map((metric, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs font-medium text-text-secondary print:text-gray-700"
              >
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-primary print:bg-gray-600" />
                <span>{metric}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Business / Marketing Impact */}
        <div className="mb-4">
          <h4 className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 print:text-amber-800">
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
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Business / Marketing Impact
          </h4>
          <p className="text-xs leading-relaxed text-text-secondary print:text-gray-800">
            {insight.businessImpact}
          </p>
        </div>
      </div>

      {/* Recommendation (Bottom Highlight Box) */}
      <div className="mt-2 rounded-xl border border-accent-primary/30 bg-accent-primary/10 p-3.5 transition-colors hover:bg-accent-primary/15 print:border-gray-300 print:bg-gray-100">
        <h4 className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-primary print:text-gray-900">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Recommendation
        </h4>
        <p className="text-xs font-medium leading-relaxed text-text-primary print:text-gray-900">
          {insight.recommendation}
        </p>
      </div>
    </div>
  );
}
