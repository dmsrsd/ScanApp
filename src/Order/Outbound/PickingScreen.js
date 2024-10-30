import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {TextInput, Icon, Portal, Modal, Button} from 'react-native-paper';


export default function PickingScreen() {
  const SKU = [
    {id: '1', sku: 'CG001'},
    {id: '2', sku: 'CG002'},
    {id: '3', sku: 'CG003'},
  ];

  const [inputs, setInputs] = useState(
    SKU.map(sku => ({sku: sku.sku, bags: [{value: '', showCamera: false}]})),
  );

  const [activeCameraIndex, setActiveCameraIndex] = useState(null);
  const [activeBagIndex, setActiveBagIndex] = useState(null);

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
    setInputs(
      inputs.map(input => ({...input, bags: [{value: '', showCamera: false}]})),
    );
  };

  const device = useCameraDevice('back');
  if (!device) {
    return <Text>Tidak Ada Kamera</Text>;
  }

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'code-128'],
    onCodeScanned: codes => {
      if (activeCameraIndex !== null && activeBagIndex !== null) {
        const scannedValue = codes[0].value;
        console.log('Scanned value:', scannedValue); // Debugging log

        // Periksa duplikasi sebelum memperbarui
        const isDuplicate = inputs.some(input =>
          input.bags.some(bag => bag.value === scannedValue),
        );

        if (isDuplicate) {
          Alert.alert(
            'Duplicate Barcode',
            'This barcode has already been scanned.',
            [{text: 'OK', onPress: handleCloseCamera}],
          );
        } else {
          const updatedInputs = [...inputs];
          updatedInputs[activeCameraIndex].bags[activeBagIndex].value =
            scannedValue;
          updatedInputs[activeCameraIndex].bags[
            activeBagIndex
          ].showCamera = false;
          setInputs(updatedInputs);
          setActiveCameraIndex(null);
          setActiveBagIndex(null);
        }
      }
    },
  });

  const handleAddBag = index => {
    const updatedInputs = [...inputs];
    updatedInputs[index].bags.push({value: '', showCamera: false});
    setInputs(updatedInputs);
  };

  const handleRemoveBag = (skuIndex, bagIndex) => {
    if (inputs[skuIndex].bags.length > 1) {
      const updatedInputs = [...inputs];
      updatedInputs[skuIndex].bags = updatedInputs[skuIndex].bags.filter(
        (_, i) => i !== bagIndex,
      );
      setInputs(updatedInputs);
    }
  };

  const handleInputChange = (skuIndex, bagIndex, text) => {
    // Debugging log
    console.log('Handling input change:', skuIndex, bagIndex, text);

    // Periksa duplikasi
    const isDuplicate = inputs.some((input, i) =>
      input.bags.some(
        (bag, j) => bag.value === text && (i !== skuIndex || j !== bagIndex),
      ),
    );

    if (isDuplicate) {
      // Tampilkan alert jika duplikat ditemukan
      Alert.alert(
        'Duplicate Barcode',
        'This barcode has already been scanned.',
        [{text: 'OK', onPress: () => handleCloseAndReset(skuIndex, bagIndex)}],
      );
    } else {
      // Update nilai input jika tidak ada duplikasi
      const newInputs = [...inputs];
      newInputs[skuIndex].bags[bagIndex].value = text;
      setInputs(newInputs);
    }
  };

  const handleCloseAndReset = (skuIndex, bagIndex) => {
    console.log('Closing and resetting:', skuIndex, bagIndex); // Debugging log
    const newInputs = [...inputs];
    newInputs[skuIndex].bags[bagIndex].value = '';
    newInputs[skuIndex].bags[bagIndex].showCamera = false; // Tutup kamera
    setInputs(newInputs);
    setActiveCameraIndex(null); // Reset activeCameraIndex
    setActiveBagIndex(null); // Reset activeBagIndex
  };

  const handleOpenCamera = (skuIndex, bagIndex) => {
    const newInputs = [...inputs];
    newInputs[skuIndex].bags[bagIndex].showCamera = true;
    setInputs(newInputs);
    setActiveCameraIndex(skuIndex);
    setActiveBagIndex(bagIndex);
  };

  const handleCloseCamera = () => {
    console.log('Closing camera'); // Debugging log
    if (activeCameraIndex !== null && activeBagIndex !== null) {
      const newInputs = [...inputs];
      newInputs[activeCameraIndex].bags[activeBagIndex].showCamera = false;
      setInputs(newInputs);
      setActiveCameraIndex(null);
      setActiveBagIndex(null);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {/* PALLET and STOCK TYPE */}
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              top: 5,
              marginBottom: 20,
            }}> */}

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
            style={styles.txtInpPal}
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
            style={styles.txtInpPal}
            editable={true}
          />
          {/* </View> */}

          {/* SKU AND BAG NUMBER */}
          {inputs.map((input, skuIndex) => (
            <View key={input.sku} style={{marginBottom: 20}}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', top: 10}}>
                <TextInput
                  theme={theme}
                  label={
                    <Text style={{color: isFocused ? 'grey' : 'black'}}>
                      SKU
                    </Text>
                  }
                  value={input.sku}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  textColor="black"
                  style={styles.txtInpSKU}
                  editable={false}
                />

                <TextInput
                  theme={theme}
                  label={
                    <Text style={{color: isFocused ? 'grey' : 'black'}}>
                      QTY
                    </Text>
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
              {input.bags.map((bag, bagIndex) => (
                <View
                  key={bagIndex}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 15,
                  }}>
                  <View style={{flex: 1}}>
                    <TextInput
                      style={styles.inpBagNum}
                      value={bag.value}
                      onChangeText={text =>
                        handleInputChange(skuIndex, bagIndex, text)
                      }
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

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => handleOpenCamera(skuIndex, bagIndex)}
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

                    {bagIndex === 0 && (
                      <TouchableOpacity
                        onPress={() => handleAddBag(skuIndex)}
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

                    {input.bags.length > 1 && bagIndex > 0 && (
                      <TouchableOpacity
                        onPress={() => handleRemoveBag(skuIndex, bagIndex)}
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
                      visible={bag.showCamera}
                      onDismiss={handleCloseCamera}
                      contentContainerStyle={styles.cameraContainer}>
                      <View style={styles.cameraContainer}>
                        <Camera
                          device={device}
                          isActive={bag.showCamera}
                          style={[styles.camera, {alignSelf: 'center'}]}
                          codeScanner={codeScanner}
                        />
                      </View>
                    </Modal>
                  </Portal>
                </View>
              ))}
            </View>
          ))}
        </View>
        <Text>{'\n'}</Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            style={{width: 170, borderRadius: 10}}
            mode="contained"
            buttonColor="red"
            textColor="white"
            onPress={() => handleClear()}>
            Clear
          </Button>

          <Button
            style={{width: 170, borderRadius: 10}}
            mode="contained"
            buttonColor="green"
            textColor="white"
            // onPress={() => nextBtn()}
          >
            Save
          </Button>
        </View>

        <Text>{'\n'}</Text>
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
  txtInpPal: {
    backgroundColor: '#B5C0D0',
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 2,
  },
  txtInpSKU: {
    backgroundColor: 'lightgrey',
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
  },
  txtInpQTY: {
    backgroundColor: 'lightgrey',
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
