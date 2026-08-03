import {
  EnrollmentData,
  KPIData,
  CourseDistribution,
  DistrictDistribution,
  GenderDistribution,
  AgeDistribution,
  StatusDistribution,
  EducationDistribution,
  InfluencingContentDistribution,
  SeenAdsDistribution,
  AIInfluenceDistribution,
  ReviewFrequencyDistribution,
  ReasonDistribution,
  LeadSourceDistribution,
  TrendPoint,
  CompetitorRank,
  Insight,
  ComprehensiveInsight,
  InsightCategory,
  FilterState,
  MonthOption,
} from "./types";

// Removed CHART_COLORS array since we are using explicit semantic colors to avoid the "rainbow" look

// ─── Filter Helper ─────────────────────────────────────────────────
export function applyFilters(
  data: EnrollmentData[],
  filters: FilterState
): EnrollmentData[] {
  return data.filter((d) => {
    // Helper to check if item value matches filter
    const matchesFilter = (filterVal: string | string[] | undefined, itemVal: string) => {
      if (!filterVal || filterVal === "All") return true;
      if (Array.isArray(filterVal)) {
        if (filterVal.includes("All") || filterVal.length === 0) return true;
        return filterVal.includes(itemVal);
      }
      return itemVal === filterVal;
    };

    if (!matchesFilter(filters.course, d.course)) return false;
    if (!matchesFilter(filters.district, d.district)) return false;
    if (!matchesFilter(filters.currentStatus, d.currentStatus)) return false;
    if (!matchesFilter(filters.batch, d.batchName)) return false;

    const selectedMonths = Array.isArray(filters.month) ? filters.month : [filters.month];
    const hasMonthFilter = selectedMonths.length > 0 && !selectedMonths.includes("All");
    const selectedYears = Array.isArray(filters.year) ? filters.year : [filters.year];
    const hasYearFilter = selectedYears.length > 0 && !selectedYears.includes("All");

    if (hasMonthFilter || hasYearFilter) {
      if (!d.enrollmentDate) return false;
      const parts = d.enrollmentDate.split("/");
      if (parts.length === 3) {
        if (hasMonthFilter) {
          const monthNum = parseInt(parts[1], 10).toString();
          if (!selectedMonths.includes(monthNum)) return false;
        }
        if (hasYearFilter) {
          const yearStr = parts[2].trim().split(" ")[0];
          if (!selectedYears.includes(yearStr)) return false;
        }
      } else {
        return false;
      }
    }

    // Chart slicer filters:
    if (filters.gender && filters.gender !== "All") {
      let g = "Other";
      const rawG = (d.gender || "").toLowerCase();
      if (rawG.startsWith("m")) g = "Male";
      else if (rawG.startsWith("f")) g = "Female";
      if (g !== filters.gender) return false;
    }
    if (
      filters.ageGroup &&
      filters.ageGroup !== "All" &&
      d.ageGroup !== filters.ageGroup
    ) {
      return false;
    }
    if (filters.leadSource && filters.leadSource !== "All") {
      let source = d.howDidYouHear || "Unknown";
      if (source.toLowerCase().includes("friend")) source = "Friend / Family";
      if (source.toLowerCase().includes("instagram")) source = "Instagram";
      if (source !== filters.leadSource) return false;
    }
    if (
      filters.educationalBackground &&
      filters.educationalBackground !== "All"
    ) {
      let bg = (d.educationalBackground || "Unknown").trim();
      bg = bg.replace(/\b\w/g, (c) => c.toUpperCase());
      if (bg.length > 20) {
        bg = bg.substring(0, 18) + "…";
      }
      if (bg !== filters.educationalBackground) return false;
    }
    if (filters.seenAds && filters.seenAds !== "All") {
      let ans = (d.seenAds || "Unknown").trim();
      if (ans.toLowerCase().startsWith("yes")) ans = "Yes";
      else if (ans.toLowerCase().startsWith("no")) ans = "No";
      else ans = ans.charAt(0).toUpperCase() + ans.slice(1);
      if (ans !== filters.seenAds) return false;
    }
    if (filters.influencingContent && filters.influencingContent !== "All") {
      const lower = (d.influencingContent || "").toLowerCase();
      let matches = false;
      if (filters.influencingContent === "Informative" && lower.includes("inform")) matches = true;
      else if (filters.influencingContent === "Testimony" && lower.includes("testim")) matches = true;
      else if (filters.influencingContent === "Life at HACA" && lower.includes("life") && lower.includes("haca")) matches = true;
      else {
        let other = (d.influencingContent || "").trim();
        if (other.length > 25) {
          other = other.substring(0, 22) + "...";
        }
        other = other.charAt(0).toUpperCase() + other.slice(1);
        if (other === filters.influencingContent) matches = true;
      }
      if (!matches) return false;
    }
    if (filters.choseDueToAI && filters.choseDueToAI !== "All") {
      let ans = (d.choseDueToAI || "Unknown").trim();
      if (ans.toLowerCase().startsWith("yes")) ans = "Yes";
      else if (ans.toLowerCase().startsWith("no")) ans = "No";
      else ans = ans.charAt(0).toUpperCase() + ans.slice(1);
      if (ans !== filters.choseDueToAI) return false;
    }
    if (
      filters.reasonForChoosingInstitute &&
      filters.reasonForChoosingInstitute !== "All"
    ) {
      let reason = (d.reasonForChoosingInstitute || "").trim();
      const lower = reason.toLowerCase();
      if (lower.includes("place") || lower.includes("job")) reason = "Placement/Job";
      else if (lower.includes("curriculum") || lower.includes("syllabus") || lower.includes("course")) reason = "Curriculum";
      else if (lower.includes("fee") || lower.includes("price") || lower.includes("cost")) reason = "Affordable Fees";
      else if (lower.includes("facult") || lower.includes("teacher") || lower.includes("trainer")) reason = "Faculty/Trainers";
      else if (lower.includes("review") || lower.includes("rating")) reason = "Good Reviews";
      else if (lower.includes("brand") || lower.includes("name") || lower.includes("reput")) reason = "Brand Reputation";
      else if (lower.includes("friend") || lower.includes("refer")) reason = "Friend/Referral";
      else if (reason.length > 25) {
        reason = reason.substring(0, 22) + "...";
        reason = reason.charAt(0).toUpperCase() + reason.slice(1);
      } else {
        reason = reason.charAt(0).toUpperCase() + reason.slice(1);
      }
      if (reason !== filters.reasonForChoosingInstitute) return false;
    }
    if (filters.reviewFrequency && filters.reviewFrequency !== "All") {
      let answer = (d.reviewFrequency || "Unknown").trim();
      if (answer !== "Unknown" && answer !== "") {
        answer = answer.charAt(0).toUpperCase() + answer.slice(1);
      }
      if (answer !== filters.reviewFrequency) return false;
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
const DONUT_COLORS = [
  "#7B5CFA", // Primary Purple
  "#06b6d4", // Cyan
  "#f59e0b", // Amber
  "#ec4899", // Pink
  "#10b981", // Emerald
  "#3b82f6", // Blue
  "#FF7A50", // Orange
];

export function computeCourseDistribution(
  data: EnrollmentData[]
): CourseDistribution[] {
  const counts: Record<string, number> = {};
  data.forEach((d) => {
    const course = d.course;
    if (!course || course === "Unknown") return;
    counts[course] = (counts[course] || 0) + 1;
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([course, count], i) => ({
      course,
      count,
      fill: DONUT_COLORS[i % DONUT_COLORS.length], 
    }));
}

const BAR_COLORS = ["#7B5CFA", "#9B6BFF"]; // Two elegant, standard colors for the bars

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
      fill: BAR_COLORS[i % 2], // Alternate between the two colors
    }));
}

// ─── Gender Distribution ───────────────────────────────────────────
export function computeGenderDistribution(
  data: EnrollmentData[]
): GenderDistribution[] {
  const counts: Record<string, number> = {};
  data.forEach((d) => {
    if (!d.gender) return;
    let gender = d.gender.toLowerCase();
    
    if (gender.startsWith("m")) {
      counts["Male"] = (counts["Male"] || 0) + 1;
    } else if (gender.startsWith("f")) {
      counts["Female"] = (counts["Female"] || 0) + 1;
    }
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([gender, count]) => {
      // Clear, distinct colors for the pie chart
      let fill = "#f59e0b"; // Default / Other (Amber)
      if (gender === "Male") fill = "#06b6d4"; // Cyan
      else if (gender === "Female") fill = "#7B5CFA"; // Primary Purple
      
      return {
        gender,
        count,
        fill,
      };
    });
}

// ─── Age Distribution ──────────────────────────────────────────────
export function computeAgeDistribution(
  data: EnrollmentData[]
): AgeDistribution[] {
  const counts: Record<string, number> = {};
  data.forEach((d) => {
    if (!d.ageGroup) return;
    const age = d.ageGroup;
    counts[age] = (counts[age] || 0) + 1;
  });

  return Object.entries(counts)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([ageGroup, count], i) => ({
      ageGroup,
      count,
      fill: BAR_COLORS[i % 2],
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
      fill: BAR_COLORS[i % 2], 
    }));
}

// ─── Education Background Distribution ─────────────────────────────
export function computeEducationDistribution(
  data: EnrollmentData[]
): EducationDistribution[] {
  const counts: Record<string, number> = {};
  data.forEach((d) => {
    let bg = d.educationalBackground || "Unknown";
    bg = bg.trim();
    
    // Capitalize first letter of each word for clean display without categorization
    bg = bg.replace(/\b\w/g, (c) => c.toUpperCase());

    if (bg.length > 20) {
      bg = bg.substring(0, 18) + "…";
    }

    if (bg !== "Unknown" && bg !== "") {
      counts[bg] = (counts[bg] || 0) + 1;
    }
  });

  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10); // Top 10 for bar chart

  const maxCount = sorted.length > 0 ? sorted[0][1] : 1;

  return sorted.map(([background, count]) => ({
    background,
    count,
    fullMark: maxCount,
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
      fill: BAR_COLORS[i % 2], 
    }));
}

// ─── Influencing Content ───────────────────────────────────────────
export function computeInfluencingContentDistribution(
  data: EnrollmentData[]
): InfluencingContentDistribution[] {
  const counts: Record<string, number> = {};
  data.forEach((d) => {
    const raw = d.influencingContent || "Unknown";
    if (
      raw === "Unknown" ||
      raw.trim() === "" ||
      raw.toLowerCase().trim() === "na" ||
      raw.toLowerCase().trim() === "none"
    ) {
      return;
    }

    const lower = raw.toLowerCase();
    const categories: string[] = [];

    // Categorize known complex strings
    if (lower.includes("inform")) categories.push("Informative");
    if (lower.includes("testim")) categories.push("Testimony");
    if (lower.includes("life") && lower.includes("haca")) categories.push("Life at HACA");

    if (categories.length > 0) {
      categories.forEach((cat) => {
        counts[cat] = (counts[cat] || 0) + 1;
      });
    } else {
      // Handle other unrecognized content
      let other = raw.trim();
      if (other.length > 25) {
        other = other.substring(0, 22) + "...";
      }
      other = other.charAt(0).toUpperCase() + other.slice(1);
      counts[other] = (counts[other] || 0) + 1;
    }
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6) // Top 6
    .map(([content, count], i) => ({
      content,
      count,
      fill: BAR_COLORS[i % 2], 
    }));
}

// ─── Seen Ads ──────────────────────────────────────────────────────
export function computeSeenAdsDistribution(
  data: EnrollmentData[]
): SeenAdsDistribution[] {
  const counts: Record<string, number> = {};
  data.forEach((d) => {
    let answer = d.seenAds || "Unknown";
    answer = answer.trim();

    if (answer !== "Unknown" && answer !== "") {
      // Normalize Yes/No
      if (answer.toLowerCase().startsWith("yes")) {
        answer = "Yes";
      } else if (answer.toLowerCase().startsWith("no")) {
        answer = "No";
      } else {
        // Just capitalize first letter if it's something else
        answer = answer.charAt(0).toUpperCase() + answer.slice(1);
      }
      counts[answer] = (counts[answer] || 0) + 1;
    }
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1]) // Sort largest first
    .slice(0, 4) // Top 4
    .map(([answer, count], i) => {
      // Use standard purple theme for all charts
      let fill = "#7B5CFA"; 
      if (answer === "Yes") fill = "#7B5CFA"; // Primary Purple
      else if (answer === "No") fill = "#06b6d4"; // Cyan
      else fill = BAR_COLORS[i % 2];

      return {
        answer,
        count,
        fill,
      };
    });
}

// ─── AI Influence ──────────────────────────────────────────────────
export function computeAIInfluenceDistribution(
  data: EnrollmentData[]
): AIInfluenceDistribution[] {
  const counts: Record<string, number> = {};
  data.forEach((d) => {
    let answer = d.choseDueToAI || "Unknown";
    answer = answer.trim();

    if (answer !== "Unknown" && answer !== "") {
      // Normalize Yes/No
      if (answer.toLowerCase().startsWith("yes")) {
        answer = "Yes";
      } else if (answer.toLowerCase().startsWith("no")) {
        answer = "No";
      } else {
        answer = answer.charAt(0).toUpperCase() + answer.slice(1);
      }
      counts[answer] = (counts[answer] || 0) + 1;
    }
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1]) // Sort largest first
    .slice(0, 4) // Top 4
    .map(([answer, count], i) => {
      // Standard purple theme
      let fill = "#7B5CFA"; 
      if (answer === "Yes") fill = "#7B5CFA"; // Primary Purple
      else if (answer === "No") fill = "#06b6d4"; // Cyan
      else fill = BAR_COLORS[i % 2];

      return {
        answer,
        count,
        fill,
      };
    });
}

// ─── Review Frequency ──────────────────────────────────────────────
export function computeReviewFrequencyDistribution(
  data: EnrollmentData[]
): ReviewFrequencyDistribution[] {
  const counts: Record<string, number> = {};
  data.forEach((d) => {
    let answer = d.reviewFrequency || "Unknown";
    answer = answer.trim();

    if (answer !== "Unknown" && answer !== "") {
      // Normalize simple strings if needed
      answer = answer.charAt(0).toUpperCase() + answer.slice(1);
      counts[answer] = (counts[answer] || 0) + 1;
    }
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1]) // Sort largest first
    .slice(0, 5) // Top 5
    .map(([answer, count], i) => {
      let fill = BAR_COLORS[i % 2];
      return {
        answer,
        count,
        fill,
      };
    });
}

// ─── Reason for Choosing ───────────────────────────────────────────
export function computeReasonForChoosingDistribution(
  data: EnrollmentData[]
): ReasonDistribution[] {
  const counts: Record<string, number> = {};
  data.forEach((d) => {
    const raw = d.reasonForChoosingInstitute || "Unknown";
    if (
      raw === "Unknown" ||
      raw.trim() === "" ||
      raw.toLowerCase().trim() === "na" ||
      raw.toLowerCase().trim() === "none"
    ) {
      return;
    }

    // Usually respondents give various reasons. We'll categorize common ones or use raw
    let reason = raw.trim();
    const lower = reason.toLowerCase();
    
    if (lower.includes("place") || lower.includes("job")) reason = "Placement/Job";
    else if (lower.includes("curriculum") || lower.includes("syllabus") || lower.includes("course")) reason = "Curriculum";
    else if (lower.includes("fee") || lower.includes("price") || lower.includes("cost")) reason = "Affordable Fees";
    else if (lower.includes("facult") || lower.includes("teacher") || lower.includes("trainer")) reason = "Faculty/Trainers";
    else if (lower.includes("review") || lower.includes("rating")) reason = "Good Reviews";
    else if (lower.includes("brand") || lower.includes("name") || lower.includes("reput")) reason = "Brand Reputation";
    else if (lower.includes("friend") || lower.includes("refer")) reason = "Friend/Referral";
    else if (reason.length > 25) {
       reason = reason.substring(0, 22) + "...";
       reason = reason.charAt(0).toUpperCase() + reason.slice(1);
    } else {
       reason = reason.charAt(0).toUpperCase() + reason.slice(1);
    }

    counts[reason] = (counts[reason] || 0) + 1;
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1]) // Sort largest first
    .slice(0, 5) // Top 5
    .map(([reason, count], i) => {
      let fill = BAR_COLORS[i % 2];
      return {
        reason,
        count,
        fill,
      };
    });
}


// ─── Trend Over Time ───────────────────────────────────────────────
export function computeTrends(data: EnrollmentData[]): TrendPoint[] {
  const dateMap: Record<string, number> = {};

  data.forEach((d) => {
    // DD/MM/YYYY format
    if (!d.enrollmentDate) return;
    const parts = d.enrollmentDate.split("/");
    if (parts.length === 3) {
      const monthStr = parts[1].padStart(2, "0"); 
      // Aggregate by month only (e.g. "01", "02") to see overall month performance
      dateMap[monthStr] = (dateMap[monthStr] || 0) + 1;
    }
  });

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return Object.entries(dateMap)
    .sort((a, b) => a[0].localeCompare(b[0])) // Sort chronologically from Jan to Dec
    .map(([monthStr, enrollments]) => {
      const monthName = monthNames[parseInt(monthStr, 10) - 1];
      
      return {
        date: monthName, // e.g., "Jan", "Feb"
        enrollments,
      };
    });
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
  const set = new Set(data.map((d) => d.batchName).filter(Boolean));
  return Array.from(set).sort();
}

export function getUniqueYears(data: EnrollmentData[]): string[] {
  const set = new Set<string>();
  data.forEach((d) => {
    if (!d.enrollmentDate) return;
    const parts = d.enrollmentDate.split("/");
    if (parts.length === 3) {
      const year = parts[2].trim().split(" ")[0];
      if (year) set.add(year);
    }
  });
  return Array.from(set).sort((a, b) => b.localeCompare(a)); // Descending order (newest first)
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

// ─── Comprehensive Data-Driven Insights Engine (7 Categories) ─────────
export function generateComprehensiveInsights(
  data: EnrollmentData[]
): ComprehensiveInsight[] {
  const total = data.length || 1;
  const kpis = computeKPIs(data);
  const courses = computeCourseDistribution(data);
  const districts = computeDistrictDistribution(data);
  const genders = computeGenderDistribution(data);
  const ages = computeAgeDistribution(data);
  const statuses = computeStatusDistribution(data);
  const leadSources = computeLeadSources(data);
  const influencingContent = computeInfluencingContentDistribution(data);
  const reasons = computeReasonForChoosingDistribution(data);
  const reviews = computeReviewFrequencyDistribution(data);

  // Helper calculation values
  const topCourse = courses[0] || { course: "Data Analytics with AI", count: 0 };
  const secondCourse = courses[1] || { course: "Python", count: 0 };
  const topCoursePct = Math.round((topCourse.count / total) * 100);
  const secondCoursePct = Math.round((secondCourse.count / total) * 100);

  const comparedCount = data.filter(
    (d) => (d.comparedWithOtherInstitutes || "").toLowerCase() === "yes"
  ).length;
  const comparedPct = Math.round((comparedCount / total) * 100);
  const directPct = 100 - comparedPct;

  const maleCount = genders.find((g) => g.gender === "Male")?.count || 0;
  const femaleCount = genders.find((g) => g.gender === "Female")?.count || 0;
  const malePct = Math.round((maleCount / total) * 100);
  const femalePct = Math.round((femaleCount / total) * 100);

  const topDistrict = districts[0] || { district: "Malappuram", count: 0 };
  const secondDistrict = districts[1] || { district: "Kozhikode", count: 0 };
  const thirdDistrict = districts[2] || { district: "Kannur", count: 0 };
  const topDistrictPct = Math.round((topDistrict.count / total) * 100);
  const top3DistrictsCount = topDistrict.count + secondDistrict.count + thirdDistrict.count;
  const top3DistrictsPct = Math.round((top3DistrictsCount / total) * 100);

  const topAge = ages[0] || { ageGroup: "20-25", count: 0 };
  const topAgePct = Math.round((topAge.count / total) * 100);

  const jobSeekerCount = statuses.find((s) => s.status === "Job Seeker")?.count || 0;
  const studentCount = statuses.find((s) => s.status === "Student")?.count || 0;
  const workingProCount =
    statuses.find((s) => s.status === "Working Professional")?.count || 0;
  const freshersPct = Math.round(((jobSeekerCount + studentCount) / total) * 100);
  const workingProPct = Math.round((workingProCount / total) * 100);

  const topSource = leadSources[0] || { source: "Instagram", count: 0 };
  const secondSource = leadSources[1] || { source: "Friend / Family", count: 0 };
  const topSourcePct = Math.round((topSource.count / total) * 100);
  const secondSourcePct = Math.round((secondSource.count / total) * 100);
  const combinedOrganicPct = topSourcePct + secondSourcePct;

  const topContent = influencingContent[0] || { content: "Informative", count: 0 };
  const topContentPct = Math.round((topContent.count / total) * 100);

  const topReason = reasons[0] || { reason: "Placement/Job", count: 0 };
  const secondReason = reasons[1] || { reason: "Good Reviews", count: 0 };
  const topReasonPct = Math.round((topReason.count / total) * 100);
  const secondReasonPct = Math.round((secondReason.count / total) * 100);

  // Batch size calculation
  const batchMap: Record<string, number> = {};
  data.forEach((d) => {
    const b = d.batchName || "Unknown";
    batchMap[b] = (batchMap[b] || 0) + 1;
  });
  const batchEntries = Object.entries(batchMap).sort((a, b) => b[1] - a[1]);
  const largestBatch = batchEntries[0] || ["DA10", 0];
  const smallestBatch = batchEntries[batchEntries.length - 1] || ["DA13", 0];
  const avgBatchSize = Math.round(total / (batchEntries.length || 1));

  // Monthly intake
  const monthMap: Record<string, number> = {};
  data.forEach((d) => {
    if (!d.enrollmentDate) return;
    const parts = d.enrollmentDate.split("/");
    if (parts.length === 3) {
      monthMap[parts[1]] = (monthMap[parts[1]] || 0) + 1;
    }
  });
  const monthEntries = Object.entries(monthMap).sort((a, b) => b[1] - a[1]);
  const peakMonthEntry = monthEntries[0] || ["1", 0];
  const lowMonthEntry = monthEntries[monthEntries.length - 1] || ["5", 0];
  const monthNames: Record<string, string> = {
    "1": "January",
    "2": "February",
    "3": "March",
    "4": "April",
    "5": "May",
    "6": "June",
    "7": "July",
    "8": "August",
    "9": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  };
  const peakMonthName = monthNames[peakMonthEntry[0]] || `Month ${peakMonthEntry[0]}`;
  const lowMonthName = monthNames[lowMonthEntry[0]] || `Month ${lowMonthEntry[0]}`;
  const peakMonthPct = Math.round((peakMonthEntry[1] / total) * 100);
  const lowMonthPct = Math.round((lowMonthEntry[1] / total) * 100);

  // Pre-compute raw counts used in insights
  const seenAdsCount = data.filter((d) => (d.seenAds || "").toLowerCase().startsWith("yes")).length;
  const testimonyCount = influencingContent.find((c) => c.content === "Testimony")?.count || 0;
  const lifeAtHacaCount = influencingContent.find((c) => c.content === "Life at HACA")?.count || 0;
  const feeReasonCount = reasons.find((r) => r.reason.includes("Afford") || r.reason.includes("Fee"))?.count || 0;
  const aiCount = Math.round((kpis.aiInfluencePercentage / 100) * total);
  const nonAiCount = total - aiCount;
  const combinedTopSourceCount = topSource.count + secondSource.count;
  const top3Districts = top3DistrictsCount;

  return [
    // ── 1. EXECUTIVE SUMMARY ──────────────────────────────────────────
    {
      id: "exec-summary-demand",
      category: "Executive Summary",
      title: "🎯 Total Students & Top Course",
      insight: `${total} students enrolled across ${batchEntries.length} batches. ${topCourse.count} out of ${total} chose Data Analytics with AI. Only ${secondCourse.count} chose Python.`,
      supportingMetrics: [
        `Total enrolled: ${total} students`,
        `Data Analytics with AI: ${topCourse.count} students`,
        `Python: ${secondCourse.count} students`,
        `AI was the main reason for joining: ${aiCount} students`,
      ],
      businessImpact: "AI courses are the biggest pull factor — far ahead of anything else.",
      recommendation: "Lead every ad with 'Learn AI Skills'. Consider bundling Python as an AI add-on.",
      badgeType: "highlight",
    },
    {
      id: "exec-summary-intent",
      category: "Executive Summary",
      title: "💚 Brand Trust — Direct Enrollments",
      insight: `${total - comparedCount} out of ${total} students joined HACA without comparing any other institute. Only ${comparedCount} students looked elsewhere first.`,
      supportingMetrics: [
        `Joined directly without comparing: ${total - comparedCount} students`,
        `Compared with other institutes first: ${comparedCount} students`,
        `Top join reason: "${topReason.reason}" — ${topReason.count} students`,
        `2nd join reason: "${secondReason.reason}" — ${secondReason.count} students`,
      ],
      businessImpact: "Strong direct intent means HACA's reputation is working as a sales tool.",
      recommendation: `Prepare a simple 'Why HACA?' one-pager for the ${comparedCount} students who compare before joining.`,
      badgeType: "trend",
    },

    // ── 2. ENROLLMENT INSIGHTS ────────────────────────────────────────
    {
      id: "enrollment-seasonality",
      category: "Enrollment Insights",
      title: "📅 Peak vs. Quiet Months",
      insight: `${peakMonthName} was the busiest month: ${peakMonthEntry[1]} students joined. ${lowMonthName} was the quietest: only ${lowMonthEntry[1]} students. Monthly average: ${Math.round(total / Math.max(1, monthEntries.length))} students.`,
      supportingMetrics: [
        `Busiest month: ${peakMonthName} — ${peakMonthEntry[1]} students`,
        `Quietest month: ${lowMonthName} — ${lowMonthEntry[1]} students`,
        `Difference: ${Math.round(peakMonthEntry[1] / Math.max(1, lowMonthEntry[1]))}x more students in peak month`,
        `Monthly average: ~${Math.round(total / Math.max(1, monthEntries.length))} students`,
      ],
      businessImpact: "Quiet months leave classrooms and trainers underused.",
      recommendation: "Run discounts or early-bird offers during quiet months.",
      badgeType: "warning",
    },
    {
      id: "enrollment-velocity",
      category: "Enrollment Insights",
      title: "👀 Students Research Before Joining",
      insight: `${seenAdsCount} out of ${total} students had already seen HACA ads before enrolling. ${secondSource.count} students came through a friend or family referral.`,
      supportingMetrics: [
        `Seen HACA ads before joining: ${seenAdsCount} students`,
        `Came via friend / family recommendation: ${secondSource.count} students`,
        `Reviews are checked before most join decisions`,
      ],
      businessImpact: "Good reviews and active social media directly drive more enrollments.",
      recommendation: "Ask current students to leave a Google Review after completing their first month.",
      badgeType: "trend",
    },

    // ── 3. STUDENT DEMOGRAPHICS ───────────────────────────────────────
    {
      id: "demographics-gender",
      category: "Student Demographics",
      title: "👫 Gender Split",
      insight: `${maleCount} male students and ${femaleCount} female students — nearly equal across all courses out of ${total} total.`,
      supportingMetrics: [
        `Male students: ${maleCount} out of ${total}`,
        `Female students: ${femaleCount} out of ${total}`,
        `Near 50:50 split — rare for a tech school`,
        `Total students: ${total}`,
      ],
      businessImpact: "Equal gender ratio means HACA appeals to everyone, doubling the potential audience.",
      recommendation: "Show both male and female student success stories equally in ads.",
      badgeType: "highlight",
    },
    {
      id: "demographics-age",
      category: "Student Demographics",
      title: "🎓 Age & Career Stage",
      insight: `${topAge.count} students are aged ${topAge.ageGroup} — the biggest age group. ${jobSeekerCount + studentCount} are students or job seekers. ${workingProCount} are employed professionals upskilling.`,
      supportingMetrics: [
        `Largest age group (${topAge.ageGroup} yrs): ${topAge.count} students`,
        `Job seekers + students (career starters): ${jobSeekerCount + studentCount} students`,
        `Working professionals (upskilling): ${workingProCount} students`,
      ],
      businessImpact: "Most students want a job fast — placement support is the top priority for them.",
      recommendation: "For working professionals, offer weekend or evening batches.",
      badgeType: "trend",
    },
    {
      id: "demographics-geography",
      category: "Student Demographics",
      title: "📍 Where Students Come From",
      insight: `${top3Districts} out of ${total} students come from just 3 districts: ${topDistrict.district} (${topDistrict.count}), ${secondDistrict.district} (${secondDistrict.count}), ${thirdDistrict.district} (${thirdDistrict.count}).`,
      supportingMetrics: [
        `${topDistrict.district}: ${topDistrict.count} students`,
        `${secondDistrict.district}: ${secondDistrict.count} students`,
        `${thirdDistrict.district}: ${thirdDistrict.count} students`,
        `Top 3 districts combined: ${top3Districts} out of ${total} students`,
      ],
      businessImpact: "Rest of Kerala is largely untapped — a clear growth opportunity.",
      recommendation: "Run targeted online ads in Ernakulam, Thrissur, and Palakkad.",
      badgeType: "highlight",
    },

    // ── 4. MARKETING & LEAD SOURCE INSIGHTS ───────────────────────────
    {
      id: "marketing-channels",
      category: "Marketing & Lead Source Insights",
      title: "📱 How Students Found HACA",
      insight: `${topSource.source} brought in ${topSource.count} students — the highest of any channel. ${secondSource.source} was 2nd with ${secondSource.count} students. Together: ${combinedTopSourceCount} out of ${total} students.`,
      supportingMetrics: [
        `#1 Source: ${topSource.source} — ${topSource.count} students`,
        `#2 Source: ${secondSource.source} — ${secondSource.count} students`,
        `Both together: ${combinedTopSourceCount} out of ${total} students`,
        `All other channels combined: ${total - combinedTopSourceCount} students`,
      ],
      businessImpact: "Instagram + word of mouth is doing most of the recruiting — nearly for free.",
      recommendation: "Reward students who refer friends with a discount or small gift.",
      badgeType: "highlight",
    },
    {
      id: "marketing-content",
      category: "Marketing & Lead Source Insights",
      title: "📹 What Content Influenced Students",
      insight: `${topContent.count} students said informative content convinced them. ${testimonyCount} were convinced by student testimonials. ${lifeAtHacaCount} by Life at HACA clips. ${seenAdsCount} had seen HACA ads before joining.`,
      supportingMetrics: [
        `Informative posts/videos: ${topContent.count} students`,
        `Student testimonials: ${testimonyCount} students`,
        `Life at HACA / campus content: ${lifeAtHacaCount} students`,
        `Had seen HACA ads before joining: ${seenAdsCount} students`,
      ],
      businessImpact: "Useful content converts better than promotional banners.",
      recommendation: "Post 1 student success story and 1 AI tip on Instagram every week.",
      badgeType: "trend",
    },

    // ── 5. COURSE & BATCH INSIGHTS ────────────────────────────────────
    {
      id: "course-batch-distribution",
      category: "Course & Batch Insights",
      title: "📊 Course Enrollment Split",
      insight: `Data Analytics with AI: ${topCourse.count} students. Python: ${secondCourse.count} students. ${topCourse.count - secondCourse.count} more students in Data Analytics than Python.`,
      supportingMetrics: [
        `Data Analytics with AI: ${topCourse.count} students`,
        `Python: ${secondCourse.count} students`,
        `Difference: ${topCourse.count - secondCourse.count} more students in Data Analytics`,
        `Active batches: ${batchEntries.length}`,
      ],
      businessImpact: "Python is underperforming and has room for growth.",
      recommendation: "Promote Python as an add-on for Data Analytics students.",
      badgeType: "action",
    },
    {
      id: "course-batch-sizing",
      category: "Course & Batch Insights",
      title: "🧑‍🏫 Batch Sizes",
      insight: `Largest batch (${largestBatch[0]}): ${largestBatch[1]} students. Smallest (${smallestBatch[0]}): ${smallestBatch[1]} students. Average: ${avgBatchSize} students per batch across ${batchEntries.length} batches.`,
      supportingMetrics: [
        `Largest batch: ${largestBatch[0]} — ${largestBatch[1]} students`,
        `Smallest batch: ${smallestBatch[0]} — ${smallestBatch[1]} students`,
        `Average batch size: ${avgBatchSize} students`,
        `Total batches tracked: ${batchEntries.length}`,
      ],
      businessImpact: "Very small batches are not cost-effective and reduce classroom energy.",
      recommendation: "Set minimum 12 students per batch before it starts.",
      badgeType: "warning",
    },

    // ── 6. STUDENT DECISION FACTORS ───────────────────────────────────
    {
      id: "decision-factors-reasons",
      category: "Student Decision Factors",
      title: "💼 Why Students Chose HACA",
      insight: `#1 reason: "${topReason.reason}" — ${topReason.count} students. #2 reason: "${secondReason.reason}" — ${secondReason.count} students. Only ${feeReasonCount} students joined mainly because of fees.`,
      supportingMetrics: [
        `#1 Reason: "${topReason.reason}" — ${topReason.count} students`,
        `#2 Reason: "${secondReason.reason}" — ${secondReason.count} students`,
        `Joined mainly because of fees: only ${feeReasonCount} students`,
        `Other reasons: ${total - topReason.count - secondReason.count} students`,
      ],
      businessImpact: "Students want job results, not cheap fees — placement data sells HACA better than any discount.",
      recommendation: "Share real placement results and company names on all channels.",
      badgeType: "highlight",
    },
    {
      id: "decision-factors-ai",
      category: "Student Decision Factors",
      title: "🤖 AI in Syllabus — The Top Deciding Factor",
      insight: `${aiCount} out of ${total} students chose HACA specifically because AI is part of the course. Only ${nonAiCount} joined for other reasons.`,
      supportingMetrics: [
        `Chose HACA because of AI in syllabus: ${aiCount} students`,
        `Joined for other reasons: ${nonAiCount} students`,
        `Strongest single deciding factor across all data`,
        `Total students surveyed: ${total}`,
      ],
      businessImpact: "AI is HACA's strongest differentiator — no other institute is matching it yet.",
      recommendation: "Make 'Learn AI' the headline in every ad, poster, and Instagram post.",
      badgeType: "highlight",
    },

    // ── 7. RECOMMENDATIONS ────────────────────────────────────────────
    {
      id: "rec-action-roadmap",
      category: "Recommendations",
      title: "🚀 Top 3 Actions to Grow Now",
      insight: `${total} students enrolled. ${topSource.count} came from Instagram. ${secondSource.count} came from referrals. ${peakMonthEntry[1]} joined in the busiest month (${peakMonthName}).`,
      supportingMetrics: [
        `Total enrolled: ${total} students`,
        `Referral students (friends/family): ${secondSource.count} — grow this, it costs nothing`,
        `Quietest month (${lowMonthName}): only ${lowMonthEntry[1]} students — run an offer here`,
        `Chose HACA for AI: ${aiCount} students — lead with this in all messaging`,
      ],
      businessImpact: "Small, data-backed actions will increase monthly inquiries without a large budget.",
      recommendation: `1️⃣ Referral reward for every student who brings a friend. 2️⃣ Special offer during ${lowMonthName}. 3️⃣ Weekly placement story on Instagram.`,
      badgeType: "action",
    },
  ];
}
