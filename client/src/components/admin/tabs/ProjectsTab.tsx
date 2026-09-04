import React, { useState, useMemo, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Project, ProjectCategory, ProjectTag } from "../../../types";
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
  FolderKanban, 
  ExternalLink, 
  Github, 
  Loader2, 
  Search,
  Eye,
} from "lucide-react";

interface ProjectsTabProps {
  projects: Project[];
  categories: ProjectCategory[];
  tags: ProjectTag[];
}

export function ProjectsTab({ projects, categories, tags }: ProjectsTabProps) {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteId, setDeleteId] = useState<number | string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [filterCategory, setFilterCategory] = useState("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const [formData, setFormData] = useState<{
    title: string;
    slug: string;
    category_id: string;
    tag_id: string;
    thumbnail: string;
    short_desc: string;
    description: string;
    status_publish: string;
    version: string;
    link_demo: string;
    link_github: string;
  }>({
    title: "",
    slug: "",
    category_id: "1",
    tag_id: "",
    thumbnail: "",
    short_desc: "",
    description: "",
    status_publish: "Published",
    version: "1.0.0",
    link_demo: "",
    link_github: "",
  });

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      slug: "",
      category_id: String(categories[0]?.id || "1"),
      tag_id: "",
      thumbnail: "",
      short_desc: "",
      description: "",
      status_publish: "Published",
      version: "1.0.0",
      link_demo: "",
      link_github: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setFormData({
      title: p.title || "",
      slug: p.slug || "",
      category_id: String(p.category_id || "1"),
      tag_id: p.tag_id || "",
      thumbnail: p.thumbnail || "",
      short_desc: p.short_desc || "",
      description: p.description || "",
      status_publish: p.status_publish || "Published",
      version: p.version || "1.0.0",
      link_demo: p.link_demo || "",
      link_github: p.link_github || "",
    });
    setModalOpen(true);
  };

  const createMutation = useMutation({
    mutationFn: (data: any) => api.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: any }) => api.updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string | number) => api.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setDeleteId(null);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleToggleTag = (tagId: string | number) => {
    const currentTags = formData.tag_id ? formData.tag_id.split(",").map((s) => s.trim()).filter(Boolean) : [];
    const tagIdStr = String(tagId);
    let newTags: string[];
    if (currentTags.includes(tagIdStr)) {
      newTags = currentTags.filter((t) => t !== tagIdStr);
    } else {
      newTags = [...currentTags, tagIdStr];
    }
    setFormData({ ...formData, tag_id: newTags.join(",") });
  };

  const selectedTagIds = formData.tag_id ? formData.tag_id.split(",").map((s) => s.trim()) : [];

  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = filterCategory === "all" || String(p.category_id) === filterCategory;
      const matchStatus =
        filterStatus === "all" ||
        (filterStatus === "published" && (p.status_publish === "Published" || !p.status_publish)) ||
        (filterStatus === "draft" && (p.status_publish === "Draft" || p.status_publish?.toLowerCase() === "draft"));
      const q = debouncedSearchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.short_desc?.toLowerCase().includes(q) ||
        p.category_name?.toLowerCase().includes(q);
      return matchCat && matchStatus && matchQuery;
    });
  }, [projects, filterCategory, filterStatus, debouncedSearchQuery]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterCategory, filterStatus, debouncedSearchQuery]);

  // Paginated slice
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProjects.slice(start, start + pageSize);
  }, [filteredProjects, currentPage, pageSize]);

  return (
    <div className="space-y-6">
      {/* Header with Title & Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-cyan-400" />
            <span>Projects Management</span>
            <span className="text-xs font-normal text-slate-400">({projects.length} Total)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your showcase projects in an intuitive card grid layout with rich markdown documentation.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-950/40 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-950/60 border border-slate-800 rounded-2xl">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search projects by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end overflow-x-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              type="button"
              onClick={() => setFilterStatus("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === "all"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              All ({projects.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus("published")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === "published"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-emerald-400"
              }`}
            >
              Published ({projects.filter((p) => p.status_publish === "Published" || !p.status_publish).length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus("draft")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === "draft"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-amber-400"
              }`}
            >
              Draft ({projects.filter((p) => p.status_publish === "Draft" || p.status_publish?.toLowerCase() === "draft").length})
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              type="button"
              onClick={() => setFilterCategory("all")}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                filterCategory === "all"
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              All Types
            </button>
            {categories.map((c) => {
              const count = projects.filter((p) => String(p.category_id) === String(c.id)).length;
              if (count === 0) return null;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setFilterCategory(String(c.id))}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                    filterCategory === String(c.id)
                      ? "bg-cyan-600 text-white shadow-sm"
                      : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  {c.category_name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid of Cards */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center bg-slate-950/40 border border-slate-800 rounded-2xl text-slate-400 text-xs space-y-2">
          <FolderKanban className="w-8 h-8 text-slate-600 mx-auto" />
          <p>No projects found matching your criteria.</p>
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setFilterCategory("all");
              }}
              className="text-cyan-400 hover:underline text-xs"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {paginatedProjects.map((p) => (
              <div
                key={p.id}
                className="group bg-slate-950/70 border border-slate-800/90 hover:border-cyan-800/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 shadow-lg hover:shadow-cyan-950/20"
              >
                <div>
                  {/* Thumbnail Header */}
                  <div className="h-40 w-full bg-slate-900 relative overflow-hidden flex items-center justify-center border-b border-slate-800/80">
                    {p.thumbnail_url ? (
                      <img
                        src={p.thumbnail_url}
                        alt={p.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-600 gap-1">
                        <FolderKanban className="w-8 h-8" />
                        <span className="text-[10px]">No thumbnail</span>
                      </div>
                    )}

                    {/* Badges Overlay */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 pointer-events-none">
                      <span className="badge-overlay-cyan text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md">
                        {p.category_name || "Project"}
                      </span>
                      {p.status_publish === "Published" ? (
                        <span className="badge-overlay-emerald text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md">
                          Published
                        </span>
                      ) : (
                        <span className="badge-overlay-amber text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md">
                          Draft
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-2.5">
                    <div className="space-y-1">
                      <a
                        href={`/projects/${p.slug || p.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-slate-100 line-clamp-1 hover:text-cyan-400 transition-colors block"
                        title="Open project page in new tab"
                      >
                        {p.title}
                      </a>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed min-h-[32px]">
                        {p.short_desc || "No short summary available."}
                      </p>
                    </div>

                    {/* Tech stack tags */}
                    {p.tags && p.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {p.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="badge-soft-slate text-[10px] px-2 py-0.2 rounded-md font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {p.tags.length > 3 && (
                          <span className="text-[10px] text-slate-500 font-medium self-center">
                            +{p.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-4 py-3 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    {p.version && (
                      <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                        v{p.version}
                      </span>
                    )}
                    {p.link_github && (
                      <a
                        href={p.link_github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-colors"
                        title="GitHub"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {p.link_demo && p.link_demo !== "http://" && (
                      <a
                        href={p.link_demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-cyan-400 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <a
                      href={`/projects/${p.slug || p.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
                      title="View Project Page (Open in new tab)"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => openEditModal(p)}
                      className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
                      title="Edit Project"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteId(p.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                      title="Delete Project"
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
            totalItems={filteredProjects.length}
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
        title={editingProject ? "Edit Project" : "Add New Project"}
        maxWidth="3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase">
                Project Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setFormData({
                    ...formData,
                    title,
                    slug: editingProject ? formData.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                  });
                }}
                placeholder="e.g. Barberbro - Barbershop POS Application"
                className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
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
                placeholder="e.g. barberbro-pos"
                className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SearchableSelect
              label="Category"
              value={formData.category_id}
              onChange={(val) => setFormData({ ...formData, category_id: val })}
              options={categories.map((c) => ({
                value: c.id,
                label: c.category_name,
                subLabel: c.category_desc || undefined,
              }))}
              placeholder="Select Category..."
              searchThreshold={5}
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase">
                Version
              </label>
              <input
                type="text"
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                placeholder="e.g. 1.0.0"
                className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <StatusBadgeSelect
            value={formData.status_publish}
            onChange={(val) => setFormData({ ...formData, status_publish: val })}
            label="Project Status"
          />

          {/* Thumbnail Image Upload */}
          <FileUpload
            label="Project Thumbnail Cover"
            value={formData.thumbnail}
            onChange={(url) => setFormData({ ...formData, thumbnail: url })}
            accept="image/*"
            helperText="Upload project banner or screenshot image"
            isImage
          />

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase">
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={formData.link_github}
                onChange={(e) => setFormData({ ...formData, link_github: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-300 uppercase">
                  Live Demo / Preview URL
                </label>
                <span className="text-[10px] text-slate-500 font-normal">Optional</span>
              </div>
              <input
                type="url"
                value={formData.link_demo}
                onChange={(e) => setFormData({ ...formData, link_demo: e.target.value })}
                placeholder="https://... (Leave empty if none)"
                className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Tags Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase">
              Select Tech Stack Tags
            </label>
            <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              {tags.map((t) => {
                const isSelected = selectedTagIds.includes(String(t.id));
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleToggleTag(t.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-cyan-600 text-white shadow-sm"
                        : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                    }`}
                  >
                    {t.tag_name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Short Desc / Excerpt with RichTextEditor */}
          <RichTextEditor
            label="Short Summary / Excerpt"
            value={formData.short_desc}
            onChange={(val) => setFormData({ ...formData, short_desc: val })}
            placeholder="Write brief summary / excerpt for project cards and highlights..."
            minHeight="min-h-[140px]"
            helperText="Supports formatting, bold, italics, links, and inline code"
          />

          {/* Full Description / Rich Text Documentation */}
          <RichTextEditor
            label="Full Documentation & Specifications"
            value={formData.description}
            onChange={(val) => setFormData({ ...formData, description: val })}
            placeholder="Write detailed documentation, architecture, features, schematics notes, and embed screenshots..."
            minHeight="min-h-[220px]"
            helperText="Supports Markdown headings, bold, lists, code blocks with syntax highlighting, hyperlinks, and image uploads"
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
              className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-950/40"
            >
              {(createMutation.isPending || updateMutation.isPending) && (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              )}
              <span>{editingProject ? "Update Project" : "Create Project"}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="Delete Project"
        message="Are you sure you want to delete this project?"
        confirmText="Delete Project"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
