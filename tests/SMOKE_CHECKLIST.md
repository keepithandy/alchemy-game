# Smoke Test Access

The game contains a built-in non-destructive logic smoke suite.

When served locally, open:

`http://localhost:<port>/?smoke=1`

The page writes a `SMOKE 12/12 PASS` result at the bottom and sets `data-smoke="pass"` on the root HTML element.

The suite uses temporary in-memory states for gameplay checks and does not overwrite normal progress.
