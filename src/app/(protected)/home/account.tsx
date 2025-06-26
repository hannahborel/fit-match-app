import React from 'react';
import { View } from 'react-native';

import Table2Col from '@/components/elements/Table/Table2Col';
import ThemeWrapperBg from '@/components/elements/ThemeWrapperBg';
import { useGetLeague } from '@/hooks/useGetLeague';
import { UserIcon } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';

const Account = () => {
  const { data } = useGetLeague();

  console.log('userProfile: data', JSON.stringify(data, null, 2));
  const theme = useTheme();
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
      <Table2Col />

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
