(function () {
  "use strict";

  const QUALITY_BANDS = [
    { min: 90, name: "Masterwork" },
    { min: 75, name: "Potent" },
    { min: 60, name: "Refined" },
    { min: 45, name: "Rough" },
    { min: 0, name: "Volatile" }
  ];

  function getIngredient(id) { return window.AlchemyData.ingredients.find((item) => item.id === id); }
  function getEffect(id) { return window.AlchemyData.effects[id]; }

  function sharedEffects(ingredientIds) {
    const counts = {};
    ingredientIds.map(getIngredient).filter(Boolean).forEach((ingredient) => {
      ingredient.effects.forEach((effectId) => { counts[effectId] = (counts[effectId] || 0) + 1; });
    });
    return Object.keys(counts).filter((effectId) => counts[effectId] >= 2).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b));
  }

  function processScore(effect, controls, upgrades, ingredientCount, effectCount) {
    const ideal = effect.ideal;
    const heatDifference = Math.abs(Number(controls.heat) - ideal.heat);
    const regulated = upgrades.includes("regulated-burner");
    const heatPoints = Math.max(0, 18 - heatDifference * (regulated ? 4 : 8));
    const grindDifference = Math.abs(Number(controls.grind) - ideal.grind);
    let grindPoints = Math.max(0, 11 - grindDifference * 6);
    if (Number(controls.grind) === 3 && upgrades.includes("reinforced-mortar")) grindPoints += 6;
    const durationPoints = controls.duration === ideal.duration ? 11 : 3;
    const basePoints = ideal.bases.includes(controls.base) ? 13 : 1;
    const complexityPoints = Math.max(0, effectCount - 1) * 3 + Math.max(0, ingredientCount - 2) * 4;
    return Math.max(20, Math.min(100, Math.round(35 + heatPoints + grindPoints + durationPoints + basePoints + complexityPoints)));
  }

  function qualityName(score) { return QUALITY_BANDS.find((band) => score >= band.min).name; }

  function sideEffectFor(ingredientIds, primaryEffectId, score, controls) {
    const effect = getEffect(primaryEffectId);
    const extremeHeat = Math.abs(Number(controls.heat) - effect.ideal.heat) >= 3;
    if (score >= 58 && !extremeHeat) return null;
    const options = [];
    ingredientIds.map(getIngredient).filter(Boolean).forEach((ingredient) => {
      ingredient.effects.forEach((effectId) => {
        if (effectId !== primaryEffectId && !options.includes(effectId)) options.push(effectId);
      });
    });
    if (!options.length) return null;
    const index = (score + Number(controls.heat) + ingredientIds.length) % options.length;
    return options[index];
  }

  function calculatePreview(state) {
    const ids = state.selectedIngredients.slice();
    if (ids.length < 2) return { valid: false, shared: [], stability: null, hint: "Select two ingredients to begin evaluating the mixture." };
    const shared = sharedEffects(ids);
    if (!shared.length) return { valid: true, shared: [], stability: 22, hint: "No compatible properties are currently detected. The mixture will probably collapse." };
    const primary = getEffect(shared[0]);
    const score = processScore(primary, state.brewControls, state.upgrades, ids.length, shared.length);
    return { valid: true, shared, stability: score, hint: score >= 75 ? "The process is closely aligned with the mixture’s active property." : score >= 55 ? "The mixture should hold, though the process is not fully optimized." : "The mixture is unstable. Adjust heat, grinding, duration, or base." };
  }

  function consumeIngredients(state, ingredientIds) {
    ingredientIds.forEach((id) => { state.inventory[id] = Math.max(0, (state.inventory[id] || 0) - 1); });
  }

  function brew(state) {
    const ids = state.selectedIngredients.slice();
    if (ids.length < 2) return { ok: false, reason: "Select at least two ingredients." };
    if (new Set(ids).size !== ids.length) return { ok: false, reason: "Each ingredient can only be used once per mixture." };
    const missing = ids.find((id) => (state.inventory[id] || 0) < 1);
    if (missing) return { ok: false, reason: "One of the selected ingredients is no longer available." };

    state.brewCount += 1;
    consumeIngredients(state, ids);
    const shared = sharedEffects(ids);

    if (!shared.length) {
      const revealed = window.AlchemyDiscovery.revealFromFailure(state, ids);
      const failure = {
        ok: true,
        success: false,
        title: "Collapsed Mixture",
        message: "The ingredients produced no stable shared property. The residue was discarded.",
        ingredientIds: ids,
        revealed,
        day: state.day
      };
      state.lastResult = failure;
      state.selectedIngredients = [];
      return failure;
    }

    const primaryId = shared[0];
    const primary = getEffect(primaryId);
    const score = processScore(primary, state.brewControls, state.upgrades, ids.length, shared.length);
    const quality = qualityName(score);
    const secondaryEffects = shared.slice(1, 3);
    const sideEffect = sideEffectFor(ids, primaryId, score, state.brewControls);
    const baseMultiplier = state.brewControls.base === "spirit" ? 1.12 : state.brewControls.base === "oil" ? 1.07 : 1;
    const glassMultiplier = state.upgrades.includes("measured-glassware") ? 1.15 : 1;
    const value = Math.max(12, Math.round((primary.baseValue + score * 0.42 + secondaryEffects.length * 11) * baseMultiplier * glassMultiplier));
    const prefix = quality === "Masterwork" ? "Exceptional " : quality === "Potent" ? "Potent " : quality === "Volatile" ? "Unstable " : "";
    const potion = {
      id: "potion-" + Date.now() + "-" + state.brewCount,
      name: prefix + primary.potionName,
      primaryEffectId: primaryId,
      effectIds: [primaryId].concat(secondaryEffects),
      sideEffectId: sideEffect,
      ingredientIds: ids,
      controls: Object.assign({}, state.brewControls),
      score,
      quality,
      value,
      brewedDay: state.day
    };
    const revealed = window.AlchemyDiscovery.revealSharedEffects(state, ids, shared);
    window.AlchemyDiscovery.recordFormula(state, potion);
    state.potions.unshift(potion);
    state.reputation += quality === "Masterwork" ? 3 : quality === "Potent" ? 2 : 1;
    const result = { ok: true, success: true, potion, revealed };
    state.lastResult = result;
    state.selectedIngredients = [];
    return result;
  }

  window.AlchemyBrewing = { sharedEffects, processScore, qualityName, calculatePreview, brew };
})();
