import NumberAvatar from '../../components/library/NumberAvatar';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import InputPrimary from '../../components/library/InputPrimary';
import CustomHeader from '../../components/library/CustomHeader';
import ButtonPrimary from '../../components/library/ButtonPrimary';

const FaceOffSetup = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title="FaceOff Setup" />
      <View style={{ flex: 1, justifyContent: 'flex-start', paddingHorizontal: 28, marginTop: 36 }}>
        <View style={{ gap: 24, width: '100%' }}>
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>FACEOFF NAME</Text>
            <InputPrimary mode="outlined" />
          </View>
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>LEAGUE SIZE</Text>
            <NumberAvatar start={4} end={98} step={2} />
          </View>
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>REGULAR SEASON WEEKS</Text>
            <NumberAvatar start={4} end={16} step={4} />
          </View>
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>PLAYOFF WEEKS</Text>
            <NumberAvatar start={1} end={5} step={1} />
          </View>
          <ButtonPrimary style={{ marginTop: 24 }}>Create League</ButtonPrimary>
        </View>
      </View>
    </View>
  );
};

export default FaceOffSetup;
