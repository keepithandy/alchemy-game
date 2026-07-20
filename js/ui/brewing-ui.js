(function () {
  "use strict";
  const esc = (value) => String(value).replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[char]));
  const grindLabels = { 1:"Coarse", 2:"Medium", 3:"Fine" };
  const heatLabels = { 1:"Cold", 2:"Low", 3:"Warm", 4:"Hot", 5:"Boiling" };

  function renderSlots(state) {
    document.querySelectorAll("[data-slot]").forEach((slot) => {
      const index = Number(slot.dataset.slot);
      const ingredientId = state.selectedIngredients[index];
      const ingredient = window.AlchemyData.ingredients.find((item) => item.id === ingredientId);
      slot.classList.toggle("is-filled", Boolean(ingredient));
      slot.classList.toggle("ingredient-slot--empty", !ingredient && index < 2);
      slot.classList.toggle("ingredient-slot--optional", !ingredient && index === 2);
      if (ingredient) {
        slot.innerHTML = `<span class="ingredient-slot__number">0${index + 1}</span><span class="ingredient-slot__glyph">${esc(ingredient.glyph)}</span><strong>${esc(ingredient.name)}</strong><small>Tap to remove</small>`;
        slot.setAttribute("aria-label", `Remove ${ingredient.name} from slot ${index + 1}`);
      } else {
        slot.innerHTML = `<span class="ingredient-slot__number">0${index + 1}</span><span class="ingredient-slot__glyph">＋</span><strong>${index === 2 ? "Optional catalyst" : "Add ingredient"}</strong><small>${index === 2 ? "Advanced mixtures" : "Required"}</small>`;
        slot.setAttribute("aria-label", `Ingredient slot ${index + 1}`);
      }
    });
  }

  function renderPreview(state) {
    const preview = window.AlchemyBrewing.calculatePreview(state);
    const status = document.querySelector("[data-mixture-status]");
    const mix = document.querySelector("[data-readout-mixture]");
    const stability = document.querySelector("[data-readout-stability]");
    const hint = document.querySelector("[data-process-hint]");
    const apparatus = document.querySelector(".apparatus");
    const brewButton = document.querySelector("[data-start-brew]");
    if (status) status.textContent = state.selectedIngredients.length ? `${state.selectedIngredients.length} ingredient${state.selectedIngredients.length === 1 ? "" : "s"} selected` : "Awaiting ingredients";
    if (mix) mix.textContent = preview.shared.length ? preview.shared.map((id) => window.AlchemyData.effects[id].name).join(" + ") : state.selectedIngredients.length >= 2 ? "No resonance" : "Empty";
    if (stability) stability.textContent = preview.stability == null ? "—" : `${preview.stability}%`;
    if (hint) hint.textContent = preview.hint;
    apparatus?.classList.toggle("is-ready", preview.valid && preview.shared.length > 0);
    if (brewButton) brewButton.disabled = state.selectedIngredients.length < 2;
  }

  function renderControls(state) {
    const grind = document.querySelector('[data-brew-control="grind"]');
    const heat = document.querySelector('[data-brew-control="heat"]');
    const duration = document.querySelector('[data-brew-control="duration"]');
    const base = document.querySelector('[data-brew-control="base"]');
    if (grind) grind.value = state.brewControls.grind;
    if (heat) heat.value = state.brewControls.heat;
    if (duration) duration.value = state.brewControls.duration;
    if (base) base.value = state.brewControls.base;
    const grindOut = document.querySelector("[data-grind-output]");
    const heatOut = document.querySelector("[data-heat-output]");
    if (grindOut) grindOut.textContent = grindLabels[state.brewControls.grind];
    if (heatOut) heatOut.textContent = heatLabels[state.brewControls.heat];
  }

  function renderResult(state) {
    const panel = document.querySelector("[data-brew-result]");
    if (!panel) return;
    const result = state.lastResult;
    panel.classList.remove("result-panel--success", "result-panel--failure", "result-panel--idle");
    if (!result) {
      panel.classList.add("result-panel--idle");
      panel.innerHTML = `<div class="result-panel__icon" aria-hidden="true">?</div><div class="result-panel__content"><p class="eyebrow">Last Result</p><h3 id="result-title">No mixture brewed</h3><p>The completed potion, discovered effects, quality, and side effects will appear here.</p></div>`;
      return;
    }
    if (!result.success) {
      panel.classList.add("result-panel--failure");
      const reveal = result.revealed?.length ? ` Experiment notes revealed ${window.AlchemyData.effects[result.revealed[0].effectId].name} in ${window.AlchemyData.ingredients.find((i) => i.id === result.revealed[0].ingredientId).name}.` : "";
      panel.innerHTML = `<div class="result-panel__icon" aria-hidden="true">×</div><div class="result-panel__content"><p class="eyebrow">Failed Experiment</p><h3 id="result-title">${esc(result.title)}</h3><p>${esc(result.message + reveal)}</p></div>`;
      return;
    }
    panel.classList.add("result-panel--success");
    const potion = result.potion;
    const effects = potion.effectIds.map((id) => window.AlchemyData.effects[id].name).join(" · ");
    const side = potion.sideEffectId ? ` Side effect: ${window.AlchemyData.effects[potion.sideEffectId].name}.` : " No harmful side effect detected.";
    const revealCount = result.revealed?.length || 0;
    panel.innerHTML = `<div class="result-panel__icon" aria-hidden="true">${esc(window.AlchemyData.effects[potion.primaryEffectId].glyph)}</div><div class="result-panel__content"><p class="eyebrow">Successful Brew</p><h3 id="result-title">${esc(potion.name)}</h3><p>${esc(effects + "." + side)}${revealCount ? ` ${revealCount} ingredient propert${revealCount === 1 ? "y was" : "ies were"} recorded.` : ""}</p><div class="result-stats"><span class="quality-chip" data-quality="${esc(potion.quality)}">${esc(potion.quality)} · ${potion.score}%</span><span class="quality-chip">Value ${potion.value}g</span><span class="quality-chip">Stored in stock</span></div></div>`;
  }

  function render(state) { renderSlots(state); renderControls(state); renderPreview(state); renderResult(state); }
  window.BrewingUI = { render, renderPreview, grindLabels, heatLabels };
})();
