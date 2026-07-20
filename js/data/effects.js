(function () {
  "use strict";
  window.AlchemyData = window.AlchemyData || {};
  window.AlchemyData.effects = {
    restoration: { id:"restoration", name:"Restoration", potionName:"Draught of Restoration", glyph:"✚", ideal:{ heat:3, grind:2, duration:"standard", bases:["water"] }, baseValue:28, description:"Restores vitality and closes minor wounds." },
    vigor: { id:"vigor", name:"Vigor", potionName:"Tonic of Vigor", glyph:"▲", ideal:{ heat:4, grind:3, duration:"long", bases:["water","spirit"] }, baseValue:31, description:"Improves stamina and physical endurance." },
    focus: { id:"focus", name:"Focus", potionName:"Elixir of Focus", glyph:"◆", ideal:{ heat:2, grind:2, duration:"standard", bases:["water","oil"] }, baseValue:34, description:"Sharpens attention and steadies the mind." },
    sleep: { id:"sleep", name:"Sleep", potionName:"Somnolent Philter", glyph:"☾", ideal:{ heat:2, grind:1, duration:"long", bases:["oil"] }, baseValue:30, description:"Encourages deep, dreamless sleep." },
    flameward: { id:"flameward", name:"Flame Ward", potionName:"Emberward Tonic", glyph:"♨", ideal:{ heat:5, grind:2, duration:"short", bases:["oil"] }, baseValue:38, description:"Temporarily protects against heat and flame." },
    frostward: { id:"frostward", name:"Frost Ward", potionName:"Rimeguard Draught", glyph:"❄", ideal:{ heat:1, grind:2, duration:"standard", bases:["spirit"] }, baseValue:38, description:"Temporarily protects against cold and frost." },
    clarity: { id:"clarity", name:"Clarity", potionName:"Lucid Tincture", glyph:"◈", ideal:{ heat:2, grind:3, duration:"short", bases:["spirit"] }, baseValue:36, description:"Resists confusion and clears mental fog." },
    swiftness: { id:"swiftness", name:"Swiftness", potionName:"Fleetfoot Serum", glyph:"➤", ideal:{ heat:3, grind:3, duration:"short", bases:["spirit"] }, baseValue:41, description:"Briefly heightens speed and reflexes." },
    invisibility: { id:"invisibility", name:"Veiling", potionName:"Veilwater", glyph:"◌", ideal:{ heat:1, grind:1, duration:"standard", bases:["oil","spirit"] }, baseValue:58, description:"Softens the drinker’s visible outline." },
    purification: { id:"purification", name:"Purification", potionName:"Cleansing Solution", glyph:"✦", ideal:{ heat:4, grind:2, duration:"long", bases:["water"] }, baseValue:35, description:"Neutralizes mild toxins and impurities." },
    venom: { id:"venom", name:"Venom", potionName:"Venomous Extract", glyph:"†", ideal:{ heat:4, grind:3, duration:"long", bases:["oil"] }, baseValue:43, description:"Creates a dangerous contact poison." },
    weakness: { id:"weakness", name:"Frailty", potionName:"Draught of Frailty", glyph:"▽", ideal:{ heat:3, grind:2, duration:"long", bases:["spirit"] }, baseValue:40, description:"Temporarily weakens physical resistance." },
    nightvision: { id:"nightvision", name:"Night Sight", potionName:"Nocturne Tonic", glyph:"◉", ideal:{ heat:2, grind:1, duration:"standard", bases:["oil"] }, baseValue:44, description:"Improves vision in dim surroundings." },
    silence: { id:"silence", name:"Silence", potionName:"Hushwater", glyph:"∿", ideal:{ heat:1, grind:2, duration:"short", bases:["water","oil"] }, baseValue:46, description:"Dampens footsteps and small sounds." },
    fortitude: { id:"fortitude", name:"Fortitude", potionName:"Ironbark Decoction", glyph:"⬟", ideal:{ heat:5, grind:3, duration:"long", bases:["water"] }, baseValue:45, description:"Hardens the body against physical harm." }
  };
})();
