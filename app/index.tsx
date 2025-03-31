import { View } from 'react-native';
import Login from './pages/Login';

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
      <Login />
    </View>
  );
}
