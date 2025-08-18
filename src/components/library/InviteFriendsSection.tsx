import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
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
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Calculate how many more members are needed
  const currentMembers = league.leaguesToUsers.length;
  const membersNeeded = league.size - currentMembers;
  const isDraftReady = membersNeeded <= 0;

  // Format the start date
  const formatStartDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  const styles = getStyles(theme);

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
