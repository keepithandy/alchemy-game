# Agent Version Authority

## Canonical baseline

- **Project:** The Apothecary Ledger
- **Repository:** `keepithandy/alchemy-game`
- **Canonical version:** `v0.1.0`
- **Release stage:** Playable prototype
- **Baseline date:** 2026-07-20
- **Default branch:** `main`
- **Runtime:** Plain HTML, CSS, and JavaScript
- **Build step:** None

This file is the version and maintenance authority for coding agents working in this repository. Read it together with `README.md` before modifying the project.

## Launch paths

- Windows: run `PLAY_GAME.bat`.
- Any supported operating system: open `index.html` in a modern browser.
- No package installation, local server, account, API key, or internet connection is required.

## Validation authority

Open:

```text
index.html?smoke=1
```

The expected baseline result is:

```text
SMOKE 12/12 PASS
```

Do not report a patch as validated unless the relevant checks were actually run. Record partial validation honestly.

## Current playable baseline

The current prototype includes:

- 12 ingredients with four alchemical properties each;
- 15 possible effects;
- two- and three-ingredient mixtures;
- grinding, heat, duration, and base-liquid controls;
- quality, potency, value, stability, and side-effect calculations;
- hidden-effect discovery and persistent formula records;
- customer orders, potion storage, direct sales, and workshop upgrades;
- deterministic foraging and day progression;
- local browser persistence;
- desktop and narrow-mobile layouts;
- reduced-motion support and full progress reset.

## Agent guardrails

1. Keep patches narrow, reviewable, and smoke-backed.
2. Preserve direct browser launch with no required build system.
3. Preserve mobile usability and the existing responsive navigation.
4. Do not silently change brewing math, ingredient effects, rewards, prices, order requirements, progression balance, or save structure.
5. Treat economy, recipe behavior, persistence, and progression changes as gameplay changes requiring explicit scope.
6. Prefer additive or read-only helpers before risky state mutation.
7. Do not remove accessibility labels, reduced-motion behavior, or safe reset behavior.
8. Do not claim production readiness; the project remains a prototype.
9. Avoid unrelated cleanup while implementing a focused request.
10. Describe what changed, what did not change, and which checks passed.

## Version-change contract

When the canonical version changes, update all applicable authorities in the same focused patch:

- this file;
- the current-version text in `README.md`;
- any user-facing build or version label introduced later;
- release notes or changelog files introduced later.

Do not create competing version authorities. `AGENT_VERSION.md` is the repository-level source of truth for agents.

## Preserved gameplay loop

```text
Forage for ingredients
→ Inspect known traits
→ Select two or three ingredients
→ Tune the brewing process
→ Brew the mixture
→ Discover effects and record formulas
→ Fulfill orders or sell stock
→ Purchase workshop upgrades
→ Repeat
```

## Safest current development direction

Prioritize:

- first-run clarity;
- mobile readability;
- CSS and interaction polish;
- discovery feedback;
- save/export resilience;
- validation and release hygiene;
- stronger customer and workshop presentation.

Avoid expanding the project with unrelated systems until the existing loop is stable, understandable, and consistently validated.