import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import {Card} from 'react-native-paper';
import {useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {baseURL} from '../utils/url';

const Home = () => {
  const loginData = useSelector(state => state.loginData.item);

  const [ResData, setResData] = useState([]);
  const [orderListData, setOrderList] = useState([]);
  const [putawayPlanning, setPutawayPlanning] = useState([]);
  const [confirmedPutaway, setConfirmedPutaway] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setRefreshing(true);
    await Promise.all([getOrderList(), getFinishInbound(), getPutawayData()]);
    setRefreshing(false);
  };

  const getFinishInbound = async () => {
    const api = `${baseURL}/finish-inbound/${loginData}`;

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Cookie',
      'XSRF-TOKEN=eyJpdiI6...; wms_session=eyJpdiI6...',
    );

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    try {
      const response = await fetch(api, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('result API', result.data.length);
      setResData(result.data.length);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch data.');
    }
  };

  const getOrderList = async () => {
    const api = `${baseURL}/order-list/${loginData}`;
    try {
      const response = await fetch(api);
      const responseData = await response.json();
      setOrderList(responseData.data.length);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch data.');
    } finally {
      console.log('finally');
    }
  };

  const getPutawayData = async () => {
    const api = `${baseURL}/putaway-data/${loginData}`;
    try {
      const response = await fetch(api);
      const responseData = await response.json();
      setPutawayPlanning(responseData.putaway_planning.length);
      setConfirmedPutaway(responseData.putaway_finished.length);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch data.');
    } finally {
      console.log('finally');
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
      }>
      <View style={{justifyContent: 'center', alignContent: 'center'}}>
        <View style={styles.roundedBox}>
          <Image
            source={require('../Assets/img/bg.jpg')}
            style={styles.imgBox}
          />
        </View>

        <View style={styles.userIcon}></View>
        <Image
          source={require('../Assets/img/logo-nti.png')}
          style={styles.image}
        />

        <View style={styles.title}>
          <Text style={styles.wlcmTxt}>Selamat datang,</Text>
          <Text style={styles.nameTxt} numberOfLines={1}>
            {loginData}
          </Text>
        </View>

        <View style={styles.contentSection}>
          <View style={styles.row}>
            <Card style={styles.card}>
              <Card.Content>
                <Text style={{fontSize: 20, color: '#424242'}}>
                  Inbound Planning
                </Text>
                <Text style={{fontSize: 80, color: '#424242'}}>
                  {orderListData}
                </Text>
              </Card.Content>
            </Card>
            <Card style={styles.card}>
              <Card.Content>
                <Text style={{fontSize: 20, color: '#424242'}}>
                  Putaway Planning
                </Text>
                <Text style={{fontSize: 80, color: '#424242'}}>
                  {confirmedPutaway}
                </Text>
              </Card.Content>
            </Card>
          </View>

          <View style={styles.row}>
            <Card style={styles.card}>
              <Card.Content>
                <Text style={{fontSize: 20, color: '#424242'}}>
                  Inbound Complete
                </Text>
                <Text style={{fontSize: 80, color: '#424242'}}>{ResData}</Text>
              </Card.Content>
            </Card>
            <Card style={styles.card}>
              <Card.Content>
                <Text style={{fontSize: 20, color: '#424242'}}>
                  Putaway Confirmed
                </Text>
                <Text style={{fontSize: 80, color: '#424242'}}>
                  {putawayPlanning}
                </Text>
              </Card.Content>
            </Card>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    position: 'absolute',
    zIndex: 2,
    top: 60,
    flex: 1,
    right: 45,
  },
  wlcmTxt: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  nameTxt: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    width: 200,
  },
  roundedBox: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 160,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    position: 'absolute',
    top: 0,
    shadowColor: '#103f7d',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    overflow: 'hidden',
    zIndex: 1,
  },

  imgBox: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  image: {
    width: 100,
    height: 200,
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: 3,
    right: 265,
    top: -20,
  },
  contentSection: {
    position: 'absolute',
    zIndex: 2,
    top: 200,
    alignSelf: 'center',
  },
  userIcon: {
    backgroundColor: '#b5bfb7',
    width: 120,
    height: 120,
    borderRadius: 100,
    position: 'absolute',
    zIndex: 3,
    top: 25,
    right: 256,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    margin: 6,
    width: 180,
    height: 180,
    backgroundColor: '#fffbef',
    textAlign: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
});

export default Home;
