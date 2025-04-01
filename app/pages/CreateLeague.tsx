import { useRouter } from 'expo-router';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, Avatar } from 'react-native-paper';

const CreateLeague = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ marginLeft: 50, marginRight: 50, gap: 24 }}>
        <TextInput placeholder="League Name" />
        <View style={{ marginLeft: 4 }}>
          <Text>League Size</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
              <Avatar.Text size={40} label="4" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={40} label="8" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={40} label="12" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={40} label="16" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={40} label="20" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={40} label="24" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={40} label="28" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={40} label="32" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={40} label="36" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={40} label="40" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={40} label="42" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={38} label="44" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={38} label="48" labelStyle={{ color: 'black' }} />
            </View>
          </ScrollView>
        </View>
        <View style={{ marginLeft: 4, marginRight: 4 }}>
          <Text>Number of Weeks</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
              <Avatar.Text size={40} label="4" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={40} label="8" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={40} label="12" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={40} label="16" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={40} label="20" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={40} label="24" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={40} label="28" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={40} label="32" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={40} label="36" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={40} label="40" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={40} label="42" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={40} label="44" labelStyle={{ color: 'black' }} />
              <Avatar.Text size={40} label="48" labelStyle={{ color: 'black' }} />
            </View>
          </ScrollView>
        </View>
        <Button style={{ marginTop: 24 }} mode="contained">
          Create League
        </Button>
      </View>
    </View>
  );
};

export default CreateLeague;
