# Sprint Plan - Club Xadrez

Date: 2026-05-18

## Goals
- Improve iPhone login responsiveness and spacing.
- Seed ranking with mock players and enable score progression.
- Fix chess pieces color separation on iPhone.
- Fix API client to support PATCH calls.

## Sprint 1 (Core Fixes)

### 1) Login screen spacing on iPhone
- Ensure inputs and buttons do not touch screen edges.
- Add consistent horizontal padding and safe-area spacing.
- Verify on iPhone and web.

### 2) Fix API client PATCH
- Add `patch` method to API wrapper.
- Update any call sites using patch.
- Add basic error logging for failed requests.

### 3) Ranking seed data
- Create mock users in backend (seed script or manual insert).
- Expose ranking endpoint data for display.
- Confirm ranking screen renders real data.

## Sprint 2 (Gameplay + Progression)

### 4) Score progression rules
- When user wins a match, increase points.
- When user adds points in settings, update backend and UI.
- Ensure ranking updates after points change.

### 5) Chess piece colors on iPhone
- Verify board rendering logic for piece color assets.
- Ensure correct mapping of black/white pieces on iOS.
- Test interactions after the fix.

## Dependencies
- Backend must be running and accessible from device.
- Database migrations applied.

## Definition of Done
- iPhone login layout is padded and responsive.
- PATCH requests work without runtime errors.
- Ranking shows seeded players and updates after score changes.
- Chess pieces display correct colors on iPhone.
