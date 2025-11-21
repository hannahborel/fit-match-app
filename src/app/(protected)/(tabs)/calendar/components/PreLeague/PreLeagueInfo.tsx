import { getAvatarByIndex } from '@/assets/avatar';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from 'react-native';
import { Avatar, Button, useTheme } from 'react-native-paper';
import { Calendar, TrendingUp, Users } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type OnboardingSlide = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};

type StandingsOnboardingProps = {
  onComplete: () => void;
};

const StandingsOnboarding: React.FC<StandingsOnboardingProps> = ({
  onComplete,
}) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  // Slide 1: Standings Overview
  const StandingsPreview = () => (
    <View style={styles.previewContainer}>
      {/* Preview of standings rows */}
      <View style={styles.standingsRow}>
        <View style={styles.standingsLeft}>
          <Avatar.Image size={30} source={getAvatarByIndex(0)} />
          <Text style={[styles.playerName, { color: theme.colors.onSurface }]}>
            Player 1
          </Text>
        </View>
        <Text style={[styles.points, { color: theme.colors.onSurface }]}>
          207
        </Text>
      </View>

      <View style={styles.standingsRow}>
        <View style={styles.standingsLeft}>
          <Avatar.Image size={30} source={getAvatarByIndex(1)} />
          <Text style={[styles.playerName, { color: theme.colors.onSurface }]}>
            Player 2
          </Text>
        </View>
        <Text style={[styles.points, { color: theme.colors.onSurface }]}>
          124
        </Text>
      </View>

      {/* Expanded breakdown example */}
      <View
        style={[
          styles.standingsRow,
          {
            backgroundColor: theme.colors.primaryContainer,
            opacity: 0.8,
          },
        ]}
      >
        <View style={styles.standingsLeft}>
          <Avatar.Image size={30} source={getAvatarByIndex(2)} />
          <Text
            style={[
              styles.playerName,
              { color: theme.colors.onPrimaryContainer },
            ]}
          >
            Player 3
          </Text>
        </View>
        <Text
          style={[styles.points, { color: theme.colors.onPrimaryContainer }]}
        >
          121
        </Text>
      </View>

      {/* Breakdown rows */}
      <View
        style={[
          styles.breakdownRow,
          { backgroundColor: theme.colors.primaryContainer, opacity: 0.6 },
        ]}
      >
        <Text
          style={[
            styles.breakdownLabel,
            { color: theme.colors.onPrimaryContainer },
          ]}
        >
          STRENGTH
        </Text>
        <Text
          style={[
            styles.breakdownPoints,
            { color: theme.colors.onPrimaryContainer },
          ]}
        >
          90
        </Text>
      </View>
      <View
        style={[
          styles.breakdownRow,
          { backgroundColor: theme.colors.primaryContainer, opacity: 0.6 },
        ]}
      >
        <Text
          style={[
            styles.breakdownLabel,
            { color: theme.colors.onPrimaryContainer },
          ]}
        >
          CARDIO
        </Text>
        <Text
          style={[
            styles.breakdownPoints,
            { color: theme.colors.onPrimaryContainer },
          ]}
        >
          31
        </Text>
      </View>

      <View style={styles.standingsRow}>
        <View style={styles.standingsLeft}>
          <Avatar.Image size={30} source={getAvatarByIndex(3)} />
          <Text style={[styles.playerName, { color: theme.colors.onSurface }]}>
            Player 4
          </Text>
        </View>
        <Text style={[styles.points, { color: theme.colors.onSurface }]}>
          93
        </Text>
      </View>
    </View>
  );

  // Slide 2: Schedule Overview
  const SchedulePreview = () => (
    <View style={styles.previewContainer}>
      <View style={styles.scheduleHeader}>
        <Text style={[styles.scheduleWeek, { color: theme.colors.onSurface }]}>
          WEEK 1
        </Text>
      </View>

      {/* Team matchup preview */}
      <View
        style={[styles.matchupCard, { backgroundColor: theme.colors.surface }]}
      >
        <View style={styles.team}>
          <View style={styles.teamRow}>
            <Avatar.Image size={24} source={getAvatarByIndex(0)} />
            <Text
              style={[styles.teamPlayerName, { color: theme.colors.onSurface }]}
            >
              Player 1
            </Text>
          </View>
          <View style={styles.teamRow}>
            <Avatar.Image size={24} source={getAvatarByIndex(1)} />
            <Text
              style={[styles.teamPlayerName, { color: theme.colors.onSurface }]}
            >
              Player 2
            </Text>
          </View>
        </View>

        <Text style={[styles.vsText, { color: theme.colors.onSurface }]}>
          VS
        </Text>

        <View style={styles.team}>
          <View style={styles.teamRow}>
            <Avatar.Image size={24} source={getAvatarByIndex(2)} />
            <Text
              style={[styles.teamPlayerName, { color: theme.colors.onSurface }]}
            >
              Player 3
            </Text>
          </View>
          <View style={styles.teamRow}>
            <Avatar.Image size={24} source={getAvatarByIndex(3)} />
            <Text
              style={[styles.teamPlayerName, { color: theme.colors.onSurface }]}
            >
              Player 4
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  // Slide 3: Team Rotation Info
  const TeamRotationPreview = () => (
    <View style={styles.previewContainer}>
      <View style={styles.rotationContainer}>
        <View style={styles.weekSection}>
          <Text
            style={[styles.weekLabel, { color: theme.colors.onSurfaceVariant }]}
          >
            WEEK 1
          </Text>
          <View style={styles.teamPair}>
            <View style={styles.miniTeam}>
              <Avatar.Image size={20} source={getAvatarByIndex(0)} />
              <Avatar.Image
                size={20}
                source={getAvatarByIndex(1)}
                style={{ marginLeft: -8 }}
              />
            </View>
            <Text style={[styles.vsSmall, { color: theme.colors.onSurface }]}>
              vs
            </Text>
            <View style={styles.miniTeam}>
              <Avatar.Image size={20} source={getAvatarByIndex(2)} />
              <Avatar.Image
                size={20}
                source={getAvatarByIndex(3)}
                style={{ marginLeft: -8 }}
              />
            </View>
          </View>
        </View>

        <View style={styles.arrowContainer}>
          <Text style={[styles.arrow, { color: theme.colors.primary }]}>↓</Text>
        </View>

        <View style={styles.weekSection}>
          <Text
            style={[styles.weekLabel, { color: theme.colors.onSurfaceVariant }]}
          >
            WEEK 2
          </Text>
          <View style={styles.teamPair}>
            <View style={styles.miniTeam}>
              <Avatar.Image size={20} source={getAvatarByIndex(0)} />
              <Avatar.Image
                size={20}
                source={getAvatarByIndex(2)}
                style={{ marginLeft: -8 }}
              />
            </View>
            <Text style={[styles.vsSmall, { color: theme.colors.onSurface }]}>
              vs
            </Text>
            <View style={styles.miniTeam}>
              <Avatar.Image size={20} source={getAvatarByIndex(1)} />
              <Avatar.Image
                size={20}
                source={getAvatarByIndex(3)}
                style={{ marginLeft: -8 }}
              />
            </View>
          </View>
        </View>

        <View style={styles.arrowContainer}>
          <Text style={[styles.arrow, { color: theme.colors.primary }]}>↓</Text>
        </View>

        <View style={styles.weekSection}>
          <Text
            style={[styles.weekLabel, { color: theme.colors.onSurfaceVariant }]}
          >
            WEEK 3
          </Text>
          <View style={styles.teamPair}>
            <View style={styles.miniTeam}>
              <Avatar.Image size={20} source={getAvatarByIndex(0)} />
              <Avatar.Image
                size={20}
                source={getAvatarByIndex(3)}
                style={{ marginLeft: -8 }}
              />
            </View>
            <Text style={[styles.vsSmall, { color: theme.colors.onSurface }]}>
              vs
            </Text>
            <View style={styles.miniTeam}>
              <Avatar.Image size={20} source={getAvatarByIndex(1)} />
              <Avatar.Image
                size={20}
                source={getAvatarByIndex(2)}
                style={{ marginLeft: -8 }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const slides: OnboardingSlide[] = [
    {
      id: '1',
      title: 'Track Your Rankings',
      description:
        'See where you stand in the competition. Tap any player to view their cardio and strength breakdown.',
      icon: <TrendingUp size={48} color={theme.colors.primary} />,
      content: <StandingsPreview />,
    },
    {
      id: '2',
      title: 'Check Your Schedule',
      description:
        'View weekly matchups in the Schedule tab. Each week features 2v2 team battles where you compete for the highest combined points.',
      icon: <Calendar size={48} color={theme.colors.primary} />,
      content: <SchedulePreview />,
    },
    {
      id: '3',
      title: 'Teams Change Weekly',
      description:
        'Team pairings rotate every week so you compete with and against everyone. Individual standings track your total performance.',
      icon: <Users size={48} color={theme.colors.primary} />,
      content: <TeamRotationPreview />,
    },
  ];

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.slide}>
        {/* <View style={styles.iconContainer}>{item.icon}</View> */}
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          {item.title}
        </Text>
        <Text style={[styles.description, { color: theme.colors.onSurface }]}>
          {item.description}
        </Text>
        {item.content}
      </View>
    </SafeAreaView>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={(item) => item.id}
        bounces={false}
      />

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,

              {
                backgroundColor:
                  index === currentIndex
                    ? theme.colors.primary
                    : theme.colors.surfaceVariant,
                // width: index === currentIndex ? 24 : 8,
                width: 8,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'left',
    marginHorizontal: 8,
    marginBottom: 60,
    fontWeight: 600,
    lineHeight: 22,
  },
  previewContainer: {
    width: '100%',
    gap: 8,
  },
  // Standings preview styles
  standingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,

    borderRadius: 8,
  },
  standingsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '500',
  },
  points: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    paddingLeft: 58,
    borderRadius: 8,
  },
  breakdownLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  breakdownPoints: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  // Schedule preview styles
  scheduleHeader: {
    alignItems: 'flex-start',
    marginLeft: 8,
  },
  scheduleWeek: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  matchupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 16,
    borderRadius: 12,
  },
  team: {
    alignItems: 'center',
    gap: 8,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  teamPlayerName: {
    fontSize: 14,
    fontWeight: '500',
  },
  teamPoints: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  vsText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Team rotation preview styles
  rotationContainer: {
    alignItems: 'center',
    gap: 8,
  },
  weekSection: {
    alignItems: 'center',
    gap: 12,
  },
  weekLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  teamPair: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  miniTeam: {
    flexDirection: 'row',
  },
  vsSmall: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  arrowContainer: {
    paddingVertical: 8,
  },
  arrow: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  // Pagination styles
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    // transition: 'width 0.3s',
  },
  // Button styles
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  button: {
    paddingVertical: 8,
    borderRadius: 12,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StandingsOnboarding;
