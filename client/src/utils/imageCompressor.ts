/**
 * Utility for client-side progressive image compression & optimization.
 * Converts heavy images (PNG/JPEG) into ultra-lightweight, crisp WebP format
 * while preserving aspect ratio and sharp high-DPI detail.
 */

export interface CompressionProgress {
  percent: number;
  stage: string;
  originalSize?: number;
  compressedSize?: number;
  savedPercent?: number;
}

export interface CompressResult {
  file: File;
  originalSize: number;
  compressedSize: number;
  savedPercent: number;
  width: number;
  height: number;
  format: string;
}

export interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  onProgress?: (progress: CompressionProgress) => void;
}

export function formatFileSize(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export async function compressImage(
  file: File,
  options: CompressOptions = {}
): Promise<CompressResult> {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.90,
    onProgress,
  } = options;

  const originalSize = file.size;

  // Non-compressible formats (e.g., SVG, animated GIF) or already small files (< 100KB)
  const isSvg = file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg");
  const isGif = file.type === "image/gif" || file.name.toLowerCase().endsWith(".gif");

  if (isSvg || isGif) {
    onProgress?.({ percent: 100, stage: "File siap diunggah", originalSize, compressedSize: originalSize, savedPercent: 0 });
    return {
      file,
      originalSize,
      compressedSize: originalSize,
      savedPercent: 0,
      width: 0,
      height: 0,
      format: isSvg ? "SVG" : "GIF",
    };
  }

  // Stage 1: Reading file
  onProgress?.({ percent: 15, stage: "Membaca gambar asli...", originalSize });
  await new Promise((r) => setTimeout(r, 150)); // smooth visual feedback

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);
    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };
    image.onerror = (err) => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Gagal membaca gambar"));
    };
    image.src = objectUrl;
  });

  // Stage 2: Calculate target dimensions (Lanczos / Bicubic downscaling bounds)
  onProgress?.({ percent: 40, stage: "Mengoptimasi dimensi & ketajaman...", originalSize });
  await new Promise((r) => setTimeout(r, 150));

  let targetWidth = img.naturalWidth || img.width;
  let targetHeight = img.naturalHeight || img.height;

  if (targetWidth > maxWidth || targetHeight > maxHeight) {
    const ratio = Math.min(maxWidth / targetWidth, maxHeight / targetHeight);
    targetWidth = Math.round(targetWidth * ratio);
    targetHeight = Math.round(targetHeight * ratio);
  }

  // Create Canvas
  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Gagal membuat 2D Canvas Context");
  }

  // High-quality image smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  // Stage 3: Encoding to WebP
  onProgress?.({ percent: 70, stage: "Mengompresi ke WebP 1080p...", originalSize });
  await new Promise((r) => setTimeout(r, 180));

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error("Gagal mengompresi gambar ke WebP"));
      },
      "image/webp",
      quality
    );
  });

  const compressedSize = blob.size;
  const savedPercent = Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100));

  // Determine new file name
  const rawBaseName = file.name.replace(/\.[^/.]+$/, "");
  const compressedFile = new File([blob], `${rawBaseName}.webp`, {
    type: "image/webp",
    lastModified: Date.now(),
  });

  // Stage 4: Ready
  onProgress?.({
    percent: 100,
    stage: savedPercent > 0 
      ? `Optimal! Hemat ${savedPercent}% (${formatFileSize(originalSize)} ➔ ${formatFileSize(compressedSize)})` 
      : "Gambar telah dioptimasi",
    originalSize,
    compressedSize,
    savedPercent,
  });

  return {
    file: compressedFile,
    originalSize,
    compressedSize,
    savedPercent,
    width: targetWidth,
    height: targetHeight,
    format: "WebP",
  };
}
