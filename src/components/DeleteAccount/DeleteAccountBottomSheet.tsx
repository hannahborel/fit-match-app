import React from 'react';
import { View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { Info } from 'lucide-react-native';
import BottomSheet from '@/components/elements/BottomSheet';
import ButtonPrimary from '@/components/elements/ButtonPrimary';

interface DeleteAccountBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  isDeleting: boolean;
}

const DeleteAccountBottomSheet: React.FC<DeleteAccountBottomSheetProps> = ({
  visible,
  onClose,
  onConfirmDelete,
  isDeleting,
}) => {
  const theme = useTheme();

  return (
    <BottomSheet
      visible={visible}
      onClose={isDeleting ? () => {} : onClose}
      title="Delete Account"
      size="md"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 16,
      }}
    >
      {/* Info Section */}
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          alignItems: 'flex-start',
          paddingTop: 8,
        }}
      >
        <Info size={24} color={theme.colors.error} style={{ marginTop: 2 }} />
        <Text
          style={{
            flex: 1,
            fontWeight: '600',
            fontSize: 14,
            color: theme.colors.onSurface,
            lineHeight: 20,
          }}
        >
          Deleting your account removes all account and app data. This action
          cannot be undone.
        </Text>
      </View>

      {/* Buttons */}
      <View style={{ gap: 12, paddingBottom: 24 }}>
        <ButtonPrimary
          onPress={onConfirmDelete}
          loading={isDeleting}
          replaceTextWithSpinner={true}
          disabled={isDeleting}
          minLoadingDuration={0}
          style={{
            backgroundColor: theme.colors.error,
            marginHorizontal: 0,
            width: '100%',
          }}
          labelStyle={{
            color: 'white',
          }}
        >
          Delete my Account
        </ButtonPrimary>

        <ButtonPrimary
          onPress={onClose}
          disabled={isDeleting}
          style={{
            borderColor: 'transparent',
            marginHorizontal: 0,
            marginVertical: 0,
            width: '100%',
            backgroundColor: theme.colors.background,
          }}
          labelStyle={{
            color: theme.colors.onSurface,
          }}
        >
          Keep my Account
        </ButtonPrimary>
      </View>
    </BottomSheet>
  );
};

export default DeleteAccountBottomSheet;
