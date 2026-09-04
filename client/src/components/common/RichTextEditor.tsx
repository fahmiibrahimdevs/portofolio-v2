import React, { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Eye,
  Edit3,
  Code,
  FileCode,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Upload,
  X,
  Loader2,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { api } from "../../api/client";
import { formatMarkdownToHtml } from "../../utils/markdown";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  minHeight?: string;
  required?: boolean;
  helperText?: string;
}

export function RichTextEditor({
  value = "",
  onChange,
  label,
  placeholder = "Write content, documentation, or notes with full Markdown & formatting support...",
  minHeight = "min-h-[180px]",
  required = false,
  helperText,
}: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Link Modal
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  // Image Modal
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Exit fullscreen on Escape
  useEffect(() => {
    const handleKeyDownGlobal = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDownGlobal);
    return () => window.removeEventListener("keydown", handleKeyDownGlobal);
  }, [isFullscreen]);

  // Insert formatting at cursor / selection
  const insertFormatting = (before: string, after: string = "", defaultText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end) || defaultText;

    const newText =
      value.substring(0, start) +
      before +
      selected +
      after +
      value.substring(end);

    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      const newCursor = start + before.length + selected.length;
      textarea.setSelectionRange(newCursor, newCursor);
    }, 0);
  };

  const insertHeading = (level: 1 | 2 | 3) => {
    const prefix = level === 1 ? "# " : level === 2 ? "## " : "### ";
    const defaultText = level === 1 ? "Main Heading" : level === 2 ? "Sub Heading" : "Section Heading";

    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);

    const needsLeadingNewline = start > 0 && value[start - 1] !== "\n";
    const leading = needsLeadingNewline ? "\n" : "";

    const textToInsert = selected ? `${leading}${prefix}${selected}` : `${leading}${prefix}${defaultText}\n`;

    const newText = value.substring(0, start) + textToInsert + value.substring(end);
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      const newCursor = start + textToInsert.length;
      textarea.setSelectionRange(newCursor, newCursor);
    }, 0);
  };

  const insertCodeBlock = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end) || "// Write code here\nconsole.log('Hello World');";

    const needsLeadingNewline = start > 0 && value[start - 1] !== "\n";
    const leading = needsLeadingNewline ? "\n" : "";

    const codeSnippet = `${leading}\`\`\`typescript\n${selected}\n\`\`\`\n`;

    const newText = value.substring(0, start) + codeSnippet + value.substring(end);
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      const newCursor = start + codeSnippet.length;
      textarea.setSelectionRange(newCursor, newCursor);
    }, 0);
  };

  const toggleBulletList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const val = value;

    if (start !== end) {
      const lineStart = val.lastIndexOf("\n", start - 1) + 1;
      const lineEnd = val.indexOf("\n", end);
      const effectiveLineEnd = lineEnd === -1 ? val.length : lineEnd;
      const selectedText = val.substring(lineStart, effectiveLineEnd);
      const lines = selectedText.split("\n");

      const allBulleted = lines.every((l) => l.trim().startsWith("- ") || l.trim().startsWith("* "));
      const newLines = lines.map((line) => {
        if (allBulleted) {
          return line.replace(/^(\s*)([-*]\s+)/, "$1");
        } else {
          return line.trim().startsWith("- ") ? line : `  - ${line.trimStart()}`;
        }
      });

      const replaced = newLines.join("\n");
      const newVal = val.substring(0, lineStart) + replaced + val.substring(effectiveLineEnd);
      onChange(newVal);
    } else {
      insertFormatting("  - ", "", "Bullet item");
    }
  };

  const toggleNumberedList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const val = value;

    if (start !== end) {
      const lineStart = val.lastIndexOf("\n", start - 1) + 1;
      const lineEnd = val.indexOf("\n", end);
      const effectiveLineEnd = lineEnd === -1 ? val.length : lineEnd;
      const selectedText = val.substring(lineStart, effectiveLineEnd);
      const lines = selectedText.split("\n");

      const allNumbered = lines.every((l) => /^\s*\d+\.\s+/.test(l));
      const newLines = lines.map((line, idx) => {
        if (allNumbered) {
          return line.replace(/^(\s*)\d+\.\s+/, "$1");
        } else {
          return `  ${idx + 1}. ${line.replace(/^(\s*)([-*]|\d+\.)\s+/, "")}`;
        }
      });

      const replaced = newLines.join("\n");
      const newVal = val.substring(0, lineStart) + replaced + val.substring(effectiveLineEnd);
      onChange(newVal);
    } else {
      insertFormatting("  1. ", "", "First step");
    }
  };

  // Keyboard navigation & smart list indentation on Enter / Tab
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const val = textarea.value;

    // 1. Handle Tab / Shift+Tab indentation
    if (e.key === "Tab") {
      e.preventDefault();
      const lineStart = val.lastIndexOf("\n", start - 1) + 1;
      const lineEnd = val.indexOf("\n", end);
      const effectiveLineEnd = lineEnd === -1 ? val.length : lineEnd;
      const selectedText = val.substring(lineStart, effectiveLineEnd);

      if (e.shiftKey) {
        // Unindent
        const lines = selectedText.split("\n");
        const unindented = lines
          .map((line) => (line.startsWith("  ") ? line.slice(2) : line.startsWith(" ") ? line.slice(1) : line))
          .join("\n");
        const diff = selectedText.length - unindented.length;
        const newVal = val.substring(0, lineStart) + unindented + val.substring(effectiveLineEnd);
        onChange(newVal);
        setTimeout(() => {
          textarea.setSelectionRange(Math.max(lineStart, start - (diff > 0 ? 2 : 0)), end - diff);
        }, 0);
      } else {
        // Indent
        if (start !== end && selectedText.includes("\n")) {
          const lines = selectedText.split("\n");
          const indented = lines.map((line) => "  " + line).join("\n");
          const newVal = val.substring(0, lineStart) + indented + val.substring(effectiveLineEnd);
          onChange(newVal);
          setTimeout(() => {
            textarea.setSelectionRange(start + 2, end + lines.length * 2);
          }, 0);
        } else {
          const newVal = val.substring(0, start) + "  " + val.substring(end);
          onChange(newVal);
          setTimeout(() => {
            textarea.setSelectionRange(start + 2, start + 2);
          }, 0);
        }
      }
      return;
    }

    // 2. Handle Enter key for lists auto-continue with indentation
    if (e.key === "Enter" && !e.shiftKey) {
      const lineStart = val.lastIndexOf("\n", start - 1) + 1;
      const currentLine = val.substring(lineStart, start);

      // Check for numbered list: e.g. "  1. item", "1. item", "12. item"
      const numMatch = currentLine.match(/^(\s*)(\d+)\.\s*(.*)$/);
      if (numMatch) {
        e.preventDefault();
        const [, indent, numStr, textAfter] = numMatch;
        const currentNum = parseInt(numStr, 10);

        // If empty item (e.g. "  1. "), exit list mode by clearing prefix
        if (!textAfter.trim()) {
          const newVal = val.substring(0, lineStart) + val.substring(start);
          onChange(newVal);
          setTimeout(() => {
            textarea.setSelectionRange(lineStart, lineStart);
          }, 0);
          return;
        }

        const nextNum = currentNum + 1;
        const safeIndent = indent || "  ";
        const insertText = `\n${safeIndent}${nextNum}. `;
        const newVal = val.substring(0, start) + insertText + val.substring(end);
        onChange(newVal);
        setTimeout(() => {
          const newPos = start + insertText.length;
          textarea.setSelectionRange(newPos, newPos);
        }, 0);
        return;
      }

      // Check for bullet list: e.g. "  - item", "- item", "* item"
      const bulletMatch = currentLine.match(/^(\s*)([-*])\s*(.*)$/);
      if (bulletMatch) {
        e.preventDefault();
        const [, indent, bulletChar, textAfter] = bulletMatch;

        // If empty bullet item (e.g. "  - "), exit list mode by clearing prefix
        if (!textAfter.trim()) {
          const newVal = val.substring(0, lineStart) + val.substring(start);
          onChange(newVal);
          setTimeout(() => {
            textarea.setSelectionRange(lineStart, lineStart);
          }, 0);
          return;
        }

        const safeIndent = indent || "  ";
        const insertText = `\n${safeIndent}${bulletChar} `;
        const newVal = val.substring(0, start) + insertText + val.substring(end);
        onChange(newVal);
        setTimeout(() => {
          const newPos = start + insertText.length;
          textarea.setSelectionRange(newPos, newPos);
        }, 0);
        return;
      }
    }
  };

  const handleOpenLinkModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const textarea = textareaRef.current;
    if (textarea) {
      const selected = value.substring(textarea.selectionStart, textarea.selectionEnd);
      if (selected) setLinkText(selected);
    }
    setLinkUrl("");
    setShowLinkModal(true);
  };

  const handleInsertLink = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!linkUrl.trim()) return;

    const finalUrl = linkUrl.startsWith("http://") || linkUrl.startsWith("https://")
      ? linkUrl.trim()
      : `https://${linkUrl.trim()}`;
    const finalText = linkText.trim() || finalUrl;

    const linkMarkdown = `[${finalText}](${finalUrl})`;
    insertFormatting(linkMarkdown, "", "");

    setShowLinkModal(false);
    setLinkText("");
    setLinkUrl("");
  };

  const handleOpenImageModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const textarea = textareaRef.current;
    if (textarea) {
      const selected = value.substring(textarea.selectionStart, textarea.selectionEnd);
      if (selected) setImageAlt(selected);
    }
    setImageUrl("");
    setShowImageModal(true);
  };

  const handleInsertImageUrl = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!imageUrl.trim()) return;

    const alt = imageAlt.trim() || "Image";
    const imgMarkdown = `\n![${alt}](${imageUrl.trim()})\n`;
    insertFormatting(imgMarkdown, "", "");

    setShowImageModal(false);
    setImageUrl("");
    setImageAlt("");
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    const imageFiles = fileList.filter(
      (f) => f.type.startsWith("image/") || /\.(png|jpe?g|webp|gif|svg|bmp)$/i.test(f.name)
    );

    if (imageFiles.length === 0) {
      setUploadError("Only image files (PNG, JPG, WEBP, GIF, SVG) are supported.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    let insertedSnippets = "";

    try {
      for (const file of imageFiles) {
        const res = await api.uploadFile(file);
        const alt = file.name.replace(/\.[^/.]+$/, "").replace(/[_\-]+/g, " ").trim();
        insertedSnippets += `\n![${alt}](${res.url})\n`;
      }

      if (insertedSnippets) {
        insertFormatting(insertedSnippets, "", "");
        setShowImageModal(false);
      }
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload image.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className={isFullscreen ? "fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md p-4 sm:p-6 flex flex-col animate-in fade-in duration-150" : "space-y-1.5"}>
      {label && !isFullscreen && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            {label} {required && <span className="text-rose-400">*</span>}
          </label>
          <span className="text-[10px] text-slate-500">WYSIWYG Markdown & Code Highlighting</span>
        </div>
      )}

      {/* Editor Box */}
      <div className={`bg-slate-950/80 rounded-2xl border border-slate-800 shadow-xl overflow-hidden focus-within:border-cyan-500 transition-colors flex flex-col ${isFullscreen ? "flex-1 min-h-0" : ""}`}>
        {/* Toolbar */}
        <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 border-b border-slate-800 gap-2 flex-wrap shrink-0">
          {/* Formatting Controls */}
          <div className="flex items-center gap-1 flex-wrap">
            {/* Headings */}
            <button
              type="button"
              onClick={() => insertHeading(1)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
              title="Heading 1 (H1)"
            >
              <Heading1 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertHeading(2)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
              title="Heading 2 (H2)"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertHeading(3)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
              title="Heading 3 (H3)"
            >
              <Heading3 className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-slate-800 mx-0.5" />

            {/* Inline Styles */}
            <button
              type="button"
              onClick={() => insertFormatting("**", "**", "bold text")}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
              title="Bold"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("*", "*", "italic text")}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
              title="Italic"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("<u>", "</u>", "underlined text")}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
              title="Underline"
            >
              <Underline className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("~~", "~~", "strikethrough")}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
              title="Strikethrough"
            >
              <Strikethrough className="w-3.5 h-3.5" />
            </button>

            <div className="h-4 w-px bg-slate-800 mx-0.5" />

            {/* Code */}
            <button
              type="button"
              onClick={() => insertFormatting("`", "`", "inline code")}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
              title="Inline Code"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={insertCodeBlock}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
              title="Code Block with Syntax Highlighting"
            >
              <FileCode className="w-3.5 h-3.5 text-cyan-400" />
            </button>

            <div className="h-4 w-px bg-slate-800 mx-0.5" />

            {/* Lists & Quotes */}
            <button
              type="button"
              onClick={toggleBulletList}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
              title="Bullet List"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={toggleNumberedList}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
              title="Numbered List"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("> ", "", "Important note or quote")}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
              title="Quote / Callout"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>

            <div className="h-4 w-px bg-slate-800 mx-0.5" />

            {/* Hyperlink */}
            <button
              type="button"
              onClick={handleOpenLinkModal}
              className="px-2 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-cyan-950/40 border border-transparent hover:border-cyan-800/40 transition-colors flex items-center gap-1"
              title="Insert Link"
            >
              <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Link</span>
            </button>

            {/* Image Upload / URL */}
            <button
              type="button"
              onClick={handleOpenImageModal}
              className="px-2 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-emerald-400 hover:bg-emerald-950/40 border border-transparent hover:border-emerald-800/40 transition-colors flex items-center gap-1"
              title="Insert Image"
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>Image</span>
            </button>
          </div>

          {/* Right Actions: Write/Preview & Fullscreen */}
          <div className="flex items-center gap-2">
            {/* Tab Switcher: Write vs Preview */}
            <div className="flex items-center bg-slate-950 p-0.5 rounded-xl border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("write")}
                className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === "write"
                    ? "bg-cyan-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Write</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === "preview"
                    ? "bg-cyan-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
            </div>

            {/* Fullscreen Expand/Collapse Button */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 rounded-xl transition-colors border border-slate-800"
              title={isFullscreen ? "Exit Fullscreen (Esc)" : "Fullscreen Mode"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 text-amber-400" />
              ) : (
                <Maximize2 className="w-4 h-4 text-slate-300" />
              )}
            </button>
          </div>
        </div>

        {/* Editor or Preview Content */}
        {activeTab === "write" ? (
          <textarea
            ref={textareaRef}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`w-full p-4 text-xs sm:text-sm text-slate-100 bg-transparent font-mono leading-[1.5] placeholder:text-slate-600 focus:outline-none ${
              isFullscreen ? "flex-1 resize-none overflow-y-auto" : `resize-y ${minHeight}`
            }`}
          />
        ) : (
          <div
            className={`p-4 sm:p-6 text-xs sm:text-sm bg-slate-950/50 overflow-y-auto prose prose-invert rich-content max-w-none leading-[1.5] ${
              isFullscreen ? "flex-1" : minHeight
            }`}
            dangerouslySetInnerHTML={{ __html: formatMarkdownToHtml(value) }}
          />
        )}
      </div>

      {helperText && !isFullscreen && (
        <p className="text-[11px] text-slate-500 mt-1">{helperText}</p>
      )}

      {/* Hyperlink Dialog Modal (Uses DIV to prevent nested form submissions) */}
      {showLinkModal && (
        <div
          className="fixed inset-0 z-[110] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-sm w-full p-5 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-cyan-400" />
                <span>Insert Hyperlink</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Link Text</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.stopPropagation();
                      handleInsertLink(e);
                    }
                  }}
                  placeholder="e.g. Architecture Documentation or GitHub"
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">
                  Target URL <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.stopPropagation();
                      handleInsertLink(e);
                    }
                  }}
                  placeholder="https://example.com or github.com/user/repo"
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleInsertLink}
                  disabled={!linkUrl.trim()}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 rounded-xl shadow-md transition-all"
                >
                  Insert Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal (Uses DIV to prevent nested form submissions) */}
      {showImageModal && (
        <div
          className="fixed inset-0 z-[110] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-5 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span>Insert Image</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {uploadError && (
              <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-800/40 text-rose-300 text-xs">
                {uploadError}
              </div>
            )}

            {/* Option 1: Upload File from PC */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-slate-300">Upload from Device</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-800 hover:border-slate-700 bg-slate-950/50 hover:bg-slate-950 rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2"
              >
                {isUploading ? (
                  <div className="flex flex-col items-center gap-2 py-2">
                    <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
                    <span className="text-xs text-slate-400">Uploading and embedding image...</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs text-slate-300 font-medium">Click to choose image file</span>
                    <span className="text-[10px] text-slate-500">PNG, JPG, WEBP, GIF, SVG</span>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageFileChange}
                className="hidden"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="h-px bg-slate-800 flex-1" />
              <span className="text-[10px] text-slate-500 uppercase font-semibold">OR ENTER IMAGE URL</span>
              <div className="h-px bg-slate-800 flex-1" />
            </div>

            {/* Option 2: Image URL */}
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Web Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.stopPropagation();
                      handleInsertImageUrl(e);
                    }
                  }}
                  placeholder="https://example.com/screenshot.png"
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Image Alt Text / Description</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.stopPropagation();
                      handleInsertImageUrl(e);
                    }
                  }}
                  placeholder="e.g. System Wiring Diagram or Architecture Overview"
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowImageModal(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleInsertImageUrl}
                  disabled={!imageUrl.trim() || isUploading}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-xl shadow-md transition-all"
                >
                  Insert Image URL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
