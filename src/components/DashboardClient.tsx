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

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <CourseDistributionChart
                data={courseDist}
                activeFilter={filters.course}
                onSelect={(val) =>
                  setFilters((prev) => ({ ...prev, course: val }))
                }
              />
              <GenderDistributionChart
                data={genderDist}
                activeFilter={filters.gender}
                onSelect={(val) =>
                  setFilters((prev) => ({ ...prev, gender: val }))
                }
              />
              <AgeDistributionChart
                data={ageDist}
                activeFilter={filters.ageGroup}
                onSelect={(val) =>
                  setFilters((prev) => ({ ...prev, ageGroup: val }))
                }
              />
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <DistrictDistributionChart
                data={districtDist}
                activeFilter={filters.district}
                onSelect={(val) =>
                  setFilters((prev) => ({ ...prev, district: val }))
                }
              />
              <TrendChart data={trends} />
              <StatusDistributionChart
                data={statusDist}
                activeFilter={filters.currentStatus}
                onSelect={(val) =>
                  setFilters((prev) => ({ ...prev, currentStatus: val }))
                }
              />
            </div>

            {/* Charts Row 3 */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <EducationDistributionChart
                data={educationDist}
                activeFilter={filters.educationalBackground}
                onSelect={(val) =>
                  setFilters((prev) => ({
                    ...prev,
                    educationalBackground: val,
                  }))
                }
              />
              <SeenAdsChart
                data={seenAds}
                activeFilter={filters.seenAds}
                onSelect={(val) =>
                  setFilters((prev) => ({ ...prev, seenAds: val }))
                }
              />
              <InfluencingContentChart
                data={influencingContent}
                activeFilter={filters.influencingContent}
                onSelect={(val) =>
                  setFilters((prev) => ({
                    ...prev,
                    influencingContent: val,
                  }))
                }
              />
            </div>

            {/* Charts Row 4 */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <AIInfluenceChart
                data={aiInfluence}
                activeFilter={filters.choseDueToAI}
                onSelect={(val) =>
                  setFilters((prev) => ({ ...prev, choseDueToAI: val }))
                }
              />
              <ReasonForChoosingChart
                data={reasonForChoosingDist}
                activeFilter={filters.reasonForChoosingInstitute}
                onSelect={(val) =>
                  setFilters((prev) => ({
                    ...prev,
                    reasonForChoosingInstitute: val,
                  }))
                }
              />
              <LeadSourceChart
                data={leadSources}
                activeFilter={filters.leadSource}
                onSelect={(val) =>
                  setFilters((prev) => ({ ...prev, leadSource: val }))
                }
              />
            </div>

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
