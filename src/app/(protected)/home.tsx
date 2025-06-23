import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { MenuIcon } from 'lucide-react-native';
import { Modal, Portal, Button, useTheme } from 'react-native-paper';
import { useAuth } from '@clerk/clerk-expo';
import { handleLogout } from '@/helpers/helpers';
import { useGetLeague } from '@/hooks/useGetLeague';
import CardElement from '@/components/elements/CardElement';

const home = () => {
  const [visible, setVisible] = useState(false);
  const { signOut } = useAuth();
  const router = useRouter();
  const { data: LeagueData } = useGetLeague();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const theme = useTheme();

  console.log(JSON.stringify(LeagueData, null, 2));
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Face-Off Home',
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            color: theme.colors.onBackground,
          },

          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 16 }} onPress={showModal}>
              <MenuIcon color={theme.colors.onBackground} size={24} />
            </TouchableOpacity>
          ),
          headerShown: true,
        }}
      />
      <View style={{ flex: 1 }}>
        <CardElement title={'YOUR LEAGUE STARTS IN'}>
          <View>
            <Text>card content</Text>
          </View>
        </CardElement>
      </View>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Button
              mode="contained"
              onPress={() => handleLogout(router, signOut)}
              style={styles.logoutButton}
            >
              <Text>Log Out</Text>
            </Button>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 8,
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    gap: 16,
  },
  logoutButton: {
    backgroundColor: '#ff4444',
  },
});

export default home;
