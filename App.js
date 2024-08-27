import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-native-paper';
import TabNavigator from './src/TabNavigator/TabNavigator';
import LoginScreen from './src/Login/LoginScreen';
import ScannerScreen from './src/Scanner/ScannerScreen';

import OrderScreen from './src/Order/OrderScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TabNavigator">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{title: '', headerShown: false}}
          />
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen name="ScannerScreen" component={ScannerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
