import React, { useState } from "react";
import { 
  GraduationCap, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  ExternalLink, 
  Users, 
  FlaskConical, 
  FolderKanban, 
  Award,
  Sparkles
} from "lucide-react";
import { UniversityAchievement } from "../../types";

interface UniversitySectionProps {
  achievements: UniversityAchievement[];
  isLoading: boolean;
}

export function UniversitySection({ achievements, isLoading }: UniversitySectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(achievements[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="education" className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-800/80">
      <div className="space-y-2 mb-5">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-widest">
          <GraduationCap className="w-4 h-4" />
          <span>Academic & Research</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          University Achievements & Education
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Academic milestones, lecturer-led research, student organizations, and campus engineering projects.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-6 animate-pulse pl-9 sm:pl-14 border-l-2 border-slate-800">
          {[1, 2].map((i) => (
            <div key={i} className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl h-44"></div>
          ))}
        </div>
      ) : achievements.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl text-slate-400 text-sm">
          No university achievements added yet.
        </div>
      ) : (
        <div className="relative pl-9 sm:pl-14">
          <div className="space-y-6 sm:space-y-8">
            {achievements.map((ach, idx) => {
              const isExpanded = expandedId === ach.id;
              const orgs = ach.organizational_involvement || [];
              const research = ach.research_experience || [];
              const projects = ach.key_projects || [];
              const skillsGained = ach.skills_gained || [];

              return (
                <div key={ach.id} className="relative group">
                  {/* Vertical connecting line to the next item */}
                  {idx !== achievements.length - 1 && (
                    <div className="absolute z-0 left-[-25px] sm:left-[-37px] top-[26px] sm:top-[36px] bottom-[-50px] sm:bottom-[-68px] w-0.5 bg-gradient-to-b from-indigo-500/50 via-slate-700/60 to-slate-800/20" />
                  )}

                  {/* Timeline Activity Node / Marker */}
                  <div className="absolute z-10 -left-[34px] sm:-left-[48px] top-4 sm:top-6 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-2 bg-slate-900 border-indigo-500/80 ring-4 ring-indigo-500/15 shadow-sm text-indigo-400">
                    <GraduationCap className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-indigo-400" />
                  </div>

                  <div className="glass-panel glass-panel-hover rounded-2xl p-4 sm:p-6 transition-all border border-slate-800/90 hover:border-slate-700 shadow-sm">
                {/* Header item */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                  <div className="flex items-start gap-3.5 sm:gap-4 min-w-0 flex-1">
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center p-2 shrink-0 overflow-hidden shadow-inner">
                      {ach.institution_logo ? (
                        <img
                          src={ach.institution_logo}
                          alt={ach.institution_name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <GraduationCap className="w-5 h-5 sm:w-7 sm:h-7 text-slate-500" />
                      )}
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-100 tracking-tight leading-snug">
                        {ach.institution_name}
                      </h3>
                      <p className="text-xs sm:text-sm lg:text-base font-medium text-slate-300">
                        {ach.degree}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 pt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{ach.period}</span>
                      </div>
                    </div>
                  </div>

                  {/* Toggle button */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(ach.id)}
                    className="w-full sm:w-auto mt-2 sm:mt-0 inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold badge-soft-indigo hover:opacity-90 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all shrink-0 shadow-sm active:scale-[0.98]"
                  >
                    <span>{isExpanded ? "Hide Details" : "View Highlights"}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    )}
                  </button>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-6 sm:space-y-7">
                    {/* 1. Organizational Involvement */}
                    {orgs.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-cyan-400 uppercase tracking-wider">
                          <Users className="w-4 h-4" />
                          <span>Organizational Involvement</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {orgs.map((org, idx) => (
                            <div
                              key={idx}
                              className="p-3.5 sm:p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs sm:text-sm font-bold text-slate-100">
                                  {org.name}
                                </span>
                                {org.link && (
                                  <a
                                    href={org.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-400 hover:text-cyan-300 shrink-0"
                                    title="Open link"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                )}
                              </div>
                              {org.role && (
                                <p className="text-xs sm:text-[13px] text-cyan-300 font-semibold">{org.role}</p>
                              )}
                              {org.description && (
                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-0.5">{org.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 2. Research Experience */}
                    {research.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wider">
                          <FlaskConical className="w-4 h-4" />
                          <span>Research Experience</span>
                        </div>
                        <div className="space-y-3.5">
                          {research.map((res, idx) => (
                            <div
                              key={idx}
                              className="p-4 sm:p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2"
                            >
                              <h4 className="text-sm sm:text-base font-bold text-slate-100">
                                {res.title}
                              </h4>
                              {res.supervisor && (
                                <p className="text-xs sm:text-sm text-slate-400">
                                  Supervised by{" "}
                                  {res.supervisor_link ? (
                                    <a
                                      href={res.supervisor_link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-amber-400 hover:underline font-semibold inline-flex items-center gap-1"
                                    >
                                      <span>{res.supervisor}</span>
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                  ) : (
                                    <span className="text-amber-300 font-semibold">{res.supervisor}</span>
                                  )}
                                </p>
                              )}
                              {res.description && (
                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                                  {res.description}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 3. Key Projects */}
                    {projects.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-400 uppercase tracking-wider">
                          <FolderKanban className="w-4 h-4" />
                          <span>Key Projects</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {projects.map((cat, idx) => (
                            <div
                              key={idx}
                              className="p-4 sm:p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3"
                            >
                              <p className="text-xs sm:text-sm font-bold text-emerald-400 uppercase tracking-wider">
                                {cat.category}
                              </p>
                              <ul className="space-y-3">
                                {cat.items.map((item, itemIdx) => (
                                  <li key={itemIdx} className="text-xs sm:text-sm text-slate-300">
                                    <div className="flex items-start gap-2">
                                      <span className="text-emerald-400 mt-1 shrink-0 font-bold">•</span>
                                      <div>
                                        {item.url ? (
                                          <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-cyan-400 hover:underline font-semibold inline-flex items-center gap-1"
                                          >
                                            <span>{item.title}</span>
                                            <ExternalLink className="w-3.5 h-3.5" />
                                          </a>
                                        ) : (
                                          <span className="font-semibold text-slate-100">
                                            {item.title}
                                          </span>
                                        )}
                                        {item.description && (
                                          <p className="text-xs sm:text-[13px] text-slate-400 mt-0.5 leading-relaxed">
                                            {item.description}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 4. Skills Gained */}
                    {skillsGained.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-indigo-400 uppercase tracking-wider">
                          <Sparkles className="w-4 h-4" />
                          <span>Skills Gained</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                          {skillsGained.map((sg, idx) => (
                            <div
                              key={idx}
                              className="p-3.5 sm:p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2.5"
                            >
                              <p className="text-xs sm:text-sm font-bold text-slate-100">{sg.title}</p>
                              <div className="flex flex-wrap gap-1.5">
                                {sg.items.map((it, itIdx) => (
                                  <span
                                    key={itIdx}
                                    className="badge-soft-slate text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-lg"
                                  >
                                    {it}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
