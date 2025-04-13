import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Settings } from 'lucide-react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import { useAuth } from '@clerk/clerk-expo';
import { handleLogout } from '@/utils/helpers';

const home = () => {
  const [visible, setVisible] = useState(false);
  const { signOut } = useAuth();
  const router = useRouter();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Face-Off Home',
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 16 }} onPress={showModal}>
              <Settings size={24} color="white" />
            </TouchableOpacity>
          ),
          headerShown: true,
        }}
      />
      <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
        <Text style={{ fontSize: 20 }}>
          Success you have signed in. This is going to be your dashboard
        </Text>
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
              Log Out
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
