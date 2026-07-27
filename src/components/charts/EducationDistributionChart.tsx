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
import { EducationDistribution } from "@/lib/types";

interface EducationDistributionChartProps {
  data: EducationDistribution[];
  activeFilter?: string;
  onSelect?: (value: string) => void;
  title?: string;
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: EducationDistribution }>;
}) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl border border-border bg-surface-elevated px-4 py-3 shadow-xl">
      <p className="text-sm font-semibold text-text-primary">{d.background}</p>
      <div className="mt-1">
        <p className="text-xs text-text-secondary">
          Students: <span className="font-bold text-accent-pink">{d.count}</span>
        </p>
      </div>
    </div>
  );
};

export default function EducationDistributionChart({
  data,
  activeFilter,
  onSelect,
  title,
}: EducationDistributionChartProps) {
  const handleClick = (item: any) => {
    if (!onSelect) return;
    const val =
      typeof item === "string"
        ? item
        : item?.background || item?.payload?.background;
    if (val) {
      onSelect(activeFilter === val ? "All" : val);
    }
  };

  if (data.length === 0) {
    return (
      <div className="glass-card-static p-5 fade-in-up-delay-4">
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
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-text-primary">
            {title || "Education Level"}
          </h3>
        </div>
        <div className="flex h-72 items-center justify-center">
          <p className="text-sm text-text-muted">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card-static p-5 fade-in-up-delay-4">
      {/* Header */}
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
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-text-primary">
          {title || "Education Level"}
        </h3>
      </div>

      {/* Bar Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
              allowDecimals={false}
            />
            <YAxis
              dataKey="background"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              width={110}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(123, 92, 250, 0.05)" }}
            />
            <Bar
              dataKey="count"
              radius={[2, 8, 8, 2]}
              maxBarSize={25}
              onClick={handleClick}
              className="cursor-pointer"
            >
              {data.map((entry, i) => {
                const isSelected =
                  !activeFilter ||
                  activeFilter === "All" ||
                  activeFilter === entry.background;
                const baseColor = i % 2 === 0 ? "#7b5cfa" : "#9b6bff";
                return (
                  <Cell
                    key={i}
                    fill={baseColor}
                    opacity={isSelected ? 1 : 0.35}
                    stroke={
                      activeFilter === entry.background ? "#ffffff" : "none"
                    }
                    strokeWidth={activeFilter === entry.background ? 2 : 0}
                    onClick={() => handleClick(entry.background)}
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
