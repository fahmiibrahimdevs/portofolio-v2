import React, { useMemo } from "react";
import { Article } from "../../../types";
import { ArticleCard } from "../../articles/ArticleCard";
import { 
  Eye, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Calendar,
  Sparkles
} from "lucide-react";

interface ArticleCardPreviewProps {
  article: Article;
  rawContent?: string;
}

export function ArticleCardPreview({
  article,
  rawContent = "",
}: ArticleCardPreviewProps) {
  const hasThumbnail = Boolean(article.thumbnail_url || article.thumbnail);
  const titleLength = (article.title || "").length;
  const descLength = (article.description || "").length;

  const estimatedReadingTime = useMemo(() => {
    const textToEstimate = rawContent || article.fill_content || article.description || "";
    if (!textToEstimate) return 1;
    const cleanText = textToEstimate.replace(/<[^>]*>/g, " ").replace(/[#*`~\[\]()_-]/g, " ");
    const words = cleanText.trim().split(/\s+/).filter(Boolean);
    return Math.max(1, Math.ceil(words.length / 200));
  }, [rawContent, article.fill_content, article.description]);

  // Merge dynamic read time into article preview object
  const previewArticle: Article = {
    ...article,
    read_time_minutes: estimatedReadingTime,
  };

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

        {article.status_publish === "Published" ? (
          <span className="badge-overlay-emerald text-[10px] font-bold px-2 py-0.5 rounded-md">
            Published Article
          </span>
        ) : (
          <span className="badge-overlay-amber text-[10px] font-bold px-2 py-0.5 rounded-md">
            Draft Article
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
            <span className="text-[10px] text-slate-500">As shown in articles library</span>
          </div>

          <div className="p-3 bg-slate-950/90 rounded-2xl border border-slate-800/80 shadow-inner">
            <div className="pointer-events-none select-none">
              <ArticleCard
                article={previewArticle}
                onRead={() => {}}
              />
            </div>
          </div>
        </div>

        {/* Quick Reading Metrics Banner */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">
                Estimated Reading Time
              </p>
              <p className="text-[11px] text-slate-400 font-mono">
                ~{estimatedReadingTime} min read (~200 wpm)
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-mono">
              Auto-calculated
            </span>
          </div>
        </div>

        {/* Card Anatomy Inspector */}
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Article Card Checklist</span>
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
                <span>Judul Artikel</span>
              </span>
              <span className="font-mono text-[11px] text-slate-400">
                {titleLength} chars {titleLength > 70 && "(panjang)"}
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

            {/* Category Badges Check */}
            <div className="flex items-center justify-between text-slate-400 py-0.5">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Categories</span>
              </span>
              <div className="flex items-center gap-1 text-[11px]">
                <span className="text-sky-400 font-medium">
                  {article.category_name || "Category"}
                </span>
                {article.sub_category_name && (
                  <>
                    <span className="text-slate-600">•</span>
                    <span className="text-emerald-400 font-medium">
                      {article.sub_category_name}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Excerpt Check */}
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
          </div>
        </div>
      </div>
    </div>
  );
}
