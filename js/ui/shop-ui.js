(function () {
  "use strict";
  const esc = (value) => String(value).replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[char]));
  function render(state) {
    const view = document.querySelector('[data-ledger-view="shop"]');
    if (!view) return;
    view.innerHTML = window.AlchemyData.upgrades.map((upgrade) => {
      const owned = state.upgrades.includes(upgrade.id);
      const affordable = state.gold >= upgrade.cost;
      return `<article class="upgrade-card"><div class="upgrade-card__header"><strong>${esc(upgrade.name)}</strong><span class="status-chip">${owned ? "Installed" : `${upgrade.cost}g`}</span></div><p>${esc(upgrade.description)}</p><p><strong>${esc(upgrade.bonus)}</strong></p><div class="upgrade-card__footer"><span></span><button class="button ${owned ? "button--secondary" : "button--primary"}" type="button" data-buy-upgrade="${esc(upgrade.id)}" ${owned || !affordable ? "disabled" : ""}>${owned ? "Installed" : affordable ? "Purchase" : "Insufficient gold"}</button></div></article>`;
    }).join("");
  }
  window.ShopUI = { render };
})();
