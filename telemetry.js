// telemetry.js — minimal client-side beacon for proposal.vaked.dev
// Fires a lightweight page-view beacon to the dogfeed webhook.
// No cookies. No fingerprinting. Just page + timestamp + referrer.
(function () {
  "use strict";

  const WEBHOOK = "https://proposal.vaked.dev/api/hooks/dogfeed";
  const RATE_MS = 30_000; // throttle: max 1 beacon per 30s

  let lastBeacon = 0;

  function send(mode) {
    const now = Date.now();
    if (now - lastBeacon < RATE_MS) return;
    lastBeacon = now;

    try {
      const payload = JSON.stringify({
        event: "pageview",
        page: window.location.pathname,
        referrer: document.referrer || "(direct)",
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        timestamp_ms: now,
        mode: mode || "load",
      });

      // fire-and-forget via sendBeacon (won't block unload)
      if (navigator.sendBeacon) {
        navigator.sendBeacon(WEBHOOK, new Blob([payload], { type: "application/json" }));
      } else {
        // fallback: sync XHR (less ideal but works)
        const xhr = new XMLHttpRequest();
        xhr.open("POST", WEBHOOK, false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(payload);
      }
    } catch {
      // Never block user experience on telemetry failure
    }
  }

  // Page load beacon
  send("load");

  // Unload beacon (sendBeacon shines here)
  window.addEventListener("beforeunload", function () {
    send("unload");
  });
})();
