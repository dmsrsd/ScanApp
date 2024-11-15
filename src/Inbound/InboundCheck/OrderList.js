import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text, Avatar, Card} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import {setItem} from '../../Redux/Reducers/OrderListSlice';
import {baseURL} from '../../utils/url';
import useDisableBackButton from '../../utils/useDisableBackButton';

const screenWidth = Dimensions.get('window').width;

const OrderList = ({navigation}) => {
  useDisableBackButton('Anda tidak dapat kembali dari halaman ini.');

  const dispatch = useDispatch();
  const loginData = useSelector(state => state.loginData.item);
  const itemVehicle = useSelector(state => state.vehicleData.itemVehicle);

  const [orderListData, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const [isScanValid, setScanValidity] = useState({});

  useEffect(() => {
    console.log('itemVehicle', itemVehicle);

    if (isFocused) {
      getOrderList();
    }
  }, [isFocused]);

  const getOrderList = async () => {
    const api = `${baseURL}/order-list/${loginData}`;
    setLoading(true);
    try {
      const response = await fetch(api);
      const responseData = await response.json();
      console.log('res order', responseData);

      setOrderList(responseData.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch data.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getOrderList();

    // Setelah refresh selesai
    setRefreshing(false);
  };

  const handlePress = (item, param) => {
    dispatch(setItem(item));

    navigation.navigate('InboundOrder', {
      screen: 'InputTransport',
      params: {
        param,
      },
    });

  };

  useEffect(() => {
    if (orderListData.length > 0) {
      const fetchScanValidity = async () => {
        const scanValidityResults = await Promise.all(
          orderListData.map(item => checkQtyPlan(item.inbound_planning_no)),
        );

        // Update status scan validity berdasarkan hasil dari semua request
        const validityMap = scanValidityResults.reduce(
          (acc, {InboundNo, checkQtyScanValidity}) => {
            acc[InboundNo] = checkQtyScanValidity;
            return acc;
          },
          {},
        );

        setScanValidity(validityMap);
      };

      fetchScanValidity();
    }
  }, [orderListData]);

  const checkQtyPlan = async InboundNo => {
    try {
      const response = await fetch(`${baseURL}/check-qty-plan/${InboundNo}`, {
        method: 'GET',
        headers: new Headers({
          Cookie: 'XSRF-TOKEN=your_token_here; wms_session=your_session_here;',
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      const checkQtyScanValidity = result.data.every(
        item => item.qty_scan && item.qty_scan !== 0,
      );

      return {InboundNo, checkQtyScanValidity};
    } catch (error) {
      console.error('Error fetching data for InboundNo:', InboundNo, error);
      return {InboundNo, checkQtyScanValidity: false};
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.orderListSection}>
        {loading ? (
          <View style={styles.actIndicator}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <>
            <View style={styles.titleOrder}>
              <Text style={styles.txtTitle}>Inbound Planning</Text>
            </View>
            <FlatList
              data={orderListData}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    handlePress(item, isScanValid[item.inbound_planning_no])
                  }>
                  <Card
                    style={{
                      // backgroundColor: isScanValid[item.inbound_planning_no]
                      //   ? '#EEF7FF'
                      //   : 'lightgrey',
                      margin: 10,
                      backgroundColor: '#EEF7FF',
                    }}>
                    <Card.Title
                      title={item.inbound_planning_no}
                      titleStyle={{color: 'black', fontWeight: 'bold'}}
                      subtitle="Proccessed by Gudang.."
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
                      <Text
                        variant="bodyMedium"
                        style={{
                          color: '#15B392',
                          fontWeight: 'bold',
                          left: 55,
                        }}></Text>

                      {/* {isScanValid[item.inbound_planning_no] ? (
                        <Text
                          variant="bodyMedium"
                          style={{
                            color: '#15B392',
                            fontWeight: 'bold',
                            left: 55,
                          }}>
                          Sudah Di Scan
                        </Text>
                      ) : (
                        <Text
                          variant="bodyMedium"
                          style={{color: 'red', fontWeight: 'bold', left: 55}}>
                          Belum Di Scan
                        </Text>
                      )} */}

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
          </>
        )}
      </View>
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  actIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleOrder: {
    paddingHorizontal: 10,
    margin: 10,
    alignItems: 'center',
  },
  txtTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderListSection: {
    flex: 1,
    width: screenWidth,
  },
});
