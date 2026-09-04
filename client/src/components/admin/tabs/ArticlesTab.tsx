import React, { useState, useMemo, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Article, ArticleCategory, ArticleSubCategory } from "../../../types";
import { api } from "../../../api/client";
import { Modal } from "../../common/Modal";
import { ConfirmDialog } from "../../common/ConfirmDialog";
import { FileUpload } from "../../common/FileUpload";
import { RichTextEditor } from "../../common/RichTextEditor";
import { Pagination } from "../../common/Pagination";
import { SearchableSelect } from "../../common/SearchableSelect";
import { StatusBadgeSelect } from "../../common/StatusBadgeSelect";
import { useDebounce } from "../../../hooks/useDebounce";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  BookOpen, 
  Calendar, 
  Clock, 
  Loader2,
  Search,
  Eye,
  Tag,
} from "lucide-react";

interface ArticlesTabProps {
  articles: Article[];
  categories: ArticleCategory[];
}

export function ArticlesTab({ articles, categories }: ArticlesTabProps) {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [deleteId, setDeleteId] = useState<number | string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [filterCategory, setFilterCategory] = useState("all");

  // Query all sub-categories
  const { data: subCatsData } = useQuery({
    queryKey: ["article-sub-categories"],
    queryFn: () => api.getArticleSubCategories(),
    staleTime: 1000 * 60 * 10,
  });
  const subCategories = subCatsData?.subCategories || [];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const [formData, setFormData] = useState<{
    title: string;
    slug: string;
    category_id: string;
    sub_category_id: string;
    thumbnail: string;
    description: string;
    fill_content: string;
    status_publish: string;
  }>({
    title: "",
    slug: "",
    category_id: "cat-languages",
    sub_category_id: "sk-html",
    thumbnail: "",
    description: "",
    fill_content: "",
    status_publish: "Published",
  });

  // Filter available sub-categories for the selected category
  const availableSubCategories = useMemo(() => {
    return subCategories.filter(
      (sc) => String(sc.category_id) === String(formData.category_id)
    );
  }, [subCategories, formData.category_id]);

  const handleCategoryChange = (catId: string) => {
    const matchingSubs = subCategories.filter(
      (sc) => String(sc.category_id) === String(catId)
    );
    setFormData((prev) => ({
      ...prev,
      category_id: catId,
      sub_category_id: matchingSubs[0] ? String(matchingSubs[0].id) : "",
    }));
  };

  const openCreateModal = () => {
    setEditingArticle(null);
    const firstCatId = String(categories[0]?.id || "cat-languages");
    const matchingSubs = subCategories.filter(
      (sc) => String(sc.category_id) === firstCatId
    );
    setFormData({
      title: "",
      slug: "",
      category_id: firstCatId,
      sub_category_id: matchingSubs[0] ? String(matchingSubs[0].id) : (subCategories[0] ? String(subCategories[0].id) : ""),
      thumbnail: "",
      description: "",
      fill_content: "",
      status_publish: "Published",
    });
    setModalOpen(true);
  };

  const openEditModal = (a: Article) => {
    setEditingArticle(a);
    setFormData({
      title: a.title || "",
      slug: a.slug || "",
      category_id: String(a.category_id || "1"),
      sub_category_id: String(a.sub_category_id || "1"),
      thumbnail: a.thumbnail || "",
      description: a.description || "",
      fill_content: a.fill_content || "",
      status_publish: a.status_publish || "Published",
    });
    setModalOpen(true);
  };

  const createMutation = useMutation({
    mutationFn: (data: any) => api.createArticle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      setModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: any }) => api.updateArticle(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      setModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string | number) => api.deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      setDeleteId(null);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    if (editingArticle) {
      updateMutation.mutate({ id: editingArticle.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const [filterSubCategory, setFilterSubCategory] = useState("all");

  const filterAvailableSubCategories = useMemo(() => {
    if (filterCategory === "all") return [];
    return subCategories.filter((sc) => String(sc.category_id) === filterCategory);
  }, [subCategories, filterCategory]);

  const handleFilterCategoryChange = (catId: string) => {
    setFilterCategory(catId);
    setFilterSubCategory("all");
  };

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchCat = filterCategory === "all" || String(a.category_id) === filterCategory;
      const matchSubCat = filterSubCategory === "all" || String(a.sub_category_id) === filterSubCategory;
      const q = debouncedSearchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q) ||
        a.category_name?.toLowerCase().includes(q) ||
        a.sub_category_name?.toLowerCase().includes(q);
      return matchCat && matchSubCat && matchQuery;
    });
  }, [articles, filterCategory, filterSubCategory, debouncedSearchQuery]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterCategory, filterSubCategory, debouncedSearchQuery]);

  // Paginated slice
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredArticles.slice(start, start + pageSize);
  }, [filteredArticles, currentPage, pageSize]);

  return (
    <div className="space-y-6">
      {/* Header with Title & Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <span>Articles & Tutorials Management</span>
            <span className="text-xs font-normal text-slate-400">({articles.length} Total)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Write, edit, and organize technical blog posts with WYSIWYG editor and instant image upload.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-950/40 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Write Article</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3 p-3 bg-slate-950/60 border border-slate-800 rounded-2xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search articles by title, topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => handleFilterCategoryChange("all")}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                filterCategory === "all"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              All ({articles.length})
            </button>
            {categories.map((c) => {
              const count = articles.filter((a) => String(a.category_id) === String(c.id)).length;
              if (count === 0) return null;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleFilterCategoryChange(String(c.id))}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                    filterCategory === String(c.id)
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  {c.category_name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Sub Categories Filter Pills if Category Selected */}
        {filterAvailableSubCategories.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-800/80">
            <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap flex items-center gap-1 mr-1">
              <Tag className="w-3 h-3 text-cyan-400" />
              Subcategory:
            </span>
            <button
              type="button"
              onClick={() => setFilterSubCategory("all")}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap ${
                filterSubCategory === "all"
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              All Sub
            </button>
            {filterAvailableSubCategories.map((sc) => {
              const count = articles.filter((a) => String(a.sub_category_id) === String(sc.id)).length;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setFilterSubCategory(String(sc.id))}
                  className={`px-2.5 py-0.5 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap ${
                    filterSubCategory === String(sc.id)
                      ? "bg-cyan-600 text-white shadow-sm"
                      : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  {sc.sub_category_name} {count > 0 && `(${count})`}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Grid of Cards */}
      {filteredArticles.length === 0 ? (
        <div className="p-12 text-center bg-slate-950/40 border border-slate-800 rounded-2xl text-slate-400 text-xs space-y-2">
          <BookOpen className="w-8 h-8 text-slate-600 mx-auto" />
          <p>No articles found matching your criteria.</p>
          {(searchQuery || filterCategory !== "all" || filterSubCategory !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setFilterCategory("all");
                setFilterSubCategory("all");
              }}
              className="text-indigo-400 hover:underline text-xs"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {paginatedArticles.map((a) => (
              <div
                key={a.id}
                className="group bg-slate-950/70 border border-slate-800/90 hover:border-indigo-800/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 shadow-lg hover:shadow-indigo-950/20"
              >
                <div>
                  {/* Thumbnail Header */}
                  <a
                    href={`/articles/${a.slug || a.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-40 w-full bg-slate-900 relative overflow-hidden flex items-center justify-center border-b border-slate-800/80 cursor-pointer"
                  >
                    {a.thumbnail_url ? (
                      <img
                        src={a.thumbnail_url}
                        alt={a.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-600 gap-1">
                        <BookOpen className="w-8 h-8" />
                        <span className="text-[10px]">No thumbnail</span>
                      </div>
                    )}

                    {/* Badges Overlay */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 pointer-events-none">
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="badge-overlay-cyan text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md">
                          {a.category_name || "Article"}
                        </span>
                        {a.sub_category_name && (
                          <span className="badge-overlay-emerald text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md flex items-center gap-0.5">
                            <Tag className="w-2.5 h-2.5" />
                            <span>{a.sub_category_name}</span>
                          </span>
                        )}
                      </div>
                      {a.status_publish === "Published" ? (
                        <span className="badge-overlay-emerald text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md">
                          Published
                        </span>
                      ) : (
                        <span className="badge-overlay-amber text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md">
                          Draft
                        </span>
                      )}
                    </div>
                  </a>

                  {/* Card Body */}
                  <div className="p-4 space-y-2.5">
                    <div className="space-y-1">
                      <a
                        href={`/articles/${a.slug || a.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-slate-100 line-clamp-2 group-hover:text-indigo-400 transition-colors block"
                        title={a.title}
                      >
                        {a.title}
                      </a>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed min-h-[32px]">
                        {a.description || "No excerpt summary."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-4 py-3 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    {a.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{a.date}</span>
                      </span>
                    )}
                    {a.read_time_minutes && (
                      <span className="flex items-center gap-1 text-cyan-400 font-medium">
                        <Clock className="w-3 h-3" />
                        <span>{a.read_time_minutes}m</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <a
                      href={`/articles/${a.slug || a.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
                      title="Preview Article in New Tab"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => openEditModal(a)}
                      className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors"
                      title="Edit Article"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteId(a.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                      title="Delete Article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalItems={filteredArticles.length}
            pageSize={pageSize}
            pageSizeOptions={[1, 15, 25, 50, 100, 250, 500]}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingArticle ? "Edit Article" : "Write New Article"}
        maxWidth="3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase">
                Article Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setFormData({
                    ...formData,
                    title,
                    slug: editingArticle ? formData.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                  });
                }}
                placeholder="e.g. Properties and Values in CSS: How It Works"
                className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase">
                Slug (URL Identifier)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="e.g. css-properties-and-values"
                className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SearchableSelect
              label="Category"
              value={formData.category_id}
              onChange={handleCategoryChange}
              options={categories.map((c) => ({
                value: c.id,
                label: c.category_name,
              }))}
              placeholder="Select Category..."
              searchThreshold={5}
            />

            <SearchableSelect
              label="Sub Category"
              value={formData.sub_category_id}
              onChange={(val) => setFormData({ ...formData, sub_category_id: val })}
              options={availableSubCategories.map((sc) => ({
                value: sc.id,
                label: sc.sub_category_name,
              }))}
              placeholder={
                availableSubCategories.length > 0
                  ? "Select Subcategory..."
                  : "Select a Category first"
              }
              searchThreshold={5}
              disabled={availableSubCategories.length === 0}
            />
          </div>

          <StatusBadgeSelect
            value={formData.status_publish}
            onChange={(val) => setFormData({ ...formData, status_publish: val })}
            label="Publish Status"
          />

          {/* Thumbnail Image */}
          <FileUpload
            label="Article Cover Thumbnail"
            value={formData.thumbnail}
            onChange={(url) => setFormData({ ...formData, thumbnail: url })}
            accept="image/*"
            helperText="Upload article header cover image"
            isImage
          />

          {/* Excerpt */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase">
              Summary / Excerpt
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Short summary for cards and search engines..."
              className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Full Content / Rich Text WYSIWYG */}
          <RichTextEditor
            label="Full Article Content"
            value={formData.fill_content}
            onChange={(val) => setFormData({ ...formData, fill_content: val })}
            placeholder="Write full tutorial, code snippets, diagrams, and explanations..."
            minHeight="min-h-[260px]"
            helperText="Supports Markdown headings, bold, code snippets with syntax highlighting, lists, hyperlinks, and image attachments"
          />

          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-950/40"
            >
              {(createMutation.isPending || updateMutation.isPending) && (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              )}
              <span>{editingArticle ? "Update Article" : "Publish Article"}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="Delete Article"
        message="Are you sure you want to delete this article?"
        confirmText="Delete"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
