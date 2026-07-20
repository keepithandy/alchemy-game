(function () {
  "use strict";

  function refreshOrders(state, force) {
    const templates = window.AlchemyData.orderTemplates || [];
    state.activeOrders = (state.activeOrders || []).filter((order) => order.deadlineDay >= state.day && !order.completed);
    if (!force && state.activeOrders.length >= 3) return state.activeOrders;
    const used = new Set(state.activeOrders.map((order) => order.templateId));
    let cursor = (state.day * 3 + state.completedOrders) % templates.length;
    while (state.activeOrders.length < 3 && used.size < templates.length) {
      const template = templates[cursor % templates.length];
      cursor += 1;
      if (used.has(template.id)) continue;
      used.add(template.id);
      state.activeOrders.push({
        id: template.id + "-day-" + state.day,
        templateId: template.id,
        title: template.title,
        request: template.request,
        effect: template.effect,
        minimumQuality: template.minimumQuality,
        reward: template.reward + Math.max(0, state.day - 1) * 2,
        deadlineDay: state.day + 2,
        completed: false
      });
    }
    return state.activeOrders;
  }

  function matchingPotion(state, order) {
    return state.potions
      .filter((potion) => potion.effectIds.includes(order.effect) && potion.score >= order.minimumQuality)
      .sort((a, b) => b.score - a.score)[0] || null;
  }

  function fulfill(state, orderId) {
    const orderIndex = state.activeOrders.findIndex((order) => order.id === orderId);
    if (orderIndex < 0) return { ok:false, reason:"That order is no longer available." };
    const order = state.activeOrders[orderIndex];
    const potion = matchingPotion(state, order);
    if (!potion) return { ok:false, reason:"No stored potion meets this order’s effect and quality requirements." };
    const potionIndex = state.potions.findIndex((item) => item.id === potion.id);
    state.potions.splice(potionIndex, 1);
    state.activeOrders.splice(orderIndex, 1);
    state.gold += order.reward;
    state.reputation += 4;
    state.completedOrders += 1;
    refreshOrders(state, false);
    return { ok:true, order, potion, reward:order.reward };
  }

  window.AlchemyCustomers = { refreshOrders, matchingPotion, fulfill };
})();
