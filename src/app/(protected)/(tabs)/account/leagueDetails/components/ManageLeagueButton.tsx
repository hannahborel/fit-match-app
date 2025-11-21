import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import InviteFriendsModal from '../../../home/components/InviteFriends/InviteFriendsModal';
import BottomSheet from '@/components/elements/BottomSheet/BottomSheet';
import InviteFriendsButton from './InviteFriendsButton';

const ManageLeagueButton = ({ leagueId }: { leagueId: string }) => {
  const [open, setModalOpen] = useState(false);
  const theme = useTheme();
  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalOpen(!open)}
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: 8,
          paddingVertical: 12,
          paddingHorizontal: 16,
        }}
      >
        <Text style={{ fontWeight: 500, color: theme.colors.primary }}>
          Manage League
        </Text>
      </TouchableOpacity>

      <BottomSheet visible={open} size="lg" onClose={() => setModalOpen(false)}>
        <View>
          <InviteFriendsButton leagueId={leagueId} />
        </View>
      </BottomSheet>
    </View>
  );
};

export default ManageLeagueButton;
