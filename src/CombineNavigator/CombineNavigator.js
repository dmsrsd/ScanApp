import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Text, View, StyleSheet} from 'react-native';

import HomeScreen from '../Home/HomeScreen';

// Inbound
import Transportation from '../Order/Inbound/InboundCheck/Transportation';
import Scan from '../Order/Inbound/InboundCheck/Scan';

import PutAway from '../Order/Inbound/PutAway/PutAway';
import MoveLocation from '../Order/Inbound/MoveLocation/MoveLocation';
import Picking from '../Order/Outbound/Picking';
import Packing from '../Order/Outbound/Packing';

const BottomTab = createMaterialBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function MessageScreen() {
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

function AppNavigator() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Order"
        component={OrderNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="newspaper" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Message"
        component={MessageScreen}
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
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
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
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <Text style={styles.titleScreen}>Job Order</Text>
      </View>

      <View style={styles.tabSetion}>
        <TopTab.Navigator
          screenOptions={{
            swipeEnabled: false,
            tabBarStyle: {
              backgroundColor: '#f0f0f0',
            },
            tabBarIndicatorStyle: styles.mainBtn,
          }}>
          <TopTab.Screen
            options={{
              tabBarLabelStyle: styles.tabButtonText,
              tabBarLabel: 'Inbound',
            }}
            name="Inbound"
            component={InboundNavigator}
          />

          <TopTab.Screen
            options={{
              tabBarLabelStyle: styles.tabButtonText,
              tabBarLabel: 'Outbound',
            }}
            name="Outbound"
            component={OutboundNavigator}
          />
        </TopTab.Navigator>
      </View>
    </View>
  );
}

function InboundNavigator() {
  return (
    <TopTab.Navigator
      screenOptions={{
        swipeEnabled: false,
        tabBarStyle: {
          backgroundColor: 'trasparent',
        },
        tabBarIndicatorStyle: styles.subBtn,
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: 'white',
      }}>
      <TopTab.Screen
        name="InboundCheck"
        component={InboundCheckNavigator}
        options={{
          tabBarLabelStyle: styles.subBtnTxt,
          tabBarLabel: 'Inbound Check',
        }}
      />

      <TopTab.Screen
        name="PutAwayNav"
        component={PutAwayNavigator}
        options={{
          tabBarLabelStyle: styles.subBtnTxt,
          tabBarLabel: 'Put Away',
        }}
      />

      <TopTab.Screen
        name="MoveLocationNavigator"
        component={MoveLocationNavigator}
        options={{
          tabBarLabelStyle: styles.subBtnTxt,
          tabBarLabel: 'Move Location',
        }}
      />
    </TopTab.Navigator>
  );
}

function InboundCheckNavigator() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Transportation" component={Transportation} />
      <TopTab.Screen name="Scan" component={Scan} />
    </TopTab.Navigator>
  );
}

function PutAwayNavigator() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="PutAwayScreen" component={PutAway} />
    </TopTab.Navigator>
  );
}

function MoveLocationNavigator() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="MoveLocation" component={MoveLocation} />
    </TopTab.Navigator>
  );
}

function OutboundNavigator() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Picking" component={Picking} />
      <TopTab.Screen name="Packing" component={Packing} />
    </TopTab.Navigator>
  );
}

export default function CombineNavigator() {
  return <AppNavigator />;
}

const styles = StyleSheet.create({
  //ORDERS TAB MENU
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

  //   ORDERS SUB TAB MENU
  subBtn: {
    backgroundColor: '#000',
    borderRadius: 25,
    padding: 15,
    width: 120,
    height: 20,
    borderWidth: 1,
    borderColor: '#333',
    bottom: 8,
  },
  subBtnTxt: {
    fontSize: 11,
  },
});
