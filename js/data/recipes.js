(function () {
  "use strict";
  window.AlchemyData = window.AlchemyData || {};
  window.AlchemyData.orderTemplates = [
    { id:"watch-tonic", title:"Night Watch Tonic", request:"Something that keeps my guards alert through the small hours.", effect:"focus", minimumQuality:48, reward:54 },
    { id:"burn-salve", title:"Glassblower’s Ward", request:"Protection from furnace heat. Strong enough to matter.", effect:"flameward", minimumQuality:50, reward:68 },
    { id:"quiet-step", title:"Quiet Courier", request:"A draught for crossing old floors without waking anyone.", effect:"silence", minimumQuality:45, reward:72 },
    { id:"field-medicine", title:"Field Medicine", request:"A reliable restorative for a caravan leaving tomorrow.", effect:"restoration", minimumQuality:44, reward:50 },
    { id:"cold-road", title:"Cold Road Provision", request:"The northern pass is open. I need protection against the cold.", effect:"frostward", minimumQuality:48, reward:66 },
    { id:"deep-sleep", title:"Dreamless Rest", request:"I have not slept properly in a week. No nightmares.", effect:"sleep", minimumQuality:46, reward:58 },
    { id:"pest-control", title:"Cellar Pest Control", request:"A concentrated poison for the rats beneath the granary.", effect:"venom", minimumQuality:52, reward:76 },
    { id:"scout-sight", title:"Scout’s Night Sight", request:"The patrol needs to read trail signs after sundown.", effect:"nightvision", minimumQuality:48, reward:70 }
  ];

  window.AlchemyData.upgrades = [
    { id:"reinforced-mortar", name:"Reinforced Mortar", description:"Improves extraction consistency when ingredients are finely ground.", cost:90, bonus:"Fine grinding gains +6 quality." },
    { id:"regulated-burner", name:"Regulated Burner", description:"A steadier flame reduces the penalty for missing an effect’s ideal heat.", cost:135, bonus:"Heat mismatch penalties are halved." },
    { id:"measured-glassware", name:"Measured Glassware", description:"Calibrated vessels preserve more valuable active compounds.", cost:180, bonus:"Successful potions sell for 15% more." },
    { id:"expanded-shelves", name:"Expanded Shelves", description:"More room for drying and sorting gathered ingredients.", cost:110, bonus:"Foraging yields two additional ingredients." }
  ];
})();
