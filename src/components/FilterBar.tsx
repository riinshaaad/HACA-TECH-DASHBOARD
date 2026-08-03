"use client";

import { FilterState, MonthOption } from "@/lib/types";
import MultiSelect from "./MultiSelect";

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
  const hasActiveFilters = Object.values(filters).some((val) => {
    if (Array.isArray(val)) {
      return val.length > 0 && !val.includes("All");
    }
    return val && val !== "All";
  });

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

  const resetAllFilters = () =>
    onFilterChange({
      course: ["All"],
      district: ["All"],
      currentStatus: ["All"],
      month: ["All"],
      batch: ["All"],
      year: ["All"],
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
      className="relative z-30 fade-in-up flex flex-wrap items-center gap-2 rounded-xl border border-accent-primary/20 bg-gradient-to-r from-accent-primary/10 via-surface-elevated/80 to-accent-primary/5 px-3 py-2 shadow-sm backdrop-blur-md"
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
      <MultiSelect
        label="Course"
        placeholder="All Courses"
        options={courses.map((c) => ({ label: c, value: c }))}
        selectedValues={filters.course}
        onChange={(vals) => onFilterChange({ ...filters, course: vals })}
      />

      {/* District Slicer */}
      <MultiSelect
        label="District"
        placeholder="All Districts"
        options={districts.map((d) => ({ label: d, value: d }))}
        selectedValues={filters.district}
        onChange={(vals) => onFilterChange({ ...filters, district: vals })}
      />

      {/* Current Status Slicer */}
      <MultiSelect
        label="Status"
        placeholder="All Statuses"
        options={statuses.map((s) => ({ label: s, value: s }))}
        selectedValues={filters.currentStatus}
        onChange={(vals) => onFilterChange({ ...filters, currentStatus: vals })}
      />

      {/* Month Slicer */}
      <MultiSelect
        label="Month"
        placeholder="All Months"
        options={months.map((m) => ({ label: m.label, value: m.value }))}
        selectedValues={filters.month}
        onChange={(vals) => onFilterChange({ ...filters, month: vals })}
      />

      {/* Batch Slicer */}
      <MultiSelect
        label="Batch"
        placeholder="All Batches"
        options={batches.map((b) => ({ label: b, value: b }))}
        selectedValues={filters.batch}
        onChange={(vals) => onFilterChange({ ...filters, batch: vals })}
      />

      {/* Year Slicer */}
      <MultiSelect
        label="Year"
        placeholder="All Years"
        options={years.map((y) => ({ label: y, value: y }))}
        selectedValues={filters.year}
        onChange={(vals) => onFilterChange({ ...filters, year: vals })}
      />

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
