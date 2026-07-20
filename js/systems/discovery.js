(function () {
  "use strict";

  function revealEffect(state, ingredientId, effectId) {
    const known = state.knownEffects[ingredientId] || [];
    if (known.includes(effectId)) return false;
    state.knownEffects[ingredientId] = known.concat(effectId);
    return true;
  }

  function revealSharedEffects(state, ingredientIds, sharedEffects) {
    const revealed = [];
    ingredientIds.forEach((ingredientId) => {
      const ingredient = window.AlchemyData.ingredients.find((item) => item.id === ingredientId);
      if (!ingredient) return;
      sharedEffects.forEach((effectId) => {
        if (ingredient.effects.includes(effectId) && revealEffect(state, ingredientId, effectId)) {
          revealed.push({ ingredientId, effectId });
        }
      });
    });
    return revealed;
  }

  function revealFromFailure(state, ingredientIds) {
    if (!ingredientIds.length) return [];
    const ingredientId = ingredientIds[state.brewCount % ingredientIds.length];
    const ingredient = window.AlchemyData.ingredients.find((item) => item.id === ingredientId);
    if (!ingredient) return [];
    const known = state.knownEffects[ingredientId] || [];
    const unknown = ingredient.effects.filter((effectId) => !known.includes(effectId));
    if (!unknown.length) return [];
    const effectId = unknown[state.brewCount % unknown.length];
    revealEffect(state, ingredientId, effectId);
    return [{ ingredientId, effectId }];
  }

  function recordFormula(state, potion) {
    const key = potion.effectIds.slice().sort().join("|") + "::" + potion.ingredientIds.slice().sort().join("|");
    const existing = state.discoveries.find((entry) => entry.key === key);
    if (existing) {
      existing.timesBrewed += 1;
      existing.bestScore = Math.max(existing.bestScore, potion.score);
      existing.bestQuality = potion.score >= existing.bestScore ? potion.quality : existing.bestQuality;
      return existing;
    }
    const entry = {
      key,
      name: potion.name,
      ingredientIds: potion.ingredientIds.slice(),
      effectIds: potion.effectIds.slice(),
      bestScore: potion.score,
      bestQuality: potion.quality,
      timesBrewed: 1,
      discoveredDay: state.day
    };
    state.discoveries.unshift(entry);
    return entry;
  }

  window.AlchemyDiscovery = { revealEffect, revealSharedEffects, revealFromFailure, recordFormula };
})();
