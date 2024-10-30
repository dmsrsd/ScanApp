import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  TextInput,
  Divider,
  Icon,
  MD3Colors,
  Button,
  Card,
  Avatar,
} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const OPTIONS = [
  {label: 'WINGBOX', value: 'WINGBOX'},
  {label: 'Truck A', value: 'Truck A'},
  {label: 'Truck B', value: 'Truck B'},
];

const VehAct = [
  {id: 1, date: '01-08-2024 11:11:11', label: 'Arrival Data Time'},
  {id: 2, date: '05-08-2024 11:11:11', label: 'Start Unloading Date Time'},
  {id: 3, date: '15-08-2024 11:11:11', label: 'Finish Unloading Date Time'},
  {id: 4, date: '30-08-2024 11:11:11', label: 'Departure Date Time'},
];

const Transportation = ({navigation}) => {
  const [text, setText] = useState('');
  const [vehNum, setVehNum] = useState('');
  const [drivName, setDrivName] = useState('');
  const [sealNum, setSealNum] = useState('');

  const [isFocused, setIsFocused] = useState(false);

  const [value, setValue] = useState(null);
  const [isFocusDropdown, setIsFocusDropdown] = useState(false);

  const theme = {
    colors: {
      text: 'black',
      primary: '#000',
    },
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // ARRIVAL DATETIME PICKER
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showArrivalDate = () => {
    setDatePickerVisibility(true);
  };

  const hideArrivalDate = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideArrivalDate();
  };

  const nextBtn = () => {
    navigation.navigate('Scan');
  };

  const [dataVehicle, setDataVehicle] = useState([]);
  useEffect(() => {
    fetch(`http://10.0.63.234/wms/get-vehicle`)
      .then(response => response.json())
      .then(data => {
        console.log('data_api', data);

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

  return (
    <ScrollView>
      <View>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              fontWeight: 'bold',
              margin: 10,
            }}>
            Vehicle Info
          </Text>
        </View>

        <View style={{paddingVertical: 5}}>
          <Dropdown
            style={[styles.dropdown, isFocusDropdown && {borderColor: 'green'}]}
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
            value={value}
            onFocus={() => setIsFocusDropdown(true)}
            onBlur={() => setIsFocusDropdown(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocusDropdown(false);
            }}
            itemTextStyle={{color: 'black'}}
          />
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            theme={theme}
            label={
              <Text style={{color: isFocused ? 'grey' : 'black'}}>
                Vehicle No
              </Text>
            }
            value={vehNum}
            onChangeText={text => setVehNum(text)}
            style={styles.vehNum}
            onFocus={handleFocus}
            onBlur={handleBlur}
            textColor="black"
          />

          <TouchableOpacity style={styles.clrVehNum}>
            <Icon
              source="close"
              color={MD3Colors.error60}
              size={20}
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            theme={theme}
            label={
              <Text style={{color: isFocused ? 'grey' : 'black'}}>
                Driver Name
              </Text>
            }
            value={drivName}
            onChangeText={text => setDrivName(text)}
            style={styles.vehNum}
            onFocus={handleFocus}
            onBlur={handleBlur}
            textColor="black"
          />

          <TouchableOpacity style={styles.clrVehNum}>
            <Icon
              source="close"
              color={MD3Colors.error60}
              size={20}
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            theme={theme}
            label={
              <Text style={{color: isFocused ? 'grey' : 'black'}}>Seal No</Text>
            }
            value={sealNum}
            onChangeText={text => setSealNum(text)}
            style={styles.vehNum}
            onFocus={handleFocus}
            onBlur={handleBlur}
            textColor="black"
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.clrVehNum}>
            <Icon
              source="close"
              color={MD3Colors.error60}
              size={20}
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
        </View>

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

        {VehAct.map((item, index) => (
          <View
            key={index}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              theme={theme}
              label={
                <Text style={{color: isFocused ? 'grey' : 'black'}}>
                  {item.label}
                </Text>
              }
              value={item.date}
              onChangeText={text => setText(text)}
              style={styles.vehNum}
              onFocus={handleFocus}
              onBlur={handleBlur}
              textColor="black"
              keyboardType="numeric"
              disabled
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
          </View>
        ))}

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideArrivalDate}
        />

        <Text>{'\n'}</Text>

        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Button
            style={{width: 170, borderRadius: 10}}
            mode="contained"
            buttonColor="grey"
            textColor="white"
            onPress={() => nextBtn()}>
            Next
          </Button>
        </View>

        <Text>{'\n'}</Text>
        <Text>{'\n'}</Text>
      </View>
    </ScrollView>
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

  // Text Input
  vehNum: {
    backgroundColor: 'white',
    width: 320,
    borderColor: 'gray',
    margin: 2,
  },
  clrVehNum: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBF9F1',
    height: 50,
  },
});
