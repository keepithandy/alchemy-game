# The Apothecary Ledger

A self-contained browser alchemy game about hidden ingredient properties, process-sensitive potion brewing, customer orders, discovery, and shop progression.

**Current version:** `v0.1.0 prototype`  
**Platform:** Modern desktop and mobile browsers  
**Runtime:** Plain HTML, CSS, and JavaScript  
**Build step:** None

## Play the game

### Windows

1. Clone or download this repository.
2. Double-click `PLAY_GAME.bat`.

### Any operating system

1. Clone or download this repository.
2. Open `index.html` in a modern browser.

No installation, package manager, account, internet connection, API key, or local server is required.

## Core gameplay loop

```text
Forage for ingredients
→ Inspect known traits
→ Select two or three ingredients
→ Tune grinding, heat, duration, and base liquid
→ Brew the mixture
→ Discover effects and record formulas
→ Fulfill customer orders or sell stock
→ Purchase workshop upgrades
→ Repeat
```

## How brewing works

Every ingredient contains four alchemical effects. Most of those effects begin hidden.

A mixture succeeds when its ingredients share at least one effect. The brewing process then evaluates how closely the selected method matches that effect's preferred conditions:

- **Grinding** changes extraction strength and ingredient damage.
- **Heat** can improve the brew or introduce instability.
- **Brewing time** affects potency and reduction.
- **Base liquid** changes purity, value, and effect compatibility.
- **Workshop upgrades** improve specific parts of the process.

Successful brews can reveal ingredient properties, create a potion, add a formula to the ledger, and produce stock for orders or direct sale. Failed mixtures consume ingredients safely but can still produce useful research notes.

## Useful first recipe

Use:

```text
Silverleaf + Grave Moss
```

Both ingredients contain **Restoration**. The default brewing controls are already aligned well enough to produce a reliable first potion.

## Prototype content

- 12 ingredients with four properties each
- 15 possible alchemical effects
- Two- and three-ingredient mixtures
- Grinding, heat, duration, and liquid-base controls
- Quality, potency, value, stability, and side-effect calculations
- Hidden-effect discovery
- Persistent formula ledger
- Eight customer-order templates
- Potion storage and direct selling
- Four purchasable workshop upgrades
- Deterministic foraging and day progression
- Automatic local browser saves
- Desktop and narrow mobile layouts
- Reduced-motion preference
- Full progress reset
- Built-in browser smoke checks

## Main interface

### Ingredient Shelf

Search, filter, inspect, and select ingredients from the current inventory. Foraging replenishes supplies and advances the in-game day.

### Brewing Table

Combine ingredients and configure the brewing method. The apparatus readout previews mixture stability before brewing.

### Apothecary Ledger

Review:

- discovered ingredient effects;
- recorded formulas;
- customer orders;
- bottled potion stock;
- workshop upgrades.

### Shop progression

Gold earned from orders and potion sales can purchase:

- **Reinforced Mortar** — improves fine grinding;
- **Regulated Burner** — reduces heat mismatch penalties;
- **Measured Glassware** — increases potion sale value;
- **Expanded Shelves** — improves foraging yield.

## Save behavior

Progress is stored with browser `localStorage`.

The save includes:

- current day and gold;
- reputation;
- ingredient inventory;
- discovered effects and formulas;
- active customer orders;
- bottled potions;
- purchased upgrades;
- settings.

Clearing browser site data or using **Settings → Reset all progress** removes the save.

> Saves are local to the browser and device used to play. There is no account or cloud synchronization in this prototype.

## Built-in validation

Open the game with the smoke query parameter:

```text
index.html?smoke=1
```

The browser smoke suite checks the application shell, ingredient rendering, brewing slots, ledger views, a compatible Restoration recipe, safe incompatible-mixture handling, inventory consumption, formula recording, potion storage, and customer-order fulfillment.

A successful run changes the page title to a result similar to:

```text
SMOKE 12/12 PASS
```

## Repository structure

```text
alchemy-game/
├─ index.html
├─ PLAY_GAME.bat
├─ README.md
├─ AGENT_VERSION.md
├─ css/
│  ├─ tokens.css
│  ├─ base.css
│  ├─ layout.css
│  ├─ components.css
│  └─ responsive.css
└─ js/
   ├─ app.js
   ├─ state.js
   ├─ data/
   │  ├─ effects.js
   │  ├─ ingredients.js
   │  └─ recipes.js
   ├─ systems/
   │  ├─ brewing.js
   │  ├─ customers.js
   │  ├─ discovery.js
   │  └─ progression.js
   └─ ui/
      ├─ brewing-ui.js
      ├─ inventory-ui.js
      ├─ ledger-ui.js
      └─ shop-ui.js
```

## Architecture

The prototype uses browser-global modules to remain directly runnable from `index.html` without a bundler.

- `js/data/` defines ingredients, effects, customer orders, and upgrades.
- `js/systems/` owns game rules and state transitions.
- `js/ui/` renders the inventory, brewing station, ledger, stock, and shop.
- `js/state.js` creates, normalizes, saves, loads, and resets game state.
- `js/app.js` initializes the game and routes interface events.
- `css/` separates design tokens, base rules, layout, components, and responsive behavior.
- `AGENT_VERSION.md` is the canonical version and maintenance authority for coding agents.

## Project principles

- Browser-first and immediately playable
- No required build tooling
- Mobile-readable layouts
- Deterministic systems where practical
- Clear separation between data, game rules, state, and rendering
- Safe local persistence
- Narrow, smoke-backed changes
- Honest prototype labeling

## Current status

The Apothecary Ledger is a playable `v0.1.0` prototype. Its current purpose is to prove the complete alchemy loop before expanding content or introducing heavier tooling.

Likely next work should stay focused on:

- gameplay balance and recipe clarity;
- improved first-run guidance;
- stronger customer and workshop identity;
- more discovery feedback;
- save/export resilience;
- repeatable manual mobile validation;
- release packaging and public browser hosting.

## Contributing and feedback

Useful feedback includes:

- recipes that are confusing or too easy;
- mobile layout problems;
- inaccessible controls or unclear labels;
- save/load defects;
- order progression issues;
- balancing problems involving gold, ingredients, quality, or upgrades;
- ideas that strengthen the existing loop without replacing it.

When reporting a problem, include the browser, device, actions taken, expected result, and actual result.
