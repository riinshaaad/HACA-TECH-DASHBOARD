"use client";

import { CompetitorRank } from "@/lib/types";

interface CompetitorMentionsProps {
  data: CompetitorRank[];
}

export default function CompetitorMentions({ data }: CompetitorMentionsProps) {
  // If we have a lot of data, just show top 8
  const displayData = data.slice(0, 8);
  const maxVal = Math.max(...displayData.map((d) => d.mentions), 1);

  return (
    <div className="glass-card-static overflow-hidden fade-in-up" id="competitor-mentions">
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-pink/15">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ec4899"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">
              Top Compared Institutes
            </h3>
            <p className="text-xs text-text-muted">
              Institutes students compared HACA against before joining
            </p>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="space-y-4">
          {displayData.length === 0 && (
            <p className="text-sm text-text-muted">No competitor data found.</p>
          )}
          {displayData.map((comp, i) => (
            <div key={comp.name} className="flex items-center gap-4">
              <div className="flex w-6 shrink-0 justify-center">
                <span className="text-xs font-bold text-text-muted">
                  #{i + 1}
                </span>
              </div>
              <div className="flex-1">
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-text-primary">
                    {comp.name}
                  </span>
                  <span className="font-bold text-accent-pink">
                    {comp.mentions}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-hover">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent-pink to-accent-primary-hover transition-all duration-700"
                    style={{
                      width: `${(comp.mentions / maxVal) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
