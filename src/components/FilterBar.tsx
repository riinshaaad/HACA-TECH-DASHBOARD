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
  return (
    <div className="fade-in-up glass-card-static p-4" id="filter-bar">
      <div className="mb-3 flex items-center gap-2">
        <svg
          width="16"
          height="16"
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
        <span className="text-sm font-semibold text-text-primary">
          Filter Data
        </span>
        {(filters.course !== "All" ||
          filters.district !== "All" ||
          filters.currentStatus !== "All" ||
          filters.month !== "All" ||
          filters.batch !== "All" ||
          filters.year !== "All") && (
          <button
            id="clear-filters"
            onClick={() =>
              onFilterChange({
                course: "All",
                district: "All",
                currentStatus: "All",
                month: "All",
                batch: "All",
                year: "All",
              })
            }
            className="ml-auto rounded-lg bg-accent-primary/10 px-2.5 py-1 text-xs font-medium text-accent-primary transition-colors hover:bg-accent-primary/20"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {/* Course Filter */}
        <div>
          <label
            htmlFor="course-filter"
            className="mb-1.5 block text-xs font-medium text-text-muted"
          >
            Course
          </label>
          <select
            id="course-filter"
            value={filters.course}
            onChange={(e) =>
              onFilterChange({ ...filters, course: e.target.value })
            }
            className="w-full rounded-xl border border-border bg-surface-hover px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30"
          >
            <option value="All">All Courses</option>
            {courses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* District Filter */}
        <div>
          <label
            htmlFor="district-filter"
            className="mb-1.5 block text-xs font-medium text-text-muted"
          >
            District
          </label>
          <select
            id="district-filter"
            value={filters.district}
            onChange={(e) =>
              onFilterChange({ ...filters, district: e.target.value })
            }
            className="w-full rounded-xl border border-border bg-surface-hover px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30"
          >
            <option value="All">All Districts</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Current Status Filter */}
        <div>
          <label
            htmlFor="status-filter"
            className="mb-1.5 block text-xs font-medium text-text-muted"
          >
            Current Status
          </label>
          <select
            id="status-filter"
            value={filters.currentStatus}
            onChange={(e) =>
              onFilterChange({ ...filters, currentStatus: e.target.value })
            }
            className="w-full rounded-xl border border-border bg-surface-hover px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30"
          >
            <option value="All">All Statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        {/* Month Filter */}
        <div>
          <label
            htmlFor="month-filter"
            className="mb-1.5 block text-xs font-medium text-text-muted"
          >
            Month
          </label>
          <select
            id="month-filter"
            value={filters.month}
            onChange={(e) =>
              onFilterChange({ ...filters, month: e.target.value })
            }
            className="w-full rounded-xl border border-border bg-surface-hover px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30"
          >
            <option value="All">All Months</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
        {/* Batch Filter */}
        <div>
          <label
            htmlFor="batch-filter"
            className="mb-1.5 block text-xs font-medium text-text-muted"
          >
            Batch
          </label>
          <select
            id="batch-filter"
            value={filters.batch}
            onChange={(e) =>
              onFilterChange({ ...filters, batch: e.target.value })
            }
            className="w-full rounded-xl border border-border bg-surface-hover px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30"
          >
            <option value="All">All Batches</option>
            {batches.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        {/* Year Filter */}
        <div>
          <label
            htmlFor="year-filter"
            className="mb-1.5 block text-xs font-medium text-text-muted"
          >
            Year
          </label>
          <select
            id="year-filter"
            value={filters.year}
            onChange={(e) =>
              onFilterChange({ ...filters, year: e.target.value })
            }
            className="w-full rounded-xl border border-border bg-surface-hover px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30"
          >
            <option value="All">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
