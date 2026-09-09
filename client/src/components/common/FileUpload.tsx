import React, { useState, useRef, useCallback } from "react";
import { 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  X, 
  CloudUpload,
  Sparkles,
  Zap
} from "lucide-react";
import { api } from "../../api/client";
import { compressImage, formatFileSize } from "../../utils/imageCompressor";

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

  // Progressive Compression States
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [progressStage, setProgressStage] = useState<string>("");
  const [stats, setStats] = useState<{
    originalSize: number;
    compressedSize: number;
    savedPercent: number;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const processUpload = async (file: File) => {
    setIsUploading(true);
    setError(null);
    setProgressPercent(10);
    setProgressStage("Menyiapkan berkas...");

    try {
      let fileToUpload = file;
      const isImgFile = isImage || file.type.startsWith("image/");
      const isSvg = file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg");
      const isGif = file.type === "image/gif" || file.name.toLowerCase().endsWith(".gif");

      // Auto-compress images client-side to WebP
      if (isImgFile && !isSvg && !isGif) {
        const result = await compressImage(file, {
          maxWidth: 1920,
          maxHeight: 1080,
          quality: 0.90,
          onProgress: (p) => {
            setProgressPercent(Math.min(85, Math.round(p.percent * 0.85)));
            setProgressStage(p.stage);
            if (p.originalSize && p.compressedSize !== undefined) {
              setStats({
                originalSize: p.originalSize,
                compressedSize: p.compressedSize,
                savedPercent: p.savedPercent || 0,
              });
            }
          },
        });

        fileToUpload = result.file;
        setStats({
          originalSize: result.originalSize,
          compressedSize: result.compressedSize,
          savedPercent: result.savedPercent,
        });
      }

      // Uploading to backend
      setProgressPercent(90);
      setProgressStage("Mengunggah ke server...");
      await new Promise((r) => setTimeout(r, 120));

      const res = await api.uploadFile(fileToUpload);

      setProgressPercent(100);
      setProgressStage("Selesai!");
      await new Promise((r) => setTimeout(r, 200));

      onChange(res.url, res.filename);
    } catch (err: any) {
      setError(err.message || "Gagal mengunggah berkas. Silakan coba lagi.");
    } finally {
      setIsUploading(false);
      setProgressPercent(0);
      setProgressStage("");
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
    setStats(null);
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
        {label}
      </label>

      <div className="space-y-2">
        {value ? (
          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl shadow-sm space-y-2">
            <div className="flex items-center gap-3">
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
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <div className="flex items-center gap-1 text-emerald-400 text-[11px] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tersimpan</span>
                  </div>
                  {stats && stats.savedPercent > 0 && (
                    <span className="px-1.5 py-0.5 rounded bg-sky-500/15 border border-sky-500/30 text-[10px] font-mono font-semibold text-sky-300">
                      WebP 1080p • Hemat {stats.savedPercent}% ({formatFileSize(stats.compressedSize)})
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleRemove}
                className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800/80 transition-colors"
                title="Hapus file dan pilih kembali"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : isUploading ? (
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3 shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-xs font-semibold text-slate-100 truncate">
                    {progressStage || "Mengompresi berkas..."}
                  </p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                    <Zap className="w-3 h-3 text-sky-400" />
                    <span>WebP Auto-Compression Engine</span>
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-sky-400 shrink-0 ml-2">
                {progressPercent}%
              </span>
            </div>

            {/* Progressive Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full transition-all duration-300 ease-out shadow-xs shadow-sky-500/50"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Stepper Pills */}
            <div className="grid grid-cols-3 gap-1.5 pt-0.5 text-[10px] font-mono">
              <div
                className={`py-1 px-1.5 rounded-lg border text-center transition-all ${
                  progressPercent >= 20
                    ? "bg-sky-500/10 border-sky-500/30 text-sky-300"
                    : "bg-slate-900/80 border-slate-800 text-slate-500"
                }`}
              >
                1. Baca File
              </div>
              <div
                className={`py-1 px-1.5 rounded-lg border text-center transition-all ${
                  progressPercent >= 60
                    ? "bg-sky-500/10 border-sky-500/30 text-sky-300"
                    : "bg-slate-900/80 border-slate-800 text-slate-500"
                }`}
              >
                2. Kompresi
              </div>
              <div
                className={`py-1 px-1.5 rounded-lg border text-center transition-all ${
                  progressPercent >= 90
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-semibold"
                    : "bg-slate-900/80 border-slate-800 text-slate-500"
                }`}
              >
                3. Simpan
              </div>
            </div>

            {stats && stats.savedPercent > 0 && (
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] flex items-center justify-between transition-all">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Optimalisasi Berhasil</span>
                </span>
                <span className="font-mono font-bold">
                  {formatFileSize(stats.originalSize)} ➔ {formatFileSize(stats.compressedSize)} (-{stats.savedPercent}%)
                </span>
              </div>
            )}
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
                ? "border-cyan-500 bg-cyan-950/20 text-cyan-300 shadow-sm"
                : "border-slate-800 hover:border-cyan-500/60 bg-slate-950/40 hover:bg-slate-950/70 text-slate-400 hover:text-slate-300"
            }`}
          >
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
                  {helperText || (isImage ? "Auto-compress WebP 1080p aktif (PNG, JPG, JPEG, WEBP)" : "All file formats supported")}
                </p>
              </div>
            </div>
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

