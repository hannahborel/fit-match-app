import { useGetLeague } from '@/hooks/useGetLeague';
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

export const userProfile = () => {
  const router = useRouter();
  const { data } = useGetLeague();

  console.log('userProfile: data', JSON.stringify(data, null, 2));
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      <View
        style={{
          width: '100%',
          padding: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            console.log('userProfile: back to home');
            router.back();
          }}
        >
          <X />
        </TouchableOpacity>
      </View>
      <View>
        {data?.league ? (
          <>
            {Object.entries(data.league).map(([key, value]) => (
              <View key={key} style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{key}:</Text>
                <Text style={{ fontSize: 16 }}>{String(value)}</Text>
              </View>
            ))}
          </>
        ) : (
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            No League Data
          </Text>
        )}
      </View>
    </View>
  );
};
export default userProfile;
