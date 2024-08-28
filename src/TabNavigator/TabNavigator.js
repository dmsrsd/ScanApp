import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View, Text, LogBox} from 'react-native';

import HomeScreen from '../Home/HomeScreen';
// import OrderScreen from '../Order/OrderScreen';

function Message() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Message</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Profile!</Text>
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  LogBox.ignoreLogs([
    'A props object containing a "key" prop is being spread into JSX',
  ]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="newspaper" color={color} size={26} />
          ),
        }}
      /> */}

      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="message-badge-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome name="user" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
