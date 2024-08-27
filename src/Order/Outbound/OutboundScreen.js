import {Text, View, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();


function Customer() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Customer</Text>
    </View>
  );
}

function Warehouse() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Warehouse</Text>
    </View>
  );
}

export class OutboundScreen extends Component {
  render() {
    return (
      <Tab.Navigator
        // swipeEnabled={false}
        screenOptions={{
          swipeEnabled: false,
          tabBarStyle: {
            backgroundColor: 'trasparent',
            margin: 10,
          },
          tabBarIndicatorStyle: styles.mainBtn,
          tabBarInactiveTintColor: 'black',
          tabBarActiveTintColor: 'white',
        }}>
        <Tab.Screen
          name="Customer"
          key="Customer"
          component={Customer}
          options={{
            tabBarLabelStyle: styles.tabButtonText,
            tabBarLabel: 'Customer',
          }}
        />

        <Tab.Screen
          name="Warehouse"
          key="Warehouse"
          component={Warehouse}
          options={{
            tabBarLabelStyle: styles.tabButtonText,
            tabBarLabel: 'Warehouse',
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default OutboundScreen;

const styles = StyleSheet.create({
  mainBtn: {
    backgroundColor: '#000',
    borderRadius: 25,
    padding: 15,
    width: 170,
    height: 20,
    borderWidth: 1,
    borderColor: '#333',
    bottom: 8,
  },
  tabButtonText: {
    fontSize: 11,
  },
});
