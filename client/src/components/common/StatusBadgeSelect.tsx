import React from "react";
import { CheckCircle2, Clock, Lock, Globe, FileText } from "lucide-react";

export type PublishStatus = "Published" | "Draft" | "Privated" | string;

interface StatusBadgeSelectProps {
  value: PublishStatus;
  onChange: (value: PublishStatus) => void;
  label?: string;
  helperText?: string;
  showPrivated?: boolean;
}

export function StatusBadgeSelect({
  value,
  onChange,
  label = "Publication Status",
  helperText,
  showPrivated = false,
}: StatusBadgeSelectProps) {
  const options = [
    {
      id: "Published",
      label: "Published",
      description: "Publicly visible on website",
      icon: Globe,
      activeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500 shadow-emerald-950/40",
      inactiveColor: "bg-slate-900/60 text-slate-400 border-slate-800 hover:border-emerald-500/40 hover:text-emerald-300",
      ringColor: "ring-emerald-500/30",
      dotColor: "bg-emerald-400",
    },
    {
      id: "Draft",
      label: "Draft",
      description: "Hidden draft (admin only)",
      icon: FileText,
      activeColor: "bg-amber-500/20 text-amber-300 border-amber-500 shadow-amber-950/40",
      inactiveColor: "bg-slate-900/60 text-slate-400 border-slate-800 hover:border-amber-500/40 hover:text-amber-300",
      ringColor: "ring-amber-500/30",
      dotColor: "bg-amber-400",
    },
    ...(showPrivated
      ? [
          {
            id: "Privated",
            label: "Private",
            description: "Access only via direct link",
            icon: Lock,
            activeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500 shadow-indigo-950/40",
            inactiveColor: "bg-slate-900/60 text-slate-400 border-slate-800 hover:border-indigo-500/40 hover:text-indigo-300",
            ringColor: "ring-indigo-500/30",
            dotColor: "bg-indigo-400",
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-1.5">
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            {label}
          </label>
          <span className="text-[10px] text-slate-500">Select status</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2.5">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = value === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all duration-150 select-none shadow-sm ${
                isSelected
                  ? `${opt.activeColor} ring-2 ${opt.ringColor} shadow-md`
                  : opt.inactiveColor
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? "bg-slate-950/70" : "bg-slate-800/80"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{opt.label}</span>
                  {isSelected && (
                    <span className={`w-2 h-2 rounded-full ${opt.dotColor} animate-pulse`} />
                  )}
                </div>
                <p className="text-[10px] opacity-75 truncate leading-tight mt-0.5">
                  {opt.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {helperText && <p className="text-[11px] text-slate-500">{helperText}</p>}
    </div>
  );
}
