import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Text, View, StyleSheet, LogBox} from 'react-native';
import {useTheme} from 'react-native-paper';

import HomeScreen from '../Home/HomeScreen';

// Inbound
import Transportation from '../Order/Inbound/InboundCheck/Transportation';
import Scan from '../Order/Inbound/InboundCheck/Scan';
import ScannerScreen from '../Scanner/ScannerScreen';
import PutAway from '../Order/Inbound/PutAway/PutAway';
import MoveLocation from '../Order/Inbound/MoveLocation/MoveLocation';

// Outbound
import Picking from '../Order/Outbound/PickingScreen';
import Packing from '../Order/Outbound/Packing';

// Profile
import ProfileScreen from '../Profile/ProfileScreen';
import ScanPutAway from '../Order/Inbound/PutAway/ScanPutAway';
import ActivityMainScreen from '../Activity/ActivityMainScreen';

// NEW SCREEN
import InboundScreen from '../Inbound';

const BottomTab = createMaterialBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function AppNavigator() {
  const theme = useTheme();
  theme.colors.secondaryContainer = 'transperent';

  LogBox.ignoreLogs([
    'A props object containing a "key" prop is being spread into JSX',
  ]);

  return (
    <BottomTab.Navigator
      theme
      shifting
      initialRouteName="Home"
      activeColor="#F5F5F5"
      inactiveColor="#787A91"
      barStyle={styles.barMenu}>
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
        name="Inbound Screen"
        component={InboundScreen}
        options={{
          tabBarLabel: <Text style={styles.nameTabColor}>Activity</Text>,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="qrcode-edit"
              color={color}
              size={24}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="Order"
        component={OrderNavigator}
        options={{
          tabBarLabel: <Text style={styles.nameTabColor}>Order</Text>,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="newspaper" color={color} size={26} />
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

      {/* <TopTab.Screen
        name="MoveLocationNavigator"
        component={MoveLocationNavigator}
        options={{
          tabBarLabelStyle: styles.subBtnTxt,
          tabBarLabel: 'Move Location',
        }}
      /> */}
    </TopTab.Navigator>
  );
}

function InboundCheckNavigator() {
  return (
    <TopTab.Navigator
      screenOptions={{
        swipeEnabled: false,
        tabBarStyle: {
          backgroundColor: 'trasparent',
        },
        tabBarIndicatorStyle: styles.subBtnInb,
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: 'white',
      }}>
      <TopTab.Screen
        options={{
          tabBarLabelStyle: styles.subBtnTxt,
          tabBarLabel: 'Transportation',
        }}
        name="Transportation"
        component={Transportation}
      />
      {/* <TopTab.Screen name="Scan" component={Scan} /> */}
      <TopTab.Screen name="Scan Item" component={ScannerScreen} />
    </TopTab.Navigator>
  );
}

function PutAwayNavigator() {
  return (
    <TopTab.Navigator
      screenOptions={{
        swipeEnabled: false,
        tabBarStyle: {
          backgroundColor: 'trasparent',
        },
        tabBarIndicatorStyle: styles.subBtnPtw,
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: 'white',
      }}>
      <TopTab.Screen name="PutAway List" component={PutAway} />
      <TopTab.Screen name="Scan PutAway" component={ScanPutAway} />
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
  nameTabColor: {
    color: '#F5F5F5',
    fontWeight: 'bold',
  },
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
    top: 15,
  },
  tabButtonText: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  mainBtn: {
    backgroundColor: 'lightgrey',
    borderRadius: 15,
    padding: 22,
    width: 185,
    height: 30,
    borderWidth: 1,
    borderColor: '#333',
  },

  //   ORDERS SUB TAB MENU
  subBtn: {
    backgroundColor: '#000',
    borderRadius: 25,
    padding: 15,
    width: 180,
    height: 20,
    borderWidth: 1,
    borderColor: '#333',
    bottom: 8,
  },
  subBtnTxt: {
    fontSize: 11,
  },

  // BUTTON INBOUND CHECK
  subBtnInb: {
    backgroundColor: '#4868dc',
    borderRadius: 25,
    padding: 15,
    width: 180,
    height: 20,
    borderWidth: 1,
    borderColor: '#333',
    bottom: 8,
  },

  // BUTTON PutAway
  subBtnPtw: {
    backgroundColor: 'green',
    borderRadius: 25,
    padding: 15,
    height: 20,
    borderWidth: 1,
    borderColor: '#333',
    bottom: 8,
  },

  barMenu: {
    backgroundColor: '#0c4ca3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
});
