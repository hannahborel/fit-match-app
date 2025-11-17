import { useAuthCache } from '@/hooks/useAuthCashe';
import { useAuth } from '@clerk/clerk-expo';
import React, { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { deleteAccount } from '@/queries/deleteAccount';
import DeleteAccountBottomSheet from '@/components/DeleteAccount/DeleteAccountBottomSheet';
import DeleteAccountConfirmation from '@/components/DeleteAccount/DeleteAccountConfirmation';

type DeleteAccountButtonProps = {
  setActionInProgress: (isInProgress: boolean) => void;
};
const DeleteAccountButton = ({
  setActionInProgress,
}: DeleteAccountButtonProps) => {
  const { signOut, getToken } = useAuth();
  const { clearCache } = useAuthCache();
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletionComplete, setDeletionComplete] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      setActionInProgress(true);
      const token = await getToken();

      if (!token) {
        setIsDeleting(false);
        setActionInProgress(false);
        return;
      }

      // Delete account from database and Clerk
      await deleteAccount({ token });

      // Clear all cached data BEFORE signing out
      await clearCache();

      // Sign out from Clerk
      await signOut();

      // Mark deletion as complete and show confirmation
      setIsDeleting(false);
      setDeletionComplete(true);
    } catch (err: any) {
      setIsDeleting(false);
      setActionInProgress(false);
      Alert.alert('Error', err.message || 'Something went wrong');
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleConfirmDelete = () => {
    setModalVisible(false);
    handleDeleteAccount();
  };

  // Show confirmation screen after deletion
  if (deletionComplete) {
    return <DeleteAccountConfirmation />;
  }

  return (
    <>
      <TouchableOpacity
        testID="delete-account-button"
        onPress={handleOpenModal}
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: 8,
          paddingVertical: 12,
          paddingHorizontal: 16,
        }}
      >
        <Text style={{ fontWeight: 500, color: theme.colors.error }}>
          Delete Account
        </Text>
      </TouchableOpacity>

      <DeleteAccountBottomSheet
        visible={modalVisible}
        onClose={handleCloseModal}
        onConfirmDelete={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default DeleteAccountButton;
