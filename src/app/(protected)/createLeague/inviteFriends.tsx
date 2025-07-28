import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const inviteFriends = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 30 }}>
      <View>
        <Text
          style={[
            styles.text,
            { fontSize: 20, fontWeight: 600, marginBottom: 5 },
          ]}
        >
          WHO'S GAME?{' '}
        </Text>
        <Text style={styles.text}>intivefriends and let the games begin</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});

export default inviteFriends;
