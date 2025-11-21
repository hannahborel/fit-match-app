import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import BottomSheet from '@/components/elements/BottomSheet/BottomSheet';

import { InfoIcon } from 'lucide-react-native';
import { BaseCard } from '@/components/elements/Card';

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
          <View style={{ padding: 16 }}>
            <>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
              >
                <InfoIcon size={24} color={theme.colors.error} />
                <Text>
                  Hey Jen, How are you feeling? So pregant I bet. I hope you're
                  doing well. Anyway...We need a layout here for what this looks
                  like before a league starts
                </Text>

                <View>
                  <Text>
                    {' '}
                    Also, are there any other actions we want to have when
                    managing a league other than deleting people. Can you remove
                    people from the league after the league starts?{' '}
                  </Text>
                </View>
              </View>
            </>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default ManageLeagueButton;
