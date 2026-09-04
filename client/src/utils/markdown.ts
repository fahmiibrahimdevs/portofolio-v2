import { marked, Renderer } from "marked";
import hljs from "highlight.js";

// Custom Renderer for Tailored Styling & Syntax Highlighting
const renderer = new Renderer();

// Headings Hierarchy (No underline on H1, clean top spacing)
renderer.heading = function ({ tokens, depth }) {
  const text = this.parser.parseInline(tokens);
  if (depth === 1) {
    return `<h1 class="text-2xl sm:text-3xl font-extrabold text-slate-100 first:mt-0 mt-6 mb-3 tracking-tight leading-[1.3]">${text}</h1>`;
  }
  if (depth === 2) {
    return `<h2 class="text-xl sm:text-2xl font-extrabold text-cyan-400 first:mt-0 mt-5 mb-2.5 tracking-tight leading-[1.35]">${text}</h2>`;
  }
  if (depth === 3) {
    return `<h3 class="text-lg sm:text-xl font-bold text-slate-100 first:mt-0 mt-4 mb-2 tracking-tight leading-[1.4]">${text}</h3>`;
  }
  return `<h4 class="text-base sm:text-lg font-bold text-slate-200 first:mt-0 mt-3 mb-1.5 tracking-tight leading-[1.4]">${text}</h4>`;
};

// Helper to validate safe URLs
function isSafeUrl(url?: string): boolean {
  if (!url) return false;
  const trimmed = url.trim().toLowerCase();
  // Allow relative links, anchors, http/https, mailto, tel
  return /^(https?:\/\/|\/|#|mailto:|tel:)/i.test(trimmed);
}

// Hyperlinks
renderer.link = function ({ href, title, tokens }) {
  const text = this.parser.parseInline(tokens);
  const titleAttr = title ? `title="${title}"` : "";
  const safeHref = isSafeUrl(href) ? href : "#";
  return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:text-cyan-300 underline font-medium inline-flex items-center gap-1 transition-colors" ${titleAttr}>${text} ↗</a>`;
};

// Images (Aesthetic Centered Card, Auto-Hug Dimensions, Zoom Hover & Smart Caption Pill)
renderer.image = function ({ href, title, text }) {
  const rawCaption = (text || title || "").trim();
  const cleanCaption = rawCaption.replace(/[_\-]+/g, " ").trim();
  const isGeneric = !cleanCaption || /^(image|gambar|foto|photo|screenshot|attachment|untitled)$/i.test(cleanCaption) || cleanCaption === href;
  const displayCaption = isGeneric ? "" : cleanCaption;
  const safeSrc = (href && /^(https?:\/\/|\/|data:image\/)/i.test(href.trim())) ? href : "";

  return `<figure class="my-5 flex flex-col items-center justify-center text-center not-prose first:mt-0">
    <div class="inline-block relative max-w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-2 sm:p-2.5 shadow-2xl transition-all duration-300 hover:border-cyan-500/40 hover:shadow-cyan-500/5 group">
      <a href="${safeSrc || '#'}" target="_blank" rel="noopener noreferrer" class="block overflow-hidden rounded-xl relative group/img cursor-zoom-in" title="Klik untuk membuka gambar resolusi penuh">
        <img
          src="${safeSrc}"
          alt="${displayCaption || "Gambar lampiran"}"
          class="max-h-[480px] w-auto max-w-full rounded-xl object-contain mx-auto block transition-transform duration-300 group-hover/img:scale-[1.01]"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-slate-950/25 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none rounded-xl backdrop-blur-[1px]">
          <span class="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-xs font-semibold text-cyan-300 shadow-xl flex items-center gap-1.5">
            Buka Resolusi Penuh ↗
          </span>
        </div>
      </a>
    </div>
    ${displayCaption ? `<figcaption class="mt-2.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 font-medium tracking-wide inline-flex items-center gap-2 max-w-full shadow-sm"><span class="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></span><span class="truncate">${displayCaption}</span></figcaption>` : ""}
  </figure>`;
};

// Language mapper for aesthetic badges
const langNameMap: Record<string, string> = {
  js: "JavaScript",
  javascript: "JavaScript",
  ts: "TypeScript",
  typescript: "TypeScript",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  py: "Python",
  python: "Python",
  sh: "Bash",
  bash: "Bash",
  shell: "Shell",
  json: "JSON",
  sql: "SQL",
  php: "PHP",
  cpp: "C++",
  c: "C",
  cs: "C#",
  csharp: "C#",
  go: "Go",
  rust: "Rust",
  yaml: "YAML",
  yml: "YAML",
  xml: "XML",
  markdown: "Markdown",
  md: "Markdown",
  diff: "Diff",
  docker: "Dockerfile",
  dockerfile: "Dockerfile",
};

// Code Blocks with Highlight.js
renderer.code = function ({ text, lang }) {
  const cleanLang = (lang || "").trim().toLowerCase();
  let highlighted = "";
  try {
    if (cleanLang && hljs.getLanguage(cleanLang)) {
      highlighted = hljs.highlight(text, { language: cleanLang, ignoreIllegals: true }).value;
    } else {
      highlighted = hljs.highlightAuto(text).value;
    }
  } catch {
    highlighted = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  const displayLang = cleanLang ? (langNameMap[cleanLang] || cleanLang.toUpperCase()) : "Code";

  return `<div class="code-block-wrapper not-prose my-5 rounded-2xl overflow-hidden border border-slate-800 bg-[#0d1117] shadow-2xl transition-all duration-300 hover:border-slate-700/80 group/code">
    <div class="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between select-none">
      <div class="flex items-center gap-2.5">
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-full bg-rose-500/90 inline-block shadow-sm"></span>
          <span class="w-3 h-3 rounded-full bg-amber-500/90 inline-block shadow-sm"></span>
          <span class="w-3 h-3 rounded-full bg-emerald-500/90 inline-block shadow-sm"></span>
        </div>
        <span class="ml-1 px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-mono font-semibold text-cyan-400 tracking-wider">${displayLang}</span>
      </div>
      <button type="button" class="code-copy-btn flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-400 hover:text-slate-100 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-all duration-150 cursor-pointer shadow-sm active:scale-95" title="Copy code snippet">
        <svg class="w-3.5 h-3.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/></svg>
        <span class="pointer-events-none">Copy</span>
      </button>
    </div>
    <pre class="m-0! p-4! sm:p-5! overflow-x-auto text-[13px] sm:text-sm font-mono leading-[1.65] bg-[#0d1117] text-slate-100 border-0! rounded-none! custom-scrollbar"><code class="hljs ${cleanLang ? `language-${cleanLang}` : ''} bg-transparent! p-0! font-mono">${highlighted}</code></pre>
  </div>`;
};

// Inline Code Snippets
renderer.codespan = function ({ text }) {
  return `<code class="px-1.5 py-0.5 mx-0.5 rounded-md bg-slate-800/90 text-cyan-300 font-mono text-[0.875em] border border-slate-700/60 font-medium">${text}</code>`;
};

// Lists (Ordered & Unordered with 1.5 line height & clean indentation)
renderer.list = function ({ ordered, items }) {
  const body = items.map((item) => this.listitem(item)).join("");
  const tag = ordered ? "ol" : "ul";
  const listClass = ordered
    ? "list-decimal ml-6 pl-2 space-y-1.5 my-3 text-slate-300 leading-[1.5]"
    : "list-disc ml-6 pl-2 space-y-1.5 my-3 text-slate-300 leading-[1.5]";
  return `<${tag} class="${listClass}">\n${body}</${tag}>\n`;
};

renderer.listitem = function ({ tokens }) {
  const text = this.parser.parse(tokens);
  return `<li class="leading-[1.5] pl-1">${text}</li>\n`;
};

// Blockquotes
renderer.blockquote = function ({ tokens }) {
  const quote = this.parser.parse(tokens);
  return `<blockquote class="border-l-4 border-cyan-500 bg-slate-950/60 pl-4 py-2.5 my-3.5 text-slate-300 italic rounded-r-xl leading-[1.5]">${quote}</blockquote>`;
};

marked.use({
  renderer,
  breaks: true, // Convert every single newline into <br> so lines never merge accidentally
  gfm: true,
});

/**
 * Parses and formats Markdown & HTML content safely for rich preview & detail modals.
 */
export function formatMarkdownToHtml(content?: string): string {
  if (!content || !content.trim() || content === "-") {
    return "<p class='text-slate-400 italic text-sm'>No content provided.</p>";
  }

  let text = content.trim();

  // Resolve legacy storage paths
  text = text.replace(
    /src="\/storage\/image\/([^"]+)"/g,
    'src="https://pub-86b20ee5713942938c6c816f94e1eca1.r2.dev/portofolio/images/$1"'
  );

  try {
    return marked.parse(text) as string;
  } catch (err) {
    console.error("Markdown parse error:", err);
    return `<p class="text-slate-300 leading-[1.5]">${text.replace(/\n/g, "<br/>")}</p>`;
  }
}
