# Playtest Report — v0.1.0

## Automated logic smoke suite

Result: **12/12 passed**

Validated:

- Application shell and all primary views render
- All 12 ingredient cards render
- Three brewing slots render
- Four ledger sections render
- Compatible ingredients produce a potion
- Restoration is correctly detected for Silverleaf + Grave Moss
- Ingredients are consumed once
- Successful potions enter stock
- Successful formulas enter the discovery ledger
- Incompatible mixtures fail safely
- Failed mixtures do not create potions
- Matching customer orders can be fulfilled

## Chromium player-flow test

Result: **20/20 passed**

Validated at 1440 × 1000 desktop and 390 × 844 mobile:

- Desktop three-column workspace
- Empty-mixture brew lock
- Ingredient selection and slot rendering
- Successful potion brewing
- Potion stock and discovery counters
- Customer-order matching and delivery
- Gold reward application
- Potion removal after delivery
- Upgrade purchasing and installed state
- Foraging day advancement and ingredient gains
- Mobile navigation visibility
- No mobile horizontal overflow
- Ingredient, ledger, and brewing mobile-view switching
- No JavaScript console or page errors

## Static validation

- Every JavaScript file passes `node --check`
- All local CSS and JavaScript references resolve
- No runtime libraries, remote assets, or network calls are required

## Known prototype limitations

- Ingredient art currently uses styled glyphs rather than final illustrated assets.
- Customer dialogue and order variety are intentionally compact.
- There is no sound layer yet.
- Save migration currently supports only the v1 prototype schema.
