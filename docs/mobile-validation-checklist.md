# Manual Mobile Validation Checklist

Run this checklist on a 320 px-wide viewport and a current iPhone-width viewport (for example, 390 px wide). Record the browser, operating system, viewport/device, and whether the page was opened from a local file or web host. This is a manual QA record, not a claim that every device has been tested.

## Shelf and brewing table

- [ ] The Ingredient Shelf opens from mobile navigation and its search, filter, and ingredient cards remain readable.
- [ ] Ingredient cards, removal controls, Clear, and Begin Brewing are reachable without horizontal scrolling.
- [ ] Brewing controls have readable labels and usable range/select controls.
- [ ] A compatible brew shows potion, quality, and discovery information in text as well as color.
- [ ] An incompatible brew clearly says no potion was created and either identifies the research note or says that no new property was found.

## Ledger, orders, and upgrades

- [ ] The Ledger opens from mobile navigation and each tab can be selected without clipping.
- [ ] Discovery entries and stock remain readable at both widths.
- [ ] Order effect, quality requirement, reward, deadline, and delivery state remain understandable without relying only on color.
- [ ] Upgrade name, cost/installed state, bonus, and purchase state are visible and the action is reachable.

## Settings and reset flow

- [ ] The settings dialog fits the viewport, including the close control.
- [ ] Reduced-motion can be toggled with a visible focus indicator.
- [ ] Reset all progress displays its destructive-action confirmation and can be cancelled.

## Cross-cutting checks

- [ ] No horizontal overflow appears while moving among Shelf, Brew, Ledger, Upgrades, and Settings.
- [ ] All interactive controls have an apparent touch target of at least 44 by 44 CSS pixels where layout permits.
- [ ] Keyboard focus is visible and follows a sensible order when a hardware keyboard is available.
- [ ] Status changes, including brew results and toasts, are readable text and remain available without color perception.
- [ ] With reduced motion enabled, brewing and interface animations are minimized.

## Playthrough record

| Date | Browser / OS | Viewport or device | Flow checked | Result | Notes / follow-up |
| --- | --- | --- | --- | --- |
| | | 320 px | | Pass / needs follow-up | |
| | | iPhone-width | | Pass / needs follow-up | |
