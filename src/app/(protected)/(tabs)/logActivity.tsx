import BgView from '@/components/elements/BgView';
import { ButtonCard } from '@/components/elements/Card';
import SectionHeader from '@/components/elements/Headers/SectionHeader';
import { formatString } from '@/helpers/helpers';
import { ActivityType } from '@/types/types';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
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
                <ButtonCard
                  onPress={() =>
                    router.push({
                      params: {
                        activityType: formatString(activity.toLowerCase()),
                      },
                      pathname: 'logActivity/logActivity',
                    })
                  }
                  key={index}
                >
                  <Text
                    style={{ color: theme.colors.onSurface, fontWeight: 500 }}
                  >
                    {formatString(activity.toLowerCase())}
                  </Text>
                </ButtonCard>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </BgView>
  );
};

export default logActivity;
