import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import BgView from '@/components/elements/BgView';
import { TextInput, useTheme } from 'react-native-paper';
import { ActivityType } from '@/types/types';
import { formatString } from '@/helpers/helpers';
import SectionHeader from '@/components/elements/Headers/SectionHeader';
const logActivity = () => {
  const theme = useTheme();
  return (
    <BgView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            gap: 18,
            padding: 8,
          }}
        >
          <TextInput
            placeholder="search"
            mode="flat"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            style={{
              backgroundColor: theme.colors.surface,
              height: 40,
              borderRadius: 6,
            }}
          />
          <View>
            <SectionHeader text={'All activities'} />
            <View
              style={{
                borderWidth: 1,
                borderColor: theme.colors.onSurface,
                borderRadius: 6,
              }}
            >
              {Object.values(ActivityType).map((activity, index, arr) => (
                <View
                  key={index}
                  style={{
                    padding: 12,
                    borderBottomColor: theme.colors.onSurface,
                    borderBottomWidth: 1,
                    borderTopLeftRadius: index === 0 ? 6 : 0,
                    borderTopRightRadius: index === 0 ? 6 : 0,
                    borderBottomLeftRadius: index === arr.length - 1 ? 6 : 0,
                    borderBottomRightRadius: index === arr.length - 1 ? 6 : 0,
                  }}
                >
                  <Text
                    style={{ color: theme.colors.onSurface, fontWeight: 500 }}
                  >
                    {formatString(activity.toLowerCase())}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </BgView>
  );
};

export default logActivity;
