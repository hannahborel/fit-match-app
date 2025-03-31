import { useRouter } from 'expo-router';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, Avatar } from 'react-native-paper';

const CreateLeague = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={{ margin: 45, gap: 24 }}>
        <TextInput outlineStyle={{ borderRadius: 10 }} label="League Name" mode="outlined" />
        <View style={{ marginLeft: 4 }}>
          <Text>League Size</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
              <Avatar.Text size={38} label="4" />
              <Avatar.Text size={38} label="8" />
              <Avatar.Text size={38} label="12" />
              <Avatar.Text size={38} label="16" />
              <Avatar.Text size={38} label="20" />
              <Avatar.Text size={38} label="24" />
              <Avatar.Text size={38} label="28" />
              <Avatar.Text size={38} label="32" />
              <Avatar.Text size={38} label="36" />
              <Avatar.Text size={38} label="40" />
              <Avatar.Text size={38} label="42" />
              <Avatar.Text size={38} label="44" />
              <Avatar.Text size={38} label="48" />
            </View>
          </ScrollView>
        </View>
        <View style={{ marginLeft: 4, marginRight: 4 }}>
          <Text>Number of Weeks</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
              <Avatar.Text size={38} label="4" />
              <Avatar.Text size={38} label="8" />
              <Avatar.Text size={38} label="12" />
              <Avatar.Text size={38} label="16" />
              <Avatar.Text size={38} label="20" />
              <Avatar.Text size={38} label="24" />
              <Avatar.Text size={38} label="28" />
              <Avatar.Text size={38} label="32" />
              <Avatar.Text size={38} label="36" />
              <Avatar.Text size={38} label="40" />
              <Avatar.Text size={38} label="42" />
              <Avatar.Text size={38} label="44" />
              <Avatar.Text size={38} label="48" />
            </View>
          </ScrollView>
        </View>
        <Button
          buttonColor="#4ade80"
          textColor="black"
          mode="contained"
          style={styles.createButton}
        >
          Create League
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    gap: 16,
    backgroundColor: '#fff',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    gap: 24,
  },
  input: {
    borderRadius: 28,
    width: 275,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    color: 'white',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  circleButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    margin: 4,
  },
  circleButtonLabel: {
    fontSize: 16,
  },
  createButton: {
    borderRadius: 28,
    marginTop: 24,
    width: '80%',
    margin: 'auto',
  },
});

export default CreateLeague;
