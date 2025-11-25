import ButtonPrimary from '@/components/elements/Buttons/ButtonPrimary';
import ButtonSecondary from '@/components/elements/Buttons/ButtonSecondary';
import { generateJoinLeagueUrl } from '@/lib/getWebAppUrl';
import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import BottomSheet from '@/components/elements/BottomSheet/BottomSheet';
import Snackbar from '@/components/elements/Snackbar';

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
  const [linkCopied, setLinkCopied] = useState(false);
  const generateInviteLink = () => {
    // Generate invitation link with league ID using environment-aware URL
    return generateJoinLeagueUrl(leagueId);
  };

  const handleCopyLink = async () => {
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 3000);
    try {
      const inviteLink = generateInviteLink();
      console.log('inviteLink', inviteLink);

      await Clipboard.setStringAsync(inviteLink);
      // await Clipboard.setStringAsync(inviteLink);
    } catch (error) {
      <Snackbar
        visible={true}
        type="error"
        title="Copy Failed"
        text="Unable to copy link to clipboard"
      />;
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
      }
    } catch (error) {
      <Snackbar
        visible={true}
        type="error"
        title="Text Invite Failed"
        text="Unable to open SMS app"
      />;
    }
  };

  return (
    <BottomSheet
      visible={visible}
      size="sm"
      onClose={onClose}
      title="Invite Friends"
      contentContainerStyle={{
        flex: 1,
      }}
    >
      {/* Action Buttons */}
      <View style={{ flex: 1, justifyContent: 'center', gap: 12 }}>
        {/* Copy Invite Link */}
        <View>
          <ButtonPrimary
            style={{ marginHorizontal: 0 }}
            onPress={handleCopyLink}
            icon={linkCopied ? 'check-circle' : 'content-copy'}
          >
            <Text style={{ width: 200, textAlign: 'left' }}>
              {linkCopied ? 'Link Copied!' : 'Copy Invite Link'}
            </Text>
          </ButtonPrimary>
        </View>
        {/* Text Invite */}
        <View>
          <ButtonSecondary onPress={handleTextInvite} icon="message-text">
            Text Invite Link
          </ButtonSecondary>
        </View>

        {/* Email Invite */}
        <View></View>
      </View>
    </BottomSheet>
  );
};

export default InviteFriendsModal;
