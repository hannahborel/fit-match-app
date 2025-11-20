import DeleteAccountButton from './components/ManageUserAccount/DeleteAccount/DeleteAccountBtn';
import LoadingScreen from '@/components/elements/LoadingScreen';
import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const accountSettings = () => {
  const theme = useTheme();
  const [actionInProgress, setActionInProgress] = useState<boolean>(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ padding: 8 }}>
        {actionInProgress ? (
          <LoadingScreen message="Deleting account..." />
        ) : (
          <DeleteAccountButton setActionInProgress={setActionInProgress} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default accountSettings;
