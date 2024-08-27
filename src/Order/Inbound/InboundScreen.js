import {Text, View, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OppKeeperScreen from './OppKeeperScreen';

const Tab = createMaterialTopTabNavigator();

function Supplier() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Supplier</Text>
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

export class InboundScreen extends Component {
  render() {
    return (
      <Tab.Navigator
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
          name="OppKeeper"
          key="OppKeeper"
          component={OppKeeperScreen}
          options={{
            tabBarLabelStyle: styles.tabButtonText,
            tabBarLabel: 'OppKeeper',
          }}
        />

        <Tab.Screen
          name="Supplier"
          key="Supplier"
          component={Supplier}
          options={{
            tabBarLabelStyle: styles.tabButtonText,
            tabBarLabel: 'Supplier',
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

export default InboundScreen;

const styles = StyleSheet.create({
  mainBtn: {
    backgroundColor: '#000',
    borderRadius: 25,
    padding: 15,
    width: 120,
    height: 20,
    borderWidth: 1,
    borderColor: '#333',
    bottom: 8,
  },
  tabButtonText: {
    fontSize: 11,
  },
});
