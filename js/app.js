(function () {
  "use strict";

  function state() { return window.AlchemyState.get(); }
  function saveAndRender() { window.AlchemyState.save(); renderAll(); }

  function toast(message, type) {
    const region = document.querySelector("[data-toast-region]");
    if (!region) return;
    const item = document.createElement("div");
    item.className = `toast ${type ? `toast--${type}` : ""}`;
    item.textContent = message;
    region.appendChild(item);
    window.setTimeout(() => item.remove(), 3200);
  }

  function renderStats() {
    const current = state();
    document.querySelectorAll("[data-day]").forEach((node) => { node.textContent = String(current.day); });
    document.querySelectorAll("[data-gold]").forEach((node) => { node.textContent = String(current.gold); });
    document.querySelectorAll("[data-reputation]").forEach((node) => { node.textContent = window.AlchemyProgression.reputationLabel(current.reputation); });
    document.body.classList.toggle("reduced-motion", Boolean(current.settings.reducedMotion));
    const reducedMotion = document.querySelector('[data-setting="reduced-motion"]');
    if (reducedMotion) reducedMotion.checked = Boolean(current.settings.reducedMotion);
  }

  function renderAll() {
    renderStats();
    window.InventoryUI.render(state());
    window.BrewingUI.render(state());
    window.LedgerUI.render(state());
    window.ShopUI.render(state());
  }

  function toggleIngredient(id) {
    const current = state();
    const index = current.selectedIngredients.indexOf(id);
    if (index >= 0) current.selectedIngredients.splice(index, 1);
    else if (current.selectedIngredients.length < 3) current.selectedIngredients.push(id);
    else { toast("The mixture already contains three ingredients.", "error"); return; }
    saveAndRender();
  }

  function selectTab(tab) {
    document.querySelectorAll("[data-ledger-tab]").forEach((button) => {
      const active = button.dataset.ledgerTab === tab;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
    document.querySelectorAll("[data-ledger-view]").forEach((view) => { view.hidden = view.dataset.ledgerView !== tab; });
  }

  function switchMobileView(view) {
    const brewing = document.querySelector('[data-view="brewing"]');
    const ingredients = document.querySelector('[data-view="ingredients"]');
    const ledger = document.querySelector('[data-view="ledger"]');
    brewing?.classList.toggle("is-mobile-hidden", view !== "brewing");
    ingredients?.classList.toggle("is-mobile-active", view === "ingredients");
    ledger?.classList.toggle("is-mobile-active", view === "ledger" || view === "shop");
    document.querySelectorAll("[data-mobile-view]").forEach((button) => button.classList.toggle("is-active", button.dataset.mobileView === view));
    if (view === "shop") selectTab("shop");
    if (view === "ledger") selectTab("discoveries");
    window.scrollTo({ top:0, behavior: state().settings.reducedMotion ? "auto" : "smooth" });
  }

  function handleBrew() {
    const apparatus = document.querySelector(".apparatus");
    apparatus?.classList.add("is-brewing");
    const result = window.AlchemyBrewing.brew(state());
    window.setTimeout(() => apparatus?.classList.remove("is-brewing"), 800);
    if (!result.ok) { toast(result.reason, "error"); return; }
    window.AlchemyState.save();
    renderAll();
    toast(result.success ? `${result.potion.name} bottled successfully.` : "The mixture collapsed, but the experiment produced a useful note.", result.success ? "success" : "error");
  }

  function handleForage() {
    const result = window.AlchemyProgression.forage(state());
    saveAndRender();
    const names = Object.entries(result.gathered).map(([id, count]) => `${window.AlchemyData.ingredients.find((item) => item.id === id).name} ×${count}`).join(", ");
    toast(`Foraging complete: ${names}.${result.expired ? ` ${result.expired} order expired.` : ""}`, "success");
  }

  function handleClick(event) {
    const ingredient = event.target.closest("[data-select-ingredient]");
    if (ingredient) return toggleIngredient(ingredient.dataset.selectIngredient);

    const slot = event.target.closest("[data-slot]");
    if (slot) {
      const index = Number(slot.dataset.slot);
      if (state().selectedIngredients[index]) { state().selectedIngredients.splice(index, 1); saveAndRender(); }
      else { switchMobileView("ingredients"); toast("Choose an ingredient from the shelf."); }
      return;
    }

    if (event.target.closest("[data-clear-brew]")) { state().selectedIngredients = []; saveAndRender(); return; }
    if (event.target.closest("[data-start-brew]")) { handleBrew(); return; }
    if (event.target.closest("[data-forage]")) { handleForage(); return; }

    const tab = event.target.closest("[data-ledger-tab]");
    if (tab) { selectTab(tab.dataset.ledgerTab); return; }

    const mobile = event.target.closest("[data-mobile-view]");
    if (mobile) { switchMobileView(mobile.dataset.mobileView); return; }

    const fulfill = event.target.closest("[data-fulfill-order]");
    if (fulfill) {
      const result = window.AlchemyCustomers.fulfill(state(), fulfill.dataset.fulfillOrder);
      if (!result.ok) toast(result.reason, "error");
      else { saveAndRender(); toast(`Order delivered for ${result.reward} gold.`, "success"); }
      return;
    }

    const sell = event.target.closest("[data-sell-potion]");
    if (sell) {
      const result = window.AlchemyProgression.sellPotion(state(), sell.dataset.sellPotion);
      if (!result.ok) toast(result.reason, "error");
      else { saveAndRender(); toast(`${result.potion.name} sold for ${result.value} gold.`, "success"); }
      return;
    }

    const buy = event.target.closest("[data-buy-upgrade]");
    if (buy) {
      const result = window.AlchemyProgression.buyUpgrade(state(), buy.dataset.buyUpgrade);
      if (!result.ok) toast(result.reason, "error");
      else { saveAndRender(); toast(`${result.upgrade.name} installed.`, "success"); }
      return;
    }

    const dialog = document.querySelector("[data-settings-dialog]");
    if (event.target.closest("[data-open-settings]")) { dialog?.showModal(); return; }
    if (event.target.closest("[data-close-settings]")) { dialog?.close(); return; }
    if (event.target.closest("[data-reset-save]")) {
      if (window.confirm("Reset all Apothecary Ledger progress? This cannot be undone.")) {
        window.AlchemyState.reset(); window.AlchemyCustomers.refreshOrders(state(), true); dialog?.close(); renderAll(); toast("Progress reset.");
      }
    }
  }

  function handleInput(event) {
    if (event.target.matches("[data-ingredient-search], [data-ingredient-filter]")) { window.InventoryUI.render(state()); return; }
    const control = event.target.closest("[data-brew-control]");
    if (control) {
      const key = control.dataset.brewControl;
      state().brewControls[key] = control.type === "range" ? Number(control.value) : control.value;
      window.AlchemyState.save();
      window.BrewingUI.render(state());
      return;
    }
    if (event.target.matches('[data-setting="reduced-motion"]')) {
      state().settings.reducedMotion = event.target.checked;
      saveAndRender();
    }
  }

  function runSmokeTests() {
    const checks = [];
    const check = (name, condition) => checks.push({ name, pass:Boolean(condition) });
    check("game shell renders", Boolean(document.querySelector(".game-shell")));
    check("ingredient shelf renders", document.querySelectorAll("[data-select-ingredient]").length === window.AlchemyData.ingredients.length);
    check("brewing slots render", document.querySelectorAll("[data-slot]").length === 3);
    check("order panel renders", document.querySelectorAll("[data-ledger-view]").length === 4);

    const testState = window.AlchemyState.createDefaultState();
    testState.selectedIngredients = ["silverleaf", "grave-moss"];
    testState.brewControls = { grind:2, heat:3, duration:"standard", base:"water" };
    const beforeA = testState.inventory["silverleaf"];
    const success = window.AlchemyBrewing.brew(testState);
    check("compatible ingredients brew", success.ok && success.success);
    check("restoration effect detected", success.success && success.potion.primaryEffectId === "restoration");
    check("ingredients consumed", testState.inventory["silverleaf"] === beforeA - 1);
    check("successful potion stored", testState.potions.length === 1);
    check("formula recorded", testState.discoveries.length === 1);

    const failureState = window.AlchemyState.createDefaultState();
    failureState.selectedIngredients = ["silverleaf", "emberroot"];
    const failure = window.AlchemyBrewing.brew(failureState);
    check("incompatible mixture fails safely", failure.ok && !failure.success);
    check("failed mixture stores no potion", failureState.potions.length === 0);

    const orderState = window.AlchemyState.createDefaultState();
    orderState.potions = [{ id:"test-potion", name:"Test", primaryEffectId:"focus", effectIds:["focus"], score:80, quality:"Potent", value:1 }];
    orderState.activeOrders = [{ id:"test-order", title:"Test", effect:"focus", minimumQuality:50, reward:25, deadlineDay:3 }];
    const delivery = window.AlchemyCustomers.fulfill(orderState, "test-order");
    check("matching customer order fulfills", delivery.ok && orderState.gold === 145 && orderState.potions.length === 0);

    const passed = checks.filter((item) => item.pass).length;
    const output = document.querySelector("[data-smoke-output]");
    if (output) { output.hidden = false; output.textContent = `SMOKE ${passed}/${checks.length} ${passed === checks.length ? "PASS" : "FAIL"} :: ` + checks.map((item) => `${item.pass ? "✓" : "✗"}${item.name}`).join(" | "); }
    document.documentElement.dataset.smoke = passed === checks.length ? "pass" : "fail";
    document.title = `SMOKE ${passed}/${checks.length} ${passed === checks.length ? "PASS" : "FAIL"}`;
    return { passed, total:checks.length, checks };
  }

  function init() {
    window.AlchemyState.load();
    window.AlchemyCustomers.refreshOrders(state(), false);
    window.AlchemyState.save();
    renderAll();
    document.addEventListener("click", handleClick);
    document.addEventListener("input", handleInput);
    document.addEventListener("change", handleInput);
    if (new URLSearchParams(window.location.search).has("smoke")) runSmokeTests();
  }

  window.AlchemyApp = { init, renderAll, runSmokeTests };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
