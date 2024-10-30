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
import {setItem} from '../../Redux/Reducers/OrderListSlice';
import {baseURL} from '../../utils/url';
import useDisableBackButton from '../../utils/useDisableBackButton';

const screenWidth = Dimensions.get('window').width;

const OrderList = ({navigation}) => {
  useDisableBackButton('Anda tidak dapat kembali dari halaman ini.');

  const dispatch = useDispatch();
  const loginData = useSelector(state => state.loginData.item);

  const [orderListData, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getOrderList();
  }, []);

  const getOrderList = async () => {
    const api = `${baseURL}/order-list/${loginData}`;
    setLoading(true);
    try {
      const response = await fetch(api);
      const responseData = await response.json();
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
  };

  const handlePress = item => {
    dispatch(setItem(item));
    navigation.navigate('InboundOrder', {
      screen: 'InputTransport',
    });
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
                <TouchableOpacity onPress={() => handlePress(item)}>
                  <Card style={{backgroundColor: 'lightgrey', margin: 10}}>
                    <Card.Title
                      title={item.inbound_planning_no}
                      titleStyle={{color: 'black', fontWeight: 'bold'}}
                      subtitle="Processed of Gudang..."
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
