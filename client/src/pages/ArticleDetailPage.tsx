import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import { Article } from "../types";
import { 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  Clock, 
  Share2, 
  Sparkles, 
  ArrowRight,
  User,
  Tag
} from "lucide-react";
import { formatMarkdownToHtml } from "../utils/markdown";

interface ArticleDetailPageProps {
  identifier: string; // id or slug
  cachedArticle?: Article | null;
  onBack: () => void;
  allArticles?: Article[];
  onSelectArticle?: (a: Article) => void;
}

export function ArticleDetailPage({
  identifier,
  cachedArticle,
  onBack,
  allArticles = [],
  onSelectArticle,
}: ArticleDetailPageProps) {
  // Query article details (uses initial cached data if available)
  const { data, isLoading, error } = useQuery({
    queryKey: ["article-detail", identifier],
    queryFn: () => api.getArticle(identifier),
    initialData: cachedArticle ? { article: cachedArticle } : undefined,
    enabled: Boolean(identifier),
  });

  const article = data?.article || cachedArticle;

  // Scroll to top on mount or identifier change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [identifier]);

  if (isLoading && !article) {
    return (
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 animate-pulse">
        <div className="h-8 w-48 bg-slate-900 rounded-xl" />
        <div className="h-72 w-full bg-slate-900 rounded-3xl" />
        <div className="space-y-4">
          <div className="h-10 w-3/4 bg-slate-900 rounded-xl" />
          <div className="h-5 w-1/2 bg-slate-900 rounded-xl" />
        </div>
        <div className="h-96 w-full bg-slate-900 rounded-3xl" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <BookOpen className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-100">Article Not Found</h2>
          <p className="text-sm text-slate-400">
            The article with identifier "{identifier}" was not found or has been removed.
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-950/50 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles</span>
          </button>
        </div>
      </div>
    );
  }

  const content = article.fill_content || article.description || "No article content available.";
  const otherArticles = allArticles.filter((a) => String(a.id) !== String(article.id)).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description || article.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Article link copied to clipboard!");
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Top Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-slate-700 transition-all text-xs font-semibold shadow-sm group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-cyan-400" />
          <span>Back to Articles</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-colors"
          title="Share this article"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Hero Cover Banner */}
      {article.thumbnail_url && (
        <div className="w-full max-h-[440px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800/90 relative shadow-2xl">
          <img
            src={article.thumbnail_url}
            alt={article.title}
            className="w-full h-full max-h-[440px] object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80" />

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
            {article.category_name && (
              <span className="badge-overlay-cyan text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                {article.category_name}
              </span>
            )}
            {article.sub_category_name && (
              <span className="badge-overlay-emerald text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1">
                <Tag className="w-3 h-3" />
                <span>{article.sub_category_name}</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Header Metadata */}
      <div className="space-y-4 pb-6 border-b border-slate-800/90">
        {!article.thumbnail_url && (
          <div className="flex flex-wrap items-center gap-2">
            {article.category_name && (
              <span className="badge-soft-cyan text-xs font-bold px-3 py-1 rounded-full">
                {article.category_name}
              </span>
            )}
            {article.sub_category_name && (
              <span className="badge-soft-emerald text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Tag className="w-3 h-3" />
                <span>{article.sub_category_name}</span>
              </span>
            )}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
          {article.title}
        </h1>

        {article.description && (
          <div
            className="prose prose-invert rich-content max-w-none text-slate-300 text-sm sm:text-base leading-relaxed font-normal"
            dangerouslySetInnerHTML={{ __html: formatMarkdownToHtml(article.description) }}
          />
        )}

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-300 pt-3.5 pb-3.5 my-3 border-y border-slate-800/80">
          <span className="flex items-center gap-1.5 text-slate-200 font-medium">
            <User className="w-4 h-4 text-cyan-400" />
            <span>Fahmi Ibrahim</span>
          </span>
          <span className="text-slate-500">•</span>
          {article.date && (
            <span className="flex items-center gap-1.5 text-slate-300">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{article.date}</span>
            </span>
          )}
          <span className="text-slate-500">•</span>
          <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
            <Clock className="w-4 h-4" />
            <span>{article.read_time_minutes || 2} min read</span>
          </span>
        </div>
      </div>

      {/* Article Body Content */}
      <div className="py-2">
        <div
          className="prose prose-invert rich-content max-w-none text-slate-300 text-sm sm:text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatMarkdownToHtml(content) }}
        />
      </div>

      {/* Bottom Navigation */}
      <div className="pt-8 my-6 border-t border-slate-800/80 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition-colors text-xs font-semibold group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-cyan-400" />
          <span>Back to All Articles</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md transition-all"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Article</span>
        </button>
      </div>

      {/* Other Articles Recommendation */}
      {otherArticles.length > 0 && onSelectArticle && (
        <div className="pt-10 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>More Recommended Articles</span>
            </h3>
            <button
              type="button"
              onClick={onBack}
              className="text-xs font-semibold text-indigo-400 hover:underline inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherArticles.map((a) => (
              <div
                key={a.id}
                onClick={() => onSelectArticle(a)}
                className="group p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/40 cursor-pointer transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="badge-soft-indigo text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    {a.category_name || "Article"}
                  </span>
                  {a.sub_category_name && (
                    <span className="badge-soft-emerald text-[10px] font-semibold px-2 py-0.5 rounded-md">
                      {a.sub_category_name}
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
                  {a.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {a.description || "Read full article..."}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
