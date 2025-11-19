import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { useColorScheme } from 'react-native';
import themeColors from '@/theme/Colors';
import Logo from '@/assets/Logo';

interface SplashScreenProps {
  // Future props can be added here
}

/**
 * Splash screen with animated logo
 *
 * Animation duration is designed to match MINIMUM_SPLASH_DURATION (3 seconds)
 * in src/app/index.tsx to ensure continuous motion throughout the entire
 * splash screen display time.
 *
 * Animation sequence:
 * - Opacity fade-in: 1200ms
 * - Scale animation with breathing effect: ~2600ms total
 *   - Initial bounce: 1000ms (0.8 → 1.0)
 *   - Subtle grow: 800ms (1.0 → 1.02)
 *   - Subtle shrink: 800ms (1.02 → 1.0)
 * - Vertical translation: 1000ms
 */
const SplashScreen: React.FC<SplashScreenProps> = () => {
  const colorScheme = useColorScheme();
  const colors = themeColors[colorScheme || 'light'];

  // Animation values
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const logoTranslateY = useSharedValue(20);

  useEffect(() => {
    // Logo entrance animation sequence - extended to match 3s minimum splash duration
    logoOpacity.value = withTiming(1, { duration: 1200 });
    logoScale.value = withSequence(
      withTiming(1, {
        duration: 1000,
        easing: Easing.out(Easing.back(1.1)),
      }),
      withTiming(1.02, {
        duration: 800,
        easing: Easing.inOut(Easing.ease),
      }),
      withTiming(1, {
        duration: 800,
        easing: Easing.inOut(Easing.ease),
      })
    );
    logoTranslateY.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [
      { scale: logoScale.value },
      { translateY: logoTranslateY.value },
    ],
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <Logo />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
