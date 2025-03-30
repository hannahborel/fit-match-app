import { FormControl, Button, ButtonText } from '@gluestack-ui/themed';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import { useRouter } from 'expo-router';
import { VStack } from '@/components/ui/vstack';
import { EyeIcon, EyeOffIcon } from '@gluestack-ui/themed';
import { useState } from 'react';

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl>
      <VStack space="md">
        <VStack>
          <Input variant="outline" size="lg" className="min-w-[250px] rounded-lg text-center">
            <InputField placeholder="Email" type="text" />
            <InputSlot className="pr-3"></InputSlot>
          </Input>
        </VStack>
        <VStack space="xs">
          <Input variant="outline" size="lg" className="min-w-[250px] rounded-lg text-center">
            <InputField placeholder="Password" type={showPassword ? 'text' : 'password'} />
            <InputSlot className="pr-3" onPress={() => setShowPassword(!showPassword)}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
        </VStack>
      </VStack>
      <Button onPress={() => router.push('/pages/CreateAccount')}>
        <ButtonText>Create Account</ButtonText>
      </Button>
    </FormControl>
  );
};

export default Login;
