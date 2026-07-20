# The Apothecary Ledger

A self-contained browser-game prototype centered on hidden ingredient properties, process-sensitive potion brewing, customer orders, and shop progression.

## Play

1. Extract the ZIP.
2. Double-click `PLAY_GAME.bat` on Windows, or open `index.html` in a modern browser.
3. Select ingredients from the shelf.
4. Use at least two ingredients, tune the brewing process, and press **Begin Brewing**.

No installation, account, internet connection, build step, or API key is required.

## Current prototype content

- 12 ingredients with four properties each
- 15 possible alchemical effects
- Two- and three-ingredient mixtures
- Heat, grinding, duration, and liquid-base controls
- Quality, potency, value, and side-effect calculations
- Hidden-effect discovery and formula ledger
- Customer orders with effect and quality requirements
- Potion storage and direct selling
- Four purchasable shop upgrades
- Deterministic foraging and day progression
- Automatic local browser saves
- Desktop and mobile layouts
- Reduced-motion setting and full save reset

## Useful first recipe

`Silverleaf + Grave Moss` shares **Restoration**. The default process settings are already well aligned with it.

## Save behavior

Progress is stored in the browser's local storage. Clearing browser site data or pressing **Reset all progress** removes the save.

## Development structure

- `index.html` — semantic application shell
- `css/` — tokens, base rules, layout, components, responsive rules
- `js/data/` — ingredients, effects, orders, and upgrades
- `js/systems/` — brewing, discovery, customers, progression
- `js/ui/` — inventory, brewing, ledger, and upgrade rendering
- `js/state.js` — save normalization and persistence
- `js/app.js` — application initialization and event routing

Version: 0.1.0 prototype
