"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ReviewFrequencyDistribution } from "@/lib/types";

interface ReviewFrequencyChartProps {
  data: ReviewFrequencyDistribution[];
  activeFilter?: string;
  onSelect?: (value: string) => void;
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
            Frequency of Reading Reviews
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
          Frequency of Reading Reviews
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
                    activeFilter === entry.answer;
                  return (
                    <Cell
                      key={i}
                      fill={entry.fill}
                      opacity={isSelected ? 1 : 0.35}
                      stroke={
                        activeFilter === entry.answer ? "#ffffff" : "none"
                      }
                      strokeWidth={activeFilter === entry.answer ? 2 : 0}
                      onClick={() => handleClick(entry.answer)}
                      className="cursor-pointer transition-all duration-200"
                    />
                  );
                })}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid w-full grid-cols-1 gap-2">
          {data.map((item) => {
            const isSelected = activeFilter === item.answer;
            const isDimmed =
              activeFilter &&
              activeFilter !== "All" &&
              activeFilter !== item.answer;
            return (
              <div
                key={item.answer}
                onClick={() => handleClick(item.answer)}
                className={`cursor-pointer flex items-center gap-2 rounded-lg px-3 py-2 transition-all ${
                  isSelected
                    ? "bg-accent-primary/25 border border-accent-primary/50 shadow-sm"
                    : isDimmed
                    ? "bg-surface-hover/20 opacity-50 hover:opacity-80"
                    : "bg-surface-hover/50 hover:bg-surface-hover"
                }`}
              >
                <span
                  className="h-3 w-3 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <div className="flex flex-1 items-center justify-between min-w-0">
                  <p className="truncate text-sm font-medium text-text-primary">
                    {item.answer}
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
