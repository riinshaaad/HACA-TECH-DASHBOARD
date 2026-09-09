"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ResponseToReviewsDistribution } from "@/lib/types";

interface ResponseToReviewsChartProps {
  data: ResponseToReviewsDistribution[];
  activeFilter?: string;
  onSelect?: (value: string) => void;
  title?: string;
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: ResponseToReviewsDistribution }>;
}) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl border border-border bg-surface-elevated px-4 py-3 shadow-xl">
      <p className="text-sm font-semibold text-text-primary">Response: {d.response}</p>
      <div className="mt-1">
        <p className="text-xs text-text-secondary">
          Students: <span className="font-bold text-accent-primary">{d.count}</span>
        </p>
      </div>
    </div>
  );
};

export default function ResponseToReviewsChart({
  data,
  activeFilter,
  onSelect,
  title,
}: ResponseToReviewsChartProps) {
  const handleClick = (item: any) => {
    if (!onSelect) return;
    const val =
      typeof item === "string"
        ? item
        : item?.response || item?.payload?.response;
    if (val) {
      onSelect(activeFilter === val ? "All" : val);
    }
  };

  const chartTitle = title || "What Was Your Response to the Reviews?";

  if (data.length === 0) {
    return (
      <div className="glass-card-static p-5 fade-in-up-delay-3">
        <div className="mb-4 flex items-center gap-2">
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
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-text-primary">
            {chartTitle}
          </h3>
        </div>
        <div className="flex h-56 items-center justify-center">
          <p className="text-sm text-text-muted">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card-static p-5 fade-in-up-delay-3">
      <div className="mb-4 flex items-center gap-2">
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
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-text-primary">
          {chartTitle}
        </h3>
      </div>

      <div className="flex flex-row items-center justify-between gap-4 w-full flex-1 py-2">
        <div className="h-48 w-48 sm:h-52 sm:w-52 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="count"
                strokeWidth={0}
                onClick={handleClick}
                className="cursor-pointer"
              >
                {data.map((entry, i) => {
                  const isSelected =
                    !activeFilter ||
                    activeFilter === "All" ||
                    activeFilter === entry.response;
                  return (
                    <Cell
                      key={i}
                      fill={entry.fill}
                      opacity={isSelected ? 1 : 0.35}
                      stroke={
                        activeFilter === entry.response ? "#ffffff" : "none"
                      }
                      strokeWidth={activeFilter === entry.response ? 2 : 0}
                      onClick={() => handleClick(entry.response)}
                      className="cursor-pointer transition-all duration-200"
                    />
                  );
                })}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid flex-1 min-w-0 grid-cols-1 md:grid-cols-2 gap-2 max-h-[260px] overflow-y-auto custom-scrollbar pr-1">
          {data.map((item) => {
            const isSelected = activeFilter === item.response;
            const isDimmed =
              activeFilter &&
              activeFilter !== "All" &&
              activeFilter !== item.response;
            return (
              <div
                key={item.response}
                onClick={() => handleClick(item.response)}
                className={`cursor-pointer flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 transition-all shadow-sm hover:scale-[1.02] ${
                  isSelected
                    ? "bg-accent-primary/25 border-accent-primary shadow-md font-bold ring-1 ring-accent-primary/50"
                    : isDimmed
                    ? "bg-surface-hover/15 border-border/20 opacity-40 hover:opacity-75"
                    : "bg-surface/50 border-border/40 hover:bg-surface-hover hover:border-border"
                }`}
              >
                <span
                  className="h-3 w-3 flex-shrink-0 rounded-full shadow-sm"
                  style={{ backgroundColor: item.fill }}
                />
                <div className="flex flex-1 items-center justify-between min-w-0 gap-2">
                  <p className="truncate text-sm font-medium text-text-primary">
                    {item.response}
                  </p>
                  <p className="text-xs font-bold text-text-secondary">
                    {item.count}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
