import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import LoginScreen from './src/Login/LoginScreen';
import CombineNavigator from './src/CombineNavigator/CombineNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {PaperProvider} from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CombineNavigator">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{title: '', headerShown: false}}
          />
          <Stack.Screen
            name="CombineNavigator"
            component={CombineNavigator}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
