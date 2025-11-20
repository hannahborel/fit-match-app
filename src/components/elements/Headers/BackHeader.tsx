import { Text, View } from 'react-native';
import React, { Component } from 'react';
import BackButton from '../Buttons/BackButton';

export class BackHeader extends Component {
  render() {
    return (
      <View style={{ marginBottom: 20 }}>
        <BackButton />
      </View>
    );
  }
}

export default BackHeader;
