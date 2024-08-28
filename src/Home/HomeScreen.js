import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PieChart} from 'react-native-gifted-charts';
import {Divider, Text, Icon, MD3Colors, Avatar, Card} from 'react-native-paper';

import {useDispatch} from 'react-redux';
import {setItem} from '../Redux/Reducers/OrderListSlice';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const handlePress = item => {
    dispatch(setItem(item));

    navigation.navigate('Order', {
      screen: 'Inbound',
      params: {
        screen: 'Transport',
      },
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

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

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

        {/* <View>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={data}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => handlePress(item)}>
                  <Card style={{backgroundColor: 'lightgrey', margin: 10}}>
                    <Card.Title
                      title="IB1234567890"
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
                          2 Hrs
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
              keyExtractor={item => item.id.toString()}
            />
          )}
          <Text>{'\n'}</Text>
        </View> */}
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
    backgroundColor: '#DCDCDC',
  },
  titleChart: {
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    bottom: 10,
  },
  txtTitle: {
    color: 'black',
    fontSize: 20,
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
