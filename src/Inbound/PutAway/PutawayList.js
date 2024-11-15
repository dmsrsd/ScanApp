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
import {Divider, Text, Avatar, Card} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import {setItem} from '../../Redux/Reducers/PutAwaySlice';
import {baseURL} from '../../utils/url';
import useDisableBackButton from '../../utils/useDisableBackButton';

const screenWidth = Dimensions.get('window').width;

const PutawayList = ({navigation}) => {
  const isFocused = useIsFocused();

  useDisableBackButton('Anda tidak dapat kembali dari halaman ini.');
  const dispatch = useDispatch();
  const loginData = useSelector(state => state.loginData.item);

  const handlePress = item => {
    console.log('Item', item);

    dispatch(setItem(item));

    navigation.navigate('ScanPutaway');
  };

  const [orderListData, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getPutawayList = async () => {
    setLoading(true);
    const api = `${baseURL}/order-putaway/${loginData}`;

    try {
      const response = await fetch(api);
      const responseData = await response.json();

      // console.log('res', responseData);

      setOrderList(responseData);
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
    getPutawayList();
  };

  useEffect(() => {
    if (isFocused) {
      getPutawayList();
    }
  }, [isFocused]);

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
              <Text style={styles.txtTitle}>Putaway Planning</Text>
            </View>

            <FlatList
              data={orderListData.filter(item => item.is_scanned !== 'Y')}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => handlePress(item)}>
                  <Card style={{backgroundColor: '#EEF7FF', margin: 10}}>
                    <Card.Title
                      title={`${item.gr_id}`}
                      titleStyle={{
                        color: 'black',
                        fontWeight: 'bold',
                      }}
                      subtitle={`Location To: ${item.location_to}`}
                      subtitleStyle={{
                        color: 'grey',
                        fontWeight: 'bold',
                        fontSize: 15,
                      }}
                      left={() => (
                        <Avatar.Icon
                          size={45}
                          icon="cube-send"
                          style={{backgroundColor: 'green'}}
                        />
                      )}
                    />
                    <Card.Content>
                      {item.is_scanned != null ? (
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
                      )}
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={<View style={{height: 55}} />}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </>
        )}
        <Text>{'\n'}</Text>
      </View>
    </View>
  );
};

export default PutawayList;

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

  // ORDER LIST SECTION
  orderListSection: {
    flex: 1,
    width: screenWidth,
  },
  titleOrder: {
    paddingHorizontal: 10,
    margin: 10,
    alignItems: 'center',
  },
  txtTitle: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
