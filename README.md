# Fit Match Web

A React Native application built with Expo and TypeScript.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/) (recommended)
- [Expo Go](https://expo.dev/client) app on your mobile device

### iOS Development Requirements

- macOS (required for iOS development)
- Xcode (latest version from the Mac App Store)
- [CocoaPods](https://cocoapods.org/) (`sudo gem install cocoapods`)
- [Watchman](https://facebook.github.io/watchman/) (`brew install watchman`)

### Android Development Requirements

- [Android Studio](https://developer.android.com/studio)
- [Android SDK](https://developer.android.com/studio#command-tools)
- [Java Development Kit (JDK)](https://adoptium.net/) (version 11 or newer)

## Getting Started

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd fit-match-web
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   # Using npm
   npm start

   # Alternative using npx
   npx expo start
   ```

4. Run on your device:
   - Scan the QR code with your phone's camera (iOS) or the Expo Go app (Android)
   - Or press 'i' for iOS simulator or 'a' for Android emulator

## Development Workflow

### Running in VS Code

1. Open the project in VS Code
2. Install recommended extensions:
   - ESLint
   - Prettier
   - React Native Tools
3. Start the development server:

   ```bash
   # Using npm
   npm start

   # Alternative using npx
   npx expo start
   ```

4. Use the Expo Go app on your device or an emulator/simulator

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format
```

## Production Builds

### iOS

```bash
# Build for iOS
eas build --platform ios

# Alternative using npx
npx expo prebuild --platform ios
npx expo build:ios

# Submit to App Store
eas submit --platform ios
```

### Android

```bash
# Build for Android
eas build --platform android

# Alternative using npx
npx expo prebuild --platform android
npx expo build:android

# Submit to Play Store
eas submit --platform android
```

## Project Structure

This project uses [Expo Router](https://docs.expo.dev/router/introduction/) for file-based routing:

```
app/
├── _layout.tsx      # Root layout with navigation configuration
├── index.tsx        # Home screen
└── [param].tsx      # Dynamic routes
```

## Useful Resources

### Documentation

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### Development Tools

- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [ESLint Documentation](https://eslint.org/docs/user-guide/getting-started)
- [Prettier Documentation](https://prettier.io/docs/en/)

### Troubleshooting

- [Expo Troubleshooting Guide](https://docs.expo.dev/troubleshooting/common-issues/)
- [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting)

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run tests and linting
4. Submit a pull request
