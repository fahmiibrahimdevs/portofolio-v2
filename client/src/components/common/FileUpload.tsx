import React, { useState, useRef, useCallback } from "react";
import { Upload, CheckCircle2, AlertCircle, FileText, Loader2, X, CloudUpload } from "lucide-react";
import { api } from "../../api/client";

interface FileUploadProps {
  label: string;
  value?: string;
  onChange: (url: string, filename?: string) => void;
  accept?: string;
  helperText?: string;
  isImage?: boolean;
}

export function FileUpload({
  label,
  value,
  onChange,
  accept = "image/*,application/pdf",
  helperText,
  isImage = false,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processUpload = async (file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      const res = await api.uploadFile(file);
      onChange(res.url, res.filename);
    } catch (err: any) {
      setError(err.message || "Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processUpload(file);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  }, [isDragging]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only reset if leaving the container itself
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processUpload(file);
    }
  }, []);

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
        {label}
      </label>

      <div className="space-y-2">
        {value ? (
          <div className="flex items-center gap-3 p-3 bg-slate-950/60 border border-slate-800 rounded-xl shadow-sm">
            {isImage && (
              <div className="w-14 h-14 rounded-lg bg-slate-800/80 border border-slate-700/50 overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src={value}
                  alt="Uploaded preview"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            )}
            {!isImage && (
              <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-200 truncate" title={value}>
                {value.split("/").pop() || value}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] text-emerald-400 font-semibold">Saved / Ready</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800/80 transition-colors"
              title="Remove file and choose another"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all duration-200 select-none ${
              isDragging
                ? "border-cyan-400 bg-cyan-950/30 text-cyan-300 scale-[1.01] shadow-lg shadow-cyan-950/50"
                : "border-slate-800 hover:border-cyan-500/60 bg-slate-950/40 hover:bg-slate-950/70 text-slate-400 hover:text-slate-300"
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center justify-center py-2 space-y-2">
                <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
                <span className="text-xs text-slate-300 font-medium">Uploading file...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-1 space-y-2">
                <div className={`p-3 rounded-2xl transition-all ${
                  isDragging 
                    ? "bg-cyan-500/20 text-cyan-300 scale-110" 
                    : "bg-slate-800/80 text-slate-300 group-hover:bg-cyan-950 group-hover:text-cyan-400"
                }`}>
                  {isDragging ? (
                    <CloudUpload className="w-6 h-6 animate-bounce" />
                  ) : (
                    <Upload className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-200">
                    {isDragging ? (
                      <span className="text-cyan-400">Drop file here to upload</span>
                    ) : (
                      <>
                        <span className="text-cyan-400 underline decoration-cyan-500/40 underline-offset-2">Browse file</span> or drag & drop here
                      </>
                    )}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {helperText || (isImage ? "Supported image formats: PNG, JPG, JPEG, WEBP, GIF, SVG" : "All file formats supported")}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />

        {error && (
          <div className="flex items-center gap-1.5 text-rose-400 text-xs mt-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
