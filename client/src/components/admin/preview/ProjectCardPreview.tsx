import React from "react";
import { Project } from "../../../types";
import { ProjectCard } from "../../projects/ProjectCard";
import { 
  Eye, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles
} from "lucide-react";

interface ProjectCardPreviewProps {
  project: Project;
  selectedTagCount: number;
  onSwitchToTechStack?: () => void;
  onClosePanel?: () => void;
}

export function ProjectCardPreview({
  project,
  selectedTagCount,
  onSwitchToTechStack,
  onClosePanel,
}: ProjectCardPreviewProps) {
  const hasThumbnail = Boolean(project.thumbnail_url || project.thumbnail);
  const titleLength = (project.title || "").length;
  const descLength = (project.short_desc || "").length;

  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-900 text-slate-100 overflow-hidden">
      {/* Panel Sub-Header / Status Bar */}
      <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/40 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Sync Active</span>
          </div>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">1:1 Scale</span>
        </div>

        {project.status_publish === "Published" ? (
          <span className="badge-overlay-emerald text-[10px] font-bold px-2 py-0.5 rounded-md">
            Published Card
          </span>
        ) : (
          <span className="badge-overlay-amber text-[10px] font-bold px-2 py-0.5 rounded-md">
            Draft Card
          </span>
        )}
      </div>

      {/* Scrollable Preview Stage & Inspector */}
      <div className="p-4 overflow-y-auto space-y-4 flex-1 min-h-0 overscroll-contain">
        {/* Preview Frame */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium px-1">
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-sky-400" />
              <span>Public Card Appearance</span>
            </span>
            <span className="text-[10px] text-slate-500">As shown on homepage & projects</span>
          </div>

          <div className="p-3 bg-slate-950/90 rounded-2xl border border-slate-800/80 shadow-inner">
            <div className="pointer-events-none select-none">
              <ProjectCard
                project={project}
                onOpenDetail={() => {}}
              />
            </div>
          </div>
        </div>

        {/* Quick Tech Stack Action Banner */}
        {onSwitchToTechStack && (
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">
                  Tech Stack Attached
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  {selectedTagCount} teknologi dipilih
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onSwitchToTechStack}
              className="px-3 py-1.5 bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-400 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>Kelola</span>
              <span className="font-mono text-[10px]">→</span>
            </button>
          </div>
        )}

        {/* Card Anatomy Inspector */}
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Card Anatomy Checklist</span>
          </div>

          <div className="space-y-2 text-xs">
            {/* Title Check */}
            <div className="flex items-center justify-between text-slate-400 py-0.5">
              <span className="flex items-center gap-1.5">
                {titleLength > 5 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                )}
                <span>Judul Project</span>
              </span>
              <span className="font-mono text-[11px] text-slate-400">
                {titleLength} chars {titleLength > 60 && "(panjang)"}
              </span>
            </div>

            {/* Thumbnail Check */}
            <div className="flex items-center justify-between text-slate-400 py-0.5">
              <span className="flex items-center gap-1.5">
                {hasThumbnail ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                )}
                <span>Thumbnail 16:9</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {hasThumbnail ? "Uploaded" : "Placeholder Icon"}
              </span>
            </div>

            {/* Short Desc Check */}
            <div className="flex items-center justify-between text-slate-400 py-0.5">
              <span className="flex items-center gap-1.5">
                {descLength > 20 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                )}
                <span>Short Excerpt</span>
              </span>
              <span className="font-mono text-[11px] text-slate-400">
                {descLength} chars
              </span>
            </div>

            {/* Links Check */}
            <div className="flex items-center justify-between text-slate-400 py-0.5">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>External Links</span>
              </span>
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <span className={project.link_github ? "text-emerald-400" : "text-slate-600"}>
                  GH: {project.link_github ? "✓" : "—"}
                </span>
                <span className={project.link_demo && project.link_demo !== "http://" ? "text-emerald-400" : "text-slate-600"}>
                  Demo: {project.link_demo && project.link_demo !== "http://" ? "✓" : "—"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
