import React, {Component} from 'react';
import {Text, View} from 'react-native';

export class OutboundScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Text style={{color: 'black', alignSelf: 'center', top: 100}}>
          OutboundScreen
        </Text>
      </View>
    );
  }
}

export default OutboundScreen;
