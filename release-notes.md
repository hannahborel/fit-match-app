# Release Notes

## 2025-11-19

### Bug Fixes

#### Fixed Splash Screen Animation Timing
**Priority:** Medium
**Impact:** User Experience, Visual Polish

**Problem:**
The splash screen was configured to display for a minimum of 3 seconds, but the logo animation only lasted 1 second. This created an awkward 2-second pause where the logo sat static on the screen with no animation, making the app feel unresponsive.

**Root Cause:**
- Splash screen had `MINIMUM_SPLASH_DURATION = 3000ms` to ensure proper loading time
- Logo animation sequence completed in ~1000ms (opacity: 800ms, scale: 1000ms, translateY: 1000ms)
- 2-second gap between animation completion and navigation made the splash feel "stuck"

**Solution:**
Extended the logo animation to span the full 3-second duration:
1. **Increased opacity animation** from 800ms to 1200ms for smoother fade-in
2. **Added breathing animation** to logo scale using `withSequence`:
   - Initial scale animation: 1000ms (0.8 → 1.0 with bounce effect)
   - Subtle grow: 800ms (1.0 → 1.02)
   - Subtle shrink: 800ms (1.02 → 1.0)
   - Total animation time: ~2600ms, spanning nearly the entire splash duration

**Files Modified:**
- `src/components/elements/SplashScreen.tsx`

**User Experience:**
- Logo now has continuous, smooth motion throughout the entire splash screen
- No more awkward pause - the animation feels alive and engaging
- Professional, polished app launch experience

---

#### Fixed Navigation Glitch After Refresh
**Priority:** High
**Impact:** Navigation, State Management, User Experience

**Problem:**
After refreshing the app, clicking on the Accounts tab (or any tab other than Home) would cause a brief visual glitch where the Home tab would flash an empty/blank screen. If users waited a few seconds after refresh, the issue wouldn't occur, indicating a race condition.

**Root Cause:**
The app's "instant navigation" cache optimization path had a critical flaw:
1. On refresh, `index.tsx` would check AsyncStorage cache to determine if user has a league
2. If cache indicated "has league", it would **navigate immediately** to tabs **without fetching league data**
3. It would start a background fetch (`verifyAndUpdateCache()`) to get the actual data
4. During this gap, the `leagueAtom` was `null/undefined`
5. The Home tab's component would render nothing when `leagueData` was null (originally wrapped in `{leagueData && (...)}`), causing a blank flash
6. When users clicked on other tabs, this blank Home component would briefly appear during tab transitions

**Solution:**
1. **Synchronous data fetch before navigation**: Modified the cached state path to fetch league data BEFORE navigating to tabs, ensuring the atom is populated before any components mount
2. **Atom initialization in index.tsx**: Added `setLeague(league)` calls in all navigation paths to ensure the atom is set before navigation occurs
3. **Defensive rendering in Home tab**: Added explicit loading state that renders an empty `SafeAreaView` with proper background color while data loads, preventing layout shift

**Files Modified:**
- `src/app/index.tsx` - Fetch league data before navigation in cached path (lines 78-100)
- `src/app/index.tsx` - Set atom immediately before navigation in fresh fetch path (line 137)
- `src/app/index.tsx` - Set atom in background verification path (line 182)
- `src/app/(protected)/(tabs)/index.tsx` - Added loading state with proper SafeAreaView (lines 46-56)

**Technical Details:**
Changed flow from:
```
Cached State → Navigate → Empty Atom → Background Fetch → Populate Atom (causing glitch)
```

To:
```
Cached State → Fetch League → Populate Atom → Navigate → Background Verification
```

**User Experience:**
- No more blank screen flashing when navigating between tabs after refresh
- Smooth, instant navigation to any tab immediately after app loads
- Home tab always renders with proper background color, even during loading
- Professional, glitch-free experience regardless of navigation timing

---

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
