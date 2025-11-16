import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme, Text } from 'react-native-paper';
import BackHeader from '@/components/elements/Headers/BackHeader';
import { CheckCircleIcon } from 'lucide-react-native';
import ButtonPrimary from '@/components/elements/ButtonPrimary';
import InputPrimary from '@/components/elements/InputPrimary';
import { useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import {
  getInvitationContext,
  clearInvitationContext,
} from '@/lib/deepLinking';
import Toast from 'react-native-toast-message';

const AddUserDetails = () => {
  const theme = useTheme();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log('AddUserDetails mounted');
    console.log('user:', user?.id, user?.emailAddresses?.[0]?.emailAddress);
    console.log('user firstName:', user?.firstName);
    console.log('user lastName:', user?.lastName);
  }, [user]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
  }>({});

  // Validate that names don't contain special characters or spaces
  const validateName = (
    name: string,
    field: 'firstName' | 'lastName',
  ): boolean => {
    // Check for empty
    if (!name.trim()) {
      setErrors((prev) => ({ ...prev, [field]: 'This field is required' }));
      return false;
    }

    // Check for special characters or spaces (only letters allowed)
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(name)) {
      setErrors((prev) => ({
        ...prev,
        [field]: 'Only letters allowed (no spaces or special characters)',
      }));
      return false;
    }

    // Clear error if valid
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    return true;
  };

  const handleFinish = async () => {
    console.log('handleFinish called with:', { firstName, lastName });
    console.log('Current user:', user?.id, user?.emailAddresses);

    // Validate both fields
    const isFirstNameValid = validateName(firstName, 'firstName');
    const isLastNameValid = validateName(lastName, 'lastName');

    if (!isFirstNameValid || !isLastNameValid) {
      console.log('Validation failed');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Updating Clerk user with firstName and lastName');
      // Update Clerk user with firstName and lastName
      const updatedUser = await user?.update({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });
      console.log('User updated successfully:', updatedUser?.id);
      console.log('Updated user firstName:', updatedUser?.firstName);
      console.log('Updated user lastName:', updatedUser?.lastName);

      // Check if there's a pending invitation
      const invitationContext = await getInvitationContext();
      console.log('Invitation context:', invitationContext);

      if (invitationContext) {
        console.log('Redirecting to join page:', invitationContext.leagueId);
        // Clear the invitation context and navigate to join page
        await clearInvitationContext();
        router.replace(`/join/${invitationContext.leagueId}`);
      } else {
        console.log('No invitation, redirecting to create league');
        // Navigate to create/join league page
        router.replace('/(protected)/createLeague');
      }
    } catch (error: any) {
      console.error('Error updating user profile:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to update profile',
        text2: error?.message || 'Please try again',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View style={{ flex: 1, paddingHorizontal: 8 }}>
          <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'space-between',
              marginVertical: 0,
            }}
          >
            <View>
              <BackHeader />
              <View style={{ marginBottom: 60, paddingHorizontal: 40 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Just one more thing...
                </Text>
              </View>
              <View style={{ gap: 8, paddingHorizontal: 8 }}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                >
                  <CheckCircleIcon size={20} color={theme.colors.secondary} />
                  <Text style={{ fontSize: 14, fontWeight: 700 }}>
                    Your account has been created. Let's add some final profile
                    details and get you ready to join a league.
                  </Text>
                </View>
                <View style={{ gap: 12, marginTop: 16 }}>
                  <InputPrimary
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={(text) => {
                      setFirstName(text);
                      if (errors.firstName) {
                        validateName(text, 'firstName');
                      }
                    }}
                    onBlur={() => validateName(firstName, 'firstName')}
                  />
                  {errors.firstName && (
                    <Text
                      style={{
                        color: theme.colors.error,
                        fontSize: 12,
                        marginTop: -8,
                      }}
                    >
                      {errors.firstName}
                    </Text>
                  )}
                  <InputPrimary
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={(text) => {
                      setLastName(text);
                      if (errors.lastName) {
                        validateName(text, 'lastName');
                      }
                    }}
                    onBlur={() => validateName(lastName, 'lastName')}
                  />
                  {errors.lastName && (
                    <Text
                      style={{
                        color: theme.colors.error,
                        fontSize: 12,
                        marginTop: -8,
                      }}
                    >
                      {errors.lastName}
                    </Text>
                  )}
                </View>
              </View>
            </View>

            <View style={{ gap: 12 }}>
              <ButtonPrimary
                onPress={handleFinish}
                loading={isLoading}
                disabled={isLoading || !firstName.trim() || !lastName.trim()}
                replaceTextWithSpinner={true}
              >
                Finish
              </ButtonPrimary>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddUserDetails;
