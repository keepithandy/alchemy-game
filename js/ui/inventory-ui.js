(function () {
  "use strict";
  const esc = (value) => String(value).replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[char]));

  function render(state) {
    const list = document.querySelector("[data-ingredient-list]");
    if (!list) return;
    const search = (document.querySelector("[data-ingredient-search]")?.value || "").trim().toLowerCase();
    const filter = document.querySelector("[data-ingredient-filter]")?.value || "all";
    const ingredients = window.AlchemyData.ingredients.filter((ingredient) => {
      const knownCount = (state.knownEffects[ingredient.id] || []).length;
      const textMatch = !search || ingredient.name.toLowerCase().includes(search) || ingredient.description.toLowerCase().includes(search);
      const filterMatch = filter === "all" || (filter === "known" && knownCount > 0) || (filter === "unknown" && knownCount < ingredient.effects.length) || (filter === "rare" && ingredient.rarity === "rare");
      return textMatch && filterMatch;
    });

    list.innerHTML = ingredients.map((ingredient) => {
      const quantity = state.inventory[ingredient.id] || 0;
      const known = state.knownEffects[ingredient.id] || [];
      const selected = state.selectedIngredients.includes(ingredient.id);
      const dots = ingredient.effects.map((effectId) => `<span class="effect-dot ${known.includes(effectId) ? "is-known" : ""}" title="${known.includes(effectId) ? esc(window.AlchemyData.effects[effectId].name) : "Unknown effect"}"></span>`).join("");
      return `<button class="ingredient-card ${selected ? "is-selected" : ""}" type="button" data-select-ingredient="${esc(ingredient.id)}" ${quantity < 1 ? "disabled" : ""} aria-pressed="${selected}">
        <span class="ingredient-card__icon" aria-hidden="true">${esc(ingredient.glyph)}</span>
        <span class="ingredient-card__content"><strong>${esc(ingredient.name)}</strong><small>${known.length} of 4 effects known · ${esc(ingredient.rarity)}</small></span>
        <span class="ingredient-card__quantity">×${quantity}</span>
        <span class="ingredient-card__effects" aria-label="${known.length} known effects">${dots}</span>
      </button>`;
    }).join("") || `<div class="empty-state"><span>⌁</span><strong>No ingredients match</strong><p>Clear the search or adjust the filter.</p></div>`;

    const total = Object.values(state.inventory).reduce((sum, value) => sum + value, 0);
    document.querySelectorAll("[data-ingredient-count]").forEach((node) => { node.textContent = String(total); });
  }

  window.InventoryUI = { render };
})();
