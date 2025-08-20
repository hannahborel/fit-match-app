import 'dotenv/config';
import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'fit-match-web',
  slug: 'fit-match-web',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  extra: {
    API_BASE_URL: process.env.API_BASE_URL,
    API_LOCAL_IP: process.env.API_LOCAL_IP,
    WEB_APP_URL: process.env.WEB_APP_URL || 'http://localhost:3000',
  },
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  scheme: 'fit-match-web',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.fitmatch.app',
    associatedDomains: ['applinks:fitmatch.app'],
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.fitmatch.app',
    intentFilters: [
      {
        action: 'VIEW',
        autoVerify: true,
        data: [
          {
            scheme: 'https',
            host: 'fitmatch.app',
            pathPrefix: '/join',
          },
        ],
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: ['expo-router', 'expo-secure-store'],
});
