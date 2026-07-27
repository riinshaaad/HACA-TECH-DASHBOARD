"use client";

import { useState, useMemo } from "react";
import { EnrollmentData, FilterState } from "@/lib/types";
import {
  applyFilters,
  computeKPIs,
  computeCourseDistribution,
  computeLeadSources,
  computeDistrictDistribution,
  computeGenderDistribution,
  computeAgeDistribution,
  computeStatusDistribution,
  computeEducationDistribution,
  computeInfluencingContentDistribution,
  computeSeenAdsDistribution,
  computeAIInfluenceDistribution,
  computeReasonForChoosingDistribution,
  computeTrends,
  computeCompetitorMentions,
  getUniqueCourses,
  getUniqueDistricts,
  getUniqueStatuses,
  generateInsights,
  getUniqueMonths,
  getUniqueBatches,
  getUniqueYears,
} from "@/lib/analytics";

import TabNavigation from "@/components/TabNavigation";
import KPICard from "@/components/KPICard";
import FilterBar from "@/components/FilterBar";
import CourseDistributionChart from "@/components/charts/CourseDistributionChart";
import LeadSourceChart from "@/components/charts/LeadSourceChart";
import DistrictDistributionChart from "@/components/charts/DistrictDistributionChart";
import GenderDistributionChart from "@/components/charts/GenderDistributionChart";
import AgeDistributionChart from "@/components/charts/AgeDistributionChart";
import StatusDistributionChart from "@/components/charts/StatusDistributionChart";
import TrendChart from "@/components/charts/TrendChart";
import EducationDistributionChart from "@/components/charts/EducationDistributionChart";
import InfluencingContentChart from "@/components/charts/InfluencingContentChart";
import AIInfluenceChart from "@/components/charts/AIInfluenceChart";
import SeenAdsChart from "@/components/charts/SeenAdsChart";
import ReasonForChoosingChart from "@/components/charts/ReasonForChoosingChart";
import RespondentList from "@/components/RespondentList";
import CompetitorMentions from "@/components/CompetitorMentions";
import CompetitorStrategy from "@/components/CompetitorStrategy";
import MarketingStrategy from "@/components/MarketingStrategy";
import InsightCard from "@/components/InsightCard";

interface DashboardClientProps {
  data: EnrollmentData[];
}

const defaultChartOrder = [
  "course",
  "gender",
  "age",
  "district",
  "status",
  "trend",
  "education",
  "seenAds",
  "influencingContent",
  "aiInfluence",
  "reason",
  "leadSource",
];

const defaultChartTitles: Record<string, string> = {
  course: "Course Distribution",
  gender: "Gender Distribution",
  age: "Age Distribution",
  district: "District Distribution",
  status: "Status at Enrollment",
  trend: "Monthly Enrollment Trend",
  education: "Education Level",
  seenAds: "Seen Ads Before Enrolling?",
  influencingContent: "Most Influencing Content",
  aiInfluence: "Chose HACA Due to AI Integration?",
  reason: "Primary Reason for Choosing HACA",
  leadSource: "Primary Lead Source",
};

type ChartSize = "col-span-1" | "col-span-2" | "col-span-3";

const defaultChartSizes: Record<string, ChartSize> = {
  course: "col-span-1",
  gender: "col-span-1",
  age: "col-span-1",
  district: "col-span-1",
  status: "col-span-1",
  trend: "col-span-1",
  education: "col-span-1",
  seenAds: "col-span-1",
  influencingContent: "col-span-1",
  aiInfluence: "col-span-1",
  reason: "col-span-1",
  leadSource: "col-span-1",
};

const defaultChartHeights: Record<string, number> = {
  course: 360,
  gender: 360,
  age: 360,
  district: 440,
  status: 440,
  trend: 440,
  education: 360,
  seenAds: 360,
  influencingContent: 360,
  aiInfluence: 360,
  reason: 360,
  leadSource: 360,
};

export default function DashboardClient({ data }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [filters, setFilters] = useState<FilterState>({
    course: "All",
    district: "All",
    currentStatus: "All",
    month: "All",
    batch: "All",
    year: "All",
  });

  // Derived data — recomputed only when filters change
  const filteredData = useMemo(() => applyFilters(data, filters), [data, filters]);
  const kpis = useMemo(() => computeKPIs(filteredData), [filteredData]);
  const courseDist = useMemo(() => computeCourseDistribution(filteredData), [filteredData]);
  const leadSources = useMemo(() => computeLeadSources(filteredData), [filteredData]);
  const districtDist = useMemo(() => computeDistrictDistribution(filteredData), [filteredData]);
  const genderDist = useMemo(() => computeGenderDistribution(filteredData), [filteredData]);
  const ageDist = useMemo(() => computeAgeDistribution(filteredData), [filteredData]);
  const statusDist = useMemo(() => computeStatusDistribution(filteredData), [filteredData]);
  const trends = useMemo(() => computeTrends(filteredData), [filteredData]);
  const educationDist = useMemo(() => computeEducationDistribution(filteredData), [filteredData]);
  const seenAds = useMemo(() => computeSeenAdsDistribution(filteredData), [filteredData]);
  const aiInfluence = useMemo(() => computeAIInfluenceDistribution(filteredData), [filteredData]);
  const influencingContent = useMemo(() => computeInfluencingContentDistribution(filteredData), [filteredData]);
  const reasonForChoosingDist = useMemo(() => computeReasonForChoosingDistribution(filteredData), [filteredData]);

  // Insights and benchmarks use full data
  const fullKPIs = useMemo(() => computeKPIs(data), [data]);
  const competitorRank = useMemo(() => computeCompetitorMentions(data), [data]);
  const insights = useMemo(() => generateInsights(data, fullKPIs), [data, fullKPIs]);

  const courses = useMemo(() => getUniqueCourses(data), [data]);
  const districts = useMemo(() => getUniqueDistricts(data), [data]);
  const statuses = useMemo(() => getUniqueStatuses(data), [data]);
  const months = useMemo(() => getUniqueMonths(data), [data]);
  const batches = useMemo(() => getUniqueBatches(data), [data]);
  const years = useMemo(() => getUniqueYears(data), [data]);

  // Drag & drop layout reordering, size customization, and title editing state
  const [chartOrder, setChartOrder] = useState<string[]>(defaultChartOrder);
  const [chartTitles, setChartTitles] = useState<Record<string, string>>(defaultChartTitles);
  const [chartSizes, setChartSizes] = useState<Record<string, ChartSize>>(defaultChartSizes);
  const [chartHeights, setChartHeights] = useState<Record<string, number>>(defaultChartHeights);
  const [editingChartId, setEditingChartId] = useState<string | null>(null);
  const [editTitleValue, setEditTitleValue] = useState("");
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizingChartId, setResizingChartId] = useState<string | null>(null);

  const startEditingTitle = (chartId: string) => {
    setEditingChartId(chartId);
    setEditTitleValue(chartTitles[chartId] || defaultChartTitles[chartId]);
  };

  const saveEditingTitle = () => {
    if (editingChartId && editTitleValue.trim()) {
      setChartTitles((prev) => ({
        ...prev,
        [editingChartId]: editTitleValue.trim(),
      }));
    }
    setEditingChartId(null);
  };

  const handleResizeMouseDown = (e: React.MouseEvent, chartId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizingChartId(chartId);
    const startX = e.clientX;
    const startY = e.clientY;
    const currentSize = chartSizes[chartId] || "col-span-1";
    const startSpan =
      currentSize === "col-span-3" ? 3 : currentSize === "col-span-2" ? 2 : 1;
    const startHeight =
      chartHeights[chartId] || defaultChartHeights[chartId] || 360;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      const spanDelta = Math.round(deltaX / 130);
      const newSpan = Math.max(1, Math.min(3, startSpan + spanDelta));
      const newSize: ChartSize =
        newSpan === 3
          ? "col-span-3"
          : newSpan === 2
          ? "col-span-2"
          : "col-span-1";
      const newHeight = Math.max(260, Math.min(850, startHeight + deltaY));

      setChartSizes((prev) => {
        if (prev[chartId] === newSize) return prev;
        return { ...prev, [chartId]: newSize };
      });
      setChartHeights((prev) => {
        if (Math.abs((prev[chartId] || startHeight) - newHeight) < 2)
          return prev;
        return { ...prev, [chartId]: newHeight };
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizingChartId(null);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleResizeTouchStart = (e: React.TouchEvent, chartId: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizingChartId(chartId);
    const startX = e.touches[0].clientX;
    const startY = e.touches[0].clientY;
    const currentSize = chartSizes[chartId] || "col-span-1";
    const startSpan =
      currentSize === "col-span-3" ? 3 : currentSize === "col-span-2" ? 2 : 1;
    const startHeight =
      chartHeights[chartId] || defaultChartHeights[chartId] || 360;

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const deltaX = moveEvent.touches[0].clientX - startX;
      const deltaY = moveEvent.touches[0].clientY - startY;

      const spanDelta = Math.round(deltaX / 110);
      const newSpan = Math.max(1, Math.min(3, startSpan + spanDelta));
      const newSize: ChartSize =
        newSpan === 3
          ? "col-span-3"
          : newSpan === 2
          ? "col-span-2"
          : "col-span-1";
      const newHeight = Math.max(260, Math.min(850, startHeight + deltaY));

      setChartSizes((prev) => {
        if (prev[chartId] === newSize) return prev;
        return { ...prev, [chartId]: newSize };
      });
      setChartHeights((prev) => {
        if (Math.abs((prev[chartId] || startHeight) - newHeight) < 2)
          return prev;
        return { ...prev, [chartId]: newHeight };
      });
    };

    const handleTouchEnd = () => {
      setIsResizing(false);
      setResizingChartId(null);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };

    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
  };

  const getColSpanClass = (size?: ChartSize) => {
    switch (size) {
      case "col-span-2":
        return "lg:col-span-2";
      case "col-span-3":
        return "lg:col-span-3";
      default:
        return "lg:col-span-1";
    }
  };

  const handleDragStart = (e: React.DragEvent, idx: number) => {
    setDraggedIdx(idx);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIdx !== idx) {
      setDragOverIdx(idx);
    }
  };

  const handleDrop = (e: React.DragEvent, targetIdx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIdx) {
      setDraggedIdx(null);
      setDragOverIdx(null);
      return;
    }
    const newOrder = [...chartOrder];
    const [movedItem] = newOrder.splice(draggedIdx, 1);
    newOrder.splice(targetIdx, 0, movedItem);
    setChartOrder(newOrder);
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const renderChartComponent = (chartId: string) => {
    const title = chartTitles[chartId] || defaultChartTitles[chartId];
    switch (chartId) {
      case "course":
        return (
          <CourseDistributionChart
            data={courseDist}
            activeFilter={filters.course}
            onSelect={(val) => setFilters((prev) => ({ ...prev, course: val }))}
            title={title}
          />
        );
      case "gender":
        return (
          <GenderDistributionChart
            data={genderDist}
            activeFilter={filters.gender}
            onSelect={(val) => setFilters((prev) => ({ ...prev, gender: val }))}
            title={title}
          />
        );
      case "age":
        return (
          <AgeDistributionChart
            data={ageDist}
            activeFilter={filters.ageGroup}
            onSelect={(val) => setFilters((prev) => ({ ...prev, ageGroup: val }))}
            title={title}
          />
        );
      case "district":
        return (
          <DistrictDistributionChart
            data={districtDist}
            activeFilter={filters.district}
            onSelect={(val) => setFilters((prev) => ({ ...prev, district: val }))}
            title={title}
          />
        );
      case "status":
        return (
          <StatusDistributionChart
            data={statusDist}
            activeFilter={filters.currentStatus}
            onSelect={(val) =>
              setFilters((prev) => ({ ...prev, currentStatus: val }))
            }
            title={title}
          />
        );
      case "trend":
        return <TrendChart data={trends} title={title} />;
      case "education":
        return (
          <EducationDistributionChart
            data={educationDist}
            activeFilter={filters.educationalBackground}
            onSelect={(val) =>
              setFilters((prev) => ({ ...prev, educationalBackground: val }))
            }
            title={title}
          />
        );
      case "seenAds":
        return (
          <SeenAdsChart
            data={seenAds}
            activeFilter={filters.seenAds}
            onSelect={(val) => setFilters((prev) => ({ ...prev, seenAds: val }))}
            title={title}
          />
        );
      case "influencingContent":
        return (
          <InfluencingContentChart
            data={influencingContent}
            activeFilter={filters.influencingContent}
            onSelect={(val) =>
              setFilters((prev) => ({ ...prev, influencingContent: val }))
            }
            title={title}
          />
        );
      case "aiInfluence":
        return (
          <AIInfluenceChart
            data={aiInfluence}
            activeFilter={filters.choseDueToAI}
            onSelect={(val) =>
              setFilters((prev) => ({ ...prev, choseDueToAI: val }))
            }
            title={title}
          />
        );
      case "reason":
        return (
          <ReasonForChoosingChart
            data={reasonForChoosingDist}
            activeFilter={filters.reasonForChoosingInstitute}
            onSelect={(val) =>
              setFilters((prev) => ({
                ...prev,
                reasonForChoosingInstitute: val,
              }))
            }
            title={title}
          />
        );
      case "leadSource":
        return (
          <LeadSourceChart
            data={leadSources}
            activeFilter={filters.leadSource}
            onSelect={(val) =>
              setFilters((prev) => ({ ...prev, leadSource: val }))
            }
            title={title}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6 pb-12">
      {/* Tab Navigation */}
      <div className="pt-6">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="mx-auto w-full max-w-[98%] px-4 sm:px-6 lg:px-8">
        {/* ─── TAB 1: Dashboard Overview ─────────────────────── */}
        {activeTab === 0 && (
          <div className="space-y-6" id="dashboard-tab">
            {/* KPI Row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <KPICard
                title="Total Enrollments"
                value={kpis.totalEnrollments}
                subtitle="students"
                delay={0}
                gradient="from-accent-primary to-accent-primary-hover"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                }
              />
              <KPICard
                title="Top District"
                value={kpis.topDistrict}
                delay={2}
                gradient="from-accent-emerald to-accent-cyan"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                }
              />
              <KPICard
                title="Top Lead Source"
                value={kpis.topLeadSource}
                delay={3}
                gradient="from-accent-primary-hover to-accent-pink"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                }
              />
              <KPICard
                title="Top Month"
                value={kpis.topMonth}
                delay={4}
                gradient="from-accent-pink to-accent-emerald"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                }
              />
            </div>

            {/* Filters */}
            <FilterBar
              filters={filters}
              onFilterChange={setFilters}
              courses={courses}
              districts={districts}
              statuses={statuses}
              months={months}
              batches={batches}
              years={years}
            />

            {/* Customization Controls Banner */}
            <div className="flex flex-col gap-3 rounded-xl border border-border/80 bg-surface-elevated/60 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between fade-in-up">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-primary/15 text-accent-primary">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">
                    Interactive Chart Customizer
                  </h4>
                  <p className="text-xs text-text-muted">
                    Drag & drop charts using{" "}
                    <span className="font-semibold text-text-primary">⋮⋮</span>{" "}
                    to reorder (#1 to #12) • Drag bottom-right corner handle{" "}
                    <span className="font-semibold text-accent-cyan">↘</span>{" "}
                    in any direction to custom resize width &amp; height and align cards • Click{" "}
                    <span className="font-semibold text-text-primary">✏️</span>{" "}
                    to customize heading title
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setChartOrder(defaultChartOrder);
                    setChartTitles(defaultChartTitles);
                    setChartSizes(defaultChartSizes);
                    setChartHeights(defaultChartHeights);
                  }}
                  className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-secondary hover:border-accent-primary/50 hover:text-text-primary transition-colors"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                  Reset Default Layout
                </button>
              </div>
            </div>

            {/* Draggable, Expandable & Editable Charts Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {chartOrder.map((chartId, idx) => (
                <div
                  key={chartId}
                  style={{
                    height: `${
                      chartHeights[chartId] ||
                      defaultChartHeights[chartId] ||
                      380
                    }px`,
                  }}
                  draggable={!isResizing}
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={(e) => handleDrop(e, idx)}
                  onDragEnd={handleDragEnd}
                  className={`relative group transition-all duration-300 flex flex-col ${getColSpanClass(
                    chartSizes[chartId]
                  )} ${
                    dragOverIdx === idx
                      ? "scale-[1.02] ring-2 ring-accent-primary shadow-2xl rounded-2xl"
                      : ""
                  } ${draggedIdx === idx ? "opacity-40" : ""}`}
                >
                  {/* Position Badge, Edit Heading & Drag Handle */}
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 rounded-lg border border-border/80 bg-surface-elevated/95 px-2.5 py-1 shadow-md backdrop-blur-sm transition-all opacity-85 hover:opacity-100">
                    <span className="text-[10px] font-bold text-accent-primary bg-accent-primary/10 px-1.5 py-0.5 rounded">
                      #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => startEditingTitle(chartId)}
                      title="Edit Chart Heading"
                      className="text-text-muted hover:text-accent-primary p-0.5 transition-colors"
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <div
                      className="cursor-grab active:cursor-grabbing text-text-muted hover:text-text-primary px-1 flex items-center"
                      title="Drag to reorder chart position"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="9" cy="5" r="1" />
                        <circle cx="9" cy="12" r="1" />
                        <circle cx="9" cy="19" r="1" />
                        <circle cx="15" cy="5" r="1" />
                        <circle cx="15" cy="12" r="1" />
                        <circle cx="15" cy="19" r="1" />
                      </svg>
                    </div>
                  </div>

                  {/* Drag & Expand Handle at Bottom-Right Corner (2D Width + Height) */}
                  <div
                    onMouseDown={(e) => handleResizeMouseDown(e, chartId)}
                    onTouchStart={(e) => handleResizeTouchStart(e, chartId)}
                    title="Drag horizontally for width or vertically for height to align cards"
                    className={`absolute bottom-2.5 right-2.5 z-30 flex h-7 w-7 cursor-nwse-resize items-center justify-center rounded-lg border border-border/80 bg-surface-elevated/95 text-text-muted hover:border-accent-cyan hover:bg-accent-cyan/20 hover:text-accent-cyan shadow-md backdrop-blur-sm transition-all ${
                      resizingChartId === chartId
                        ? "border-accent-cyan bg-accent-cyan/25 text-accent-cyan scale-110 ring-2 ring-accent-cyan"
                        : "opacity-75 hover:opacity-100"
                    }`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  </div>

                  {/* Chart Component */}
                  {renderChartComponent(chartId)}
                </div>
              ))}
            </div>

            {/* Edit Chart Heading Modal */}
            {editingChartId && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
                <div className="w-full max-w-md rounded-2xl border border-border bg-surface-elevated p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                      <span className="text-accent-primary">✏️</span>
                      Edit Chart Heading
                    </h3>
                    <button
                      onClick={() => setEditingChartId(null)}
                      className="text-text-muted hover:text-text-primary text-xl"
                    >
                      &times;
                    </button>
                  </div>
                  <p className="text-xs text-text-muted mb-4">
                    Customize the display title for position #
                    {chartOrder.indexOf(editingChartId) + 1} chart.
                  </p>
                  
                  {/* Chart Title Input */}
                  <div className="mb-6">
                    <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                      CHART HEADING TITLE
                    </label>
                    <input
                      type="text"
                      value={editTitleValue}
                      onChange={(e) => setEditTitleValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEditingTitle();
                        if (e.key === "Escape") setEditingChartId(null);
                      }}
                      placeholder="Enter chart heading..."
                      className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                      autoFocus
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setEditingChartId(null)}
                      className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary hover:bg-surface-elevated"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveEditingTitle}
                      className="rounded-xl bg-accent-primary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-accent-primary/25 hover:bg-accent-primary/90"
                    >
                      Save Heading
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Row 7 — Respondent Directory */}
            <div className="grid grid-cols-1 gap-6">
              <RespondentList data={filteredData} />
            </div>

            {/* Filtered Count Banner */}
            {Object.values(filters).some((val) => val && val !== "All") && (
              <div className="fade-in-up rounded-xl border border-accent-primary/20 bg-accent-primary/5 px-4 py-3 text-center text-sm text-text-secondary">
                Showing{" "}
                <span className="font-bold text-accent-primary">
                  {filteredData.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-text-primary">
                  {data.length}
                </span>{" "}
                enrollments with active filters
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 2: Lead & Competitor Analysis ─────────────────────── */}
        {activeTab === 1 && (
          <div className="space-y-6" id="insights-tab">
            {/* Section Header */}
            <div className="fade-in-up">
              <h2 className="text-xl font-bold text-text-primary">
                Lead & Competitor{" "}
                <span className="gradient-text">Analysis</span>
              </h2>
              <p className="mt-1 text-sm text-text-muted">
                Insights into student acquisition and competitor comparisons
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Competitor Chart */}
              <div className="lg:col-span-1">
                 <CompetitorMentions data={competitorRank} />
              </div>

              {/* Insights Section */}
              <div className="lg:col-span-2 space-y-4">
                <div className="fade-in-up-delay-1 mb-4 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-primary-hover/15">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-text-primary">
                      Key <span className="gradient-text-cyan">Insights</span>
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {insights.map((insight, i) => (
                    <InsightCard key={insight.id} insight={insight} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* ─── TAB 3: Competitor Strategy ─────────────────────── */}
        {activeTab === 2 && (
          <div className="space-y-6" id="strategy-tab">
            <div className="fade-in-up">
              <h2 className="text-xl font-bold text-text-primary">
                Competitor Marketing <span className="gradient-text">Strategy</span>
              </h2>
              <p className="mt-1 text-sm text-text-muted">
                Professional analysis of marketing strategies used by top competitors
              </p>
            </div>
            
            <CompetitorStrategy data={competitorRank} />
          </div>
        )}

        {/* ─── TAB 4: Marketing Strategy ──────────────────────── */}
        {activeTab === 3 && (
          <div className="space-y-6" id="marketing-tab">
            <div className="fade-in-up">
              <h2 className="text-xl font-bold text-text-primary">
                HACA Marketing <span className="gradient-text">Strategy Plan</span>
              </h2>
              <p className="mt-1 text-sm text-text-muted">
                Actionable marketing initiatives, channel allocation, and audience targeting derived from enrollment analytics
              </p>
            </div>

            <MarketingStrategy data={filteredData} />
          </div>
        )}
      </div>
    </div>
  );
}
