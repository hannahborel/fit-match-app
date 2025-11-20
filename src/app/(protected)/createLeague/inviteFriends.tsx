import ButtonPrimary from '@/components/elements/Buttons/ButtonPrimary';
import ButtonSecondary from '@/components/elements/Buttons/ButtonSecondary';
import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams } from 'expo-router'; // or your navigation param system
import { ChevronRight, CopyIcon, ShareIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Share, StyleSheet, Text, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { generateJoinLeagueUrl } from '@/lib/getWebAppUrl';

const InviteFriends = () => {
  const params = useLocalSearchParams();
  const inviteLink = generateJoinLeagueUrl(
    Array.isArray(params.slug) ? params.slug[0] : params.slug,
  );

  const copyToClipboard = async () => {
    Clipboard.setStringAsync(inviteLink);

    Toast.show({
      type: 'success',
      text1: 'Link Copied!',
      position: 'bottom',
      visibilityTime: 2000,
      topOffset: 60,
    });
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
          <CopyIcon
            size={18}
            color={theme.colors.primary}
            onPress={copyToClipboard}
          />
        </View>
        <View
          style={{
            gap: 8,
            justifyContent: 'space-between',
          }}
        >
          <ButtonPrimary onPress={shareInvite}>
            <View style={styles.buttonContent}>
              <Text style={{ color: theme.colors.onSurface }}>Share Link</Text>
              <ShareIcon size={18} color={theme.colors.onSurface} />
            </View>
          </ButtonPrimary>
          <ButtonSecondary>
            <View style={styles.buttonContent}>
              <Text style={{ fontWeight: 500 }}>I'll do this later</Text>
              <ChevronRight size={18} />
            </View>
          </ButtonSecondary>
        </View>
      </View>
      <Toast />
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
      gap: 8,
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },

    link: {
      color: theme.colors.onBackground,
      flexShrink: 2,
    },
  });
