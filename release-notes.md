# Release Notes

## 2025-11-16

### Bug Fixes

#### Fixed League Data Atom Synchronization Issue
**Priority:** High
**Impact:** State Management, Data Display

**Problem:**
The league data atom was null in the Standings tab even though league data was loaded in the Home tab. This caused "Loading standings..." to display indefinitely when navigating to the Standings tab.

**Root Cause:**
- React Query cache was being populated on app initialization via `queryClient.setQueryData()`
- `useGetLeague()` hook had `refetchOnMount: false`, so it returned cached data without calling the `queryFn`
- Since `queryFn` didn't run, `setLeague(league)` was never called, leaving the atom as `null`
- The atom was only being set when fresh data was fetched, not when cached data was returned

**Solution:**
1. **Centralized league data fetching**: Moved `useGetLeague()` call to the tabs layout (`_layout.tsx`) so all child tabs can access data via the atom
2. **Atom synchronization**: Added `useEffect` to sync React Query data to atom whenever it changes, regardless of source (fresh fetch or cache)
3. **Simplified tab components**: Removed redundant `useGetLeague()` calls from individual tabs; they now read from the atom using `useAtomValue()`

**Files Modified:**
- `src/hooks/useGetLeague.tsx` - Added `useEffect` to sync query data to atom
- `src/app/(protected)/(tabs)/_layout.tsx` - Added `useGetLeague()` call at layout level
- `src/app/(protected)/(tabs)/index.tsx` - Removed redundant `useGetLeague()`, now uses `useAtomValue()`

**Technical Details:**
- React Query cache and Jotai atom now stay in sync via `useEffect` hook
- League data is fetched once at the tabs layout level, eliminating redundant calls
- All tabs (Home, Standings, Schedule) read from the same atom source
- Atom pattern is now efficient and truly centralized

**User Experience:**
- Standings tab now displays data immediately when navigated to
- No more "Loading standings..." when data is already cached
- Consistent data across all tabs

---

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
