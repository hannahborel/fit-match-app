import { Table } from '@/types/types';
import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
type TTableProps = {
  tableData: Table;
};
function Table2Col({ tableData }: TTableProps) {
  const theme = useTheme();
  const { user, isLoaded } = useUser();

  const personalInfo = [
    { label: 'First Name', value: user?.firstName },
    { label: 'Last Name', value: user?.lastName },
    { label: 'Email', value: user?.emailAddresses[0].emailAddress },
  ];

  return (
    <View style={{ width: '100%', marginTop: 16, marginBottom: 16 }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Text
          style={{
            color: theme.colors.onSurfaceVariant,
            letterSpacing: 0.75,
            fontSize: 14,
            fontWeight: 500,
            paddingVertical: 8,
            marginLeft: 8,
          }}
        >
          Personal Information
        </Text>
      </View>
      <View style={{ backgroundColor: theme.colors.surface, borderRadius: 6 }}>
        {isLoaded &&
          tableData.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: 12,
                borderBottomWidth: 1,
                borderBottomColor:
                  index !== personalInfo.length - 1
                    ? theme.colors.outline
                    : 'transparent',
              }}
            >
              <View style={{ width: '40%' }}>
                <Text style={{ color: theme.colors.onSurface, fontSize: 14 }}>
                  {item.col1}
                </Text>
              </View>
              <View
                style={{
                  width: '60%',
                  alignItems: 'flex-end',
                }}
              >
                <Text
                  style={{
                    color: theme.colors.onSurface,
                    fontWeight: 500,
                    fontSize: 14,
                    flexWrap: 'nowrap',
                  }}
                >
                  {item.col2}
                </Text>
              </View>
            </View>
          ))}
      </View>
    </View>
  );
}

export default Table2Col;
