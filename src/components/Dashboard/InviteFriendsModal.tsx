import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';
import Toast from 'react-native-toast-message';
import Modal from '@/components/elements/Modal';
import ButtonPrimary from '@/components/elements/ButtonPrimary';
import ButtonSecondary from '@/components/elements/ButtonSecondary';

interface InviteFriendsModalProps {
  visible: boolean;
  onClose: () => void;
  leagueId: string;
  ownerFirstName: string;
}

const InviteFriendsModal: React.FC<InviteFriendsModalProps> = ({
  visible,
  onClose,
  leagueId,
  ownerFirstName,
}) => {
  const theme = useTheme();

  const styles = getStyles(theme);

  const generateInviteLink = () => {
    // Generate invitation link with league ID
    return `https://fitmatch.app/join/${leagueId}`;
  };

  const handleCopyLink = async () => {
    try {
      const inviteLink = generateInviteLink();
      await Clipboard.setStringAsync(inviteLink);

      Toast.show({
        type: 'success',
        text1: 'Link Copied!',
        text2: 'Invitation link copied to clipboard',
        position: 'bottom',
        visibilityTime: 3000,
      });
    } catch (error) {
      console.error('Failed to copy link:', error);
      Toast.show({
        type: 'error',
        text1: 'Copy Failed',
        text2: 'Unable to copy link to clipboard',
        position: 'bottom',
        visibilityTime: 3000,
      });
    }
  };

  const handleTextInvite = async () => {
    try {
      const inviteLink = generateInviteLink();
      const message = `${ownerFirstName} wants you to join their fitness league on Hustle! Click here: ${inviteLink}`;

      // Try to open SMS app with pre-filled message
      const smsUrl = `sms:?body=${encodeURIComponent(message)}`;
      const canOpen = await Linking.canOpenURL(smsUrl);

      if (canOpen) {
        await Linking.openURL(smsUrl);
      } else {
        // Fallback: copy message to clipboard
        await Clipboard.setStringAsync(message);
        Toast.show({
          type: 'info',
          text1: 'Message Copied',
          text2: 'SMS message copied to clipboard',
          position: 'bottom',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      console.error('Failed to open text invite:', error);
      Toast.show({
        type: 'error',
        text1: 'Text Invite Failed',
        text2: 'Unable to open SMS app',
        position: 'bottom',
        visibilityTime: 3000,
      });
    }
  };

  const handleEmailInvite = async () => {
    try {
      const inviteLink = generateInviteLink();
      const subject = `${ownerFirstName} wants you to join their Fitness league on Hustle!`;
      const body = `Hi there!

${ownerFirstName} wants you to join their Fitness league on Hustle! It's a fun way to stay active and compete with friends.

Click this link to join: ${inviteLink}

See you on the leaderboard!
`;

      // Try to open email app with pre-filled content
      const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const canOpen = await Linking.canOpenURL(emailUrl);

      if (canOpen) {
        await Linking.openURL(emailUrl);
      } else {
        // Fallback: copy email content to clipboard
        const emailContent = `Subject: ${subject}\n\n${body}`;
        await Clipboard.setStringAsync(emailContent);
        Toast.show({
          type: 'info',
          text1: 'Email Content Copied',
          text2: 'Email content copied to clipboard',
          position: 'bottom',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      console.error('Failed to open email invite:', error);
      Toast.show({
        type: 'error',
        text1: 'Email Invite Failed',
        text2: 'Unable to open email app',
        position: 'bottom',
        visibilityTime: 3000,
      });
    }
  };

  const handleMoreOptions = () => {
    // Show alert with more sharing options
    Alert.alert(
      'More Sharing Options',
      'Copy the invitation link to share through any app:',
      [
        {
          text: 'Copy Link',
          onPress: () => handleCopyLink(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Invite Friends"
      description="Fill your league to get started. Invite friends to play against."
    >
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
