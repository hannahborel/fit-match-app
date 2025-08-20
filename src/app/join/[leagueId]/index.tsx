import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Animated,
  StatusBar,
  Alert,
  Linking,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  storeInvitationContext,
  generateWebFallbackUrl,
  openAppOrWeb,
} from '@/lib/deepLinking';
import { themeColors } from '@/theme/Colors';

interface LeagueInfo {
  id: string;
  name: string;
  description: string;
  size: number;
  weeks: number;
  startDate: string;
  currentMemberCount: number;
  ownerName: string;
}

export default function JoinLeaguePage() {
  const { leagueId } = useLocalSearchParams<{ leagueId: string }>();
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const [league, setLeague] = useState<LeagueInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fadeAnim = new Animated.Value(0);

  // Use dark theme colors for the beautiful UI
  const colors = themeColors.dark;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (!leagueId) {
      setError('No league ID provided');
      setLoading(false);
      return;
    }

    const fetchLeagueInfo = async () => {
      try {
        // For mobile testing, we'll use a mock league
        // In production, this would call the mobile API
        const mockLeague: LeagueInfo = {
          id: leagueId || 'unknown',
          name: 'FitMatch Fitness League',
          description: 'A fun way to stay active and compete with friends!',
          size: 8,
          weeks: 12,
          startDate: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000,
          ).toISOString(), // 1 week from now
          currentMemberCount: 3,
          ownerName: 'Hannah',
        };
        setLeague(mockLeague);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load league');
        setLoading(false);
      }
    };

    fetchLeagueInfo();
  }, [leagueId]);

  const handleJoinLeague = async () => {
    if (!isSignedIn) {
      // Store invitation context for when they sign in
      await storeInvitationContext(leagueId, 'deep_link');

      // Redirect to sign in
      router.push('/(auth)/login-email');
      return;
    }

    // If they're signed in, implement the actual join logic
    setJoining(true);
    try {
      // TODO: Implement actual join league API call
      // For now, show success message and redirect
      Alert.alert('Success!', 'You have joined the league successfully!', [
        {
          text: 'Go to Dashboard',
          onPress: () => {
            router.push('/(protected)/(tabs)');
          },
        },
      ]);
    } catch (error) {
      setError('Failed to join league. Please try again.');
    } finally {
      setJoining(false);
    }
  };

  const handleOpenWebApp = async () => {
    try {
      const webUrl = generateWebFallbackUrl(leagueId);
      await Linking.openURL(webUrl);
    } catch (error) {
      Alert.alert('Error', 'Failed to open web app');
    }
  };

  const DetailCard = ({
    label,
    value,
    subtitle,
  }: {
    label: string;
    value: string;
    subtitle?: string;
  }) => (
    <View style={styles.detailCard}>
      <View style={styles.detailCardContent}>
        <Text
          style={[styles.detailLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}
        >
          {label}
        </Text>
        <Text
          style={[styles.detailValue, { color: 'rgba(255, 255, 255, 0.95)' }]}
        >
          {value}
        </Text>
        {subtitle && (
          <Text
            style={[
              styles.detailSubtitle,
              { color: colors.onPrimaryContainer },
            ]}
          >
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );

  const StatChip = ({
    number,
    label,
  }: {
    number: string | number;
    label: string;
  }) => (
    <View style={styles.statChip}>
      <Text style={[styles.statNumber, { color: colors.onPrimaryContainer }]}>
        {number}
      </Text>
      <Text style={[styles.statLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>
        {label}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.background}
        />
        <View
          style={[
            styles.backgroundGradient,
            { backgroundColor: colors.surface },
          ]}
        />
        <SafeAreaView style={styles.safeArea}>
          <Text style={[styles.loadingText, { color: colors.onBackground }]}>
            Loading league information...
          </Text>
        </SafeAreaView>
      </View>
    );
  }

  if (error || !league) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.background}
        />
        <View
          style={[
            styles.backgroundGradient,
            { backgroundColor: colors.surface },
          ]}
        />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.errorCard}>
            <Text style={[styles.errorTitle, { color: colors.error }]}>
              League Not Found
            </Text>
            <Text style={[styles.errorText, { color: colors.onSurface }]}>
              {error || 'This invitation link is invalid or has expired.'}
            </Text>
            <Pressable
              style={styles.primaryButton}
              onPress={() => router.push('/(protected)/(tabs)')}
            >
              <Text style={styles.primaryButtonText}>Go to Dashboard</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const remainingSpots = league.size - league.currentMemberCount;

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.surface} />

      {/* Background Gradient */}
      <View
        style={[
          styles.backgroundGradient,
          { backgroundColor: colors.background },
        ]}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Main Card */}
          <View
            style={[
              styles.mainCard,
              { backgroundColor: `${colors.surface}95` },
            ]}
          >
            {/* Top Gradient Bar */}
            <View
              style={[styles.gradientBar, { backgroundColor: colors.primary }]}
            />

            <View style={styles.cardContent}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={[styles.leagueTitle, { color: colors.onSurface }]}>
                  {league.name} League 2025
                </Text>
                <Text
                  style={[
                    styles.invitationText,
                    { color: 'rgba(255, 255, 255, 0.7)' },
                  ]}
                >
                  {league.ownerName} invited you
                </Text>
              </View>

              {/* Detail Cards */}
              <View style={styles.detailCardsContainer}>
                <DetailCard
                  label="Start Date"
                  value={formatDate(league.startDate)}
                />
                <DetailCard label="Duration" value={`${league.weeks} weeks`} />
                <DetailCard
                  label="Members"
                  value={`${league.currentMemberCount} of ${league.size}`}
                  subtitle={`${remainingSpots} spots open`}
                />
              </View>

              {/* Join Button */}
              <Pressable
                style={[styles.joinButton, { backgroundColor: colors.primary }]}
                onPress={handleJoinLeague}
                disabled={joining}
              >
                <Text
                  style={[styles.joinButtonText, { color: colors.onPrimary }]}
                >
                  {joining ? 'Joining...' : 'Join League'}
                </Text>
              </Pressable>

              {!isSignedIn && (
                <Text
                  style={[
                    styles.signInPrompt,
                    { color: 'rgba(255, 255, 255, 0.7)' },
                  ]}
                >
                  You'll need to sign in to join this league
                </Text>
              )}

              {/* Web App Button */}
              <Pressable style={styles.webAppButton} onPress={handleOpenWebApp}>
                <Text
                  style={[styles.webAppButtonText, { color: colors.onSurface }]}
                >
                  Open in Web App
                </Text>
              </Pressable>

              {/* Footer Info */}
              <Text
                style={[
                  styles.footerInfo,
                  { color: 'rgba(255, 255, 255, 0.6)' },
                ]}
              >
                Standard scoring • Snake draft
              </Text>
            </View>
          </View>

          {/* Additional Info Cards */}
          <View style={styles.infoCardContainer}>
            <View
              style={[
                styles.infoCard,
                { backgroundColor: 'rgba(255, 255, 255, 0.05)' },
              ]}
            >
              <View
                style={[
                  styles.infoIconContainer,
                  { backgroundColor: `${colors.primary}20` },
                ]}
              >
                <Text style={styles.infoIcon}>ℹ️</Text>
              </View>
              <View style={styles.infoTextContainer}>
                <Text
                  style={[
                    styles.infoTitle,
                    { color: 'rgba(255, 255, 255, 0.9)' },
                  ]}
                >
                  League Settings
                </Text>
                <Text
                  style={[
                    styles.infoDescription,
                    { color: 'rgba(255, 255, 255, 0.6)' },
                  ]}
                >
                  {league.description}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 64,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '500',
  },
  errorCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  mainCard: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  gradientBar: {
    height: 4,
  },
  cardContent: {
    padding: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  leagueTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 36,
  },
  invitationText: {
    fontSize: 16,
    fontWeight: '500',
  },
  invitationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
  },
  trophyIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  invitationBadgeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  detailCardsContainer: {
    marginBottom: 24,
  },
  detailCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: 16,
  },
  detailCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 20,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.95)',
  },
  detailSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
    color: 'rgb(104, 255, 139)',
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  statChip: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  joinButton: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 8,
    shadowColor: 'rgba(47, 112, 250, 0.4)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
  },
  joinButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  signInPrompt: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
  },
  webAppButton: {
    marginTop: 16,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  webAppButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  footerInfo: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 12,
  },
  infoCardContainer: {
    marginTop: 24,
  },
  infoCard: {
    marginHorizontal: 8,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  infoIcon: {
    fontSize: 18,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 12,
  },
});
