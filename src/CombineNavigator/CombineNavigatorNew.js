import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Text, View, StyleSheet, LogBox} from 'react-native';
import {useTheme} from 'react-native-paper';

// import HomeScreen from '../Home/HomeScreen';
import HomeScreen from '../Home/Home';

// Profile
import ProfileScreen from '../Profile/ProfileScreen';

import InputTransport from '../Inbound/InboundCheck/InputTransport';
import OrderList from '../Inbound/InboundCheck/OrderList';
import ScanItem from '../Inbound/InboundCheck/ScanItem';
import PutawayList from '../Inbound/PutAway/PutawayList';
import ScanPutaway from '../Inbound/PutAway/ScanPutaway';

import OutboundScreen from '../Outbound';
import MultiInputTransport from '../Inbound/InboundCheck/MultiInputTransport';

const BottomTab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();

function AppNavigator() {
  LogBox.ignoreLogs([
    'A props object containing a "key" prop is being spread into JSX',
  ]);

  return (
    <BottomTab.Navigator
      shifting
      initialRouteName="Home"
      activeColor="#F5F5F5"
      inactiveColor="#787A91"
      barStyle={styles.barMenu}
      theme={{colors: {secondaryContainer: '#103f7d'}}}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: <Text style={styles.nameTabColor}>Home</Text>,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />

      <BottomTab.Screen
        name="InboundOrder"
        component={OrderNavigator}
        options={{
          tabBarLabel: <Text style={styles.nameTabColor}>Inbound</Text>,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="inbox-arrow-down"
              color={color}
              size={26}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: <Text style={styles.nameTabColor}>Profile</Text>,
          tabBarIcon: ({color}) => (
            <FontAwesome name="user" color={color} size={26} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function OrderNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InboundNavigator"
        component={InboundNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="OrderList"
        component={OrderList}
        options={{
          headerShown: true,
          headerBackTitleVisible: true,
          headerTitle: () => '',
        }}
      />

      <Stack.Screen
        name="InputTransport"
        component={InputTransport}
        options={{
          headerShown: true,
          headerBackTitleVisible: true,
          headerTitle: () => '',
        }}
      />

      {/* <Stack.Screen
        name="InputTransport"
        component={MultiInputTransport}
        options={{
          headerShown: true,
          headerBackTitleVisible: true,
          headerTitle: () => '',
        }}
      /> */}

      <Stack.Screen
        name="ScanItem"
        component={ScanItem}
        options={{
          headerShown: true,
          headerBackTitleVisible: true,
          headerTitle: () => '',
        }}
      />

      <Stack.Screen
        name="ScanPutaway"
        component={ScanPutaway}
        options={{
          headerShown: true,
          headerBackTitleVisible: true,
          headerTitle: () => '',
        }}
      />
    </Stack.Navigator>
  );
}

function InboundNavigator() {
  return (
    <TopTab.Navigator
      screenOptions={{
        swipeEnabled: true,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          paddingTop: 25,
        },
        tabBarIndicatorStyle: styles.subBtn,
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: 'white',
      }}>
      <TopTab.Screen
        name="OrderList"
        component={OrderList}
        options={{
          tabBarLabelStyle: styles.subBtnTxt,
          tabBarLabel: 'Inbound List',
        }}
      />

      <TopTab.Screen
        name="PutawayList"
        component={PutawayList}
        options={{
          tabBarLabelStyle: styles.subBtnTxt,
          tabBarLabel: 'Putaway List',
        }}
      />
    </TopTab.Navigator>
  );
}

export default function CombineNavigator() {
  return <AppNavigator />;
}

const styles = StyleSheet.create({
  //   ORDERS SUB TAB MENU
  subBtn: {
    backgroundColor: '#103f7d',
    borderRadius: 25,
    padding: 15,
    height: 20,
    borderWidth: 1,
    borderColor: '#333',
    margin: 8,
    width: 170,
    shadowColor: 'black',
  },
  subBtnTxt: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  barMenu: {
    backgroundColor: '#103f7d',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
});
