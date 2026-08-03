"use client";

import { useState, useRef, useEffect } from "react";

interface MultiSelectProps {
  label: string;
  options: { label: string; value: string }[];
  selectedValues: string | string[];
  onChange: (values: string[]) => void;
  placeholder: string;
}

export default function MultiSelect({
  label,
  options,
  selectedValues,
  onChange,
  placeholder,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize selectedValues to an array of strings
  const currentArray = Array.isArray(selectedValues)
    ? selectedValues
    : selectedValues
    ? [selectedValues]
    : [];

  const isAllSelected = currentArray.includes("All") || currentArray.length === 0;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        document.body.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // When dropdown closes, reset search filter
  useEffect(() => {
    if (!isOpen) {
      setSearch("");
    }
  }, [isOpen]);

  const handleToggleOption = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (value === "All") {
      onChange(["All"]);
      return;
    }

    let newSelected = currentArray.filter((v) => v !== "All");
    if (newSelected.includes(value)) {
      newSelected = newSelected.filter((v) => v !== value);
    } else {
      newSelected.push(value);
    }

    if (newSelected.length === 0) {
      onChange(["All"]);
    } else {
      onChange(newSelected);
    }
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 h-7 rounded-lg border px-2.5 py-0.5 text-xs font-medium outline-none transition-all cursor-pointer ${
          !isAllSelected
            ? "border-accent-primary bg-accent-primary/15 font-semibold text-accent-primary shadow-sm"
            : "border-border/70 bg-surface-hover text-text-primary hover:border-border"
        }`}
      >
        <span className="max-w-[150px] truncate">
          {isAllSelected
            ? placeholder
            : `${label}: ${
                currentArray.length > 1
                  ? `${currentArray.length} selected`
                  : options.find((o) => o.value === currentArray[0])?.label || currentArray[0]
              }`}
        </span>
        <svg
          className={`h-3 w-3 text-text-secondary transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1 z-50 min-w-[220px] max-h-72 overflow-hidden rounded-xl border border-border/80 bg-surface-elevated p-1 shadow-lg backdrop-blur-md flex flex-col scale-in-fast">
          {/* Search bar inside dropdown if there are more than 5 options */}
          {options.length > 5 && (
            <div className="p-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${label}...`}
                className="w-full h-7 rounded-lg border border-border bg-surface px-2 text-[11px] font-medium placeholder-text-muted outline-none focus:border-accent-primary"
              />
            </div>
          )}

          <div className="overflow-y-auto max-h-48 custom-scrollbar">
            {/* "All" option */}
            {search === "" && (
              <div
                onClick={(e) => handleToggleOption("All", e)}
                className={`flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-lg cursor-pointer hover:bg-surface-hover transition-colors ${
                  isAllSelected
                    ? "bg-accent-primary/10 text-accent-primary font-semibold"
                    : "text-text-secondary"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={() => {}}
                  className="rounded border-border text-accent-primary focus:ring-accent-primary h-3.5 w-3.5 cursor-pointer accent-accent-primary"
                />
                <span>All {label}s</span>
              </div>
            )}

            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isChecked = currentArray.includes(opt.value) && !isAllSelected;
                return (
                  <div
                    key={opt.value}
                    onClick={(e) => handleToggleOption(opt.value, e)}
                    className={`flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-lg cursor-pointer hover:bg-surface-hover transition-colors ${
                      isChecked
                        ? "bg-accent-primary/10 text-accent-primary font-semibold"
                        : "text-text-secondary"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="rounded border-border text-accent-primary focus:ring-accent-primary h-3.5 w-3.5 cursor-pointer accent-accent-primary"
                    />
                    <span className="truncate">{opt.label}</span>
                  </div>
                );
              })
            ) : (
              <div className="p-3 text-[11px] text-center text-text-muted">
                No matching {label.toLowerCase()}s
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
