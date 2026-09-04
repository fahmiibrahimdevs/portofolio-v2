import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import { Project } from "../types";
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Tag, 
  Layers, 
  FolderKanban, 
  Sparkles,
  ArrowRight,
  Share2
} from "lucide-react";
import { formatMarkdownToHtml } from "../utils/markdown";

interface ProjectDetailPageProps {
  identifier: string; // id or slug
  cachedProject?: Project | null;
  onBack: () => void;
  allProjects?: Project[];
  onSelectProject?: (p: Project) => void;
}

export function ProjectDetailPage({
  identifier,
  cachedProject,
  onBack,
  allProjects = [],
  onSelectProject,
}: ProjectDetailPageProps) {
  // Query project details (uses cached data if available)
  const { data, isLoading, error } = useQuery({
    queryKey: ["project-detail", identifier],
    queryFn: () => api.getProject(identifier),
    initialData: cachedProject ? { project: cachedProject } : undefined,
    enabled: Boolean(identifier),
  });

  const project = data?.project || cachedProject;

  // Scroll to top on mount / identifier change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [identifier]);

  if (isLoading && !project) {
    return (
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 animate-pulse">
        <div className="h-8 w-48 bg-slate-900 rounded-xl" />
        <div className="h-80 w-full bg-slate-900 rounded-3xl" />
        <div className="space-y-4">
          <div className="h-10 w-3/4 bg-slate-900 rounded-xl" />
          <div className="h-5 w-1/2 bg-slate-900 rounded-xl" />
        </div>
        <div className="h-96 w-full bg-slate-900 rounded-3xl" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <FolderKanban className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-100">Project Not Found</h2>
          <p className="text-sm text-slate-400">
            The project with identifier "{identifier}" was not found or has been removed.
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-950/50 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects Showcase</span>
          </button>
        </div>
      </div>
    );
  }

  const tags = project.tags || [];
  const otherProjects = allProjects.filter((p) => String(p.id) !== String(project.id)).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.short_desc || project.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Project link copied to clipboard!");
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-slate-700 transition-all text-xs font-semibold shadow-sm group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-cyan-400" />
          <span>Back to Projects Showcase</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-colors"
            title="Share this project"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Banner / Thumbnail */}
      {project.thumbnail_url && (
        <div className="w-full max-h-[460px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800/90 relative shadow-2xl">
          <img
            src={project.thumbnail_url}
            alt={project.title}
            className="w-full h-full max-h-[460px] object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80" />

          {/* Badges Floating on Hero */}
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
            {project.category_name && (
              <span className="badge-overlay-cyan text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                {project.category_name}
              </span>
            )}
            {project.version && (
              <span className="bg-slate-950/85 backdrop-blur-md text-slate-300 border border-slate-700/80 text-xs font-mono px-3 py-1 rounded-full shadow-lg">
                v{project.version}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Title & Metadata Section */}
      <div className="space-y-4 pb-6 border-b border-slate-800/90">
        {!project.thumbnail_url && project.category_name && (
          <div className="flex items-center gap-2">
            <span className="badge-soft-cyan text-xs font-bold px-3 py-1 rounded-full">
              {project.category_name}
            </span>
            {project.version && (
              <span className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full">
                v{project.version}
              </span>
            )}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
          {project.title}
        </h1>

        {project.short_desc && project.short_desc !== "-" && (
          <div
            className="prose prose-invert rich-content max-w-3xl text-slate-300 text-sm sm:text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatMarkdownToHtml(project.short_desc) }}
          />
        )}

        {/* Action Buttons & Tech Stack Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          {/* Tech stack */}
          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-cyan-400" /> Tech:
              </span>
              {tags.map((t, idx) => (
                <span
                  key={idx}
                  className="badge-soft-slate text-xs font-medium px-3 py-1 rounded-xl"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* External Links */}
          <div className="flex items-center gap-2.5 shrink-0">
            {project.link_github && (
              <a
                href={project.link_github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 rounded-xl transition-all shadow-sm"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}

            {project.link_demo && project.link_demo !== "http://" && (
              <a
                href={project.link_demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-950/50 transition-all hover:scale-[1.02]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo Preview</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Documentation & Specifications Body */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Full Documentation & Specifications</span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
          <div
            className="prose prose-invert rich-content max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: formatMarkdownToHtml(project.description || "Project documentation has not been added yet."),
            }}
          />
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="pt-6 border-t border-slate-800/90 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition-colors text-xs font-semibold group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-cyan-400" />
          <span>Back to All Projects</span>
        </button>

        {/* Live demo button duplicate for easy access after reading */}
        {project.link_demo && project.link_demo !== "http://" && (
          <a
            href={project.link_demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-950/50 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Visit Live Demo ↗</span>
          </a>
        )}
      </div>

      {/* Other Projects Recommendation (if available) */}
      {otherProjects.length > 0 && onSelectProject && (
        <div className="pt-10 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Explore Other Projects</span>
            </h3>
            <button
              type="button"
              onClick={onBack}
              className="text-xs font-semibold text-cyan-400 hover:underline inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectProject(p)}
                className="group p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="badge-soft-cyan text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    {p.category_name || "Project"}
                  </span>
                  {p.version && (
                    <span className="text-[10px] font-mono text-slate-500">v{p.version}</span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {p.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {p.short_desc || "Explore full project architecture and documentation."}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
