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
import { StatusDistribution } from "@/lib/types";

interface StatusDistributionChartProps {
  data: StatusDistribution[];
  activeFilter?: string | string[];
  onSelect?: (value: string) => void;
  title?: string;
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: StatusDistribution }>;
}) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl border border-border bg-surface-elevated px-4 py-3 shadow-xl">
      <p className="text-sm font-semibold text-text-primary">{d.status}</p>
      <p className="text-xs text-text-secondary">
        <span className="font-bold text-accent-purple">{d.count}</span> students
      </p>
    </div>
  );
};

export default function StatusDistributionChart({
  data,
  activeFilter,
  onSelect,
  title,
}: StatusDistributionChartProps) {
  const handleClick = (item: any) => {
    if (!onSelect) return;
    const val =
      typeof item === "string"
        ? item
        : item?.status || item?.payload?.status;
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
      <div className="glass-card-static p-5 fade-in-up-delay-5">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-purple/15">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a855f7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-text-primary">
            {title || "Status at Enrollment"}
          </h3>
        </div>
        <div className="flex h-64 items-center justify-center">
          <p className="text-sm text-text-muted">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card-static p-5 fade-in-up-delay-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-purple/15">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#a855f7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-text-primary">
          {title || "Status at Enrollment"}
        </h3>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
              allowDecimals={false}
            />
            <YAxis
              dataKey="status"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              width={100}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(168, 85, 247, 0.05)" }}
            />
            <Bar
              dataKey="count"
              radius={[2, 8, 8, 2]}
              maxBarSize={30}
              onClick={handleClick}
              className="cursor-pointer"
            >
              {data.map((entry, i) => {
                const isSelected =
                  !activeFilter ||
                  activeFilter === "All" ||
                  (Array.isArray(activeFilter)
                    ? activeFilter.includes("All") || activeFilter.includes(entry.status) || activeFilter.length === 0
                    : activeFilter === entry.status);
                const isStroke = Array.isArray(activeFilter)
                  ? activeFilter.includes(entry.status) && !activeFilter.includes("All")
                  : activeFilter === entry.status && activeFilter !== "All";
                return (
                  <Cell
                    key={i}
                    fill={entry.fill}
                    opacity={isSelected ? 1 : 0.35}
                    stroke={isStroke ? "#ffffff" : "none"}
                    strokeWidth={isStroke ? 2 : 0}
                    onClick={() => handleClick(entry.status)}
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
