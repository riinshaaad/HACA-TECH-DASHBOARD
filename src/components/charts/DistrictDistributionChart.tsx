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
      <p className="text-xs text-text-secondary">
        <span className="font-bold text-accent-emerald">{d.count}</span> students
      </p>
    </div>
  );
};

export default function DistrictDistributionChart({ data }: DistrictDistributionChartProps) {
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
          District Distribution
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
              <Bar dataKey="count" radius={[8, 8, 2, 2]} maxBarSize={30}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
