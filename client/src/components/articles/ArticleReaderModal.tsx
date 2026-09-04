import React from "react";
import { Modal } from "../common/Modal";
import { Article } from "../../types";
import { Calendar, Clock } from "lucide-react";
import { formatMarkdownToHtml } from "../../utils/markdown";

interface ArticleReaderModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ArticleReaderModal({ article, isOpen, onClose }: ArticleReaderModalProps) {
  if (!article) return null;

  const content = article.fill_content || article.description || "No article content available.";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={article.title} maxWidth="3xl">
      <div className="space-y-6">
        {/* Cover */}
        {article.thumbnail_url && (
          <div className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative">
            <img
              src={article.thumbnail_url}
              alt={article.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            
            {article.category_name && (
              <div className="absolute top-4 left-4">
                <span className="badge-soft-cyan text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
                  {article.category_name}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Header Metadata */}
        <div className="space-y-3 pb-5 border-b border-slate-800">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3.5 text-xs sm:text-[13px] text-slate-300">
            {article.date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Published on {article.date}</span>
              </span>
            )}
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.read_time_minutes || 2} min read</span>
            </span>
            <span className="text-slate-500">•</span>
            <span>Author: <strong className="text-slate-100 font-semibold">Fahmi Ibrahim</strong></span>
          </div>
        </div>

        {/* Article Body */}
        <div
          className="prose prose-invert rich-content max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed font-normal"
          dangerouslySetInnerHTML={{ __html: formatMarkdownToHtml(content) }}
        />

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Close Reader
          </button>
        </div>
      </div>
    </Modal>
  );
}
