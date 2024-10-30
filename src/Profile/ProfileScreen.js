import React from 'react';
import {View, Image, Dimensions, SafeAreaView} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import {Button, Text, Icon, MD3Colors, IconButton} from 'react-native-paper';
import {CommonActions} from '@react-navigation/native';

import {useDispatch} from 'react-redux';
import {clearOrderList} from '../Redux/Reducers/OrderListSlice';
import {clearItemVehicle} from '../Redux/Reducers/VehicleDataSlice';
import {clearPutaway} from '../Redux/Reducers/PutAwaySlice';
import {clearLogin} from '../Redux/Reducers/LoginSlice';

const screenWidth = Dimensions.get('window').width;

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const pieData1 = [
    {value: 70, color: '#177AD5'},
    {value: 30, color: 'darkgrey'},
  ];

  const pieData2 = [
    {value: 30, color: 'green'},
    {value: 70, color: 'darkgrey'},
  ];

  function editProfile() {
    navigation.navigate('EditProfileScreen');
  }

  function logOut() {
    // Dispatch aksi clear untuk setiap slice
    dispatch(clearOrderList());
    dispatch(clearItemVehicle());
    dispatch(clearPutaway());
    dispatch(clearLogin());

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'LoginScreen'}],
      }),
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={require('../Assets/img/avatar.png')}
        />

        <View style={styles.info}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.username}>mail@mail</Text>
          <Text style={styles.username}>0812345677</Text>
        </View>

        <Button
          style={styles.btnEdit}
          icon="account-edit"
          mode="contained"
          onPress={() => editProfile()}>
          Edit Profile
        </Button>
      </View>

      {/* <View style={styles.stats}>
        <View style={styles.chartSection}>
          <View style={styles.titleChart}>
            <Text style={styles.txtTitle}>Dashboard</Text>
          </View>

          <View style={styles.chartWarp}>
            <View style={{alignItems: 'center'}}>
              <PieChart
                donut
                innerRadius={30}
                radius={50}
                data={pieData1}
                centerLabelComponent={() => {
                  return <Text style={{fontSize: 15, color: 'red'}}>70%</Text>;
                }}
              />
              <Text style={styles.txtChart}>On Progress : 70</Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <PieChart
                donut
                innerRadius={30}
                radius={50}
                data={pieData2}
                centerLabelComponent={() => {
                  return (
                    <Text style={{fontSize: 15, color: 'green'}}>30%</Text>
                  );
                }}
              />
              <Text style={styles.txtChart}>Completed : 30</Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <Icon
                source="note-text-outline"
                color={MD3Colors.secondary20}
                size={100}
              />
              <Text style={styles.txtChart}>Total Order : 100</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </View> */}

      <View
        style={{
          padding: 10,
          justifyContent: 'flex-end',
          alignContent: 'flex-end',
        }}>
        <Button
          style={styles.button}
          icon="forum"
          mode="contained"
          onPress={() => console.log('Pressed')}
          labelStyle={{color: '#0c4ca3'}}>
          Help Center
        </Button>

        <Button
          style={styles.button}
          icon="cog"
          mode="contained"
          onPress={() => console.log('Pressed')}
          labelStyle={{color: '#0c4ca3'}}>
          Change Password
        </Button>

        <Button
          style={styles.button}
          icon="logout"
          mode="contained"
          onPress={() => logOut()}
          labelStyle={{color: '#0c4ca3'}}>
          Logout
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  info: {
    marginLeft: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  username: {
    color: '#999',
    fontSize: 18,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    color: '#999',
    fontSize: 14,
  },
  statValue: {
    fontSize: 18,
    color: 'black',
  },

  // CHART ADJUSTMENT
  titleChart: {
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    bottom: 10,
  },
  txtTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  chartSection: {
    flex: 1,
    width: screenWidth,
    justifyContent: 'center',
  },
  chartWarp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 10,
    padding: 10,
    marginBottom: 10,
  },
  txtChart: {
    fontSize: 12,
    color: '#666',
    marginTop: 10,
    fontWeight: 'bold',
  },

  //   Button
  button: {
    marginBottom: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    color: 'red',
  },
  btnEdit: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 20,
    right: 5,
    borderRadius: 20,
  },
};

export default ProfileScreen;
