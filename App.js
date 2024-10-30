import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import CombineNavigator from './src/CombineNavigator/CombineNavigator';
import LoginScreen from './src/Login/LoginScreen';
import CombineNavigatorNew from './src/CombineNavigator/CombineNavigatorNew';
import ScannerScreen from './src/Scanner/ScannerScreen-old';
import EditProfileScreen from './src/Profile/EditProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CombineNavigatorNew">
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{title: '', headerShown: false}}
          />

          <Stack.Screen
            name="CombineNavigatorNew"
            component={CombineNavigatorNew}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ScannerScreen"
            component={ScannerScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
            options={{headerShown: true, title: ''}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

{
  /* <Stack.Screen
            name="CombineNavigator"
            component={CombineNavigator}
            options={{headerShown: false}}
          /> */
}
