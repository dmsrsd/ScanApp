import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import {Icon, MD3Colors} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format, parseISO} from 'date-fns';

// import axios from 'axios';

const Transportation = () => {
  // const [inboundPlanningNo, setInboundPlanningNo] = useState('');
  // const [arrTransportId, setTransportId] = useState('');
  // const [arrVehicleId, setArrVehicleId] = useState('');
  // const [arrVehicleType, setArrVehicleType] = useState('');
  // const [arrArrivalTime, setArrArrivalTime] = useState('');
  // const [arrStartUnloadingTime, setArrStartUnloadingTime] = useState('');


  // const handleSaveVehicle = () => {
  //   // const vehicleData = {
  //   //   // inbound_planning_no: inboundPlanningNo,
  //   //   // arr_transport_id: arrTransportId,
  //   //   // arr_vehicle_type: arrVehicleType,
  //   //   // start_unloading_time: arrStartUnloadingTime,
  //   //   // arrival_time: arrArrivalTime,
  //   //   vehicle_no: vehicleNo,
  //   //   vehicle_id: arrVehicleId,
  //   //   driver_name: driverName,
  //   //   container_no: containerNo,
  //   //   seal_no: sealNo,
  //   //   arrival_date: arrivalDate,
  //   //   start_unloading: startUnloadingDate,
  //   // };

  //   const vehicleData = {
  //     vehicle_no: 'ABC123',
  //     driver_name: 'John Doe',
  //     arrival_date: '2024-09-30 12:00:00',
  //     start_unloading: '2024-09-30 12:30:00',
  //     vehicle_id: 1,
  //     container_no: 'CONT123',
  //     seal_no: 'SEAL123',
  //     user_created: 'admin',
  //     is_active: 'Y',
  //     is_deleted: 'N',
  //   };

  //   console.log('vehicleData', vehicleData);
  // };

  const savePartialVehicleData = async () => {
    // console.log('valVehType', valVehType.value);

    console.log('formattedDate', arrivalDate);

    // const headers = {
    //   'Content-Type': 'application/json',
    //   Cookie: 'XSRF-TOKEN=your_token; wms_session=your_session', // Replace with actual tokens
    // };

    // const body = JSON.stringify({
    //   vehicle_id: valVehType.value,
    //   vehicle_no: vehicleNo,
    //   driver_name: driverName,
    //   container_no: containerNo,
    //   seal_no: sealNo,
    //   arrival_date: '2024-09-30 12:00:00',
    //   start_unloading: '2024-09-30 12:30:00',
    //   user_created: 'superadmin',
    //   is_active: 'Y',
    //   is_deleted: 'N',
    // });

    // console.log('body', body);

    // try {
    //   const response = await fetch(
    //     'http://10.0.63.250/wms/save-partial-vehicle/NG1-IN-1024-0001/superadmin',
    //     {
    //       method: 'POST',
    //       headers: headers,
    //       body: body,
    //     },
    //   );

    //   const responseData = await response.json(); // Parse response JSON

    //   if (!response.ok) {
    //     throw new Error(responseData.message || 'Error occurred');
    //   }

    //   Alert.alert('Success', 'Vehicle data saved successfully!');
    //   console.log(responseData);
    // } catch (error) {
    //   Alert.alert('Error', error.message);
    //   console.error(error);
    // }
  };

  const [vehicleNo, setVehicleNo] = useState('');
  const [driverName, setDriverName] = useState('');
  const [containerNo, setContainerNo] = useState('');
  const [sealNo, setSealNo] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [startUnloadingDate, setStartUnloadingDate] = useState('');
  const [finishUnloadingDate, setFinishUnloadingDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');


  const [valVehType, setVehType] = useState(null);
  const [isFocusDropdown, setIsFocusDropdown] = useState(false);

  const [dataVehicle, setDataVehicle] = useState([]);
  useEffect(() => {
    fetch(`http://10.0.63.250/wms/get-vehicle`)
      .then(response => response.json())
      .then(data => {
        // console.log('data_api', data);
        const dropdownData = data.map(vehicle => ({
          label: vehicle.vehicle_type,
          value: vehicle.vehicle_id,
        }));
        setDataVehicle(dropdownData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const [dataExist, setDataExist] = useState([]);
  useEffect(() => {
    fetch(`http://10.0.63.250/wms/get-wh-trans/NG1-IN-1024-0001`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        // Cek apakah data adalah array dan memiliki setidaknya satu elemen
        if (Array.isArray(data) && data.length > 0) {
          const firstItem = data[0]; // Ambil item pertama dari array

          // Cek kondisi berdasarkan item pertama
          if (
            firstItem.arrival_date &&
            firstItem.start_unloading &&
            !firstItem.finish_unloading &&
            !firstItem.departure_date
          ) {
            setDataExist(firstItem);
            setVehType(firstItem.vehicle_id);
            setVehicleNo(firstItem.vehicle_no);
            setDriverName(firstItem.driver_name);
            setContainerNo(firstItem.container_no);
            setSealNo(firstItem.seal_no);

            // setArrivalDate(firstItem.arrival_date);
            // setStartUnloadingDate(firstItem.start_unloading);
          }
        }
      })
      .catch(error => {
        console.error('Fetch Error:', error);
      });
  }, []);

  // ARRIVAL DATETIME PICKER
  const [isDatePickerArrival, setDatePickerArrival] = useState(false);
  const [isDatePickerStartUnloading, setDatePickerStartUnloading] =
    useState(false);

  const showArrivalDate = () => {
    setDatePickerArrival(true);
  };

  const hideArrivalDate = () => {
    setDatePickerArrival(false);
  };

  const selectArrivalDate = date => {
    try {
      const formattedDate = format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
      setArrivalDate(formattedDate);
    } catch (error) {
      console.error('Error formatting date:', error);
    }

    hideArrivalDate();
  };

  // UNLOADING DATETIME PICKER
  const showUnloadingDate = () => {
    setDatePickerStartUnloading(true);
  };

  const hideStartUnloadingDate = () => {
    setDatePickerStartUnloading(false);
  };

  const selectStartUnloadingDate = date => {
    try {
      const formattedDate = format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
      setStartUnloadingDate(formattedDate);
    } catch (error) {
      console.error('Error formatting date:', error);
    }

    hideArrivalDate();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 20}}>
          <Text
            style={{
              color: 'black',
            }}>
            Inbound Planning No :
          </Text>
          <TextInput
            value="NG1-IN-1024-0001"
            style={{
              borderWidth: 1,
              borderColor: 'black',
              marginBottom: 10,
              padding: 5,
              color: 'black', // Warna teks
            }}
          />

          <View style={{paddingVertical: 5}}>
            <Dropdown
              style={[
                styles.dropdown,
                isFocusDropdown && {borderColor: 'green'},
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={dataVehicle}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Vehicle Type"
              searchPlaceholder="Search..."
              value={valVehType}
              onFocus={() => setIsFocusDropdown(true)}
              onBlur={() => setIsFocusDropdown(false)}
              onChange={item => {
                setVehType(item);
                setIsFocusDropdown(false);
              }}
              itemTextStyle={{color: 'black'}}
            />
          </View>

          <Text
            style={{
              color: 'black',
            }}>
            Vehicle No :
          </Text>
          <TextInput
            value={vehicleNo}
            onChangeText={setVehicleNo}
            style={{
              borderWidth: 1,
              borderColor: 'black',
              marginBottom: 10,
              padding: 5,
              color: 'black',
            }}
          />

          <Text
            style={{
              color: 'black',
            }}>
            Driver Name :
          </Text>
          <TextInput
            value={driverName}
            onChangeText={setDriverName}
            style={{
              borderWidth: 1,
              borderColor: 'black',
              marginBottom: 10,
              padding: 5,
              color: 'black',
            }}
          />

          <Text
            style={{
              color: 'black',
            }}>
            Container No :
          </Text>
          <TextInput
            value={containerNo}
            onChangeText={setContainerNo}
            style={{
              borderWidth: 1,
              borderColor: 'black',
              marginBottom: 10,
              padding: 5,
              color: 'black', // Warna teks
            }}
          />

          <Text
            style={{
              color: 'black',
            }}>
            Seal No :
          </Text>
          <TextInput
            value={sealNo}
            onChangeText={setSealNo}
            style={{
              borderWidth: 1,
              borderColor: 'black',
              marginBottom: 10,
              padding: 5,
              color: 'black', // Warna teks
            }}
          />

          <View>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: 'bold',
                margin: 10,
              }}>
              Vehicle Activity
            </Text>
          </View>

          <Text
            style={{
              color: 'black',
            }}>
            Arrival Date :
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              value={arrivalDate}
              style={{
                marginBottom: 10,
                backgroundColor: 'white',
                width: 300,
                borderColor: 'gray',
                margin: 2,
                color: 'black',
              }}
            />
            <TouchableOpacity
              style={styles.clrVehNum}
              onPress={showArrivalDate}>
              <Icon
                source="calendar"
                color={MD3Colors.secondary0}
                size={20}
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerArrival}
              mode="datetime"
              onConfirm={selectArrivalDate}
              onCancel={hideArrivalDate}
            />
          </View>

          <Text
            style={{
              color: 'black',
            }}>
            Start Unloading Date :
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              value={startUnloadingDate}
              style={{
                marginBottom: 10,
                backgroundColor: 'white',
                width: 300,
                borderColor: 'gray',
                margin: 2,
                color: 'black',
              }}
            />
            <TouchableOpacity
              style={styles.clrVehNum}
              onPress={showUnloadingDate}>
              <Icon
                source="calendar"
                color={MD3Colors.secondary0}
                size={20}
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerStartUnloading}
              mode="datetime"
              onConfirm={selectStartUnloadingDate}
              onCancel={hideStartUnloadingDate}
            />
          </View>

          {/* <Text
            style={{
              color: 'black',
            }}>
            Finish Unloading Date :
          </Text>
          <TextInput
            value="belum ada"
            // onChangeText={setArrArrivalTime}
            style={{
              borderWidth: 1,
              borderColor: 'black',
              marginBottom: 10,
              padding: 5,
              color: 'black',
            }}
          />

          <Text
            style={{
              color: 'black',
            }}>
            Departure Date
          </Text>
          <TextInput
            value="belum ada"
            // onChangeText={setArrArrivalTime}
            style={{
              borderWidth: 1,
              borderColor: 'black',
              marginBottom: 10,
              padding: 5,
              color: 'black',
            }}
          /> */}

          <Button title="Save Vehicle" onPress={savePartialVehicleData} />

          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Transportation;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'black',
    backgroundColor: 'white',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },

  // DATEPICKER
  clrVehNum: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
    bottom: 4,
  },
});
