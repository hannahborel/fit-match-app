import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';

import Table2Col from '@/components/elements/Table/Table2Col';

// Local UI type for two-column table data
type Table = Array<{
  col1: string;
  col2: string | number | undefined;
}>;
import { useUser } from '@clerk/clerk-expo';
import { ChevronRight, UserIcon } from 'lucide-react-native';
import { Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import SignOutButton from './components/SignOutButton';

const Account = () => {
  const router = useRouter();

  const theme = useTheme();

  const { user } = useUser();

  const personalInfo: Table = [
    { col1: 'First Name', col2: user?.firstName ?? undefined },
    { col1: 'Last Name', col2: user?.lastName ?? undefined },
    { col1: 'Email', col2: user?.emailAddresses[0].emailAddress ?? undefined },
  ];

  const settings = [
    {
      label: 'Settings',
      route: 'account/settings',
      action: () => router.push('account/settings'),
    },
    {
      label: 'League Details',
      route: 'account/leagueDetails',
      action: () => router.push('account/leagueDetails'),
    },
  ];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        marginHorizontal: 8,
      }}
    >
      <View style={{ gap: 8 }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 8,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.surface,
              borderRadius: 1000,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                height: 100,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <UserIcon size={60} color={theme.colors.onBackground} />
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: 6,
            overflow: 'hidden',
          }}
        >
          {settings.map((item, index) => (
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.surface,

                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 12,
                borderBottomColor:
                  index !== settings.length - 1
                    ? theme.colors.outline
                    : 'transparent',
                borderBottomWidth: 1,
              }}
              key={index}
              onPress={item.action}
            >
              <View>
                <Text style={{ fontWeight: 500 }}>{item.label}</Text>
              </View>
              <View>
                <ChevronRight size={20} color={theme.colors.onSurface} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Table2Col tableData={personalInfo} />
        <SignOutButton />
      </View>
    </SafeAreaView>
  );
};

export default Account;
