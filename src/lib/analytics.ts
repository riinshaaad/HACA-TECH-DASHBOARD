import {
  EnrollmentData,
  KPIData,
  CourseDistribution,
  DistrictDistribution,
  GenderDistribution,
  StatusDistribution,
  LeadSourceDistribution,
  TrendPoint,
  CompetitorRank,
  Insight,
  FilterState,
  MonthOption,
} from "./types";

const CHART_COLORS = [
  "#3b82f6", // blue-500
  "#6366f1", // indigo-500
  "#8b5cf6", // violet-500
  "#06b6d4", // cyan-500
  "#10b981", // emerald-500
  "#f59e0b", // amber-500
  "#ef4444", // red-500
  "#ec4899", // pink-500
];

// ─── Filter Helper ─────────────────────────────────────────────────
export function applyFilters(
  data: EnrollmentData[],
  filters: FilterState
): EnrollmentData[] {
  return data.filter((d) => {
    if (filters.course !== "All" && d.course !== filters.course) return false;
    if (filters.district !== "All" && d.district !== filters.district)
      return false;
    if (
      filters.currentStatus !== "All" &&
      d.currentStatus !== filters.currentStatus
    )
      return false;
    if (filters.batch !== "All" && d.batchName !== filters.batch) return false;
    if (filters.month !== "All") {
      if (!d.enrollmentDate) return false;
      const parts = d.enrollmentDate.split("/");
      if (parts.length === 3) {
        const monthNum = parseInt(parts[1], 10).toString();
        if (monthNum !== filters.month) return false;
      } else {
        return false;
      }
    }
    return true;
  });
}

// ─── KPI Computation ───────────────────────────────────────────────
export function computeKPIs(data: EnrollmentData[]): KPIData {
  if (data.length === 0) {
    return {
      totalEnrollments: 0,
      topCourse: "N/A",
      topDistrict: "N/A",
      topLeadSource: "N/A",
      topMonth: "N/A",
      aiInfluencePercentage: 0,
    };
  }

  const totalEnrollments = data.length;

  const countByKey = (key: keyof EnrollmentData) => {
    const counts: Record<string, number> = {};
    data.forEach((d) => {
      const val = d[key] as string;
      if (val && val !== "Unknown") {
        counts[val] = (counts[val] || 0) + 1;
      }
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  };

  const topCourse = countByKey("course")[0]?.[0] || "N/A";
  const topDistrict = countByKey("district")[0]?.[0] || "N/A";
  const topLeadSource = countByKey("howDidYouHear")[0]?.[0] || "N/A";

  const monthCounts: Record<string, number> = {};
  data.forEach((d) => {
    if (!d.enrollmentDate) return;
    const parts = d.enrollmentDate.split("/");
    if (parts.length === 3) {
      const monthNum = parseInt(parts[1], 10);
      if (!isNaN(monthNum)) {
        monthCounts[monthNum] = (monthCounts[monthNum] || 0) + 1;
      }
    }
  });

  let topMonthRaw = Object.entries(monthCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
  let topMonth = topMonthRaw;
  if (topMonthRaw !== "N/A") {
    const date = new Date(2000, parseInt(topMonthRaw) - 1, 1);
    topMonth = date.toLocaleDateString("en-US", { month: "long" });
  }

  const aiInfluenced = data.filter(
    (d) => d.choseDueToAI.toLowerCase() === "yes"
  ).length;
  const aiInfluencePercentage = Math.round(
    (aiInfluenced / totalEnrollments) * 100
  );

  return {
    totalEnrollments,
    topCourse,
    topDistrict,
    topLeadSource,
    topMonth,
    aiInfluencePercentage,
  };
}

// ─── Course Distribution ───────────────────────────────────────────
export function computeCourseDistribution(
  data: EnrollmentData[]
): CourseDistribution[] {
  const counts: Record<string, number> = {};
  data.forEach((d) => {
    const course = d.course || "Unknown";
    counts[course] = (counts[course] || 0) + 1;
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([course, count], i) => ({
      course,
      count,
      fill: CHART_COLORS[i % CHART_COLORS.length],
    }));
}

// ─── District Distribution ───────────────────────────────────────────
export function computeDistrictDistribution(
  data: EnrollmentData[]
): DistrictDistribution[] {
  const counts: Record<string, number> = {};
  data.forEach((d) => {
    const district = d.district || "Unknown";
    counts[district] = (counts[district] || 0) + 1;
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([district, count], i) => ({
      district,
      count,
      fill: CHART_COLORS[i % CHART_COLORS.length],
    }));
}

// ─── Gender Distribution ───────────────────────────────────────────
export function computeGenderDistribution(
  data: EnrollmentData[]
): GenderDistribution[] {
  const counts: Record<string, number> = {};
  data.forEach((d) => {
    let gender = d.gender || "Unknown";
    // clean up simple variants
    if (gender.toLowerCase().startsWith("m")) gender = "Male";
    else if (gender.toLowerCase().startsWith("f")) gender = "Female";
    
    counts[gender] = (counts[gender] || 0) + 1;
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([gender, count], i) => ({
      gender,
      count,
      fill: CHART_COLORS[(i + 4) % CHART_COLORS.length], // offset colors slightly so it doesn't match other charts
    }));
}

// ─── Status Distribution ───────────────────────────────────────────
export function computeStatusDistribution(
  data: EnrollmentData[]
): StatusDistribution[] {
  const counts: Record<string, number> = {};
  data.forEach((d) => {
    const status = d.currentStatus || "Unknown";
    counts[status] = (counts[status] || 0) + 1;
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([status, count], i) => ({
      status,
      count,
      fill: CHART_COLORS[(i + 2) % CHART_COLORS.length], 
    }));
}

// ─── Lead Sources ──────────────────────────────────────────────────
export function computeLeadSources(
  data: EnrollmentData[]
): LeadSourceDistribution[] {
  const counts: Record<string, number> = {};
  data.forEach((d) => {
    let source = d.howDidYouHear || "Unknown";
    // Clean up known variations
    if (source.toLowerCase().includes("friend")) source = "Friend / Family";
    if (source.toLowerCase().includes("instagram")) source = "Instagram";
    counts[source] = (counts[source] || 0) + 1;
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6) // Top 6
    .map(([source, count], i) => ({
      source,
      count,
      fill: CHART_COLORS[i % CHART_COLORS.length],
    }));
}

// ─── Trend Over Time ───────────────────────────────────────────────
export function computeTrends(data: EnrollmentData[]): TrendPoint[] {
  const dateMap: Record<string, number> = {};

  data.forEach((d) => {
    // DD/MM/YYYY format
    if (!d.enrollmentDate) return;
    const parts = d.enrollmentDate.split("/");
    if (parts.length === 3) {
      // Convert to YYYY-MM to aggregate by month
      const monthYear = `${parts[2]}-${parts[1]}`;
      dateMap[monthYear] = (dateMap[monthYear] || 0) + 1;
    }
  });

  return Object.entries(dateMap)
    .map(([date, enrollments]) => ({
      date,
      enrollments,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

// ─── Competitor Mentions ───────────────────────────────────────────
export function computeCompetitorMentions(
  data: EnrollmentData[]
): CompetitorRank[] {
  const counts: Record<string, number> = {};

  data.forEach((d) => {
    if (d.competitorNames) {
      // Splitting by comma, cleaning up
      const names = d.competitorNames.split(",");
      names.forEach((n) => {
        let cleanName = n.trim().toLowerCase();
        // Consolidate known variants
        if (cleanName.includes("techolas")) cleanName = "Techolas";
        if (cleanName.includes("luminar")) cleanName = "Luminar";
        if (cleanName.includes("bridgeon") || cleanName.includes("bridge on"))
          cleanName = "Bridgeon";
        if (cleanName.includes("beat")) cleanName = "BEAT";
        if (cleanName.includes("rows") && cleanName.includes("columns"))
          cleanName = "Rows and Columns";
        if (cleanName.includes("zoople")) cleanName = "Zoople";
        if (cleanName.includes("brototype") || cleanName.includes("broto"))
          cleanName = "Brototype";
        if (cleanName.includes("catalyst")) cleanName = "Catalyst";

        if (cleanName.length > 2) {
          counts[cleanName] = (counts[cleanName] || 0) + 1;
        }
      });
    }
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, mentions]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      mentions,
    }));
}

// ─── Unique Values (for Filters) ──────────────────────────────────
export function getUniqueCourses(data: EnrollmentData[]): string[] {
  return [...new Set(data.map((d) => d.course).filter(Boolean))].sort();
}

export function getUniqueDistricts(data: EnrollmentData[]): string[] {
  return [...new Set(data.map((d) => d.district).filter(Boolean))].sort();
}

export function getUniqueStatuses(data: EnrollmentData[]): string[] {
  return [...new Set(data.map((d) => d.currentStatus).filter(Boolean))].sort();
}

export function getUniqueBatches(data: EnrollmentData[]): string[] {
  return [...new Set(data.map((d) => d.batchName).filter(Boolean))].sort();
}

export function getUniqueMonths(data: EnrollmentData[]): MonthOption[] {
  const months = new Set<number>();
  data.forEach((d) => {
    if (!d.enrollmentDate) return;
    const parts = d.enrollmentDate.split("/");
    if (parts.length === 3) {
      const month = parseInt(parts[1], 10);
      if (!isNaN(month)) {
        months.add(month);
      }
    }
  });

  return Array.from(months)
    .sort((a, b) => a - b)
    .map((monthNum) => {
      const date = new Date(2000, monthNum - 1, 1);
      return {
        value: monthNum.toString(),
        label: date.toLocaleDateString("en-US", { month: "long" }),
      };
    });
}

// ─── Insights Engine ───────────────────────────────────────────────
export function generateInsights(
  data: EnrollmentData[],
  kpis: KPIData
): Insight[] {
  const insights: Insight[] = [];

  // 1. AI Influence Highlight
  if (kpis.aiInfluencePercentage > 50) {
    insights.push({
      id: "ai-high",
      type: "highlight",
      title: "Strong AI Demand",
      description: `${kpis.aiInfluencePercentage}% of students specifically chose the institute because of the mention of AI in the curriculum.`,
      value: `${kpis.aiInfluencePercentage}%`,
    });
  }

  // 2. Lead Source
  const sources = computeLeadSources(data);
  if (sources.length > 0) {
    const topSource = sources[0];
    const percentage = Math.round((topSource.count / data.length) * 100);
    insights.push({
      id: "top-lead",
      type: "trend",
      title: `${topSource.source} Dominates Leads`,
      description: `${topSource.source} is your primary acquisition channel, driving ${percentage}% of all enrollments.`,
      value: `${topSource.count} students`,
    });
  }

  // 3. Comparisons
  const compared = data.filter(
    (d) => d.comparedWithOtherInstitutes.toLowerCase() === "yes"
  ).length;
  const comparedPct = Math.round((compared / data.length) * 100);

  if (comparedPct > 40) {
    insights.push({
      id: "high-comparison",
      type: "warning",
      title: "High Competitor Comparison",
      description: `${comparedPct}% of your students compare you with other institutes before joining. Brand differentiation is critical.`,
      value: `${comparedPct}%`,
    });
  } else {
    insights.push({
      id: "low-comparison",
      type: "highlight",
      title: "Strong Brand Loyalty",
      description: `Only ${comparedPct}% of students shopped around. Most students come directly to you with high intent.`,
      value: `${100 - comparedPct}% direct`,
    });
  }

  // 4. Student Status
  const statusCounts: Record<string, number> = {};
  data.forEach((d) => {
    statusCounts[d.currentStatus] = (statusCounts[d.currentStatus] || 0) + 1;
  });
  const topStatus = Object.entries(statusCounts).sort((a, b) => b[1] - a[1])[0];
  if (topStatus) {
    insights.push({
      id: "top-status",
      type: "trend",
      title: `${topStatus[0]}s are key demographic`,
      description: `${topStatus[0]}s make up the largest portion of your batches with ${topStatus[1]} enrollments.`,
      value: `${Math.round((topStatus[1] / data.length) * 100)}%`,
    });
  }

  return insights;
}
