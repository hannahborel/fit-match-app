# Testing Setup for FitMatch App

## Current Jest Configuration Status

The project uses **React Native 0.79.6** which has known compatibility issues with Jest due to:
1. Flow type syntax in `@react-native/js-polyfills`
2. ESM imports in `expo-modules-core/src/web` files

###  Files Created for Testing

1. **[src/components/__tests__/DeleteAccountBtn.test.tsx](src/components/__tests__/DeleteAccountBtn.test.tsx)**
   - Comprehensive unit tests for DeleteAccountButton
   - Tests redirect to login after account deletion
   - Tests loading states, error handling, and function call order

2. **[src/components/__tests__/DeleteAccountBtn.manual-test.md](src/components/__tests__/DeleteAccountBtn.manual-test.md)**
   - Manual testing guide for the delete account feature
   - Step-by-step instructions to verify redirect behavior
   - Verification checklist

3. **Jest Configuration Files**:
   - `jest.config.js` - Main configuration with mocks for compatibility
   - `jest.setup.js` - Setup file with mocks for expo-router, Clerk, etc.
   - `jest.polyfill.js` - Early setup to prevent polyfill issues
   - `__mocks__/error-guard.js` - Mock for @react-native polyfills
   - `__mocks__/expo-modules-core.js` - Mock for expo-modules-core

## Recommended Solutions

### Option 1: Manual Testing (Recommended for Now)
Use the manual test plan: [src/components/__tests__/DeleteAccountBtn.manual-test.md](src/components/__tests__/DeleteAccountBtn.manual-test.md)

This is the most reliable way to test the delete account functionality until the Jest issues are resolved.

### Option 2: Upgrade Testing Libraries
```bash
pnpm add -D @testing-library/react-native@latest jest-expo@latest
```

Then try running tests again.

### Option 3: Use Detox for E2E Testing
For integration/E2E tests that verify the full redirect flow, consider using Detox:
```bash
pnpm add -D detox detox-cli
```

### Option 4: Wait for React Native 0.80+
React Native 0.80+ may have better Jest support. Monitor:
- https://github.com/facebook/react-native/releases
- https://github.com/expo/expo/releases

## What the Tests Cover

The automated test suite in `DeleteAccountBtn.test.tsx` covers:

✅ Button renders correctly
✅ Confirmation alert appears on button press
✅ **Redirects to `/` (login) after successful deletion**
✅ Loading indicator shows during deletion
✅ Error handling when token is unavailable
✅ Error alert displays when deletion fails
✅ No sign out or redirect if deletion fails
✅ Functions called in correct order (deleteAccount → clearCache → signOut → redirect)
✅ Button disabled during deletion

## Running Tests (When Jest Config is Fixed)

```bash
# Run all tests
npm test

# Run specific test file
npm test -- src/components/__tests__/DeleteAccountBtn.test.tsx

# Run with coverage
npm test -- --coverage

# Watch mode
npm run test:watch
```

## Manual Testing the Redirect

The most important test - **verifying redirect to login after account deletion** - can be done manually:

1. Run the app: `npm start`
2. Navigate to account settings
3. Tap "Delete Account"
4. Confirm deletion
5. **Expected**: App redirects to `/` (login/onboarding page)
6. **Expected**: User is signed out
7. **Expected**: Cache is cleared

See the full manual test plan for detailed steps.

## Future Improvements

Once Jest is working, you can:
- Run automated tests in CI/CD
- Add snapshot testing for UI components
- Add integration tests for full user flows
- Monitor test coverage metrics
