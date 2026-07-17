"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendPoint } from "@/lib/types";

interface TrendChartProps {
  data: TrendPoint[];
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  
  // Format the label (YYYY-MM) to Month Name
  let formattedLabel = label;
  if (label && label.includes("-")) {
    const [year, month] = label.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    formattedLabel = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }

  return (
    <div className="rounded-xl border border-border bg-surface-elevated px-4 py-3 shadow-xl">
      <p className="mb-1 text-xs font-medium text-text-muted">
        {formattedLabel}
      </p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-xs text-text-secondary">
          Enrollments: <span className="font-bold text-accent-blue">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

export default function TrendChart({ data }: TrendChartProps) {
  return (
    <div className="glass-card-static p-5 fade-in-up-delay-3">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-cyan/15">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-text-primary">
          Enrollment Trends
        </h3>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="gradientBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickFormatter={(val: string) => {
                if (!val || !val.includes("-")) return val;
                const [year, month] = val.split("-");
                const d = new Date(parseInt(year), parseInt(month) - 1, 1);
                return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="enrollments"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#gradientBlue)"
              dot={true}
              activeDot={{
                r: 5,
                stroke: "#3b82f6",
                strokeWidth: 2,
                fill: "#0d1424",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Legend */}
      <div className="mt-3 flex items-center justify-center gap-6">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-accent-blue" />
          <span className="text-xs text-text-muted">Enrollments</span>
        </div>
      </div>
    </div>
  );
}
