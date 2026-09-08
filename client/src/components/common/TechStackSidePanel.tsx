import React, { useState, useRef, useEffect, useMemo } from "react";
import { TechCategory, TechSkill } from "../../types";
import { useDebounce } from "../../hooks/useDebounce";
import { 
  Search, 
  X, 
  Check, 
  Cpu, 
  Sparkles, 
  CheckSquare, 
  ChevronDown, 
  ChevronUp, 
  Pin,
  Layers,
  Code2
} from "lucide-react";

interface TechStackSidePanelProps {
  categories: TechCategory[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  onClose: () => void;
}

interface EnrichedTechSkill extends TechSkill {
  categoryName: string;
}

const INITIAL_LIMIT = 15;
const LOAD_MORE_STEP = 15;

export function TechStackSidePanel({
  categories = [],
  selectedIds = [],
  onChange,
  onClose,
}: TechStackSidePanelProps) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [visibleLimit, setVisibleLimit] = useState(INITIAL_LIMIT);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus search input on mount
    const timer = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Reset pagination limit when search keyword or category filter changes
  useEffect(() => {
    setVisibleLimit(INITIAL_LIMIT);
  }, [debouncedSearch, selectedCategory]);

  // Flatten all skills enriched with their category name
  const allSkills = useMemo(() => {
    const list: EnrichedTechSkill[] = [];
    for (const cat of categories) {
      if (Array.isArray(cat.skills)) {
        for (const s of cat.skills) {
          list.push({
            ...s,
            categoryName: cat.name,
          });
        }
      }
    }
    return list;
  }, [categories]);

  // Category counts for filter tabs
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: allSkills.length,
    };
    for (const cat of categories) {
      counts[cat.id] = (cat.skills || []).length;
    }
    return counts;
  }, [categories, allSkills]);

  // Filter skills by search keyword and selected category
  const filteredSkills = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    return allSkills.filter((s) => {
      const matchSearch =
        q === "" ||
        s.name.toLowerCase().includes(q) ||
        s.categoryName.toLowerCase().includes(q);

      const matchCategory =
        selectedCategory === "all" || s.category_id === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [allSkills, debouncedSearch, selectedCategory]);

  // 📌 1. PINNED SELECTED FIRST SORTING LOGIC
  const sortedSkills = useMemo(() => {
    const selected: EnrichedTechSkill[] = [];
    const unselected: EnrichedTechSkill[] = [];

    for (const s of filteredSkills) {
      if (selectedIds.includes(s.id)) {
        selected.push(s);
      } else {
        unselected.push(s);
      }
    }

    selected.sort((a, b) => a.name.localeCompare(b.name));
    unselected.sort((a, b) => a.name.localeCompare(b.name));

    return [...selected, ...unselected];
  }, [filteredSkills, selectedIds]);

  // 🔄 2. PROGRESSIVE LOAD MORE
  const visibleSkills = useMemo(() => {
    return sortedSkills.slice(0, visibleLimit);
  }, [sortedSkills, visibleLimit]);

  const hasMore = sortedSkills.length > visibleLimit;
  const remainingCount = sortedSkills.length - visibleLimit;

  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((item) => item !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const handleSelectAllFiltered = () => {
    const filteredSkillIds = filteredSkills.map((s) => s.id);
    const allFilteredSelected = filteredSkillIds.every((id) => selectedIds.includes(id));
    if (allFilteredSelected) {
      onChange(selectedIds.filter((id) => !filteredSkillIds.includes(id)));
    } else {
      const combined = Array.from(new Set([...selectedIds, ...filteredSkillIds]));
      onChange(combined);
    }
  };

  const isAllFilteredSelected =
    filteredSkills.length > 0 && filteredSkills.every((s) => selectedIds.includes(s.id));
  const selectedInFilteredCount = filteredSkills.filter((s) => selectedIds.includes(s.id)).length;

  return (
    <div className="flex flex-col h-full max-h-[90vh]">
      {/* Header */}
      <div className="flex items-start justify-between px-5 py-4 border-b border-slate-800/80 bg-slate-900/70">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0 shadow-xs">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 tracking-tight flex items-center gap-1.5">
              Pilih Tech Stack
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              Filter kategori & pilih sub-kategori teknologi
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg p-1.5 transition-colors"
          title="Tutup Panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {/* Search Bar with Debounce */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            ref={searchInputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama teknologi (e.g. React, ESP32)..."
            className="w-full pl-9 pr-8 py-2 text-xs bg-slate-950/70 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter Tabs (Horizontal Scroll Without Scrollbar) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1 ${
              selectedCategory === "all"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-xs shadow-cyan-500/20"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
            }`}
          >
            <span>Semua</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === "all"
                  ? "bg-slate-950/20 text-slate-950"
                  : "bg-slate-900 text-slate-400"
              }`}
            >
              {categoryCounts.all || 0}
            </span>
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1 ${
                  isSelected
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-xs shadow-cyan-500/20"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-slate-950/20 text-slate-950" : "bg-slate-900 text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Subheader: Results count & Select all toggle */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1 border-t border-slate-800/60">
          <div className="flex items-center gap-2">
            <span>{filteredSkills.length} teknologi ditemukan</span>
            {selectedInFilteredCount > 0 && (
              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-800/50">
                {selectedInFilteredCount} terpilih
              </span>
            )}
          </div>
          {filteredSkills.length > 0 && (
            <button
              type="button"
              onClick={handleSelectAllFiltered}
              className="text-cyan-400 hover:text-cyan-300 hover:underline font-semibold flex items-center gap-1"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>
                {isAllFilteredSelected
                  ? "Batal Pilih Semua"
                  : `Pilih Semua (${filteredSkills.length})`}
              </span>
            </button>
          )}
        </div>

        {/* Tech Skills Cards List (Pinned Selected First + Load More) */}
        <div className="space-y-2">
          {allSkills.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 space-y-2">
              <Layers className="w-8 h-8 mx-auto text-slate-600" />
              <p className="font-semibold text-slate-200">Belum Ada Data Technology Stack</p>
              <p className="text-[11px] text-slate-400 max-w-[240px] mx-auto">
                Silakan isi data kategori dan skill melalui tab &quot;Technology Stack&quot;.
              </p>
            </div>
          ) : sortedSkills.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              <Layers className="w-8 h-8 mx-auto mb-2 text-slate-600" />
              <span>Tidak ada teknologi yang cocok dengan filter atau pencarian.</span>
            </div>
          ) : (
            visibleSkills.map((s) => {
              const isChecked = selectedIds.includes(s.id);
              return (
                <div
                  key={s.id}
                  onClick={() => handleToggle(s.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer select-none transition-all ${
                    isChecked
                      ? "bg-cyan-950/40 border-cyan-500/80 text-cyan-200 shadow-xs ring-1 ring-cyan-500/30"
                      : "bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700 shadow-2xs"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    {/* Icon Tech / Skill */}
                    <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 p-1 overflow-hidden">
                      {s.icon_url ? (
                        <img
                          src={s.icon_url}
                          alt={s.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <Code2 className="w-4 h-4 text-slate-400" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-slate-100">
                          {s.name}
                        </span>
                        {isChecked && (
                          <span className="text-[9px] font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-700/50 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                            <Pin className="w-2.5 h-2.5 fill-cyan-400" />
                            Terpilih
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5 font-medium flex items-center gap-1">
                        <span className="px-1.5 py-0.2 bg-slate-900/80 rounded border border-slate-800 text-slate-400">
                          {s.categoryName}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Smooth Animated Checkbox */}
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all ml-2 ${
                      isChecked
                        ? "bg-cyan-500 border-cyan-500 text-slate-950 shadow-xs"
                        : "border-slate-700 bg-slate-900 hover:border-slate-500"
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })
          )}

          {/* 🔄 LOAD MORE CONTROLS */}
          {hasMore && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setVisibleLimit((prev) => prev + LOAD_MORE_STEP)}
                className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-cyan-400 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-2xs group"
              >
                <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-cyan-400" />
                <span>
                  Muat Lebih Banyak (+{Math.min(remainingCount, LOAD_MORE_STEP)} Teknologi)
                </span>
              </button>
              <div className="text-center mt-1.5">
                <span className="text-[10px] text-slate-400">
                  Menampilkan {visibleSkills.length} dari {sortedSkills.length} teknologi
                </span>
              </div>
            </div>
          )}

          {/* Collapse option when expanded */}
          {visibleLimit > INITIAL_LIMIT && sortedSkills.length > INITIAL_LIMIT && (
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setVisibleLimit(INITIAL_LIMIT)}
                className="w-full py-1.5 px-3 bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-medium text-[11px] rounded-xl transition-all flex items-center justify-center gap-1"
              >
                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                <span>Sembunyikan ({INITIAL_LIMIT} pertama)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer Action Bar */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-bold text-slate-200">
            {selectedIds.length} teknologi terpilih
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-md hover:shadow-cyan-500/20 transition-all cursor-pointer"
        >
          Selesai
        </button>
      </div>
    </div>
  );
}
