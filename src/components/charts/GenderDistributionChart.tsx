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
          Students: <span className="font-bold text-accent-blue">{d.count}</span>
        </p>
      </div>
    </div>
  );
};

export default function GenderDistributionChart({ data }: GenderDistributionChartProps) {
  return (
    <div className="glass-card-static p-5 fade-in-up-delay-5">
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
          Gender Distribution
        </h3>
      </div>

      <div className="flex flex-col items-center gap-4 lg:flex-row">
        <div className="h-56 w-56 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="count"
                strokeWidth={0}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid w-full grid-cols-1 gap-2 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
          {data.map((item) => (
            <div
              key={item.gender}
              className="flex items-center gap-2 rounded-lg bg-surface-hover/50 px-3 py-2"
            >
              <span
                className="h-3 w-3 flex-shrink-0 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <div className="flex flex-1 items-center justify-between min-w-0">
                <p className="truncate text-sm font-medium text-text-primary">
                  {item.gender}
                </p>
                <p className="text-xs font-bold text-text-secondary">
                  {item.count}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
