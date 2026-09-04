import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Search, Check, X } from "lucide-react";

export interface SelectOption {
  value: string | number;
  label: string;
  subLabel?: string;
  icon?: React.ReactNode;
}

export interface SearchableSelectProps {
  value: string | number;
  onChange: (value: string) => void;
  options: (SelectOption | string | number)[];
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  searchThreshold?: number; // Threshold count to show search box, default 5
  className?: string;
  helperText?: string;
}

export function SearchableSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option...",
  label,
  required = false,
  disabled = false,
  searchThreshold = 5,
  className = "",
  helperText,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Normalize options into standardized { value, label } structure
  const normalizedOptions: SelectOption[] = useMemo(() => {
    return options.map((opt) => {
      if (typeof opt === "object" && opt !== null) {
        return {
          value: String(opt.value),
          label: opt.label,
          subLabel: opt.subLabel,
          icon: opt.icon,
        };
      }
      return {
        value: String(opt),
        label: String(opt),
      };
    });
  }, [options]);

  // Current selected item
  const selectedOption = useMemo(() => {
    return normalizedOptions.find((opt) => String(opt.value) === String(value));
  }, [normalizedOptions, value]);

  // Filtered options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return normalizedOptions;
    const term = searchTerm.toLowerCase().trim();
    return normalizedOptions.filter(
      (opt) =>
        opt.label.toLowerCase().includes(term) ||
        (opt.subLabel && opt.subLabel.toLowerCase().includes(term))
    );
  }, [normalizedOptions, searchTerm]);

  // Determine if search input should be visible (> 5 items by default)
  const isSearchable = normalizedOptions.length > searchThreshold;

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Auto focus search input when opening
  useEffect(() => {
    if (isOpen && isSearchable) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen, isSearchable]);

  const handleSelect = (val: string | number) => {
    onChange(String(val));
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className={`space-y-1.5 ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Trigger Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`w-full px-3 py-2 bg-slate-950/80 border rounded-xl text-xs text-left flex items-center justify-between transition-all select-none ${
            isOpen
              ? "border-cyan-500 ring-1 ring-cyan-500/20 bg-slate-900 shadow-md"
              : "border-slate-800 hover:border-slate-700"
          } ${disabled ? "opacity-50 cursor-not-allowed bg-slate-900/50" : "cursor-pointer"}`}
        >
          <div className="flex items-center gap-2 truncate">
            {selectedOption?.icon && (
              <span className="shrink-0">{selectedOption.icon}</span>
            )}
            <span className={selectedOption ? "text-slate-100 font-medium truncate" : "text-slate-500 truncate"}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>

          <ChevronDown
            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-cyan-400" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu (Select2 styled) */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-[120] mt-1.5 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 flex flex-col">
            {/* Search Box if > 5 options */}
            {isSearchable && (
              <div className="p-2 border-b border-slate-800/80 bg-slate-950/60 sticky top-0 z-10">
                <div className="relative flex items-center">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 pointer-events-none" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={`Search among ${normalizedOptions.length} options...`}
                    className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-xl text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                      className="absolute right-2 p-0.5 text-slate-400 hover:text-slate-200"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Options List */}
            <div className="max-h-56 overflow-y-auto p-1.5 space-y-0.5">
              {filteredOptions.length === 0 ? (
                <div className="py-4 px-3 text-center text-xs text-slate-500 italic">
                  No options matching "{searchTerm}"
                </div>
              ) : (
                filteredOptions.map((opt) => {
                  const isSelected = String(opt.value) === String(value);

                  return (
                    <button
                      key={String(opt.value)}
                      type="button"
                      onClick={() => handleSelect(opt.value)}
                      className={`w-full px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors text-left ${
                        isSelected
                          ? "bg-cyan-950/60 text-cyan-300 font-semibold border border-cyan-800/50"
                          : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                        <div className="truncate">
                          <span className="block truncate">{opt.label}</span>
                          {opt.subLabel && (
                            <span className="block text-[10px] text-slate-500 font-normal truncate">
                              {opt.subLabel}
                            </span>
                          )}
                        </div>
                      </div>

                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {helperText && (
        <p className="text-[11px] text-slate-500 mt-1">{helperText}</p>
      )}
    </div>
  );
}

// Export Select2 as alias for convenience
export const Select2 = SearchableSelect;
