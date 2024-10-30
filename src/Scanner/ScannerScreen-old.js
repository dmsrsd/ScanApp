import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {
  TextInput,
  Divider,
  Icon,
  MD3Colors,
  Button,
  Portal,
  Modal,
} from 'react-native-paper';


const SKU = [
  {id: '1', sku: 'CG001'},
  {id: '2', sku: 'CG002'},
  {id: '3', sku: 'CG003'},
];

export default function ScannerScreen() {
  const [inputs, setInputs] = useState([{value: '', showCamera: false}]);
  const [activeCameraIndex, setActiveCameraIndex] = useState(null);

  const [isFocused, setIsFocused] = useState(false);

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

  const handleClear = () => {
    setPOnumber('');
    setLotNumber('');
  };

  const device = useCameraDevice('back');
  if (!device) {
    return <Text>Tidak Ada Kamera</Text>;
  }

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'code-128'],
    onCodeScanned: codes => {
      if (activeCameraIndex !== null) {
        const scannedValue = codes[0].value;
        console.log('Scanned value:', scannedValue); // Debugging log

        // Periksa duplikasi sebelum memperbarui
        const isDuplicate = inputs.some(input => input.value === scannedValue);

        if (isDuplicate) {
          Alert.alert(
            'Duplicate Barcode',
            'This barcode has already been scanned.',
            [{text: 'OK', onPress: handleCloseCamera}],
          );
        } else {
          const updatedInputs = [...inputs];
          updatedInputs[activeCameraIndex].value = scannedValue;
          updatedInputs[activeCameraIndex].showCamera = false;
          setInputs(updatedInputs);
          setActiveCameraIndex(null);
        }
      }
    },
  });

  const handleAddInput = () => {
    setInputs([...inputs, {value: '', showCamera: false}]);
  };

  const handleRemoveInput = index => {
    if (inputs.length > 1) {
      const updatedInputs = inputs.filter((_, i) => i !== index);
      setInputs(updatedInputs);
    }
  };

  const handleInputChange = (index, text) => {
    // Debugging log
    console.log('Handling input change:', index, text);

    // Periksa duplikasi
    const isDuplicate = inputs.some(
      (input, i) => input.value === text && i !== index,
    );

    if (isDuplicate) {
      // Tampilkan alert jika duplikat ditemukan
      Alert.alert(
        'Duplicate Barcode',
        'This barcode has already been scanned.',
        [{text: 'OK', onPress: () => handleCloseAndReset(index)}],
      );
    } else {
      // Update nilai input jika tidak ada duplikasi
      const newInputs = [...inputs];
      newInputs[index].value = text;
      setInputs(newInputs);
    }
  };

  const handleCloseAndReset = index => {
    console.log('Closing and resetting:', index); // Debugging log
    const newInputs = [...inputs];
    newInputs[index].value = '';
    newInputs[index].showCamera = false; // Tutup kamera
    setInputs(newInputs);
    setActiveCameraIndex(null); // Reset activeCameraIndex
  };

  const handleOpenCamera = index => {
    const newInputs = [...inputs];
    newInputs[index].showCamera = true;
    setInputs(newInputs);
    setActiveCameraIndex(index);
  };

  const handleCloseCamera = () => {
    console.log('Closing camera'); // Debugging log
    if (activeCameraIndex !== null) {
      const newInputs = [...inputs];
      newInputs[activeCameraIndex].showCamera = false;
      setInputs(newInputs);
      setActiveCameraIndex(null);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {/* PALLET and STOCK TYPE */}
          <View style={{flexDirection: 'row', alignItems: 'center', top: 5}}>
            <TextInput
              theme={theme}
              label={
                <Text style={{color: isFocused ? 'grey' : 'black'}}>
                  PALLET NO
                </Text>
              }
              value="WINGBOX"
              // onChangeText={text => setLotNumber(text)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              textColor="black"
              style={styles.txtInpSKU}
              editable={true}
            />

            <TextInput
              theme={theme}
              label={
                <Text style={{color: isFocused ? 'grey' : 'black'}}>
                  STOCK TYPE
                </Text>
              }
              value="GOOD"
              // onChangeText={text => setLotNumber(text)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              textColor="black"
              style={styles.txtInpQTY}
              editable={true}
            />
          </View>

          {/* SKU AND BAG NUMBER SECTION*/}
          <View style={{flexDirection: 'row', alignItems: 'center', top: 10}}>
            <TextInput
              theme={theme}
              label={
                <Text style={{color: isFocused ? 'grey' : 'black'}}>SKU</Text>
              }
              value="CG001"
              onFocus={handleFocus}
              onBlur={handleBlur}
              textColor="black"
              style={styles.txtInpSKU}
              editable={true}
            />

            <TextInput
              theme={theme}
              label={
                <Text style={{color: isFocused ? 'grey' : 'black'}}>QTY</Text>
              }
              value="60"
              // onChangeText={text => setLotNumber(text)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              textColor="black"
              style={styles.txtInpQTY}
              editable={true}
            />
          </View>
          {inputs.map((input, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <View style={{flex: 1}}>
                <TextInput
                  style={styles.inpBagNum}
                  value={input.value}
                  onChangeText={text => handleInputChange(index, text)}
                  theme={theme}
                  label={
                    <Text style={{color: isFocused ? 'grey' : 'black'}}>
                      Bag Number
                    </Text>
                  }
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  textColor="black"
                />
              </View>

              <TextInput
                style={styles.inpBgWg}
                value="10"
                // onChangeText={text => handleInputChange(index, text)}
                theme={theme}
                label={
                  <Text style={{color: isFocused ? 'grey' : 'black'}}>
                    Bag Weight
                  </Text>
                }
                onFocus={handleFocus}
                onBlur={handleBlur}
                textColor="black"
              />

              {/* {index === 0 && (
                  <View
                    style={{
                      width: 40,
                      height: 55,
                      justifyContent: 'center',
                      alignItems: 'center',
                      bottom: 5,
                      right: 5,
                    }}
                  />
                )} */}

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => handleOpenCamera(index)}
                  style={{
                    backgroundColor: 'lightgrey',
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    right: 8,
                    borderRadius: 25,
                  }}>
                  <Icon source="barcode" color="green" size={30} />
                </TouchableOpacity>

                {index === 0 && (
                  <TouchableOpacity
                    onPress={handleAddInput}
                    style={{
                      backgroundColor: 'lightgrey',
                      width: 40,
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 25,
                      right: 5,
                    }}>
                    <Icon source="plus" color="blue" size={30} />
                  </TouchableOpacity>
                )}

                {index > 0 && (
                  <TouchableOpacity
                    onPress={() => handleRemoveInput(index)}
                    style={{
                      backgroundColor: 'lightgrey',
                      width: 40,
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 25,
                    }}>
                    <Icon source="minus" color="red" size={30} />
                  </TouchableOpacity>
                )}
              </View>

              <Portal>
                <Modal
                  visible={input.showCamera}
                  onDismiss={handleCloseCamera}
                  contentContainerStyle={styles.cameraContainer}>
                  <View style={styles.cameraContainer}>
                    <Camera
                      device={device}
                      isActive={input.showCamera}
                      style={[styles.camera, {alignSelf: 'center'}]}
                      codeScanner={codeScanner}
                    />
                  </View>
                </Modal>
              </Portal>
            </View>
          ))}


        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  camera: {
    width: 500,
    height: 500,
    borderColor: 'black',
    borderWidth: 1,
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
  inputContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  inpBagNum: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'red',
    backgroundColor: '#FBF9F1',
  },
  inpBgWg: {
    height: 40,
    width: 80,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'red',
    backgroundColor: '#FBF9F1',
    right: 10,
  },
  btnScan: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    height: 40,
    borderRadius: 20,
  },

  //BETWEEN TEXTINPUT
  txtInpSKU: {
    backgroundColor: '#FBF9F1',
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
  },
  txtInpQTY: {
    backgroundColor: '#FBF9F1',
    flex: 1,
    marginLeft: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  clrTxtQTY: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBF9F1',
    height: 60,
  },
});
