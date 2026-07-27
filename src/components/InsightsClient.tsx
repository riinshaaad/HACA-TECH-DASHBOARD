"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { EnrollmentData, InsightCategory, ComprehensiveInsight } from "@/lib/types";
import { generateComprehensiveInsights } from "@/lib/analytics";
import ComprehensiveInsightCard from "./ComprehensiveInsightCard";

interface InsightsClientProps {
  data: EnrollmentData[];
}

const CATEGORIES: ("All Categories" | InsightCategory)[] = [
  "All Categories",
  "Executive Summary",
  "Enrollment Insights",
  "Student Demographics",
  "Marketing & Lead Source Insights",
  "Course & Batch Insights",
  "Student Decision Factors",
  "Recommendations",
];

const CATEGORY_OPTIONS: InsightCategory[] = [
  "Executive Summary",
  "Enrollment Insights",
  "Student Demographics",
  "Marketing & Lead Source Insights",
  "Course & Batch Insights",
  "Student Decision Factors",
  "Recommendations",
];

const EMPTY_INSIGHT: Omit<ComprehensiveInsight, "id"> = {
  category: "Executive Summary",
  title: "",
  insight: "",
  supportingMetrics: ["", "", ""],
  businessImpact: "",
  recommendation: "",
  badgeType: "highlight",
};

export default function InsightsClient({ data }: InsightsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<"All Categories" | InsightCategory>("All Categories");
  const [editMode, setEditMode] = useState(false);

  // Local mutable insights state — starts from auto-generated, stays editable
  const baseInsights = useMemo(() => generateComprehensiveInsights(data), [data]);
  const [localInsights, setLocalInsights] = useState<ComprehensiveInsight[]>(baseInsights);

  // Sync when base data changes (new sheet data)
  useEffect(() => {
    setLocalInsights(baseInsights);
  }, [baseInsights]);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInsight, setEditingInsight] = useState<ComprehensiveInsight | null>(null);
  const [form, setForm] = useState<Omit<ComprehensiveInsight, "id">>(EMPTY_INSIGHT);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredInsights = useMemo(() => {
    if (selectedCategory === "All Categories") return localInsights;
    return localInsights.filter((i) => i.category === selectedCategory);
  }, [localInsights, selectedCategory]);

  const categoriesToRender = useMemo(() => {
    if (selectedCategory === "All Categories") {
      return CATEGORY_OPTIONS.filter((cat) =>
        localInsights.some((i) => i.category === cat)
      );
    }
    return [selectedCategory as InsightCategory];
  }, [selectedCategory, localInsights]);

  // ── Open modal for Add ──────────────────────────────────────────────
  const openAdd = () => {
    setEditingInsight(null);
    setForm({ ...EMPTY_INSIGHT, supportingMetrics: ["", "", ""] });
    setModalOpen(true);
  };

  // ── Open modal for Edit ─────────────────────────────────────────────
  const openEdit = (insight: ComprehensiveInsight) => {
    setEditingInsight(insight);
    setForm({
      category: insight.category,
      title: insight.title,
      insight: insight.insight,
      supportingMetrics: [...insight.supportingMetrics, "", ""].slice(0, Math.max(insight.supportingMetrics.length, 3)),
      businessImpact: insight.businessImpact,
      recommendation: insight.recommendation,
      badgeType: insight.badgeType,
    });
    setModalOpen(true);
  };

  // ── Save (Add or Edit) ─────────────────────────────────────────────
  const handleSave = () => {
    const cleanMetrics = form.supportingMetrics.filter((m) => m.trim() !== "");
    if (!form.title.trim() || !form.insight.trim()) return;

    if (editingInsight) {
      setLocalInsights((prev) =>
        prev.map((i) =>
          i.id === editingInsight.id
            ? { ...i, ...form, supportingMetrics: cleanMetrics }
            : i
        )
      );
    } else {
      const newInsight: ComprehensiveInsight = {
        id: `custom-${Date.now()}`,
        ...form,
        supportingMetrics: cleanMetrics,
      };
      setLocalInsights((prev) => [...prev, newInsight]);
    }
    setModalOpen(false);
  };

  // ── Delete ─────────────────────────────────────────────────────────
  const handleDelete = (id: string) => {
    setLocalInsights((prev) => prev.filter((i) => i.id !== id));
    setDeleteConfirmId(null);
  };

  // ── Metric field helpers ───────────────────────────────────────────
  const updateMetric = (idx: number, val: string) => {
    setForm((prev) => {
      const updated = [...prev.supportingMetrics];
      updated[idx] = val;
      return { ...prev, supportingMetrics: updated };
    });
  };
  const addMetricField = () => {
    setForm((prev) => ({ ...prev, supportingMetrics: [...prev.supportingMetrics, ""] }));
  };
  const removeMetricField = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      supportingMetrics: prev.supportingMetrics.filter((_, i) => i !== idx),
    }));
  };

  // ── Word Export ────────────────────────────────────────────────────
  const handleExportWord = () => {
    let htmlContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:w="urn:schemas-microsoft-com:office:word"
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <title>HACA Tech School — Insights Report</title>
        <style>
          body { font-family: Arial, sans-serif; color: #1e293b; line-height: 1.6; padding: 20px; }
          h1 { color: #5B40D9; font-size: 22pt; border-bottom: 2px solid #5B40D9; padding-bottom: 8px; }
          h2 { color: #334155; font-size: 14pt; margin-top: 24px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; }
          .card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 16px; }
          .title { font-size: 13pt; font-weight: bold; color: #0f172a; margin-bottom: 8px; }
          .section-label { font-size: 9pt; font-weight: bold; color: #4338ca; text-transform: uppercase; margin-bottom: 3px; }
          .metrics-box { background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 12px; border-radius: 6px; margin: 8px 0; }
          .metrics-box ul { margin: 0; padding-left: 18px; }
          .metrics-box li { font-size: 10pt; color: #334155; margin-bottom: 3px; }
          .impact-label { font-size: 9pt; font-weight: bold; color: #b45309; text-transform: uppercase; margin-bottom: 3px; }
          .rec-box { background-color: #eff6ff; border: 1px solid #bfdbfe; padding: 10px; border-radius: 6px; margin-top: 10px; }
          .rec-label { font-size: 9pt; font-weight: bold; color: #1d4ed8; text-transform: uppercase; margin-bottom: 3px; }
        </style>
      </head>
      <body>
        <h1>HACA TECH SCHOOL — INSIGHTS REPORT</h1>
        <p style="color:#64748b; font-size:10pt;">Auto-generated from ${data.length} student records.</p>
    `;
    CATEGORY_OPTIONS.forEach((cat) => {
      const items = localInsights.filter((i) => i.category === cat);
      if (!items.length) return;
      htmlContent += `<h2>${cat}</h2>`;
      items.forEach((item) => {
        htmlContent += `
          <div class="card">
            <div class="title">${item.title}</div>
            <div class="section-label">INSIGHT</div>
            <p style="margin-top:0; font-size:10.5pt;">${item.insight}</p>
            <div class="metrics-box">
              <div style="font-weight:bold; font-size:9pt; margin-bottom:5px;">SUPPORTING METRICS</div>
              <ul>${item.supportingMetrics.map((m) => `<li>${m}</li>`).join("")}</ul>
            </div>
            <div class="impact-label">IMPACT</div>
            <p style="margin-top:0; font-size:10pt;">${item.businessImpact}</p>
            <div class="rec-box">
              <div class="rec-label">RECOMMENDATION</div>
              <p style="margin:0; font-size:10.5pt; font-weight:600;">${item.recommendation}</p>
            </div>
          </div>`;
      });
    });
    htmlContent += `</body></html>`;
    const blob = new Blob(["\ufeff", htmlContent], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "HACA_Insights_Report.doc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const inputCls = "w-full rounded-lg border border-border bg-surface-hover px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30 transition-colors";
  const labelCls = "mb-1 block text-xs font-semibold text-text-secondary uppercase tracking-wider";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

      {/* ── Top Bar ──────────────────────────────────────────────────── */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6 print:hidden">
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-xl bg-surface-elevated px-4 py-2 text-xs font-semibold text-text-primary transition-colors hover:bg-surface-hover border border-border"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </Link>

          {/* Edit Mode Toggle */}
          <button
            onClick={() => setEditMode((v) => !v)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all border ${
              editMode
                ? "bg-accent-primary text-white border-accent-primary shadow-md shadow-accent-primary/25"
                : "bg-surface-elevated text-text-primary border-border hover:border-accent-primary/40"
            }`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            {editMode ? "Done Editing" : "Edit Insights"}
          </button>

          {editMode && (
            <button
              onClick={openAdd}
              className="flex items-center gap-2 rounded-xl bg-accent-emerald px-4 py-2 text-xs font-bold text-white border border-accent-emerald/50 shadow-md shadow-accent-emerald/20 transition-all hover:opacity-90"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Insight
            </button>
          )}

          <div className="hidden sm:flex items-center gap-2 rounded-full bg-accent-primary/10 px-3 py-1.5 text-xs font-semibold text-accent-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-primary" />
            </span>
            {localInsights.length} insights
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-xl bg-surface-elevated px-4 py-2.5 text-xs font-semibold text-text-primary border border-border hover:border-accent-primary/50 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-primary">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            PDF
          </button>
          <button
            onClick={handleExportWord}
            className="flex items-center gap-2 rounded-xl bg-accent-primary px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-accent-primary/20 hover:opacity-90 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Word
          </button>
        </div>
      </div>

      {/* ── Page Title ───────────────────────────────────────────────── */}
      <div className="mb-6">
        <h1 className="mb-1 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl print:text-black">
          Data-Driven Insights
        </h1>
        <p className="text-sm text-text-secondary print:text-gray-700">
          Auto-generated from <strong>{data.length}</strong> student records.
          {editMode && <span className="ml-2 text-accent-primary font-semibold">✏️ Edit mode active — use the buttons on each card to edit or remove.</span>}
        </p>
      </div>

      {/* ── Category Filter Tabs ─────────────────────────────────────── */}
      <div className="mb-8 flex flex-wrap gap-2 border-b border-border pb-4 print:hidden">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? "bg-accent-primary text-white shadow-md shadow-accent-primary/25"
                : "bg-surface-elevated text-text-secondary hover:bg-surface-hover hover:text-text-primary border border-border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Insight Categories ───────────────────────────────────────── */}
      <div className="space-y-10">
        {categoriesToRender.map((categoryName) => {
          const categoryInsights = filteredInsights.filter((i) => i.category === categoryName);
          if (!categoryInsights.length) return null;

          return (
            <div key={categoryName} className="space-y-4">
              <div className="flex items-center gap-3 border-b border-border pb-2 print:border-gray-300">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-primary/15 text-accent-primary">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                </span>
                <h2 className="text-xl font-bold tracking-tight text-text-primary print:text-black">{categoryName}</h2>
                <span className="ml-auto rounded-full bg-surface-elevated px-2.5 py-0.5 text-xs font-medium text-text-muted border border-border">
                  {categoryInsights.length} {categoryInsights.length === 1 ? "Insight" : "Insights"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {categoryInsights.map((item) => (
                  <div key={item.id} className="relative group">
                    <ComprehensiveInsightCard insight={item} />

                    {/* Edit / Remove overlay buttons — visible in edit mode */}
                    {editMode && (
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity print:hidden z-10">
                        <button
                          onClick={() => openEdit(item)}
                          className="flex items-center gap-1 rounded-lg bg-surface-elevated/90 backdrop-blur-sm px-2.5 py-1.5 text-xs font-semibold text-accent-primary border border-accent-primary/30 hover:bg-accent-primary hover:text-white transition-all shadow-sm"
                          title="Edit insight"
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          Edit
                        </button>
                        {deleteConfirmId === item.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="rounded-lg bg-red-500 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-red-600 transition-all shadow-sm"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="rounded-lg bg-surface-elevated px-2 py-1.5 text-xs font-semibold text-text-secondary border border-border hover:bg-surface-hover transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(item.id)}
                            className="flex items-center gap-1 rounded-lg bg-surface-elevated/90 backdrop-blur-sm px-2.5 py-1.5 text-xs font-semibold text-red-400 border border-red-400/30 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            title="Remove insight"
                          >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                              <path d="M10 11v6" /><path d="M14 11v6" />
                              <path d="M9 6V4h6v2" />
                            </svg>
                            Remove
                          </button>
                        )}
                      </div>
                    )}

                    {/* Always-visible small edit/delete buttons in edit mode */}
                    {editMode && (
                      <div className="mt-1 flex items-center justify-end gap-2 px-1 print:hidden">
                        <button
                          onClick={() => openEdit(item)}
                          className="text-xs text-accent-primary/60 hover:text-accent-primary transition-colors underline underline-offset-2"
                        >
                          Edit
                        </button>
                        <span className="text-text-muted text-xs">·</span>
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="text-xs text-red-400/60 hover:text-red-400 transition-colors underline underline-offset-2"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {/* Add inline button inside each category in edit mode */}
                {editMode && (
                  <button
                    onClick={() => {
                      setForm({ ...EMPTY_INSIGHT, category: categoryName as InsightCategory, supportingMetrics: ["", "", ""] });
                      setEditingInsight(null);
                      setModalOpen(true);
                    }}
                    className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-accent-primary/30 bg-accent-primary/5 p-10 text-accent-primary/60 hover:border-accent-primary/60 hover:bg-accent-primary/10 hover:text-accent-primary transition-all group"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-primary/10 group-hover:bg-accent-primary/20 transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                    <span className="text-xs font-semibold">Add insight to {categoryName}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <div className="mt-12 rounded-2xl border border-border bg-surface-elevated/50 p-6 text-center text-xs text-text-muted print:mt-6 print:border-gray-200">
        HACA Tech School Live Enrollment Analytics — refreshes every 60 seconds.
      </div>

      {/* ─────────────────────────────────────────────────────────────── */}
      {/* EDIT / ADD MODAL                                               */}
      {/* ─────────────────────────────────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />

          {/* Modal Panel */}
          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-surface shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-primary/15">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7b5cfa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </span>
                <h3 className="text-base font-bold text-text-primary">
                  {editingInsight ? "Edit Insight" : "Add New Insight"}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1.5 text-text-muted hover:bg-surface-hover hover:text-text-primary transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-5 px-6 py-5">
              {/* Category */}
              <div>
                <label className={labelCls}>Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as InsightCategory }))}
                  className={inputCls}
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Badge Type */}
              <div>
                <label className={labelCls}>Badge Type</label>
                <div className="flex flex-wrap gap-2">
                  {(["highlight", "trend", "warning", "action"] as const).map((bt) => (
                    <button
                      key={bt}
                      onClick={() => setForm((p) => ({ ...p, badgeType: bt }))}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize border transition-all ${
                        form.badgeType === bt
                          ? "bg-accent-primary text-white border-accent-primary"
                          : "bg-surface-elevated text-text-secondary border-border hover:border-accent-primary/40"
                      }`}
                    >
                      {bt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className={labelCls}>Title</label>
                <input
                  type="text"
                  placeholder="e.g. 🎯 Total Students & Top Course"
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  className={inputCls}
                />
              </div>

              {/* Insight */}
              <div>
                <label className={labelCls}>Insight (1–2 sentences with key numbers)</label>
                <textarea
                  rows={3}
                  placeholder="e.g. 131 students enrolled. 82% chose Data Analytics with AI."
                  value={form.insight}
                  onChange={(e) => setForm((p) => ({ ...p, insight: e.target.value }))}
                  className={inputCls + " resize-none"}
                />
              </div>

              {/* Supporting Metrics */}
              <div>
                <label className={labelCls}>Supporting Metrics</label>
                <div className="space-y-2">
                  {form.supportingMetrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder={`Metric ${idx + 1} — e.g. Top district: Malappuram (38%)`}
                        value={metric}
                        onChange={(e) => updateMetric(idx, e.target.value)}
                        className={inputCls}
                      />
                      {form.supportingMetrics.length > 1 && (
                        <button
                          onClick={() => removeMetricField(idx)}
                          className="flex-shrink-0 rounded-lg p-1.5 text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Remove metric"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addMetricField}
                    className="flex items-center gap-1.5 text-xs font-semibold text-accent-primary hover:text-accent-primary-hover transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add metric
                  </button>
                </div>
              </div>

              {/* Business Impact */}
              <div>
                <label className={labelCls}>Impact (one line)</label>
                <input
                  type="text"
                  placeholder="e.g. AI courses are the biggest pull factor."
                  value={form.businessImpact}
                  onChange={(e) => setForm((p) => ({ ...p, businessImpact: e.target.value }))}
                  className={inputCls}
                />
              </div>

              {/* Recommendation */}
              <div>
                <label className={labelCls}>Recommendation (one line)</label>
                <input
                  type="text"
                  placeholder="e.g. Lead every ad with 'Learn AI Skills'."
                  value={form.recommendation}
                  onChange={(e) => setForm((p) => ({ ...p, recommendation: e.target.value }))}
                  className={inputCls}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-xl px-5 py-2.5 text-sm font-semibold text-text-secondary hover:bg-surface-hover transition-colors border border-border"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!form.title.trim() || !form.insight.trim()}
                className="rounded-xl bg-accent-primary px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-accent-primary/25 transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {editingInsight ? "Save Changes" : "Add Insight"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
