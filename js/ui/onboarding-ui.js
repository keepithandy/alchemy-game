(function () {
  "use strict";

  const SESSION_KEY = "apothecary-ledger:first-brew-guide-dismissed";

  function initializeFirstBrewGuide() {
    const guide = document.querySelector("[data-first-brew-guide]");
    const dismiss = document.querySelector("[data-dismiss-first-brew-guide]");
    if (!guide || !dismiss) return;

    try {
      if (window.sessionStorage.getItem(SESSION_KEY) === "true") guide.hidden = true;
    } catch (_) {
      // Session storage is optional; the guide remains available when it is blocked.
    }

    dismiss.addEventListener("click", () => {
      guide.hidden = true;
      try {
        window.sessionStorage.setItem(SESSION_KEY, "true");
      } catch (_) {
        // Hiding the guide for the current document is still safe and useful.
      }
    });
  }

  document.addEventListener("DOMContentLoaded", initializeFirstBrewGuide);
})();
