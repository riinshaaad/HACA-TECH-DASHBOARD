"use client";

import { FilterState, MonthOption } from "@/lib/types";

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  courses: string[];
  districts: string[];
  statuses: string[];
  months: MonthOption[];
  batches: string[];
  years: string[];
}

export default function FilterBar({
  filters,
  onFilterChange,
  courses,
  districts,
  statuses,
  months,
  batches,
  years,
}: FilterBarProps) {
  const hasActiveFilters = Object.values(filters).some(
    (val) => val && val !== "All"
  );

  const chartFilters = [
    { key: "gender", label: "Gender", value: filters.gender },
    { key: "ageGroup", label: "Age", value: filters.ageGroup },
    { key: "leadSource", label: "Source", value: filters.leadSource },
    {
      key: "educationalBackground",
      label: "Education",
      value: filters.educationalBackground,
    },
    { key: "seenAds", label: "Seen Ads", value: filters.seenAds },
    {
      key: "influencingContent",
      label: "Content",
      value: filters.influencingContent,
    },
    { key: "choseDueToAI", label: "AI Influence", value: filters.choseDueToAI },
    {
      key: "reasonForChoosingInstitute",
      label: "Reason",
      value: filters.reasonForChoosingInstitute,
    },
    {
      key: "reviewFrequency",
      label: "Review Freq",
      value: filters.reviewFrequency,
    },
  ];

  const getSelectClassName = (isActive: boolean) =>
    `h-7 rounded-lg border px-2.5 py-0.5 text-xs font-medium outline-none transition-all cursor-pointer ${
      isActive
        ? "border-accent-primary bg-accent-primary/15 font-semibold text-accent-primary shadow-sm"
        : "border-border/70 bg-surface-hover text-text-primary hover:border-border"
    }`;

  const resetAllFilters = () =>
    onFilterChange({
      course: "All",
      district: "All",
      currentStatus: "All",
      month: "All",
      batch: "All",
      year: "All",
      gender: "All",
      ageGroup: "All",
      leadSource: "All",
      educationalBackground: "All",
      seenAds: "All",
      influencingContent: "All",
      choseDueToAI: "All",
      reasonForChoosingInstitute: "All",
      reviewFrequency: "All",
    });

  return (
    <div
      className="fade-in-up flex flex-wrap items-center gap-2 rounded-xl border border-accent-primary/20 bg-gradient-to-r from-accent-primary/10 via-surface-elevated/80 to-accent-primary/5 px-3 py-2 shadow-sm backdrop-blur-md"
      id="filter-bar"
    >
      {/* Slicers Label */}
      <div className="flex items-center gap-1.5 pr-1 text-xs font-semibold text-text-primary">
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
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        <span>Slicers:</span>
      </div>

      {/* Course Slicer */}
      <select
        id="course-filter"
        title="Course"
        aria-label="Course"
        value={filters.course}
        onChange={(e) =>
          onFilterChange({ ...filters, course: e.target.value })
        }
        className={getSelectClassName(filters.course !== "All")}
      >
        <option value="All">All Courses</option>
        {courses.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* District Slicer */}
      <select
        id="district-filter"
        title="District"
        aria-label="District"
        value={filters.district}
        onChange={(e) =>
          onFilterChange({ ...filters, district: e.target.value })
        }
        className={getSelectClassName(filters.district !== "All")}
      >
        <option value="All">All Districts</option>
        {districts.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      {/* Current Status Slicer */}
      <select
        id="status-filter"
        title="Current Status"
        aria-label="Current Status"
        value={filters.currentStatus}
        onChange={(e) =>
          onFilterChange({ ...filters, currentStatus: e.target.value })
        }
        className={getSelectClassName(filters.currentStatus !== "All")}
      >
        <option value="All">All Statuses</option>
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/* Month Slicer */}
      <select
        id="month-filter"
        title="Month"
        aria-label="Month"
        value={filters.month}
        onChange={(e) =>
          onFilterChange({ ...filters, month: e.target.value })
        }
        className={getSelectClassName(filters.month !== "All")}
      >
        <option value="All">All Months</option>
        {months.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>

      {/* Batch Slicer */}
      <select
        id="batch-filter"
        title="Batch"
        aria-label="Batch"
        value={filters.batch}
        onChange={(e) =>
          onFilterChange({ ...filters, batch: e.target.value })
        }
        className={getSelectClassName(filters.batch !== "All")}
      >
        <option value="All">All Batches</option>
        {batches.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      {/* Year Slicer */}
      <select
        id="year-filter"
        title="Year"
        aria-label="Year"
        value={filters.year}
        onChange={(e) =>
          onFilterChange({ ...filters, year: e.target.value })
        }
        className={getSelectClassName(filters.year !== "All")}
      >
        <option value="All">All Years</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      {/* Active Chart Cross-Filter Slicers */}
      {chartFilters.map(
        (cf) =>
          cf.value &&
          cf.value !== "All" && (
            <span
              key={cf.key}
              className="inline-flex h-7 items-center gap-1.5 rounded-lg border border-accent-pink/40 bg-accent-pink/15 px-2.5 text-xs font-semibold text-accent-pink shadow-sm transition-all"
            >
              <span className="font-normal text-text-muted">{cf.label}:</span>
              <span>{cf.value}</span>
              <button
                onClick={() =>
                  onFilterChange({ ...filters, [cf.key]: "All" })
                }
                className="ml-0.5 rounded hover:bg-accent-pink/20 focus:outline-none"
                title={`Remove ${cf.label} filter`}
              >
                ×
              </button>
            </span>
          )
      )}

      {/* Clear All Button */}
      {hasActiveFilters && (
        <button
          id="clear-filters"
          onClick={resetAllFilters}
          className="ml-auto h-7 rounded-lg border border-accent-primary/30 bg-accent-primary/10 px-2.5 text-xs font-semibold text-accent-primary transition-colors hover:bg-accent-primary/20"
        >
          Clear All
        </button>
      )}
    </div>
  );
}
