import React, { useState, useMemo, useEffect } from "react";
import { FolderKanban, Search, Layers } from "lucide-react";
import { Project, ProjectCategory } from "../types";
import { ProjectCard } from "../components/projects/ProjectCard";
import { Pagination } from "../components/common/Pagination";
import { useDebounce } from "../hooks/useDebounce";

interface ProjectsPageProps {
  projects: Project[];
  categories: ProjectCategory[];
  isLoading: boolean;
  onSelectProject: (project: Project) => void;
}

export function ProjectsPage({ projects, categories, isLoading, onSelectProject }: ProjectsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory =
        selectedCategory === "all" ||
        String(p.category_id) === selectedCategory ||
        p.category_name?.toLowerCase() === selectedCategory.toLowerCase();

      const searchLower = debouncedSearchQuery.toLowerCase().trim();
      const matchSearch =
        !searchLower ||
        p.title.toLowerCase().includes(searchLower) ||
        p.short_desc?.toLowerCase().includes(searchLower) ||
        p.category_name?.toLowerCase().includes(searchLower) ||
        p.tags?.some((t) => t.toLowerCase().includes(searchLower));

      return matchCategory && matchSearch;
    });
  }, [projects, selectedCategory, debouncedSearchQuery]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, debouncedSearchQuery]);

  // Paginated slice
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProjects.slice(start, start + pageSize);
  }, [filteredProjects, currentPage, pageSize]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-widest">
          <FolderKanban className="w-4 h-4" />
          <span>Work Showcase</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          All Projects
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Explore fullstack web applications, IoT embedded systems, cross-platform mobile apps, and 360 panoramic platforms created by Fahmi Ibrahim.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search projects, technologies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              selectedCategory === "all"
                ? "bg-cyan-600 text-white shadow-md shadow-cyan-950/50"
                : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
            }`}
          >
            All ({projects.length})
          </button>

          {categories.map((cat) => {
            const count = projects.filter((p) => String(p.category_id) === String(cat.id)).length;
            if (count === 0) return null;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(String(cat.id))}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === String(cat.id)
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-950/50"
                    : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {cat.category_name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-72 bg-slate-900/60 border border-slate-800 rounded-2xl"></div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl text-slate-400 text-sm space-y-2">
          <Layers className="w-8 h-8 text-slate-600 mx-auto" />
          <p>No projects match your search or filter.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="text-xs text-cyan-400 hover:underline pt-2 inline-block font-medium"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenDetail={(p) => onSelectProject(p)}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalItems={filteredProjects.length}
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
