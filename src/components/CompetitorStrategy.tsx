"use client";

import { useState } from "react";
import { CompetitorRank } from "@/lib/types";

interface CompetitorStrategyProps {
  data: CompetitorRank[];
}

interface StrategyInsight {
  title: string;
  description: string;
  badgeClass: string;
}

interface CompetitorStrategyItem {
  id: number;
  title: string;
  tagline: string;
  badgeText: string;
  badgeColor: string;
  image?: string;
  insights: StrategyInsight[];
}

export default function CompetitorStrategy({ data }: CompetitorStrategyProps) {
  const [strategies, setStrategies] = useState<CompetitorStrategyItem[]>([
    {
      id: 1,
      title: "Competitor Strategy #1: Visual Overwhelm & Logo Dropping",
      tagline:
        "Actual promotional brochure analysis used to manipulate student enrollments by displaying excessive logos.",
      badgeText: "Manipulative Tactic",
      badgeColor:
        "bg-accent-pink/15 text-accent-pink border border-accent-pink/30",
      image: "/competitor_strategy_image.png",
      insights: [
        {
          title: "Illusion of Competence",
          description:
            "Overloading the brochure with 40+ tool logos creates a false impression. It manipulates students into believing they will master all of them, which is practically impossible in a short course timeframe.",
          badgeClass: "text-accent-pink border-accent-pink/40 bg-accent-pink/10",
        },
        {
          title: "False Affiliation (Logo Dropping)",
          description:
            "Displaying logos of massive tech giants under 'Dream Companies' implies guaranteed placements or direct partnerships, exploiting the students' aspirations without offering real guarantees.",
          badgeClass: "text-accent-cyan border-accent-cyan/40 bg-accent-cyan/10",
        },
        {
          title: "Quantity over Quality",
          description:
            "The strategy relies on visual overwhelm rather than detailing actual curriculum depth. It sells the 'idea' of tech rather than a structured path to a career.",
          badgeClass:
            "text-accent-emerald border-accent-emerald/40 bg-accent-emerald/10",
        },
      ],
    },
    {
      id: 2,
      title:
        "Competitor Strategy #2: Aesthetic Instagram Placement Feed (Zoople Technologies)",
      tagline:
        "An elegant, eye-catching 'SUCCESSFULLY PLACED' Instagram grid showing student photos, course names, and hiring companies to engineer powerful visual social proof.",
      badgeText: "Visual Social Proof",
      badgeColor:
        "bg-accent-primary/15 text-accent-primary border border-accent-primary/30",
      image: "/competitor_instagram_placements.jpg",
      insights: [
        {
          title: "Elegant & Eye-Catching Placement Grid",
          description:
            "Every placement post follows a polished, uniform pink/orange gradient card template with student photos and clear typography. This visual consistency makes their feed look premium, professional, and trustworthy.",
          badgeClass: "text-accent-pink border-accent-pink/40 bg-accent-pink/10",
        },
        {
          title: "Relentless Social Proof & FOMO",
          description:
            "Publishing dozens of 'Successfully Placed' posts in succession creates an overwhelming impression of continuous job success, tapping into student FOMO (Fear Of Missing Out) and career aspirations.",
          badgeClass:
            "text-accent-primary border-accent-primary/40 bg-accent-primary/10",
        },
        {
          title: "Strategic Role & Brand Association",
          description:
            "Each card highlights popular courses (Flutter, Data Science, MERN Stack, Digital Marketing, Business Analytics) alongside employer names (Europortals, Veloris Global, Invedus) to substantiate real-world career transitions.",
          badgeClass: "text-accent-cyan border-accent-cyan/40 bg-accent-cyan/10",
        },
        {
          title: "Seamless Lead Conversion Funnel",
          description:
            "Placement cards are strategically intercut with 'Free Offline Workshop' and 'New Batch - Calicut / Kochi' promotional banners, instantly directing inspired visitors into active enrollment pipelines.",
          badgeClass:
            "text-accent-emerald border-accent-emerald/40 bg-accent-emerald/10",
        },
      ],
    },
  ]);

  // Companies state for Section 2
  const [companies, setCompanies] = useState<string[]>([
    "Google",
    "Microsoft",
    "Amazon",
    "TCS",
    "Infosys",
    "Wipro",
    "Cognizant",
  ]);
  const [isAddingCompany, setIsAddingCompany] = useState(false);
  const [newCompany, setNewCompany] = useState("");

  // Modal / Add Strategy state
  const [isAddingStrategy, setIsAddingStrategy] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTagline, setNewTagline] = useState("");
  const [newBadgeText, setNewBadgeText] = useState("Manipulative Tactic");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newInsightTitle1, setNewInsightTitle1] = useState("");
  const [newInsightDesc1, setNewInsightDesc1] = useState("");
  const [newInsightTitle2, setNewInsightTitle2] = useState("");
  const [newInsightDesc2, setNewInsightDesc2] = useState("");

  // Edit Strategy state
  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editTagline, setEditTagline] = useState("");
  const [editBadgeText, setEditBadgeText] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editInsights, setEditInsights] = useState<StrategyInsight[]>([]);

  const handleAddStrategy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const insights: StrategyInsight[] = [];
    if (newInsightTitle1.trim()) {
      insights.push({
        title: newInsightTitle1.trim(),
        description:
          newInsightDesc1.trim() ||
          "Identified pattern used to manipulate student expectations.",
        badgeClass: "text-accent-pink border-accent-pink/40 bg-accent-pink/10",
      });
    }
    if (newInsightTitle2.trim()) {
      insights.push({
        title: newInsightTitle2.trim(),
        description:
          newInsightDesc2.trim() ||
          "Further tactical breakdown of this marketing approach.",
        badgeClass: "text-accent-cyan border-accent-cyan/40 bg-accent-cyan/10",
      });
    }

    if (insights.length === 0) {
      insights.push({
        title: "Tactical Observation",
        description:
          newTagline.trim() ||
          "Competitor tactic identified in market analysis.",
        badgeClass:
          "text-accent-primary border-accent-primary/40 bg-accent-primary/10",
      });
    }

    const newObj: CompetitorStrategyItem = {
      id: Date.now(),
      title: newTitle.trim(),
      tagline:
        newTagline.trim() ||
        "Observed competitor marketing strategy in student enrollment campaigns.",
      badgeText: newBadgeText,
      badgeColor:
        "bg-accent-primary/15 text-accent-primary border border-accent-primary/30",
      image: newImageUrl.trim() ? newImageUrl.trim() : undefined,
      insights,
    };

    setStrategies([newObj, ...strategies]);
    setNewTitle("");
    setNewTagline("");
    setNewImageUrl("");
    setNewInsightTitle1("");
    setNewInsightDesc1("");
    setNewInsightTitle2("");
    setNewInsightDesc2("");
    setIsAddingStrategy(false);
  };

  const handleStartEdit = (card: CompetitorStrategyItem) => {
    setEditingCardId(card.id);
    setEditTitle(card.title);
    setEditTagline(card.tagline);
    setEditBadgeText(card.badgeText);
    setEditImageUrl(card.image || "");
    setEditInsights([...card.insights]);
  };

  const handleSaveEdit = (id: number) => {
    setStrategies((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              title: editTitle.trim() || s.title,
              tagline: editTagline.trim() || s.tagline,
              badgeText: editBadgeText.trim() || s.badgeText,
              image: editImageUrl.trim() ? editImageUrl.trim() : undefined,
              insights: editInsights,
            }
          : s
      )
    );
    setEditingCardId(null);
  };

  const handleDeleteStrategy = (id: number) => {
    setStrategies((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCompany.trim() && !companies.includes(newCompany.trim())) {
      setCompanies([...companies, newCompany.trim()]);
      setNewCompany("");
      setIsAddingCompany(false);
    }
  };

  const handleRemoveCompany = (companyToRemove: string) => {
    setCompanies(companies.filter((c) => c !== companyToRemove));
  };

  return (
    <div className="space-y-10 fade-in-up" id="competitor-strategy">
      {/* HEADER SECTION & ADD STRATEGY ACTION */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-border/40 pb-6">
        <div>
          <h3 className="text-xl font-bold text-text-primary">
            Unified Competitor Strategy Analysis
          </h3>
          <p className="text-sm text-text-muted">
            Each card combines visual brochure evidence and deep tactical insights — anyone can add, edit, or remove strategies
          </p>
        </div>

        <button
          onClick={() => setIsAddingStrategy(!isAddingStrategy)}
          className="self-start sm:self-center flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-primary to-accent-primary-hover px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-accent-primary/25 transition-all hover:opacity-95"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {isAddingStrategy ? "Cancel" : "Add Competitor Strategy Card"}
        </button>
      </div>

      {/* ADD STRATEGY MODAL/FORM */}
      {isAddingStrategy && (
        <form
          onSubmit={handleAddStrategy}
          className="glass-card-static p-6 border border-accent-primary/40 bg-accent-primary/5 space-y-4 rounded-2xl fade-in-up shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <h4 className="font-bold text-text-primary text-base">
              Create New Competitor Strategy Card
            </h4>
            <span className="text-xs text-text-muted">
              Add brochure photo + deep insights together
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold text-text-secondary">
                Strategy Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Competitor Strategy #3: Fake Job Portal Partnerships"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-text-secondary">
                Tactic Badge Label
              </label>
              <select
                value={newBadgeText}
                onChange={(e) => setNewBadgeText(e.target.value)}
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-accent-primary focus:outline-none"
              >
                <option value="Manipulative Tactic">Manipulative Tactic</option>
                <option value="Bait & Switch">Bait & Switch</option>
                <option value="False Social Proof">False Social Proof</option>
                <option value="Visual Social Proof">Visual Social Proof</option>
                <option value="Marketing Gimmick">Marketing Gimmick</option>
                <option value="High Risk">High Risk</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-text-secondary">
                Tagline / Subtitle
              </label>
              <input
                type="text"
                placeholder="Brief description of how this tactic is executed..."
                value={newTagline}
                onChange={(e) => setNewTagline(e.target.value)}
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-text-secondary">
                Image / Evidence Photo URL (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. /competitor_strategy_image.png or image URL"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-primary focus:outline-none"
              />
            </div>
          </div>

          {/* INSIGHTS SUB-SECTION */}
          <div className="border-t border-border/40 pt-4 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
              Deep Insights Included in This Card
            </h5>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border/50 bg-surface/50 p-3.5 space-y-2">
                <input
                  type="text"
                  placeholder="Insight #1 Title (e.g. Illusion of Partnership)"
                  value={newInsightTitle1}
                  onChange={(e) => setNewInsightTitle1(e.target.value)}
                  className="w-full rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs font-semibold text-text-primary focus:border-accent-primary focus:outline-none"
                />
                <textarea
                  rows={2}
                  placeholder="Explain why this insight matters..."
                  value={newInsightDesc1}
                  onChange={(e) => setNewInsightDesc1(e.target.value)}
                  className="w-full rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs text-text-primary focus:border-accent-primary focus:outline-none"
                />
              </div>

              <div className="rounded-xl border border-border/50 bg-surface/50 p-3.5 space-y-2">
                <input
                  type="text"
                  placeholder="Insight #2 Title (Optional)"
                  value={newInsightTitle2}
                  onChange={(e) => setNewInsightTitle2(e.target.value)}
                  className="w-full rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs font-semibold text-text-primary focus:border-accent-primary focus:outline-none"
                />
                <textarea
                  rows={2}
                  placeholder="Second tactical observation..."
                  value={newInsightDesc2}
                  onChange={(e) => setNewInsightDesc2(e.target.value)}
                  className="w-full rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs text-text-primary focus:border-accent-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingStrategy(false)}
              className="rounded-lg px-4 py-2 text-xs font-semibold text-text-muted hover:text-text-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-accent-primary px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-accent-primary-hover"
            >
              Save Strategy Card
            </button>
          </div>
        </form>
      )}

      {/* LIST OF UNIFIED COMPETITOR STRATEGY CARDS WITH EDIT/DELETE CONTROLS */}
      <div className="space-y-8">
        {strategies.map((strategy) => {
          const isEditing = editingCardId === strategy.id;

          return (
            <div
              key={strategy.id}
              className="glass-card-static overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-xl p-5 sm:p-7 transition-all duration-300 hover:border-accent-primary/40"
            >
              {isEditing ? (
                /* ─── IN-PLACE EDITING FORM ─── */
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border/40 pb-3">
                    <h4 className="font-bold text-accent-primary text-base">
                      Editing Competitor Strategy Card
                    </h4>
                    <button
                      onClick={() => setEditingCardId(null)}
                      className="text-xs text-text-muted hover:text-text-primary"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-text-muted mb-1 block">
                        Title
                      </label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-bold text-text-primary focus:border-accent-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-text-muted mb-1 block">
                        Badge Text
                      </label>
                      <input
                        type="text"
                        value={editBadgeText}
                        onChange={(e) => setEditBadgeText(e.target.value)}
                        className="w-full rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-text-primary focus:border-accent-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-text-muted mb-1 block">
                        Tagline / Subtitle
                      </label>
                      <input
                        type="text"
                        value={editTagline}
                        onChange={(e) => setEditTagline(e.target.value)}
                        className="w-full rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-text-primary focus:border-accent-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-text-muted mb-1 block">
                        Image / Evidence URL
                      </label>
                      <input
                        type="text"
                        value={editImageUrl}
                        onChange={(e) => setEditImageUrl(e.target.value)}
                        className="w-full rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-text-primary focus:border-accent-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setEditingCardId(null)}
                      className="rounded-lg px-4 py-1.5 text-xs font-semibold text-text-muted hover:text-text-primary"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveEdit(strategy.id)}
                      className="rounded-lg bg-accent-primary px-4 py-1.5 text-xs font-bold text-white hover:bg-accent-primary-hover shadow"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                /* ─── NORMAL CARD VIEW WITH TOOLBAR ─── */
                <>
                  {/* CARD HEADER */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-5 mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-text-primary">
                        {strategy.title}
                      </h3>
                      <p className="mt-1 text-sm text-text-muted">
                        {strategy.tagline}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <span
                        className={`rounded-full px-3.5 py-1 text-xs font-semibold shrink-0 ${strategy.badgeColor}`}
                      >
                        {strategy.badgeText}
                      </span>

                      {/* Edit & Remove Controls */}
                      <button
                        onClick={() => handleStartEdit(strategy)}
                        title="Edit Competitor Strategy"
                        className="rounded-lg border border-border/60 bg-surface-hover/80 p-2 text-text-muted hover:text-accent-primary hover:border-accent-primary/40 transition-colors"
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
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>

                      <button
                        onClick={() => handleDeleteStrategy(strategy.id)}
                        title="Remove Competitor Strategy"
                        className="rounded-lg border border-border/60 bg-surface-hover/80 p-2 text-text-muted hover:text-red-400 hover:border-red-400/40 transition-colors"
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
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* CARD BODY: IMAGE + INSIGHTS IN ONE UNIFIED CARD */}
                  {strategy.image ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                      {/* Photo / Evidence Container */}
                      <div className="lg:col-span-7 flex flex-col">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
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
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <polyline points="21 15 16 10 5 21" />
                            </svg>
                            Brochure / Promotional Evidence
                          </span>
                          <span className="text-[11px] font-medium text-accent-primary">
                            Hover to zoom
                          </span>
                        </div>

                        <div
                          className={
                            strategy.id === 1
                              ? "relative flex-1 w-full overflow-hidden rounded-xl bg-white min-h-[360px] flex items-center justify-center border border-border/40 shadow-inner"
                              : "relative flex-1 w-full overflow-hidden rounded-xl bg-slate-950/90 min-h-[440px] flex items-center justify-center border border-border/40 shadow-inner p-3"
                          }
                        >
                          <img
                            src={strategy.image}
                            alt={strategy.title}
                            className={
                              strategy.id === 1
                                ? "absolute w-[200%] sm:w-[160%] md:w-[140%] max-w-none transform object-center transition-transform duration-700 hover:scale-105"
                                : "w-full max-h-[500px] object-contain rounded-lg transition-transform duration-500 hover:scale-105"
                            }
                          />
                        </div>
                      </div>

                      {/* Deep Insights Container inside the same card */}
                      <div className="lg:col-span-5 flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-primary/10">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                className="text-accent-primary"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4" />
                                <path d="M12 8h.01" />
                              </svg>
                            </div>
                            <h4 className="text-base font-bold text-text-primary">
                              Deep Insights from This Tactic
                            </h4>
                          </div>

                          <div className="space-y-3.5">
                            {strategy.insights.map((insight, idx) => (
                              <div
                                key={idx}
                                className="group rounded-xl border border-border/50 bg-surface-hover/30 p-4 transition-colors hover:bg-surface-hover/60"
                              >
                                <h5 className="font-semibold text-sm mb-1 text-accent-pink">
                                  {insight.title}
                                </h5>
                                <p className="text-xs text-text-muted leading-relaxed">
                                  {insight.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 rounded-lg bg-accent-primary/10 border border-accent-primary/20 p-3">
                          <p className="text-[11px] font-medium text-text-secondary">
                            💡 <strong className="text-accent-primary">HACA Counter-Strategy:</strong>{" "}
                            {strategy.id === 2
                              ? "Emulate this aesthetic visual social proof! Design our own uniform, eye-catching 'HACA Success' Instagram placement cards with real student portfolio links and verified role metrics."
                              : "Emphasize transparent syllabi, real student builds, and verifiable industry mentors."}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* If no photo is attached, show Insights in a wide grid across the card */
                    <div>
                      <div className="mb-4 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-primary/10">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            className="text-accent-primary"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                          </svg>
                        </div>
                        <h4 className="text-base font-bold text-text-primary">
                          Tactical Insights & Analysis
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {strategy.insights.map((insight, idx) => (
                          <div
                            key={idx}
                            className="rounded-xl border border-border/50 bg-surface-hover/30 p-4 transition-colors hover:bg-surface-hover/60"
                          >
                            <h5 className="font-semibold text-sm mb-1 text-accent-cyan">
                              {insight.title}
                            </h5>
                            <p className="text-xs text-text-muted leading-relaxed">
                              {insight.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* SECTION 2: CLAIMED "DREAM COMPANIES" TRACKER */}
      <div className="pt-4 border-t border-border/40 pb-10">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-text-primary">
              Claimed &quot;Dream Companies&quot; Tracker
            </h3>
            <p className="text-sm text-text-muted">
              Log tech brands competitors falsely claim direct placement partnerships with — click × to remove
            </p>
          </div>

          <button
            onClick={() => setIsAddingCompany(!isAddingCompany)}
            className="self-start sm:self-center flex items-center gap-1.5 rounded-full border border-border bg-surface-hover px-4 py-1.5 text-xs font-semibold text-text-primary hover:border-accent-primary transition-all"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            {isAddingCompany ? "Close" : "Add Company"}
          </button>
        </div>

        {isAddingCompany && (
          <form
            onSubmit={handleAddCompany}
            className="mb-6 flex items-center gap-2 max-w-sm"
          >
            <input
              type="text"
              required
              placeholder="Company name (e.g. Meta)"
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
              className="flex-1 rounded-full border border-border bg-surface px-4 py-1.5 text-xs text-text-primary focus:border-accent-primary focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-accent-primary px-4 py-1.5 text-xs font-bold text-white hover:bg-accent-primary-hover"
            >
              Add
            </button>
          </form>
        )}

        <div className="flex flex-wrap gap-3">
          {companies.map((comp, i) => (
            <div
              key={i}
              className="group flex items-center gap-2 rounded-full border border-border/60 bg-surface-hover/80 pl-4 pr-3 py-2 shadow-sm hover:border-accent-primary/40 transition-colors"
            >
              <span className="h-2 w-2 rounded-full bg-accent-primary" />
              <span className="text-sm font-semibold text-text-primary">
                {comp}
              </span>
              <button
                onClick={() => handleRemoveCompany(comp)}
                title={`Remove ${comp}`}
                className="ml-1 rounded-full p-0.5 text-text-muted hover:bg-red-500/20 hover:text-red-400 transition-colors"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
