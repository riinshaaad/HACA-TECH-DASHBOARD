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

export default function StatusDistributionChart({ data }: StatusDistributionChartProps) {
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
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-text-primary">
          Status Distribution
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
            <Bar dataKey="count" radius={[2, 8, 8, 2]} maxBarSize={30}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
