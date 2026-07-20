(function () {
  "use strict";
  const esc = (value) => String(value).replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[char]));
  const ingredientName = (id) => window.AlchemyData.ingredients.find((item) => item.id === id)?.name || id;
  const effectName = (id) => window.AlchemyData.effects[id]?.name || id;

  function renderDiscoveries(state) {
    const view = document.querySelector('[data-ledger-view="discoveries"]');
    if (!view) return;
    if (!state.discoveries.length) {
      view.innerHTML = `<div class="empty-state"><span>⌁</span><strong>No formulas recorded</strong><p>Brew ingredients with a shared property to begin the ledger.</p></div>`;
      return;
    }
    view.innerHTML = state.discoveries.map((entry) => `<article class="ledger-entry"><header><strong>${esc(entry.name)}</strong><span class="quality-chip" data-quality="${esc(entry.bestQuality)}">${esc(entry.bestQuality)}</span></header><p>${entry.ingredientIds.map(ingredientName).map(esc).join(" + ")}</p><dl class="effect-list"><div><dt>Effects</dt><dd>${entry.effectIds.map(effectName).map(esc).join(", ")}</dd></div><div><dt>Best result</dt><dd>${entry.bestScore}%</dd></div><div><dt>Brews</dt><dd>${entry.timesBrewed}</dd></div></dl></article>`).join("");
  }

  function renderOrders(state) {
    const view = document.querySelector('[data-ledger-view="orders"]');
    if (!view) return;
    if (!state.activeOrders.length) {
      view.innerHTML = `<div class="empty-state"><span>◇</span><strong>No open orders</strong><p>Forage to advance the day and bring in new customers.</p></div>`;
      return;
    }
    view.innerHTML = state.activeOrders.map((order) => {
      const match = window.AlchemyCustomers.matchingPotion(state, order);
      return `<article class="order-card"><div class="order-card__header"><strong>${esc(order.title)}</strong><span class="status-chip">Day ${order.deadlineDay}</span></div><p>“${esc(order.request)}”</p><div class="order-card__reward"><span>Needs</span><strong>${esc(effectName(order.effect))} · ${order.minimumQuality}%+</strong></div><div class="order-card__reward"><span>Reward</span><strong>${order.reward} gold</strong></div><div class="order-card__actions"><button class="button button--primary" type="button" data-fulfill-order="${esc(order.id)}" ${match ? "" : "disabled"}>${match ? `Deliver ${esc(match.quality)}` : "No matching potion"}</button></div></article>`;
    }).join("");
  }

  function renderStock(state) {
    const view = document.querySelector('[data-ledger-view="stock"]');
    if (!view) return;
    if (!state.potions.length) {
      view.innerHTML = `<div class="empty-state"><span>⚗</span><strong>No bottled potions</strong><p>Successful brews are stored here until sold or delivered.</p></div>`;
      return;
    }
    view.innerHTML = state.potions.map((potion) => `<article class="stock-card"><div class="stock-card__header"><strong>${esc(potion.name)}</strong><span class="quality-chip" data-quality="${esc(potion.quality)}">${esc(potion.quality)}</span></div><p>${potion.effectIds.map(effectName).map(esc).join(" · ")}${potion.sideEffectId ? ` · Side effect: ${esc(effectName(potion.sideEffectId))}` : ""}</p><div class="stock-card__meta"><span>Potency ${potion.score}%</span><strong>${potion.value}g</strong></div><div class="stock-card__actions"><button class="button button--secondary" type="button" data-sell-potion="${esc(potion.id)}">Sell to walk-in</button></div></article>`).join("");
  }

  function render(state) {
    renderDiscoveries(state); renderOrders(state); renderStock(state);
    document.querySelectorAll("[data-discovery-count]").forEach((node) => { node.textContent = String(state.discoveries.length); });
    document.querySelectorAll("[data-potion-count]").forEach((node) => { node.textContent = String(state.potions.length); });
  }
  window.LedgerUI = { render };
})();
