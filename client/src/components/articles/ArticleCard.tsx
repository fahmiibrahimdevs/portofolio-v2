import React from "react";
import { Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";
import { Article } from "../../types";
import { stripMarkdown } from "../../utils/markdown";

interface ArticleCardProps {
  article: Article;
  onRead: (article: Article) => void;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const cleanDate = dateStr.split(" ")[0].split("T")[0];
  try {
    const parts = cleanDate.split("-");
    if (parts.length === 3) {
      const year = parts[0];
      const monthIndex = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      if (monthIndex >= 0 && monthIndex < 12 && !isNaN(day)) {
        return `${day} ${months[monthIndex]} ${year}`;
      }
    }
  } catch (e) {}
  return cleanDate;
}

export function ArticleCard({ article, onRead }: ArticleCardProps) {
  const formattedDate = formatDate(article.date);

  return (
    <div
      onClick={() => onRead(article)}
      className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col justify-between transition-all group cursor-pointer border border-slate-800/90 hover:border-cyan-500/40"
    >
      {/* Thumbnail */}
      <div className="relative w-full h-44 sm:h-48 bg-slate-950 overflow-hidden">
        {article.thumbnail_url ? (
          <img
            src={article.thumbnail_url}
            alt={article.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600">
            <BookOpen className="w-10 h-10" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          {article.category_name && (
            <span className="badge-overlay-cyan text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
              {article.category_name}
            </span>
          )}
          {article.sub_category_name && (
            <span className="badge-overlay-emerald text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
              {article.sub_category_name}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
            {stripMarkdown(article.description) || "Read full technical article and tutorial guide."}
          </p>
        </div>

        {/* Footer Meta (Clean Single-Line, No Wrapping) */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[11px] text-slate-400 mt-auto whitespace-nowrap">
          <div className="flex items-center gap-1.5 min-w-0 overflow-hidden text-ellipsis">
            {formattedDate && (
              <span className="flex items-center gap-1 shrink-0 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{formattedDate}</span>
              </span>
            )}
            {formattedDate && <span className="text-slate-400/60">•</span>}
            <span className="flex items-center gap-1 shrink-0 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.read_time_minutes || 2}m read</span>
            </span>
          </div>

          <span className="text-xs font-semibold text-cyan-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1 shrink-0">
            Read <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
