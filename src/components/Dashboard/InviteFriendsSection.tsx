import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useAuth } from '@clerk/clerk-expo';
import ButtonPrimary from '@/components/elements/ButtonPrimary';
import { League } from '@/types/types';
import InviteFriendsModal from './InviteFriendsModal';

interface InviteFriendsSectionProps {
  league: League;
}

const InviteFriendsSection: React.FC<InviteFriendsSectionProps> = ({
  league,
}) => {
  const theme = useTheme();
  const { userId } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Check if current user is the league manager
  const isLeagueManager = league.ownerId === userId;

  console.log('InviteFriendsSection - userId:', userId);
  console.log('InviteFriendsSection - league.ownerId:', league.ownerId);
  console.log('InviteFriendsSection - isLeagueManager:', isLeagueManager);

  // Calculate how many more members are needed
  // Note: leaguesToUsers might not be included in the league data from API
  const currentMembers = league.leaguesToUsers?.length || 1; // Default to 1 (the owner)
  const membersNeeded = league.size - currentMembers;

  // Format the start date
  const formatStartDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  const styles = getStyles(theme);

  // Only render if user is the league manager
  if (!isLeagueManager) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* League Start Date */}
      <View style={styles.infoSection}>
        <Text style={styles.primaryText}>
          Your league starts on {formatStartDate(league.startDate)}
        </Text>
        <Text style={styles.secondaryText}>
          {membersNeeded} more league member{membersNeeded !== 1 ? 's' : ''}{' '}
          left to join
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <ButtonPrimary
          style={styles.button}
          onPress={() => setIsModalVisible(true)}
        >
          Invite Members
        </ButtonPrimary>
      </View>

      {/* Invite Friends Modal */}
      <InviteFriendsModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        leagueId={league.id}
        ownerFirstName="League Manager"
      />
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 20,
      gap: 20,
    },
    infoSection: {
      alignItems: 'center',
      gap: 8,
    },
    primaryText: {
      fontSize: 16,
      color: theme.colors.primary,
      textAlign: 'center',

      fontWeight: '600',
    },
    secondaryText: {
      fontSize: 16,
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    button: {
      flex: 1,
    },
  });

export default InviteFriendsSection;
