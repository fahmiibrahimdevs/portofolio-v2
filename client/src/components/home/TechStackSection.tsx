import React from "react";
import { Cpu, Layers, Sparkles } from "lucide-react";
import { TechCategory } from "../../types";

interface TechStackSectionProps {
  categories: TechCategory[];
  isLoading: boolean;
}

export function TechStackSection({ categories, isLoading }: TechStackSectionProps) {
  return (
    <section id="technology" className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-800/80">
      <div className="space-y-2 mb-5">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-widest">
          <Cpu className="w-4 h-4" />
          <span>Skills & Tooling</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          Technology Stack
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Core programming languages, frameworks, embedded microcontrollers, databases, and development tools.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl h-48"></div>
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl text-slate-400 text-sm">
          No technologies added yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const skills = cat.skills || [];

            return (
              <div
                key={cat.id}
                className="glass-panel rounded-2xl p-5 space-y-4 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
                    <h3 className="text-sm font-semibold text-slate-200 tracking-wide flex items-center gap-2">
                      <Layers className="w-4 h-4 text-cyan-400/80" />
                      <span>{cat.name}</span>
                    </h3>
                    <span className="badge-soft-slate text-[10px] font-medium px-2 py-0.5 rounded-full">
                      {skills.length} {skills.length === 1 ? "item" : "items"}
                    </span>
                  </div>

                  {skills.length === 0 ? (
                    <p className="text-xs text-slate-500 py-3 text-center">
                      No skills in this category yet.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-2.5">
                      {skills.map((skill) => (
                        <div
                          key={skill.id}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center p-1 shrink-0 overflow-hidden group-hover:border-cyan-500/40">
                            {skill.icon_url ? (
                              <img
                                src={skill.icon_url}
                                alt={skill.name}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = "none";
                                }}
                              />
                            ) : (
                              <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                            )}
                          </div>
                          <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-400 truncate">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
