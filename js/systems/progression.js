(function () {
  "use strict";

  function reputationLabel(value) {
    if (value >= 60) return "Renowned";
    if (value >= 35) return "Trusted";
    if (value >= 18) return "Recognized";
    if (value >= 6) return "Local";
    return "Unknown";
  }

  function forage(state) {
    state.day += 1;
    const yieldCount = state.upgrades.includes("expanded-shelves") ? 7 : 5;
    const gathered = {};
    const ingredients = window.AlchemyData.ingredients;
    for (let i = 0; i < yieldCount; i += 1) {
      const index = (state.day * 5 + state.brewCount * 3 + i * 7) % ingredients.length;
      let ingredient = ingredients[index];
      if (ingredient.rarity === "rare" && ((state.day + i) % 3 !== 0)) {
        ingredient = ingredients[(index + 2) % 8];
      }
      state.inventory[ingredient.id] = (state.inventory[ingredient.id] || 0) + 1;
      gathered[ingredient.id] = (gathered[ingredient.id] || 0) + 1;
    }
    const expired = state.activeOrders.filter((order) => order.deadlineDay < state.day).length;
    if (expired) state.reputation = Math.max(0, state.reputation - expired);
    window.AlchemyCustomers.refreshOrders(state, true);
    return { gathered, expired };
  }

  function buyUpgrade(state, upgradeId) {
    const upgrade = window.AlchemyData.upgrades.find((item) => item.id === upgradeId);
    if (!upgrade) return { ok:false, reason:"Upgrade not found." };
    if (state.upgrades.includes(upgradeId)) return { ok:false, reason:"That upgrade is already installed." };
    if (state.gold < upgrade.cost) return { ok:false, reason:"Not enough gold." };
    state.gold -= upgrade.cost;
    state.upgrades.push(upgradeId);
    return { ok:true, upgrade };
  }

  function sellPotion(state, potionId) {
    const index = state.potions.findIndex((potion) => potion.id === potionId);
    if (index < 0) return { ok:false, reason:"Potion not found." };
    const potion = state.potions[index];
    state.potions.splice(index, 1);
    state.gold += potion.value;
    return { ok:true, potion, value:potion.value };
  }

  window.AlchemyProgression = { reputationLabel, forage, buyUpgrade, sellPotion };
})();
