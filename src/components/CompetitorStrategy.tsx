"use client";

import { useState } from "react";
import { CompetitorRank } from "@/lib/types";

interface CompetitorStrategyProps {
  data: CompetitorRank[];
}

const colors = [
  { bg: "bg-accent-pink", shadow: "shadow-[0_0_8px_rgba(236,72,153,0.8)]" },
  { bg: "bg-accent-cyan", shadow: "shadow-[0_0_8px_rgba(34,211,238,0.8)]" },
  { bg: "bg-accent-emerald", shadow: "shadow-[0_0_8px_rgba(16,185,129,0.8)]" },
  { bg: "bg-accent-primary", shadow: "shadow-[0_0_8px_rgba(99,102,241,0.8)]" },
];

export default function CompetitorStrategy({ data }: CompetitorStrategyProps) {
  const [strategies, setStrategies] = useState([
    {
      title: "100% Placement Guarantee",
      description: "Promising guaranteed jobs regardless of student performance to drive fast admissions.",
      color: "bg-accent-pink",
      shadow: "shadow-[0_0_8px_rgba(236,72,153,0.8)]"
    },
    {
      title: "Fake Testimonials",
      description: "Using stock photos and fabricated success stories on landing pages to build false trust.",
      color: "bg-accent-cyan",
      shadow: "shadow-[0_0_8px_rgba(34,211,238,0.8)]"
    }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const handleAddStrategy = () => {
    if (!newTitle.trim()) return;
    
    // Pick a color based on current length to cycle through them
    const colorObj = colors[strategies.length % colors.length];
    
    setStrategies([
      ...strategies,
      {
        title: newTitle,
        description: newDesc,
        color: colorObj.bg,
        shadow: colorObj.shadow
      }
    ]);
    
    setNewTitle("");
    setNewDesc("");
    setIsAdding(false);
  };

  return (
    <div className="space-y-10 fade-in-up" id="competitor-strategy">
      
      {/* SECTION 1: Brochure Analysis with Cropped Image */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Brochure Image Container */}
        <div className="lg:col-span-2 glass-card-static overflow-hidden rounded-2xl border border-border/50 bg-surface shadow-xl p-4 sm:p-6 flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-text-primary">Competitor Brochure Analysis</h3>
              <p className="text-sm text-text-muted">Actual promotional material used to manipulate enrollments</p>
            </div>
            <span className="rounded-full bg-accent-pink/10 px-3 py-1 text-xs font-semibold text-accent-pink border border-accent-pink/20">
              Manipulative Tactic
            </span>
          </div>
          
          {/* Container designed to crop the large white borders from the original image */}
          <div className="relative flex-1 w-full overflow-hidden rounded-xl bg-white min-h-[400px] flex items-center justify-center border border-border/30">
            <img 
              src="/competitor_strategy_image.png" 
              alt="Industry Tools and Target Companies"
              className="absolute w-[200%] sm:w-[160%] md:w-[140%] max-w-none transform object-center transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Tactical Breakdown Container */}
        <div className="glass-card-static overflow-hidden rounded-2xl border border-border/50 bg-surface shadow-xl p-4 sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-primary/10">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-accent-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-text-primary">Deep Insights</h3>
          </div>

          <div className="space-y-4">
            <div className="group rounded-xl border border-border/50 bg-surface-hover/30 p-4 transition-colors hover:bg-surface-hover/60">
              <h4 className="font-semibold text-accent-pink text-sm mb-1">Illusion of Competence</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Overloading the brochure with <strong className="text-text-secondary">40+ tool logos</strong> creates a false impression. It manipulates students into believing they will master all of them, which is practically impossible in a short course timeframe.
              </p>
            </div>
            
            <div className="group rounded-xl border border-border/50 bg-surface-hover/30 p-4 transition-colors hover:bg-surface-hover/60">
              <h4 className="font-semibold text-accent-cyan text-sm mb-1">False Affiliation (Logo Dropping)</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Displaying logos of massive tech giants under <strong className="text-text-secondary">"Dream Companies"</strong> implies guaranteed placements or direct partnerships, exploiting the students' aspirations without offering real guarantees.
              </p>
            </div>
            
            <div className="group rounded-xl border border-border/50 bg-surface-hover/30 p-4 transition-colors hover:bg-surface-hover/60">
              <h4 className="font-semibold text-accent-emerald text-sm mb-1">Quantity over Quality</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                The strategy relies on visual overwhelm rather than detailing actual curriculum depth. It sells the <strong className="text-text-secondary">"idea" of tech</strong> rather than a structured path to a career.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 2: Additional Competitor Strategies (with placeholders) */}
      <div className="pt-4 border-t border-border/30">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-text-primary">Additional Strategies Identified</h3>
            <p className="text-sm text-text-muted">Track other manipulation tactics used in the market</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {strategies.map((strategy, idx) => (
            <div key={idx} className="glass-card-static p-5 border border-border/50 rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3"><span className={`flex h-2 w-2 rounded-full ${strategy.color} ${strategy.shadow}`}></span></div>
              <h4 className="font-semibold text-text-primary">{strategy.title}</h4>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">{strategy.description}</p>
            </div>
          ))}
          
          {isAdding ? (
            <div className="glass-card-static p-5 border border-accent-primary/50 rounded-xl relative overflow-hidden group flex flex-col gap-3">
              <input 
                type="text" 
                placeholder="Strategy Title" 
                className="w-full bg-surface-hover/50 border border-border/50 rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-primary/50"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                autoFocus
              />
              <textarea 
                placeholder="Description" 
                className="w-full bg-surface-hover/50 border border-border/50 rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-accent-primary/50 resize-none min-h-[60px]"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
              />
              <div className="flex gap-2 justify-end mt-1">
                <button 
                  onClick={() => {
                    setIsAdding(false);
                    setNewTitle("");
                    setNewDesc("");
                  }} 
                  className="text-xs text-text-muted hover:text-text-primary px-2 py-1 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddStrategy} 
                  className="text-xs bg-accent-primary/10 text-accent-primary hover:bg-accent-primary/20 px-3 py-1 rounded-md transition-colors font-medium"
                  disabled={!newTitle.trim()}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setIsAdding(true)}
              className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/50 bg-surface-hover/10 p-5 text-text-muted hover:border-accent-primary/50 hover:text-accent-primary hover:bg-accent-primary/5 transition-all min-h-[120px] group"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span className="text-sm font-semibold">Add Strategy</span>
            </button>
          )}
        </div>
      </div>

      {/* SECTION 3: Targeted Companies (with placeholders) */}
      <div className="pt-4 border-t border-border/30 pb-10">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-text-primary">Claimed "Dream Companies"</h3>
          <p className="text-sm text-text-muted">Companies competitors falsely claim to place students in</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-full border border-border/50 bg-surface-hover px-5 py-2.5 shadow-sm hover:border-text-muted transition-colors cursor-default">
            <span className="text-sm font-semibold text-text-primary">Google</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border/50 bg-surface-hover px-5 py-2.5 shadow-sm hover:border-text-muted transition-colors cursor-default">
            <span className="text-sm font-semibold text-text-primary">Microsoft</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border/50 bg-surface-hover px-5 py-2.5 shadow-sm hover:border-text-muted transition-colors cursor-default">
            <span className="text-sm font-semibold text-text-primary">Amazon</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border/50 bg-surface-hover px-5 py-2.5 shadow-sm hover:border-text-muted transition-colors cursor-default">
            <span className="text-sm font-semibold text-text-primary">TCS</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border/50 bg-surface-hover px-5 py-2.5 shadow-sm hover:border-text-muted transition-colors cursor-default">
            <span className="text-sm font-semibold text-text-primary">Infosys</span>
          </div>
          
          {/* Add Company Placeholders */}
          <button className="flex items-center gap-2 rounded-full border-2 border-dashed border-border/80 bg-transparent px-5 py-2.5 text-text-muted hover:border-accent-primary/50 hover:text-accent-primary hover:bg-accent-primary/5 transition-all group">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <span className="text-sm font-medium">Add Company</span>
          </button>
          
          <button className="flex items-center gap-2 rounded-full border-2 border-dashed border-border/80 bg-transparent px-5 py-2.5 text-text-muted hover:border-accent-primary/50 hover:text-accent-primary hover:bg-accent-primary/5 transition-all group">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <span className="text-sm font-medium">Add Company</span>
          </button>
        </div>
      </div>
      
    </div>
  );
}
