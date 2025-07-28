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
import { MD3Theme, useTheme } from 'react-native-paper';
import ButtonPrimary from '@/components/elements/ButtonPrimary';
import ButtonSecondary from '@/components/elements/ButtonSecondary';
import BgView from '@/components/elements/BgView';

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
          <Text style={styles.link}>{inviteLink}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            justifyContent: 'space-between',
          }}
        >
          <ButtonPrimary style={{ width: '50%' }} onPress={copyToClipboard}>
            <Text>{copyLinkText}</Text>
          </ButtonPrimary>

          <ButtonSecondary style={{ width: '50%' }} onPress={shareInvite}>
            <Text>Share Link</Text>
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
      width: '100%',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 8,
    },
    link: {
      color: theme.colors.primary,
      textAlign: 'center',
    },
  });
