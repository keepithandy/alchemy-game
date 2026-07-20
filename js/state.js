(function () {
  "use strict";
  const STORAGE_KEY = "apothecary-ledger-save-v1";

  function makeInventory() {
    const inventory = {};
    (window.AlchemyData.ingredients || []).forEach((ingredient) => {
      inventory[ingredient.id] = ingredient.startingQuantity || 0;
    });
    return inventory;
  }

  function createDefaultState() {
    return {
      version: 1,
      day: 1,
      gold: 120,
      reputation: 0,
      inventory: makeInventory(),
      knownEffects: {
        "silverleaf": ["restoration"],
        "grave-moss": ["venom"],
        "mooncap": ["sleep"],
        "emberroot": ["flameward"]
      },
      selectedIngredients: [],
      brewControls: { grind: 2, heat: 3, duration: "standard", base: "water" },
      discoveries: [],
      potions: [],
      activeOrders: [],
      completedOrders: 0,
      upgrades: [],
      brewCount: 0,
      lastResult: null,
      settings: { reducedMotion: false }
    };
  }

  function normalize(raw) {
    const base = createDefaultState();
    const state = Object.assign(base, raw || {});
    state.inventory = Object.assign(base.inventory, raw && raw.inventory ? raw.inventory : {});
    state.knownEffects = Object.assign({}, base.knownEffects, raw && raw.knownEffects ? raw.knownEffects : {});
    state.brewControls = Object.assign({}, base.brewControls, raw && raw.brewControls ? raw.brewControls : {});
    state.settings = Object.assign({}, base.settings, raw && raw.settings ? raw.settings : {});
    state.selectedIngredients = Array.isArray(state.selectedIngredients) ? state.selectedIngredients.slice(0, 3) : [];
    state.discoveries = Array.isArray(state.discoveries) ? state.discoveries : [];
    state.potions = Array.isArray(state.potions) ? state.potions : [];
    state.activeOrders = Array.isArray(state.activeOrders) ? state.activeOrders : [];
    state.upgrades = Array.isArray(state.upgrades) ? state.upgrades : [];
    return state;
  }

  let current = createDefaultState();

  function load() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      current = raw ? normalize(JSON.parse(raw)) : createDefaultState();
    } catch (error) {
      console.warn("Save could not be loaded; using a fresh state.", error);
      current = createDefaultState();
    }
    return current;
  }

  function save() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      return true;
    } catch (error) {
      console.warn("Save could not be written.", error);
      return false;
    }
  }

  function get() { return current; }
  function replace(next) { current = normalize(next); save(); return current; }
  function reset() { current = createDefaultState(); save(); return current; }

  window.AlchemyState = { STORAGE_KEY, createDefaultState, normalize, load, save, get, replace, reset };
})();
