import {
  EnrollmentData,
  KPIData,
  CourseDistribution,
  DistrictDistribution,
  GenderDistribution,
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
    if (filters.course !== "All" && d.course !== filters.course) return false;
    if (filters.district !== "All" && d.district !== filters.district)
      return false;
    if (
      filters.currentStatus !== "All" &&
      d.currentStatus !== filters.currentStatus
    )
      return false;
    if (filters.batch !== "All" && d.batchName !== filters.batch) return false;
    if (filters.month !== "All" || filters.year !== "All") {
      if (!d.enrollmentDate) return false;
      const parts = d.enrollmentDate.split("/");
      if (parts.length === 3) {
        if (filters.month !== "All") {
          const monthNum = parseInt(parts[1], 10).toString();
          if (monthNum !== filters.month) return false;
        }
        if (filters.year !== "All") {
          // year might have time attached, e.g. "2025 14:30:00"
          const yearStr = parts[2].trim().split(" ")[0];
          if (yearStr !== filters.year) return false;
        }
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
    const course = d.course || "Unknown";
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
    let gender = d.gender || "Unknown";
    // clean up simple variants
    if (gender.toLowerCase().startsWith("m")) gender = "Male";
    else if (gender.toLowerCase().startsWith("f")) gender = "Female";
    
    counts[gender] = (counts[gender] || 0) + 1;
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
