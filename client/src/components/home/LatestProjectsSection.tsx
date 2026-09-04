import React from "react";
import { FolderKanban, ArrowRight } from "lucide-react";
import { Project } from "../../types";
import { ProjectCard } from "../projects/ProjectCard";

interface LatestProjectsSectionProps {
  projects: Project[];
  isLoading: boolean;
  onNavigateToProjects: () => void;
  onOpenDetail: (project: Project) => void;
}

export function LatestProjectsSection({
  projects,
  isLoading,
  onNavigateToProjects,
  onOpenDetail,
}: LatestProjectsSectionProps) {
  const latest = projects.slice(0, 4);

  return (
    <section id="projects-preview" className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-800/80">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-widest">
            <FolderKanban className="w-4 h-4" />
            <span>Portfolio Highlights</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            Latest Projects
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Selected fullstack web systems, IoT hardware implementations, and mobile apps.
          </p>
        </div>

        <button
          type="button"
          onClick={onNavigateToProjects}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/40 rounded-xl text-xs font-semibold transition-all self-start sm:self-auto shadow-sm"
        >
          <span>See All Projects ({projects.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 bg-slate-900/60 border border-slate-800 rounded-2xl"></div>
          ))}
        </div>
      ) : latest.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl text-slate-400 text-sm">
          No projects available yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {latest.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>
      )}
    </section>
  );
}
