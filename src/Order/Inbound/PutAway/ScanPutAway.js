import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {Modal, Portal, Icon} from 'react-native-paper';
import {baseURL} from '../../../utils/url';

const ScanPutAway = () => {
  // REDUX DATA
  const putAwayList = useSelector(state => state.putAwayList.item);
  const {
    gr_id,
    movement_id,
    sku,
    qty,
    location_from,
    location_to,
    warehouseman,
  } = putAwayList || {};

  const valueInpt = [
    {label: 'GR Id', value: gr_id},
    {label: 'Movement Id', value: movement_id},
    {label: 'SKU', value: sku},
    {label: 'Quantity', value: qty},
  ];

  useEffect(() => {
    console.log('putAwayList', putAwayList);
  }, []);

  const [cameraVisible, setCameraVisible] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const device = useCameraDevice('back');

  // Menggunakan useCodeScanner
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'code-128'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.value} codes!`);
      if (codes.length > 0) {
        const scannedValue = codes[0].value; // Ambil data dari kode pertama
        setScannedData(scannedValue);
        setInputValue(scannedValue); // Set hasil scan ke TextInput
        setCameraVisible(false);
      }
    },
  });

  const handleOpenCamera = () => {
    if (device) {
      setCameraVisible(true);
    } else {
      Alert.alert('No camera device found');
    }
  };

  const handleCloseCamera = () => {
    setCameraVisible(false);
  };

  const processScan = async () => {
    if (inputValue === location_to) {
      const requestData = {
        movement_id: movement_id,
        sku: sku,
        warehouseman: warehouseman,
        is_scanned: true,
      };

      console.log('requestData', requestData);

      const myHeaders = {
        'Content-Type': 'application/json',
        Cookie: 'XSRF-TOKEN=your_xsrf_token; wms_session=your_session_token', // Replace with actual tokens
      };

      try {
        const response = await fetch(`${baseURL}/update-putaway`, {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(requestData),
        });

        const result = await response.json();

        // Check the status code in the response
        if (response.status === 200) {
          Alert.alert('Successful Scan', result.message || '');
        } else if (response.status === 202) {
          Alert.alert('Data Already Scanned', result.message);
        } else if (response.status === 404) {
          Alert.alert(result.message);
        } else {
          Alert.alert(
            'Update failed',
            'An unexpected error occurred. Please try again.',
          );
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Update failed', error.message);
      }
    } else {
      Alert.alert('Not Valid Scan');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Putaway Process</Text>
      <View style={styles.info}>
        <View style={styles.infoItem}>
          <Text style={styles.infoText}>Location From:</Text>
          <Text style={styles.infoValue}>{location_from}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {valueInpt.map((item, index) => (
        <View style={styles.itemRow} key={index}>
          <Text style={styles.itemText}>{item.label}</Text>
          <Text style={styles.itemText}>{item.value}</Text>
        </View>
      ))}

      <View style={styles.divider} />

      <View style={styles.info}>
        <View style={styles.infoItem}>
          <Text style={styles.infoText}>Location To:</Text>
          <Text style={styles.infoValue}>{location_to}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoText}>Status:</Text>
          <Text
            style={[
              styles.infoValue,
              {
                color: inputValue === location_to ? 'green' : 'red',
              },
            ]}>
            {inputValue === location_to ? 'Match' : 'Not Match'}
          </Text>
        </View>
      </View>

      <View style={styles.info}>
        <View style={styles.infoItem}>
          <Text style={styles.infoText}>Result Scan:</Text>
          <TextInput
            style={{color: 'black', backgroundColor: 'lightgrey', width: 270}}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Input Scan"
          />
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoText}>Scan</Text>
          <TouchableOpacity onPress={handleOpenCamera}>
            <Icon source="barcode" color="black" size={50} />
          </TouchableOpacity>
        </View>
      </View>

      <Text>{'\n'}</Text>
      <Text>{'\n'}</Text>
      <Text>{'\n'}</Text>

      <TouchableOpacity style={styles.button} onPress={processScan}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {/* Camera Modal */}
      <Portal>
        <Modal
          visible={cameraVisible}
          onDismiss={handleCloseCamera}
          contentContainerStyle={styles.cameraContainer}>
          <View style={styles.cameraContainer}>
            <Camera
              style={[styles.camera, {alignSelf: 'center'}]}
              device={device}
              isActive={cameraVisible}
              codeScanner={codeScanner}
            />
          </View>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: 'whitesmoke',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'black',
    // textAlign: 'center'
  },
  info: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  infoItem: {
    marginBottom: 1,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
    color: 'black',
  },
  infoValue: {
    fontSize: 17,
    color: 'black',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  divider: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  itemText: {
    fontSize: 18,
    color: 'black',
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  cameraContainer: {
    backgroundColor: 'white',
    padding: 80,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  camera: {
    width: 500,
    height: 500,
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default ScanPutAway;
