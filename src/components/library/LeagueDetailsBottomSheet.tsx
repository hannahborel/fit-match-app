import { leagueAtom } from '@/atoms/leagueAtom';
import BottomSheet from '@/components/elements/BottomSheet';
import { Row } from '@/components/elements/Table/TableElements';
import DeleteLeagueButton from '@/components/library/deleteLeagueButton';
import ManageLeagueSize from '@/components/library/ManageLeagueSize';
import UpdateLeagueStartDateDemo from '@/components/library/UpdateLeagueStartDate';
import { useAtomValue } from 'jotai';
import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import ManageLeagueName from './ManageUserDetails';
import ManageLeagueDuration from './ManageLeagueDuration';

interface LeagueDetailsBottomSheetProps {
  visible: boolean;
  onClose: () => void;
}

const LeagueDetailsBottomSheet: React.FC<LeagueDetailsBottomSheetProps> = ({
  visible,
  onClose,
}) => {
  const theme = useTheme();
  const leagueDetails = useAtomValue(leagueAtom);

  return (
    <BottomSheet
      visible={visible}
      size="lg"
      title="League Details"
      onClose={onClose}
    >
      <View style={{ gap: 12 }}>
        {leagueDetails && (
          <>
            <View
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              <ManageLeagueName leagueName={leagueDetails.name} />

              <ManageLeagueDuration
                leagueId={leagueDetails.id}
                weeks={leagueDetails.weeks}
              />

              <ManageLeagueSize
                leagueId={leagueDetails.id}
                leagueSize={leagueDetails.size}
              />
              <UpdateLeagueStartDateDemo
                startDate={new Date(leagueDetails.startDate)}
                leagueId={leagueDetails.id}
              />
            </View>
            <DeleteLeagueButton leagueId={leagueDetails.id} />

            <View>
              {/* {leagueDetails.leaguesToUsers.map((user, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                  }}
                  key={user.id}
                >
                  <View>
                    <Avatar.Image
                      size={24}
                      source={{
                        uri: `https://ui-avatars.com/api/?name=John+Doe&background=random`,
                      }}
                    />
                  </View>
                  <View>
                    <Text>User {index + 1}</Text>
                  </View>
                </View>
              ))} */}
            </View>
          </>
        )}
      </View>
    </BottomSheet>
  );
};

export default LeagueDetailsBottomSheet;
