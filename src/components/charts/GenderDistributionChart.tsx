"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { GenderDistribution } from "@/lib/types";

interface GenderDistributionChartProps {
  data: GenderDistribution[];
  activeFilter?: string;
  onSelect?: (value: string) => void;
  title?: string;
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: GenderDistribution }>;
}) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl border border-border bg-surface-elevated px-4 py-3 shadow-xl">
      <p className="text-sm font-semibold text-text-primary">{d.gender}</p>
      <div className="mt-1">
        <p className="text-xs text-text-secondary">
          Students: <span className="font-bold text-accent-pink">{d.count}</span>
        </p>
      </div>
    </div>
  );
};

export default function GenderDistributionChart({
  data,
  activeFilter,
  onSelect,
  title,
}: GenderDistributionChartProps) {
  const handleClick = (item: any) => {
    if (!onSelect) return;
    const val =
      typeof item === "string" ? item : item?.gender || item?.payload?.gender;
    if (val) {
      onSelect(activeFilter === val ? "All" : val);
    }
  };

  if (data.length === 0) {
    return (
      <div className="glass-card-static p-5 fade-in-up-delay-2">
        <div className="mb-4 flex items-center gap-2">
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
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-text-primary">
            {title || "Gender Distribution"}
          </h3>
        </div>
        <div className="flex h-56 items-center justify-center">
          <p className="text-sm text-text-muted">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card-static p-5 fade-in-up-delay-2">
      <div className="mb-4 flex items-center gap-2">
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
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-text-primary">
          {title || "Gender Distribution"}
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
                    activeFilter === entry.gender;
                  return (
                    <Cell
                      key={i}
                      fill={entry.fill}
                      opacity={isSelected ? 1 : 0.35}
                      stroke={
                        activeFilter === entry.gender ? "#ffffff" : "none"
                      }
                      strokeWidth={activeFilter === entry.gender ? 2 : 0}
                      onClick={() => handleClick(entry.gender)}
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
            const isSelected = activeFilter === item.gender;
            const isDimmed =
              activeFilter &&
              activeFilter !== "All" &&
              activeFilter !== item.gender;
            return (
              <div
                key={item.gender}
                onClick={() => handleClick(item.gender)}
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
                    {item.gender}
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
