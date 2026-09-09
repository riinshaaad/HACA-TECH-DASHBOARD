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
import { ReviewFrequencyDistribution } from "@/lib/types";

interface ReviewFrequencyChartProps {
  data: ReviewFrequencyDistribution[];
  activeFilter?: string;
  onSelect?: (value: string) => void;
  title?: string;
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: ReviewFrequencyDistribution }>;
}) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl border border-border bg-surface-elevated px-4 py-3 shadow-xl">
      <p className="text-sm font-semibold text-text-primary">Frequency: {d.answer}</p>
      <div className="mt-1">
        <p className="text-xs text-text-secondary">
          Students: <span className="font-bold text-accent-primary">{d.count}</span>
        </p>
      </div>
    </div>
  );
};

export default function ReviewFrequencyChart({
  data,
  activeFilter,
  onSelect,
  title,
}: ReviewFrequencyChartProps) {
  const handleClick = (item: any) => {
    if (!onSelect) return;
    const val =
      typeof item === "string"
        ? item
        : item?.answer || item?.payload?.answer;
    if (val) {
      onSelect(activeFilter === val ? "All" : val);
    }
  };

  const chartTitle = title || "How Often Do Reviews by Other Leads Influence Joining HACA?";

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
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M12 8v4l3 3" />
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
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M12 8v4l3 3" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-text-primary">
          {chartTitle}
        </h3>
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="answer"
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
                  activeFilter === entry.answer;
                return (
                  <Cell
                    key={i}
                    fill={entry.fill}
                    opacity={isSelected ? 1 : 0.35}
                    stroke={activeFilter === entry.answer ? "#ffffff" : "none"}
                    strokeWidth={activeFilter === entry.answer ? 2 : 0}
                    onClick={() => handleClick(entry.answer)}
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
