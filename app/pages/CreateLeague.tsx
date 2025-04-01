import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import StyledInput from '../../src/components/StyledInput';
import NumberAvatar from '../../src/components/NumberAvatar';

const CreateLeague = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', marginTop: 50 }}>
      <View style={{ marginLeft: 50, marginRight: 50, gap: 24 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>LEAGUE NAME</Text>
          <StyledInput />
        </View>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>LEAGUE SIZE</Text>
          <NumberAvatar start={4} end={48} step={2} />
        </View>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>NUMBER OF WEEKS</Text>
          <NumberAvatar start={4} end={48} step={2} />
        </View>
        <Button style={{ marginTop: 24 }} mode="contained">
          Create League
        </Button>
      </View>
    </View>
  );
};

export default CreateLeague;
