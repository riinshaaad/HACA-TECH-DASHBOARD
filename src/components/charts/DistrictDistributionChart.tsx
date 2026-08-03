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
import { DistrictDistribution } from "@/lib/types";

interface DistrictDistributionChartProps {
  data: DistrictDistribution[];
  activeFilter?: string | string[];
  onSelect?: (value: string) => void;
  title?: string;
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: DistrictDistribution }>;
}) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl border border-border bg-surface-elevated px-4 py-3 shadow-xl">
      <p className="text-sm font-semibold text-text-primary">{d.district}</p>
      <div className="mt-1">
        <p className="text-xs text-text-secondary">
          <span className="font-bold text-accent-emerald">{d.count}</span>{" "}
          students
        </p>
      </div>
    </div>
  );
};

export default function DistrictDistributionChart({
  data,
  activeFilter,
  onSelect,
  title,
}: DistrictDistributionChartProps) {
  const handleClick = (item: any) => {
    if (!onSelect) return;
    const val =
      typeof item === "string"
        ? item
        : item?.district || item?.payload?.district;
    if (val) {
      if (Array.isArray(activeFilter)) {
        onSelect(activeFilter.includes(val) && activeFilter.length === 1 ? "All" : val);
      } else {
        onSelect(activeFilter === val ? "All" : val);
      }
    }
  };

  if (data.length === 0) {
    return (
      <div className="glass-card-static p-5 fade-in-up-delay-2">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-emerald/15">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-text-primary">
            {title || "District Distribution"}
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
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-emerald/15">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-text-primary">
          {title || "District Distribution"}
        </h3>
      </div>

      <div
        className="custom-scrollbar overflow-x-auto pb-2"
      >
        <div style={{ minWidth: Math.max(400, data.length * 40), height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 20, bottom: 40, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="district"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                interval={0}
                angle={-45}
                textAnchor="end"
              />
              <YAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                allowDecimals={false}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(16, 185, 129, 0.05)" }}
              />
              <Bar
                dataKey="count"
                radius={[8, 8, 2, 2]}
                maxBarSize={30}
                onClick={handleClick}
                className="cursor-pointer"
              >
                {data.map((entry, i) => {
                  const isSelected =
                    !activeFilter ||
                    activeFilter === "All" ||
                    (Array.isArray(activeFilter)
                      ? activeFilter.includes("All") || activeFilter.includes(entry.district) || activeFilter.length === 0
                      : activeFilter === entry.district);
                  const isStroke = Array.isArray(activeFilter)
                    ? activeFilter.includes(entry.district) && !activeFilter.includes("All")
                    : activeFilter === entry.district && activeFilter !== "All";
                  return (
                    <Cell
                      key={i}
                      fill={entry.fill}
                      opacity={isSelected ? 1 : 0.35}
                      stroke={isStroke ? "#ffffff" : "none"}
                      strokeWidth={isStroke ? 2 : 0}
                      onClick={() => handleClick(entry.district)}
                      className="cursor-pointer transition-all duration-200"
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
