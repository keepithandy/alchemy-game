# Future Save Export and Import Contract

This document defines the compatibility contract for a future player-controlled save transfer. It does not add export or import controls and does not change the current local-save schema.

## Export shape

An exported file must be a JSON object with a format identifier, a numeric format version, and one `state` object. The state must include only normal persisted game progress:

- day, gold, and reputation;
- inventory and known effects;
- selected ingredients and brewing controls;
- discoveries, potions, and the last completed result;
- active and completed customer orders;
- installed upgrades, brew count, and player settings.

The export must not include browser storage keys, unrelated localStorage values, account data, analytics, or executable code.

## Version and validation rules

- New exports must declare an explicit format version.
- Import must accept only supported versions, then normalize and validate every expected field before replacement.
- A future migration may transform an older supported format into the current internal state, but it must not silently guess unsupported formats.
- Malformed JSON, missing required structure, unsupported versions, invalid field types, or impossible data must show a clear error and leave the current save unchanged.

## Player control and destructive-action warning

Import must be initiated from an explicit player action. Before replacing progress, the UI must clearly warn that the imported save will replace the local progress in this browser. It must offer a final confirmation and a way to cancel.

An implementation must keep a validated copy of the current in-memory state until the imported state has passed validation and has been written successfully. If validation or persistence fails, the current state remains playable and unchanged.

## Deliberate non-goals

- No automatic cloud sync or account linkage.
- No background import from downloaded files.
- No reset action hidden inside import.
- No save-schema change in this documentation-only issue.
