"use client";

import { EnrollmentData } from "@/lib/types";

interface RespondentListProps {
  data: EnrollmentData[];
}

export default function RespondentList({ data }: RespondentListProps) {
  // Sort by enrollment date or just use the current order (which is usually chronological from sheets)
  // We'll just display them as-is, maybe limit to showing a clean scrollable list
  return (
    <div className="glass-card-static p-5 fade-in-up-delay-4 h-[400px] flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-primary/15">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7b5cfa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-text-primary">
            Respondent Directory
          </h3>
        </div>
        <div className="text-xs font-medium text-text-secondary">
          <span className="text-accent-primary font-bold">{data.length}</span> students
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-text-muted">No respondents found</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {data.map((student, index) => {
              const name = student.name || "Unknown";
              const batch = student.batchName || "N/A";
              // Generate a stable color based on index or name for the avatar
              const isEven = index % 2 === 0;

              return (
                <div
                  key={`${index}-${name}`}
                  className="flex items-center justify-between rounded-lg bg-surface-hover/30 p-3 transition-colors hover:bg-surface-hover"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isEven
                          ? "bg-accent-primary/20 text-accent-primary"
                          : "bg-accent-secondary/20 text-accent-secondary"
                      }`}
                    >
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <p className="truncate text-sm font-medium text-text-primary">
                      {name}
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-4 rounded-md bg-surface-elevated px-2 py-1 border border-border">
                    <p className="text-xs font-medium text-text-secondary">
                      {batch}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
