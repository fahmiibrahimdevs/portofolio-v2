import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Search, Layers, Tag } from "lucide-react";
import { Article, ArticleCategory } from "../types";
import { ArticleCard } from "../components/articles/ArticleCard";
import { Pagination } from "../components/common/Pagination";
import { useDebounce } from "../hooks/useDebounce";
import { api } from "../api/client";

interface ArticlesPageProps {
  articles: Article[];
  categories: ArticleCategory[];
  isLoading: boolean;
  onSelectArticle: (article: Article) => void;
}

export function ArticlesPage({
  articles,
  categories,
  isLoading,
  onSelectArticle,
}: ArticlesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");

  // Query sub-categories for filtering
  const { data: subCatsData } = useQuery({
    queryKey: ["article-sub-categories"],
    queryFn: () => api.getArticleSubCategories(),
    staleTime: 1000 * 60 * 10,
  });
  const subCategories = subCatsData?.subCategories || [];

  const availableSubCategories = useMemo(() => {
    if (selectedCategory === "all") return [];
    return subCategories.filter(
      (sc) => String(sc.category_id) === selectedCategory
    );
  }, [subCategories, selectedCategory]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSubCategory("all");
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchCategory =
        selectedCategory === "all" ||
        String(a.category_id) === selectedCategory ||
        a.category_name?.toLowerCase() === selectedCategory.toLowerCase();

      const matchSubCategory =
        selectedSubCategory === "all" ||
        String(a.sub_category_id) === selectedSubCategory ||
        a.sub_category_name?.toLowerCase() === selectedSubCategory.toLowerCase();

      const searchLower = debouncedSearchQuery.toLowerCase().trim();
      const matchSearch =
        !searchLower ||
        a.title.toLowerCase().includes(searchLower) ||
        a.description?.toLowerCase().includes(searchLower) ||
        a.category_name?.toLowerCase().includes(searchLower) ||
        a.sub_category_name?.toLowerCase().includes(searchLower);

      return matchCategory && matchSubCategory && matchSearch;
    });
  }, [articles, selectedCategory, selectedSubCategory, debouncedSearchQuery]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSubCategory, debouncedSearchQuery]);

  // Paginated slice
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredArticles.slice(start, start + pageSize);
  }, [filteredArticles, currentPage, pageSize]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-widest">
          <BookOpen className="w-4 h-4" />
          <span>Knowledge & Writing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Articles & Tutorials
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Technical insights on web architecture, CSS styling, backend development, embedded microcontrollers, and engineering problem-solving.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3 p-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search articles by title, topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Categories Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <button
              type="button"
              onClick={() => handleCategoryChange("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-950/50"
                  : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              All ({articles.length})
            </button>

            {categories.map((cat) => {
              const count = articles.filter((a) => String(a.category_id) === String(cat.id)).length;
              if (count === 0) return null;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(String(cat.id))}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    selectedCategory === String(cat.id)
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-950/50"
                      : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  {cat.category_name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Sub Categories Filter Pills */}
        {availableSubCategories.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 border-t border-slate-800/80">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap flex items-center gap-1 mr-1">
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              Subcategory:
            </span>
            <button
              type="button"
              onClick={() => setSelectedSubCategory("all")}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                selectedSubCategory === "all"
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              All Sub
            </button>
            {availableSubCategories.map((sc) => {
              const count = articles.filter((a) => String(a.sub_category_id) === String(sc.id)).length;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setSelectedSubCategory(String(sc.id))}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                    selectedSubCategory === String(sc.id)
                      ? "bg-cyan-600 text-white shadow-sm"
                      : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  {sc.sub_category_name} {count > 0 && `(${count})`}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Articles Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-slate-900/60 border border-slate-800 rounded-2xl"></div>
          ))}
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl text-slate-400 text-sm space-y-2">
          <Layers className="w-8 h-8 text-slate-600 mx-auto" />
          <p>No articles found matching your criteria.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSelectedSubCategory("all");
            }}
            className="text-xs text-indigo-400 hover:underline pt-2 inline-block font-medium"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onRead={onSelectArticle}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalItems={filteredArticles.length}
            pageSize={pageSize}
            pageSizeOptions={[1, 15, 25, 50, 100, 250, 500]}
            onPageChange={(p) => {
              setCurrentPage(p);
              window.scrollTo({ top: 200, behavior: "smooth" });
            }}
            onPageSizeChange={setPageSize}
          />
        </div>
      )}
    </div>
  );
}
