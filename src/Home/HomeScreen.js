import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PieChart} from 'react-native-gifted-charts';
import {Divider, Text, Icon, MD3Colors, Avatar, Card} from 'react-native-paper';

import {useDispatch, useSelector} from 'react-redux';
import {setItem} from '../Redux/Reducers/OrderListSlice';

import {baseURL} from '../utils/url';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const loginData = useSelector(state => state.loginData.item);

  const handlePress = item => {
    dispatch(setItem(item));

    navigation.navigate('InboundOrder', {
      screen: 'InboundScreen',
    });
  };

  const pieData1 = [
    {value: 70, color: '#177AD5'},
    {value: 30, color: 'darkgrey'},
  ];

  const pieData2 = [
    {value: 30, color: 'green'},
    {value: 70, color: 'darkgrey'},
  ];

  const [orderListData, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getOrderList();
    getPutawayList();
  }, []);

  const getOrderList = async () => {
    setLoading(true);
    const api = `${baseURL}/order-list/${loginData}`;

    try {
      const response = await fetch(api);
      const responseData = await response.json();
      setOrderList(responseData.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch order list.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getOrderList();
  };

  const [putawayList, setPutawayList] = useState([]);

  const getPutawayList = async () => {
    setLoading(true);
    const api = `${baseURL}/order-putaway/${loginData}`;

    try {
      const response = await fetch(api);
      const responseData = await response.json();
      setPutawayList(responseData);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch Putaway list.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
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
                return <Text style={{fontSize: 15, color: 'green'}}>30%</Text>;
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

      <Divider />

      <View style={styles.orderListSection}>
        <View style={styles.titleOrder}>
          <Text style={styles.txtTitle}>Order List</Text>
        </View>

        <View>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={orderListData}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => handlePress(item)}>
                  <Card style={{backgroundColor: 'lightgrey', margin: 10}}>
                    <Card.Title
                      title={item.inbound_planning_no}
                      titleStyle={{color: 'black', fontWeight: 'bold'}}
                      subtitle="Processed of Gudang B"
                      subtitleStyle={{color: 'grey'}}
                      left={() => (
                        <Avatar.Icon
                          size={45}
                          icon="cube-outline"
                          style={{backgroundColor: 'orange'}}
                        />
                      )}
                      right={() => (
                        <Text style={{color: 'grey', fontSize: 12, margin: 10}}>
                          {item.datetime_created}
                        </Text>
                      )}
                    />
                    <Card.Content>
                      <Text variant="bodyMedium" style={{color: 'black'}}>
                        {item.title}
                      </Text>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.inbound_planning_no.toString()}
              ListFooterComponent={<View style={{height: 55}} />}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          )}
          <Text>{'\n'}</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
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

  // CHART ADJUSTMENT
  chartSection: {
    marginTop: 20,
    marginBottom: 10,
    width: screenWidth,
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

  // ORDER LIST SECTION
  orderListSection: {
    flex: 1,
    width: screenWidth,
  },
  titleOrder: {
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    margin: 10,
  },

  // SEPARATOR
  separator: {
    height: 1,
    backgroundColor: 'black',
  },
});


