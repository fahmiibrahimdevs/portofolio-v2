import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Global Event Listener for Markdown Code Copy Buttons
if (typeof window !== "undefined") {
  document.addEventListener("click", (e) => {
    const target = (e.target as HTMLElement)?.closest(".code-copy-btn") as HTMLButtonElement | null;
    if (!target) return;

    const wrapper = target.closest(".code-block-wrapper");
    const codeEl = wrapper?.querySelector("code");
    if (!codeEl) return;

    const textToCopy = codeEl.innerText || codeEl.textContent || "";
    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalHtml = target.innerHTML;
      target.innerHTML = `<svg class="w-3.5 h-3.5 text-emerald-400 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg><span class="text-emerald-400 font-semibold">Copied!</span>`;
      target.classList.add("border-emerald-500/40", "bg-emerald-500/10");
      setTimeout(() => {
        target.innerHTML = originalHtml;
        target.classList.remove("border-emerald-500/40", "bg-emerald-500/10");
      }, 2000);
    }).catch((err) => {
      console.error("Failed to copy code snippet:", err);
    });
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
