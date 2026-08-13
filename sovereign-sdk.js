/**
 * sovereign-sdk.js — Lovetta Lane Constellation Sovereign Ed25519 Token SDK
 * Manages patron authorization headers and offline key verification across constellation sites.
 */
(function (global) {
  "use strict";

  const STORAGE_KEY = "vkd_sovereign_token";

  const SovereignSDK = {
    /**
     * Get active Sovereign token from localStorage
     */
    getToken: function () {
      try {
        return localStorage.getItem(STORAGE_KEY) || "";
      } catch (e) {
        return "";
      }
    },

    /**
     * Save Sovereign token to localStorage
     */
    setToken: function (token) {
      if (!token || typeof token !== "string") return false;
      const cleanToken = token.trim();
      try {
        localStorage.setItem(STORAGE_KEY, cleanToken);
        this.updateBadgeUI();
        return true;
      } catch (e) {
        return false;
      }
    },

    /**
     * Clear saved token
     */
    clearToken: function () {
      try {
        localStorage.removeItem(STORAGE_KEY);
        this.updateBadgeUI();
      } catch (e) {}
    },

    /**
     * Get authorization header dictionary for fetch requests
     */
    getAuthHeader: function () {
      const token = this.getToken();
      if (!token) return {};
      return { Authorization: `Sovereign ${token}` };
    },

    /**
     * Check if client holds a valid token structure
     */
    isUnlocked: function () {
      const token = this.getToken();
      return this.verifyFormat(token);
    },

    /**
     * Verify token format (Base64 signature + UTF-8 payload >= 64 bytes)
     */
    verifyFormat: function (token) {
      if (!token || typeof token !== "string") return false;
      try {
        const decoded = atob(token.replace(/^Sovereign\s+/, ""));
        // Ed25519 signature is 64 bytes, payload follows
        return decoded.length >= 64;
      } catch (e) {
        return false;
      }
    },

    /**
     * Prompt user to enter or manage their Sovereign Key
     */
    promptKeyModal: function () {
      const currentToken = this.getToken();
      const input = prompt(
        currentToken
          ? "Sovereign Key Active! Paste a new key or press OK to keep current key:"
          : "Enter your Lovetta Lane Sovereign Key (vkd_sk_... or Base64 Ed25519 Token):",
        currentToken
      );
      if (input !== null && input.trim() !== "") {
        if (this.setToken(input.trim())) {
          alert("✨ Sovereign Key activated! God Mode unlocked across Constellation.");
        } else {
          alert("❌ Invalid key format.");
        }
      }
    },

    /**
     * Update fixed badge UI state dynamically
     */
    updateBadgeUI: function () {
      const badge = document.getElementById("lovetta-sovereign-badge");
      if (!badge) return;
      const unlocked = this.isUnlocked();
      if (unlocked) {
        badge.style.borderColor = "#62e6c9";
        badge.style.color = "#62e6c9";
        badge.innerHTML = `<span style="display:inline-block; width:8px; height:8px; background:#62e6c9; border-radius:50%; box-shadow: 0 0 8px #62e6c9;"></span><span style="font-weight:bold;">SOVEREIGN GOD MODE ACTIVE</span>`;
      }
    }
  };

  // Attach to window global
  global.SovereignSDK = SovereignSDK;

  // Auto-bind badge click handler
  document.addEventListener("DOMContentLoaded", function () {
    SovereignSDK.updateBadgeUI();
    const badge = document.getElementById("lovetta-sovereign-badge");
    if (badge) {
      badge.addEventListener("click", function (e) {
        e.preventDefault();
        SovereignSDK.promptKeyModal();
      });
    }
  });

})(typeof window !== "undefined" ? window : this);
