# Bug List

## UI/Layout Issues

### Standings - Week Number Layout
**Status:** Open
**Priority:** Low
**Description:** In standings, fix the layout for the number of weeks when it becomes double digits (10+). The layout may not properly accommodate the extra digit.

**Location:** Standings component
**Steps to Reproduce:**
1. Create or view a league with 10+ weeks
2. Navigate to standings view
3. Observe layout issues with week numbers

**Expected Behavior:** Week numbers should display properly regardless of single or double digits

**Actual Behavior:** Layout breaks or doesn't accommodate double-digit week numbers properly
