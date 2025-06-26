import React from 'react';
import { View } from 'react-native';

import Table2Col from '@/components/elements/Table/Table2Col';
import ThemeWrapperBg from '@/components/elements/ThemeWrapperBg';
import { useGetLeague } from '@/hooks/useGetLeague';
import { UserIcon } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';
import { useUser } from '@clerk/clerk-expo';
import { Table } from '@/types/types';

const Account = () => {
  const { data } = useGetLeague();

  console.log('userProfile: data', JSON.stringify(data, null, 2));
  const theme = useTheme();

  const { user } = useUser();
  console.log(JSON.stringify(user, null, 2));

  const personalInfo: Table = [
    { col1: 'First Name', col2: user?.firstName },
    { col1: 'Last Name', col2: user?.lastName },
    { col1: 'Email', col2: user?.emailAddresses[0].emailAddress },
  ];
  return (
    <ThemeWrapperBg>
      <View
        style={{
          flexDirection: 'row',
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
      <Table2Col tableData={personalInfo} />

      {/* <View>
        {data?.league ? (
          <>
            {Object.entries(data.league).map(([key, value]) => (
              <View key={key} style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{key}:</Text>
                <Text style={{ fontSize: 16 }}>{String(value)}</Text>
              </View>
            ))}
          </>
        ) : (
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            No League Data
          </Text>
        )}
      </View> */}
    </ThemeWrapperBg>
  );
};

export default Account;
