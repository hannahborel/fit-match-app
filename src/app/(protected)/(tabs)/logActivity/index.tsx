import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { ActivityDefinitions } from 'hustle-types';
import { ButtonCard } from '@/components/elements/Card';
import SectionHeader from '@/components/elements/Headers/SectionHeader';
import { formatString } from '@/helpers/helpers';

const logActivity = () => {
  const theme = useTheme();
  const [search, setSearch] = useState('');

  console.log(JSON.stringify(ActivityDefinitions, null, 2));
  const filteredActivities = Object.entries(ActivityDefinitions).filter(
    ([_, activity]) =>
      activity.name.toLowerCase().includes(search.toLowerCase()) ||
      activity.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ gap: 18, padding: 8 }}>
            <TextInput
              placeholder="Search activities"
              value={search}
              onChangeText={setSearch}
              mode="flat"
              underlineColor="transparent"
              style={{
                backgroundColor: theme.colors.surface,
                height: 40,
                borderRadius: 6,
                paddingHorizontal: 8,
              }}
            />

            <View>
              <SectionHeader text={'All activities'} />
              <View style={{ gap: 8 }}>
                {filteredActivities.map(([activityType, activity]) => (
                  <ButtonCard
                    key={activityType}
                    onPress={() =>
                      router.push({
                        params: { typeName: activityType },
                        pathname: 'logActivity/activityDetails',
                      })
                    }
                    spacing={4}
                  >
                    <>
                      <Text
                        style={{
                          color: theme.colors.onSurface,
                          fontWeight: '500',
                        }}
                      >
                        {formatString(activity.name.toLowerCase())}
                      </Text>
                      {activity.name === 'Strength Training' && (
                        <Text
                          style={{
                            color: theme.colors.onSurface,
                            fontSize: 10,
                            fontWeight: '300',
                          }}
                        >
                          {activity.description}
                        </Text>
                      )}
                    </>
                  </ButtonCard>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default logActivity;
