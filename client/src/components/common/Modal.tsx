import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  sidePanel?: React.ReactNode;
  headerActions?: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "full";
}

export function Modal({ isOpen, onClose, title, children, sidePanel, headerActions, maxWidth = "lg" }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    full: "max-w-[95vw]",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog & Companion Side Floating Window Container */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-4 w-full max-w-7xl my-auto">
        {/* Main Modal Box */}
        <div className={`relative w-full ${maxWidthClasses[maxWidth] || "max-w-3xl"} bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-150 shrink`}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/50">
            <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
            <div className="flex items-center gap-2">
              {headerActions}
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 overflow-y-auto flex-grow space-y-4">
            {children}
          </div>
        </div>

        {/* Companion Floating Window (Side Card docked to the right of modal) */}
        {sidePanel && (
          <div 
            className="w-full lg:w-[410px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto h-[88vh] max-h-[90vh] flex flex-col min-h-0 animate-in fade-in slide-in-from-right-4 duration-200 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            {sidePanel}
          </div>
        )}
      </div>
    </div>
  );
}
