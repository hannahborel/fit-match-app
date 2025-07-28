import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams } from 'expo-router'; // or your navigation param system
import { useAtomValue } from 'jotai';
import { leagueAtom } from '@/atoms/leaugeAtom';
import { IconButton, MD3Theme, useTheme } from 'react-native-paper';
import ButtonPrimary from '@/components/elements/ButtonPrimary';
import ButtonSecondary from '@/components/elements/ButtonSecondary';
import BgView from '@/components/elements/BgView';
import { ClipboardCopy, Copy, Paperclip, ShareIcon } from 'lucide-react-native';
import InputPrimary from '@/components/elements/InputPrimary';

const InviteFriends = () => {
  const params = useLocalSearchParams();
  const [copyLinkText, setCopyLinkText] = useState<string>('Copy');

  const inviteLink = `https://fit-match-web.vercel.app/join-league/${params.slug}`;

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(inviteLink);

    setCopyLinkText('Link Copied!');
  };

  const shareInvite = async () => {
    try {
      await Share.share({
        message: `🏆 Let's battle it out in fitness!\nJoin my league on FitMatch:\n${inviteLink}`,
      });
    } catch (error) {
      Alert.alert('Oops', 'Something went wrong while sharing');
    }
  };

  const theme = useTheme();

  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text style={styles.header}>WHO'S GAME?</Text>
          <Text style={styles.subText}>
            Invite friends and let the games begin.
          </Text>
        </View>

        <View style={styles.linkContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.link}>
            {inviteLink}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            justifyContent: 'space-between',
          }}
        >
          <ButtonPrimary style={{ width: '50%' }} onPress={copyToClipboard}>
            <View style={styles.buttonContent}>
              <Paperclip color={theme.colors.onSurface} size={18} />
              <Text style={{ color: theme.colors.onSurface }}>
                {copyLinkText}
              </Text>
            </View>
          </ButtonPrimary>

          <ButtonSecondary style={{ width: '50%' }} onPress={shareInvite}>
            <View style={styles.buttonContent}>
              <ShareIcon size={18} color={theme.colors.onSurface} />
              <Text style={{ color: theme.colors.onSurface }}>Share Link</Text>
            </View>
          </ButtonSecondary>
        </View>
      </View>
    </View>
  );
};

export default InviteFriends;

const getStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,

      alignItems: 'center',
    },
    content: {
      width: '80%',
      marginTop: 30,
      gap: 30,
    },

    header: {
      color: 'white',
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 5,
    },
    subText: {
      color: 'white',
      fontSize: 16,
    },
    linkContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme.colors.primary,
      width: '100%',
      borderRadius: 12,
      backgroundColor: theme.colors.background,
      paddingVertical: 12,
      paddingHorizontal: 18,
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },

    link: {
      color: theme.colors.onBackground,
    },
  });
