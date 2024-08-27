import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import InboundScreen from './Inbound/InboundScreen';
import OutboundScreen from './Outbound/OutboundScreen';

const Tab = createMaterialTopTabNavigator();

export default function OrderScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <Text style={styles.titleScreen}>Job Order</Text>
      </View>

      <View style={styles.tabSetion}>
        <Tab.Navigator
          screenOptions={{
          swipeEnabled: false,
            tabBarStyle: {
              backgroundColor: '#f0f0f0',
            },
            tabBarIndicatorStyle: styles.mainBtn,
          }}>
          <Tab.Screen
            name="InboundScreen"
            key="InboundScreen"
            component={InboundScreen}
            options={{
              tabBarLabelStyle: styles.tabButtonText,
              tabBarLabel: 'Inbound',
            }}
          />
          <Tab.Screen
            name="OutboundScreen"
            key="OutboundScreen"
            component={OutboundScreen}
            options={{
              tabBarLabelStyle: styles.tabButtonText,
              tabBarLabel: 'Outbound',
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  titleSection: {
    top: 10,
    left: 15,
  },
  titleScreen: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
  },

  tabSetion: {
    flex: 1,
    top: 20,
  },
  tabButtonText: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  mainBtn: {
    backgroundColor: '#FFC0CB',
    borderRadius: 5,
    padding: 20,
    width: 180,
    height: 40,
    borderWidth: 1,
    borderColor: '#333',
  },
});
