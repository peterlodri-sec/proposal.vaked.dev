// badge.js — live status badge for proposal.vaked.dev
// Displays dogfeed loop metrics in the footer status indicator.
(function () {
  "use strict";

  const API = "https://huggingface.co/api/datasets/PeetPedro/ultrawhale-dogfood";
  const REFRESH_MS = 60_000;

  // Find the status indicator element in footer
  const statusDot = document.querySelector("footer .bg-brand-emerald, footer .animate-pulse");
  const statusText = document.querySelector("footer .text-slate-500");

  async function refresh() {
    try {
      const resp = await fetch(API, { cache: "no-cache" });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();

      const lastModified = data.lastModified || data.sha?.slice(0, 7) || "?";

      // Update the status dot color
      if (statusDot) {
        statusDot.className = statusDot.className.replace(
          /bg-brand-emerald|bg-yellow-400|bg-red-400/,
          "bg-brand-emerald"
        );
      }

      // Update the status text
      const ago = lastModified === "?" ? "unknown"
        : `last push: ${lastModified}`;
      if (statusText) {
        const span = statusText.querySelector("span") || statusText;
        // Replace the "All Systems Operational" text
        const link = span.querySelector("a") || span;
        if (link) {
          link.textContent = `🐾 dogfeed ${ago}`;
          link.href = "https://huggingface.co/datasets/PeetPedro/ultrawhale-dogfood/commits/main";
        }
      }
    } catch {
      // Silently degrade — the static "All Systems Operational" is fine
      if (statusDot && statusDot.classList.contains("animate-pulse")) {
        statusDot.className = statusDot.className.replace(
          /bg-brand-emerald/,
          "bg-yellow-400"
        );
      }
    }
  }

  refresh();
  setInterval(refresh, REFRESH_MS);
})();
