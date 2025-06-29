import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import Table2Col from '@/components/elements/Table/Table2Col';
import ThemeWrapperBg from '@/components/elements/ThemeWrapperBg';

import { Table } from '@/types/types';
import { useUser } from '@clerk/clerk-expo';
import { ChevronRight, UserIcon } from 'lucide-react-native';
import { Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

const Account = () => {
  const router = useRouter();

  const theme = useTheme();

  const { user } = useUser();

  const personalInfo: Table = [
    { col1: 'First Name', col2: user?.firstName },
    { col1: 'Last Name', col2: user?.lastName },
    { col1: 'Email', col2: user?.emailAddresses[0].emailAddress },
  ];

  const settings = [
    { label: 'Account Settings', route: 'accountSettings' },
    { label: 'View League Details', route: 'leagueDetails' },
  ];
  return (
    <ThemeWrapperBg>
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
          }}
        >
          {settings.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(item.route)}
            >
              <View
                style={{
                  backgroundColor: theme.colors.surface,
                  borderRadius: 6,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 14,
                  borderBottomColor: theme.colors.outline,
                  borderBottomWidth: 1,
                }}
              >
                <View>
                  <Text style={{ fontWeight: 500 }}>{item.label}</Text>
                </View>
                <View>
                  <ChevronRight color={theme.colors.onSurface} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Table2Col tableData={personalInfo} />
      </View>
    </ThemeWrapperBg>
  );
};

export default Account;
