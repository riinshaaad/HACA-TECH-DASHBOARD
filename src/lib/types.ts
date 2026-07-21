// ─── Enrollment Survey Response Shape ─────────────────────────────────────────
export interface EnrollmentData {
  timestamp: string;
  name: string;
  district: string;
  phoneNumber: string;
  batchName: string;
  gender: string;
  ageGroup: string;
  enrollmentDate: string;
  course: string;
  currentStatus: string;
  educationalBackground: string;
  reasonForChoosingCourse: string;
  howDidYouHear: string;
  reasonForChoosingInstitute: string;
  goalAfterCourse: string;
  reasonForContacting: string;
  comparedWithOtherInstitutes: string; // "Yes" / "No"
  competitorNames: string;
  seenAds: string;
  influencingContent: string;
  choseDueToAI: string; // "Yes" / "No"
  reviewFrequency: string;
  response: string;
  reviewAttender: string;
}

// ─── Computed Analytics ────────────────────────────────────────────
export interface KPIData {
  totalEnrollments: number;
  topCourse: string;
  topDistrict: string;
  topLeadSource: string;
  topMonth: string;
  aiInfluencePercentage: number;
}

export interface CourseDistribution {
  course: string;
  count: number;
  fill: string;
}

export interface DistrictDistribution {
  district: string;
  count: number;
  fill: string;
}

export interface GenderDistribution {
  gender: string;
  count: number;
  fill: string;
}

export interface StatusDistribution {
  status: string;
  count: number;
  fill: string;
}

export interface EducationDistribution {
  background: string;
  count: number;
  fullMark: number;
}

export interface InfluencingContentDistribution {
  content: string;
  count: number;
  fill: string;
}

export interface SeenAdsDistribution {
  answer: string;
  count: number;
  fill: string;
}

export interface AIInfluenceDistribution {
  answer: string;
  count: number;
  fill: string;
}

export interface LeadSourceDistribution {
  source: string;
  count: number;
  fill: string;
}

export interface TrendPoint {
  date: string;
  enrollments: number;
}

export interface CompetitorRank {
  name: string;
  mentions: number;
}

export interface Insight {
  id: string;
  type: "trend" | "anomaly" | "highlight" | "warning";
  title: string;
  description: string;
  value?: string;
  change?: number; // percentage
}

export interface FilterState {
  course: string;
  district: string;
  currentStatus: string;
  month: string;
  batch: string;
  year: string;
}

export interface MonthOption {
  label: string;
  value: string;
}
