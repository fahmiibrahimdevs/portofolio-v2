import React from "react";
import { Modal } from "../common/Modal";
import { Project } from "../../types";
import { Github, ExternalLink, Tag, Layers } from "lucide-react";
import { formatMarkdownToHtml } from "../../utils/markdown";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  const tags = project.tags || [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={project.title} maxWidth="3xl">
      <div className="space-y-6">
        {/* Banner / Cover */}
        {project.thumbnail_url && (
          <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative">
            <img
              src={project.thumbnail_url}
              alt={project.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            
            {project.category_name && (
              <div className="absolute top-4 left-4">
                <span className="badge-soft-cyan text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
                  {project.category_name}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Title & Metadata */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              {project.title}
            </h2>

            <div className="flex items-center gap-2">
              {project.link_github && (
                <a
                  href={project.link_github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 rounded-xl transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              )}

              {project.link_demo && project.link_demo !== "http://" && (
                <a
                  href={project.link_demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-950/50 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>

          {project.short_desc && project.short_desc !== "-" && (
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.short_desc}
            </p>
          )}

          {/* Tags list */}
          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs text-slate-500 font-medium mr-1 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Tech Stack:
              </span>
              {tags.map((t, idx) => (
                <span
                  key={idx}
                  className="badge-soft-slate text-xs font-medium px-2.5 py-0.5 rounded-lg"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Rich Description / Documentation Body */}
        <div className="pt-4 border-t border-slate-800/80">
          <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>Project Documentation & Specifications</span>
          </h4>

          <div
            className="prose prose-invert rich-content max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatMarkdownToHtml(project.description) }}
          />
        </div>

        {/* Modal Close */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
