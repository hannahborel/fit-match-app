import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import BgView from '@/components/elements/BgView';
import { TextInput, useTheme } from 'react-native-paper';
import { ActivityType } from '@/types/types';
import { formatString } from '@/helpers/helpers';
import SectionHeader from '@/components/elements/Headers/SectionHeader';
import { router } from 'expo-router';
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
                borderColor: theme.colors.onSurface,
                borderRadius: 6,
                gap: 8,
              }}
            >
              {Object.values(ActivityType).map((activity, index) => (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      params: {
                        activityType: formatString(activity.toLowerCase()),
                      },
                      pathname: 'logActivity/logActivity',
                    })
                  }
                  key={index}
                  style={{
                    padding: 12,
                    borderRadius: 6,
                    backgroundColor: theme.colors.surface,
                  }}
                >
                  <Text
                    style={{ color: theme.colors.onSurface, fontWeight: 500 }}
                  >
                    {formatString(activity.toLowerCase())}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </BgView>
  );
};

export default logActivity;
