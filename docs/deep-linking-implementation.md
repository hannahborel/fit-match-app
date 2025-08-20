# Deep Linking Implementation for FitMatch

## Overview

This document describes the implementation of a deferred deep linking workflow for the FitMatch app, enabling seamless user experience when sharing league invitations across mobile and web platforms.

## Architecture

### Components

1. **Mobile App Deep Linking** (`fit-match-app/src/lib/deepLinking.ts`)
   - App installation detection
   - Invitation context storage using SecureStore
   - Deep link handling and parsing
   - Fallback to web app

2. **Mobile App Hook** (`fit-match-app/src/hooks/useDeepLinking.ts`)
   - Deep link event handling
   - Pending invitation management
   - Navigation coordination

3. **Web App Smart Banner** (`fit-match-web/components/SmartAppBanner.tsx`)
   - App installation detection
   - Smart app banner display
   - Invitation context storage

4. **Web App Utilities** (`fit-match-web/lib/invitationContext.ts`)
   - Invitation context management
   - localStorage and cookie storage
   - Pending invitation handling

## Workflow

### 1. User Clicks Invitation Link

```
User clicks: https://fitmatch.app/join/{leagueId}
```

### 2. App Detection

**Web App:**

- Detects if user is on mobile device
- Attempts to detect if FitMatch app is installed
- Shows appropriate banner based on detection result

**Mobile App:**

- If app is installed, opens directly to join page
- If app is not installed, opens web fallback

### 3. Smart App Banner Display

**App Installed:**

- Shows "Open in App" button
- User can choose to open app or continue on web

**App Not Installed:**

- Shows "Get the App" button
- User can download app or continue on web
- Stores invitation context for deferred deep linking

### 4. Invitation Context Storage

**Web Storage:**

- localStorage for client-side access
- Cookies for server-side access
- 24-hour expiration

**Mobile Storage:**

- SecureStore for secure storage
- 24-hour expiration

### 5. Deferred Deep Linking

**After App Installation:**

- User opens app for first time
- App checks for stored invitation context
- Automatically navigates to join page
- Clears stored context

## Implementation Details

### Deep Link Scheme

```
fit-match-web://join/{leagueId}
```

### App Detection Methods

**iOS:**

- Custom URL scheme detection
- iframe-based app presence check
- Timeout-based fallback

**Android:**

- Intent-based app detection
- Package name verification
- Timeout-based fallback

### Invitation Context Structure

```typescript
interface InvitationContext {
  leagueId: string;
  timestamp: number;
  source: 'deep_link' | 'web_fallback';
}
```

### Storage Keys

**Mobile App:**

- `invitation_context`: Main context data
- `invitation_timestamp`: Expiry tracking

**Web App:**

- `fitmatch_invitation`: localStorage key
- `fitmatch_invitation`: Cookie name

## Usage Examples

### Mobile App Integration

```typescript
import { useDeepLinking } from '@/hooks/useDeepLinking';

const MyComponent = () => {
  const { pendingInvitation, handlePendingInvitation } = useDeepLinking();

  // Handle pending invitation when user signs in
  useEffect(() => {
    if (pendingInvitation && isSignedIn) {
      handlePendingInvitation();
    }
  }, [pendingInvitation, isSignedIn]);
};
```

### Web App Integration

```typescript
import SmartAppBanner from '@/components/SmartAppBanner';

const JoinPage = ({ leagueId }) => {
  return (
    <div>
      <SmartAppBanner leagueId={leagueId} />
      {/* Rest of join page content */}
    </div>
  );
};
```

### Invitation Context Management

```typescript
import {
  storeInvitationContext,
  getInvitationContext,
} from '@/lib/invitationContext';

// Store context when user chooses web fallback
storeInvitationContext(leagueId, 'web_fallback');

// Check for pending invitations
const context = getInvitationContext();
if (context) {
  // Handle pending invitation
}
```

## Configuration

### Mobile App (app.config.ts)

```typescript
export default {
  // ... other config
  scheme: 'fit-match-web',
  plugins: ['expo-router', 'expo-secure-store'],
};
```

### Web App

No additional configuration required. The system automatically detects mobile devices and shows appropriate banners.

## Testing

### Deep Link Testing

1. **Mobile App Installed:**
   - Click invitation link
   - Should open app directly to join page

2. **Mobile App Not Installed:**
   - Click invitation link
   - Should show smart app banner
   - Should store invitation context

3. **Deferred Deep Linking:**
   - Install app after clicking link
   - Open app
   - Should navigate to join page automatically

### App Detection Testing

1. **iOS Simulator:**
   - Test with and without app installed
   - Verify banner behavior

2. **Android Emulator:**
   - Test with and without app installed
   - Verify banner behavior

3. **Web Browser:**
   - Should not show mobile-specific banners
   - Should work normally

## Security Considerations

1. **Invitation Context Expiry:**
   - 24-hour automatic expiration
   - Prevents stale invitation handling

2. **Secure Storage:**
   - Mobile app uses SecureStore
   - Web app uses localStorage + cookies

3. **Input Validation:**
   - All league IDs are validated
   - Deep link parsing is sanitized

## Error Handling

1. **App Detection Failures:**
   - Graceful fallback to web experience
   - User can manually choose platform

2. **Deep Link Failures:**
   - Automatic fallback to web app
   - Error logging for debugging

3. **Storage Failures:**
   - Graceful degradation
   - User experience not blocked

## Future Enhancements

1. **Universal Links (iOS):**
   - Implement proper universal links
   - Better app detection accuracy

2. **App Links (Android):**
   - Implement proper app links
   - Better app detection accuracy

3. **Analytics:**
   - Track deep link usage
   - Monitor conversion rates

4. **A/B Testing:**
   - Test different banner designs
   - Optimize user experience

## Troubleshooting

### Common Issues

1. **App Not Opening:**
   - Check deep link scheme configuration
   - Verify app is properly installed
   - Check for URL scheme conflicts

2. **Banner Not Showing:**
   - Verify mobile device detection
   - Check browser compatibility
   - Verify component integration

3. **Context Not Storing:**
   - Check storage permissions
   - Verify storage key names
   - Check for storage quota issues

### Debug Steps

1. **Enable Console Logging:**
   - Check browser console for errors
   - Check mobile app logs

2. **Verify Configuration:**
   - Check app.config.ts settings
   - Verify deep link scheme

3. **Test Deep Links:**
   - Use device/emulator testing
   - Verify link parsing

## Support

For issues or questions regarding the deep linking implementation:

1. Check this documentation
2. Review console logs
3. Test with different devices/platforms
4. Contact development team
