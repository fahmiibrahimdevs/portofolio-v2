import React from "react";
import { Github, ExternalLink, ArrowRight, Layers, Tag } from "lucide-react";
import { Project } from "../../types";
import { stripMarkdown } from "../../utils/markdown";

interface ProjectCardProps {
  project: Project;
  onOpenDetail: (project: Project) => void;
}

export function ProjectCard({ project, onOpenDetail }: ProjectCardProps) {
  const tags = project.tags || [];

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col justify-between transition-all group border border-slate-800/90 hover:border-cyan-500/40">
      {/* Thumbnail Header */}
      <div 
        onClick={() => onOpenDetail(project)}
        className="relative w-full h-48 sm:h-52 bg-slate-950 overflow-hidden cursor-pointer"
      >
        {project.thumbnail_url ? (
          <img
            src={project.thumbnail_url}
            alt={project.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600">
            <Layers className="w-10 h-10" />
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

        {/* Category Badge */}
        {project.category_name && (
          <div className="absolute top-3 left-3">
            <span className="badge-overlay-cyan text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
              {project.category_name}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <h3 
            onClick={() => onOpenDetail(project)}
            className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1 cursor-pointer"
          >
            {project.title}
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
            {stripMarkdown(project.short_desc) && stripMarkdown(project.short_desc) !== "-"
              ? stripMarkdown(project.short_desc)
              : "Explore full project architecture, schematics, and implementation details."}
          </p>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1 flex-wrap">
            {tags.slice(0, 3).map((t, idx) => (
              <span
                key={idx}
                className="badge-soft-slate text-[10px] font-semibold px-2 py-0.5 rounded-md"
              >
                {t}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-[10px] font-medium text-slate-400 self-center">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            {project.link_github && (
              <a
                href={project.link_github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-cyan-400 bg-slate-900 border border-slate-800 rounded-lg transition-colors"
                title="View Source on GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}

            {project.link_demo && project.link_demo !== "http://" && (
              <a
                href={project.link_demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-cyan-400 bg-slate-900 border border-slate-800 rounded-lg transition-colors"
                title="Live Demo"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => onOpenDetail(project)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:underline py-1 px-2"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
