import React, { useState } from "react";
import { 
  Briefcase, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  MapPin, 
  CheckCircle2,
  Sparkles,
  CircleDot
} from "lucide-react";
import { WorkExperience } from "../../types";

interface ExperienceSectionProps {
  experiences: WorkExperience[];
  isLoading: boolean;
}

export function ExperienceSection({ experiences, isLoading }: ExperienceSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-800/80">
      <div className="space-y-2 mb-8">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-widest">
          <Briefcase className="w-4 h-4" />
          <span>Career Journey & Timeline</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          Work Experience
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Track record of engineering roles, software development, and IoT hardware projects.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-6 animate-pulse pl-9 sm:pl-14 border-l-2 border-slate-800">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl h-36"></div>
          ))}
        </div>
      ) : experiences.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl text-slate-400 text-sm">
          No work experiences added yet.
        </div>
      ) : (
        <div className="relative pl-9 sm:pl-14">
          <div className="space-y-6 sm:space-y-8">
            {experiences.map((exp, idx) => {
              const isExpanded = expandedId === exp.id;
              const points = exp.description_points || [];
              const isCurrent = Boolean(exp.is_current);

              return (
                <div key={exp.id} className="relative group">
                  {/* Vertical connecting line to the next item */}
                  {idx !== experiences.length - 1 && (
                    <div className="absolute z-0 left-[-25px] sm:left-[-37px] top-[26px] sm:top-[36px] bottom-[-50px] sm:bottom-[-68px] w-0.5 bg-gradient-to-b from-cyan-500/50 via-slate-700/60 to-slate-800/20" />
                  )}

                  {/* Timeline Activity Node / Marker */}
                  <div className={`absolute z-10 -left-[34px] sm:-left-[48px] top-4 sm:top-6 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCurrent
                      ? "bg-slate-900 border-emerald-500 ring-4 ring-emerald-500/20 shadow-md"
                      : "bg-slate-900 border-slate-700 group-hover:border-cyan-500/60 text-slate-400 group-hover:text-cyan-400 shadow-sm"
                  }`}>
                    {isCurrent ? (
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
                    ) : (
                      <CircleDot className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-slate-400 group-hover:text-cyan-400" />
                    )}
                  </div>

                  {/* Activity Content Card */}
                  <div className="glass-panel glass-panel-hover rounded-2xl p-4 sm:p-6 transition-all border border-slate-800/90 hover:border-slate-700 shadow-sm">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                      {/* Left: Company Logo + Role Title */}
                      <div className="flex items-start gap-3 sm:gap-3.5 min-w-0 flex-1">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center p-2 shrink-0 overflow-hidden shadow-inner">
                          {exp.company_logo ? (
                            <img
                              src={exp.company_logo}
                              alt={exp.company_name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                          ) : (
                            <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                          )}
                        </div>

                        <div className="space-y-1.5 min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-100 tracking-tight leading-snug">
                              {exp.role_title}
                            </h3>
                            {exp.employment_type && (
                              <span className="badge-soft-cyan text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 rounded-full">
                                {exp.employment_type}
                              </span>
                            )}
                            {isCurrent && (
                              <span className="badge-soft-emerald text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 rounded-full flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Current Role
                              </span>
                            )}
                          </div>

                          {/* Metadata (Company, Date, Location) */}
                          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-y-1 sm:gap-x-2.5 text-xs sm:text-sm text-slate-400 pt-0.5">
                            <div className="flex items-center">
                              {exp.company_url ? (
                                <a
                                  href={exp.company_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-cyan-400 hover:underline font-semibold inline-flex items-center gap-1"
                                >
                                  <span>{exp.company_name}</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              ) : (
                                <span className="font-semibold text-slate-200">{exp.company_name}</span>
                              )}
                            </div>

                            <span className="hidden sm:inline text-slate-600">•</span>

                            <div className="flex items-center gap-1.5 text-slate-400">
                              <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                              <span>
                                {exp.start_date} – {isCurrent ? "Present" : exp.end_date}
                              </span>
                            </div>

                            {exp.location && (
                              <>
                                <span className="hidden sm:inline text-slate-600">•</span>
                                <div className="flex items-center gap-1.5 text-slate-400">
                                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                  <span>{exp.location}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right: See More / Details Button */}
                      {points.length > 0 && (
                        <button
                          type="button"
                          onClick={() => toggleExpand(exp.id)}
                          className="w-full sm:w-auto mt-2 sm:mt-0 inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold badge-soft-cyan hover:opacity-90 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all shrink-0 shadow-sm active:scale-[0.98]"
                        >
                          <span>{isExpanded ? "Hide Details" : "View Details"}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Expanded Activity Points / Deliverables */}
                    {isExpanded && points.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-3">
                        <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-cyan-400" />
                          <span>Key Responsibilities & Deliverables:</span>
                        </p>
                        <ul className="space-y-2.5">
                          {points.map((pt, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
