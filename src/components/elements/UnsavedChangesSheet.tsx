import { AlertCircle } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import BottomSheet from './BottomSheet';
import ButtonPrimary from './ButtonPrimary';
import ButtonSecondary from './ButtonSecondary';

interface UnsavedChangesSheetProps {
  visible: boolean;
  onSave: () => void;
  onDiscard: () => void;
  onClose: () => void;
}

const UnsavedChangesSheet: React.FC<UnsavedChangesSheetProps> = ({
  visible,
  onSave,
  onDiscard,
  onClose,
}) => {
  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title=" Save Changes"
      size="md"
      contentContainerStyle={{
        paddingBottom: 8,
        gap: 24,
        flexGrow: 1,
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', marginTop: 8, gap: 8 }}>
        <AlertCircle
          size={20}
          color={'white'}
          style={{ marginLeft: 4, marginTop: 2 }}
        />
        <Text
          style={{
            flex: 1,
            fontSize: 14,
            fontWeight: 'bold',
            paddingHorizontal: 16,
            lineHeight: 20,
          }}
        >
          We see some changes to your League.{'\n'}
          <Text style={{ fontSize: 14, lineHeight: 20 }}>
            Do you want to save your changes before leaving?
          </Text>
        </Text>
      </View>

      <View style={{ gap: 12 }}>
        <ButtonPrimary onPress={onSave}>Save Changes</ButtonPrimary>
        <ButtonSecondary onPress={onDiscard}>No thanks</ButtonSecondary>
      </View>
    </BottomSheet>
  );
};

export default UnsavedChangesSheet;
