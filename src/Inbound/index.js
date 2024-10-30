import * as React from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';

const {width} = Dimensions.get('window');

const InboundScreen = ({navigation}) => {
  const GoInputTransport = () => {
    navigation.navigate('OrderList', {paramKey: 'transport'});
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{top: 20}}>
        <TouchableOpacity onPress={() => GoInputTransport()}>
          <Card.Title
            style={{
              width: width * 0.97,
              margin: 5,
              backgroundColor: 'grey',
              borderRadius: 15,
            }}
            title="Input Transportation"
            subtitle="Card Subtitle"
            left={props => <Avatar.Icon {...props} icon="truck" />}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => GoScanItem()}>
          <Card.Title
            style={{
              width: width * 0.97,
              margin: 5,
              backgroundColor: 'grey',
              borderRadius: 15,
            }}
            title="Scan Item"
            subtitle="Card Subtitle"
            left={props => <Avatar.Icon {...props} icon="barcode" />}
          />
        </TouchableOpacity> */}

        <TouchableOpacity>
          <Card.Title
            style={{
              width: width * 0.97,
              margin: 5,
              backgroundColor: 'grey',
              borderRadius: 15,
            }}
            title="Putaway Item"
            subtitle="Card Subtitle"
            left={props => <Avatar.Icon {...props} icon="download-box" />}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InboundScreen;
