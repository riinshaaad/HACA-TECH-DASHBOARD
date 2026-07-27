"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { AgeDistribution } from "@/lib/types";

interface AgeDistributionChartProps {
  data: AgeDistribution[];
  activeFilter?: string;
  onSelect?: (value: string) => void;
  title?: string;
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: AgeDistribution }>;
}) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl border border-border bg-surface-elevated px-4 py-3 shadow-xl">
      <p className="text-sm font-semibold text-text-primary">{d.ageGroup}</p>
      <div className="mt-1">
        <p className="text-xs text-text-secondary">
          <span className="font-bold text-accent-cyan">{d.count}</span> students
        </p>
      </div>
    </div>
  );
};

export default function AgeDistributionChart({
  data,
  activeFilter,
  onSelect,
  title,
}: AgeDistributionChartProps) {
  const handleClick = (item: any) => {
    if (!onSelect) return;
    const val =
      typeof item === "string"
        ? item
        : item?.ageGroup || item?.payload?.ageGroup;
    if (val) {
      onSelect(activeFilter === val ? "All" : val);
    }
  };

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
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-text-primary">
            {title || "Age Distribution"}
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
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-text-primary">
          {title || "Age Distribution"}
        </h3>
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="ageGroup"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
            />
            <YAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              allowDecimals={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(123, 92, 250, 0.05)" }}
            />
            <Bar
              dataKey="count"
              radius={[8, 8, 2, 2]}
              maxBarSize={45}
              onClick={handleClick}
              className="cursor-pointer"
            >
              {data.map((entry, i) => {
                const isSelected =
                  !activeFilter ||
                  activeFilter === "All" ||
                  activeFilter === entry.ageGroup;
                return (
                  <Cell
                    key={i}
                    fill={entry.fill}
                    opacity={isSelected ? 1 : 0.35}
                    stroke={
                      activeFilter === entry.ageGroup ? "#ffffff" : "none"
                    }
                    strokeWidth={activeFilter === entry.ageGroup ? 2 : 0}
                    onClick={() => handleClick(entry.ageGroup)}
                    className="cursor-pointer transition-all duration-200"
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
