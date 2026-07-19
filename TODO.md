# UI/UX Redesign Audit — Implementation TODO

## Step 1: Global UI system improvements (safe)
- [x] Add focus-visible ring styles for buttons, inputs, links.
- [x] Make `table.data thead th` sticky.
- [x] Add desktop sidebar collapsed mode styles + smooth animation.


## Step 2: Dashboard animated counters
- [ ] Implement `App.animateNumber()` helper (or in shared.js) using `requestAnimationFrame`.
- [ ] Apply animated counters to:
  - [ ] Student overview stat cards
  - [ ] Staff/Admin overview stat cards

## Step 3: Tables: loading/empty/search consistency
- [ ] Add table-wrap scrollbar polish.
- [ ] Add consistent empty/loading states where JS already renders them.

## Step 4: Button standardization
- [ ] Ensure consistent focus/hover/active states across all `.btn*`.

## Step 5: Form icon standardization (JS-generated)
- [ ] Add icon-inside-input utility classes in CSS.
- [ ] Update key JS-generated modal/form templates in shared.js + admin.js to use the icon classes.

## Step 6: Scanner pages visual consistency
- [ ] Move duplicated kiosk styles into shared CSS (only if safe).
- [ ] Keep scanner JS logic untouched.

## Step 7: Notification dropdown audit
- [ ] Verify notification UI meets requirements (dropdown, unread states, animation).

## Step 8: Audit sweep

## Step 9: Testing + reporting
- [ ] Manually open key routes and validate no feature breaks.
- [ ] Run available automated tests.
- [ ] Generate list of modified files.

