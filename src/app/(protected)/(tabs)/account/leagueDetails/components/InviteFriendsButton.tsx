import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import InviteFriendsModal from '../../../home/components/InviteFriends/InviteFriendsModal';
import { useAtomValue } from 'jotai';
import { leagueAtom } from '@/atoms/leagueAtom';

const InviteFriendsButton = ({ leagueId }: { leagueId: string }) => {
  const [open, setModalOpen] = useState(false);
  const theme = useTheme();
  const league = useAtomValue(leagueAtom);

  // Get the owner's first name from leaguesToUsers
  const ownerData = league?.leaguesToUsers?.find(
    (member) => member.userId === league.ownerId
  );
  const ownerFirstName = ownerData?.firstName || 'League Manager';

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
        ownerFirstName={ownerFirstName}
      />
    </View>
  );
};

export default InviteFriendsButton;
