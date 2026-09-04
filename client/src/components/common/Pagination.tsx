import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from "lucide-react";
import { SearchableSelect } from "./SearchableSelect";

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalItems,
  pageSize,
  pageSizeOptions = [1, 15, 25, 50, 100, 250, 500],
  onPageChange,
  onPageSizeChange,
  className = "",
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const startItem = totalItems === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endItem = Math.min(totalItems, safeCurrentPage * pageSize);

  // Generate page numbers with smart ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (safeCurrentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (safeCurrentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(safeCurrentPage - 1);
        pages.push(safeCurrentPage);
        pages.push(safeCurrentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== safeCurrentPage) {
      onPageChange(page);
    }
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-950/70 border border-slate-800/80 rounded-2xl text-xs text-slate-300 shadow-sm ${className}`}
    >
      {/* Items count & Per-page select */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-slate-400">
          Showing <strong className="text-slate-200">{startItem}</strong> to{" "}
          <strong className="text-slate-200">{endItem}</strong> of{" "}
          <strong className="text-cyan-400">{totalItems}</strong> entries
        </span>

        {onPageSizeChange && (
          <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
            <span className="text-slate-400 text-[11px] whitespace-nowrap">Show:</span>
            <SearchableSelect
              value={pageSize}
              onChange={(val) => {
                const newSize = Number(val);
                onPageSizeChange(newSize);
                onPageChange(1);
              }}
              options={pageSizeOptions.map((opt) => ({
                value: opt,
                label: `${opt} / page`,
              }))}
              searchThreshold={5}
              className="w-32"
            />
          </div>
        )}
      </div>

      {/* Pagination Navigation */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          {/* First Page Button */}
          <button
            type="button"
            onClick={() => handlePageClick(1)}
            disabled={safeCurrentPage === 1}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-transparent hover:border-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="First Page"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>

          {/* Previous Page Button */}
          <button
            type="button"
            onClick={() => handlePageClick(safeCurrentPage - 1)}
            disabled={safeCurrentPage === 1}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-transparent hover:border-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {getPageNumbers().map((p, idx) => {
              if (p === "...") {
                return (
                  <span key={`ellipsis-${idx}`} className="px-2 py-1 text-slate-600 font-bold select-none">
                    ...
                  </span>
                );
              }

              const isCurrent = p === safeCurrentPage;
              return (
                <button
                  key={`page-${p}`}
                  type="button"
                  onClick={() => handlePageClick(Number(p))}
                  className={`min-w-[32px] h-8 px-2 rounded-xl text-xs font-semibold transition-all ${
                    isCurrent
                      ? "bg-cyan-600 text-white shadow-md shadow-cyan-950/60"
                      : "text-slate-400 hover:text-slate-100 bg-slate-900/60 hover:bg-slate-900 border border-slate-800"
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>

          {/* Next Page Button */}
          <button
            type="button"
            onClick={() => handlePageClick(safeCurrentPage + 1)}
            disabled={safeCurrentPage === totalPages}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-transparent hover:border-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Last Page Button */}
          <button
            type="button"
            onClick={() => handlePageClick(totalPages)}
            disabled={safeCurrentPage === totalPages}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-transparent hover:border-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Last Page"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
