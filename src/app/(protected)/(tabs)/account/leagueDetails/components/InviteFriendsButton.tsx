import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import InviteFriendsModal from '../../../home/components/InviteFriends/InviteFriendsModal';

const InviteFriendsButton = ({ leagueId }: { leagueId: string }) => {
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
          Invite Friends
        </Text>
      </TouchableOpacity>
      <InviteFriendsModal
        visible={open}
        onClose={() => setModalOpen(false)}
        leagueId={leagueId}
        ownerFirstName="League Manager"
      />
    </View>
  );
};

export default InviteFriendsButton;
