import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Copy, MessageSquare, Mail, Flag } from 'lucide-react-native';
import Modal from '@/components/elements/Modal';
import ButtonPrimary from '@/components/elements/ButtonPrimary';
import ButtonSecondary from '@/components/elements/ButtonSecondary';

interface InviteFriendsModalProps {
  visible: boolean;
  onClose: () => void;
  leagueId: string;
}

const InviteFriendsModal: React.FC<InviteFriendsModalProps> = ({
  visible,
  onClose,
  leagueId,
}) => {
  const theme = useTheme();

  const styles = getStyles(theme);

  const handleCopyLink = async () => {
    try {
      // TODO: Generate actual invitation link
      const inviteLink = `https://fitmatch.app/join/${leagueId}`;
      // TODO: Implement clipboard functionality
      console.log('Copying link:', inviteLink);
      // Show success feedback
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleTextInvite = () => {
    try {
      // TODO: Implement native text sharing
      console.log('Opening text invite');
    } catch (error) {
      console.error('Failed to open text invite:', error);
    }
  };

  const handleEmailInvite = () => {
    try {
      // TODO: Implement native email sharing
      console.log('Opening email invite');
    } catch (error) {
      console.error('Failed to open email invite:', error);
    }
  };

  const handleMoreOptions = () => {
    // TODO: Implement more sharing options
    console.log('More sharing options');
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Invite Friends"
      description="Fill your league to get started. Invite friends to play against."
    >
      {/* Flag Icon */}
      <View style={styles.flagContainer}>
        <View style={styles.flagIcon}>
          <Flag size={24} color="white" />
        </View>
        <Text style={styles.flagText}>Go!</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <ButtonPrimary
          style={styles.copyButton}
          onPress={handleCopyLink}
          icon="content-copy"
        >
          Copy Invite Link
        </ButtonPrimary>

        <ButtonSecondary
          style={styles.actionButton}
          onPress={handleTextInvite}
          icon="message-text"
        >
          Text Invite
        </ButtonSecondary>

        <ButtonSecondary
          style={styles.actionButton}
          onPress={handleEmailInvite}
          icon="email"
        >
          Email Invite
        </ButtonSecondary>
      </View>

      {/* More Options Link */}
      <TouchableOpacity onPress={handleMoreOptions} style={styles.moreOptions}>
        <Text style={styles.moreOptionsText}>More Sharing Options</Text>
      </TouchableOpacity>
    </Modal>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    flagContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      gap: 8,
    },
    flagIcon: {
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    flagText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    buttonContainer: {
      width: '100%',
      gap: 12,
      marginBottom: 16,
    },
    copyButton: {
      width: '100%',
    },
    actionButton: {
      width: '100%',
    },
    moreOptions: {
      paddingVertical: 8,
    },
    moreOptionsText: {
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: '500',
    },
  });

export default InviteFriendsModal;
