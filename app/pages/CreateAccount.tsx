import { FormControl } from '@gluestack-ui/themed';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import { useRouter } from 'expo-router';
import { VStack } from '@/components/ui/vstack';
import { EyeIcon, EyeOffIcon } from '@gluestack-ui/themed';
import { useState } from 'react';
import { Text, Pressable, View } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';

const CreateAccount = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex-1 justify-center items-center px-4">
      <FormControl>
        <VStack space="md">
          <VStack>
            <Input variant="outline" size="lg" className="min-w-[250px] rounded-lg text-center">
              <InputField placeholder="First Name" type="text" />
            </Input>
          </VStack>
          <VStack>
            <Input variant="outline" size="lg" className="min-w-[250px] rounded-lg text-center">
              <InputField placeholder="Last Name" type="text" />
            </Input>
          </VStack>
          <VStack>
            <Input variant="outline" size="lg" className="min-w-[250px] rounded-lg text-center">
              <InputField placeholder="Email Address" type="text" />
            </Input>
          </VStack>
          <VStack>
            <Input variant="outline" size="lg" className="min-w-[250px] rounded-lg text-center">
              <InputField
                placeholder="Password (case sensitive)"
                type={showPassword ? 'text' : 'password'}
              />
              <InputSlot className="pr-3" onPress={() => setShowPassword(!showPassword)}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>
        </VStack>
        <Button className="mt-8 bg-green-400 rounded-full">
          <ButtonText>CREATE ACCOUNT</ButtonText>
        </Button>
        <Pressable onPress={() => router.push('/')} className="mt-4 items-center">
          <Text>
            Already have an account? <Text className="underline">Log In</Text>
          </Text>
        </Pressable>
      </FormControl>
    </View>
  );
};

export default CreateAccount;
