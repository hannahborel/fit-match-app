import BgView from '@/components/elements/BgView';
import { ButtonCard } from '@/components/elements/Card';
import SectionHeader from '@/components/elements/Headers/SectionHeader';
import { formatString } from '@/helpers/helpers';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { ActivityDefinitions } from 'hustle-types';
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
              {Object.entries(ActivityDefinitions).map(
                ([activityType, activity]) => (
                  <ButtonCard
                    onPress={() =>
                      router.push({
                        params: {
                          typeName: activityType,
                        },
                        pathname: 'logActivity/activityDetails',
                      })
                    }
                    spacing={4}
                    key={activityType}
                  >
                    <Text
                      style={{
                        color: theme.colors.onSurface,
                        fontWeight: 500,
                      }}
                    >
                      {formatString(activity.name.toLowerCase())}
                    </Text>
                    {activity.name == 'Strength Training' ? (
                      <Text
                        style={{
                          color: theme.colors.onSurface,
                          fontSize: 10,
                          fontWeight: 300,
                        }}
                      >
                        {activity.description}
                      </Text>
                    ) : null}
                  </ButtonCard>
                ),
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </BgView>
  );
};

export default logActivity;
