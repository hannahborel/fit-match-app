# Release Notes

## 2025-11-16

### Bug Fixes

#### Fixed Cross-Device League Detection Issue
**Priority:** High
**Impact:** Navigation, Cache System

**Problem:**
Users who created a league on one device (e.g., TestFlight) would not see their league when signing in on another device (e.g., local development). The app would incorrectly navigate them to the "Create League" screen even though their league existed in the database.

**Root Cause:**
- The cache verification logic only ran for users whose cached state indicated they had a league
- Users with stale "no league" cache never verified with the database on subsequent sign-ins
- The navigation guard prevented background verification from correcting the navigation after discovering the league existed

**Solution:**
1. **Always verify cache in background**: Moved `verifyAndUpdateCache()` to run for all users regardless of cached league state, ensuring cross-device changes are detected
2. **Added force navigation option**: Extended `navigateTo()` function with a `force` parameter to allow background verification to override the initial cached navigation
3. **Improved state synchronization**: Background verification now properly redirects users when cached state doesn't match database state

**Files Modified:**
- `src/app/index.tsx`

**Technical Details:**
- Cache verification now runs on line 79 for all authenticated users
- `navigateTo()` function signature updated to accept optional `{ force?: boolean }` parameter
- Background verification uses `force: true` when redirecting after detecting state changes
- Forced navigations skip the splash screen minimum duration requirement

**User Experience:**
- Users may briefly see the cached screen before being redirected to the correct screen
- Redirection happens automatically within ~1 second after app initialization
- No manual intervention required - the app self-corrects based on database state
