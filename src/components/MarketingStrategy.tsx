"use client";

import { useState } from "react";
import { EnrollmentData } from "@/lib/types";

interface MarketingStrategyProps {
  data: EnrollmentData[];
}

interface StrategyCardItem {
  id: number;
  title: string;
  description: string;
  badge: string;
  badgeColor: string;
  borderColor: string;
  note?: string;
}

export default function MarketingStrategy({ data }: MarketingStrategyProps) {
  // Hero Section State (Editable!)
  const [heroTitle, setHeroTitle] = useState(
    "Communication Skills as a Syllabus Strength"
  );
  const [heroQuote, setHeroQuote] = useState(
    "Most students who chose the syllabus as their reason for enrolling cited the additional communication skills training as the primary attraction."
  );
  const [heroBadge, setHeroBadge] = useState(
    "Core Syllabus Attraction — #1 Enrollment Driver"
  );
  const [isEditingHero, setIsEditingHero] = useState(false);

  // Cards State
  const [strategyCards, setStrategyCards] = useState<StrategyCardItem[]>([
    {
      id: 1,
      title: "One-on-One Training",
      description:
        "Providing personalized one-on-one learning sessions to attract students by emphasizing individual attention and customized skill development.",
      badge: "Competitor Benchmark",
      badgeColor:
        "bg-accent-primary/15 text-accent-primary border border-accent-primary/30",
      borderColor: "hover:border-accent-primary/50",
      note: "Added because another institute in the market is actively providing this offering.",
    },
    {
      id: 2,
      title: "Minimal Placement Design",
      description:
        "Using clean colors, simple layouts, and less text to make placement information look more professional and trustworthy.",
      badge: "Visual Aesthetics",
      badgeColor:
        "bg-accent-pink/15 text-accent-pink border border-accent-pink/30",
      borderColor: "hover:border-accent-pink/50",
    },
    {
      id: 3,
      title: "Post-Placement Video Reviews",
      description:
        "Sharing video reviews from placed students to build trust and highlight successful career outcomes.",
      badge: "Video Social Proof",
      badgeColor:
        "bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30",
      borderColor: "hover:border-accent-cyan/50",
    },
    {
      id: 4,
      title: "Offline Visibility Through Posters",
      description:
        "Competitors strategically place eye-catching posters in high-footfall locations such as railway stations, bus stands, and busy junctions. Clear headlines, a phone number, and a QR code help capture inquiries from people who are not actively searching online.",
      badge: "Guerrilla Marketing",
      badgeColor:
        "bg-accent-emerald/15 text-accent-emerald border border-accent-emerald/30",
      borderColor: "hover:border-accent-emerald/50",
    },
    {
      id: 5,
      title: "Visual Appeal",
      description:
        "Content featuring attractive and expressive people may capture attention more quickly, potentially increasing engagement on Instagram.",
      badge: "Instagram Engagement",
      badgeColor: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
      borderColor: "hover:border-amber-500/50",
    },
    {
      id: 6,
      title: "Targeted Pain-Point Marketing",
      description:
        "Content addressing specific student concerns such as academic backlogs, career uncertainty, or lack of direction—can resonate strongly by presenting the course as a pathway to employable skills and career readiness.",
      badge: "High-Converting Copy",
      badgeColor:
        "bg-accent-primary/15 text-accent-primary border border-accent-primary/30",
      borderColor: "hover:border-accent-primary/50",
    },
  ]);

  // Add Card State
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newBadge, setNewBadge] = useState("Growth Strategy");
  const [newNote, setNewNote] = useState("");

  // Edit Card State
  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editBadge, setEditBadge] = useState("");
  const [editNote, setEditNote] = useState("");

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newCard: StrategyCardItem = {
      id: Date.now(),
      title: newTitle.trim(),
      description:
        newDescription.trim() ||
        "Strategic initiative aimed at expanding enrollment reach and conversion.",
      badge: newBadge.trim(),
      badgeColor:
        "bg-accent-primary/15 text-accent-primary border border-accent-primary/30",
      borderColor: "hover:border-accent-primary/50",
      note: newNote.trim() ? newNote.trim() : undefined,
    };

    setStrategyCards([...strategyCards, newCard]);
    setNewTitle("");
    setNewDescription("");
    setNewNote("");
    setIsAdding(false);
  };

  const handleStartEdit = (card: StrategyCardItem) => {
    setEditingCardId(card.id);
    setEditTitle(card.title);
    setEditDescription(card.description);
    setEditBadge(card.badge);
    setEditNote(card.note || "");
  };

  const handleSaveEdit = (id: number) => {
    setStrategyCards((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              title: editTitle.trim() || c.title,
              description: editDescription.trim() || c.description,
              badge: editBadge.trim() || c.badge,
              note: editNote.trim() ? editNote.trim() : undefined,
            }
          : c
      )
    );
    setEditingCardId(null);
  };

  const handleDeleteCard = (id: number) => {
    setStrategyCards((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-10 fade-in-up" id="marketing-strategy-section">
      {/* ─── HERO HIGHLIGHT: SYLLABUS & COMMUNICATION SKILLS ─── */}
      <div className="relative overflow-hidden rounded-3xl border border-accent-primary/40 bg-gradient-to-br from-surface via-surface/90 to-accent-primary/10 p-6 sm:p-10 shadow-2xl">
        {/* Subtle decorative glow */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-primary/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-accent-pink/15 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Top toolbar for editing Hero */}
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-primary/30 bg-accent-primary/15 px-4 py-1.5 text-xs font-bold text-accent-primary">
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
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              {heroBadge}
            </div>

            <button
              onClick={() => setIsEditingHero(!isEditingHero)}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-surface/80 px-3 py-1.5 text-xs font-semibold text-text-primary hover:border-accent-primary transition-all"
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
              {isEditingHero ? "Close Editor" : "Edit Hero Banner"}
            </button>
          </div>

          {/* If Editing Hero Banner */}
          {isEditingHero ? (
            <div className="space-y-4 rounded-2xl border border-accent-primary/30 bg-surface/90 p-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-text-secondary">
                  Badge Label
                </label>
                <input
                  type="text"
                  value={heroBadge}
                  onChange={(e) => setHeroBadge(e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-text-primary focus:border-accent-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-text-secondary">
                  Hero Heading
                </label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-bold text-text-primary focus:border-accent-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-text-secondary">
                  Quote / Highlight Text
                </label>
                <textarea
                  rows={2}
                  value={heroQuote}
                  onChange={(e) => setHeroQuote(e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-text-primary focus:border-accent-primary focus:outline-none"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsEditingHero(false)}
                  className="rounded-lg bg-accent-primary px-4 py-1.5 text-xs font-bold text-white shadow hover:bg-accent-primary-hover"
                >
                  Save Hero Banner
                </button>
              </div>
            </div>
          ) : (
            /* Normal Hero Display */
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
                  {heroTitle}
                </h3>

                <blockquote className="border-l-4 border-accent-primary pl-4 text-base sm:text-lg italic text-text-secondary leading-relaxed">
                  &ldquo;{heroQuote}&rdquo;
                </blockquote>
              </div>

              <div className="flex shrink-0 flex-col items-start md:items-end gap-2">
                <span className="rounded-2xl border border-border bg-surface/80 px-5 py-3 text-sm font-bold text-text-primary shadow-sm">
                  ✨ Key Competitive Advantage
                </span>
                <p className="text-xs text-text-muted">
                  Validated by live student feedback data
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── STRATEGY CARDS HEADER & ADD BUTTON ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <h3 className="text-xl font-bold text-text-primary">
            Strategic Marketing Initiatives & Market Tactics
          </h3>
          <p className="text-sm text-text-muted">
            Actionable strategies designed to elevate HACA&apos;s brand trust, reach, and student conversions — anyone can add, edit, or remove cards
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
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
          {isAdding ? "Cancel" : "Add Marketing Strategy Card"}
        </button>
      </div>

      {/* ─── ADD STRATEGY CARD MODAL/FORM ─── */}
      {isAdding && (
        <form
          onSubmit={handleAddCard}
          className="glass-card-static p-6 border border-accent-primary/40 bg-accent-primary/5 space-y-4 rounded-2xl fade-in-up shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <h4 className="font-bold text-text-primary text-base">
              Create New Marketing Strategy Card
            </h4>
            <span className="text-xs text-text-muted">
              Add your own initiative or observed market tactic
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
                placeholder="e.g. Free Campus Coding Bootcamps"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-text-secondary">
                Badge / Category Label
              </label>
              <input
                type="text"
                placeholder="e.g. Community Outreach"
                value={newBadge}
                onChange={(e) => setNewBadge(e.target.value)}
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-text-secondary">
              Description / Action Plan
            </label>
            <textarea
              rows={3}
              placeholder="Explain how this strategy works and why it drives student admissions..."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-text-secondary">
              Optional Note (e.g. Competitor benchmark or context)
            </label>
            <input
              type="text"
              placeholder="e.g. Added because another institute is providing it..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-primary focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="rounded-lg px-4 py-2 text-xs font-semibold text-text-muted hover:text-text-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-accent-primary px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-accent-primary-hover"
            >
              Save Card
            </button>
          </div>
        </form>
      )}

      {/* ─── STRATEGY CARDS GRID WITH EDIT & DELETE CONTROLS ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {strategyCards.map((card) => {
          const isEditing = editingCardId === card.id;

          return (
            <div
              key={card.id}
              className={`glass-card-static flex flex-col justify-between rounded-2xl border border-border/60 bg-surface shadow-xl p-6 transition-all duration-300 ${card.borderColor} hover:shadow-2xl`}
            >
              {isEditing ? (
                /* ─── IN-PLACE EDITING FORM ─── */
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-border/40 pb-2">
                    <span className="text-xs font-bold text-accent-primary">
                      Editing Card
                    </span>
                    <button
                      onClick={() => setEditingCardId(null)}
                      className="text-xs text-text-muted hover:text-text-primary"
                    >
                      Cancel
                    </button>
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-text-muted">
                      Badge Label
                    </label>
                    <input
                      type="text"
                      value={editBadge}
                      onChange={(e) => setEditBadge(e.target.value)}
                      className="w-full rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-text-primary focus:border-accent-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-text-muted">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full rounded-md border border-border bg-surface px-2.5 py-1 text-sm font-bold text-text-primary focus:border-accent-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-text-muted">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-text-primary focus:border-accent-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-text-muted">
                      Optional Note
                    </label>
                    <input
                      type="text"
                      value={editNote}
                      onChange={(e) => setEditNote(e.target.value)}
                      className="w-full rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-text-primary focus:border-accent-primary focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handleSaveEdit(card.id)}
                      className="rounded-lg bg-accent-primary px-3 py-1 text-xs font-bold text-white hover:bg-accent-primary-hover shadow"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                /* ─── NORMAL CARD VIEW WITH EDIT & REMOVE BUTTONS ─── */
                <>
                  <div className="space-y-4">
                    {/* Top Row: Badge & Action Toolbar */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold ${card.badgeColor}`}
                      >
                        {card.badge}
                      </span>

                      {/* Edit & Remove Toolbar */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleStartEdit(card)}
                          title="Edit Card"
                          className="rounded-lg border border-border/60 bg-surface-hover/80 p-1.5 text-text-muted hover:text-accent-primary hover:border-accent-primary/40 transition-colors"
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
                          onClick={() => handleDeleteCard(card.id)}
                          title="Remove Card"
                          className="rounded-lg border border-border/60 bg-surface-hover/80 p-1.5 text-text-muted hover:text-red-400 hover:border-red-400/40 transition-colors"
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

                    {/* Title */}
                    <h4 className="text-lg font-bold text-text-primary">
                      {card.title}
                    </h4>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Optional Note / Footer */}
                  {card.note && (
                    <div className="mt-6 rounded-xl border border-accent-primary/20 bg-accent-primary/5 p-3">
                      <p className="text-[11px] font-medium text-text-secondary leading-snug">
                        💡 <strong className="text-accent-primary">Note:</strong>{" "}
                        {card.note}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
