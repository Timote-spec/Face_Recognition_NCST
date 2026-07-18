# TODO — Fix Profile Picture Persistence

## Step 1 — Investigate current profile picture flow
- [x] Read backend routes for auth and image upload/retrieval.
- [ ] Locate where UI sets avatar image URL and how it loads profile data after login/refresh.

## Step 2 — Validate DB linkage & persistent storage
- [ ] Confirm `registrants.photo_path` column exists and is written during `/upload/photo`.
- [ ] Confirm uploaded files are written under persistent `uploads/` directory.
- [ ] Confirm `/api/v1/images/{user_id}` retrieves from `registrants.photo_path` and falls back only when empty/missing.

## Step 3 — Fix any URL generation mismatch
- [x] Ensure backend image retrieval uses `photo_path` and returns default avatar only when no photo exists.
- [ ] Ensure frontend profile page uses the DB-backed photo URL (not frontend-only state).

## Step 4 — Remove conflicting/duplicate profile image logic
- [ ] Search for other avatar/photo logic in frontend JS and other backend routes.
- [ ] Ensure no legacy logic overwrites avatar state with default.

## Step 5 — Verification tests
- [ ] Test with ADMIN, STAFF, STUDENT accounts:
  - [ ] Logout/Login
  - [ ] Browser Refresh
  - [ ] Browser Close/Reopen
  - [ ] Server Restart
  - [ ] Token Refresh
- [ ] Verify uploaded files remain accessible after server restart.

## Step 6 — Regression & hardening
- [ ] Add/adjust cache headers (avoid persistent caching of default when photo exists).
- [ ] Add basic automated checks (curl or existing test suite).

